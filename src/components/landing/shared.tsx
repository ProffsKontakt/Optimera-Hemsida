import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/** Fördröjning för inträdes- och skroll-animationer (CSS-variabeln --d). */
export function delay(ms: number): CSSProperties {
  return { "--d": `${ms}ms` } as CSSProperties;
}

/**
 * Sektionshuvud på startsidan: etikett med solprick, stor tvåfärgad rubrik
 * till vänster och en ingress till höger på bred skärm.
 */
export function SectionHead({
  eyebrow,
  title,
  lede,
  tone = "light",
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div className={`grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-10 ${className}`}>
      <div className={lede ? "" : "lg:col-span-2"} data-reveal>
        <div className={`lp-eyebrow ${dark ? "text-white/65" : "text-ink/70"}`}>{eyebrow}</div>
        <h2 className={`lp-h2 mt-5 ${dark ? "text-[#ECEDF5]" : "text-ink"}`}>{title}</h2>
      </div>
      {lede && (
        <p
          className={`lp-lede max-w-[36rem] lg:pb-1.5 ${dark ? "text-white/70" : "text-ink/65"}`}
          data-reveal
          style={delay(120)}
        >
          {lede}
        </p>
      )}
    </div>
  );
}

/**
 * Avslutar en sektion med nästa steg: en linje som ritas in, boka-knappen
 * och en rad om vad det innebär. Används sparsamt (två ställen), annars
 * blir sidan påstridig.
 */
export function NextStep({
  note,
  tone = "light",
  className = "",
}: {
  note: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div className={className}>
      <span
        className={`block h-px ${dark ? "bg-white/25" : "bg-gradient-to-r from-indigo to-sun"}`}
        data-reveal="line"
      />
      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6" data-reveal style={delay(150)}>
        <Link href="/offert" className={dark ? "lp-btn-sun" : "lp-btn-ink"}>
          Boka kostnadsfritt hembesök <ArrowRight size={17} aria-hidden="true" />
        </Link>
        <p className={`max-w-[34rem] text-[15.5px] leading-relaxed ${dark ? "text-white/70" : "text-ink/65"}`}>
          {note}
        </p>
      </div>
    </div>
  );
}

/** Fem stjärnor, fyllda efter betyg (1–5). */
export function Stars({
  rating = 5,
  className = "",
  decorative = false,
}: {
  rating?: number;
  className?: string;
  /** Rent dekorativa stjärnor (betyget står i texten bredvid). */
  decorative?: boolean;
}) {
  return (
    <span
      className={`inline-flex gap-0.5 ${className}`}
      {...(decorative
        ? { "aria-hidden": true }
        : { role: "img", "aria-label": `${rating} av 5 stjärnor` })}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <svg key={n} viewBox="0 0 20 20" className="h-[1em] w-[1em]" aria-hidden="true">
          <path
            d="M10 1.6l2.5 5.3 5.8.7-4.3 4 1.1 5.7L10 14.5l-5.1 2.8 1.1-5.7-4.3-4 5.8-.7z"
            fill="currentColor"
            opacity={n <= Math.round(rating) ? 1 : 0.25}
          />
        </svg>
      ))}
    </span>
  );
}
