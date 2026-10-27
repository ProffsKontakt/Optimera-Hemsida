"use client";

import Link from "next/link";
import { roofPanelCapacity } from "@/lib/roof-geometry";
import dynamic from "next/dynamic";
import { useState } from "react";
import { ArrowRight, Check, Sun, BatteryCharging, Zap } from "lucide-react";
import {
  PANELS,
  BATTERIES,
  CHARGERS,
  EMS_OPTIONS,
  HEAT_PUMPS,
  ROOF_TYPES,
  ELZONER,
  MAX_PANELS_PER_HOUSE,
} from "@/lib/catalog";
import { formatNumber, type CalcInput } from "@/lib/calc";
import { estimatePayback, formatPayback } from "@/lib/payback";
import { CanvasErrorBoundary } from "@/components/3d/CanvasErrorBoundary";
import { SceneFallback } from "@/components/3d/SceneFallback";

/**
 * Kalkylatorns konfigurator: 3D-modell + samma inmatning som tidigare, men
 * utan exakta kronor. Resultatet är ärliga riktnings-spann som lotsar mot ett
 * samtal med en tekniker som räknar fram de exakta siffrorna.
 */
const CalcScene = dynamic(
  () => import("@/components/3d/CalcScene").then((m) => m.CalcScene),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-cream" aria-hidden />,
  },
);

const initial: CalcInput = {
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

const BATTERY_LABEL: Record<string, string> = {
  "easyway-univ7600": "Eway",
  "saj-hs3": "SAJ HS3",
  "enershare-core": "Enershare",
  sigenstor: "SigenStor",
};

/** Så många paneler som ryms på kalkylatorns hus med den taktypen. */
const maxPanelsFor = (roof: CalcInput["roofType"]) =>
  Math.min(MAX_PANELS_PER_HOUSE, roofPanelCapacity(roof));

/** 15,36 → "15,4", 9,6 → "9,6", 20 → "20". */
const kWhLabel = (c: number) => String(Math.round(c * 10) / 10).replace(".", ",");

// Återbetalningen räknas i lib/payback.ts. För batteri ligger den inom
// Optimeras spann (3–7, 4–7 eller 5–9 år), och var i spannet avgörs av en
// simulering med verkliga kvartspriser i det valda elområdet och katalogens
// priser. Därför ändras siffran med elområde, märke, batteristorlek,
// solcellseffekt och förbrukning.
const BATTERY_NOTE = "Var i spannet du hamnar avgörs av elområde, förbrukning och batteriets storlek och pris";

function scenario(input: CalcInput) {
  const existingSolar = input.hasExistingSolar;
  const addSolar = input.enabled.sol;
  const addBattery = input.enabled.batteri;
  const estimate = estimatePayback(input);
  const range = formatPayback(estimate);
  const zone = `SE${input.elzon}`;
  const use = `${formatNumber(input.annualConsumptionKWh)} kWh per år`;
  const estimatedPrice =
    estimate.kind === "years" && estimate.priceEstimated
      ? " Priset för det här märket är uppskattat – exakt pris tar vi fram i offerten."
      : "";
  if (existingSolar && addBattery)
    return {
      range,
      tag: "Batteri till befintliga solceller",
      lead: `${kWhLabel(input.batteryCapacityKWh)} kWh till dina ${String(input.existingSolarKWp).replace(".", ",")} kWp i ${zone}, med en förbrukning på ${use}. Batteriet tjänar på prisstyrning och på att solelen används själv i stället för att säljas. Har ditt nätbolag effektavgift blir tiden kortare, eftersom batteriet också kapar effekttopparna.${estimatedPrice}`,
      note: BATTERY_NOTE,
    };
  if (addSolar && addBattery)
    return {
      range,
      tag: "Sol och batteri",
      lead: `${input.panelCount} paneler och ${kWhLabel(input.batteryCapacityKWh)} kWh i ${zone}, med en förbrukning på ${use}. Solcellerna står för det mesta av besparingen, och batteriet flyttar solel till kvällen och prisstyr resten av året.${estimatedPrice}`,
      note: BATTERY_NOTE,
    };
  if (addSolar && !addBattery)
    return {
      tag: "Solceller",
      range,
      lead: `${input.panelCount} paneler i ${zone}, med en förbrukning på ${use}. Taket, väderstrecket och hur mycket solel du använder själv avgör var i spannet du hamnar.`,
      note: "Längst om panelerna ger 20 % mindre än normalt – till exempel av skugga eller sämre väderstreck",
    };
  if (addBattery && !existingSolar && !addSolar)
    return {
      tag: "Batteri utan solceller",
      range,
      lead: `Utan egen solel blir det inget grönt avdrag, och besparingen kommer bara från prisstyrning. Det lönar sig bäst där priset svänger mest – i ${zone} med ${use} blir det så här. Vi räknar ärligt på ditt hus och säger nej om det inte går ihop.${estimatedPrice}`,
      note: BATTERY_NOTE,
    };
  return {
    tag: "",
    range: "Välj ovan",
    lead: "Kryssa i vad du vill ha, så visar vi vad det brukar innebära.",
    note: "",
  };
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-xl border px-3 py-2 text-[13px] transition text-left flex items-center gap-1.5",
        active
          ? "bg-ink text-bone border-ink"
          : "bg-cream/50 border-ink/15 hover:border-ink/40 text-ink",
      ].join(" ")}
    >
      {active && <Check size={13} className="shrink-0" />}
      {children}
    </button>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink/50 mb-2">
        {label}
      </div>
      {children}
    </div>
  );
}

