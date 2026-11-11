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
        <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink/70">{label}</span>
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
      className={`min-h-[44px] rounded-full px-4 py-2.5 text-[14.5px] font-medium transition duration-200 ${
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
  valueText,
}: {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
  label: string;
  /** Värdet i klartext för skärmläsare, till exempel "23 kWh". */
  valueText: string;
}) {
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <input
      type="range"
      className="lp-range"
      aria-label={label}
      aria-valuetext={valueText}
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      style={{ "--fill": `${fill}%` } as React.CSSProperties}
    />
  );
}

/**
 * Spannet som står i siffror ovanför, ritat på en skala. För batteri är
 * skalan vårt spann för det valda fallet (till exempel 4–7 år), så att det
 * syns var i spannet valet hamnar. För bara solceller går skalan från noll.
 * Rent dekorativ: den tillför ingen ny uppgift och läses inte upp.
 */
function YearScale({
  min,
  max,
  band,
}: {
  min: number;
  max: number;
  band: { lo: number; hi: number } | null;
}) {
  const from = band ? band.lo : 0;
  const to = band ? band.hi : max <= 10 ? 10 : max <= 15 ? 15 : max <= 20 ? 20 : 25;
  const pos = (x: number) => Math.max(0, Math.min(100, ((x - from) / (to - from)) * 100));
  // Ett enda halvår ska fortfarande synas som en markering.
  const hi = Math.max(max, min + 0.5);
  const ticks = band ? [from, to] : Array.from({ length: to / 5 + 1 }, (_, i) => i * 5);
  return (
    <div className="mt-6" aria-hidden="true">
      <div className="relative h-2 rounded-full bg-white/10">
        <span
          className="absolute inset-y-0 rounded-full bg-sun transition-[left,right] duration-500 ease-out"
          style={{ left: `${pos(min)}%`, right: `${100 - pos(hi)}%` }}
        />
      </div>
      <div className="relative mt-2 h-4 font-mono text-[10.5px] tracking-[0.12em] text-white/50">
        {ticks.map((t) => (
          <span
            key={t}
            className={`absolute top-0 whitespace-nowrap ${
              t === from ? "" : t === to ? "-translate-x-full" : "-translate-x-1/2"
            }`}
            style={{ left: `${pos(t)}%` }}
          >
            {band || t === to ? `${t} år` : t}
          </span>
        ))}
      </div>
    </div>
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

  // Valen följer med till bokningssidan, som visar dem under "Din
  // konfiguration från kalkylatorn" och skickar dem vidare till rådgivaren.
  const query = new URLSearchParams();
  if (input.enabled.sol && !input.hasExistingSolar) {
    query.set("tjanst", "solpaneler");
    query.set("panel", PANEL.brand);
    query.set("n", String(input.panelCount));
  } else if (input.enabled.batteri) {
    query.set("tjanst", "batterier");
  }
  if (input.enabled.batteri) {
    query.set("bat", BATTERY.brand);
    query.set("batkwh", kWhLabel(input.batteryCapacityKWh));
  }
  const queryString = query.toString();
  const offertHref = queryString ? `/offert?${queryString}` : "/offert";

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <div className="flex flex-col gap-3">
      {/* Mobil och surfplatta: resultatet följer med överst medan man
          ändrar valen, eftersom resultatkortet ligger under valen där.
          Samma värde står i kortet nedanför, så remsan läses inte upp. */}
      <div
        aria-hidden="true"
        className="sticky top-[88px] z-10 flex items-center justify-between gap-3 rounded-[14px] bg-night px-4 py-3 text-white shadow-[0_14px_30px_-18px_rgba(20,22,42,0.8)] lg:hidden"
      >
        <span className="text-[12.5px] leading-tight text-white/70">Uppskattad återbetalning</span>
        <span
          key={s.range}
          className="lp-pop whitespace-nowrap font-display text-[20px] font-medium tracking-[-0.02em] text-sun"
        >
          {s.range}
        </span>
      </div>
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
              valueText={`${String(input.existingSolarKWp).replace(".", ",")} kilowatt`}
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
                valueText={`${input.panelCount} paneler`}
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
              valueText={`${kWhLabel(input.batteryCapacityKWh)} kilowattimmar`}
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
            valueText={`${formatNumber(input.annualConsumptionKWh)} kilowattimmar per år`}
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
        {/* Live-regionen ligger kvar i sidan; bara innehållet byts, annars
            läses det nya värdet inte upp. */}
        <div className="mt-1 font-display text-[clamp(2.6rem,6vw,4.4rem)] font-medium leading-none tracking-[-0.04em] text-sun" aria-live="polite" aria-atomic="true">
          <span key={s.range} className="lp-pop inline-block">
            {s.range}
          </span>
        </div>

        {s.span && <YearScale min={s.span.min} max={s.span.max} band={s.band} />}

        <p className="mt-6 text-[15.5px] leading-relaxed text-white/75">{s.lead}</p>
        {s.note && (
          <p className="mt-4 rounded-[14px] bg-white/[0.06] px-4 py-3.5 text-[13.5px] leading-relaxed text-white/60 ring-1 ring-inset ring-white/10">
            {s.note}.
          </p>
        )}

        <div className="mt-auto flex flex-col gap-3 pt-8">
          <Link href={offertHref} className="lp-btn-sun w-full">
            Få ett fast pris för ditt hus <ArrowRight size={17} aria-hidden="true" />
          </Link>
          <Link
            href="/kalkylator"
            className="py-2 text-center text-[14.5px] text-white/70 underline decoration-white/25 underline-offset-4 transition hover:text-white hover:decoration-white/60"
          >
            Räkna vidare i 3D-kalkylatorn
          </Link>
        </div>
      </div>
    </div>
  );
}
