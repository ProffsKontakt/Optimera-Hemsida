/**
 * AEO/GEO-byggblock ("answer engine optimization").
 *
 * Återanvändbara, SERVER-renderade innehållsblock som strukturerar en sida så
 * att answer engines (ChatGPT Search, Google AI Overviews/AI Mode, Perplexity,
 * Bing Copilot, Claude Search) lätt kan extrahera, förstå och citera den.
 *
 * Designprinciper:
 *  1. Allt är riktig HTML i initial server-render – inga client-only-block, så
 *     crawlers som inte kör JS ser hela innehållet.
 *  2. Semantik före styling: <table>/<th scope>, <time dateTime>, <nav>, <ol>,
 *     <figure>/<figcaption> så maskiner förstår strukturen.
 *  3. Matchar Optimera Energis designsystem (Section, bone/cream/ink/indigo,
 *     font-display, font-mono-eyebrows) – inga nya visuella språk.
 *
 * Komponenterna importeras samlat:
 *   import { AnswerBox, KeyTakeaways, ComparisonTable, ProsCons, FaqBlock,
 *            RelatedPages, LastUpdated, Breadcrumbs, CtaBlock,
 *            MethodologyCallout } from "@/components/seo/aeo";
 */
import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Clock,
  Info,
  Minus,
} from "lucide-react";
import { Disclosure } from "@/components/site/Disclosure";
import { JsonLd, faqPageSchema, breadcrumbSchema } from "./JsonLd";

/* ------------------------------------------------------------------ *
 * Eyebrow – liten återanvänd label ovanför ett block.
 * ------------------------------------------------------------------ */
function BlockEyebrow({
  children,
  tone = "ink",
}: {
  children: ReactNode;
  tone?: "ink" | "indigo" | "moss";
}) {
  const color =
    tone === "indigo"
      ? "text-indigo"
      : tone === "moss"
        ? "text-moss"
        : "text-ink/55";
  return (
    <div
      className={`font-mono text-[11px] uppercase tracking-[0.18em] ${color}`}
    >
      {children}
    </div>
  );
}

/* ================================================================== *
 * 1. AnswerBox ("Kort svar")
 * En direkt, citerbar sammanfattning nära toppen av en sida. Answer
 * engines plockar ofta första meningen som svar – led därför med en
 * fetstilt kärnmening (skicka <strong>…</strong> som första nod).
 * ================================================================== */
