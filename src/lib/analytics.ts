/**
 * Event-hjälpare för GA4 + GTM. Säker att anropa när analytics inte är
 * aktivt – då blir det no-op.
 *
 * VIKTIGT – två kanaler, båda behövs:
 *   1. `dataLayer.push({event: NAMN, ...})` – det ENDA formatet som GTM:s
 *      Custom Event-triggers kan fyra på. Google Ads konverterings- och
 *      remarketing-taggar i GTM-containern triggas härifrån.
 *   2. `gtag('event', NAMN, ...)` – skickar samma event direkt till GA4
 *      (G-5DY857B8TL). gtag-anrop pushar ett Arguments-objekt till dataLayer
 *      som GTM-triggers INTE ser, därför räcker inte gtag ensamt.
 *
 * Event-taxonomi (se docs/analytics-ads-setup.md för GTM-mappningen):
 *   - generate_lead   offertformuläret skickat (primär konvertering,
 *                     med value/currency + services)
 *   - form_start      första interaktionen med offertformuläret (mikro)
 *   - phone_click     klick på tel:-länk (mikro)
 *   - email_click     klick på mailto:-länk (mikro)
 *   - user_data_ready hashad e-post/telefon för Enhanced Conversions
 */
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** GTM-vänlig push ({event: ...}-objekt, inte gtag-arguments). */
export function pushDataLayer(obj: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(obj);
}

export function trackEvent(
  name: string,
  params: Record<string, unknown> = {},
): void {
  if (typeof window === "undefined") return;
  // 1) GTM-triggbart event (Ads-taggar i containern).
  pushDataLayer({ event: name, ...params });
  // 2) Samma event direkt till GA4 via gtag.
  if (typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }
}

/** True om besökaren samtyckt till marknadsförings-cookies i Cookiebot. */
function marketingConsentGranted(): boolean {
  if (typeof window === "undefined") return false;
  const cb = (window as unknown as { Cookiebot?: { consent?: { marketing?: boolean } } })
    .Cookiebot;
  return !!cb?.consent?.marketing;
}

async function sha256Hex(input: string): Promise<string> {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(input),
  );
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/** Svenska nummer till E.164 (+46...), Googles krav för matchning. */
function normalizePhoneE164(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) return digits;
  const d = digits.replace(/\D/g, "");
  if (d.startsWith("0")) return "+46" + d.slice(1);
  if (d.startsWith("46")) return "+" + d;
  return "+" + d;
}

/**
 * Enhanced Conversions: hashar (SHA-256) e-post/telefon klientside och
 * skickar som user_data INNAN konverteringseventet. Förbättrar
 * matchningsgraden i Google Ads rejält (särskilt under Consent Mode).
 * Skickas BARA om besökaren samtyckt till marknadsföringscookies –
 * rådatan lämnar aldrig webbläsaren, bara hashen.
 *
 * Två mottagare:
 *   1. gtag('set','user_data',…) – för Google-taggen (gtag-vägen).
 *   2. dataLayer.push({event:'user_data_ready', user_data:{…}}) – för
 *      GTM: mappa en Data Layer-variabel `user_data` till Ads-taggens
 *      "User-provided data"-fält (hashade nycklar sha256_email_address /
 *      sha256_phone_number accepteras rakt av).
 */
export async function setEnhancedConversionData(
  email?: string,
  phone?: string,
): Promise<void> {
  if (typeof window === "undefined") return;
  if (!marketingConsentGranted()) return;
  if (typeof crypto === "undefined" || !crypto.subtle) return;
  const userData: Record<string, string> = {};
  try {
    if (email) userData.sha256_email_address = await sha256Hex(normalizeEmail(email));
    if (phone) userData.sha256_phone_number = await sha256Hex(normalizePhoneE164(phone));
  } catch {
    return;
  }
  if (Object.keys(userData).length === 0) return;
  if (typeof window.gtag === "function") {
    window.gtag("set", "user_data", userData);
  }
  pushDataLayer({ event: "user_data_ready", user_data: userData });
}
