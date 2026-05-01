// Hårdvarukatalog för kalkylatorn. Värden är realistiska men förenklade —
// uppdatera mot leverantörens datablad innan du publicerar bindande siffror.

export type Panel = {
  id: string;
  brand: string;
  watt: number; // Wp per panel
  efficiency: number; // %
  pricePerPanelKr: number;
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
  capacityKWh: number;
  cycles: number;
  priceKr: number;
  chemistry: "LFP" | "NMC";
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

export type WindTurbine = {
  id: string;
  brand: string;
  ratedKW: number;
  cutInMs: number;
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
};

export const PANELS: Panel[] = [
  { id: "longi-glass", brand: "Longi Hi-MO 6 Explorer (glas-glas)", watt: 440, efficiency: 22.6, pricePerPanelKr: 2900 },
  { id: "rec-alpha", brand: "REC Alpha Pure-RX", watt: 470, efficiency: 22.7, pricePerPanelKr: 3400 },
  { id: "qcells-ml", brand: "Q.Cells Q.Tron Black", watt: 425, efficiency: 22.5, pricePerPanelKr: 2700 },
  { id: "sunpower-m", brand: "Maxeon 7", watt: 460, efficiency: 23.2, pricePerPanelKr: 4200 },
  { id: "jinko-tiger", brand: "Jinko Tiger Neo N-type", watt: 445, efficiency: 22.5, pricePerPanelKr: 2600 },
  { id: "trinasolar", brand: "Trina Vertex S+", watt: 440, efficiency: 22.4, pricePerPanelKr: 2550 },
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
  { id: "easyway-h", brand: "Easyway HomeStack", capacityKWh: 10.0, cycles: 6000, priceKr: 64000, chemistry: "LFP" },
  { id: "easyway-h15", brand: "Easyway HomeStack 15", capacityKWh: 15.0, cycles: 6000, priceKr: 92000, chemistry: "LFP" },
  { id: "enershare-c", brand: "Enershare Cube 10", capacityKWh: 10.24, cycles: 7000, priceKr: 71000, chemistry: "LFP" },
  { id: "enershare-c20", brand: "Enershare Cube 20", capacityKWh: 20.48, cycles: 7000, priceKr: 132000, chemistry: "LFP" },
  { id: "emaldo-ps", brand: "Emaldo Power Station 2", capacityKWh: 12.5, cycles: 6500, priceKr: 88000, chemistry: "LFP" },
  { id: "emaldo-ps20", brand: "Emaldo Power Station 2 (20)", capacityKWh: 20.0, cycles: 6500, priceKr: 138000, chemistry: "LFP" },
  { id: "pylon-fc-h2", brand: "Pylontech Force-H2", capacityKWh: 10.65, cycles: 6000, priceKr: 64000, chemistry: "LFP" },
  { id: "pylon-fc-l2", brand: "Pylontech Force-L2", capacityKWh: 14.2, cycles: 6000, priceKr: 84000, chemistry: "LFP" },
  { id: "saj-bs", brand: "SAJ B2 (10 kWh)", capacityKWh: 10.24, cycles: 6000, priceKr: 58000, chemistry: "LFP" },
  { id: "saj-bs15", brand: "SAJ B2 (15 kWh)", capacityKWh: 15.36, cycles: 6000, priceKr: 84000, chemistry: "LFP" },
  { id: "byd-hvs", brand: "BYD HVS Premium", capacityKWh: 10.24, cycles: 6000, priceKr: 78000, chemistry: "LFP" },
  { id: "tesla-pw", brand: "Tesla Powerwall 3", capacityKWh: 13.5, cycles: 6000, priceKr: 95000, chemistry: "LFP" },
  { id: "huawei-luna2", brand: "Huawei LUNA2000", capacityKWh: 10.0, cycles: 6000, priceKr: 72000, chemistry: "LFP" },
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

export const CHARGERS: Charger[] = [
  { id: "easee", brand: "Easee Up", maxKW: 22, priceKr: 11500 },
  { id: "zaptec", brand: "Zaptec Go 2", maxKW: 22, priceKr: 12900 },
  { id: "wallbox", brand: "Wallbox Pulsar Max", maxKW: 22, priceKr: 9900 },
  { id: "garo", brand: "Garo Entity Pro", maxKW: 22, priceKr: 13500 },
  { id: "chargeamps", brand: "Charge Amps Halo", maxKW: 22, priceKr: 12500 },
];

export const TURBINES: WindTurbine[] = [
  { id: "ssg-3", brand: "Sirocco Vertical 3kW", ratedKW: 3, cutInMs: 2.5, priceKr: 235000 },
  { id: "ssg-5", brand: "Sirocco Vertical 5kW", ratedKW: 5, cutInMs: 2.8, priceKr: 360000 },
  { id: "windquiet-2", brand: "WindQuiet 2.4kW", ratedKW: 2.4, cutInMs: 2.2, priceKr: 210000 },
];

export const EMS_OPTIONS: EMS[] = [
  {
    id: "enequi",
    brand: "Enequi Core",
    blurb:
      "Svensk-utvecklad EMS-hubb med fokus på spotpris-optimering och stödtjänster mot Svenska Kraftnät.",
    features: ["FCR-D / aFRR", "Spotpris-styrning", "Mätare i realtid"],
    spotOptimization: 0.18,
    priceKr: 14900,
    monthlyKr: 99,
  },
  {
    id: "tibber",
    brand: "Tibber Bridge",
    blurb:
      "Pluggar in i mätarens HAN-port — du får realtidsdata och styr värmepump, laddbox och batteri via Tibber-appen.",
    features: ["HAN-port", "Tibber-app", "Smart Charging"],
    spotOptimization: 0.10,
    priceKr: 1490,
    monthlyKr: 0,
  },
  {
    id: "evolta",
    brand: "Evolta IQ",
    blurb:
      "Fullt modulär plattform som styr sol, batteri, värmepump och elbil utifrån prognoser och beteende.",
    features: ["AI-prognos", "Stödtjänster", "Full hårdvarustöd"],
    spotOptimization: 0.20,
    priceKr: 24900,
    monthlyKr: 149,
  },
  {
    id: "markedroid",
    brand: "Markedroid",
    blurb:
      "Marknadsoptimerare som kör batteriet mot Nord Pool och balansmarknaden — perfekt för dig som vill maxa intäkten.",
    features: ["Spotpris", "Reglermarknad", "Auto-trading"],
    spotOptimization: 0.22,
    priceKr: 9900,
    monthlyKr: 199,
  },
  {
    id: "homeassistant",
    brand: "HomeAssistant",
    blurb:
      "Open source. Vi sätter upp och underhåller din egen lokala installation — alla data stannar i ditt hus.",
    features: ["Open Source", "Lokal kontroll", "1000+ integrationer"],
    spotOptimization: 0.12,
    priceKr: 8900,
    monthlyKr: 0,
  },
];

// Energimarknad — kan uppdateras dynamiskt mot Nord Pool API
export const SPOT_AVG_KR_KWH = 1.45; // helår, snitt
export const FEED_IN_KR_KWH = 0.85; // försäljning
export const SUN_HOURS_KWH_PER_KWP = 1050; // Mellansverige normalår
export const HOUSE_HEAT_DEMAND_KWH_PER_M2 = 110; // 70-tal villa
export const EV_KM_PER_KWH = 6;

// Stödtjänster (FCR-D / aFRR) – grov estimering
export const SUPPORT_REVENUE_PER_KWH_INSTALLED = 4500; // kr/år/kWh batteri

// Praktisk hjälpare för UI: gruppera värmepumpar per varumärke
export const HEAT_PUMP_BRANDS = Array.from(
  new Set(HEAT_PUMPS.map((h) => h.brand)),
);
