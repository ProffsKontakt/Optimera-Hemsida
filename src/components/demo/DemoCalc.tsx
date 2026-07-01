"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Sun, BatteryCharging, Zap, Check } from "lucide-react";

/**
 * DEMO: avskalad "kalkylator" utan exakta kronor. Konceptet är kvar (klicka i
 * vad du vill ha), men i stället för hårda siffror ger den ärliga riktnings-
 * spann och lotsar mot ett samtal med en tekniker/säljare som visar riktiga
 * siffror. Bygger tillit i stället för att stänga loopen med en avskräckande
 * återbetalningssiffra.
 */

type BatterySize = "15" | "23" | "30";
type RoofSize = "liten" | "mellan" | "stor";

function paybackScenario(o: {
  existingSolar: boolean;
  addSolar: boolean;
  addBattery: boolean;
}) {
  const { existingSolar, addSolar, addBattery } = o;
  if (existingSolar && addBattery) {
    return {
      tag: "Bästa affären vi ser",
      range: "≈ 2–3 år",
      lead:
        "Att komplettera befintliga solceller med batteri är ofta den snabbaste affären. Med rätt förutsättningar (t.ex. stödtjänster) kan hela investeringen vara återbetald på ett par år.",
    };
  }
  if (addSolar && addBattery) {
    return {
      tag: "Komplett lösning",
      range: "≈ 3–5 år",
      lead:
        "En komplett sol- och batterilösning betalar sig typiskt på 3–5 år. Upp mot 8 år i tuffare fall, beroende på tak, förbrukning och elområde.",
    };
  }
  if (addSolar && !addBattery) {
    return {
      tag: "Trygg grund",
      range: "≈ 8–11 år",
      lead:
        "Solceller ensamt är en trygg långsiktig investering – men ett batteri kortar återbetalningen rejält och gör mer av din egen el användbar.",
    };
  }
  if (addBattery && !existingSolar && !addSolar) {
    return {
      tag: "Fristående batteri",
      range: "Vi räknar på det",
      lead:
        "Ett batteri utan solceller lönar sig via prisarbitrage och stödtjänster. Grönt avdrag (48,5 %) kräver dock att huset har en solanläggning – vi går igenom vad som passar dig.",
    };
  }
  return {
    tag: "",
    range: "Välj ovan",
    lead: "Kryssa i vad du vill lägga till, så visar vi vad det brukar innebära.",
  };
}

function Selectable({
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
        "rounded-2xl border px-4 py-3 text-left text-[14px] transition flex items-center gap-2",
        active
          ? "bg-ink text-bone border-ink"
          : "bg-cream/50 border-ink/15 hover:border-ink/40 text-ink",
      ].join(" ")}
    >
      {active && <Check size={14} className="shrink-0" />}
      {children}
    </button>
  );
}

