import fs from "fs";
import path from "path";
import { GUIDES } from "./guides";
import { getTeam } from "./team";
import { FUNNEL_PRODUCTS } from "./funnels";

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
};

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
    },
    ...getTeam().map((m) => ({
      id: `team:${m.id}`,
      group: "Team (om-oss)",
      label: m.name,
      aspect: "4 / 5",
      hint: "Stående porträtt. Visas annars som färggradient.",
    })),
    ...GUIDES.map((g) => ({
      id: `guide:${g.slug}`,
      group: "Guider",
      label: g.title,
      aspect: "16 / 9",
      hint: "Hero-bild överst i guiden. Helst riktigt installationsfoto.",
    })),
    // Produktfoton i offert-funnelns steg 1 (/offert-fb m.fl.). Visas som
    // färggradient tills ett foto laddats upp.
    ...FUNNEL_PRODUCTS.map((p) => ({
      id: p.mediaSlot,
      group: "Offert-funnel",
      label: p.title,
      aspect: "4 / 3",
      hint: "Produktfoto i funnel-kortet. Helst egen installation, liggande.",
    })),
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
