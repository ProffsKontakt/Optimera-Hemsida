"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  PANELS,
  BATTERIES,
  HEAT_PUMPS,
  HEAT_PUMP_BRANDS,
  CHARGERS,
  EMS_OPTIONS,
  ROOF_TYPES,
  MAX_PANELS_PER_HOUSE,
  ELZONER,
  EMALDO_TERMS_URL,
  EMALDO_GRID_REWARDS_KR_PER_MONTH,
  type Elzon,
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
};

// Värmepump är temporärt dold ur UI tills prismodellen är spikad. Fältet
// finns kvar i CalcInput för typkompatibilitet med presets/calc.
const PIECES: Piece[] = [
  { key: "sol", label: "Solpaneler", hint: "Producerar el från taket" },
  { key: "batteri", label: "Batteri", hint: "Lagrar solen till kvällen" },
  { key: "laddbox", label: "Laddbox", hint: "Hemmaladdning av elbilen" },
];

const initial: CalcInput = {
  enabled: {
    sol: false,
    batteri: false,
    värmepump: false,
    laddbox: false,
  },
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
  batteryCapacityKWh: BATTERIES[0].capacities[0],
  heatPumpId: HEAT_PUMPS[0].id,
  chargerId: CHARGERS[0].id,
  emsId: EMS_OPTIONS[0].id,
  numOwners: 2,
  houseAreaM2: 145,
  evKmPerYear: 18000,
  baseConsumptionKWh: 4500,
};

// Tre rekommenderade förkonfigurationer (Sol + Batteri-spår). Värmepump och
// SAJ HS3 är borttagna ur presets per Optimera-fokus 2026-05.
const PRESETS: { id: string; label: string; hint: string; config: Partial<CalcInput> & {
  enabled: Partial<CalcInput["enabled"]>;
} }[] = [
  {
    id: "starter",
    label: "Komma igång",
    hint: "10 paneler · Easyway 15 kWh · Energy IQ",
    config: {
      enabled: { sol: true, batteri: true, värmepump: false, laddbox: false },
      panelCount: 10,
      batteryId: "easyway-univ7600",
      batteryCapacityKWh: 15.36,
      emsId: "energy-iq",
      hasExistingSolar: false,
    },
  },
  {
    id: "standard",
    label: "Standardvilla",
    hint: "20 paneler · Easyway 23 kWh · laddbox · Energy IQ",
    config: {
      enabled: { sol: true, batteri: true, värmepump: false, laddbox: true },
      panelCount: 20,
      batteryId: "easyway-univ7600",
      batteryCapacityKWh: 23.04,
      chargerId: "easee",
      emsId: "energy-iq",
      hasExistingSolar: false,
    },
  },
  {
    id: "max",
    label: "Maximerat hem",
    hint: "30 paneler · Easyway 30 kWh · laddbox · Enequi Core",
    config: {
      enabled: { sol: true, batteri: true, värmepump: false, laddbox: true },
      panelCount: 30,
      batteryId: "easyway-univ7600",
      batteryCapacityKWh: 30.72,
      chargerId: "easee",
      emsId: "enequi",
      hasExistingSolar: false,
    },
  },
];

function applyPreset(
  current: CalcInput,
  preset: (typeof PRESETS)[number],
): CalcInput {
  return {
    ...current,
    ...preset.config,
    enabled: { ...current.enabled, ...preset.config.enabled },
  } as CalcInput;
}

