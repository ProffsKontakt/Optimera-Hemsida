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

/** Ett omdöme som det står på Reco (för importen i /admin/recensioner). */
export type RecoReview = {
  /** Föreslagen nyckel i data/reviews.json, t.ex. "lars-b-reco". */
  id: string;
  author: string;
  /** "Reco · oktober 2026" – samma format som de befintliga. */
  place: string;
  text: string;
  rating?: number;
  /** ISO-datum från Reco. */
  date: string;
  url?: string;
};

const MONTHS = [
  "januari", "februari", "mars", "april", "maj", "juni",
  "juli", "augusti", "september", "oktober", "november", "december",
];

export function slugifyAuthor(author: string): string {
  return (
    author
      .trim()
      .toLowerCase()
      .replace(/[åä]/g, "a")
      .replace(/ö/g, "o")
      .replace(/é/g, "e")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40) || "recension"
  );
}

/** Rensar texten som de andra recensionerna: ett stycke, inga emojis. */
function cleanText(body: string): string {
  const text = body
    .replace(/\p{Extended_Pictographic}|\u{FE0F}|\u{200D}/gu, "")
    .replace(/\s*\n+\s*/g, " ")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\s+([!?.,])/g, "$1")
    .trim();
  if (text.length <= 2000) return text;
  const cut = text.slice(0, 1990);
  return cut.slice(0, cut.lastIndexOf(".") + 1 || 1990) + " …";
}

/** De senaste omdömena på Reco-profilen (Reco lägger de 5 senaste i JSON-LD). */
export function parseRecoReviews(html: string): RecoReview[] {
  const out: RecoReview[] = [];
  const blocks = html.match(/<script[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/g) ?? [];
  const walk = (node: unknown) => {
    if (Array.isArray(node)) return node.forEach(walk);
    if (!node || typeof node !== "object") return;
    const obj = node as Record<string, unknown>;
    if (typeof obj.reviewBody === "string") {
      const authorNode = obj.author as { name?: unknown } | string | undefined;
      const author = typeof authorNode === "string" ? authorNode : String(authorNode?.name ?? "").trim();
      const date = String(obj.datePublished ?? "");
      // Månaden direkt ur strängen – via Date skulle t.ex. 1 oktober 00:00
      // svensk tid bli 30 september i UTC.
      const ym = date.match(/^(\d{4})-(\d{2})/);
      const rating = Number((obj.reviewRating as { ratingValue?: unknown } | undefined)?.ratingValue);
      if (author) {
        out.push({
          id: `${slugifyAuthor(author)}-reco`,
          author,
          place: ym ? `Reco · ${MONTHS[Number(ym[2]) - 1]} ${ym[1]}` : "Reco",
          text: cleanText(obj.reviewBody),
          ...(rating >= 1 && rating <= 5 ? { rating: Math.round(rating) } : {}),
          date,
          ...(typeof obj.url === "string" ? { url: obj.url } : {}),
        });
      }
    }
    Object.values(obj).forEach(walk);
  };
  for (const block of blocks) {
    try {
      walk(JSON.parse(block.replace(/^<script[^>]*>/, "").replace(/<\/script>$/, "")));
    } catch {
      /* nästa block */
    }
  }
  return out;
}

/** Färsk hämtning (ingen cache) – för admin-importen. Kastar vid fel. */
export async function fetchRecoReviews(): Promise<{ reviews: RecoReview[]; average?: string; count?: number }> {
  const res = await fetch(RECO.url, {
    cache: "no-store",
    headers: {
      "user-agent": "Mozilla/5.0 (compatible; OptimeraEnergiBot/1.0; +https://optimeraenergi.se)",
      "accept-language": "sv-SE,sv;q=0.9",
    },
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`Reco svarade ${res.status}`);
  const html = await res.text();
  const agg = parseRecoHtml(html);
  return {
    reviews: parseRecoReviews(html),
    ...(agg ? { average: formatAverage(agg.average), count: agg.count } : {}),
  };
}
