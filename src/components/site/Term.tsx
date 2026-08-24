"use client";

import { useState } from "react";

/**
 * Jargong-förklaring: prickad understrykning på facktermer, tryck/klick
 * öppnar en liten förklaringsruta. Byggd för kärnmålgruppen (45–70) som
 * läser i mobilen – varje oförklarat begrepp är friktion.
 *
 * Användning: <Term id="gront-avdrag">grönt avdrag</Term>
 * Okänt id renderar bara barnen (ingen krasch om en term tas bort).
 */
const TERMS: Record<string, { title: string; body: string }> = {
  "gront-avdrag": {
    title: "Grönt avdrag",
    body: "Statligt avdrag för grön teknik som dras direkt på fakturan – 14,55 % för solceller och 48,5 % för batteri och laddbox. Taket är 50 000 kr per fastighetsägare och år.",
  },
  stodtjanster: {
    title: "Stödtjänster",
    body: "Batteriet hjälper Svenska kraftnät att hålla elnätet i balans och får betalt för att stå redo. Ersättningen varierar med marknadsläget.",
  },
  elomrade: {
    title: "Elområde",
    body: "Sverige är delat i fyra elprisområden. Stockholm ligger i SE3 – spotpriset där avgör vad din el kostar timme för timme.",
  },
  spotpris: {
    title: "Spotpris",
    body: "Elens timpris på elbörsen Nord Pool. Det svänger över dygnet – smart styrning köper när det är billigt och undviker de dyra timmarna.",
  },
};

export function Term({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const t = TERMS[id];
  if (!t) return <>{children}</>;
  return (
    <span className="relative inline-block">
      <button
        type="button"
        aria-expanded={open}
        aria-label={`Förklaring: ${t.title}`}
        onClick={() => setOpen((o) => !o)}
        // Stäng när fokus lämnar – med liten fördröjning så klick i rutan hinner.
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        className="cursor-help text-inherit underline decoration-dotted decoration-ink/40 underline-offset-[3px] hover:decoration-ink/70 transition"
      >
        {children}
      </button>
      {open && (
        <span className="absolute left-1/2 top-full z-40 mt-2 w-72 max-w-[78vw] -translate-x-1/2 rounded-2xl border border-ink/12 bg-bone p-4 text-left shadow-xl shadow-ink/10 font-sans normal-case tracking-normal">
          <span className="block text-[13px] font-medium text-ink">
            {t.title}
          </span>
          <span className="mt-1 block text-[13px] font-normal leading-relaxed text-ink/70">
            {t.body}
          </span>
        </span>
      )}
    </span>
  );
}