export function AnswerBox({
  question,
  children,
  className = "",
}: {
  /** Frågan sidan besvarar (valfritt, visas som liten rubrik). */
  question?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-3xl border border-indigo/20 bg-indigo/[0.04] p-7 md:p-9 ${className}`}
    >
      <BlockEyebrow tone="indigo">Kort svar</BlockEyebrow>
      {question && (
        <p className="mt-3 font-display text-lg md:text-xl tracking-display-tight leading-snug text-ink/80">
          {question}
        </p>
      )}
      <div className="mt-3 max-w-3xl text-[16px] md:text-[17px] leading-relaxed text-ink/85 [&_a]:text-indigo [&_a]:underline [&_a]:underline-offset-2 [&_strong]:font-semibold [&_strong]:text-ink [&_p+p]:mt-3">
        {children}
      </div>
    </div>
  );
}

/* ================================================================== *
 * 2. KeyTakeaways – punktlista med det viktigaste.
 * ================================================================== */
export function KeyTakeaways({
  title = "Det viktigaste i korthet",
  points,
  className = "",
}: {
  title?: string;
  points: ReactNode[];
  className?: string;
}) {
  return (
    <div
      className={`rounded-3xl border border-ink/10 bg-cream/50 p-7 md:p-8 ${className}`}
    >
      <BlockEyebrow>{title}</BlockEyebrow>
      <ul className="mt-5 space-y-3.5">
        {points.map((p, i) => (
          <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-ink/80">
            <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-indigo/10 text-indigo">
              <Check size={12} strokeWidth={2.5} />
            </span>
            <span className="[&_strong]:font-semibold [&_strong]:text-ink">
              {p}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ================================================================== *
 * 3. ComparisonTable – semantisk, horisontellt scrollbar jämförelse.
 * Riktig <table> med <th scope> så AI/skärmläsare förstår axlarna.
 * Wrappas i overflow-x-auto så bred data aldrig bryter mobil-layouten.
 * ================================================================== */
export function ComparisonTable({
  columns,
  rows,
  caption,
  footnote,
  className = "",
}: {
  /** Kolumnrubriker. Första cellen är rad-etikett-kolumnen. */
  columns: string[];
  /** Varje rad: en etikett (blir <th scope="row">) + celler. */
  rows: { label: ReactNode; cells: ReactNode[] }[];
  /** Kort bildtext/sammanfattning (bra för AI-kontext). */
  caption?: string;
  footnote?: ReactNode;
  className?: string;
}) {
  return (
    <figure className={`m-0 ${className}`}>
      <div className="overflow-x-auto rounded-3xl border border-ink/10">
        <table className="w-full min-w-[600px] border-collapse text-left text-[14.5px]">
          {caption && <caption className="sr-only">{caption}</caption>}
          <thead>
            <tr className="bg-cream/70">
              {columns.map((c, i) => (
                <th
                  key={i}
                  scope="col"
                  className={`border-b border-ink/10 px-5 py-4 font-mono text-[11px] uppercase tracking-[0.14em] text-ink/60 ${
                    i === 0 ? "sticky left-0 bg-cream/70" : ""
                  }`}
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, ri) => (
              <tr key={ri} className="odd:bg-bone even:bg-cream/30">
                <th
                  scope="row"
                  className="sticky left-0 border-b border-ink/8 bg-inherit px-5 py-4 font-display text-[15px] font-normal tracking-display-tight text-ink"
                >
                  {r.label}
                </th>
                {r.cells.map((cell, ci) => (
                  <td
                    key={ci}
                    className="border-b border-ink/8 px-5 py-4 align-top text-ink/75"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {(caption || footnote) && (
        <figcaption className="mt-3 max-w-3xl text-[12.5px] leading-relaxed text-ink/55">
          {footnote ?? caption}
        </figcaption>
      )}
    </figure>
  );
}

/* ================================================================== *
 * 4. ProsCons – "När passar detta / När passar det inte".
 * ================================================================== */
export function ProsCons({
  prosTitle = "När det passar",
  consTitle = "När det inte passar",
  pros,
  cons,
  className = "",
}: {
  prosTitle?: string;
  consTitle?: string;
  pros: ReactNode[];
  cons: ReactNode[];
  className?: string;
}) {
  return (
    <div className={`grid grid-cols-1 gap-5 md:grid-cols-2 ${className}`}>
      <div className="rounded-3xl border border-moss/25 bg-moss/[0.05] p-7 md:p-8">
        <div className="flex items-center gap-2">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-moss/15 text-moss">
            <Check size={13} strokeWidth={2.5} />
          </span>
          <h3 className="font-display text-xl tracking-display-tight">
            {prosTitle}
          </h3>
        </div>
        <ul className="mt-5 space-y-3 text-[14.5px] leading-relaxed text-ink/75">
          {pros.map((p, i) => (
            <li key={i} className="flex gap-3">
              <Check size={16} className="mt-0.5 shrink-0 text-moss" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-3xl border border-ink/12 bg-cream/40 p-7 md:p-8">
        <div className="flex items-center gap-2">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-ink/8 text-ink/60">
            <Minus size={13} strokeWidth={2.5} />
          </span>
          <h3 className="font-display text-xl tracking-display-tight">
            {consTitle}
          </h3>
        </div>
        <ul className="mt-5 space-y-3 text-[14.5px] leading-relaxed text-ink/75">
          {cons.map((c, i) => (
            <li key={i} className="flex gap-3">
              <Minus size={16} className="mt-0.5 shrink-0 text-ink/40" />
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ================================================================== *
 * 5. FaqBlock – synliga frågor/svar (server-HTML via Disclosure) +
 * FAQPage-JSON-LD i ETT anrop. Svaren finns alltid i markupen.
 * ================================================================== */
export function FaqBlock({
  items,
  withSchema = true,
  className = "",
}: {
  items: { q: string; a: string }[];
  /** Sätt false om sidan redan har ett FAQPage-schema (undvik duplicering). */
  withSchema?: boolean;
  className?: string;
}) {
  return (
    <>
      {withSchema && <JsonLd data={faqPageSchema(items)} />}
      <div className={`divide-y divide-ink/10 border-y border-ink/10 ${className}`}>
        {items.map((f, i) => (
          <Disclosure key={i} question={f.q}>
            {f.a}
          </Disclosure>
        ))}
      </div>
    </>
  );
}

/* ================================================================== *
 * 6. RelatedPages – intern länkning med beskrivande ankartext.
 * ================================================================== */
export function RelatedPages({
  links,
  className = "",
}: {
  links: { href: string; label: string; desc?: string }[];
  className?: string;
}) {
  return (
    <div
      className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 ${className}`}
    >
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className="group rounded-3xl border border-ink/10 bg-bone p-6 transition-colors hover:border-ink/30"
        >
          <div className="flex items-start justify-between gap-3">
            <span className="font-display text-lg tracking-display-tight leading-snug text-ink">
              {l.label}
            </span>
            <ArrowRight
              size={16}
              className="mt-1 shrink-0 text-ink/40 transition-transform group-hover:translate-x-0.5 group-hover:text-indigo"
            />
          </div>
          {l.desc && (
            <p className="mt-2 text-[14px] leading-relaxed text-ink/60">
              {l.desc}
            </p>
          )}
        </Link>
      ))}
    </div>
  );
}

