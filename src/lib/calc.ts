import {
  PANELS,
  BATTERIES,
  HEAT_PUMPS,
  CHARGERS,
  EMS_OPTIONS,
  SPOT_AVG_BY_ZONE,
  FEED_IN_BY_ZONE,
  SUN_HOURS_KWH_PER_KWP,
  HOUSE_HEAT_DEMAND_KWH_PER_M2,
  EV_KM_PER_KWH,
  MOMS_FACTOR,
  BATTERY_PROJECT_MARGIN_KR,
  PER_EXTRA_MODULE_MARGIN_KR,
  BATTERY_INSTALLATION_FIXED_KR,
  CHARGER_INSTALL_KR,
  SUPPORT_KR_PER_KW_PER_MONTH,
  EMALDO_GRID_REWARDS_KR_PER_MONTH,
  EL_PRICE_PER_KWH_KR,
  SAVING_CAP_FRACTION,
  type Battery,
  type Elzon,
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
  // Elområde – styr spotpris, säljpris och Emaldo grid rewards
  elzon: Elzon;
  // Tak
  roofType: RoofType;
  // Sol-input
  panelId: string;
  panelCount: number;
  hasExistingSolar: boolean;
  existingSolarKWp: number;
  existingSolarYearlyKWh: number;
  // Växelriktare (manuellt val: 10 eller 15 kW Solis S6)
  inverterMode: "auto" | "manual";
  manualInverterKw: 10 | 15;
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
  batteryModuleCount: number;
  batteryPriceKr: number; // ink moms före avdrag, hela batteripaketet inkl Solis
  // 6 line items för batteriets prisbild (alla ink moms före avdrag, redan
  // gångrade med MOMS_FACTOR från ex moms källvärden i katalogen).
  batteryBreakdown: {
    bmsAndBaseKr: number;
    moduleCostKr: number;
    inverterKr: number;
    projectMarginKr: number;
    extraModuleMarginKr: number;
    installationKr: number;
  };
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
  yearlySavingKr: number;            // sol + arbitrage + värme (utan stödtjänster/EMS/grid)
  yearlySupportRevenueKr: number;    // FCR-D / aFRR via Enequi/Energy IQ
  yearlyEmaldoRewardsKr: number;     // Emaldo grid rewards (zon 3 eller 4 + Emaldo-batteri)
  emaldoZoneSupported: boolean;      // false om Emaldo valt + zon 1 eller 2
  yearlyEmsCostKr: number;
  yearlyNetKr: number;               // yearlySavingKr + support + emaldo − EMS
  paybackYears: number;              // netCostKr / yearlyNetKr
  yearly20YearKr: number;            // yearlyNetKr × 20 − netCostKr
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
 * Stödtjänster (FCR-D / aFRR) – linjär modell (Viktor 2026-05-09):
 *   65 kr per kW växelriktare per månad.
 * Kräver att en EMS som klarar Svenska Kraftnät-styrningen är vald
 * (Enequi Core eller Energy IQ).
 */
export function supportServiceRevenueKr(
  inverterKw: number,
  hasSupportEms: boolean,
): number {
  if (!hasSupportEms || inverterKw <= 0) return 0;
  return Math.round(inverterKw * SUPPORT_KR_PER_KW_PER_MONTH * 12);
}

/**
 * Emaldo grid rewards – garanterad månadsersättning från Emaldo om
 * Emaldo Power Store är installerat och kunden bor i SE3 eller SE4.
 * I SE1 / SE2 erbjuder Optimera inte Emaldo-installation.
 */
export function emaldoGridRewardsKr(
  batteryId: string | null,
  zone: Elzon,
): { yearlyKr: number; supported: boolean } {
  if (batteryId !== "emaldo-store") {
    return { yearlyKr: 0, supported: true };
  }
  const monthly = EMALDO_GRID_REWARDS_KR_PER_MONTH[zone];
  if (monthly == null) {
    // Zon 1 eller 2 – inte stött
    return { yearlyKr: 0, supported: false };
  }
  return { yearlyKr: monthly * 12, supported: true };
}

// =============================== VÄXELRIKTARE ===============================
// Solis S6-priser ex moms (matchar SOLIS-mappen i catalog.ts).
const SOLIS_PRICES_EX_MOMS: Record<10 | 15, number> = {
  10: 10_294,
  15: 15_990,
};

export function pickInverter(
  systemKWp: number,
  batteryBrandId: string | null,
  batteryKWh: number,
  mode: "auto" | "manual",
  manualKw: 10 | 15,
): InverterAssignment {
  if (mode === "manual") {
    return {
      kind: "external",
      brand: "Solis S6",
      kw: manualKw,
      priceKr: SOLIS_PRICES_EX_MOMS[manualKw],
    };
  }
  if (batteryBrandId) {
    const b = BATTERIES.find((b) => b.id === batteryBrandId);
    if (b) return b.inverterFor(batteryKWh);
  }
  // Ren sol-anläggning utan batteri – välj Solis efter kWp.
  if (systemKWp <= 10)
    return { kind: "external", brand: "Solis S6", kw: 10, priceKr: SOLIS_PRICES_EX_MOMS[10] };
  return { kind: "external", brand: "Solis S6", kw: 15, priceKr: SOLIS_PRICES_EX_MOMS[15] };
}

// =============================== BATTERIPRIS ===============================
/**
 * Beräknar batteripaketets sex line items, returnerar ink moms före avdrag.
 *
 * Modellen (alla källvärden ex moms i katalogen):
 *   ex_moms = baseHardwareKr
 *           + n × perModuleHardwareKr
 *           + (växelriktarpris ex moms)
 *           + 30 000                                 (projektmarginal)
 *           + max(0, n − 2) × 1 000                   (extra modul-marginal)
 *           + BATTERY_INSTALLATION_FIXED_KR           (extern install-kostnad)
 *   ink_moms_före_avdrag = ex_moms × 1,25
 *
 * Den 30 000 kr-marginalen är vår vinst EFTER att installationen är
 * betald, alltså independent från install-kostnaden.
 */
export function batteryCustomerPriceKr(
  battery: Battery,
  kWh: number,
  inverter: InverterAssignment,
): {
  moduleCount: number;
  breakdown: CalcResult["batteryBreakdown"];
  totalIncMomsKr: number;
} {
  const moduleCount = Math.max(
    0,
    Math.round(kWh / battery.kWhPerModule),
  );
  const inverterExMomsKr =
    inverter.kind === "external" ? inverter.priceKr : 0;

  // Hardware: tabell-överrid om finns (SAJ HS3), annars base + n × per-modul.
  const hardwareFromTable = battery.capacityHardwareTable?.[kWh];
  const hardwareCost = hardwareFromTable ?? (
    battery.baseHardwareKr + moduleCount * battery.perModuleHardwareKr
  );

  // Per-batteri overrides på marginalerna.
  const projectMargin = battery.projectMarginKr ?? BATTERY_PROJECT_MARGIN_KR;
  const perExtraMargin =
    battery.perExtraModuleMarginKr ?? PER_EXTRA_MODULE_MARGIN_KR;
  const extraStartIdx = battery.extraMarginStartIdx ?? 3;
  const extraModuleCount = Math.max(0, moduleCount - extraStartIdx + 1);
  const extraModuleMargin = extraModuleCount * perExtraMargin;

  // För visning: när hardware kommer från en tabell delar vi inte upp i
  // BMS+bas / moduler – vi visar allt under "Hårdvara".
  const exMoms = {
    bmsAndBase: hardwareFromTable != null ? hardwareCost : battery.baseHardwareKr,
    modules: hardwareFromTable != null ? 0 : moduleCount * battery.perModuleHardwareKr,
    inverter: inverterExMomsKr,
    projectMargin,
    extraModuleMargin,
    installation: BATTERY_INSTALLATION_FIXED_KR,
  };

  const totalExMoms =
    exMoms.bmsAndBase +
    exMoms.modules +
    exMoms.inverter +
    exMoms.projectMargin +
    exMoms.extraModuleMargin +
    exMoms.installation;
  const totalIncMomsKr = Math.round(totalExMoms * MOMS_FACTOR);

  return {
    moduleCount,
    breakdown: {
      bmsAndBaseKr: Math.round(exMoms.bmsAndBase * MOMS_FACTOR),
      moduleCostKr: Math.round(exMoms.modules * MOMS_FACTOR),
      inverterKr: Math.round(exMoms.inverter * MOMS_FACTOR),
      projectMarginKr: Math.round(exMoms.projectMargin * MOMS_FACTOR),
      extraModuleMarginKr: Math.round(exMoms.extraModuleMargin * MOMS_FACTOR),
      installationKr: Math.round(exMoms.installation * MOMS_FACTOR),
    },
    totalIncMomsKr,
  };
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
  // Spotpris och feed-in skalas mot vald elzon (SE1–SE4).
  const spotPrice = SPOT_AVG_BY_ZONE[input.elzon];
  const feedInPrice = FEED_IN_BY_ZONE[input.elzon];

  // Sol-besparing: vad du sparar genom att inte köpa el du själv producerar +
  // det du säljer på spotpris.
  const solarSavingKr =
    selfUsedKWh * spotPrice + exportedKWh * feedInPrice;

  // Värmepumps-besparing: skillnaden mellan direktverkande el (1:1) och
  // pumpens elförbrukning (1/SCOP).
  const heatpumpSavingKr = heat
    ? (heatedHouseKWh - yearlyHeatKWh) * spotPrice
    : 0;

  // Batteri-arbitrage (gäller även utan sol): batteriet köper när priset är
  // lågt och säljer/använder när det är högt. Konservativt 600 kr/kWh/år vid
  // SE3-spotpris. Skalar mot zonens spotpris (mer arbitrage i SE4) och mot
  // årsförbrukningen.
  const arbitrageBaseKrPerKWh = 600 * (spotPrice / SPOT_AVG_BY_ZONE[3]);
  const batteryArbitrageKr = batteryBrand
    ? Math.round(
        batteryKWh *
          arbitrageBaseKrPerKWh *
          clamp(input.baseConsumptionKWh / 4500, 0.6, 1.6),
      )
    : 0;

  // EMS lyfter sol-besparingen och batteri-arbitraget.
  const emsBoost = ems ? 1 + ems.spotOptimization : 1;
  const rawSavingKr = Math.round(
    (solarSavingKr + batteryArbitrageKr) * emsBoost + heatpumpSavingKr,
  );

  // Tak på besparingen: en realistisk gräns på 60 % av kundens totala
  // elkostnad (årsförbrukning × snittpris). Stödtjänster + Emaldo grid
  // rewards adderas utanför taket.
  const savingCapKr = Math.round(
    input.baseConsumptionKWh * EL_PRICE_PER_KWH_KR * SAVING_CAP_FRACTION,
  );
  const yearlySavingKr = Math.max(0, Math.min(rawSavingKr, savingCapKr));

  // -------- Stödtjänster --------
  // Bara våra egna EMS-plattformar (Enequi Core / Energy IQ) ger access till
  // FCR-D / aFRR. Övriga EMS:er = 0 kr.
  const hasSupportEms = !!ems?.enablesSupportServices;
  const yearlySupportRevenueKr = supportServiceRevenueKr(
    inverter.kw,
    hasSupportEms,
  );

  // -------- Emaldo grid rewards --------
  // Garanterad månadsersättning från Emaldo om Emaldo Power Store + zon 3/4.
  const emaldoRewards = emaldoGridRewardsKr(
    batteryBrand?.id ?? null,
    input.elzon,
  );
  const yearlyEmaldoRewardsKr = emaldoRewards.yearlyKr;
  const emaldoZoneSupported = emaldoRewards.supported;

  // -------- Hårdvarukostnader --------
  // Sol: solarPriceKr är legacy "ink moms efter avdrag" – gränsar mot
  //      14,55 %-avdraget i avdragsblocket nedan (inkonsekvens kvar tills
  //      Viktor levererar ex moms-data för panel + baspris).
  const newSolarPriceKr = useExistingSolar
    ? 0
    : solActive
    ? solarPriceKr(newPanelCount, panel.pricePerPanelKr)
    : 0;
  const solarTotalKr = newSolarPriceKr;

  // Batteri-paketet enligt Viktors 6-line-item-modell. Returneras ink moms
  // före avdrag (redan gångrad med MOMS_FACTOR från ex moms-källvärden).
  const batteryPackage = batteryBrand
    ? batteryCustomerPriceKr(batteryBrand, batteryKWh, inverter)
    : null;
  const batteryPriceKr = batteryPackage?.totalIncMomsKr ?? 0;
  const batteryModuleCount = batteryPackage?.moduleCount ?? 0;
  const batteryBreakdown = batteryPackage?.breakdown ?? {
    bmsAndBaseKr: 0,
    moduleCostKr: 0,
    inverterKr: 0,
    projectMarginKr: 0,
    extraModuleMarginKr: 0,
    installationKr: 0,
  };

  // Växelriktar-priset är inbakat i batteripaketet ovan. Om endast sol är
  // valt (utan batteri) lägger vi växelriktaren här som separat post.
  const inverterPriceKr =
    inverter.kind === "external" && newPanelCount > 0 && !en.batteri
      ? Math.round(inverter.priceKr * MOMS_FACTOR)
      : 0;

  const heatpumpPriceKr = heat ? heat.priceKr : 0;
  const heatpumpInstallKr = heat ? 35_000 : 0;
  const chargerPriceKr = charger ? charger.priceKr + CHARGER_INSTALL_KR : 0;
  const emsPriceKr = ems ? ems.priceKr : 0;

  const totalCostKr =
    solarTotalKr +
    inverterPriceKr +
    batteryPriceKr +
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

  const solarBaseForDeduction = solarTotalKr + inverterPriceKr;
  const solarDeductionKr = Math.min(
    Math.round(solarBaseForDeduction * 0.1455),
    remaining,
  );
  remaining -= solarDeductionKr;

  // Batteri-avdraget gäller på hela batteripaketet (BMS+bas + moduler +
  // växelriktare + marginal + install) ink moms. Skatteverket kräver att
  // batteriet kopplas till en anläggning för egenproducerad förnybar el –
  // vilket Optimera alltid säkerställer (ny eller befintlig sol). Vi
  // applicerar därför avdraget oavsett om sol-toggle är på i kalkylatorn.
  const batteryDeductionKr = Math.min(
    Math.round(batteryPriceKr * 0.485),
    Math.max(0, remaining),
  );
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
  const yearlyNetKr =
    yearlySavingKr +
    yearlySupportRevenueKr +
    yearlyEmaldoRewardsKr -
    yearlyEmsCostKr;
  const paybackYears = yearlyNetKr > 0 ? netCostKr / yearlyNetKr : 0;
  const yearly20YearKr = yearlyNetKr * 20 - netCostKr;

  // -------- CO₂ undvikt --------
  const co2KgPerYear =
    (yearlyProductionKWh + (heat ? yearlyHeatKWh : 0) * 0.4) * 0.27;

  return {
    systemKWp,
    batteryKWh,
    batteryModuleCount,
    batteryPriceKr,
    batteryBreakdown,
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
    yearlyEmaldoRewardsKr,
    emaldoZoneSupported,
    yearlyEmsCostKr,
    yearlyNetKr,
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
