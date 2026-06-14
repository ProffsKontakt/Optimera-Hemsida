/**
 * Klientside-attribution för closed-loop-spårning.
 *
 * Fångar Google-klick-id (gclid/gbraid/wbraid) + UTM:er när besökaren landar
 * från en annons, och GA4:s client_id från _ga-cookien. Dessa följer med
 * offertinskickningen in i CRM:et (Sentinel HQ), så att CRM:et senare kan
 * rapportera tillbaka till Google Ads / GA4 vilka leads som faktiskt köpte
 * (offline conversions / Measurement Protocol). Utan dessa id:n går det inte
 * att stänga loopen mellan annonsklick och affär.
 */
export type Attribution = {
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  gaClientId?: string;
  landingPage?: string;
  referrer?: string;
  firstSeen?: string;
};

const KEY = "oe_attribution";
const MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000; // 90 dagar

/** Körs på landning. Sparar klick-id/UTM om de finns i URL:en. */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  try {
    const url = new URL(window.location.href);
    const p = url.searchParams;
    const incoming: Attribution = {};
    for (const k of ["gclid", "gbraid", "wbraid"] as const) {
      const v = p.get(k);
      if (v) incoming[k] = v;
    }
    const utm: [string, keyof Attribution][] = [
      ["utm_source", "utmSource"],
      ["utm_medium", "utmMedium"],
      ["utm_campaign", "utmCampaign"],
      ["utm_term", "utmTerm"],
      ["utm_content", "utmContent"],
    ];
    for (const [q, f] of utm) {
      const v = p.get(q);
      if (v) (incoming[f] as string) = v;
    }

    const hasNew = Object.keys(incoming).length > 0;
    const existing = getStoredAttribution();

    // Skriv bara över om denna landning faktiskt bär klick-/kampanjdata,
    // annars behåller vi det första (annons-)anslaget.
    if (!hasNew && existing) return;

    const merged: Attribution = {
      ...(existing ?? {}),
      ...incoming,
      landingPage: existing?.landingPage ?? url.pathname + url.search,
      referrer: existing?.referrer ?? (document.referrer || undefined),
      firstSeen: existing?.firstSeen ?? new Date().toISOString(),
    };
    window.localStorage.setItem(
      KEY,
      JSON.stringify({ ...merged, _ts: Date.now() }),
    );
  } catch {
    // localStorage kan kasta i privat läge – ignorera
  }
}

export function getStoredAttribution(): Attribution | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const obj = JSON.parse(raw) as Attribution & { _ts?: number };
    if (obj._ts && Date.now() - obj._ts > MAX_AGE_MS) {
      window.localStorage.removeItem(KEY);
      return null;
    }
    const { _ts: _drop, ...rest } = obj;
    return rest;
  } catch {
    return null;
  }
}

/** GA4 client_id ur _ga-cookien (format GA1.1.<client_id>). */
export function getGaClientId(): string | undefined {
  if (typeof document === "undefined") return undefined;
  const m = document.cookie.match(/_ga=GA\d\.\d\.(\d+\.\d+)/);
  return m ? m[1] : undefined;
}

/** Allt vi vet vid submit-tillfället (stored + färsk client_id). */
export function collectAttribution(): Attribution {
  const stored = getStoredAttribution() ?? {};
  const gaClientId = getGaClientId();
  return { ...stored, ...(gaClientId ? { gaClientId } : {}) };
}
