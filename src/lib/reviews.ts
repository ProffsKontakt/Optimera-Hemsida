import fs from "fs";
import path from "path";

/**
 * Kundrecensioner (från Reco) som visas på landningssidan.
 *
 * Kureras i /admin/recensioner: välj vilka som visas (visible), redigera
 * text/namn/ort, ändra ordning, lägg till nya från Reco-profilen.
 * Sparas i data/reviews.json via GitHub-commit (samma mönster som team-
 * och media-CMS:en) -> live efter deploy (1–2 min).
 */
export type Review = {
  /** Stabil nyckel. */
  id: string;
  /** Namn som det står på Reco, t.ex. "Familjen Lindh". */
  author: string;
  /** Ort + ev. tjänst, t.ex. "Vaxholm · Sol + batteri". */
  place: string;
  text: string;
  /** Visas på sajten? Låter er ha hela Reco-arkivet här men bara lyfta de bästa. */
  visible: boolean;
};

export const DEFAULT_REVIEWS: Review[] = [
  {
    id: "lindh-vaxholm",
    author: "Familjen Lindh",
    place: "Vaxholm · Sol + batteri",
    text: "En jättetrevlig och kunnig kille kom faktiskt över med kanelbullar och stannade i två timmar för att få fram vilken lösning som var bäst för oss. Han pitchade inget utan var genuin och hjälpte oss. Han och hans kollega tog ett varv runt huset och ritade senare upp en lösning som faktiskt funkar för vårt skogshem. Två år senare är vi helt självgående på vår- och sommarhalvåret, med riktigt låga räkningar på höst- och vinterhalvåret. Kan varmt rekommendera Dexter och hans gäng.",
    visible: true,
  },
  {
    id: "berglund-saltsjobaden",
    author: "Anna Berglund",
    place: "Saltsjöbaden · Bergvärme",
    // Dold som standard – bergvärme/värmepump är pausat som tjänst.
    text: "Det är första gången jag känt att en elfirma faktiskt bryr sig om hela huset. De ville se min radiatorkurva innan de pratade pump.",
    visible: false,
  },
  {
    id: "hassan-erik-bromma",
    author: "Hassan & Erik",
    place: "Bromma · Sol + laddbox",
    text: "Petter borrade nya kabelvägar i en dag bara för att det skulle se snyggt ut. Det är en sån sak man inte vet att man vill ha förrän man får det.",
    visible: true,
  },
];

const REVIEWS_PATH = path.join(process.cwd(), "data", "reviews.json");

function isValidReview(r: unknown): r is Review {
  if (!r || typeof r !== "object") return false;
  const x = r as Record<string, unknown>;
  return (
    typeof x.id === "string" &&
    x.id.length > 0 &&
    typeof x.author === "string" &&
    typeof x.text === "string"
  );
}

/** Alla recensioner (för admin), admin-redigerade eller default. */
export function getAllReviews(): Review[] {
  try {
    if (fs.existsSync(REVIEWS_PATH)) {
      const raw = JSON.parse(fs.readFileSync(REVIEWS_PATH, "utf-8"));
      if (Array.isArray(raw)) {
        const valid = raw.filter(isValidReview);
        if (valid.length > 0) {
          return valid.map((r) => ({
            id: r.id,
            author: r.author,
            place: typeof r.place === "string" ? r.place : "",
            text: r.text,
            visible: r.visible !== false,
          }));
        }
      }
    }
  } catch {
    /* fall through till default */
  }
  return DEFAULT_REVIEWS;
}

/** De recensioner som ska visas publikt, i vald ordning. */
export function getVisibleReviews(): Review[] {
  return getAllReviews().filter((r) => r.visible);
}
