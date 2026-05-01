"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  PANELS,
  INVERTERS,
  BATTERIES,
  HEAT_PUMPS,
  HEAT_PUMP_BRANDS,
  CHARGERS,
  TURBINES,
  EMS_OPTIONS,
  MAX_PANELS_PER_HOUSE,
} from "@/lib/catalog";
import { computeCalc, formatKr, formatNumber, type CalcInput } from "@/lib/calc";
import { CalcScene } from "@/components/3d/CalcScene";
import { ArrowRight, Check } from "lucide-react";

type Enabled = CalcInput["enabled"];

const PIECES: {
  key: keyof Enabled;
  label: string;
  hint: string;
  badge: string;
}[] = [
  { key: "sol", label: "Solpaneler", hint: "Tysta paneler på taket", badge: "Producerar" },
  { key: "batteri", label: "Batteri", hint: "Bra kombination med solpaneler", badge: "Lagrar" },
  { key: "värmepump", label: "Värmepump", hint: "Värme för halva elräkningen", badge: "Värmer" },
  { key: "laddbox", label: "Laddbox", hint: "Smart laddning av elbilen", badge: "Laddar" },
  { key: "vindkraft", label: "Vindkraft", hint: "Komplement på blåsiga lägen", badge: "Producerar" },
];

const initial: CalcInput = {
  enabled: {
    sol: false,
    batteri: false,
    värmepump: false,
    laddbox: false,
    vindkraft: false,
  },
  panelId: PANELS[0].id,
  panelCount: 14,
  inverterId: INVERTERS[1].id,
  batteryId: BATTERIES[0].id,
  batteryCapacityKWh: BATTERIES[0].capacities[0],
  heatPumpId: HEAT_PUMPS[0].id,
  chargerId: CHARGERS[0].id,
  turbineId: null,
  emsId: EMS_OPTIONS[0].id,
  houseAreaM2: 145,
  evKmPerYear: 18000,
  baseConsumptionKWh: 4500,
};

