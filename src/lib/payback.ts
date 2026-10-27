// Återbetalningstid i kalkylatorn.
//
// Batteri: spannen 3–7 år (batteri till befintliga solceller), 4–7 år (sol
// och batteri) och 5–9 år (batteri utan solceller) är Optimeras bedömning
// (PAYBACK_BANDS). Var i spannet ett val hamnar avgörs av simuleringen i
// lib/battery-sim-data.ts: ett års verkliga kvartspriser i kundens elområde,
// kundens årsförbrukning och solcellseffekt, och katalogens pris för valt
// märke och storlek efter grönt avdrag. Ett val med kortare simulerad
// återbetalning hamnar längre ner i spannet.
//
// Bara solceller: tiden räknas direkt ur simuleringen. Den kortaste tiden är
// med normal solproduktion, den längsta med REALISTIC_SHARE av den.
import { SIM_COST, SIM_KWH, SIM_KWP, SIM_LOAD } from "./battery-sim-data";
import { BATTERIES, PANELS, type Elzon } from "./catalog";
import { batteryCustomerPriceKr, pickInverter, solarPriceKr, type CalcInput } from "./calc";

export const REALISTIC_SHARE = 0.8;
const GREEN_BATTERY = 0.485; // av totalpriset vid fast pris
const GREEN_CAP_PER_PERSON = 50_000;

const axisPos = (axis: readonly number[], v: number) => {
  const x = Math.max(axis[0], Math.min(axis[axis.length - 1], v));
  let i = 0;
  while (i < axis.length - 2 && x > axis[i + 1]) i++;
  return [i, (x - axis[i]) / (axis[i + 1] - axis[i])] as const;
};

/** Årlig elkostnad ur simuleringen, interpolerad i förbrukning, kWp och kWh. */
export function simCost(zone: Elzon, loadKWh: number, kwp: number, kwh: number): number {
  const grid = SIM_COST[zone];
  const [li, lt] = axisPos(SIM_LOAD, loadKWh);
  const [pi, pt] = axisPos(SIM_KWP, kwp);
  const [bi, bt] = axisPos(SIM_KWH, kwh);
  let sum = 0;
  for (const [dl, wl] of [[0, 1 - lt], [1, lt]] as const)
    for (const [dp, wp] of [[0, 1 - pt], [1, pt]] as const)
      for (const [db, wb] of [[0, 1 - bt], [1, bt]] as const)
        sum += grid[li + dl][pi + dp][bi + db] * wl * wp * wb;
  return sum;
}

export type PaybackEstimate =
  | {
      kind: "years";
      min: number;
      max: number;
      /** Batteripriset är uppskattat (märket saknar inlagt pris). */
      priceEstimated: boolean;
    }
  | { kind: "none" };

/** Batteriets pris inkl. moms före avdrag. Saknar märket pris används Eways pris per kWh. */
function batteryPrice(input: CalcInput, kWh: number, kWp: number) {
  const battery = BATTERIES.find((b) => b.id === input.batteryId) ?? BATTERIES[0];
  const priced = battery.pricePending ? BATTERIES.find((b) => !b.pricePending)! : battery;
  const nearest = priced.capacities.reduce((a, c) => (Math.abs(c - kWh) < Math.abs(a - kWh) ? c : a));
  const inverter = pickInverter(kWp, priced.id, nearest, input.inverterMode, input.manualInverterKw);
  const total = batteryCustomerPriceKr(priced, nearest, inverter).totalIncMomsKr;
  return { total: (total * kWh) / nearest, estimated: priced.id !== battery.id };
}

type Scenario = keyof typeof PAYBACK_BANDS;

/** Optimeras spann per fall, i år. width = hur brett spannet för ett enskilt val är. */
export const PAYBACK_BANDS = {
  existingSolarBattery: { lo: 3, hi: 7, width: 1.5 },
  solarAndBattery: { lo: 4, hi: 7, width: 1 },
  batteryOnly: { lo: 5, hi: 9, width: 1.5 },
} as const;

