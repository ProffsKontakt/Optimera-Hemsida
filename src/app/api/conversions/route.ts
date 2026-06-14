import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { z } from "zod";

/**
 * Säker konverterings-relä: CRM (Sentinel HQ) -> denna endpoint -> GA4.
 *
 * Säkerhetsmodell:
 *  - CRM:et och webbplatsen delar EN hemlighet (CONVERSION_RELAY_SECRET).
 *  - Varje anrop signeras: X-OE-Signature = "sha256=" + HMAC(secret, ts.body),
 *    X-OE-Timestamp = unix-ms. Vi verifierar med timingSafeEqual.
 *  - Timestamp får vara max 5 min gammal -> skydd mot replay.
 *  - GA4:s Measurement Protocol-secret ligger ENDAST i webbplatsens server-env
 *    och exponeras aldrig mot klient eller CRM. Komprometteras CRM:et läcker
 *    inga Google-credentials.
 *  - Fail closed: saknas secrets svarar vi 503 istället för att bearbeta osäkert.
 *  - Event-namn allowlistas; payload-storlek och antal events begränsas.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MEASUREMENT_ID = process.env.GA4_MEASUREMENT_ID ?? "G-5DY857B8TL";
const MP_SECRET = process.env.GA4_MP_API_SECRET;
const RELAY_SECRET = process.env.CONVERSION_RELAY_SECRET;
const MAX_SKEW_MS = 5 * 60 * 1000;
const MAX_BODY = 16_000;

const EventSchema = z.object({
  name: z.enum([
    "generate_lead",
    "qualify_lead",
    "close_convert_lead",
    "purchase",
    "refund",
  ]),
  params: z
    .record(z.union([z.string(), z.number(), z.boolean()]))
    .optional(),
});

const BodySchema = z.object({
  clientId: z.string().min(3).max(64), // GA4 client_id fångat vid lead
  gclid: z.string().max(256).optional(),
  events: z.array(EventSchema).min(1).max(10),
});

function timingSafeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a, "utf8");
  const bb = Buffer.from(b, "utf8");
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

export async function POST(req: Request) {
  if (!RELAY_SECRET || !MP_SECRET) {
    return NextResponse.json({ error: "relay not configured" }, { status: 503 });
  }

  const ts = req.headers.get("x-oe-timestamp");
  const sig = req.headers.get("x-oe-signature");
  if (!ts || !sig) {
    return NextResponse.json({ error: "missing auth headers" }, { status: 401 });
  }

  const tsNum = Number(ts);
  if (!Number.isFinite(tsNum) || Math.abs(Date.now() - tsNum) > MAX_SKEW_MS) {
    return NextResponse.json({ error: "stale or invalid timestamp" }, { status: 401 });
  }

  const raw = await req.text();
  if (raw.length > MAX_BODY) {
    return NextResponse.json({ error: "payload too large" }, { status: 413 });
  }

  const expected =
    "sha256=" +
    crypto.createHmac("sha256", RELAY_SECRET).update(`${ts}.${raw}`).digest("hex");
  if (!timingSafeEqual(expected, sig)) {
    return NextResponse.json({ error: "bad signature" }, { status: 401 });
  }

  let body: z.infer<typeof BodySchema>;
  try {
    body = BodySchema.parse(JSON.parse(raw));
  } catch {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }

  const events = body.events.map((e) => ({
    name: e.name,
    params: {
      ...(e.params ?? {}),
      ...(body.gclid ? { gclid: body.gclid } : {}),
    },
  }));

  try {
    const r = await fetch(
      `https://www.google-analytics.com/mp/collect?measurement_id=${encodeURIComponent(
        MEASUREMENT_ID,
      )}&api_secret=${encodeURIComponent(MP_SECRET)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ client_id: body.clientId, events }),
      },
    );
    if (r.status >= 200 && r.status < 300) {
      return NextResponse.json({ ok: true, forwarded: events.length });
    }
    return NextResponse.json({ error: "ga4 rejected" }, { status: 502 });
  } catch {
    return NextResponse.json({ error: "forward failed" }, { status: 502 });
  }
}
