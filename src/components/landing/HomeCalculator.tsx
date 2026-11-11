"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { BATTERIES, ELZONER, PANELS } from "@/lib/catalog";
import { formatNumber, type CalcInput } from "@/lib/calc";
import { DEFAULT_CALC_INPUT, calcScenario, kWhLabel } from "@/lib/calc-scenario";

/**
 * Startsidans lilla kalkyl. Samma räknemotor och samma återbetalningsspann
 * som 3D-kalkylatorn på /kalkylator (lib/calc-scenario.ts, lib/payback.ts),
 * bara med färre val. Visar medvetet inga kronor: exakt pris tar vi fram i
 * offerten.
 */
const PANEL = PANELS[0];
const BATTERY = BATTERIES[0];

function Field({ label, value, children }: { label: string; value?: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-ink/10 py-5 first:pt-0 last:border-0 last:pb-0">
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink/55">{label}</span>
        {value && <span className="font-display text-[17px] font-medium tracking-[-0.01em]">{value}</span>}
      </div>
      {children}
    </div>
  );
}

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`rounded-full px-4 py-2.5 text-[14.5px] font-medium transition duration-200 ${
        on ? "bg-ink text-bone" : "bg-white text-ink ring-1 ring-inset ring-ink/15 hover:ring-ink/40"
      }`}
    >
      {children}
    </button>
  );
}

function Range({
  min,
  max,
  step,
  value,
  onChange,
  label,
}: {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
  label: string;
}) {
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <input
      type="range"
      className="lp-range"
      aria-label={label}
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      style={{ "--fill": `${fill}%` } as React.CSSProperties}
    />
  );
}

export default function HomeCalculator() {
  const [input, setInput] = useState<CalcInput>(DEFAULT_CALC_INPUT);
  const patch = (p: Partial<CalcInput>) => setInput((cur) => ({ ...cur, ...p }));
  const setEnabled = (p: Partial<CalcInput["enabled"]>) =>
    setInput((cur) => ({ ...cur, enabled: { ...cur.enabled, ...p } }));

  const s = calcScenario(input);
  const batteryIndex = Math.max(0, BATTERY.capacities.indexOf(input.batteryCapacityKWh));
  const kWp = (input.panelCount * PANEL.watt) / 1000;

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {/* Val */}
      <div className="rounded-[30px] bg-[#FFFDF8] p-6 ring-1 ring-ink/[0.06] md:p-8">
        <Field label="Har du redan solceller?">
          <div className="flex flex-wrap gap-2">
            <Chip
              on={input.hasExistingSolar}
              onClick={() =>
                setInput((cur) => ({
                  ...cur,
                  hasExistingSolar: true,
                  enabled: { ...cur.enabled, sol: false, batteri: true },
                }))
              }
            >
              Ja, jag har solceller
            </Chip>
            <Chip
              on={!input.hasExistingSolar}
              onClick={() =>
                setInput((cur) => ({
                  ...cur,
                  hasExistingSolar: false,
                  enabled: { ...cur.enabled, sol: true },
                }))
              }
            >
              Nej, inte än
            </Chip>
          </div>
        </Field>

        {!input.hasExistingSolar && (
          <Field label="Vad vill du installera?">
            <div className="flex flex-wrap gap-2">
              <Chip on={input.enabled.sol} onClick={() => setEnabled({ sol: !input.enabled.sol })}>
                Solceller
              </Chip>
              <Chip on={input.enabled.batteri} onClick={() => setEnabled({ batteri: !input.enabled.batteri })}>
                Batteri
              </Chip>
            </div>
          </Field>
        )}

        {input.hasExistingSolar ? (
          <Field label="Dina solceller" value={`${String(input.existingSolarKWp).replace(".", ",")} kW`}>
            <Range
              label="Befintliga solceller i kilowatt"
              min={3}
              max={20}
              step={0.5}
              value={input.existingSolarKWp}
              onChange={(v) => patch({ existingSolarKWp: v })}
            />
          </Field>
        ) : (
          input.enabled.sol && (
            <Field
              label="Solpaneler"
              value={`${input.panelCount} st · ${String(Math.round(kWp * 10) / 10).replace(".", ",")} kW`}
            >
              <Range
                label="Antal solpaneler"
                min={6}
                max={30}
                step={1}
                value={input.panelCount}
                onChange={(v) => patch({ panelCount: v })}
              />
            </Field>
          )
        )}

        {input.enabled.batteri && (
          <Field label="Batteri" value={`${kWhLabel(input.batteryCapacityKWh)} kWh`}>
            <Range
              label="Batteriets storlek"
              min={0}
              max={BATTERY.capacities.length - 1}
              step={1}
              value={batteryIndex}
              onChange={(v) => patch({ batteryCapacityKWh: BATTERY.capacities[v] })}
            />
          </Field>
        )}

        <Field label="Elförbrukning per år" value={`${formatNumber(input.annualConsumptionKWh)} kWh`}>
          <Range
            label="Elförbrukning per år i kilowattimmar"
            min={5000}
            max={35000}
            step={500}
            value={input.annualConsumptionKWh}
            onChange={(v) => patch({ annualConsumptionKWh: v })}
          />
        </Field>

        <Field label="Elområde">
          <div className="flex flex-wrap gap-2">
            {ELZONER.map((z) => (
              <Chip key={z.key} on={input.elzon === z.key} onClick={() => patch({ elzon: z.key })}>
                {z.label}
              </Chip>
            ))}
          </div>
        </Field>
      </div>

      {/* Resultat */}
      <div className="flex flex-col rounded-[30px] bg-night p-6 text-white md:p-8">
        <div className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-white/50">Din kalkyl</div>

        {s.tag && (
          <div key={s.tag} className="lp-pop mt-5 inline-flex self-start rounded-full bg-white/10 px-3.5 py-1.5 text-[13px] font-medium text-white/90 ring-1 ring-inset ring-white/15">
            {s.tag}
          </div>
        )}

        <div className="mt-7 text-[14px] text-white/60">Uppskattad återbetalning</div>
        <div
          key={s.range}
          className="lp-pop mt-1 font-display text-[clamp(2.6rem,6vw,4.4rem)] font-medium leading-none tracking-[-0.04em] text-sun"
          aria-live="polite"
        >
          {s.range}
        </div>

        <p className="mt-6 text-[15.5px] leading-relaxed text-white/75">{s.lead}</p>
        {s.note && (
          <p className="mt-4 rounded-2xl bg-white/[0.06] px-4 py-3.5 text-[13.5px] leading-relaxed text-white/60 ring-1 ring-inset ring-white/10">
            {s.note}.
          </p>
        )}

        <div className="mt-auto flex flex-col gap-3 pt-8">
          <Link href="/offert" className="lp-btn-sun w-full">
            Få ett fast pris för ditt hus <ArrowRight size={17} aria-hidden="true" />
          </Link>
          <Link
            href="/kalkylator"
            className="text-center text-[14.5px] text-white/70 underline decoration-white/25 underline-offset-4 transition hover:text-white hover:decoration-white/60"
          >
            Räkna vidare i 3D-kalkylatorn
          </Link>
        </div>
      </div>
    </div>
  );
}
