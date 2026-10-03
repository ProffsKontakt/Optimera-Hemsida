"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import {
  HEAT_PUMP_TYPES,
  HEATPUMP_SOURCES,
  ROT,
  VILLAEFFEKTEN,
  estimateSupport,
  heatPumpType,
  kr,
  type HeatPumpTypeId,
} from "@/lib/heatpump";

/**
 * "Vad blir kvar att betala?" – ROT + Villaeffekten för en värmepump.
 *
 * Besökaren fyller i totalpriset från sin egen offert; vi visar aldrig
 * egna priser här. Reglerna ligger i lib/heatpump.ts (källkontrollerade).
 */
const CONDITIONS = [
  { id: "age", label: `Huset har värdeår före ${VILLAEFFEKTEN.builtBefore}` },
  { id: "district", label: "Huset är inte anslutet till fjärrvärme" },
  { id: "lives", label: "Du äger huset och bor där stadigvarande" },
] as const;

export function SupportCalculator({ initialType = "luft-vatten" }: { initialType?: HeatPumpTypeId }) {
  const [type, setType] = useState<HeatPumpTypeId>(initialType);
  const [totalText, setTotalText] = useState("150 000");
  const [owners, setOwners] = useState<1 | 2>(1);
  const [conds, setConds] = useState<Record<string, boolean>>({
    age: true,
    district: true,
    lives: true,
  });

  const total = Number(totalText.replace(/\D/g, "")) || 0;
  const eligible = CONDITIONS.every((c) => conds[c.id]);
  const t = heatPumpType(type);
  const r = estimateSupport({ total, type, owners, villaeffektenEligible: eligible });

  const bidragReason = !t.villaeffekten
    ? "Luft-luft omfattas inte av Villaeffekten."
    : !eligible
      ? "Huset uppfyller inte villkoren ovan."
      : r.bidragBelowMin
        ? `Bidraget beviljas först från ${kr(VILLAEFFEKTEN.min)}.`
        : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6">
      {/* Inmatning */}
      <div className="lg:col-span-7 rounded-[28px] border border-ink/10 bg-bone p-6 md:p-8">
        <Label>Typ av värmepump</Label>
        <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
          {HEAT_PUMP_TYPES.map((x) => (
            <Chip key={x.id} on={type === x.id} onClick={() => setType(x.id)}>
              {x.name}
            </Chip>
          ))}
        </div>

        <label className="mt-6 block">
          <Label>Totalpris enligt offert (inkl. moms)</Label>
          <div className="mt-2 flex items-center rounded-2xl border border-ink/15 bg-cream/40 focus-within:border-indigo transition">
            <input
              inputMode="numeric"
              value={totalText}
              onChange={(e) => {
                const digits = e.target.value.replace(/\D/g, "").slice(0, 7);
                setTotalText(digits ? new Intl.NumberFormat("sv-SE").format(Number(digits)) : "");
              }}
              aria-label="Totalpris i kronor"
              className="min-w-0 flex-1 bg-transparent px-4 py-3 font-display text-2xl tracking-display-tight outline-none"
            />
            <span className="pr-4 text-ink/50">kr</span>
          </div>
          <span className="mt-1.5 block text-[12.5px] text-ink/50">
            Exempelvärde – byt mot priset i din offert.
          </span>
        </label>

        <div className="mt-6">
          <Label>Antal ägare som delar på ROT</Label>
          <div className="mt-2 flex gap-2">
            {([1, 2] as const).map((n) => (
              <Chip key={n} on={owners === n} onClick={() => setOwners(n)}>
                {n === 1 ? "En ägare" : "Två ägare"}
              </Chip>
            ))}
          </div>
        </div>

        <fieldset className="mt-6">
          <legend>
            <Label>Villkor för Villaeffekten</Label>
          </legend>
          <div className="mt-2 space-y-2">
            {CONDITIONS.map((c) => (
              <label key={c.id} className="flex cursor-pointer items-center gap-3 text-[14.5px] text-ink/80">
                <input
                  type="checkbox"
                  checked={conds[c.id]}
                  onChange={(e) => setConds((s) => ({ ...s, [c.id]: e.target.checked }))}
                  className="peer sr-only"
                />
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-md border border-ink/25 bg-bone text-bone peer-checked:border-indigo peer-checked:bg-indigo peer-focus-visible:ring-2 peer-focus-visible:ring-indigo/40">
                  <Check size={13} strokeWidth={3} />
                </span>
                {c.label}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      {/* Resultat */}
      <div className="lg:col-span-5 rounded-[28px] bg-ink text-bone p-6 md:p-8 flex flex-col">
        <div className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-bone/55">
          Uppskattning · {t.name}
        </div>
        <dl className="mt-5 space-y-4 text-[14.5px]">
          <Row k="Totalpris" v={kr(total)} />
          <Row
            k="ROT-avdrag"
            sub={`30 % av arbetet – arbetet räknas som ${Math.round(t.rotLaborShare * 100)} % av totalen. Dras direkt på fakturan.`}
            v={`− ${kr(r.rot)}`}
            accent
          />
          {r.rotCapped && (
            <p className="text-[12.5px] text-sun/90">
              Taket är {kr(ROT.capPerPerson)} per person och år.
            </p>
          )}
          <Row
            k="Villaeffekten"
            sub={bidragReason ?? "30 % av materialet. Söks hos Boverket och betalas ut efter installationen."}
            v={r.bidrag > 0 ? `− ${kr(r.bidrag)}` : "0 kr"}
            accent={r.bidrag > 0}
          />
        </dl>
        <div className="mt-6 border-t border-bone/15 pt-5">
          <div className="text-[13px] text-bone/60">Kvar att betala</div>
          <div className="mt-1 font-display text-4xl md:text-5xl tracking-display-tight leading-[1.15]">
            {kr(r.net)}
          </div>
        </div>
        <p className="mt-auto pt-6 text-[12px] leading-relaxed text-bone/50">
          Förenklad uppskattning med Skatteverkets schablon för fast pris. ROT-taket
          delas med annat rot-arbete samma år, och produkten måste uppfylla
          Boverkets energikrav för bidraget. Källor:{" "}
          <a href={HEATPUMP_SOURCES.rotSchablon} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-bone">
            Skatteverket
          </a>
          ,{" "}
          <a href={HEATPUMP_SOURCES.villaeffekten} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-bone">
            Länsstyrelsen
          </a>
          .
        </p>
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink/55">
      {children}
    </span>
  );
}

function Chip({
  on,
  onClick,
  children,
}: {
  on: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`rounded-full border px-4 py-2.5 text-[14px] transition ${
        on
          ? "border-indigo bg-indigo text-bone"
          : "border-ink/15 bg-bone text-ink/75 hover:border-ink/40 hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

function Row({
  k,
  v,
  sub,
  accent = false,
}: {
  k: string;
  v: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <dt className="text-bone/80">{k}</dt>
        <dd className={`font-display text-xl tracking-display-tight whitespace-nowrap ${accent ? "text-sun" : ""}`}>
          {v}
        </dd>
      </div>
      {sub && <p className="mt-1 text-[12.5px] leading-snug text-bone/50">{sub}</p>}
    </div>
  );
}
