// Takgeometrin i kalkylatorns 3D-hus, utan three.js – så att både scenen och
// inmatningen (reglaget för antal paneler) kan använda samma mått.
import type { RoofType } from "@/lib/catalog";

// ----- Hus-mått (metaforisk skala). Allt 3D-arbete utgår från dessa.
export const HOUSE = {
  width: 3.4, // x-led (gavel-till-gavel = nockens längd)
  depth: 2.6, // z-led (takfot-till-takfot)
  wallH: 1.0,
  ridgeH: 0.95, // höjd från vägg-toppen upp till nocken
  wallY: 0, // mittpunkt på väggen (centrum y)
};
export const wallTopY = HOUSE.wallY + HOUSE.wallH / 2; // y där taket börjar
export const ridgeY = wallTopY + HOUSE.ridgeH; // y för nocken (sadeltak/mansard/valmat)
export const slopeRun = HOUSE.depth / 2;
export const slopeAngle = Math.atan2(HOUSE.ridgeH, slopeRun); // sadel-taklutning

// Valmat-takets nocklängd (kortare än husets bredd, men längre än ren pyramid).
// 0,7 × bredden ger realistiskt hip-utseende: trapezerna dominerar, hip-end-
// trianglarna är små. Påverkar både roof-meshen och solpanelernas widthM.
export const HIP_RIDGE_LEN = HOUSE.width * 0.7;

// =============== SOLPANEL-SURFACES per taktyp ===============
// En SolarSurface beskriver ett rektangulärt område där paneler kan placeras.
// Panelens grid byggs i lokal XY-plan med (0,0) i centrum, sedan flyttas
// gruppen via position och roteras via rotation.
export type SolarSurface = {
  position: [number, number, number];
  rotation: [number, number, number];
  /** Bredd (lokal X) och djup (lokal Z) i meter. */
  widthM: number;
  depthM: number;
  /**
   * Valfritt tak för antalet paneler på ytan. Utan det gäller det som får
   * plats i rutnätet (se surfaceGrid) – en fast siffra större än rutnätet
   * gjorde tidigare att paneler "försvann" eftersom de aldrig ritades.
   */
  capacity?: number;
  /**
   * True om lokal +Z går mot toppen av taket (norra slope-konvention med
   * rotation [-α, 0, 0]). Default false: lokal +Z går mot eave (södra
   * slope, rotation [+α, 0, 0]). Styr panelplaceringen så att rad 0 alltid
   * landar i toppen av taket – paneler byggs uppifrån-ner.
   */
  topAtPositiveZ?: boolean;
};

export function getSolarSurfaces(roofType: RoofType): SolarSurface[] {
  const w = HOUSE.width;
  const d = HOUSE.depth;
  const ridge = HOUSE.ridgeH;

  switch (roofType) {
    case "sadeltak": {
      // Två symmetriska takfall, södra (+z) prioriteras.
      const slopeY = wallTopY + ridge / 2;
      const slopeLen = Math.hypot(slopeRun, ridge);
      return [
        {
          position: [0, slopeY, d / 4],
          rotation: [slopeAngle, 0, 0],
          widthM: w - 0.2,
          depthM: slopeLen - 0.15,
          capacity: 24,
        },
        {
          position: [0, slopeY, -d / 4],
          rotation: [-slopeAngle, 0, 0],
          widthM: w - 0.2,
          depthM: slopeLen - 0.15,
          capacity: 24,
          topAtPositiveZ: true,
        },
      ];
    }

    case "pulpettak": {
      // Ett enda takfall över hela djupet. Lågpunkt vid +z, högpunkt vid -z.
      const angle = Math.atan2(ridge, d);
      const slopeLen = Math.hypot(d, ridge);
      const cy = wallTopY + ridge / 2;
      return [
        {
          position: [0, cy, 0],
          rotation: [angle, 0, 0],
          widthM: w - 0.2,
          depthM: slopeLen - 0.15,
          capacity: 36,
        },
      ];
    }

    case "mansardtak": {
      // Mansardtak: en övre flackare del och en nedre brant del per sida.
      // Paneler läggs först på södra övre, sedan södra nedre, sedan norra
      // övre och sist norra nedre. Måtten måste stämma med MansardRoof i
      // CalcScene.
      const inset = slopeRun * 0.36; // hur långt in brytpunkten ligger
      const breakY = ridge * 0.5;
      const upperRun = slopeRun - inset;
      const upperRise = ridge - breakY;
      const upperAngle = Math.atan2(upperRise, upperRun);
      const upperLen = Math.hypot(upperRun, upperRise);
      const cyUpper = wallTopY + breakY + upperRise / 2;
      const czUpper = (slopeRun - inset) / 2; // mittpunkt i z
      const lowerAngle = Math.atan2(breakY, inset);
      const lowerLen = Math.hypot(inset, breakY);
      const cyLower = wallTopY + breakY / 2;
      const czLower = (slopeRun + (slopeRun - inset)) / 2;
      return [
        { position: [0, cyUpper, czUpper], rotation: [upperAngle, 0, 0], widthM: w - 0.2, depthM: upperLen - 0.1 },
        { position: [0, cyLower, czLower], rotation: [lowerAngle, 0, 0], widthM: w - 0.2, depthM: lowerLen - 0.06 },
        { position: [0, cyUpper, -czUpper], rotation: [-upperAngle, 0, 0], widthM: w - 0.2, depthM: upperLen - 0.1, topAtPositiveZ: true },
        { position: [0, cyLower, -czLower], rotation: [-lowerAngle, 0, 0], widthM: w - 0.2, depthM: lowerLen - 0.06, topAtPositiveZ: true },
      ];
    }

    case "valmat": {
      // Hipped roof: 4 takfall, södra långsida (+z) är en trapez. Vi placerar
      // paneler i en rektangel som ryms inom trapezet (begränsad av nockens
      // längd så panelerna inte sticker ut över hip-kanterna).
      const ridgeLen = HIP_RIDGE_LEN;
      const slopeY = wallTopY + ridge / 2;
      const slopeLen = Math.hypot(slopeRun, ridge);
      return [
        {
          position: [0, slopeY, d / 4],
          rotation: [slopeAngle, 0, 0],
          widthM: ridgeLen,
          depthM: slopeLen - 0.2,
          capacity: 24,
        },
        {
          position: [0, slopeY, -d / 4],
          rotation: [-slopeAngle, 0, 0],
          widthM: ridgeLen,
          depthM: slopeLen - 0.2,
          capacity: 24,
          topAtPositiveZ: true,
        },
      ];
    }
  }
}

/** Rutnätet av liggande paneler som ryms på en yta. */
export function surfaceGrid(surface: SolarSurface) {
  // Standardpanel ~1953 × 1134 mm = förhållande 0,58.
  const aspect = 1134 / 1953;
  const cols = surface.widthM > surface.depthM ? 6 : 4;
  const panelW = surface.widthM / cols;
  const panelD = panelW * aspect;
  const rows = Math.max(1, Math.floor(surface.depthM / panelD));
  const fits = rows * cols;
  return { cols, rows, panelW, panelD, capacity: Math.min(fits, surface.capacity ?? fits) };
}

/** Hur många paneler taket rymmer totalt, för reglaget i kalkylatorn. */
export function roofPanelCapacity(roofType: RoofType): number {
  return getSolarSurfaces(roofType).reduce((sum, s) => sum + surfaceGrid(s).capacity, 0);
}
