"use client";

import Link from "next/link";
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
import type { CalcInput } from "@/lib/calc";
import { CanvasErrorBoundary } from "@/components/3d/CanvasErrorBoundary";
import { SceneFallback } from "@/components/3d/SceneFallback";

/**
 * DEMO: samma 3D-modell och samma sorts inmatning som riktiga kalkylatorn,
 * MEN utan exakta kronor. Resultatet är ärliga riktnings-spann som lotsar mot
 * ett samtal med en tekniker. Live /kalkylator är orörd.
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
};

const BATTERY_LABEL: Record<string, string> = {
  "easyway-univ7600": "Easyway",
  "saj-hs3": "SAJ HS3",
  "emaldo-store": "Emaldo",
};

// Batteristorlek -> steg (0 = minst, 7 = störst). Trösklarna ligger mellan
// Easyways kapaciteter så VARJE klick på storleken flyttar återbetalningen.
function capTier(cap: number): number {
  if (cap < 13) return 0;
  if (cap < 16) return 1;
  if (cap < 24) return 2;
  if (cap < 32) return 3;
  if (cap < 40) return 4;
  if (cap < 48) return 5;
  if (cap < 56) return 6;
  return 7;
}

// Descenderande stegar: högre index = snabbare återbetalning. Enkla (små)
// installationer ligger högre upp i år; större sänker steg för steg.
const EXISTING_BATTERY_YEARS = [
  "≈ 4–5 år",
  "≈ 3,5–4,5 år",
  "≈ 3–4 år",
  "≈ 3–3,5 år",
  "≈ 2,5–3,5 år",
  "≈ 2,5–3 år",
  "≈ 2–3 år",
  "≈ 2–2,5 år",
];
const SOL_BATTERY_YEARS = [
  "≈ 7–8 år",
  "≈ 6,5–7,5 år",
  "≈ 6–7 år",
  "≈ 5,5–6,5 år",
  "≈ 5–6 år",
  "≈ 4,5–6 år",
  "≈ 4–6 år",
  "≈ 4–5,5 år",
];

function scenario(o: {
  existingSolar: boolean;
  addSolar: boolean;
  addBattery: boolean;
  batteryKWh: number;
  panelCount: number;
}) {
  const { existingSolar, addSolar, addBattery, batteryKWh, panelCount } = o;
  if (existingSolar && addBattery)
    return {
      // Beror bara på batteristorlek (solen finns redan).
      range: EXISTING_BATTERY_YEARS[capTier(batteryKWh)],
      tag: "Bästa affären vi ser",
      lead:
        "Att komplettera befintliga solceller med batteri är ofta den snabbaste affären – och ett större batteri kortar tiden ytterligare. Med rätt förutsättningar landar den på ett par år.",
    };
  if (addSolar && addBattery) {
    // Batteristorlek + antal paneler knuffar ner återbetalningen steg för steg.
    const panelBump = Math.min(3, Math.max(0, Math.floor((panelCount - 10) / 10)));
    const idx = Math.min(
      SOL_BATTERY_YEARS.length - 1,
      capTier(batteryKWh) + panelBump,
    );
    return {
      range: SOL_BATTERY_YEARS[idx],
      tag: "Komplett lösning",
      lead:
        "En komplett sol- och batterilösning tar längre tid i en enkel installation – men kortas rejält ju fler paneler och ju större batteri du väljer.",
    };
  }
  if (addSolar && !addBattery)
    return {
      tag: "Trygg grund",
      range: "≈ 8–11 år",
      lead:
        "Solceller ensamt är en trygg långsiktig investering – men ett batteri kortar återbetalningen rejält och gör mer av din egen el användbar.",
    };
  if (addBattery && !existingSolar && !addSolar)
    return {
      tag: "Fristående batteri",
      range: "Vi räknar på det",
      lead:
        "Ett batteri utan solceller lönar sig via prisarbitrage och stödtjänster. Grönt avdrag (48,5 %) kräver dock en solanläggning – vi går igenom vad som passar dig.",
    };
  return {
    tag: "",
    range: "Välj ovan",
    lead: "Kryssa i vad du vill ha, så visar vi vad det brukar innebära.",
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

export function DemoCalcStudio() {
  const [input, setInput] = useState<CalcInput>(initial);
  const patch = (p: Partial<CalcInput>) => setInput((cur) => ({ ...cur, ...p }));
  const toggle = (k: keyof CalcInput["enabled"]) =>
    setInput((cur) => ({ ...cur, enabled: { ...cur.enabled, [k]: !cur.enabled[k] } }));

  const battery = BATTERIES.find((b) => b.id === input.batteryId) ?? BATTERIES[0];
  const s = scenario({
    existingSolar: input.hasExistingSolar,
    addSolar: input.enabled.sol,
    addBattery: input.enabled.batteri,
    batteryKWh: input.batteryCapacityKWh,
    panelCount: input.panelCount,
  });

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
                Typisk återbetalning
              </div>
              <div className="mt-1 font-display text-[40px] md:text-[52px] leading-none tracking-display-tight text-indigo whitespace-nowrap">
                {s.range}
              </div>
              {input.enabled.batteri && (
                <div className="mt-1.5 text-[12px] text-ink/45">
                  Större batteri → kortare återbetalning
                </div>
              )}
            </div>
            <p className="mt-4 sm:mt-0 text-ink/75 text-[14.5px] leading-relaxed">
              {s.lead}
            </p>
          </div>

          <ul className="mt-5 space-y-2 text-[13.5px] text-ink/70">
            {input.enabled.batteri && (
              <li className="flex items-start gap-2">
                <Check size={15} className="mt-0.5 text-moss shrink-0" />
                Med batteri använder du 60–80 % av din egen el i stället för ~30 %.
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
            ditt tak, din förbrukning eller ditt elområde fullt ut. Vill du ha
            riktiga siffror och ett pris för just din bostad?
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
                  <Chip key={r.key} active={input.roofType === r.key} onClick={() => patch({ roofType: r.key })}>
                    {r.label}
                  </Chip>
                ))}
              </div>
            </Field>
            <Field label={`Antal paneler: ${input.panelCount}`}>
              <input
                type="range"
                min={4}
                max={MAX_PANELS_PER_HOUSE}
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
              <div className="grid grid-cols-3 gap-2">
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
                    {Math.round(c)} kWh
                  </Chip>
                ))}
              </div>
            </Field>
          </div>
        )}

        <div className="rounded-3xl border border-ink/10 bg-bone p-6">
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