// Ensam-lös version som beräknar minimum-pris per delsystem.
function fromPriceFor(key: PieceKey): number {
  const stub: CalcInput = { ...initial };
  switch (key) {
    case "sol":
      stub.enabled = { ...stub.enabled, sol: true };
      stub.panelCount = 4;
      break;
    case "batteri":
      stub.enabled = { ...stub.enabled, batteri: true };
      // Hitta billigaste batteri-konfiguration: minsta kapacitet + minsta
      // hardware/modul (proxi för billigast).
      const cheapest = BATTERIES.reduce((min, b) => {
        const score =
          b.baseHardwareKr +
          Math.round(b.capacities[0] / b.kWhPerModule) * b.perModuleHardwareKr;
        const minScore =
          min.baseHardwareKr +
          Math.round(min.capacities[0] / min.kWhPerModule) *
            min.perModuleHardwareKr;
        return score < minScore ? b : min;
      }, BATTERIES[0]);
      stub.batteryId = cheapest.id;
      stub.batteryCapacityKWh = cheapest.capacities[0];
      break;
    case "värmepump":
      stub.enabled = { ...stub.enabled, värmepump: true };
      const cheapestHeat = HEAT_PUMPS.reduce((min, h) =>
        h.priceKr < min.priceKr ? h : min, HEAT_PUMPS[0]);
      stub.heatPumpId = cheapestHeat.id;
      break;
    case "laddbox":
      stub.enabled = { ...stub.enabled, laddbox: true };
      const cheapestCharger = CHARGERS.reduce((min, c) =>
        c.priceKr < min.priceKr ? c : min, CHARGERS[0]);
      stub.chargerId = cheapestCharger.id;
      break;
  }
  const r = computeCalc(stub);
  return r.netCostKr;
}