// Simulerad återbetalning (år) vid 5:e och 95:e percentilen av alla val i
// kalkylatorn för respektive fall – kortare än den första hamnar längst ner
// i spannet, längre än den andra längst upp. Räknat med scripts/payback-span.ts.
const SIM_SPAN: Record<Scenario, readonly [number, number]> = {
  existingSolarBattery: [6, 32],
  solarAndBattery: [6, 16.5],
  batteryOnly: [14, 90],
};

function scenarioOf(input: CalcInput): Scenario | "solar" | null {
  const battery = input.enabled.batteri;
  const newSolar = input.enabled.sol;
  if (battery && newSolar) return "solarAndBattery";
  if (battery && input.hasExistingSolar) return "existingSolarBattery";
  if (battery) return "batteryOnly";
  if (newSolar) return "solar";
  return null;
}

/** Simulerad återbetalning: investering efter avdrag delat med årlig besparing (perfekt styrning). */
export function simulatedPayback(input: CalcInput): { years: number; priceEstimated: boolean } | null {
  const zone = input.elzon;
  const kWh = input.enabled.batteri ? input.batteryCapacityKWh : 0;
  const owners = input.numOwners ?? 2;
  const cap = GREEN_CAP_PER_PERSON * owners;

  const panel = PANELS.find((p) => p.id === input.panelId) ?? PANELS[0];
  const newKWp = input.enabled.sol ? (input.panelCount * panel.watt) / 1000 : 0;
  const existingKWp = input.hasExistingSolar ? input.existingSolarKWp : 0;

  // Investeringen
  let invest = 0;
  let priceEstimated = false;
  let deduction = 0;
  if (newKWp > 0) invest += solarPriceKr(input.panelCount, panel.pricePerPanelKr); // redan efter avdrag
  if (kWh > 0) {
    const bp = batteryPrice(input, kWh, newKWp || existingKWp);
    priceEstimated = bp.estimated;
    invest += bp.total;
    // Grönt avdrag för batteri bara när det lagrar egen solel.
    if (newKWp > 0 || existingKWp > 0) deduction = Math.min(bp.total * GREEN_BATTERY, cap);
  }
  invest -= deduction;
  if (invest <= 0) return null;

  // Årlig besparing
  const load = input.annualConsumptionKWh;
  const before = simCost(zone, load, existingKWp, 0); // det kunden har i dag
  const after = simCost(zone, load, newKWp + existingKWp, kWh);
  const saving = before - after;
  return { years: saving > 0 ? invest / saving : Infinity, priceEstimated };
}

export function estimatePayback(input: CalcInput): PaybackEstimate {
  const scenario = scenarioOf(input);
  const sim = scenario ? simulatedPayback(input) : null;
  if (!scenario || !sim) return { kind: "none" };

  if (scenario === "solar") {
    if (!Number.isFinite(sim.years)) return { kind: "none" };
    return { kind: "years", min: sim.years, max: sim.years / REALISTIC_SHARE, priceEstimated: false };
  }

  const band = PAYBACK_BANDS[scenario];
  const [a, b] = SIM_SPAN[scenario];
  const t = Number.isFinite(sim.years)
    ? Math.max(0, Math.min(1, Math.log(sim.years / a) / Math.log(b / a)))
    : 1;
  const min = band.lo + t * (band.hi - band.lo - band.width);
  return { kind: "years", min, max: min + band.width, priceEstimated: sim.priceEstimated };
}

/** "≈ 10,5–13 år" – avrundat till halvår, långa tider kapas. */
export function formatPayback(e: PaybackEstimate): string {
  if (e.kind === "none") return "Vi räknar på det";
  const r = (x: number) => Math.round(x * 2) / 2;
  const f = (x: number) => String(r(x)).replace(".", ",");
  if (r(e.min) > 25) return "Över 25 år";
  if (r(e.max) > 25) return `≈ ${f(e.min)}–25+ år`;
  if (r(e.min) === r(e.max)) return `≈ ${f(e.min)} år`;
  return `≈ ${f(e.min)}–${f(e.max)} år`;
}
