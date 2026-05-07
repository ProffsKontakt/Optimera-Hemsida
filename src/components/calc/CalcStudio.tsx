"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  PANELS,
  BATTERIES,
  HEAT_PUMPS,
  HEAT_PUMP_BRANDS,
  CHARGERS,
  TURBINES,
  EMS_OPTIONS,
  MAX_PANELS_PER_HOUSE,
} from "@/lib/catalog";
import {
  computeCalc,
  formatKr,
  formatNumber,
  type CalcInput,
  type CalcResult,
} from "@/lib/calc";
import { CalcScene } from "@/components/3d/CalcScene";
import { ArrowRight, Check, ChevronDown } from "lucide-react";

type Enabled = CalcInput["enabled"];
type PieceKey = keyof Enabled;

type Piece = {
  key: PieceKey;
  label: string;
  hint: string;
  fromPriceKr: number;
};

// Ungefärliga ingångspriser per delsystem efter grönt avdrag (rundat).
const PIECES: Piece[] = [
  { key: "sol", label: "Solpaneler", hint: "Producerar el från taket", fromPriceKr: 65000 },
  { key: "batteri", label: "Batteri", hint: "Lagrar solen till kvällen", fromPriceKr: 70000 },
  { key: "värmepump", label: "Värmepump", hint: "Halverar elräkningen för uppvärmning", fromPriceKr: 95000 },
  { key: "laddbox", label: "Laddbox", hint: "Hemmaladdning av elbilen", fromPriceKr: 18000 },
  { key: "vindkraft", label: "Vindkraft", hint: "Komplement när solen vilar", fromPriceKr: 295000 },
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

  const toggleEnabled = (key: PieceKey) =>
    setInput((s) => ({
      ...s,
      enabled: { ...s.enabled, [key]: !s.enabled[key] },
    }));

  const anyEnabled = Object.values(input.enabled).some(Boolean);

  const inverterLabel =
    result.inverter.kind === "external"
      ? `${result.inverter.brand} ${result.inverter.kw} kW`
      : result.inverter.label;

  const queryString = new URLSearchParams({
    panel: input.enabled.sol ? input.panelId : "",
    n: input.enabled.sol ? String(input.panelCount) : "",
    inv: input.enabled.sol || input.enabled.batteri ? inverterLabel : "",
    bat: input.enabled.batteri && input.batteryId ? input.batteryId : "",
    batkwh: input.enabled.batteri ? String(input.batteryCapacityKWh) : "",
    pump: input.enabled.värmepump && input.heatPumpId ? input.heatPumpId : "",
    chrg: input.enabled.laddbox && input.chargerId ? input.chargerId : "",
    wind: input.enabled.vindkraft && input.turbineId ? input.turbineId : "",
    ems: input.emsId ?? "",
  }).toString();

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
      {/* VÄNSTER: stor 3D-scen + resultat-tiles. Sticky på desktop. */}
      <div className="xl:col-span-7 xl:sticky xl:top-24 self-start space-y-6">
        <div className="rounded-[28px] border border-ink/10 overflow-hidden bg-cream blueprint-bg">
          <div className="aspect-[4/3] relative">
            <CalcScene input={input} />
            <div className="absolute top-4 left-4 rounded-full bg-bone/85 backdrop-blur px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/65 border border-ink/10">
              Live · 1:1-modell av huset
            </div>
            {anyEnabled && input.enabled.sol && (
              <div className="absolute top-4 right-4 rounded-full bg-ink text-bone px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] border border-ink">
                {formatNumber(result.systemKWp, 1)} kWp
              </div>
            )}
          </div>
        </div>

        {!anyEnabled ? (
          <div className="rounded-[28px] border border-ink/10 bg-bone p-8 md:p-10 text-center">
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55">
              Inget valt än
            </div>
            <h3 className="mt-3 font-display text-2xl md:text-3xl tracking-display-tight leading-snug max-w-md mx-auto">
              Välj en eller flera tjänster i listan så börjar siffrorna räkna
              sig själva.
            </h3>
          </div>
        ) : (
          <ResultPanel result={result} hasSol={input.enabled.sol} />
        )}
      </div>

      {/* HÖGER: Tesla-stilade konfigurationsrader. */}
      <aside className="xl:col-span-5 space-y-3">
        <div className="px-1 mb-1">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55">
            Konfigurera systemet
          </div>
          <p className="mt-2 text-[14px] text-ink/65 leading-relaxed">
            Klicka in det ni är nyfikna på. Modellen och siffrorna uppdateras
            direkt. Ni kan fritt kombinera.
          </p>
        </div>

        {PIECES.map((p) => (
          <PieceTile
            key={p.key}
            piece={p}
            input={input}
            result={result}
            isOn={input.enabled[p.key]}
            onToggle={() => toggleEnabled(p.key)}
            update={update}
            setInput={setInput}
          />
        ))}

        {anyEnabled && (
          <EmsTile input={input} update={update} result={result} />
        )}

        {anyEnabled && (
          <Link
            href={`/offert?${queryString}`}
            className="mt-2 inline-flex w-full items-center justify-between gap-2 rounded-2xl bg-ink px-6 py-5 font-medium text-bone hover:bg-graphite transition"
          >
            <span>
              <span className="block font-mono text-[10.5px] uppercase tracking-[0.2em] text-bone/55">
                Total efter grönt avdrag
              </span>
              <span className="block font-display text-2xl tracking-display-tight">
                {formatKr(result.netCostKr)}
              </span>
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-sun px-4 py-2 text-ink text-sm">
              Begär offert <ArrowRight size={14} />
            </span>
          </Link>
        )}
      </aside>
    </div>
  );
}

