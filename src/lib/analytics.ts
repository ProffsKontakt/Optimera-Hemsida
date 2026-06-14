/**
 * Tunn GA4-hjälpare. Skickar events till gtag om det finns laddat (och
 * besökaren samtyckt via Cookiebot/Consent Mode). Säker att anropa även
 * när analytics inte är aktivt, då blir det no-op.
 *
 * Dessa events är grunden för konverteringsspårning i GA4 och, i nästa steg,
 * import som konverteringar i Google Ads:
 *   - generate_lead   offertformuläret skickat (den primära konverteringen)
 *   - phone_click     klick på tel:-länk
 *   - email_click     klick på mailto:-länk
 */
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function trackEvent(
  name: string,
  params: Record<string, unknown> = {},
): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }
  window.gtag("event", name, params);
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
 * skickar som user_data till Google-taggen INNAN konverteringseventet.
 * Förbättrar matchningsgraden i Google Ads rejält (särskilt under Consent
 * Mode). Skickas BARA om besökaren samtyckt till marknadsföringscookies –
 * rådatan lämnar aldrig webbläsaren, bara hashen.
 */
export async function setEnhancedConversionData(
  email?: string,
  phone?: string,
): Promise<void> {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  if (!marketingConsentGranted()) return;
  if (typeof crypto === "undefined" || !crypto.subtle) return;
  const userData: Record<string, string> = {};
  try {
    if (email) userData.sha256_email_address = await sha256Hex(normalizeEmail(email));
    if (phone) userData.sha256_phone_number = await sha256Hex(normalizePhoneE164(phone));
  } catch {
    return;
  }
  if (Object.keys(userData).length > 0) {
    window.gtag("set", "user_data", userData);
  }
}
