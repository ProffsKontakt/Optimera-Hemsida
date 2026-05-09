// Hårdvarukatalog för kalkylatorn. Värden är realistiska men förenklade –
// uppdatera mot leverantörens datablad innan du publicerar bindande siffror.

export type Panel = {
  id: string;
  brand: string;
  watt: number; // Wp per panel
  efficiency: number; // %
  pricePerPanelKr: number; // pris mot kund inkl moms efter grönt avdrag
  heightMm: number;
  widthMm: number;
  thicknessMm: number;
};

export type Inverter = {
  id: string;
  brand: string;
  type: "string" | "hybrid" | "micro";
  efficiency: number; // %
  priceKr: number;
};

export type Battery = {
  id: string;
  brand: string;
  cycles: number;
  capacities: number[]; // tillgängliga storlekar i kWh
  chemistry: "LFP" | "NMC";
  /**
   * Kostnadsmodell – sex separata line items per batteri.
   * Alla siffror är EX MOMS (vår inköpskostnad / fasta marginaler).
   * Customer-priset beräknas i calc.ts som:
   *   ex_moms = baseHardwareKr
   *           + n × perModuleHardwareKr
   *           + (växelriktarpris ex moms)
   *           + BATTERY_PROJECT_MARGIN_KR              (= 30 000)
   *           + max(0, n − 2) × PER_EXTRA_MODULE_MARGIN_KR  (= 1 000)
   *           + BATTERY_INSTALLATION_FIXED_KR
   *   ink_moms_före_avdrag = ex_moms × MOMS_FACTOR (= 1,25)
   *   slut_pris_kund = ink_moms − grön teknik 48,5 % (capad mot ägartak)
   */
  baseHardwareKr: number;       // ex moms BMS + bas
  perModuleHardwareKr: number;  // ex moms per modul
  kWhPerModule: number;
  /**
   * Vilken växelriktare som monteras till en given kapacitet.
   */
  inverterFor: (kWh: number) => InverterAssignment;
};

export type InverterAssignment =
  | { kind: "external"; brand: string; kw: number; priceKr: number }
  | { kind: "builtIn"; kw: number; label: string };

// =============================== KONSTANTER ===============================
// Alla kostnadskonstanter är EX MOMS. Calc.ts gångar med MOMS_FACTOR till
// kundpris ink moms före avdrag.
export const MOMS_FACTOR = 1.25;
export const BATTERY_PROJECT_MARGIN_KR = 30_000;        // fast vinst per batteriprojekt
export const PER_EXTRA_MODULE_MARGIN_KR = 1_000;        // marginal för modul 3+
export const BATTERY_INSTALLATION_FIXED_KR = 15_000;    // fast install-kostnad per projekt (extern, ex moms)
export const CHARGER_INSTALL_KR = 5_000;                // laddbox-installation (var 9 000)

// --- Solis S6-priser, ex moms hardware-cost
const SOLIS = {
  10: { kind: "external" as const, brand: "Solis S6", kw: 10, priceKr: 10_294 },
  15: { kind: "external" as const, brand: "Solis S6", kw: 15, priceKr: 15_990 },
};

export type HeatPump = {
  id: string;
  brand: string;
  model: string;
  type: "luft-vatten" | "bergvärme" | "frånluft" | "luft-luft";
  scop: number;
  outputKW: number;
  priceKr: number;
};

export type Charger = {
  id: string;
  brand: string;
  maxKW: number;
  priceKr: number;
};

export type EMS = {
  id: string;
  brand: string;
  blurb: string;
  features: string[];
  spotOptimization: number; // 0..1, hur mycket den klarar att höja besparingen
  priceKr: number;
  monthlyKr: number;
  /**
   * Stödtjänster (FCR-D / aFRR) kräver att EMS:en kan styra batteriet
   * mot Svenska Kraftnät. Bara våra egna plattformar (Enequi Core och
   * Energy IQ) gör det idag.
   */
  enablesSupportServices: boolean;
};