// =================== TESLA-STILAD KONFIGURATIONSRAD ===================

function PieceTile({
  piece,
  input,
  result,
  isOn,
  onToggle,
  update,
  setInput,
}: {
  piece: Piece;
  input: CalcInput;
  result: CalcResult;
  isOn: boolean;
  onToggle: () => void;
  update: <K extends keyof CalcInput>(k: K, v: CalcInput[K]) => void;
  setInput: React.Dispatch<React.SetStateAction<CalcInput>>;
}) {
  // Aktuellt pris för just denna del när den är aktiv (annars "från").
  const livePrice = piecePriceKr(piece.key, input, result);

  return (
    <div
      className={[
        "rounded-2xl border transition-all overflow-hidden",
        isOn
          ? "border-ink bg-bone shadow-sm ring-1 ring-ink/15"
          : "border-ink/12 bg-bone hover:border-ink/30",
      ].join(" ")}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-4 px-5 py-4 text-left"
      >
        <span
          className={[
            "shrink-0 grid h-6 w-6 place-items-center rounded-full border-2 transition",
            isOn
              ? "bg-ink border-ink text-bone"
              : "border-ink/25 bg-bone text-transparent",
          ].join(" ")}
          aria-hidden
        >
          <Check size={13} strokeWidth={3} />
        </span>

        <span className="flex-1 min-w-0">
          <span className="block font-display text-xl tracking-display-tight leading-tight">
            {piece.label}
          </span>
          <span className="block text-[12.5px] text-ink/55 mt-0.5 truncate">
            {piece.hint}
          </span>
        </span>

        <span className="text-right shrink-0">
          <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45">
            {isOn ? "Just nu" : "Från"}
          </span>
          <span className="block font-display text-lg tracking-display-tight">
            {formatKr(isOn ? livePrice : piece.fromPriceKr)}
          </span>
        </span>

        <ChevronDown
          size={18}
          className={[
            "shrink-0 text-ink/40 transition-transform",
            isOn ? "rotate-180 text-ink/70" : "",
          ].join(" ")}
        />
      </button>

      {isOn && (
        <div className="border-t border-ink/10 bg-cream/40 px-5 py-5 space-y-5">
          {piece.key === "sol" && (
            <SolControls input={input} update={update} result={result} />
          )}
          {piece.key === "batteri" && (
            <BatteryControls input={input} update={update} result={result} setInput={setInput} />
          )}
          {piece.key === "värmepump" && (
            <HeatControls input={input} update={update} />
          )}
          {piece.key === "laddbox" && (
            <ChargerControls input={input} update={update} />
          )}
          {piece.key === "vindkraft" && (
            <WindControls input={input} update={update} />
          )}
        </div>
      )}
    </div>
  );
}

