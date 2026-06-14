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
