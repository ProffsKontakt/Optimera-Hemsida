"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import { ArrowRight, Search, X } from "lucide-react";

/**
 * Sök i kunskapsbanken. Hela listan renderas i initial server-HTML (tom
 * sökning = allt visas grupperat), så crawlers och AI-sök ser varje fråga
 * och varje koncept. Filtreringen sker sedan i webbläsaren.
 *
 * Matchningen ignorerar skiftläge och diakritiska tecken, så "pa vintern"
 * hittar "på vintern". Alla sökord måste finnas någonstans i titel,
 * ingress, grupp eller nyckelord (sökfraserna folk faktiskt använder).
 */

export type KbItem = {
  href: string;
  title: string;
  snippet?: string;
  /** Liten etikett ovanför titeln, t.ex. konceptets term. */
  eyebrow?: string;
  /** Extra söktext som inte visas, t.ex. riktiga sökfraser. */
  keywords?: string;
};

export type KbGroup = {
  id: string;
  title: string;
  intro?: string;
  items: KbItem[];
};

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function KbSearch({
  groups,
  placeholder,
  variant = "list",
  showAllWhenEmpty = true,
  footer,
}: {
  groups: KbGroup[];
  placeholder: string;
  /** Hur grupperna visas när sökfältet är tomt. */
  variant?: "list" | "cards";
  /** false = visa bara träffar (t.ex. på kunskapsbankens samlingssida). */
  showAllWhenEmpty?: boolean;
  footer?: ReactNode;
}) {
  const [query, setQuery] = useState("");

  const index = useMemo(
    () =>
      groups.flatMap((g) =>
        g.items.map((item) => ({
          item,
          group: g.title,
          text: normalize(
            [item.title, item.snippet, item.eyebrow, item.keywords, g.title]
              .filter(Boolean)
              .join(" "),
          ),
        })),
      ),
    [groups],
  );

  const words = normalize(query).split(" ").filter(Boolean);
  const hits =
    words.length === 0
      ? []
      : index.filter((e) => words.every((w) => e.text.includes(w)));

  return (
    <div>
      <div className="relative max-w-2xl">
        <Search
          size={18}
          className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-ink/40"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          aria-label={placeholder}
          className="w-full rounded-full border border-ink/15 bg-bone py-4 pl-12 pr-12 text-[16px] text-ink placeholder:text-ink/40 outline-none transition focus:border-indigo/50 focus:ring-4 focus:ring-indigo/10"
        />
        {query && (
          <button
            type="button"
            aria-label="Rensa sökningen"
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-ink/50 hover:bg-ink/5 hover:text-ink"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div aria-live="polite" className="sr-only">
        {words.length > 0 ? `${hits.length} träffar` : ""}
      </div>

      {words.length > 0 ? (
        <div className="mt-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/50">
            {hits.length === 0
              ? "Inga träffar"
              : `${hits.length} ${hits.length === 1 ? "träff" : "träffar"}`}
          </p>
          {hits.length === 0 ? (
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink/70">
              Vi har inte besvarat just det ännu. Prova ett annat ord, eller
              mejla frågan till{" "}
              <a
                href="mailto:hej@optimeraenergi.se"
                className="text-indigo underline underline-offset-2"
              >
                hej@optimeraenergi.se
              </a>{" "}
              – nya frågor läggs till löpande.
            </p>
          ) : (
            <ul className="mt-4 divide-y divide-ink/10 border-y border-ink/10">
              {hits.slice(0, 40).map(({ item, group }) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-start justify-between gap-4 py-5"
                  >
                    <span>
                      <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink/45">
                        {item.eyebrow ? `${group} · ${item.eyebrow}` : group}
                      </span>
                      <span className="mt-1.5 block font-display text-lg md:text-xl tracking-display-tight leading-snug text-ink">
                        {item.title}
                      </span>
                      {item.snippet && (
                        <span className="mt-1.5 block max-w-3xl text-[14px] leading-relaxed text-ink/60 line-clamp-2">
                          {item.snippet}
                        </span>
                      )}
                    </span>
                    <ArrowRight
                      size={16}
                      className="mt-7 shrink-0 text-ink/35 transition-transform group-hover:translate-x-0.5 group-hover:text-indigo"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        showAllWhenEmpty && (
          <div className="mt-12 space-y-16">
            {groups.map((g) => (
              <section key={g.id} id={g.id} className="scroll-mt-28">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h2 className="font-display text-3xl md:text-4xl tracking-display-tight leading-tight">
                    {g.title}
                  </h2>
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/45">
                    {g.items.length} {variant === "cards" ? "koncept" : "frågor"}
                  </span>
                </div>
                {g.intro && (
                  <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink/65">
                    {g.intro}
                  </p>
                )}
                {variant === "cards" ? (
                  <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {g.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="group flex flex-col rounded-3xl border border-ink/10 bg-bone p-6 transition-colors hover:border-ink/30"
                      >
                        {item.eyebrow && (
                          <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-indigo">
                            {item.eyebrow}
                          </span>
                        )}
                        <span className="mt-3 font-display text-xl tracking-display-tight leading-snug text-ink">
                          {item.title}
                        </span>
                        {item.snippet && (
                          <span className="mt-2.5 text-[14px] leading-relaxed text-ink/60 line-clamp-3">
                            {item.snippet}
                          </span>
                        )}
                        <span className="mt-auto pt-5 inline-flex items-center gap-2 text-[13px] text-ink/60 group-hover:text-indigo">
                          Läs mer <ArrowRight size={14} />
                        </span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <ul className="mt-7 grid grid-cols-1 gap-x-8 sm:grid-cols-2 border-t border-ink/10">
                    {g.items.map((item) => (
                      <li key={item.href} className="border-b border-ink/10">
                        <Link
                          href={item.href}
                          className="group flex items-start justify-between gap-4 py-4"
                        >
                          <span className="text-[15.5px] leading-snug text-ink/85 group-hover:text-ink">
                            {item.title}
                          </span>
                          <ArrowRight
                            size={15}
                            className="mt-1 shrink-0 text-ink/30 transition-transform group-hover:translate-x-0.5 group-hover:text-indigo"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        )
      )}
      {footer}
    </div>
  );
}
