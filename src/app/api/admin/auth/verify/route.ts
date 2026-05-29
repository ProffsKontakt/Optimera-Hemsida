import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  ADMIN_PENDING_COOKIE,
  adminCookieOptions,
  pendingCookieOptions,
  signAuthToken,
  verifyCode,
  isAdminAuthConfigured,
} from "@/lib/admin-auth";

/**
 * POST /api/admin/auth/verify
 *
 * Body: { code: string }
 *
 * Kollar inmatad kod mot pending-cookien. Om OK sätts auth-cookien
 * (oe_admin) och pending-cookien rensas. Annars 401.
 */
export async function POST(req: Request) {
  if (!isAdminAuthConfigured()) {
    return NextResponse.json(
      { error: "Admin-auth ej aktiverad." },
      { status: 503 },
    );
  }
  const { code } = (await req.json().catch(() => ({}))) as { code?: string };
  if (!code || !/^\d{6}$/.test(code)) {
    return NextResponse.json(
      { error: "Kod måste vara 6 siffror." },
      { status: 400 },
    );
  }
  const pending = cookies().get(ADMIN_PENDING_COOKIE);
  if (!pending) {
    return NextResponse.json(
      { error: "Ingen kod begärd, börja om." },
      { status: 400 },
    );
  }
  if (!verifyCode(code, pending.value)) {
    return NextResponse.json(
      { error: "Fel kod eller utgången." },
      { status: 401 },
    );
  }

  const token = signAuthToken();
  const authOpts = adminCookieOptions();
  const pendingOpts = pendingCookieOptions();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(authOpts.name, token, authOpts);
  res.cookies.set(pendingOpts.name, "", { ...pendingOpts, maxAge: 0 });
  return res;
}
