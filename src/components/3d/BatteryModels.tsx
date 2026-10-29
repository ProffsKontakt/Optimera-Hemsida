"use client";

/**
 * Batterierna i kalkylatorn och på startsidan, ett per märke i sortimentet.
 * Själva modellerna ligger i ./products och är byggda efter produktbilder
 * och datablad, i meter. Scenerna skalar dem med samma faktor som huset
 * (REAL_SCALE i CalcScene/HeroLab) så att storleken stämmer mot fasaden –
 * en full Eway-stapel på 61,44 kWh är 138,6 cm hög.
 *
 *   Eway (Easyway)   – 7,68 kWh per modul, max 8 per stapel
 *   SAJ HS3          – 5 kWh per modul, 1–3 per stack, inbyggd växelriktare
 *   Enershare        – 3,2 kWh per modul, max 8 per torn (25,6 kWh)
 *   Sigenergy SigenStor – 9 kWh per modul, max 6 per stack (54 kWh)
 *   Fox ESS CQ7      – 7,02 kWh per modul, 2–14 per stack (98,28 kWh)
 */
import { SceneLabel } from "./SceneLabel";
import { EwayBattery, ewayModules, ewayStackHeight } from "./products/EwayBattery";
import { SajHS3, sajHeight, sajModules } from "./products/SajHS3";
import { EnershareCore, enershareModules, enershareTowerHeight } from "./products/EnershareCore";
import { SigenStor, sigenModules, sigenStackHeight } from "./products/SigenStor";
import { FoxCQ7, foxModules, foxStackHeight } from "./products/FoxCQ7";

/** "61,44" / "10" / "9,6" – kWh som det skrivs på svenska, utan onödiga nollor. */
export function formatKWh(kWh: number) {
  return String(Math.round(kWh * 100) / 100).replace(".", ",");
}

type ModelSpec = {
  name: string;
  modules: (kWh: number) => number;
  /** Höjd i meter för en stack (används för etikettens placering). */
  height: (kWh: number) => number;
  detail?: string;
  Model: (p: { capacityKWh: number }) => JSX.Element;
};

export const BATTERY_MODELS: Record<string, ModelSpec> = {
  "easyway-univ7600": { name: "Eway", modules: ewayModules, height: (k) => ewayStackHeight(ewayModules(k)), Model: EwayBattery },
  "saj-hs3": { name: "SAJ HS3", modules: sajModules, height: (k) => sajHeight(sajModules(k)), detail: "inbyggd växelriktare", Model: SajHS3 },
  "enershare-core": {
    name: "Enershare",
    modules: enershareModules,
    height: (k) => enershareTowerHeight(enershareModules(k)),
    Model: EnershareCore,
  },
  sigenstor: {
    name: "SigenStor",
    modules: sigenModules,
    height: (k) => sigenStackHeight(sigenModules(k)),
    detail: "inbyggd växelriktare",
    Model: SigenStor,
  },
  "fox-cq7": {
    name: "Fox ESS CQ7",
    modules: foxModules,
    height: (k) => foxStackHeight(foxModules(k)),
    Model: FoxCQ7,
  },
};

export function BatteryByBrand({ brandId, capacityKWh }: { brandId: string; capacityKWh: number }) {
  const spec = BATTERY_MODELS[brandId] ?? BATTERY_MODELS["easyway-univ7600"];
  const n = spec.modules(capacityKWh);
  const parts = [spec.name, `${formatKWh(capacityKWh)} kWh`, spec.detail ?? `${n} moduler`];
  return (
    <group>
      <spec.Model capacityKWh={capacityKWh} />
      <SceneLabel parts={parts} position={[0.55, -0.05, 0]} />
    </group>
  );
}
