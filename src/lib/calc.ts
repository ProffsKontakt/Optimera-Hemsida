import {
  PANELS,
  INVERTERS,
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
  SUPPORT_REVENUE_PER_KWH_INSTALLED,
} from "./catalog";

export type CalcInput = {
  panelId: string;
  panelCount: number;
  inverterId: string;
  batteryId: string | null;
  heatPumpId: string | null;
  chargerId: string | null;
  turbineId: string | null;
  emsId: string | null;
  houseAreaM2: number;
  evKmPerYear: number;
  baseConsumptionKWh: number;
};

export type CalcResult = {
  systemKWp: number;
  yearlyProductionKWh: number;
  yearlyConsumptionKWh: number;
  selfConsumptionShare: number; // 0..1
  yearlyHeatKWh: number;
  yearlyEvKWh: number;
  hardwareCostKr: number;
  installCostKr: number;
  totalCostKr: number;
  greenDeductionKr: number;
  netCostKr: number;
  yearlySavingKr: number;
  yearlySupportRevenueKr: number;
  yearlyEmsCostKr: number;
  paybackYears: number;
  yearly20YearKr: number;
  co2KgPerYear: number;
};

export function computeCalc(input: CalcInput): CalcResult {
  const panel = PANELS.find((p) => p.id === input.panelId) ?? PANELS[0];
  const inverter =
    INVERTERS.find((i) => i.id === input.inverterId) ?? INVERTERS[0];
  const battery =
    input.batteryId ? BATTERIES.find((b) => b.id === input.batteryId) : null;
  const heat =
    input.heatPumpId
      ? HEAT_PUMPS.find((h) => h.id === input.heatPumpId)
      : null;
  const charger =
    input.chargerId
      ? CHARGERS.find((c) => c.id === input.chargerId)
      : null;
  const turbine =
    input.turbineId ? TURBINES.find((t) => t.id === input.turbineId) : null;
  const ems =
    input.emsId ? EMS_OPTIONS.find((e) => e.id === input.emsId) : null;

  const systemKWp = (panel.watt * input.panelCount) / 1000;

  const yearlyProductionKWh =
    systemKWp * SUN_HOURS_KWH_PER_KWP * (inverter.efficiency / 100) +
    (turbine ? turbine.ratedKW * 1800 : 0);

  const yearlyHeatKWh = heat
    ? (input.houseAreaM2 * HOUSE_HEAT_DEMAND_KWH_PER_M2) / heat.scop
    : 0;

  const yearlyEvKWh = charger ? input.evKmPerYear / EV_KM_PER_KWH : 0;

  const yearlyConsumptionKWh =
    input.baseConsumptionKWh + yearlyHeatKWh + yearlyEvKWh;

  const selfConsumptionShare = battery
    ? clamp(0.45 + (battery.capacityKWh / 30) * 0.4, 0.45, 0.85)
    : 0.32;

  const selfUsedKWh = Math.min(
    yearlyProductionKWh * selfConsumptionShare,
    yearlyConsumptionKWh,
  );
  const exportedKWh = Math.max(0, yearlyProductionKWh - selfUsedKWh);
  const importedKWh = Math.max(0, yearlyConsumptionKWh - selfUsedKWh);

  const baseSavingKr =
    selfUsedKWh * SPOT_AVG_KR_KWH +
    exportedKWh * FEED_IN_KR_KWH -
    importedKWh * SPOT_AVG_KR_KWH * 0.05; // nätavgift skattning

  // EMS lyfter besparingen genom smartare styrning
  const emsBoost = ems ? 1 + ems.spotOptimization : 1;
  const yearlySavingKr = baseSavingKr * emsBoost;

  const yearlySupportRevenueKr = battery
    ? battery.capacityKWh *
      SUPPORT_REVENUE_PER_KWH_INSTALLED *
      (ems ? 1 + ems.spotOptimization * 0.6 : 0.6)
    : 0;

  // Hårdvarukostnad
  const panelsKr = panel.pricePerPanelKr * input.panelCount;
  const hardwareCostKr =
    panelsKr +
    inverter.priceKr +
    (battery?.priceKr ?? 0) +
    (heat?.priceKr ?? 0) +
    (charger?.priceKr ?? 0) +
    (turbine?.priceKr ?? 0) +
    (ems?.priceKr ?? 0);

  // Installation: ~20% av materielen + fast rigg-kostnad per delsystem
  const fixedInstallKr =
    25000 + // sol grund
    (battery ? 12000 : 0) +
    (heat ? 35000 : 0) +
    (charger ? 9000 : 0) +
    (turbine ? 85000 : 0);
  const installCostKr = Math.round(hardwareCostKr * 0.18 + fixedInstallKr);

  const totalCostKr = hardwareCostKr + installCostKr;

  // Grönt avdrag – 20% solel, 50% batteri/laddbox, max 50 000 kr/år
  const greenDeductionKr = Math.min(
    50000,
    Math.round(
      panelsKr * 0.2 +
        (battery ? battery.priceKr * 0.5 : 0) +
        (charger ? charger.priceKr * 0.5 : 0),
    ),
  );

  const netCostKr = totalCostKr - greenDeductionKr;
  const yearlyEmsCostKr = ems ? ems.monthlyKr * 12 : 0;
  const totalYearly =
    yearlySavingKr + yearlySupportRevenueKr - yearlyEmsCostKr;
  const paybackYears = totalYearly > 0 ? netCostKr / totalYearly : 0;
  const yearly20YearKr = totalYearly * 20 - netCostKr;

  // CO2: 0.27 kg/kWh nordisk mix
  const co2KgPerYear = (yearlyProductionKWh + (heat ? yearlyHeatKWh : 0) * 0.4) * 0.27;

  return {
    systemKWp,
    yearlyProductionKWh,
    yearlyConsumptionKWh,
    selfConsumptionShare,
    yearlyHeatKWh,
    yearlyEvKWh,
    hardwareCostKr,
    installCostKr,
    totalCostKr,
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

const clamp = (x: number, min: number, max: number) =>
  Math.max(min, Math.min(max, x));

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
