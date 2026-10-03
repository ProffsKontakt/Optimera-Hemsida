/**
 * Värmepumpar: typer, ROT-regler och Villaeffekten-bidraget.
 *
 * ALLA siffror här är kontrollerade mot primärkällor (okt 2026) – ändra
 * bara efter att ha läst källan på nytt:
 *
 *  - ROT 2026: 30 % av ARBETSKOSTNADEN, max 50 000 kr per person och år
 *    (den tillfälliga höjningen till 50 % gällde bara 12 maj–31 dec 2025).
 *  - Skatteverkets schablon vid totalentreprenad till fast pris: arbetet
 *    räknas som 35 % av totalen för vätska-vattenvärmepump (berg, jord,
 *    sjö) och 30 % för luftvärmepump (luft-vatten, luft-luft, frånluft).
 *    "30 % ROT" blir alltså ca 10,5 resp. 9 % av totalpriset – INTE 30 %.
 *  - Villaeffekten (bidrag för energieffektivisering i småhus): 30 % av
 *    MATERIALKOSTNADEN, max 60 000 kr per småhus, beviljas från 10 000 kr.
 *    Hus med värdeår före 1990, inte anslutet till fjärrvärme, ägaren bor
 *    där stadigvarande. Bergvärme/jord/sjö, luft-vatten och frånluft
 *    omfattas – luft-luft gör det INTE. Söks via Boverkets e-tjänst från
 *    1 sep 2026, normalt inom sex månader. Kan kombineras med ROT (bidraget
 *    gäller material, ROT gäller arbete).
 *
 * Ingen fs-import: används även i klientkomponenter.
 */

export const HEATPUMP_SOURCES = {
  rotSchablon:
    "https://www.skatteverket.se/foretag/skatterochavdrag/rotochrut/gerarbetetratttillrotavdrag.4.5c1163881590be297b5173bf.html",
  rot: "https://www.skatteverket.se/privat/fastigheterochbostad/rotarbeteochrutarbete/safungerarrotavdraget.4.5947400c11f47f7f9dd80004014.html",
  villaeffekten:
    "https://www.lansstyrelsen.se/nationellt-innehall/samhalle/planera-bygga-och-bo/bidrag-for-bostader/bidrag-for-energieffektivisering-i-smahus.html",
  villaeffektenFaq:
    "https://regeringen.se/regeringens-politik/energi/fragor-och-svar-om-bidraget-for-energieffektivisering-i-smahus/",
} as const;

export const ROT = {
  /** Andel av arbetskostnaden. */
  rate: 0.3,
  /** Tak per person och år (delas med annat rot-arbete samma år). */
  capPerPerson: 50_000,
} as const;

export const VILLAEFFEKTEN = {
  /** Andel av materialkostnaden. */
  rate: 0.3,
  max: 60_000,
  /** Lägsta bidrag som beviljas. */
  min: 10_000,
  builtBefore: 1990,
} as const;

export type HeatPumpTypeId = "berg" | "luft-vatten" | "franluft" | "luft-luft";

export type HeatPumpType = {
  id: HeatPumpTypeId;
  name: string;
  short: string;
  /** Hur den fungerar, en mening. */
  how: string;
  /** När den passar. */
  fits: string;
  /** Saker att veta. */
  note: string;
  needsWaterborne: boolean;
  heatsTapWater: boolean;
  /** Skatteverkets schablon: arbetets andel av totalen vid fast pris. */
  rotLaborShare: number;
  villaeffekten: boolean;
  /** Installerar Optimera den här typen? (speglar tjänstens ingress) */
  offered: boolean;
};