const FROM_PRICES: Record<PieceKey, number> = {
  sol: fromPriceFor("sol"),
  batteri: fromPriceFor("batteri"),
  värmepump: fromPriceFor("värmepump"),
  laddbox: fromPriceFor("laddbox"),
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
    ems: input.emsId ?? "",
  }).toString();

  // Dynamiskt aktuellt pris per delsystem (visas i tile-headern).
  function piecePriceLive(k: PieceKey): number {
    switch (k) {
      case "sol":
        return Math.max(0, result.solarPriceKr - result.solarDeductionKr);
      case "batteri":
        return Math.max(
          0,
          result.batteryPriceKr - result.batteryDeductionKr,
        );
      case "värmepump":
        return result.heatpumpPriceKr;
      case "laddbox":
        return Math.max(0, result.chargerPriceKr - result.chargerDeductionKr);
    }
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
      {/* VÄNSTER: 3D-scen + resultat */}
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

      {/* HÖGER: konfigurationsrader */}
      <aside className="xl:col-span-5 space-y-3">
        <HouseHeader input={input} setInput={setInput} update={update} />

        {PIECES.map((p) => {
          const tile = (
            <PieceTile
              key={p.key}
              piece={p}
              input={input}
              result={result}
              isOn={input.enabled[p.key]}
              onToggle={() => toggleEnabled(p.key)}
              update={update}
              setInput={setInput}
              livePrice={piecePriceLive(p.key)}
              fromPrice={FROM_PRICES[p.key]}
            />
          );
          if (p.key !== "sol") return tile;
          // Solpanel-raden får en sidoknapp "Finns redan" – när den klickas
          // växlar vi på Solpaneler och sätter den i befintlig-läge direkt.
          return (
            <div key="sol-row" className="flex gap-2">
              <div className="flex-1 min-w-0">{tile}</div>
              <button
                type="button"
                onClick={() => {
                  setInput((s) => ({
                    ...s,
                    enabled: { ...s.enabled, sol: true },
                    hasExistingSolar: true,
                  }));
                }}
                className={[
                  "shrink-0 self-stretch rounded-2xl px-4 py-2 text-[12px] font-medium border transition flex flex-col items-center justify-center gap-1 min-w-[100px] text-center leading-tight",
                  input.hasExistingSolar && input.enabled.sol
                    ? "bg-indigo text-bone border-indigo"
                    : "bg-bone text-ink/75 border-ink/15 hover:border-ink/40",
                ].join(" ")}
                aria-label="Jag har redan solpaneler"
              >
                <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] opacity-65">
                  Snabbväg
                </span>
                <span className="text-[13px] font-semibold leading-tight">
                  Finns redan
                </span>
              </button>
            </div>
          );
        })}

        {anyEnabled && (
          <EmsTile input={input} update={update} />
        )}

        {anyEnabled && (
          <Link
            href={`/offert?${queryString}`}
            className="mt-2 inline-flex w-full items-center justify-between gap-2 rounded-2xl bg-ink px-6 py-5 font-medium text-bone hover:bg-graphite transition"
          >
            <span>
              <span className="block font-mono text-[10.5px] uppercase tracking-[0.2em] text-bone/55">
                Investering efter avdrag
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

// =================== HUS-INFO HEADER ===================

function HouseHeader({
  input,
  setInput,
  update,
}: {
  input: CalcInput;
  setInput: React.Dispatch<React.SetStateAction<CalcInput>>;
  update: <K extends keyof CalcInput>(k: K, v: CalcInput[K]) => void;
}) {
  return (
    <div className="rounded-2xl border border-ink/12 bg-bone p-5 space-y-4">
      <div>
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55">
          Ditt hushåll
        </div>
        <p className="mt-2 text-[13.5px] text-ink/65 leading-relaxed">
          Justera årsförbrukningen och hur många ägare ni är, så blir
          avdrag och payback rätt.
        </p>
      </div>

      <Slider
        label="Årsförbrukning el"
        min={1500}
        max={20000}
        step={100}
        value={input.baseConsumptionKWh}
        onChange={(v) => update("baseConsumptionKWh", v)}
        suffix="kWh/år"
      />

      <div>
        <span className="block text-[13px] text-ink/65 mb-2">
          Antal fastighetsägare (avdragstak)
        </span>
        <div className="flex gap-1.5">
          {([1, 2] as const).map((n) => {
            const active = input.numOwners === n;
            return (
              <button
                key={n}
                type="button"
                onClick={() => update("numOwners", n)}
                className={[
                  "flex-1 rounded-xl px-3 py-2.5 text-[13px] border transition",
                  active
                    ? "bg-ink text-bone border-ink"
                    : "bg-bone text-ink/75 border-ink/15 hover:border-ink/40",
                ].join(" ")}
              >
                {n} ägare ·{" "}
                <span className="opacity-65">{n * 50_000} kr/år</span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <span className="block text-[13px] text-ink/65 mb-2">
          Elområde (styr spotpris och Emaldo grid rewards)
        </span>
        <div className="grid grid-cols-4 gap-1.5">
          {ELZONER.map((z) => {
            const active = input.elzon === z.key;
            return (
              <button
                key={z.key}
                type="button"
                onClick={() => update("elzon", z.key)}
                className={[
                  "rounded-xl px-2 py-2 text-[13px] border transition",
                  active
                    ? "bg-ink text-bone border-ink"
                    : "bg-bone text-ink/75 border-ink/15 hover:border-ink/40",
                ].join(" ")}
                title={z.region}
              >
                {z.label}
              </button>
            );
          })}
        </div>
        <div className="mt-1.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink/45">
          {ELZONER.find((z) => z.key === input.elzon)?.region}
        </div>
      </div>

      <div>
        <span className="block text-[13px] text-ink/65 mb-2">Taktyp</span>
        <div className="grid grid-cols-2 gap-1.5">
          {ROOF_TYPES.map((r) => {
            const active = input.roofType === r.key;
            return (
              <button
                key={r.key}
                type="button"
                onClick={() => update("roofType", r.key)}
                className={[
                  "rounded-xl px-3 py-2 text-[13px] border transition",
                  active
                    ? "bg-ink text-bone border-ink"
                    : "bg-bone text-ink/75 border-ink/15 hover:border-ink/40",
                ].join(" ")}
              >
                {r.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-t border-ink/8 pt-4">
        <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink/55 mb-2">
          Sätt ihop rekommenderat system
        </div>
        <div className="grid grid-cols-1 gap-1.5">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setInput((cur) => applyPreset(cur, p))}
              className="text-left rounded-xl border border-ink/15 bg-bone hover:border-ink/40 hover:bg-cream/30 transition px-4 py-3"
            >
              <div className="font-display text-[15px] tracking-display-tight">
                {p.label}
              </div>
              <div className="text-[12px] text-ink/55">{p.hint}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// =================== KONFIGURATIONSRAD PER DELSYSTEM ===================

function PieceTile({
  piece,
  input,
  result,
  isOn,
  onToggle,
  update,
  setInput,
  livePrice,
  fromPrice,
}: {
  piece: Piece;
  input: CalcInput;
  result: CalcResult;
  isOn: boolean;
  onToggle: () => void;
  update: <K extends keyof CalcInput>(k: K, v: CalcInput[K]) => void;
  setInput: React.Dispatch<React.SetStateAction<CalcInput>>;
  livePrice: number;
  fromPrice: number;
}) {
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
            {formatKr(isOn ? livePrice : fromPrice)}
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
            <BatteryControls
              input={input}
              update={update}
              result={result}
              setInput={setInput}
            />
          )}
          {piece.key === "värmepump" && (
            <HeatControls input={input} update={update} />
          )}
          {piece.key === "laddbox" && (
            <ChargerControls input={input} update={update} />
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
      <PillGroup
        label="Sol-läge"
        options={[
          { value: "ny", label: "Ny anläggning" },
          { value: "befintlig", label: "Har redan solpaneler" },
        ]}
        value={input.hasExistingSolar ? "befintlig" : "ny"}
        onChange={(v) => update("hasExistingSolar", v === "befintlig")}
      />

      {!input.hasExistingSolar ? (
        <>
          <Select
            label="Märke & modell"
            value={input.panelId}
            onChange={(v) => update("panelId", v)}
            options={PANELS.map((p) => ({
              value: p.id,
              label: `${p.brand} · ${p.watt} W (${p.heightMm}×${p.widthMm} mm)`,
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
          <p className="text-[12px] text-ink/50">
            Max {MAX_PANELS_PER_HOUSE} paneler. Över 24 fyller vi även det
            norra takfallet.
          </p>
        </>
      ) : (
        <ExistingSolarControls input={input} update={update} />
      )}

      {result.inverter.kind === "external" && !input.enabled.batteri && (
        <InverterControls input={input} update={update} result={result} />
      )}
    </>
  );
}

function ExistingSolarControls({
  input,
  update,
}: {
  input: CalcInput;
  update: <K extends keyof CalcInput>(k: K, v: CalcInput[K]) => void;
}) {
  // Två sliders, formel-länkade: kWp × 850 = årlig produktion (kWh).
  return (
    <>
      <Slider
        label="Installerad effekt"
        min={1}
        max={30}
        step={0.5}
        value={input.existingSolarKWp}
        onChange={(v) => {
          // Synkronisera båda värdena
          setBoth(update, v, v * 850);
        }}
        suffix="kWp"
      />
      <Slider
        label="Årlig produktion"
        min={850}
        max={25500}
        step={50}
        value={input.existingSolarYearlyKWh}
        onChange={(v) => {
          setBoth(update, v / 850, v);
        }}
        suffix="kWh/år"
      />
      <p className="text-[12px] text-ink/50 leading-relaxed">
        Vi räknar med 850 kWh per kWp och år (mellansvenskt normalår).
        Sliders är länkade.
      </p>
    </>
  );
}

function setBoth(
  update: <K extends keyof CalcInput>(k: K, v: CalcInput[K]) => void,
  kwp: number,
  yearly: number,
) {
  update("existingSolarKWp", Math.round(kwp * 10) / 10);
  update("existingSolarYearlyKWh", Math.round(yearly));
}

function InverterControls({
  input,
  update,
  result,
}: {
  input: CalcInput;
  update: <K extends keyof CalcInput>(k: K, v: CalcInput[K]) => void;
  result: CalcResult;
}) {
  const inv = result.inverter;
  const isBuiltIn = inv.kind === "builtIn";
  return (
    <div className="rounded-2xl border border-ink/10 bg-bone px-4 py-3 space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink/55">
            Växelriktare
          </div>
          <div className="mt-1 font-display text-base tracking-display-tight">
            {inv.kind === "builtIn"
              ? inv.label
              : `${inv.brand} ${inv.kw} kW`}
          </div>
        </div>
        {!isBuiltIn && (
          <PillGroup
            label=""
            options={[
              { value: "auto", label: "Auto" },
              { value: "manual", label: "Manuell" },
            ]}
            value={input.inverterMode}
            onChange={(v) => update("inverterMode", v as "auto" | "manual")}
          />
        )}
      </div>
      {!isBuiltIn && input.inverterMode === "manual" && (
        <PillGroup
          label="Solis S6-storlek"
          options={[
            { value: "10", label: "10 kW" },
            { value: "15", label: "15 kW" },
          ]}
          value={String(input.manualInverterKw)}
          onChange={(v) =>
            update("manualInverterKw", Number(v) as 10 | 15)
          }
        />
      )}
    </div>
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
      <InverterControls input={input} update={update} result={result} />
      {input.batteryId === "emaldo-store" && (
        <EmaldoGridRewardsInfo zone={input.elzon} />
      )}
    </>
  );
}

function EmaldoGridRewardsInfo({ zone }: { zone: Elzon }) {
  const monthly = EMALDO_GRID_REWARDS_KR_PER_MONTH[zone];
  const supported = monthly != null;
  return (
    <div
      className={[
        "rounded-xl border p-3.5 text-[12.5px] leading-relaxed",
        supported
          ? "border-indigo/30 bg-indigo/5 text-ink/80"
          : "border-amber-500/30 bg-amber-50 text-ink/80",
      ].join(" ")}
    >
      <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink/55 mb-1">
        Emaldo Grid Rewards
      </div>
      {supported ? (
        <>
          <div>
            I SE{zone} betalar Emaldo en garanterad ersättning på{" "}
            <strong>{monthly!.toLocaleString("sv-SE")} kr/månad</strong> för
            att Power Store får delta i nät-tjänsterna ({(monthly! * 12).toLocaleString("sv-SE")} kr/år).
          </div>
          <a
            href={EMALDO_TERMS_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-indigo hover:underline font-mono text-[10.5px] uppercase tracking-[0.16em]"
          >
            Villkor & krav <span aria-hidden>↗</span>
          </a>
        </>
      ) : (
        <>
          <div>
            Optimera erbjuder inte Emaldo-installation i SE{zone}. Välj
            Easyway eller SAJ HS3 istället, eller byt elområde till SE3 / SE4.
          </div>
          <a
            href={EMALDO_TERMS_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-indigo hover:underline font-mono text-[10.5px] uppercase tracking-[0.16em]"
          >
            Villkor från Emaldo <span aria-hidden>↗</span>
          </a>
        </>
      )}
    </div>
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

// =================== EMS-tile ===================

function EmsTile({
  input,
  update,
}: {
  input: CalcInput;
  update: <K extends keyof CalcInput>(k: K, v: CalcInput[K]) => void;
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
        onClick={() => update("emsId", isOn ? null : EMS_OPTIONS[0].id)}
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
        label="Investering innan avdrag"
        value={formatKr(result.totalCostKr)}
      />
      <Tile
        label="Investering efter avdrag"
        value={formatKr(result.netCostKr)}
        sub={`grönt avdrag ${formatKr(result.greenDeductionKr)}`}
      />
      <Tile
        label="Årlig besparing"
        value={formatKr(result.yearlyNetKr)}
        sub={
          result.yearlySupportRevenueKr > 0 ||
          result.yearlyEmaldoRewardsKr > 0 ||
          result.yearlyEmsCostKr > 0
            ? [
                `besparing ${formatKr(result.yearlySavingKr)}`,
                result.yearlySupportRevenueKr > 0
                  ? `+ stödtjänster ${formatKr(result.yearlySupportRevenueKr)}`
                  : null,
                result.yearlyEmaldoRewardsKr > 0
                  ? `+ Emaldo Grid Rewards ${formatKr(result.yearlyEmaldoRewardsKr)}`
                  : null,
                result.yearlyEmsCostKr > 0
                  ? `− EMS-avgift ${formatKr(result.yearlyEmsCostKr)}`
                  : null,
              ]
                .filter(Boolean)
                .join(" · ")
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
        sub={
          result.yearly20YearKr > 0
            ? `20-årsvinst ${formatKr(result.yearly20YearKr)}`
            : "Avkastningen kommer främst från värmebesparing"
        }
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
          {value}{" "}
          {suffix ? <span className="text-ink/45">{suffix}</span> : null}
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
      {label ? (
        <span className="block text-[13px] text-ink/65 mb-2">{label}</span>
      ) : null}
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
        <div className="mt-1 text-[11.5px] text-ink/55 leading-snug">
          {sub}
        </div>
      )}
    </div>
  );
}
