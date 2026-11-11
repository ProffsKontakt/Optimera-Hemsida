"use client";

import { useId, useState } from "react";

/**
 * Animerad accordion-disclosure. Höjden animeras i ren CSS (grid-rader
 * 0fr -> 1fr), så komponenten drar inte in något animationsbibliotek på
 * de många sidor som har vanliga frågor. Drop-in ersättning för
 * <details><summary>...</summary>...</details>.
 *
 * VIKTIGT för AI-search/GEO: svarstexten renderas ALLTID i DOM:en, även när
 * panelen är kollapsad (grid-raden är 0fr och clippar bara höjden, barnen
 * finns kvar i server-HTML:en). Tidigare låg svaret bakom `{open && …}` vilket
 * gjorde att texten saknades helt i initial HTML – då kunde ChatGPT/Claude/
 * Perplexity/Google AI bara läsa svaret via JSON-LD, aldrig som synlig passage.
 * Nu är svaret citeringsbart direkt ur markupen. Ingen opacity-döljning
 * används (undviker "hidden text"-heuristiker); höjden clippar innehållet.
 */
export function Disclosure({
  question,
  children,
}: {
  question: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const bodyId = useId();
  return (
    <div className="py-6">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start gap-6 justify-between text-left"
        aria-expanded={open}
        aria-controls={bodyId}
      >
        <span className="font-display text-2xl tracking-display-tight max-w-2xl leading-snug">
          {question}
        </span>
        <span
          className={[
            "shrink-0 mt-1 grid h-7 w-7 place-items-center rounded-full border border-ink/15 transition-all duration-300",
            open ? "rotate-45 bg-ink text-bone border-ink" : "text-ink/55",
          ].join(" ")}
          aria-hidden
        >
          <span className="font-mono text-[14px] leading-none">+</span>
        </span>
      </button>
      <div
        id={bodyId}
        className="grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="pt-4 pb-1 max-w-2xl text-ink/70 leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
