"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Minus } from "lucide-react";
import { HEAT_PUMP_TYPES, type HeatPumpTypeId } from "@/lib/heatpump";

/**
 * "Vilken värmepump passar ditt hus?" – fyra snabba frågor, rekommendation
 * direkt (inga steg, inget formulär). Under frågorna jämförs typerna och
 * de som passar lyser upp.
 *
 * Logiken är medvetet enkel och försiktig: den pekar ut vilka typer som är
 * tekniskt rimliga för huset – själva valet görs vid hembesöket.
 */
type Heating = "direktel" | "elpanna" | "olja" | "fjarrvarme" | "vp" | "ved";
type YesNo = "ja" | "nej" | "vet-inte";

const HEATING: { id: Heating; label: string }[] = [
  { id: "direktel", label: "Direktverkande el (element)" },
  { id: "elpanna", label: "Elpanna med radiatorer" },
  { id: "olja", label: "Olja eller gas" },
  { id: "ved", label: "Ved eller pellets" },
  { id: "vp", label: "Äldre värmepump" },
  { id: "fjarrvarme", label: "Fjärrvärme" },
];

// Uppvärmningssätt som i princip alltid betyder vattenburet system.
const WATERBORNE_BY_HEATING: Partial<Record<Heating, YesNo>> = {
  elpanna: "ja",
  olja: "ja",
  ved: "ja",
  direktel: "nej",
};

type Recommendation = {
  primary: HeatPumpTypeId[];
  also: HeatPumpTypeId[];
  text: string;
};

function recommend(h: Heating | null, water: YesNo | null, drill: YesNo | null, vent: YesNo | null): Recommendation | null {
  if (!h) return null;
  if (h === "fjarrvarme") {
    return {
      primary: [],
      also: [],
      text: "Med fjärrvärme avgör din taxa om ett byte lönar sig – vi räknar på den innan vi rekommenderar något. Tänk på att Villaeffekten inte gäller hus som är anslutna till fjärrvärme.",
    };
  }
  const w = water ?? WATERBORNE_BY_HEATING[h] ?? null;
  if (!w) return null;
  if (w === "nej") {
    return {
      primary: ["luft-luft"],
      also: [],
      text: "Utan vattenburet system är luft-luft det vanliga sättet att snabbt sänka elräkningen. Vill du ha en helhetslösning som även värmer varmvattnet kan huset byggas om med vattenburen värme – då öppnas luft-vatten och bergvärme. Vi går igenom båda vägarna på hembesöket.",
    };
  }
  const also: HeatPumpTypeId[] = vent === "ja" ? ["franluft"] : [];
  const unsureWater =
    w === "vet-inte"
      ? " Har du vattenfyllda element (radiatorer) eller golvvärme med vatten har du vattenburen värme."
      : "";
  if (drill === "ja") {
    return {
      primary: ["berg"],
      also: ["luft-vatten", ...also],
      text: `Går det att borra är bergvärme oftast förstahandsvalet: högst verkningsgrad och jämn drift även vintertid. Luft-vatten är alternativet om du vill hålla nere investeringen.${unsureWater}`,
    };
  }
  if (drill === "nej") {
    return {
      primary: ["luft-vatten"],
      also,
      text: `Utan möjlighet att borra är luft-vatten det naturliga valet – ingen borrning och lägre investering.${vent === "ja" ? " Med mekanisk frånluft kan en frånluftsvärmepump också vara ett alternativ, särskilt i mindre hus." : ""}${unsureWater}`,
    };
  }
  return {
    primary: ["berg", "luft-vatten"],
    also,
    text: `Bergvärme om tomten tillåter borrning, annars luft-vatten. Vi tittar på tomten och husets värmebehov vid hembesöket.${unsureWater}`,
  };
}