// =================== KONTROLLER PER DELSYSTEM ===================

function SolControls({
  input,
  update,
  result,
}: {
  input: CalcInput;
  update: <K extends keyof CalcInput>(k: K, v: CalcInput[K]) => void;
  result: CalcResult;
}) {
  return (
    <>
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
        suffix={`= ${formatNumber(
          ((PANELS.find((p) => p.id === input.panelId)?.watt ?? 0) *
            input.panelCount) /
            1000,
          1,
        )} kWp`}
      />
      {result.inverter.kind === "external" && !input.enabled.batteri && (
        <InverterInfoBox assignment={result.inverter} />
      )}
    </>
  );
}

function BatteryControls({
  input,
  update,
  result,
  setInput,
}: {
  input: CalcInput;
  update: <K extends keyof CalcInput>(k: K, v: CalcInput[K]) => void;
  result: CalcResult;
  setInput: React.Dispatch<React.SetStateAction<CalcInput>>;
}) {
  const currentBattery = BATTERIES.find((b) => b.id === input.batteryId);
  if (!currentBattery) return null;
  return (
    <>
      <PillGroup
        label="Märke"
        options={BATTERIES.map((b) => ({ value: b.id, label: b.brand }))}
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
      <InverterInfoBox assignment={result.inverter} />
    </>
  );
}

function HeatControls({
  input,
  update,
}: {
  input: CalcInput;
  update: <K extends keyof CalcInput>(k: K, v: CalcInput[K]) => void;
}) {
  const heatPumpsForBrand = (brand: string) =>
    HEAT_PUMPS.filter((h) => h.brand === brand);
  const currentPump = HEAT_PUMPS.find((h) => h.id === input.heatPumpId);
  const currentBrand = currentPump?.brand ?? HEAT_PUMP_BRANDS[0];
  return (
    <>
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
    </>
  );
}

function ChargerControls({
  input,
  update,
}: {
  input: CalcInput;
  update: <K extends keyof CalcInput>(k: K, v: CalcInput[K]) => void;
}) {
  return (
    <>
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
    </>
  );
}

function WindControls({
  input,
  update,
}: {
  input: CalcInput;
  update: <K extends keyof CalcInput>(k: K, v: CalcInput[K]) => void;
}) {
  return (
    <Select
      label="Märke"
      value={input.turbineId ?? TURBINES[0].id}
      onChange={(v) => update("turbineId", v)}
      options={TURBINES.map((t) => ({
        value: t.id,
        label: `${t.brand} · ${t.ratedKW} kW`,
      }))}
    />
  );
}

// =================== EMS-tile (alltid sist, valfri) ===================

