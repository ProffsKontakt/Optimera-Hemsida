import { NextResponse } from "next/server";
import { z } from "zod";

const Schema = z.object({
  namn: z.string().min(2),
  telefon: z.string().min(4),
  epost: z.string().email(),
  adress: z.string().optional(),
  meddelande: z.string().optional(),
  boende: z.string().optional(),
  tid: z.string().optional(),
  services: z.array(z.string()).default([]),
  config: z.record(z.any()).optional(),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const parsed = Schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "validation", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const recipient =
    process.env.QUOTE_RECIPIENT_EMAIL ?? "hej@klokatankar.se";

  // För riktig produktion: integrera med Resend / SendGrid / Postmark.
  // Här loggar vi och returnerar OK så formen fungerar i utvecklingsmiljön.
  // eslint-disable-next-line no-console
  console.log("[offert]", {
    to: recipient,
    timestamp: new Date().toISOString(),
    payload: data,
  });

  if (process.env.RESEND_API_KEY) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Kloka Tankar El <hej@klokatankar.se>",
          to: [recipient],
          reply_to: data.epost,
          subject: `Ny offertförfrågan — ${data.namn}`,
          text: formatPlain(data),
        }),
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("[offert] resend failed", err);
    }
  }

  return NextResponse.json({ ok: true });
}

function formatPlain(d: z.infer<typeof Schema>) {
  return [
    `Namn: ${d.namn}`,
    `Telefon: ${d.telefon}`,
    `E-post: ${d.epost}`,
    d.adress ? `Adress: ${d.adress}` : null,
    `Boende: ${d.boende ?? "-"}`,
    `Tidsperspektiv: ${d.tid ?? "-"}`,
    `Tjänster: ${d.services.join(", ") || "-"}`,
    "",
    "Konfiguration:",
    JSON.stringify(d.config ?? {}, null, 2),
    "",
    "Meddelande:",
    d.meddelande ?? "-",
  ]
    .filter(Boolean)
    .join("\n");
}
