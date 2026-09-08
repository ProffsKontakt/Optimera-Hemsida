import fs from "fs";
import path from "path";
import { GUIDES } from "./guides";
import { NEWS } from "./news";
import { getTeam } from "./team";

/**
 * Media-CMS: admin väljer vilken bild som ligger i vilken "slot" (t.ex. ett
 * team-porträtt eller en guides hero-bild). Bild-binärerna lagras på Vercel
 * Blob (CDN); MAPPNINGEN (slot -> url + alt) ligger i data/media-manifest.json
 * och committas via GitHub (samma mönster som press-CMS:en), så valen är
 * versionshanterade och granskningsbara.
 */

export type MediaSlot = {
  /** Stabil id, t.ex. "team:julian" eller "guide:gront-avdrag-2026". */
  id: string;
  /** Grupp i admin-UI:t. */
  group: string;
  /** Visningsnamn i admin. */
  label: string;
  /** CSS aspect-ratio för förhandsvisning + uppladdningsruta. */
  aspect: string;
  /** Hjälptext om vad bilden ska föreställa. */
  hint?: string;
  /** Visa frostnings-reglage (0–100) för sloten i admin. */
  frost?: boolean;
  /**
   * Största bredd (px) bilden sparas i. Uppladdningen skalar ned till detta
   * och konverterar till WebP – så vi håller sajten snabb utan att någon
   * behöver tänka på bildoptimering. Sätts efter hur stort slottet visas
   * (2x för retina). Default: DEFAULT_MAX_WIDTH.
   */
  maxWidth?: number;
};

/** Fallback-bredd för slots utan egen maxWidth. */
export const DEFAULT_MAX_WIDTH = 1600;

export type MediaEntry = {
  url: string;
  alt: string;
  updatedAt?: string;
  /** Frostningsgrad 0–100 (blur + ljus wash) där sloten stödjer det. */
  frost?: number;
};

export type MediaManifest = Record<string, MediaEntry>;

const MANIFEST_PATH = path.join(process.cwd(), "data", "media-manifest.json");

/** Alla slots som går att fylla med bild, byggt från team + guider. */
export function listMediaSlots(): MediaSlot[] {
  return [
    {
      id: "demo:hero-landningsida",
      group: "Startsida",
      label: "Hero-bakgrund (första vyn)",
      // Stående förhandsvisning – bilden används främst som mobilens
      // fullskärmsbakgrund (porträttläge) och beskärs med object-cover.
      aspect: "9 / 16",
      hint: "STÅENDE bild. Mobil: frostad fullskärmsbakgrund bakom hero-texten (frostgrad enligt reglaget). Desktop: bilden visas i hero-kortet i stället för 3D-huset.",
      frost: true,
      // Fullskärmsbakgrund på mobil, men frostas/blurras – behöver inte
      // vara knivskarp.
      maxWidth: 1400,
    },
    ...getTeam().map((m) => ({
      id: `team:${m.id}`,
      group: "Team (om-oss)",
      label: m.name,
      aspect: "4 / 5",
      hint: "Stående porträtt. Visas annars som färggradient.",
      // Kortet är ~460px brett på desktop, ~190px på mobil -> 900 = 2x.
      maxWidth: 900,
    })),
    ...GUIDES.map((g) => ({
      id: `guide:${g.slug}`,
      group: "Guider",
      label: g.title,
      aspect: "16 / 9",
      hint: "Hero-bild överst i guiden. Helst riktigt installationsfoto.",
    })),
    ...NEWS.map((n) => ({
      id: `news:${n.slug}`,
      group: "Nyheter",
      label: n.title,
      aspect: "16 / 9",
      hint: "Hero-bild ovanför rubriken på nyhetskortet och artikeln. Har en committad standardbild – ladda upp här för att ersätta den.",
    })),
    // (Offert-funnelns kort är numera ikon-plattor – inga foto-slots.)
  ];
}

export function isValidSlot(id: string): boolean {
  return listMediaSlots().some((s) => s.id === id);
}

export function getMediaManifest(): MediaManifest {
  try {
    if (!fs.existsSync(MANIFEST_PATH)) return {};
    return JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf-8")) as MediaManifest;
  } catch {
    return {};
  }
}

/** Hämta bild för en slot, eller null om ingen valts. */
export function getMedia(slotId: string): MediaEntry | null {
  const entry = getMediaManifest()[slotId];
  return entry && entry.url ? entry : null;
}
