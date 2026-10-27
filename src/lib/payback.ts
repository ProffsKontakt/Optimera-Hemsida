// Återbetalningstid i kalkylatorn.
//
// Besparingen kommer från simuleringen i lib/battery-sim-data.ts: ett års
// verkliga kvartspriser i kundens elområde, kundens årsförbrukning och ett
// batteri som styrs mot priserna (prisstyrning och egenanvändning av solel,
// utan stödtjänster). Investeringen kommer från
// katalogens priser för det valda märket och storleken, efter grönt avdrag.
//
// Simuleringen styr batteriet optimalt, så den kortaste tiden i spannet är
// en övre gräns för vad styrningen kan ge. Den längsta tiden räknar med att
// en verklig styrning når REALISTIC_SHARE av det.
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
      /** Kortast (optimal styrning) och längst (REALISTIC_SHARE av den). */
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

export function estimatePayback(input: CalcInput): PaybackEstimate {
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
  if (invest <= 0) return { kind: "none" };

  // Årlig besparing
  const kWp = newKWp + existingKWp;
  const load = input.annualConsumptionKWh;
  const before = simCost(zone, load, existingKWp, 0); // det kunden har i dag
  const after = simCost(zone, load, kWp, kWh);
  const saving = before - after;
  if (saving <= 0) return { kind: "none" };

  const min = invest / saving;
  const max = invest / (saving * REALISTIC_SHARE);
  return { kind: "years", min, max, priceEstimated };
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
