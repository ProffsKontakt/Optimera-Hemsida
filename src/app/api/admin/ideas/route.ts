import { NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/admin-auth";
import { z } from "zod";

const Schema = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
  category: z.enum(["salj", "crm", "drift", "marknad", "ovrigt"]),
  status: z.enum(["ide", "bearbetas", "klar", "skrotad"]),
  author: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

/**
 * Bryggar idéer från klientens localStorage vidare till KT Central /
 * Slack / Notion via en webhook. Persistensen i sig sker i klienten;
 * den här endpointen är "broadcast forward" för centraliserad
 * insamling. Sätt `IDEAS_WEBHOOK_URL` (+ valfri `IDEAS_WEBHOOK_TOKEN`)
 * i miljön.
 */
export async function POST(req: Request) {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const body = await req.json().catch(() => ({}));
  const parsed = Schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "validation", details: parsed.error.flatten() },
      { status: 400 },
    );
  }
  if (!process.env.IDEAS_WEBHOOK_URL) {
    return NextResponse.json({
      ok: true,
      forwarded: false,
      note: "IDEAS_WEBHOOK_URL är inte konfigurerad – idén ligger bara i din browser.",
    });
  }
  try {
    await fetch(process.env.IDEAS_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.IDEAS_WEBHOOK_TOKEN
          ? { Authorization: `Bearer ${process.env.IDEAS_WEBHOOK_TOKEN}` }
          : {}),
      },
      body: JSON.stringify({
        source: "optimeraenergi.se/admin/ideer",
        idea: parsed.data,
      }),
    });
    return NextResponse.json({ ok: true, forwarded: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "webhook failed" },
      { status: 502 },
    );
  }
}
