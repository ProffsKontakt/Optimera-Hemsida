import fs from "fs";
import path from "path";

/**
 * Pressmeddelanden lagras som JSON-filer under data/press/<slug>.json.
 * Skapas via admin-formuläret som commitar via GitHub REST API direkt
 * mot repo:t, vilket triggar en Vercel-deploy och får releasen live.
 *
 * Datat läses här server-side vid build (statiska sidor) eller request
 * (ISR). Eftersom det inte ändras ofta (5-15/år) är fullständig static
 * generation det rätta valet.
 */

export type PressRelease = {
  slug: string;
  title: string;
  /** ISO 8601 (yyyy-mm-dd). */
  date: string;
  /** Kort ingress, 2-3 meningar. Visas i listor och som meta-description. */
  lede: string;
  /** Brödtext i markdown-ish format. Stycken separeras med blank rad. */
  body: string;
  author: {
    name: string;
    title: string;
    email: string;
    /** Telefon visas på artikelsidan och i tel:-länken. Optional för
     *  bakåtkompatibilitet, faller tillbaka till sajtens nummer i render. */
    phone?: string;
  };
  /** Optional citat-block för pull-quote i artikeln. */
  quote?: {
    text: string;
    attribution: string;
  };
  /** Visa som banderoll på startsidan + alla sidor (sticky topbar). */
  featured?: boolean;
  /** ISO 8601 datetime då banderollen automatiskt slutar visas.
   *  null/undefined = ingen auto-utgång, banderollen syns tills admin
   *  avmarkerar featured. */
  featuredUntil?: string;
};

const PRESS_DIR = path.join(process.cwd(), "data", "press");

export function getAllPressReleases(): PressRelease[] {
  if (!fs.existsSync(PRESS_DIR)) return [];
  const files = fs
    .readdirSync(PRESS_DIR)
    .filter((f) => f.endsWith(".json"))
    .sort()
    .reverse(); // nyaste först (lex-sort på datum-prefixad slug)
  return files
    .map((f) => {
      try {
        const raw = fs.readFileSync(path.join(PRESS_DIR, f), "utf-8");
        return JSON.parse(raw) as PressRelease;
      } catch {
        return null;
      }
    })
    .filter((r): r is PressRelease => r !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPressRelease(slug: string): PressRelease | null {
  const file = path.join(PRESS_DIR, `${slug}.json`);
  if (!fs.existsSync(file)) return null;
  try {
    return JSON.parse(fs.readFileSync(file, "utf-8")) as PressRelease;
  } catch {
    return null;
  }
}

/**
 * Returnerar den release som ska visas som banderoll på startsidan.
 *
 * Regler:
 *   featured === true OCH (ingen featuredUntil ELLER featuredUntil > now)
 *
 * Vid flera kvalificerade releases vinner den med senast `date`.
 * Returnerar null om ingen ska visas.
 */
export function getFeaturedPressRelease(): PressRelease | null {
  const now = Date.now();
  const candidates = getAllPressReleases().filter((r) => {
    if (!r.featured) return false;
    if (!r.featuredUntil) return true;
    const until = Date.parse(r.featuredUntil);
    return Number.isFinite(until) && until > now;
  });
  return candidates[0] ?? null;
}
