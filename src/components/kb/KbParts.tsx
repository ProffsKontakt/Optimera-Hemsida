import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import type { KbSection, KbSource } from "@/lib/kb-types";

/**
 * Gemensamma byggblock för kunskapsbankens sidor (Solcellsfrågor och
 * Batteriskolan). Server-renderade, samma designspråk som nyhetssidorna.
 */

/** Löptext: H2-sektioner med stycken och valfria punktlistor. */
export function KbBody({ sections }: { sections: KbSection[] }) {
  return (
    <div className="space-y-10">
      {sections.map((s, i) => (
        <section key={s.h2 ?? i}>
          {s.h2 && (
            <h2 className="font-display text-2xl md:text-3xl tracking-display-tight leading-snug mb-4">
              {s.h2}
            </h2>
          )}
          {s.paragraphs.map((p, j) => (
            <p key={j} className="mt-3 text-ink/80 text-[16px] leading-relaxed">
              {p}
            </p>
          ))}
          {s.bullets && (
            <ul className="mt-4 space-y-2.5 text-[15.5px] text-ink/80">
              {s.bullets.map((b) => (
                <li key={b} className="flex gap-3 leading-relaxed">
                  <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-indigo shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}

/**
 * Källblock + rättelselöfte. Öppna, klickbara källor är databasernas
 * trovärdighetskontrakt – läsaren ska kunna kontrollera oss.
 */
export function KbSources({ sources }: { sources: KbSource[] }) {
  return (
    <section className="rounded-2xl border border-ink/10 bg-bone p-6">
      <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55 mb-4">
        Källor
      </h2>
      <ol className="space-y-2.5 text-[14px] leading-relaxed">
        {sources.map((s, i) => (
          <li key={s.url} className="flex gap-3">
            <span className="font-mono text-[11px] text-ink/40 pt-0.5 shrink-0">
              {String(i + 1).padStart(2, "0")}
            </span>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink/80 hover:text-ink transition-colors inline-flex items-start gap-1.5"
            >
              <span>
                {s.title}
                <span className="text-ink/50"> · {s.publisher}</span>
              </span>
              <ExternalLink size={12} className="mt-1 shrink-0 text-ink/40" />
            </a>
          </li>
        ))}
      </ol>
      <p className="mt-5 pt-4 border-t border-ink/10 text-[12.5px] text-ink/55 leading-relaxed">
        Optimera Energi är partipolitiskt neutralt och skriver svaren utifrån
        källorna ovan. Hittar du ett fel eller något som blivit inaktuellt?
        Mejla{" "}
        <a
          href="mailto:hej@optimeraenergi.se"
          className="underline decoration-ink/30 hover:text-ink"
        >
          hej@optimeraenergi.se
        </a>{" "}
        så rättar vi och noterar ändringen.
      </p>
    </section>
  );
}

/** Länkkort till närliggande sidor i databaserna. */
export function KbLinkCards({
  title,
  items,
}: {
  title: string;
  items: { href: string; eyebrow?: string; title: string; snippet?: string }[];
}) {
  if (items.length === 0) return null;
  return (
    <section>
      <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55 mb-4">
        {title}
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {items.map((it) => (
          <Link
            key={it.href}
            href={it.href}
            className="group flex flex-col rounded-3xl border border-ink/10 bg-bone p-6 transition-colors hover:border-ink/30"
          >
            {it.eyebrow && (
              <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-indigo">
                {it.eyebrow}
              </span>
            )}
            <span className="mt-2 flex items-start justify-between gap-3">
              <span className="font-display text-lg tracking-display-tight leading-snug text-ink">
                {it.title}
              </span>
              <ArrowRight
                size={16}
                className="mt-1 shrink-0 text-ink/35 transition-transform group-hover:translate-x-0.5 group-hover:text-indigo"
              />
            </span>
            {it.snippet && (
              <span className="mt-2 text-[14px] leading-relaxed text-ink/60 line-clamp-3">
                {it.snippet}
              </span>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}

/** Kort text för listor och schema: första meningen eller avkortad. */
export function snippetOf(text: string, max = 160): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max)}…`;
}