export type RoofType = "sadeltak" | "mansardtak" | "valmat" | "pulpettak";
export const ROOF_TYPES: { key: RoofType; label: string }[] = [
  { key: "sadeltak", label: "Sadeltak" },
  { key: "mansardtak", label: "Mansardtak" },
  { key: "valmat", label: "Valmat tak" },
  { key: "pulpettak", label: "Pulpettak" },
];

export const PANELS: Panel[] = [
  // JA Solar är vår valda leverantör – två varianter för olika takytor.
  // Effektivitet beräknad som watt / yta (1953×1134 → 22.6%, 1762×1134 → 22.8%).
  // Pris är kundpris inkl moms efter grönt avdrag.
  {
    id: "ja-solar-500",
    brand: "JA Solar 500 W",
    watt: 500,
    efficiency: 22.6,
    pricePerPanelKr: 2500,
    heightMm: 1953,
    widthMm: 1134,
    thicknessMm: 30,
  },
  {
    id: "ja-solar-455",
    brand: "JA Solar 455 W",
    watt: 455,
    efficiency: 22.8,
    pricePerPanelKr: 2500,
    heightMm: 1762,
    widthMm: 1134,
    thicknessMm: 30,
  },
];

export const INVERTERS: Inverter[] = [
  { id: "se-hd", brand: "SolarEdge Home Hub (hybrid)", type: "hybrid", efficiency: 97.6, priceKr: 38000 },
  { id: "huawei-luna", brand: "Huawei SUN2000 (hybrid)", type: "hybrid", efficiency: 98.4, priceKr: 32000 },
  { id: "sma-stp", brand: "SMA Sunny Tripower X (string)", type: "string", efficiency: 98.2, priceKr: 28000 },
  { id: "enphase", brand: "Enphase IQ8 (mikro)", type: "micro", efficiency: 97.0, priceKr: 1900 },
  { id: "fronius-gen24", brand: "Fronius GEN24 Plus (hybrid)", type: "hybrid", efficiency: 98.1, priceKr: 34000 },
  { id: "saj-h2", brand: "SAJ H2 Hybrid", type: "hybrid", efficiency: 97.9, priceKr: 26000 },
  { id: "growatt-mod", brand: "Growatt MOD-XH (hybrid)", type: "hybrid", efficiency: 97.8, priceKr: 24000 },
];

export const BATTERIES: Battery[] = [
  // -------- Easyway (RIKTIGA värden enligt Viktor 2026-05-09) --------
  {
    id: "easyway-univ7600",
    brand: "Easyway",
    cycles: 6500,
    capacities: [15.36, 23.04, 30.72, 38.4, 46.08, 53.76, 61.44],
    chemistry: "LFP",
    baseHardwareKr: 7_218,        // BMS + bas
    perModuleHardwareKr: 10_335,
    kWhPerModule: 7.68,
    inverterFor: (kWh) => (kWh <= 23.04 ? SOLIS[10] : SOLIS[15]),
  },
  // -------- Övriga märken: PLACEHOLDER-värden tills Viktor levererar --------
  // Beräknade som första-ordnings-uppskattningar från gamla pricePerKWhKr.
  // Bör revideras med riktig leverantörsdata innan publicering.
  {
    id: "pylontech-h3",
    brand: "Pylontech Force H3",
    cycles: 6000,
    capacities: [10.24, 15.36, 20.48, 25.6, 30.72],
    chemistry: "LFP",
    baseHardwareKr: 8_000,        // TODO: bekräfta
    perModuleHardwareKr: 21_000,  // TODO: bekräfta
    kWhPerModule: 5.12,
    inverterFor: (kWh) => (kWh <= 20.48 ? SOLIS[10] : SOLIS[15]),
  },
  {
    id: "saj-hs3",
    brand: "SAJ HS3",
    cycles: 6000,
    capacities: [10, 15, 20, 25, 30, 35, 40],
    chemistry: "LFP",
    baseHardwareKr: 6_000,        // TODO
    perModuleHardwareKr: 17_500,  // TODO
    kWhPerModule: 5,
    // Inbyggd växelriktare i SAJ HS3 (12 kW). Räknas alltid in.
    inverterFor: () => ({
      kind: "builtIn",
      kw: 12,
      label: "Inbyggd 12 kW växelriktare",
    }),
  },
  {
    id: "enershare-core",
    brand: "Enershare Energy Core",
    cycles: 7000,
    capacities: [
      9.6, 12.8, 16, 19.2, 22.4, 25.6, 28.8, 32, 35.2, 38.4, 41.6, 44.8, 48,
      51.2,
    ],
    chemistry: "LFP",
    baseHardwareKr: 7_500,        // TODO
    perModuleHardwareKr: 14_000,  // TODO
    kWhPerModule: 3.2,
    inverterFor: (kWh) => (kWh <= 16 ? SOLIS[10] : SOLIS[15]),
  },
  {
    id: "emaldo-store",
    brand: "Emaldo Power Store",
    cycles: 6500,
    capacities: [15.36, 30.72, 46.08],
    chemistry: "LFP",
    baseHardwareKr: 25_000,       // TODO – Emaldo är wall unit, högre baspris
    perModuleHardwareKr: 60_000,  // TODO
    kWhPerModule: 15.36,
    inverterFor: () => ({
      kind: "builtIn",
      kw: 10.8,
      label: "Inbyggd 10,8 kW växelriktare",
    }),
  },
];

