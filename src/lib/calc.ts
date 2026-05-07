import {
  PANELS,
  BATTERIES,
  HEAT_PUMPS,
  CHARGERS,
  TURBINES,
  EMS_OPTIONS,
  SPOT_AVG_KR_KWH,
  FEED_IN_KR_KWH,
  SUN_HOURS_KWH_PER_KWP,
  HOUSE_HEAT_DEMAND_KWH_PER_M2,
  EV_KM_PER_KWH,
  type InverterAssignment,
} from "./catalog";

export type CalcInput = {
  enabled: {
    sol: boolean;
    batteri: boolean;
    värmepump: boolean;
    laddbox: boolean;
    vindkraft: boolean;
  };
  // Sol-input
  panelId: string;
  panelCount: number;
  // "Har redan solpaneler" – om true räknar vi befintlig anläggning istället
  // för att designa en ny.
  hasExistingSolar: boolean;
  existingSolarKWp: number;
  existingSolarYearlyKWh: number;
  // Växelriktare
  inverterMode: "auto" | "manual";
  manualInverterKw: 10 | 15 | 20;
  // Batteri
  batteryId: string | null;
  batteryCapacityKWh: number;
  // Värmepump
  heatPumpId: string | null;
  // Laddbox
  chargerId: string | null;
  // Vindkraft
  turbineId: string | null;
  // EMS
  emsId: string | null;
  // Hus + ägarstruktur
  numOwners: 1 | 2;
  houseAreaM2: number;
  evKmPerYear: number;
  baseConsumptionKWh: number;
};

export type CalcResult = {
  systemKWp: number;
  batteryKWh: number;
  batteryPriceKr: number;
  inverter: InverterAssignment;
  yearlyProductionKWh: number;
  yearlyConsumptionKWh: number;
  selfConsumptionShare: number;
  yearlyHeatKWh: number;
  yearlyEvKWh: number;
  // Brytning av investeringen
  solarPriceKr: number;
  inverterPriceKr: number;
  heatpumpPriceKr: number;
  chargerPriceKr: number;
  turbinePriceKr: number;
  emsPriceKr: number;
  totalCostKr: number; // Investering innan avdrag
  // Avdrag (per delsystem + total)
  solarDeductionKr: number;
  batteryDeductionKr: number;
  chargerDeductionKr: number;
  greenDeductionKr: number; // Summa
  netCostKr: number; // Investering efter avdrag
  // Intäkter / besparingar
  yearlySavingKr: number;
  yearlySupportRevenueKr: number;
  yearlyEmsCostKr: number;
  paybackYears: number;
  yearly20YearKr: number;
  co2KgPerYear: number;
};

// =============================== PRISMODELLER ===============================

/**
 * Solpanelpris enligt Optimera-baspris-modellen. Baspriset täcker resor,
 * rigg, kabel etc. Panelen själv är 2 500 kr.
 *
 *  1–10 paneler:  10 000 kr + 2 500 × n
 * 11–20 paneler:  15 000 kr + 2 500 × n
 * 21–30 paneler:  17 500 kr + 2 500 × n
 * 31–40 paneler:  20 000 kr + 2 500 × n
 * 41–50 paneler:  22 500 kr + 2 500 × n
 */
export function solarPriceKr(count: number, perPanelKr: number): number {
  if (count <= 0) return 0;
  let baseFee: number;
  if (count <= 10) baseFee = 10_000;
  else if (count <= 20) baseFee = 15_000;
  else if (count <= 30) baseFee = 17_500;
  else if (count <= 40) baseFee = 20_000;
  else baseFee = 22_500;
  return baseFee + count * perPanelKr;
}

/**
 * Stödtjänster (FCR-D / aFRR) ger en konservativ intäkt på 75 kr / kW
 * växelriktare / månad. Kräver att batteri finns.
 */
export function supportServiceRevenueKr(
  inverterKw: number,
  hasBattery: boolean,
): number {
  if (!hasBattery || inverterKw <= 0) return 0;
  return inverterKw * 75 * 12;
}

// =============================== VÄXELRIKTARE ===============================

const SOLIS_PRICES: Record<10 | 15 | 20, number> = {
  10: 24_500,
  15: 31_500,
  20: 39_000,
};

export function pickInverter(
  systemKWp: number,
  batteryBrandId: string | null,
  batteryKWh: number,
  mode: "auto" | "manual",
  manualKw: 10 | 15 | 20,
): InverterAssignment {
  if (mode === "manual") {
    return {
      kind: "external",
      brand: "Solis S6",
      kw: manualKw,
      priceKr: SOLIS_PRICES[manualKw],
    };
  }
  if (batteryBrandId) {
    const b = BATTERIES.find((b) => b.id === batteryBrandId);
    if (b) return b.inverterFor(batteryKWh);
  }
  if (systemKWp <= 10)
    return { kind: "external", brand: "Solis S6", kw: 10, priceKr: SOLIS_PRICES[10] };
  if (systemKWp <= 15)
    return { kind: "external", brand: "Solis S6", kw: 15, priceKr: SOLIS_PRICES[15] };
  return { kind: "external", brand: "Solis S6", kw: 20, priceKr: SOLIS_PRICES[20] };
}

