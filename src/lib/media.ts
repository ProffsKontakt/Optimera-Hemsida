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
   * "video": sloten tar en film i stället för en bild – antingen en fil
   * som laddas upp direkt till Vercel Blob eller en YouTube-/Vimeo-länk
   * (se lib/video.ts). Default är bild.
   */
  kind?: "image" | "video";
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

/**
 * Antal foto-platser i installationsgalleriet på om-oss. Galleriet visar
 * BARA platser som har en uppladdad bild – tomma platser syns inte, och
 * finns det inga bilder alls döljs hela sektionen. (Tidigare låg fyra grå
 * platshållare där med påhittade bildtexter som "Easyway 23 kWh inomhus,
 * Bromma" – specifika installationer utan bild var sämre än ingen bild.)
 */
export const INSTALLATION_SLOT_COUNT = 8;

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
    {
      id: "om-oss:grundarfilm",
      group: "Om oss",
      label: "Grundarfilmen (video)",
      aspect: "16 / 9",
      kind: "video" as const,
      hint: "Filmen om hur Optimera grundades. Ladda upp filen direkt (MP4, helst 1080p och under ~200 MB) – eller klistra in en YouTube-/Vimeo-länk. Egen uppladdning rekommenderas: ingen tredjepart, och den spelas även för besökare som nekat cookies. Sektionen visar grundarnas porträtt tills en film finns.",
    },
    {
      id: "om-oss:grundarfilm-omslag",
      group: "Om oss",
      label: "Grundarfilmen – omslagsbild",
      aspect: "16 / 9",
      hint: "Stillbilden som visas innan man trycker play. Valfri – utan den visas en mörk ruta med play-knapp.",
      maxWidth: 1600,
    },
    ...Array.from({ length: INSTALLATION_SLOT_COUNT }, (_, i) => ({
      id: `installation:${i + 1}`,
      group: "Installationer (om-oss)",
      label: `Installationsfoto ${i + 1}`,
      aspect: "4 / 5",
      hint: "Riktigt foto från en färdig installation (elskåp, batteri, tak). Alt-texten visas som bildtext – t.ex. \"Easyway 23 kWh inomhus, Bromma\". Tomma platser syns inte på sajten.",
      // Rutorna är ~300px breda på desktop, ~170px på mobil -> 900 räcker för 2x.
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

/** Uppladdade installationsfoton i slot-ordning (tomma platser hoppas över). */
export function getInstallationPhotos(): (MediaEntry & { slotId: string })[] {
  const manifest = getMediaManifest();
  const photos: (MediaEntry & { slotId: string })[] = [];
  for (let i = 1; i <= INSTALLATION_SLOT_COUNT; i++) {
    const slotId = `installation:${i}`;
    const entry = manifest[slotId];
    if (entry && entry.url) photos.push({ ...entry, slotId });
  }
  return photos;
}
