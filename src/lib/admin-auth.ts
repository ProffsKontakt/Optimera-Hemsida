import { cookies } from "next/headers";

const COOKIE = "oe_admin";

/**
 * Vi använder en enkel password-gate via HTTP-only cookie. När admin loggar
 * in jämförs `password` med `ADMIN_PASSWORD` i env. Om matchning sätts
 * cookien till exakt samma värde – och alla `/admin`-routes och
 * `/api/admin/*` kollar att cookien är giltig.
 *
 * Det är inte en SSO-lösning men är fullt tillräckligt för en intern
 * idé-tavla. Byt till NextAuth/Clerk när vi har fler än fem admins.
 */

export const ADMIN_COOKIE = COOKIE;

export function isAdminAuthed(): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const c = cookies().get(COOKIE);
  return !!c && c.value === expected;
}

export function adminCookieOptions() {
  return {
    name: COOKIE,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 dagar
  };
}