const INVERTER_EFFICIENCY = 97.5;

// ============================ HUVUDBERÄKNING ===============================

export function computeCalc(input: CalcInput): CalcResult {
  const en = input.enabled;
  const panel = PANELS.find((p) => p.id === input.panelId) ?? PANELS[0];
  const batteryBrand =
    en.batteri && input.batteryId
      ? BATTERIES.find((b) => b.id === input.batteryId)
      : null;
  const batteryKWh = batteryBrand
    ? closest(input.batteryCapacityKWh, batteryBrand.capacities)
    : 0;
  const batteryPriceKr = batteryBrand
    ? Math.round(batteryKWh * batteryBrand.pricePerKWhKr)
    : 0;
  const heat =
    en.värmepump && input.heatPumpId
      ? HEAT_PUMPS.find((h) => h.id === input.heatPumpId)
      : null;
  const charger =
    en.laddbox && input.chargerId
      ? CHARGERS.find((c) => c.id === input.chargerId)
      : null;
  const turbine =
    en.vindkraft && input.turbineId
      ? TURBINES.find((t) => t.id === input.turbineId)
      : null;
  const ems =
    input.emsId ? EMS_OPTIONS.find((e) => e.id === input.emsId) : null;

  // -------- Sol: ny eller befintlig --------
  const solActive = en.sol;
  const useExistingSolar = solActive && input.hasExistingSolar;
  const newPanelCount = solActive && !useExistingSolar ? input.panelCount : 0;
  const newSystemKWp = (panel.watt * newPanelCount) / 1000;

  const systemKWp = useExistingSolar
    ? Math.max(0, input.existingSolarKWp)
    : newSystemKWp;

  const yearlyProductionFromSol = useExistingSolar
    ? Math.max(0, input.existingSolarYearlyKWh)
    : systemKWp * SUN_HOURS_KWH_PER_KWP * (INVERTER_EFFICIENCY / 100);

  const inverter = pickInverter(
    systemKWp,
    batteryBrand?.id ?? null,
    batteryKWh,
    input.inverterMode,
    input.manualInverterKw,
  );

  // -------- Värmepump --------
  const heatedHouseKWh = heat
    ? input.houseAreaM2 * HOUSE_HEAT_DEMAND_KWH_PER_M2
    : 0;
  const yearlyHeatKWh = heat ? heatedHouseKWh / heat.scop : 0;

  // -------- Laddbox --------
  const yearlyEvKWh = charger ? input.evKmPerYear / EV_KM_PER_KWH : 0;

  // -------- Förbrukning --------
  const yearlyConsumptionKWh =
    input.baseConsumptionKWh + yearlyHeatKWh + yearlyEvKWh;

  const yearlyProductionKWh =
    yearlyProductionFromSol + (turbine ? turbine.ratedKW * 1800 : 0);

  // -------- Självförbrukningsgrad --------
  const selfConsumptionShare = batteryBrand
    ? clamp(0.45 + (batteryKWh / 30) * 0.4, 0.45, 0.92)
    : 0.32;

  const selfUsedKWh = Math.min(
    yearlyProductionKWh * selfConsumptionShare,
    yearlyConsumptionKWh,
  );
  const exportedKWh = Math.max(0, yearlyProductionKWh - selfUsedKWh);

  // -------- Besparing per år --------
  // Sol-besparing: vad du sparar genom att inte köpa el du själv producerar +
  // det du säljer på spotpris.
  const solarSavingKr =
    selfUsedKWh * SPOT_AVG_KR_KWH + exportedKWh * FEED_IN_KR_KWH;

  // Värmepumps-besparing: skillnaden mellan direktverkande el (1:1) och
  // pumpens elförbrukning (1/SCOP).
  const heatpumpSavingKr = heat
    ? (heatedHouseKWh - yearlyHeatKWh) * SPOT_AVG_KR_KWH
    : 0;

  // EMS lyfter sol-besparingen (inte värmepumps-besparingen direkt).
  const emsBoost = ems ? 1 + ems.spotOptimization : 1;
  const yearlySavingKr = Math.max(
    0,
    Math.round(solarSavingKr * emsBoost + heatpumpSavingKr),
  );

  // -------- Stödtjänster (75 kr/kW växelriktare/mån) --------
  const yearlySupportRevenueKr = supportServiceRevenueKr(
    inverter.kw,
    !!batteryBrand,
  );

  // -------- Hårdvarukostnader --------
  const newSolarPriceKr = useExistingSolar
    ? 0
    : solActive
    ? solarPriceKr(newPanelCount, panel.pricePerPanelKr)
    : 0;

  // Befintlig solpanel-anläggning kostar 0 nu. Växelriktarpriset gäller bara
  // om vi sätter ny anläggning (eller om kunden bara köper batteri och behöver
  // en växelriktare för det).
  const inverterPriceKr =
    inverter.kind === "external" && (newPanelCount > 0 || en.batteri)
      ? inverter.priceKr
      : 0;

  const heatpumpPriceKr = heat ? heat.priceKr : 0;
  const heatpumpInstallKr = heat ? 35_000 : 0;
  const chargerPriceKr = charger ? charger.priceKr + 9_000 : 0;
  const turbinePriceKr = turbine ? turbine.priceKr + 85_000 : 0;
  const emsPriceKr = ems ? ems.priceKr : 0;

  // Solpriset från solarPriceKr() innehåller redan baspris (rigg/resor) +
  // panelpris. Inget extra installationspålägg.
  const solarTotalKr = newSolarPriceKr;

  // För batteri lägger vi en mindre rigg-kostnad. För laddbox/vind är den
  // redan inbakad ovan.
  const batteryRigKr = batteryBrand ? 12_000 : 0;

  const totalCostKr =
    solarTotalKr +
    inverterPriceKr +
    batteryPriceKr +
    batteryRigKr +
    heatpumpPriceKr +
    heatpumpInstallKr +
    chargerPriceKr +
    turbinePriceKr +
    emsPriceKr;

  // -------- Grönt avdrag --------
  // Per ägare 50 000 kr / år. Solar 14,55%, batteri/laddbox 48,5%.
  const totalAllowance = (input.numOwners ?? 1) * 50_000;
  let remaining = totalAllowance;

  const solarBaseForDeduction = solarTotalKr + inverterPriceKr;
  const solarDeductionKr = Math.min(
    Math.round(solarBaseForDeduction * 0.1455),
    remaining,
  );
  remaining -= solarDeductionKr;

  const batteryDeductionKr = Math.min(
    Math.round((batteryPriceKr + batteryRigKr) * 0.485),
    Math.max(0, remaining),
  );
  remaining -= batteryDeductionKr;

  const chargerDeductionKr = Math.min(
    Math.round(chargerPriceKr * 0.485),
    Math.max(0, remaining),
  );
  remaining -= chargerDeductionKr;

  const greenDeductionKr =
    solarDeductionKr + batteryDeductionKr + chargerDeductionKr;
  const netCostKr = totalCostKr - greenDeductionKr;

  // -------- Återbetalningstid --------
  const yearlyEmsCostKr = ems ? ems.monthlyKr * 12 : 0;
  const totalYearly =
    yearlySavingKr + yearlySupportRevenueKr - yearlyEmsCostKr;
  const paybackYears = totalYearly > 0 ? netCostKr / totalYearly : 0;
  const yearly20YearKr = totalYearly * 20 - netCostKr;

  // -------- CO₂ undvikt --------
  const co2KgPerYear =
    (yearlyProductionKWh + (heat ? yearlyHeatKWh : 0) * 0.4) * 0.27;

  return {
    systemKWp,
    batteryKWh,
    batteryPriceKr,
    inverter,
    yearlyProductionKWh,
    yearlyConsumptionKWh,
    selfConsumptionShare,
    yearlyHeatKWh,
    yearlyEvKWh,
    solarPriceKr: solarTotalKr,
    inverterPriceKr,
    heatpumpPriceKr: heatpumpPriceKr + heatpumpInstallKr,
    chargerPriceKr,
    turbinePriceKr,
    emsPriceKr,
    totalCostKr,
    solarDeductionKr,
    batteryDeductionKr,
    chargerDeductionKr,
    greenDeductionKr,
    netCostKr,
    yearlySavingKr,
    yearlySupportRevenueKr,
    yearlyEmsCostKr,
    paybackYears,
    yearly20YearKr,
    co2KgPerYear,
  };
}

// =============================== HJÄLPARE ==================================

const clamp = (x: number, min: number, max: number) =>
  Math.max(min, Math.min(max, x));

const closest = (target: number, options: number[]) =>
  options.reduce(
    (best, v) => (Math.abs(v - target) < Math.abs(best - target) ? v : best),
    options[0],
  );

export const formatKr = (n: number) =>
  new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency: "SEK",
    maximumFractionDigits: 0,
  }).format(Math.round(n));

export const formatNumber = (n: number, dec = 0) =>
  new Intl.NumberFormat("sv-SE", {
    maximumFractionDigits: dec,
  }).format(n);
