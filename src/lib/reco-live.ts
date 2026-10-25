import { RECO } from "./reco";

/**
 * Betyget hämtat direkt från Reco-profilen, så att antalet omdömen och
 * snittbetyget uppdateras av sig själva när nya omdömen kommer in.
 *
 * Läser profilsidans JSON-LD (aggregateRating) med Next:s datacache:
 * sidan hämtas högst en gång i timmen, och sidorna som använder siffrorna
 * byggs om i bakgrunden (ISR). Går hämtningen inte igenom – Reco nere,
 * ändrad sidstruktur, timeout – används de senast kända siffrorna i
 * lib/reco.ts, så sajten visar aldrig ett tomt eller trasigt betyg.
 *
 * Bara för serverkomponenter och route handlers (gör ett nätverksanrop).
 */
export type RecoStats = {
  /** Snittbetyg som det skrivs på svenska, t.ex. "4,8". */
  average: string;
  /** Antal omdömen totalt på profilen. */
  count: number;
  url: string;
  /** true = hämtat från Reco nu, false = reservsiffrorna i lib/reco.ts. */
  live: boolean;
};

/** Hur ofta Reco-profilen hämtas om (sekunder). */
export const RECO_REVALIDATE_SECONDS = 3600;

const FALLBACK: RecoStats = {
  average: RECO.average,
  count: RECO.count,
  url: RECO.url,
  live: false,
};

function formatAverage(value: number): string {
  return value.toFixed(1).replace(".", ",");
}

function findAggregate(node: unknown): { ratingValue?: unknown; ratingCount?: unknown; reviewCount?: unknown } | null {
  if (Array.isArray(node)) {
    for (const item of node) {
      const hit = findAggregate(item);
      if (hit) return hit;
    }
    return null;
  }
  if (node && typeof node === "object") {
    const obj = node as Record<string, unknown>;
    if (obj.aggregateRating && typeof obj.aggregateRating === "object") {
      return obj.aggregateRating as Record<string, unknown>;
    }
    for (const value of Object.values(obj)) {
      const hit = findAggregate(value);
      if (hit) return hit;
    }
  }
  return null;
}

/** Plockar ut snittbetyg och antal ur Reco-sidans HTML. Exporteras för test. */
export function parseRecoHtml(html: string): { average: number; count: number } | null {
  const blocks = html.match(/<script[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/g) ?? [];
  for (const block of blocks) {
    const json = block.replace(/^<script[^>]*>/, "").replace(/<\/script>$/, "");
    try {
      const agg = findAggregate(JSON.parse(json));
      if (!agg) continue;
      const average = Number(agg.ratingValue);
      const count = Number(agg.ratingCount ?? agg.reviewCount);
      if (average >= 1 && average <= 5 && Number.isInteger(count) && count > 0) {
        return { average, count };
      }
    } catch {
      /* nästa block */
    }
  }
  // Reserv: sidtiteln, "Optimera Energi, Solna – 4,8/5 (19 omdömen) - Reco.se".
  const title = html.match(/(\d)[,.](\d)\/5 \((\d+) omdömen\)/);
  if (title) {
    const average = Number(`${title[1]}.${title[2]}`);
    const count = Number(title[3]);
    if (average >= 1 && average <= 5 && count > 0) return { average, count };
  }
  return null;
}

export async function getRecoStats(): Promise<RecoStats> {
  try {
    const res = await fetch(RECO.url, {
      next: { revalidate: RECO_REVALIDATE_SECONDS },
      headers: {
        "user-agent": "Mozilla/5.0 (compatible; OptimeraEnergiBot/1.0; +https://optimeraenergi.se)",
        "accept-language": "sv-SE,sv;q=0.9",
      },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return FALLBACK;
    const parsed = parseRecoHtml(await res.text());
    if (!parsed) return FALLBACK;
    return { average: formatAverage(parsed.average), count: parsed.count, url: RECO.url, live: true };
  } catch {
    return FALLBACK;
  }
}
