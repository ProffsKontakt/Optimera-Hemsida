// Räknar SIM_SPAN i src/lib/payback.ts: simulerad återbetalning vid 5:e och
// 95:e percentilen av alla val i kalkylatorn, per fall.
// Kör: npx tsx --tsconfig tsconfig.json scripts/payback-span.ts
import { BATTERIES, PANELS } from "../src/lib/catalog";
import { simulatedPayback } from "../src/lib/payback";
import type { CalcInput } from "../src/lib/calc";

const base = {
  enabled: { sol: false, batteri: true, värmepump: false, laddbox: false },
  elzon: 3, roofType: "sadeltak", panelId: PANELS[0].id, panelCount: 14,
  hasExistingSolar: false, existingSolarKWp: 8, existingSolarYearlyKWh: 0,
  inverterMode: "auto", manualInverterKw: 10, batteryId: BATTERIES[0].id,
  batteryCapacityKWh: 10, heatPumpId: "", chargerId: "", emsId: "", numOwners: 2,
  houseAreaM2: 145, evKmPerYear: 0, baseConsumptionKWh: 4500, annualConsumptionKWh: 15000,
} as unknown as CalcInput;

const zones = [1, 2, 3, 4] as const;
const loads = [7500, 10000, 12500, 15000, 20000, 25000, 30000];
const batteries = BATTERIES.flatMap((b) => b.capacities.slice(0, 8).map((c) => ({ batteryId: b.id, batteryCapacityKWh: c })));

const pct = (xs: number[], p: number) => {
  const s = [...xs].sort((a, b) => a - b);
  return s[Math.min(s.length - 1, Math.floor((p / 100) * s.length))];
};
const report = (name: string, inputs: CalcInput[]) => {
  const ys = inputs.map((i) => simulatedPayback(i)?.years ?? Infinity);
  const r = (x: number) => Math.round(x * 10) / 10;
  console.log(`${name}: n=${ys.length} p5=${r(pct(ys, 5))} p25=${r(pct(ys, 25))} p50=${r(pct(ys, 50))} p75=${r(pct(ys, 75))} p95=${r(pct(ys, 95))}`);
};

const existing: CalcInput[] = [];
const solarBattery: CalcInput[] = [];
const batteryOnly: CalcInput[] = [];
for (const elzon of zones)
  for (const annualConsumptionKWh of loads)
    for (const bat of batteries) {
      for (const existingSolarKWp of [3, 5, 8, 10, 12, 15, 20])
        existing.push({ ...base, elzon, annualConsumptionKWh, ...bat, hasExistingSolar: true, existingSolarKWp });
      for (const panelCount of [8, 12, 16, 20, 24, 30, 36])
        solarBattery.push({ ...base, elzon, annualConsumptionKWh, ...bat, panelCount, enabled: { ...base.enabled, sol: true } });
      batteryOnly.push({ ...base, elzon, annualConsumptionKWh, ...bat });
    }
report("existingSolarBattery", existing);
report("solarAndBattery", solarBattery);
report("batteryOnly", batteryOnly);