export const HEAT_PUMPS: HeatPump[] = [
  // NIBE
  { id: "nibe-s2125-12", brand: "NIBE", model: "S2125-12", type: "luft-vatten", scop: 4.85, outputKW: 12, priceKr: 165000 },
  { id: "nibe-s1255-12", brand: "NIBE", model: "S1255-12 (bergvärme)", type: "bergvärme", scop: 5.15, outputKW: 12, priceKr: 215000 },
  { id: "nibe-f730", brand: "NIBE", model: "F730 (frånluft)", type: "frånluft", scop: 4.0, outputKW: 7, priceKr: 105000 },
  // IVT
  { id: "ivt-am12", brand: "IVT", model: "AirX 90 Plus", type: "luft-vatten", scop: 4.7, outputKW: 11, priceKr: 158000 },
  { id: "ivt-greenline", brand: "IVT", model: "Greenline HE E12 (bergvärme)", type: "bergvärme", scop: 5.05, outputKW: 12, priceKr: 219000 },
  // Bosch / Buderus
  { id: "bosch-cs7800", brand: "Bosch", model: "Compress 7800i AW 12", type: "luft-vatten", scop: 4.65, outputKW: 12, priceKr: 158000 },
  { id: "bosch-cs7000", brand: "Bosch", model: "Compress 7000i LWM (bergvärme)", type: "bergvärme", scop: 5.0, outputKW: 12, priceKr: 210000 },
  // Panasonic
  { id: "panasonic-aq-12", brand: "Panasonic", model: "Aquarea T-CAP 12 kW", type: "luft-vatten", scop: 4.6, outputKW: 12, priceKr: 152000 },
  { id: "panasonic-aq-9", brand: "Panasonic", model: "Aquarea L-Series 9 kW", type: "luft-vatten", scop: 4.7, outputKW: 9, priceKr: 138000 },
  { id: "panasonic-etherea", brand: "Panasonic", model: "Etherea (luft-luft)", type: "luft-luft", scop: 5.5, outputKW: 5, priceKr: 28000 },
  // Mitsubishi
  { id: "mitsu-zubadan", brand: "Mitsubishi", model: "Ecodan Zubadan Hyper 14", type: "luft-vatten", scop: 4.55, outputKW: 14, priceKr: 172000 },
  { id: "mitsu-pnt", brand: "Mitsubishi", model: "Power Inverter Plus", type: "luft-vatten", scop: 4.8, outputKW: 11, priceKr: 165000 },
  // Daikin
  { id: "daikin-altherma", brand: "Daikin", model: "Altherma 3 H HT 12", type: "luft-vatten", scop: 4.4, outputKW: 12, priceKr: 161000 },
  { id: "daikin-altherma-r", brand: "Daikin", model: "Altherma 3 R 14", type: "luft-vatten", scop: 4.55, outputKW: 14, priceKr: 169000 },
  // Thermia
  { id: "thermia-atlas", brand: "Thermia", model: "Atlas 12 (bergvärme)", type: "bergvärme", scop: 5.2, outputKW: 12, priceKr: 220000 },
  { id: "thermia-mega", brand: "Thermia", model: "Mega L (bergvärme)", type: "bergvärme", scop: 5.0, outputKW: 17, priceKr: 268000 },
  // CTC
  { id: "ctc-ecoair", brand: "CTC", model: "EcoAir 614M (luft-vatten)", type: "luft-vatten", scop: 4.55, outputKW: 12, priceKr: 154000 },
  { id: "ctc-ecoheat", brand: "CTC", model: "EcoHeat 412 (bergvärme)", type: "bergvärme", scop: 5.0, outputKW: 12, priceKr: 205000 },
];