export function HeatPumpGuide() {
  const [heating, setHeating] = useState<Heating | null>(null);
  const [water, setWater] = useState<YesNo | null>(null);
  const [drill, setDrill] = useState<YesNo | null>(null);
  const [vent, setVent] = useState<YesNo | null>(null);

  const impliedWater = heating ? WATERBORNE_BY_HEATING[heating] : undefined;
  const effectiveWater = water ?? impliedWater ?? null;
  const showWater = heating !== null && heating !== "fjarrvarme" && !impliedWater;
  const showDrill = heating !== "fjarrvarme" && (effectiveWater === "ja" || effectiveWater === "vet-inte");
  const rec = recommend(heating, water, drill, vent);
  const highlighted = new Set([...(rec?.primary ?? []), ...(rec?.also ?? [])]);

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6">
        <div className="lg:col-span-7 rounded-[28px] border border-ink/10 bg-bone p-6 md:p-8 space-y-7">
          <Question n={1} label="Hur värms huset i dag?">
            {HEATING.map((o) => (
              <Chip
                key={o.id}
                on={heating === o.id}
                onClick={() => {
                  setHeating(o.id);
                  setWater(null);
                }}
              >
                {o.label}
              </Chip>
            ))}
          </Question>

          {showWater && (
            <Question n={2} label="Har huset vattenburen värme – radiatorer eller golvvärme med vatten?">
              <YesNoChips value={water} onChange={setWater} />
            </Question>
          )}

          {showDrill && (
            <>
              <Question n={showWater ? 3 : 2} label="Går det att borra på tomten?">
                <YesNoChips value={drill} onChange={setDrill} />
              </Question>
              <Question
                n={showWater ? 4 : 3}
                label="Har huset mekanisk frånluft – en fläkt som suger ut luft via don i kök och badrum?"
              >
                <YesNoChips value={vent} onChange={setVent} />
              </Question>
            </>
          )}
        </div>

        <div
          className="lg:col-span-5 rounded-[28px] bg-ink text-bone p-6 md:p-8 flex flex-col"
          aria-live="polite"
        >
          <div className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-bone/55">
            Vår bedömning
          </div>
          {rec ? (
            <>
              {rec.primary.length > 0 && (
                <div className="mt-4 font-display text-3xl md:text-4xl tracking-display-tight leading-[1.15]">
                  {rec.primary
                    .map((id) => HEAT_PUMP_TYPES.find((t) => t.id === id)!.name)
                    .join(" eller ")}
                </div>
              )}
              <p className="mt-4 text-[15px] leading-relaxed text-bone/75">{rec.text}</p>
              <Link
                href="/offert?tjanst=vaermepumpar"
                className="mt-auto pt-6 inline-flex items-center gap-2 self-start text-[15px] font-medium text-sun hover:text-bone transition"
              >
                Boka hembesök för värmepump <ArrowRight size={16} />
              </Link>
            </>
          ) : (
            <p className="mt-4 text-[15px] leading-relaxed text-bone/60">
              Svara på frågorna till vänster så pekar vi ut vilka typer som
              passar ditt hus. Inget sparas och du behöver inte lämna några
              uppgifter.
            </p>
          )}
        </div>
      </div>

      {/* Jämförelse – de som passar lyser upp */}
      <div className="mt-5 md:mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {HEAT_PUMP_TYPES.map((t) => {
          const lit = highlighted.has(t.id);
          const dim = rec !== null && highlighted.size > 0 && !lit;
          return (
            <article
              key={t.id}
              className={`rounded-3xl border p-6 transition duration-300 ${
                lit
                  ? "border-indigo bg-indigo/[0.06] ring-1 ring-indigo"
                  : "border-ink/10 bg-bone"
              } ${dim ? "opacity-55" : ""}`}
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-display text-xl tracking-display-tight">{t.name}</h3>
                {lit && rec?.primary.includes(t.id) && (
                  <span className="rounded-full bg-indigo px-2.5 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-bone">
                    Rekommenderas
                  </span>
                )}
              </div>
              <p className="mt-2 text-[14px] text-ink/70 leading-relaxed">{t.how}</p>
              <p className="mt-3 text-[13px] text-ink/55 leading-relaxed">
                <span className="text-ink/75">Passar: </span>
                {t.fits}
              </p>
              <ul className="mt-4 space-y-1.5 border-t border-ink/10 pt-4 text-[13px]">
                <Attr ok={t.heatsTapWater}>Värmer varmvattnet</Attr>
                <Attr ok={t.villaeffekten}>Villaeffekten-bidrag</Attr>
                <Attr ok>ROT på arbetet</Attr>
              </ul>
              <p className="mt-4 text-[12.5px] text-ink/50 leading-relaxed">{t.note}</p>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function Question({ n, label, children }: { n: number; label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex gap-3">
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ink font-mono text-[11px] text-bone">
          {n}
        </span>
        <div className="text-[15.5px] font-medium leading-snug text-ink">{label}</div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2 sm:pl-9">{children}</div>
    </div>
  );
}

function YesNoChips({ value, onChange }: { value: YesNo | null; onChange: (v: YesNo) => void }) {
  return (
    <>
      {(["ja", "nej", "vet-inte"] as const).map((v) => (
        <Chip key={v} on={value === v} onClick={() => onChange(v)}>
          {v === "ja" ? "Ja" : v === "nej" ? "Nej" : "Vet inte"}
        </Chip>
      ))}
    </>
  );
}

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`rounded-full border px-4 py-2.5 text-[14px] text-left transition ${
        on
          ? "border-indigo bg-indigo text-bone"
          : "border-ink/15 bg-bone text-ink/75 hover:border-ink/40 hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

function Attr({ ok, children }: { ok: boolean; children: React.ReactNode }) {
  return (
    <li className={`flex items-center gap-2 ${ok ? "text-ink/80" : "text-ink/40"}`}>
      {ok ? (
        <Check size={14} className="shrink-0 text-moss" />
      ) : (
        <Minus size={14} className="shrink-0" />
      )}
      {children}
    </li>
  );
}