export const HEAT_PUMP_TYPES: HeatPumpType[] = [
  {
    id: "berg",
    name: "Bergvärme",
    short: "Berg",
    how: "Hämtar värme ur berggrunden via ett borrhål, där temperaturen är jämn året runt.",
    fits: "Hus med vattenburen värme och plats att borra på tomten.",
    note: "Högst verkningsgrad och jämnast drift även i sträng kyla, men störst investering eftersom borrningen kostar. Borrning kräver anmälan till kommunen – i vissa områden tillstånd.",
    needsWaterborne: true,
    heatsTapWater: true,
    rotLaborShare: 0.35,
    villaeffekten: true,
    offered: true,
  },
  {
    id: "luft-vatten",
    name: "Luft-vatten",
    short: "Luft-vatten",
    how: "En utedel tar värme ur uteluften och för över den till husets radiatorer eller golvvärme.",
    fits: "Hus med vattenburen värme där borrning inte går eller inte lönar sig.",
    note: "Lägre investering än bergvärme och ingen borrning. Verkningsgraden sjunker när det är riktigt kallt – då hjälper en elpatron till de kallaste dagarna.",
    needsWaterborne: true,
    heatsTapWater: true,
    rotLaborShare: 0.3,
    villaeffekten: true,
    offered: true,
  },
  {
    id: "franluft",
    name: "Frånluft",
    short: "Frånluft",
    how: "Återvinner värmen i ventilationsluften som ändå lämnar huset och värmer vattnet med den.",
    fits: "Hus med mekanisk frånluftsventilation och vattenburen värme, ofta byggda från 70-talet och framåt.",
    note: "Kompakt – allt sitter inne. Effekten begränsas av hur mycket luft som ventileras ut, så i större eller äldre hus räcker den sällan ensam.",
    needsWaterborne: true,
    heatsTapWater: true,
    rotLaborShare: 0.3,
    villaeffekten: true,
    offered: true,
  },
  {
    id: "luft-luft",
    name: "Luft-luft",
    short: "Luft-luft",
    how: "Tar värme ur uteluften och blåser in varm luft direkt i rummet.",
    fits: "Hus utan vattenburen värme, t.ex. med direktverkande el, som vill sänka elräkningen.",
    note: "Enklast och billigast, men värmer inte tappvarmvatten och sprider värmen sämst i hus med många rum. Omfattas inte av Villaeffekten.",
    needsWaterborne: false,
    heatsTapWater: false,
    rotLaborShare: 0.3,
    villaeffekten: false,
    offered: false,
  },
];

export function heatPumpType(id: HeatPumpTypeId): HeatPumpType {
  return HEAT_PUMP_TYPES.find((t) => t.id === id)!;
}

export type SupportInput = {
  total: number;
  type: HeatPumpTypeId;
  /** Antal ägare som kan dela på ROT (1 eller 2). */
  owners: 1 | 2;
  /** Uppfyller huset Villaeffektens villkor (före 1990, ej fjärrvärme, bor där)? */
  villaeffektenEligible: boolean;
};

export type SupportResult = {
  labor: number;
  material: number;
  rot: number;
  rotCapped: boolean;
  bidrag: number;
  /** Bidraget hade blivit under 10 000 kr och beviljas därför inte. */
  bidragBelowMin: boolean;
  net: number;
};

/**
 * Uppskattar ROT och Villaeffekten för en värmepumpsinstallation till fast
 * pris. Arbete/material delas med Skatteverkets schablon – på en riktig
 * faktura kan fördelningen skilja sig något.
 */
export function estimateSupport(i: SupportInput): SupportResult {
  const total = Math.max(0, Math.round(i.total || 0));
  const t = heatPumpType(i.type);
  const labor = Math.round(total * t.rotLaborShare);
  const material = total - labor;
  const rotRaw = Math.round(labor * ROT.rate);
  const rotCap = ROT.capPerPerson * i.owners;
  const rot = Math.min(rotRaw, rotCap);
  let bidrag = 0;
  let bidragBelowMin = false;
  if (i.villaeffektenEligible && t.villaeffekten) {
    const raw = Math.min(Math.round(material * VILLAEFFEKTEN.rate), VILLAEFFEKTEN.max);
    if (raw >= VILLAEFFEKTEN.min) bidrag = raw;
    else bidragBelowMin = raw > 0;
  }
  return {
    labor,
    material,
    rot,
    rotCapped: rotRaw > rotCap,
    bidrag,
    bidragBelowMin,
    net: total - rot - bidrag,
  };
}

/** "123 456 kr" med fast mellanslag. */
export function kr(n: number): string {
  return `${new Intl.NumberFormat("sv-SE").format(Math.round(n))} kr`;
}