export function DemoCalc() {
  const [existingSolar, setExistingSolar] = useState<boolean | null>(null);
  const [addSolar, setAddSolar] = useState(false);
  const [addBattery, setAddBattery] = useState(true);
  const [addLaddbox, setAddLaddbox] = useState(false);
  const [battery, setBattery] = useState<BatterySize>("23");
  const [roof, setRoof] = useState<RoofSize>("mellan");

  // Om man redan har solceller lägger man inte till sol igen.
  const solarWanted = existingSolar === false && addSolar;
  const scenario = paybackScenario({
    existingSolar: !!existingSolar,
    addSolar: solarWanted,
    addBattery,
  });

  const chosen = existingSolar !== null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
      {/* Konfigurator */}
      <div className="lg:col-span-3 space-y-5">
        <div className="rounded-3xl border border-ink/10 bg-bone p-6 md:p-7">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55">
            1 · Har du redan solceller?
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Selectable
              active={existingSolar === true}
              onClick={() => {
                setExistingSolar(true);
                setAddSolar(false);
              }}
            >
              Ja, jag har solceller
            </Selectable>
            <Selectable
              active={existingSolar === false}
              onClick={() => {
                setExistingSolar(false);
                setAddSolar(true);
              }}
            >
              Nej, inte än
            </Selectable>
          </div>
        </div>

        {chosen && (
          <div className="rounded-3xl border border-ink/10 bg-bone p-6 md:p-7">
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55">
              2 · Vad vill du lägga till?
            </div>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
              {existingSolar === false && (
                <Selectable active={addSolar} onClick={() => setAddSolar(!addSolar)}>
                  <Sun size={15} /> Solceller
                </Selectable>
              )}
              <Selectable active={addBattery} onClick={() => setAddBattery(!addBattery)}>
                <BatteryCharging size={15} /> Batteri
              </Selectable>
              <Selectable active={addLaddbox} onClick={() => setAddLaddbox(!addLaddbox)}>
                <Zap size={15} /> Laddbox
              </Selectable>
            </div>

            {solarWanted && (
              <div className="mt-6">
                <div className="text-[13px] text-ink/60 mb-2">Ungefär hur stort tak?</div>
                <div className="grid grid-cols-3 gap-2">
                  {(["liten", "mellan", "stor"] as RoofSize[]).map((r) => (
                    <Selectable key={r} active={roof === r} onClick={() => setRoof(r)}>
                      {r === "liten" ? "Litet" : r === "mellan" ? "Mellan" : "Stort"}
                    </Selectable>
                  ))}
                </div>
              </div>
            )}

            {addBattery && (
              <div className="mt-6">
                <div className="text-[13px] text-ink/60 mb-2">Hur mycket lagring?</div>
                <div className="grid grid-cols-3 gap-2">
                  {(["15", "23", "30"] as BatterySize[]).map((b) => (
                    <Selectable key={b} active={battery === b} onClick={() => setBattery(b)}>
                      {b === "30" ? "30+ kWh" : `${b} kWh`}
                    </Selectable>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Resultat / riktning */}
      <div className="lg:col-span-2">
        <div className="lg:sticky lg:top-28 rounded-3xl border border-indigo/25 bg-indigo/[0.04] p-6 md:p-7">
          {scenario.tag && (
            <div className="inline-flex items-center rounded-full bg-indigo text-bone font-mono text-[10.5px] uppercase tracking-[0.16em] px-3 py-1">
              {scenario.tag}
            </div>
          )}
          <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/50">
            Typisk återbetalning
          </div>
          <div className="mt-1 font-display text-[40px] md:text-[52px] leading-none tracking-display-tight text-indigo">
            {scenario.range}
          </div>
          <p className="mt-4 text-ink/75 text-[14.5px] leading-relaxed">
            {scenario.lead}
          </p>

          {chosen && (
            <ul className="mt-5 space-y-2 text-[13.5px] text-ink/70">
              {addBattery && (
                <li className="flex items-start gap-2">
                  <Check size={15} className="mt-0.5 text-moss shrink-0" />
                  Med batteri använder du 70–90 % av din egen el i stället för ~30 %.
                </li>
              )}
              {addBattery && (
                <li className="flex items-start gap-2">
                  <Check size={15} className="mt-0.5 text-moss shrink-0" />
                  Batteriet tjänar pengar dygnet runt via stödtjänster (FCR-D).
                </li>
              )}
              <li className="flex items-start gap-2">
                <Check size={15} className="mt-0.5 text-moss shrink-0" />
                Grönt avdrag: 14,55 % på solceller, 48,5 % på batteri.
              </li>
            </ul>
          )}

          <div className="mt-6 rounded-2xl border border-ink/10 bg-bone/70 p-4 text-[13px] text-ink/70 leading-relaxed">
            Vi ger medvetet inga exakta kronor här – en kalkylator känner inte
            ditt tak, din förbrukning eller ditt elområde. Vill du ha riktiga
            siffror och ett pris för just din bostad?
          </div>

          <Link
            href="/offert"
            className="mt-4 btn-primary w-full justify-center text-base"
          >
            Begär offert – vi räknar på det <ArrowRight size={16} />
          </Link>
          <p className="mt-2 text-center text-[12.5px] text-ink/50">
            En tekniker går igenom siffrorna med dig – inga påslag, inga
            "från"-priser.
          </p>
        </div>
      </div>
    </div>
  );
}
