import type { CSSProperties, ReactNode } from "react";

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
    <div className={`grid gap-6 md:grid-cols-12 md:items-end md:gap-10 ${className}`}>
      <div className="md:col-span-7" data-reveal>
        <div className={`lp-eyebrow ${dark ? "text-white/60" : "text-ink/55"}`}>{eyebrow}</div>
        <h2 className={`lp-h2 mt-5 ${dark ? "text-[#ECEDF5]" : "text-ink"}`}>{title}</h2>
      </div>
      {lede && (
        <p
          className={`lp-lede md:col-span-5 md:pb-2 ${dark ? "text-white/70" : "text-ink/65"}`}
          data-reveal
          style={delay(120)}
        >
          {lede}
        </p>
      )}
    </div>
  );
}

/** Fem stjärnor, fyllda efter betyg (1–5). */
export function Stars({ rating = 5, className = "" }: { rating?: number; className?: string }) {
  return (
    <span className={`inline-flex gap-0.5 ${className}`} aria-label={`${rating} av 5 stjärnor`} role="img">
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
