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
  SUPPORT_REVENUE_PER_KWH_INSTALLED,
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
  panelId: string;
  panelCount: number;
  batteryId: string | null;
  batteryCapacityKWh: number;
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
  batteryKWh: number;
  batteryPriceKr: number;
  inverter: InverterAssignment;
  yearlyProductionKWh: number;
  yearlyConsumptionKWh: number;
  selfConsumptionShare: number;
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

// Auto-pickar växelriktare. Prio:
//   1. Om batteri finns – använd batteriets `inverterFor(kWh)`
//   2. Annars (rena solpaneler) – Solis S6 dimensionerad efter kWp
export function pickInverter(
  systemKWp: number,
  batteryBrandId: string | null,
  batteryKWh: number,
): InverterAssignment {
  if (batteryBrandId) {
    const b = BATTERIES.find((b) => b.id === batteryBrandId);
    if (b) return b.inverterFor(batteryKWh);
  }
  if (systemKWp <= 10)
    return { kind: "external", brand: "Solis S6", kw: 10, priceKr: 24500 };
  if (systemKWp <= 15)
    return { kind: "external", brand: "Solis S6", kw: 15, priceKr: 31500 };
  return { kind: "external", brand: "Solis S6", kw: 20, priceKr: 39000 };
}

// Verkningsgrad för Solis S6 / inbyggda växelriktare – platsutgivande
const INVERTER_EFFICIENCY = 97.5;

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

  const panelCount = en.sol ? input.panelCount : 0;
  const systemKWp = (panel.watt * panelCount) / 1000;

  const inverter = pickInverter(
    systemKWp,
    batteryBrand?.id ?? null,
    batteryKWh,
  );

  const yearlyProductionKWh =
    systemKWp * SUN_HOURS_KWH_PER_KWP * (INVERTER_EFFICIENCY / 100) +
    (turbine ? turbine.ratedKW * 1800 : 0);

  const yearlyHeatKWh = heat
    ? (input.houseAreaM2 * HOUSE_HEAT_DEMAND_KWH_PER_M2) / heat.scop
    : 0;

  const yearlyEvKWh = charger ? input.evKmPerYear / EV_KM_PER_KWH : 0;

  const yearlyConsumptionKWh =
    input.baseConsumptionKWh + yearlyHeatKWh + yearlyEvKWh;

  const selfConsumptionShare = batteryBrand
    ? clamp(0.45 + (batteryKWh / 30) * 0.4, 0.45, 0.92)
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
    importedKWh * SPOT_AVG_KR_KWH * 0.05;

  const emsBoost = ems ? 1 + ems.spotOptimization : 1;
  const yearlySavingKr = baseSavingKr * emsBoost;

  const yearlySupportRevenueKr = batteryBrand
    ? batteryKWh *
      SUPPORT_REVENUE_PER_KWH_INSTALLED *
      (ems ? 1 + ems.spotOptimization * 0.6 : 0.6)
    : 0;

  const panelsKr = panel.pricePerPanelKr * panelCount;
  const inverterKr =
    inverter.kind === "external" && (en.sol || en.batteri)
      ? inverter.priceKr
      : 0;
  const hardwareCostKr =
    panelsKr +
    inverterKr +
    batteryPriceKr +
    (heat?.priceKr ?? 0) +
    (charger?.priceKr ?? 0) +
    (turbine?.priceKr ?? 0) +
    (ems?.priceKr ?? 0);

  const fixedInstallKr =
    (en.sol ? 25000 : 0) +
    (batteryBrand ? 12000 : 0) +
    (heat ? 35000 : 0) +
    (charger ? 9000 : 0) +
    (turbine ? 85000 : 0);
  const installCostKr = Math.round(hardwareCostKr * 0.18 + fixedInstallKr);

  const totalCostKr = hardwareCostKr + installCostKr;

  const greenDeductionKr = Math.min(
    50000,
    Math.round(
      panelsKr * 0.2 +
        batteryPriceKr * 0.5 +
        (charger ? charger.priceKr * 0.5 : 0),
    ),
  );

  const netCostKr = totalCostKr - greenDeductionKr;
  const yearlyEmsCostKr = ems ? ems.monthlyKr * 12 : 0;
  const totalYearly =
    yearlySavingKr + yearlySupportRevenueKr - yearlyEmsCostKr;
  const paybackYears = totalYearly > 0 ? netCostKr / totalYearly : 0;
  const yearly20YearKr = totalYearly * 20 - netCostKr;

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