export function CalcConfigurator() {
  const [input, setInput] = useState<CalcInput>(initial);
  const patch = (p: Partial<CalcInput>) => setInput((cur) => ({ ...cur, ...p }));
  const toggle = (k: keyof CalcInput["enabled"]) =>
    setInput((cur) => ({ ...cur, enabled: { ...cur.enabled, [k]: !cur.enabled[k] } }));

  const battery = BATTERIES.find((b) => b.id === input.batteryId) ?? BATTERIES[0];
  const s = scenario(input);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 xl:gap-8">
      {/* VÄNSTER: 3D + riktnings-svar */}
      <div className="xl:col-span-7 space-y-4">
        <div className="relative aspect-[4/3] rounded-[28px] border border-ink/10 overflow-hidden bg-cream blueprint-bg">
          <CanvasErrorBoundary fallback={<SceneFallback kind="house" />}>
            <CalcScene input={input} />
          </CanvasErrorBoundary>
        </div>

        <div className="rounded-3xl border border-indigo/25 bg-indigo/[0.04] p-6 md:p-7">
          {s.tag && (
            <div className="inline-flex items-center rounded-full bg-indigo text-bone font-mono text-[10.5px] uppercase tracking-[0.16em] px-3 py-1">
              {s.tag}
            </div>
          )}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-[auto,1fr] sm:gap-6 items-start">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/50">
                Uppskattad återbetalning
              </div>
              <div className="mt-1 font-display text-[40px] md:text-[52px] leading-none tracking-display-tight text-indigo whitespace-nowrap">
                {s.range}
              </div>
              {s.note && <div className="mt-1.5 text-[12px] text-ink/45 max-w-[260px]">{s.note}</div>}
            </div>
            <p className="mt-4 sm:mt-0 text-ink/75 text-[14.5px] leading-relaxed">
              {s.lead}
            </p>
          </div>

          <ul className="mt-5 space-y-2 text-[13.5px] text-ink/70">
            {input.enabled.batteri && (
              <li className="flex items-start gap-2">
                <Check size={15} className="mt-0.5 text-moss shrink-0" />
                Spannet för batteri är Optimeras bedömning. Skillnaden mellan elområden, märken och storlekar räknas på verkliga kvartspriser i SE1–SE4 (okt 2025–okt 2026).
              </li>
            )}
            {input.enabled.batteri && (
              <li className="flex items-start gap-2">
                <Check size={15} className="mt-0.5 text-moss shrink-0" />
                Smarta funktioner, spotprisoptimering, stödtjänster, peak-shaving
                och egen lagring – vi väljer det som är mest lönsamt där ni bor
                och för er bostad.
              </li>
            )}
            <li className="flex items-start gap-2">
              <Check size={15} className="mt-0.5 text-moss shrink-0" />
              Grönt avdrag: 14,55 % på solceller, 48,5 % på batteri.
            </li>
          </ul>

          <div className="mt-6 rounded-2xl border border-ink/10 bg-bone/70 p-4 text-[13px] text-ink/70 leading-relaxed">
            Vi ger medvetet inga exakta kronor här – en kalkylator känner inte
            ditt tak, ditt elnät eller hur ni använder el timme för timme. Vill
            du ha riktiga siffror och ett pris för just din bostad?
          </div>
          <Link href="/offert" className="mt-4 btn-primary w-full justify-center text-base">
            Begär offert – vi räknar på det <ArrowRight size={16} />
          </Link>
          <p className="mt-2 text-center text-[12.5px] text-ink/50">
            En tekniker går igenom siffrorna med dig – inga påslag, inga "från"-priser.
          </p>
        </div>
      </div>

      {/* HÖGER: inmatning (utan kronor) */}
      <aside className="xl:col-span-5 space-y-5">
        <div className="rounded-3xl border border-ink/10 bg-bone p-6 space-y-5">
          <Field label="Har du redan solceller?">
            <div className="grid grid-cols-2 gap-2">
              <Chip
                active={input.hasExistingSolar}
                onClick={() => patch({ hasExistingSolar: true, enabled: { ...input.enabled, sol: false } })}
              >
                Ja, jag har solceller
              </Chip>
              <Chip
                active={!input.hasExistingSolar}
                onClick={() => patch({ hasExistingSolar: false, enabled: { ...input.enabled, sol: true } })}
              >
                Nej, inte än
              </Chip>
            </div>
            {input.hasExistingSolar && (
              <div className="mt-4">
                <div className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink/50 mb-2">
                  Installerad effekt: {String(input.existingSolarKWp).replace(".", ",")} kWp
                </div>
                <input
                  type="range"
                  min={2}
                  max={20}
                  step={0.5}
                  value={input.existingSolarKWp}
                  onChange={(e) => patch({ existingSolarKWp: Number(e.target.value) })}
                  className="w-full accent-indigo"
                  aria-label="Installerad effekt på befintliga solceller i kWp"
                />
                <div className="mt-1 text-[12px] text-ink/45">Står på växelriktaren eller i appen – ofta 5–12 kWp på en villa.</div>
              </div>
            )}
          </Field>

          <Field label="Vad vill du ha?">
            <div className="grid grid-cols-3 gap-2">
              <Chip active={input.enabled.sol} onClick={() => toggle("sol")}>
                <Sun size={14} /> Sol
              </Chip>
              <Chip active={input.enabled.batteri} onClick={() => toggle("batteri")}>
                <BatteryCharging size={14} /> Batteri
              </Chip>
              <Chip active={input.enabled.laddbox} onClick={() => toggle("laddbox")}>
                <Zap size={14} /> Laddbox
              </Chip>
            </div>
          </Field>
        </div>

        {input.enabled.sol && (
          <div className="rounded-3xl border border-ink/10 bg-bone p-6 space-y-5">
            <Field label="Taktyp">
              <div className="grid grid-cols-2 gap-2">
                {ROOF_TYPES.map((r) => (
                  <Chip
                    key={r.key}
                    active={input.roofType === r.key}
                    onClick={() =>
                      // Taken rymmer olika många paneler – kapa antalet så att
                      // alla valda paneler syns på det nya taket.
                      patch({ roofType: r.key, panelCount: Math.min(input.panelCount, maxPanelsFor(r.key)) })
                    }
                  >
                    {r.label}
                  </Chip>
                ))}
              </div>
            </Field>
            <Field label={`Antal paneler: ${input.panelCount} av max ${maxPanelsFor(input.roofType)} på taket`}>
              <input
                type="range"
                min={4}
                max={maxPanelsFor(input.roofType)}
                value={input.panelCount}
                onChange={(e) => patch({ panelCount: Number(e.target.value) })}
                className="w-full accent-indigo"
              />
            </Field>
            <Field label="Panelmärke">
              <div className="grid grid-cols-2 gap-2">
                {PANELS.map((p) => (
                  <Chip key={p.id} active={input.panelId === p.id} onClick={() => patch({ panelId: p.id })}>
                    {p.brand}
                  </Chip>
                ))}
              </div>
            </Field>
          </div>
        )}

        {input.enabled.batteri && (
          <div className="rounded-3xl border border-ink/10 bg-bone p-6 space-y-5">
            <Field label="Batterimärke">
              <div className="grid grid-cols-2 gap-2">
                {BATTERIES.map((b) => (
                  <Chip
                    key={b.id}
                    active={input.batteryId === b.id}
                    onClick={() => patch({ batteryId: b.id, batteryCapacityKWh: b.capacities[1] ?? b.capacities[0] })}
                  >
                    {BATTERY_LABEL[b.id] ?? b.id}
                  </Chip>
                ))}
              </div>
            </Field>
            <Field label="Lagring">
              <div className="grid grid-cols-4 gap-2">
                {battery.capacities.slice(0, 8).map((c) => (
                  <Chip
                    key={c}
                    active={Math.abs(input.batteryCapacityKWh - c) < 0.01}
                    onClick={() => patch({ batteryCapacityKWh: c })}
                  >
                    {kWhLabel(c)} kWh
                  </Chip>
                ))}
              </div>
            </Field>
          </div>
        )}

        <div className="rounded-3xl border border-ink/10 bg-bone p-6 space-y-5">
          <Field label={`Elförbrukning per år: ${formatNumber(input.annualConsumptionKWh)} kWh`}>
            <input
              type="range"
              min={7500}
              max={30000}
              step={500}
              value={input.annualConsumptionKWh}
              onChange={(e) => patch({ annualConsumptionKWh: Number(e.target.value) })}
              className="w-full accent-indigo"
              aria-label="Husets elförbrukning per år i kWh"
            />
            <div className="mt-1 text-[12px] text-ink/45">Står på elnätsfakturan. En villa med värmepump ligger ofta runt 15 000 kWh.</div>
          </Field>
          <Field label="Elområde">
            <div className="grid grid-cols-4 gap-2">
              {ELZONER.map((z) => (
                <Chip key={z.key} active={input.elzon === z.key} onClick={() => patch({ elzon: z.key })}>
                  {z.label}
                </Chip>
              ))}
            </div>
          </Field>
        </div>
      </aside>
    </div>
  );
}
