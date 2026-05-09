import {
  PANELS,
  BATTERIES,
  HEAT_PUMPS,
  CHARGERS,
  EMS_OPTIONS,
  SPOT_AVG_KR_KWH,
  FEED_IN_KR_KWH,
  SUN_HOURS_KWH_PER_KWP,
  HOUSE_HEAT_DEMAND_KWH_PER_M2,
  EV_KM_PER_KWH,
  type InverterAssignment,
  type RoofType,
} from "./catalog";

export type CalcInput = {
  enabled: {
    sol: boolean;
    batteri: boolean;
    värmepump: boolean;
    laddbox: boolean;
  };
  // Tak
  roofType: RoofType;
  // Sol-input
  panelId: string;
  panelCount: number;
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
  emsPriceKr: number;
  totalCostKr: number; // Investering innan avdrag
  // Avdrag (per delsystem + total)
  solarDeductionKr: number;
  batteryDeductionKr: number;
  chargerDeductionKr: number;
  heatpumpDeductionKr: number;
  greenDeductionKr: number; // Summa (grön teknik + ROT)
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
 * Stödtjänster (FCR-D / aFRR) ger en konservativ intäkt baserad på både
 * växelriktarens kW och batteriets kWh. Kräver att en EMS som klarar
 * Svenska Kraftnät-styrningen är vald (Enequi Core eller Energy IQ).
 *
 * Anchor-punkter från Optimeras spec:
 *   10 kW + 23 kWh   → 14 383 kr/år
 *   15 kW + 30,72    → 16 983 kr/år
 *   15 kW + 53,76    → 21 783 kr/år
 *
 * För andra kombinationer hittar vi närmaste anchor i (kW, kWh)-rummet
 * med vägd distans (kW väger 1.5× mer än kWh).
 */
export function supportServiceRevenueKr(
  inverterKw: number,
  batteryKWh: number,
  hasSupportEms: boolean,
): number {
  if (!hasSupportEms || inverterKw <= 0 || batteryKWh <= 0) return 0;
  const anchors = [
    { invKw: 10, battKWh: 23, revenue: 14383 },
    { invKw: 15, battKWh: 30.72, revenue: 16983 },
    { invKw: 15, battKWh: 53.76, revenue: 21783 },
    { invKw: 20, battKWh: 60, revenue: 25_000 },
  ];
  let best = anchors[0];
  let bestDist = Infinity;
  for (const a of anchors) {
    const d = Math.hypot((a.invKw - inverterKw) * 1.5, a.battKWh - batteryKWh);
    if (d < bestDist) {
      bestDist = d;
      best = a;
    }
  }
  return best.revenue;
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

  const yearlyProductionKWh = yearlyProductionFromSol;

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

  // Batteri-arbitrage (gäller även utan sol): batteriet köper när priset är
  // lågt och säljer/använder när det är högt. Konservativt 600 kr/kWh/år.
  // Skala även med årsförbrukningen – ju mer du använder, desto mer arbitrage
  // går att hämta.
  const batteryArbitrageKr = batteryBrand
    ? Math.round(
        batteryKWh *
          600 *
          clamp(input.baseConsumptionKWh / 4500, 0.6, 1.6),
      )
    : 0;

  // EMS lyfter sol-besparingen och batteri-arbitraget.
  const emsBoost = ems ? 1 + ems.spotOptimization : 1;
  const yearlySavingKr = Math.max(
    0,
    Math.round(
      (solarSavingKr + batteryArbitrageKr) * emsBoost + heatpumpSavingKr,
    ),
  );

  // -------- Stödtjänster --------
  // Bara våra egna EMS-plattformar (Enequi Core / Energy IQ) ger access till
  // FCR-D / aFRR. Övriga EMS:er = 0 kr.
  const hasSupportEms = !!ems?.enablesSupportServices;
  const yearlySupportRevenueKr = supportServiceRevenueKr(
    inverter.kw,
    batteryKWh,
    hasSupportEms,
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
    emsPriceKr;

  // -------- Avdrag (grön teknik + ROT) --------
  // Cap per fastighetsägare = 50 000 kr/år. Procenter:
  //   Sol            14,55 %  (grön teknik)
  //   Batteri        48,5 %   (grön teknik) – kräver att huset har sol
  //                            (befintlig eller ny)
  //   Laddbox        48,5 %   (grön teknik)
  //   Värmepump      30 %     (ROT)
  const totalAllowance = (input.numOwners ?? 1) * 50_000;
  let remaining = totalAllowance;

  const houseHasSolar = solActive; // Ny eller befintlig sol
  const solarBaseForDeduction = solarTotalKr + inverterPriceKr;
  const solarDeductionKr = Math.min(
    Math.round(solarBaseForDeduction * 0.1455),
    remaining,
  );
  remaining -= solarDeductionKr;

  const batteryDeductionKr = houseHasSolar
    ? Math.min(
        Math.round((batteryPriceKr + batteryRigKr) * 0.485),
        Math.max(0, remaining),
      )
    : 0;
  remaining -= batteryDeductionKr;

  const chargerDeductionKr = Math.min(
    Math.round(chargerPriceKr * 0.485),
    Math.max(0, remaining),
  );
  remaining -= chargerDeductionKr;

  const heatpumpDeductionKr = Math.min(
    Math.round((heatpumpPriceKr + heatpumpInstallKr) * 0.3),
    Math.max(0, remaining),
  );
  remaining -= heatpumpDeductionKr;

  const greenDeductionKr =
    solarDeductionKr +
    batteryDeductionKr +
    chargerDeductionKr +
    heatpumpDeductionKr;
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
    emsPriceKr,
    totalCostKr,
    solarDeductionKr,
    batteryDeductionKr,
    chargerDeductionKr,
    heatpumpDeductionKr,
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