export function CalcStudio() {
  const [input, setInput] = useState<CalcInput>(initial);
  const result = useMemo(() => computeCalc(input), [input]);

  const update = <K extends keyof CalcInput>(key: K, v: CalcInput[K]) =>
    setInput((s) => ({ ...s, [key]: v }));

  const toggleEnabled = (key: keyof Enabled) =>
    setInput((s) => ({
      ...s,
      enabled: { ...s.enabled, [key]: !s.enabled[key] },
    }));

  const anyEnabled = Object.values(input.enabled).some(Boolean);

  const queryString = new URLSearchParams({
    panel: input.enabled.sol ? input.panelId : "",
    n: input.enabled.sol ? String(input.panelCount) : "",
    inv: input.enabled.sol || input.enabled.batteri ? input.inverterId : "",
    bat: input.enabled.batteri && input.batteryId ? input.batteryId : "",
    batkwh: input.enabled.batteri ? String(input.batteryCapacityKWh) : "",
    pump: input.enabled.värmepump && input.heatPumpId ? input.heatPumpId : "",
    chrg: input.enabled.laddbox && input.chargerId ? input.chargerId : "",
    wind: input.enabled.vindkraft && input.turbineId ? input.turbineId : "",
    ems: input.emsId ?? "",
  }).toString();

  const heatPumpsForBrand = (brand: string) =>
    HEAT_PUMPS.filter((h) => h.brand === brand);
  const currentPump = HEAT_PUMPS.find((h) => h.id === input.heatPumpId);
  const currentBrand = currentPump?.brand ?? HEAT_PUMP_BRANDS[0];
  const currentBattery =
    input.batteryId && BATTERIES.find((b) => b.id === input.batteryId);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
      <div className="xl:col-span-5 space-y-6">
        <Card>
          <Eyebrow>Steg 1 · välj vad ni är nyfikna på</Eyebrow>
          <p className="mt-3 text-[14px] text-ink/65 leading-relaxed">
            Ni kan kombinera fritt – siffrorna och 3D-modellen uppdateras
            efterhand som ni klickar i.
          </p>
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {PIECES.map((p) => {
              const on = input.enabled[p.key];
              return (
                <button
                  key={p.key}
                  type="button"
                  onClick={() => toggleEnabled(p.key)}
                  className={[
                    "flex items-start gap-3 rounded-2xl border px-4 py-3 text-left transition",
                    on
                      ? "bg-ink text-bone border-ink"
                      : "bg-cream/40 border-ink/12 hover:border-ink/40",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "mt-0.5 grid h-5 w-5 place-items-center rounded-md border transition",
                      on ? "bg-amber border-amber text-ink" : "border-ink/30 text-transparent",
                    ].join(" ")}
                  >
                    <Check size={12} strokeWidth={3} />
                  </span>
                  <span>
                    <span className="font-display text-lg tracking-display-tight block">
                      {p.label}
                    </span>
                    <span
                      className={[
                        "block text-[12.5px]",
                        on ? "text-bone/65" : "text-ink/55",
                      ].join(" ")}
                    >
                      {p.hint}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </Card>

        {input.enabled.sol && (
          <Card>
            <Eyebrow>Solpaneler</Eyebrow>
            <Select
              label="Märke & modell"
              value={input.panelId}
              onChange={(v) => update("panelId", v)}
              options={PANELS.map((p) => ({
                value: p.id,
                label: `${p.brand} · ${p.watt} W`,
              }))}
            />
            <Slider
              label="Antal paneler"
              min={4}
              max={MAX_PANELS_PER_HOUSE}
              step={1}
              value={Math.min(input.panelCount, MAX_PANELS_PER_HOUSE)}
              onChange={(v) => update("panelCount", v)}
              suffix={`= ${formatNumber(((PANELS.find((p) => p.id === input.panelId)?.watt ?? 0) * input.panelCount) / 1000, 1)} kWp`}
            />
            <p className="text-[12px] text-ink/50">
              Max {MAX_PANELS_PER_HOUSE} paneler för en normalvilla med
              söderläge. Större anläggningar dimensionerar vi efter
              hembesök.
            </p>
          </Card>
        )}

        {(input.enabled.sol || input.enabled.batteri) && (
          <Card>
            <Eyebrow>Växelriktare</Eyebrow>
            <Select
              label="Märke"
              value={input.inverterId}
              onChange={(v) => update("inverterId", v)}
              options={INVERTERS.map((i) => ({
                value: i.id,
                label: `${i.brand} · ${i.efficiency}% verkningsgrad`,
              }))}
            />
          </Card>
        )}

        {input.enabled.batteri && currentBattery && (
          <Card>
            <Eyebrow>Batteri</Eyebrow>
            <PillGroup
              label="Märke"
              options={BATTERIES.map((b) => ({
                value: b.id,
                label: b.brand,
              }))}
              value={input.batteryId ?? BATTERIES[0].id}
              onChange={(v) => {
                const next = BATTERIES.find((b) => b.id === v);
                if (!next) return;
                setInput((s) => ({
                  ...s,
                  batteryId: next.id,
                  batteryCapacityKWh: next.capacities[0],
                }));
              }}
            />
            <CapacitySlider
              capacities={currentBattery.capacities}
              value={input.batteryCapacityKWh}
              onChange={(v) => update("batteryCapacityKWh", v)}
            />
          </Card>
        )}

        {input.enabled.värmepump && (
          <Card>
            <Eyebrow>Värmepump</Eyebrow>
            <PillGroup
              label="Märke"
              options={HEAT_PUMP_BRANDS.map((b) => ({ value: b, label: b }))}
              value={currentBrand}
              onChange={(brand) => {
                const first = heatPumpsForBrand(brand)[0];
                if (first) update("heatPumpId", first.id);
              }}
            />
            <Select
              label="Modell"
              value={input.heatPumpId ?? HEAT_PUMPS[0].id}
              onChange={(v) => update("heatPumpId", v)}
              options={heatPumpsForBrand(currentBrand).map((h) => ({
                value: h.id,
                label: `${h.model} · ${h.type} · SCOP ${h.scop}`,
              }))}
            />
            <Slider
              label="Bostadsyta"
              min={60}
              max={400}
              step={5}
              value={input.houseAreaM2}
              onChange={(v) => update("houseAreaM2", v)}
              suffix="m²"
            />
          </Card>
        )}

        {input.enabled.laddbox && (
          <Card>
            <Eyebrow>Laddbox</Eyebrow>
            <Select
              label="Märke"
              value={input.chargerId ?? CHARGERS[0].id}
              onChange={(v) => update("chargerId", v)}
              options={CHARGERS.map((c) => ({
                value: c.id,
                label: `${c.brand} · ${c.maxKW} kW`,
              }))}
            />
            <Slider
              label="Körsträcka"
              min={5000}
              max={45000}
              step={500}
              value={input.evKmPerYear}
              onChange={(v) => update("evKmPerYear", v)}
              suffix="km/år"
            />
          </Card>
        )}

        {input.enabled.vindkraft && (
          <Card>
            <Eyebrow>Vindkraft</Eyebrow>
            <Select
              label="Märke"
              value={input.turbineId ?? TURBINES[0].id}
              onChange={(v) => update("turbineId", v)}
              options={TURBINES.map((t) => ({
                value: t.id,
                label: `${t.brand} · ${t.ratedKW} kW`,
              }))}
            />
          </Card>
        )}

        {anyEnabled && (
          <>
            <Card>
              <Eyebrow>Energihantering (EMS)</Eyebrow>
              <p className="text-[13px] text-ink/60 leading-relaxed">
                En EMS är hjärnan som styr när batteriet laddar, när
                värmepumpen jobbar och när du säljer mot spotpris.
              </p>
              <Toggle
                on={!!input.emsId}
                onToggle={(b) =>
                  update("emsId", b ? EMS_OPTIONS[0].id : null)
                }
                label="Inkludera energihanteringssystem"
              />
              {input.emsId && (
                <>
                  <PillGroup
                    label="Plattform"
                    options={EMS_OPTIONS.map((e) => ({
                      value: e.id,
                      label: e.brand,
                    }))}
                    value={input.emsId}
                    onChange={(v) => update("emsId", v)}
                  />
                  {(() => {
                    const ems = EMS_OPTIONS.find((e) => e.id === input.emsId)!;
                    return (
                      <div className="rounded-2xl border border-ink/10 bg-cream/50 p-4">
                        <div className="text-[14px] text-ink/75 leading-relaxed">
                          {ems.blurb}
                        </div>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {ems.features.map((f) => (
                            <span
                              key={f}
                              className="rounded-full border border-ink/12 px-2.5 py-1 text-[11.5px] text-ink/65"
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                        <div className="mt-3 flex items-center gap-3 font-mono text-[11px] text-ink/55 flex-wrap">
                          <span>+{Math.round(ems.spotOptimization * 100)}% besparing</span>
                          <span>·</span>
                          <span>{formatKr(ems.priceKr)} engångs</span>
                          {ems.monthlyKr > 0 && (
                            <>
                              <span>·</span>
                              <span>{formatKr(ems.monthlyKr)}/mån</span>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })()}
                </>
              )}
            </Card>

            <Card>
              <Eyebrow>Hushåll</Eyebrow>
              <Slider
                label="Övrig elförbrukning"
                min={1500}
                max={12000}
                step={100}
                value={input.baseConsumptionKWh}
                onChange={(v) => update("baseConsumptionKWh", v)}
                suffix="kWh/år"
              />
            </Card>
          </>
        )}
      </div>

      <div className="xl:col-span-7 space-y-6 xl:sticky xl:top-24 self-start">
        <div className="rounded-[28px] border border-ink/10 overflow-hidden bg-cream blueprint-bg">
          <div className="aspect-[16/11] relative">
            <CalcScene input={input} />
            <div className="absolute top-4 left-4 rounded-full bg-bone/85 backdrop-blur px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/65 border border-ink/10">
              Live · 1:1-modell av huset
            </div>
            {anyEnabled && (
              <div className="absolute top-4 right-4 rounded-full bg-ink text-bone backdrop-blur px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] border border-ink">
                {input.enabled.sol
                  ? `${formatNumber(result.systemKWp, 1)} kWp`
                  : input.enabled.batteri
                  ? `${formatNumber(result.batteryKWh, 1)} kWh`
                  : input.enabled.värmepump
                  ? "Värmepump"
                  : input.enabled.laddbox
                  ? "Laddbox"
                  : "Vindkraft"}
              </div>
            )}
          </div>
        </div>

        {!anyEnabled ? (
          <div className="rounded-[28px] border border-ink/10 bg-bone p-10 text-center">
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55">
              Inget valt än
            </div>
            <h3 className="mt-3 font-display text-3xl tracking-display-tight leading-snug max-w-md mx-auto">
              Klicka i en eller flera tjänster i listan så börjar siffrorna
              räkna sig själva.
            </h3>
            <p className="mt-4 text-ink/60 max-w-md mx-auto leading-relaxed text-[14.5px]">
              Du kan kombinera sol, batteri, värmepump, laddbox och vindkraft
              i valfri ordning. 3D-modellen ovan visar ditt hus i 1:1.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4">
              <Tile
                label="Total investering"
                value={formatKr(result.totalCostKr)}
                sub={`varav ${formatKr(result.installCostKr)} installation`}
              />
              <Tile
                label="Efter grönt avdrag"
                value={formatKr(result.netCostKr)}
                sub={`grönt avdrag ${formatKr(result.greenDeductionKr)}`}
              />
              <Tile
                label="Årlig besparing"
                value={formatKr(result.yearlySavingKr)}
                sub={
                  result.yearlySupportRevenueKr > 0
                    ? `+ stödtjänster ${formatKr(result.yearlySupportRevenueKr)}/år`
                    : undefined
                }
                accent
              />
              <Tile
                label="Återbetalningstid"
                value={
                  result.paybackYears > 0
                    ? `${formatNumber(result.paybackYears, 1)} år`
                    : "—"
                }
                sub={`20-årsvinst ${formatKr(result.yearly20YearKr)}`}
              />
              {input.enabled.sol && (
                <Tile
                  label="Solproduktion"
                  value={`${formatNumber(result.yearlyProductionKWh, 0)} kWh/år`}
                  sub={`självförbrukning ${formatNumber(result.selfConsumptionShare * 100, 0)}%`}
                />
              )}
              <Tile
                label="CO₂ undvikt"
                value={`${formatNumber(result.co2KgPerYear, 0)} kg/år`}
                sub={`= ${formatNumber(result.co2KgPerYear / 120, 0)} mil bilkörning`}
              />
            </div>

            <div className="rounded-[28px] bg-ink text-bone p-8 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone/50">
                  Redo att gå vidare?
                </div>
                <h3 className="mt-3 font-display text-3xl tracking-display-tight max-w-md leading-tight">
                  Vi tar med er konfiguration på hembesöket.
                </h3>
              </div>
              <Link
                href={`/offert?${queryString}`}
                className="inline-flex items-center gap-2 rounded-full bg-amber px-7 py-4 font-medium text-ink hover:bg-amber-deep transition"
              >
                Begär offert <ArrowRight size={16} />
              </Link>
            </div>

            <p className="text-[12.5px] text-ink/55 leading-relaxed max-w-2xl">
              Siffrorna är uppskattningar baserade på normalår,
              mellansvenskt klimat och genomsnittliga spotpriser. Vid
              hembesök bygger vi en exakt 1:1-modell av just ert hus och
              ger er bindande siffror.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-ink/10 bg-bone p-7 space-y-5">
      {children}
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55">
      {children}
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block">
      <span className="block text-[13px] text-ink/65 mb-2">{label}</span>
      <select
        className="w-full rounded-2xl border border-ink/15 bg-cream/60 px-4 py-3 text-[14.5px] outline-none focus:border-ink/40 transition"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function Slider({
  label,
  min,
  max,
  step,
  value,
  onChange,
  suffix,
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
  suffix?: string;
}) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-[13px] text-ink/65">{label}</span>
        <span className="font-mono text-[12px] text-ink/75">
          {value} {suffix ? <span className="text-ink/45">{suffix}</span> : null}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-ink"
      />
    </label>
  );
}

function CapacitySlider({
  capacities,
  value,
  onChange,
}: {
  capacities: number[];
  value: number;
  onChange: (v: number) => void;
}) {
  // Vi använder index som slider-värde och mappar till de tillåtna kapaciteterna.
  const idx = Math.max(
    0,
    capacities.findIndex((c) => Math.abs(c - value) < 0.05),
  );
  const safeIdx = idx === -1 ? 0 : idx;
  return (
    <div className="block">
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-[13px] text-ink/65">Kapacitet</span>
        <span className="font-mono text-[12px] text-ink/75">
          {capacities[safeIdx].toString().replace(".", ",")}{" "}
          <span className="text-ink/45">kWh</span>
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={capacities.length - 1}
        step={1}
        value={safeIdx}
        onChange={(e) => onChange(capacities[Number(e.target.value)])}
        className="w-full accent-ink"
      />
      <div className="mt-2 flex justify-between text-[10.5px] font-mono text-ink/45">
        <span>{capacities[0]} kWh</span>
        <span>{capacities[capacities.length - 1]} kWh</span>
      </div>
    </div>
  );
}

function PillGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <span className="block text-[13px] text-ink/65 mb-2">{label}</span>
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => {
          const active = o.value === value;
          return (
            <button
              key={o.value}
              type="button"
              onClick={() => onChange(o.value)}
              className={[
                "rounded-full px-3 py-1.5 text-[12.5px] border transition",
                active
                  ? "bg-ink text-bone border-ink"
                  : "bg-bone text-ink/75 border-ink/15 hover:border-ink/40",
              ].join(" ")}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Toggle({
  on,
  onToggle,
  label,
}: {
  on: boolean;
  onToggle: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onToggle(!on)}
      className="flex w-full items-center justify-between gap-4 rounded-2xl border border-ink/10 bg-cream/50 px-4 py-3 text-left hover:border-ink/30 transition"
    >
      <span className="text-[14px]">{label}</span>
      <span
        className={[
          "inline-flex h-6 w-11 rounded-full border transition-colors items-center px-0.5",
          on ? "bg-ink border-ink" : "bg-bone border-ink/20",
        ].join(" ")}
      >
        <span
          className={[
            "h-5 w-5 rounded-full transition-transform",
            on ? "translate-x-5 bg-amber" : "translate-x-0 bg-ink/30",
          ].join(" ")}
        />
      </span>
    </button>
  );
}

function Tile({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={[
        "rounded-3xl border p-6",
        accent ? "bg-amber/15 border-amber/40" : "bg-bone border-ink/10",
      ].join(" ")}
    >
      <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink/55">
        {label}
      </div>
      <div className="mt-3 font-display text-3xl tracking-display-tight leading-tight">
        {value}
      </div>
      {sub && (
        <div className="mt-2 text-[12.5px] text-ink/55 leading-snug">{sub}</div>
      )}
    </div>
  );
}
