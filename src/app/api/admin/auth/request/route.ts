import { NextResponse } from "next/server";
import {
  issueCode,
  pendingCookieOptions,
  getOtpRecipient,
  isAdminAuthConfigured,
} from "@/lib/admin-auth";

/**
 * POST /api/admin/auth/request
 *
 * Genererar en 6-siffrig kod, sätter pending-cookie (HMAC-signerad,
 * 10 min TTL), och mejlar koden till info@optimeraenergi.se via Resend.
 *
 * Inget input behövs, destinationen är hårdkodad. Detta är "company
 * gate"-mönstret, bara personer med åtkomst till info@-inkorgen kan
 * fortsätta.
 */
export async function POST() {
  if (!isAdminAuthConfigured()) {
    return NextResponse.json(
      {
        error:
          "Admin-auth ej aktiverad. Sätt ADMIN_AUTH_SECRET i Vercel-projektet.",
      },
      { status: 503 },
    );
  }
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      {
        error:
          "E-postutskick ej konfigurerat. Sätt RESEND_API_KEY i Vercel-projektet.",
      },
      { status: 503 },
    );
  }

  const recipient = getOtpRecipient();
  const { code, signedValue } = issueCode();

  // Skicka kod via Resend. Klartext-koden lever bara här + i mejlet,
  // server-side, går aldrig tillbaka till klienten.
  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Optimera Energi Admin <hej@optimeraenergi.se>",
        to: [recipient],
        subject: `Admin-kod: ${code}`,
        text: [
          `Din engångskod till Optimera Energi admin är: ${code}`,
          "",
          "Koden går ut om 10 minuter och kan användas en gång.",
          "Om du inte begärt denna kod, ignorera mejlet, ingen åtgärd krävs.",
        ].join("\n"),
      }),
    });
    if (!r.ok) {
      const detail = await r.text().catch(() => "");
      return NextResponse.json(
        { error: "Kunde inte skicka kod via Resend", detail },
        { status: 502 },
      );
    }
  } catch (err) {
    return NextResponse.json(
      { error: "Resend-anrop misslyckades", detail: String(err) },
      { status: 502 },
    );
  }

  const opts = pendingCookieOptions();
  const res = NextResponse.json({ ok: true, recipient });
  res.cookies.set(opts.name, signedValue, opts);
  return res;
}