// Vi säljer bara Easee, Zaptec och Charge Amps. Wallbox och Garo borttagna.
export const CHARGERS: Charger[] = [
  { id: "easee", brand: "Easee Up", maxKW: 22, priceKr: 11500 },
  { id: "zaptec", brand: "Zaptec Go 2", maxKW: 22, priceKr: 12900 },
  { id: "chargeamps", brand: "Charge Amps Halo", maxKW: 22, priceKr: 12500 },
];

// Vi erbjuder tre EMS-plattformar: Energy IQ (egen), Enequi Core (extern,
// garanterad), Tibber Bridge (entry-level). Evolta IQ / Markedroid /
// HomeAssistant är borttagna ur produktportföljen.
export const EMS_OPTIONS: EMS[] = [
  {
    id: "energy-iq",
    brand: "Energy IQ",
    blurb:
      "Optimera Energis egna EMS. Samma motor som de stora plattformarna men utan garantibesparing. Kör batteriet mot stödtjänster (FCR-D / aFRR) och spotpris.",
    features: ["FCR-D / aFRR", "Spotpris-styrning", "Stödtjänster"],
    spotOptimization: 0.20,
    priceKr: 2500,
    monthlyKr: 0,
    enablesSupportServices: true,
  },
  {
    id: "enequi",
    brand: "Enequi Core",
    blurb:
      "Svensk-utvecklad EMS-hubb med fokus på spotpris-optimering och stödtjänster mot Svenska Kraftnät. Stark garantibesparing.",
    features: ["FCR-D / aFRR", "Spotpris-styrning", "Garanti"],
    spotOptimization: 0.18,
    priceKr: 9_595,
    monthlyKr: 99,
    enablesSupportServices: true,
  },
  {
    id: "tibber",
    brand: "Tibber Bridge",
    blurb:
      "Pluggar in i mätarens HAN-port – du får realtidsdata och styr batteri och laddbox via Tibber-appen.",
    features: ["HAN-port", "Tibber-app", "Smart Charging"],
    spotOptimization: 0.10,
    priceKr: 1_490,
    monthlyKr: 0,
    enablesSupportServices: false,
  },
];

// Energimarknad – kan uppdateras dynamiskt mot Nord Pool API
export const SPOT_AVG_KR_KWH = 1.45; // helår, snitt
export const FEED_IN_KR_KWH = 0.85; // försäljning
export const SUN_HOURS_KWH_PER_KWP = 1050; // Mellansverige normalår
export const HOUSE_HEAT_DEMAND_KWH_PER_M2 = 110; // 70-tal villa
export const EV_KM_PER_KWH = 6;

// Maxgränser för en normalvilla. Över 24 fyller vi båda takfallen.
export const MAX_PANELS_PER_HOUSE = 50;
export const MAX_PANELS_PER_SLOPE = 24;
export const PANEL_AREA_M2 = 1.95; // ungefärlig panelyta

// Stödtjänster (FCR-D / aFRR) – grov estimering
export const SUPPORT_REVENUE_PER_KWH_INSTALLED = 4500; // kr/år/kWh batteri

// Praktisk hjälpare för UI: gruppera värmepumpar per varumärke
export const HEAT_PUMP_BRANDS = Array.from(
  new Set(HEAT_PUMPS.map((h) => h.brand)),
);
