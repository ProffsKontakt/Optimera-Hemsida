"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

/**
 * Jargong-förklaring: prickad understrykning på facktermer, tryck öppnar
 * ett litet centrerat förklaringskort med dimmad bakgrund. Byggd för
 * kärnmålgruppen (45–70) som läser i mobilen.
 *
 * Kortet renderas i en portal på <body> och är fixed-centrerat – det kan
 * aldrig klippas av kort/kolumner eller hamna utanför skärmen. Stängs
 * med klick utanför, X-knappen eller Escape.
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

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!t) return <>{children}</>;

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-label={`Förklaring: ${t.title}`}
        onClick={() => setOpen(true)}
        className="cursor-help text-inherit underline decoration-dotted decoration-current underline-offset-[3px] opacity-95 hover:opacity-100 transition"
      >
        {children}
      </button>
      {open &&
        createPortal(
          // Klick var som helst utanför kortet stänger.
          <div
            className="fixed inset-0 z-[70] grid place-items-center p-6"
            onClick={() => setOpen(false)}
          >
            <div
              aria-hidden
              className="absolute inset-0 bg-ink/25 backdrop-blur-[2px]"
            />
            <div
              role="dialog"
              aria-modal="true"
              aria-label={t.title}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm rounded-3xl border border-ink/10 bg-bone p-6 shadow-2xl shadow-ink/20"
            >
              <div className="flex items-start justify-between gap-4">
                <h2 className="font-display text-xl tracking-display-tight text-ink">
                  {t.title}
                </h2>
                <button
                  type="button"
                  aria-label="Stäng"
                  onClick={() => setOpen(false)}
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-ink/15 text-ink/60 hover:text-ink transition"
                >
                  <X size={14} />
                </button>
              </div>
              <p className="mt-3 text-[14.5px] leading-relaxed text-ink/75">
                {t.body}
              </p>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
