/**
 * Delad logik för kalkylatorns resultat: standardvalen och texten som
 * beskriver vad ett val brukar innebära. Används av 3D-kalkylatorn på
 * /kalkylator och av den lilla kalkylen på startsidan, så att båda alltid
 * visar samma återbetalningsspann för samma val.
 */
import { PANELS, BATTERIES, CHARGERS, EMS_OPTIONS, HEAT_PUMPS } from "./catalog";
import { formatNumber, type CalcInput } from "./calc";
import { estimatePayback, formatPayback, paybackBand } from "./payback";

/** Utgångsläget i kalkylatorn. */
export const DEFAULT_CALC_INPUT: CalcInput = {
  enabled: { sol: true, batteri: true, värmepump: false, laddbox: false },
  elzon: 3,
  roofType: "sadeltak",
  panelId: PANELS[0].id,
  panelCount: 14,
  hasExistingSolar: false,
  existingSolarKWp: 8,
  existingSolarYearlyKWh: 6800,
  inverterMode: "auto",
  manualInverterKw: 10,
  batteryId: BATTERIES[0].id,
  batteryCapacityKWh: BATTERIES[0].capacities[1] ?? BATTERIES[0].capacities[0],
  heatPumpId: HEAT_PUMPS[0].id,
  chargerId: CHARGERS[0].id,
  emsId: EMS_OPTIONS[0].id,
  numOwners: 2,
  houseAreaM2: 145,
  evKmPerYear: 18000,
  baseConsumptionKWh: 4500,
  annualConsumptionKWh: 15000,
};

/** 15,36 → "15,4", 9,6 → "9,6", 20 → "20". */
export const kWhLabel = (c: number) => String(Math.round(c * 10) / 10).replace(".", ",");

// Återbetalningen räknas i lib/payback.ts. För batteri ligger den inom
// Optimeras spann (3–7, 4–7 eller 5–9 år), och var i spannet avgörs av en
// simulering med verkliga kvartspriser i det valda elområdet och katalogens
// priser. Därför ändras siffran med elområde, märke, batteristorlek,
// solcellseffekt och förbrukning.
export const BATTERY_NOTE = "Var i spannet du hamnar avgörs av elområde, förbrukning och batteriets storlek och pris";

export function calcScenario(input: CalcInput) {
  const existingSolar = input.hasExistingSolar;
  const addSolar = input.enabled.sol;
  const addBattery = input.enabled.batteri;
  const estimate = estimatePayback(input);
  const range = formatPayback(estimate);
  // Samma spann som i texten, avrundat till halvår på samma sätt, för den
  // som vill rita det på en skala. Saknas när tiden inte går att ange.
  const band = paybackBand(input);
  const half = (x: number) => Math.round(x * 2) / 2;
  const span =
    estimate.kind === "years" && half(estimate.max) <= 25
      ? { min: half(estimate.min), max: half(estimate.max) }
      : null;
  const zone = `SE${input.elzon}`;
  const use = `${formatNumber(input.annualConsumptionKWh)} kWh per år`;
  const estimatedPrice =
    estimate.kind === "years" && estimate.priceEstimated
      ? " Priset för det här märket är uppskattat – exakt pris tar vi fram i offerten."
      : "";
  if (existingSolar && addBattery)
    return {
      range,
      span,
      band,
      tag: "Batteri till befintliga solceller",
      lead: `${kWhLabel(input.batteryCapacityKWh)} kWh till dina ${String(input.existingSolarKWp).replace(".", ",")} kWp i ${zone}, med en förbrukning på ${use}. Batteriet tjänar på prisstyrning och på att solelen används själv i stället för att säljas. Har ditt nätbolag effektavgift blir tiden kortare, eftersom batteriet också kapar effekttopparna.${estimatedPrice}`,
      note: BATTERY_NOTE,
    };
  if (addSolar && addBattery)
    return {
      range,
      span,
      band,
      tag: "Sol och batteri",
      lead: `${input.panelCount} paneler och ${kWhLabel(input.batteryCapacityKWh)} kWh i ${zone}, med en förbrukning på ${use}. Solcellerna står för det mesta av besparingen, och batteriet flyttar solel till kvällen och prisstyr resten av året.${estimatedPrice}`,
      note: BATTERY_NOTE,
    };
  if (addSolar && !addBattery)
    return {
      tag: "Solceller",
      range,
      span,
      band,
      lead: `${input.panelCount} paneler i ${zone}, med en förbrukning på ${use}. Taket, väderstrecket och hur mycket solel du använder själv avgör var i spannet du hamnar.`,
      note: "Längst om panelerna ger 20 % mindre än normalt – till exempel av skugga eller sämre väderstreck",
    };
  if (addBattery && !existingSolar && !addSolar)
    return {
      tag: "Batteri utan solceller",
      range,
      span,
      band,
      lead: `Utan egen solel blir det inget grönt avdrag, och besparingen kommer bara från prisstyrning. Det lönar sig bäst där priset svänger mest – i ${zone} med ${use} blir det så här. Vi räknar ärligt på ditt hus och säger nej om det inte går ihop.${estimatedPrice}`,
      note: BATTERY_NOTE,
    };
  return {
    tag: "",
    range: "Välj ovan",
    span: null,
    band: null,
    lead: "Kryssa i vad du vill ha, så visar vi vad det brukar innebära.",
    note: "",
  };
}
