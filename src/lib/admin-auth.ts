import { cookies } from "next/headers";
import crypto from "crypto";

/**
 * Admin-auth byggd på engångskod (OTP) som mejlas till en fast adress.
 * Inga lösenord, ingen storage utöver två kortlivade cookies.
 *
 * Flöde:
 *   1. /api/admin/auth/request: generera 6-siffrig kod, HMAC-signera med
 *      ADMIN_AUTH_SECRET + utgångstid, sätt `oe_admin_pending`-cookie med
 *      signaturen, mejla koden till ADMIN_OTP_RECIPIENT via Resend.
 *   2. /api/admin/auth/verify: ta emot koden från user, verifiera mot
 *      pending-cookien. Om OK, sätt `oe_admin`-cookie (HMAC-signerad auth-
 *      token) och rensa pending. Annars 401.
 *   3. isAdminAuthed() validerar `oe_admin`-cookien.
 *
 * Krav i env:
 *   ADMIN_AUTH_SECRET    - random string (minst 32 tecken) för HMAC
 *   RESEND_API_KEY       - för OTP-utskick
 *   ADMIN_OTP_RECIPIENT  - default "info@optimeraenergi.se"
 */

export const ADMIN_COOKIE = "oe_admin";
export const ADMIN_PENDING_COOKIE = "oe_admin_pending";

const AUTH_TTL_SEC = 60 * 60 * 24 * 30; // 30 dagar
const PENDING_TTL_SEC = 60 * 10; // 10 minuter
const CODE_LENGTH = 6;

function getSecret(): string | null {
  return process.env.ADMIN_AUTH_SECRET ?? null;
}

function hmac(value: string): string {
  const secret = getSecret();
  if (!secret) throw new Error("ADMIN_AUTH_SECRET saknas");
  return crypto.createHmac("sha256", secret).update(value).digest("base64url");
}

function timingSafeEq(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

// ============================ AUTH-TOKEN ============================

/**
 * Bygger en signerad auth-token i formen "<issuedAt>.<sig>".
 * `issuedAt` är unix-sekunder. Signaturen täcker "authed:<issuedAt>".
 */
export function signAuthToken(now = Math.floor(Date.now() / 1000)): string {
  const payload = `authed:${now}`;
  return `${now}.${hmac(payload)}`;
}

export function verifyAuthToken(token: string): boolean {
  if (!getSecret()) return false;
  const idx = token.indexOf(".");
  if (idx <= 0) return false;
  const issuedAt = Number(token.slice(0, idx));
  const sig = token.slice(idx + 1);
  if (!Number.isFinite(issuedAt)) return false;
  const now = Math.floor(Date.now() / 1000);
  if (now - issuedAt > AUTH_TTL_SEC) return false;
  const expected = hmac(`authed:${issuedAt}`);
  return timingSafeEq(sig, expected);
}

export function isAdminAuthed(): boolean {
  const c = cookies().get(ADMIN_COOKIE);
  if (!c) return false;
  return verifyAuthToken(c.value);
}

// ============================ PENDING-KOD ============================

/**
 * Genererar 6-siffrig kod + signerar den ihop med utgångstid. Returnerar
 * { code, signedValue } där signedValue lagras i cookie och code mejlas.
 */
export function issueCode(): { code: string; signedValue: string } {
  const code = Array.from({ length: CODE_LENGTH }, () =>
    Math.floor(Math.random() * 10).toString(),
  ).join("");
  const exp = Math.floor(Date.now() / 1000) + PENDING_TTL_SEC;
  const payload = `code:${code}:${exp}`;
  const sig = hmac(payload);
  // Cookien innehåller hash + expiry, inte koden i klartext
  const codeHash = hmac(`code:${code}`);
  const signedValue = `${codeHash}.${exp}.${sig}`;
  return { code, signedValue };
}

/** Verifierar att inmatad kod matchar pending-cookien och inte gått ut. */
export function verifyCode(input: string, signedValue: string): boolean {
  if (!getSecret()) return false;
  const parts = signedValue.split(".");
  if (parts.length !== 3) return false;
  const [codeHash, expStr, sig] = parts;
  const exp = Number(expStr);
  if (!Number.isFinite(exp)) return false;
  if (Math.floor(Date.now() / 1000) > exp) return false;
  // Lokalt: räkna fram förväntad codeHash från inmatad kod
  const expectedHash = hmac(`code:${input}`);
  if (!timingSafeEq(codeHash, expectedHash)) return false;
  // Validera att hela signed-värdet är HMAC-signerat (motverkar att någon
  // postar in egen cookie utan giltig server-secret).
  const expectedSig = hmac(`code:${input}:${exp}`);
  return timingSafeEq(sig, expectedSig);
}

// ============================ COOKIE-OPTIONS ============================

export function adminCookieOptions() {
  return {
    name: ADMIN_COOKIE,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: AUTH_TTL_SEC,
  };
}

export function pendingCookieOptions() {
  return {
    name: ADMIN_PENDING_COOKIE,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: PENDING_TTL_SEC,
  };
}

export function getOtpRecipient(): string {
  return process.env.ADMIN_OTP_RECIPIENT ?? "info@optimeraenergi.se";
}

export function isAdminAuthConfigured(): boolean {
  return !!getSecret();
}
