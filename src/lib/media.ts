import fs from "fs";
import path from "path";
import { GUIDES } from "./guides";
import { TEAM } from "./team";

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
};

export type MediaEntry = {
  url: string;
  alt: string;
  updatedAt?: string;
};

export type MediaManifest = Record<string, MediaEntry>;

const MANIFEST_PATH = path.join(process.cwd(), "data", "media-manifest.json");

/** Alla slots som går att fylla med bild, byggt från team + guider. */
export function listMediaSlots(): MediaSlot[] {
  return [
    {
      id: "demo:hero-landningsida",
      group: "Demo",
      label: "Landningssida – hero-bild",
      aspect: "4 / 5",
      hint: "Ersätter 3D-scenen i hero på demo-landningssidan. Stående bild.",
    },
    ...TEAM.map((m) => ({
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