function EmsTile({
  input,
  update,
  result,
}: {
  input: CalcInput;
  update: <K extends keyof CalcInput>(k: K, v: CalcInput[K]) => void;
  result: CalcResult;
}) {
  const isOn = !!input.emsId;
  const ems = isOn ? EMS_OPTIONS.find((e) => e.id === input.emsId) : null;
  return (
    <div
      className={[
        "rounded-2xl border transition-all overflow-hidden",
        isOn
          ? "border-ink bg-bone shadow-sm ring-1 ring-ink/15"
          : "border-ink/12 bg-bone hover:border-ink/30",
      ].join(" ")}
    >
      <button
        type="button"
        onClick={() =>
          update("emsId", isOn ? null : EMS_OPTIONS[0].id)
        }
        className="flex w-full items-center gap-4 px-5 py-4 text-left"
      >
        <span
          className={[
            "shrink-0 grid h-6 w-6 place-items-center rounded-full border-2 transition",
            isOn
              ? "bg-ink border-ink text-bone"
              : "border-ink/25 bg-bone text-transparent",
          ].join(" ")}
        >
          <Check size={13} strokeWidth={3} />
        </span>
        <span className="flex-1 min-w-0">
          <span className="block font-display text-xl tracking-display-tight leading-tight">
            Energihantering
          </span>
          <span className="block text-[12.5px] text-ink/55 mt-0.5">
            Höjer besparingen med 10–22%
          </span>
        </span>
        <span className="text-right shrink-0">
          <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45">
            Från
          </span>
          <span className="block font-display text-lg tracking-display-tight">
            {formatKr(EMS_OPTIONS[0].priceKr)}
          </span>
        </span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-ink/40 transition-transform ${isOn ? "rotate-180 text-ink/70" : ""}`}
        />
      </button>
      {isOn && ems && (
        <div className="border-t border-ink/10 bg-cream/40 px-5 py-5 space-y-4">
          <PillGroup
            label="Plattform"
            options={EMS_OPTIONS.map((e) => ({
              value: e.id,
              label: e.brand,
            }))}
            value={input.emsId ?? EMS_OPTIONS[0].id}
            onChange={(v) => update("emsId", v)}
          />
          <p className="text-[13.5px] text-ink/70 leading-relaxed">
            {ems.blurb}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {ems.features.map((f) => (
              <span
                key={f}
                className="rounded-full border border-ink/12 px-2.5 py-1 text-[11.5px] text-ink/65"
              >
                {f}
              </span>
            ))}
          </div>
          <div className="font-mono text-[11px] text-ink/55">
            +{Math.round(ems.spotOptimization * 100)}% besparing ·{" "}
            {formatKr(ems.priceKr)} engångs
            {ems.monthlyKr > 0 ? ` · ${formatKr(ems.monthlyKr)}/mån` : ""}
          </div>
        </div>
      )}
    </div>
  );
}

// =================== RESULTAT-PANEL ===================

function ResultPanel({
  result,
  hasSol,
}: {
  result: CalcResult;
  hasSol: boolean;
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
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
      {hasSol && (
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
  );
}

// =================== HJÄLPARE ===================

// Räknar ut ungefärligt pris för enskilt delsystem (utan installation).
// Används för "Just nu"-kolumnen i Tesla-tilen.
function piecePriceKr(
  key: PieceKey,
  input: CalcInput,
  result: CalcResult,
): number {
  switch (key) {
    case "sol": {
      const panel = PANELS.find((p) => p.id === input.panelId);
      const pkr = panel ? panel.pricePerPanelKr * input.panelCount : 0;
      return Math.round(pkr * 1.18 + 25000);
    }
    case "batteri": {
      const inv =
        result.inverter.kind === "external" ? result.inverter.priceKr : 0;
      return Math.round((result.batteryPriceKr + inv) * 1.18 + 12000);
    }
    case "värmepump": {
      const heat = HEAT_PUMPS.find((h) => h.id === input.heatPumpId);
      return Math.round((heat?.priceKr ?? 0) * 1.18 + 35000);
    }
    case "laddbox": {
      const c = CHARGERS.find((x) => x.id === input.chargerId);
      return Math.round((c?.priceKr ?? 0) * 1.18 + 9000);
    }
    case "vindkraft": {
      const t = TURBINES.find((x) => x.id === input.turbineId);
      return Math.round((t?.priceKr ?? 0) * 1.18 + 85000);
    }
  }
}

// =================== UI-PRIMITIVER ===================

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
        className="w-full rounded-2xl border border-ink/15 bg-bone px-4 py-3 text-[14.5px] outline-none focus:border-ink/40 transition"
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

function InverterInfoBox({
  assignment,
}: {
  assignment: CalcResult["inverter"];
}) {
  const isBuiltIn = assignment.kind === "builtIn";
  return (
    <div className="rounded-2xl border border-ink/10 bg-bone px-4 py-3">
      <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink/55">
        Växelriktare · auto
      </div>
      <div className="mt-1 font-display text-base tracking-display-tight">
        {isBuiltIn
          ? assignment.label
          : `${assignment.brand} ${assignment.kw} kW`}
      </div>
    </div>
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
        "rounded-2xl border p-5",
        accent ? "bg-sun/20 border-sun/50" : "bg-bone border-ink/10",
      ].join(" ")}
    >
      <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink/55">
        {label}
      </div>
      <div className="mt-2 font-display text-2xl tracking-display-tight leading-tight">
        {value}
      </div>
      {sub && (
        <div className="mt-1 text-[11.5px] text-ink/55 leading-snug">{sub}</div>
      )}
    </div>
  );
}
