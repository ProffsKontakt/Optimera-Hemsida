import { NextResponse } from "next/server";
import { adminCookieOptions, pendingCookieOptions } from "@/lib/admin-auth";

/**
 * Legacy-routen för admin-login. Hela inloggningen sker nu via
 * /api/admin/auth/request + /api/admin/auth/verify (OTP-flöde).
 * Denna route behåller bara DELETE för utloggning.
 */

export async function POST() {
  return NextResponse.json(
    {
      error:
        "Password-login är borttagen. Använd OTP-flödet (engångskod till info@optimeraenergi.se).",
    },
    { status: 410 },
  );
}

export async function DELETE() {
  const auth = adminCookieOptions();
  const pending = pendingCookieOptions();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(auth.name, "", { ...auth, maxAge: 0 });
  res.cookies.set(pending.name, "", { ...pending, maxAge: 0 });
  return res;
}