/* ================================================================== *
 * 7. LastUpdated – synlig "senast uppdaterad" med maskinläsbar <time>.
 * Server-only (formaterar ett fast ISO-datum, ingen hydration-mismatch).
 * ================================================================== */
const SV_MONTHS = [
  "januari", "februari", "mars", "april", "maj", "juni",
  "juli", "augusti", "september", "oktober", "november", "december",
];

function formatSvDate(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!m) return iso;
  const [, y, mo, d] = m;
  const month = SV_MONTHS[Number(mo) - 1] ?? mo;
  return `${Number(d)} ${month} ${y}`;
}

export function LastUpdated({
  date,
  label = "Senast uppdaterad",
  className = "",
}: {
  /** ISO-datum, t.ex. "2026-07-07". */
  date: string;
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={`inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink/50 ${className}`}
    >
      <Clock size={12} />
      {label}{" "}
      <time dateTime={date} className="text-ink/70">
        {formatSvDate(date)}
      </time>
    </div>
  );
}

/* ================================================================== *
 * 8. Breadcrumbs – synliga brödsmulor + BreadcrumbList-JSON-LD i ett.
 * ================================================================== */
export function Breadcrumbs({
  items,
  className = "",
}: {
  items: { name: string; href: string }[];
  className?: string;
}) {
  return (
    <>
      <JsonLd data={breadcrumbSchema(items)} />
      <nav aria-label="Brödsmulor" className={className}>
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 font-mono text-[11px] uppercase tracking-[0.16em] text-ink/50">
          {items.map((it, i) => {
            const last = i === items.length - 1;
            return (
              <li key={it.href} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className="text-ink/70">
                    {it.name}
                  </span>
                ) : (
                  <>
                    <Link
                      href={it.href}
                      className="transition-colors hover:text-ink"
                    >
                      {it.name}
                    </Link>
                    <ChevronRight size={12} className="text-ink/30" />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

/* ================================================================== *
 * 9. MethodologyCallout – förklarar hur en siffra/rekommendation tas fram.
 * Bygger förtroende (E-E-A-T) och gör att AI kan återge metodiken.
 * ================================================================== */
export function MethodologyCallout({
  title = "Så räknar vi",
  children,
  className = "",
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <aside
      className={`rounded-3xl border border-ink/10 bg-cream/40 p-6 md:p-7 ${className}`}
    >
      <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/55">
        <Info size={13} /> {title}
      </div>
      <div className="mt-3 max-w-2xl text-[14px] leading-relaxed text-ink/70 [&_a]:text-indigo [&_a]:underline [&_a]:underline-offset-2 [&_p+p]:mt-2.5">
        {children}
      </div>
    </aside>
  );
}

/* ================================================================== *
 * 10. CtaBlock – återanvänd offert-CTA (matchar service-sidornas panel).
 * ================================================================== */
export function CtaBlock({
  eyebrow = "Redo att gå vidare?",
  title,
  primaryHref = "/offert",
  primaryLabel = "Begär offert",
  secondaryHref = "/kalkylator",
  secondaryLabel = "Räkna på besparingen",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-start justify-between gap-6 rounded-[28px] border border-ink/10 bg-bone p-10 md:flex-row md:items-center md:p-16 ${className}`}
    >
      <div>
        <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/55">
          {eyebrow}
        </div>
        <h2 className="mt-3 max-w-2xl font-display text-3xl leading-tight tracking-display-tight text-ink md:text-5xl">
          {title}
        </h2>
      </div>
      <div className="flex flex-wrap gap-3">
        <Link href={primaryHref} className="btn-primary">
          {primaryLabel} <ArrowRight size={16} />
        </Link>
        {secondaryHref && (
          <Link href={secondaryHref} className="btn-ghost">
            {secondaryLabel}
          </Link>
        )}
      </div>
    </div>
  );
}
