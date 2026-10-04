import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Calculator, X, Check } from "lucide-react";
import { Section } from "@/components/site/Section";
import { BrandPanel } from "@/components/site/BrandPanel";
import { JsonLd, articleSchema } from "@/components/seo/JsonLd";
import {
  AnswerBox,
  Breadcrumbs,
  FaqBlock,
  LastUpdated,
} from "@/components/seo/aeo";
import { KbBody, KbLinkCards, KbSources, snippetOf } from "@/components/kb/KbParts";
import {
  allConcepts,
  batteryGroupHref,
  findBatteryGroup,
  findConcept,
} from "@/lib/batteriskolan";
import { findQuestion } from "@/lib/solcellsfragor";
import { KbHeroImage } from "@/components/kb/KbVisuals";
import { batteryGroupImageKey } from "@/lib/kb-visuals";
import { kbImage } from "@/lib/media";

const BASE = "https://optimeraenergi.se";

export function generateStaticParams() {
  return allConcepts().map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const c = findConcept(params.slug);
  if (!c) return {};
  const path = `/batteriskolan/${c.slug}`;
  return {
    title: c.title,
    description: c.description,
    alternates: { canonical: path },
    openGraph: {
      title: `${c.title} · Batteriskolan`,
      description: c.description,
      url: path,
      type: "article" as const,
      modifiedTime: c.updatedAt,
    },
  };
}

export default function BatteryConceptPage({
  params,
}: {
  params: { slug: string };
}) {
  const c = findConcept(params.slug);
  if (!c) notFound();
  const group = findBatteryGroup(c.group);
  const path = `/batteriskolan/${c.slug}`;

  const relatedConcepts = c.related
    .map((slug) => findConcept(slug))
    .filter((r): r is NonNullable<typeof r> => Boolean(r))
    .map((r) => ({
      href: `/batteriskolan/${r.slug}`,
      eyebrow: r.term,
      title: r.title,
      snippet: snippetOf(r.shortAnswer, 140),
    }));

  const relatedQuestions = (c.questions ?? [])
    .map((slug) => findQuestion(slug))
    .filter((q): q is NonNullable<typeof q> => Boolean(q))
    .map((q) => ({
      href: `/solcellsfragor/${q.slug}`,
      eyebrow: "Solcellsfrågor",
      title: q.question,
      snippet: snippetOf(q.shortAnswer, 140),
    }));

  return (
    <>
      <JsonLd
        data={articleSchema({
          headline: c.title,
          description: c.description,
          url: path,
          datePublished: c.updatedAt,
          dateModified: c.updatedAt,
          type: "TechArticle",
          sources: c.sources,
          keywords: c.searchPhrases,
          articleSection: "Batteriskolan",
        })}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "DefinedTerm",
          "@id": `${BASE}${path}#term`,
          name: c.term,
          description: c.shortAnswer,
          url: `${BASE}${path}`,
          inDefinedTermSet: `${BASE}/batteriskolan#termset`,
        }}
      />

      <section className="container-edge pt-10 md:pt-16 pb-6">
        <Breadcrumbs
          items={[
            { name: "Hem", href: "/" },
            { name: "Batteriskolan", href: "/batteriskolan" },
            ...(group
              ? [{ name: group.title, href: batteryGroupHref(group.slug) }]
              : []),
            { name: c.term, href: path },
          ]}
        />
        {/* Gruppens foto som bildband – alla koncept i gruppen delar det. */}
        <div className="mt-6 md:mt-8 max-w-3xl">
          <KbHeroImage
            image={kbImage(batteryGroupImageKey(c.group))}
            tone="copper"
            label={group ? `Batteriskolan · ${group.title}` : "Batteriskolan"}
          />
        </div>
        <div className="mt-8 max-w-3xl">
          <div className="eyebrow">
            Batteriskolan · {c.term}
          </div>
          <h1 className="mt-5 font-display text-[36px] sm:text-[44px] md:text-[56px] tracking-display-tight leading-[1.08]">
            {c.title}
          </h1>
          <div className="mt-6">
            <LastUpdated date={c.updatedAt} />
          </div>
        </div>
      </section>

      <article className="container-edge pb-16 md:pb-20">
        <div className="max-w-3xl space-y-12">
          <AnswerBox tone="copper">
            <p>{c.shortAnswer}</p>
          </AnswerBox>

          <KbBody sections={c.sections} />

          {c.example && (
            <aside className="rounded-3xl border border-ink/10 bg-cream/50 p-7 md:p-8">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-copper">
                <Calculator size={13} /> Räkneexempel
              </div>
              <h2 className="mt-3 font-display text-xl md:text-2xl tracking-display-tight leading-snug">
                {c.example.title}
              </h2>
              <ul className="mt-4 space-y-2 text-[15px] leading-relaxed text-ink/80">
                {c.example.lines.map((l) => (
                  <li key={l} className="flex gap-3">
                    <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-copper shrink-0" />
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-ink/10 pt-4 text-[13px] leading-relaxed text-ink/55">
                {c.example.note}
              </p>
            </aside>
          )}

          {(c.misconceptions ?? []).length > 0 && (
            <section>
              <h2 className="font-display text-2xl md:text-3xl tracking-display-tight leading-snug mb-5">
                Vanliga missförstånd
              </h2>
              <div className="space-y-4">
                {(c.misconceptions ?? []).map((m) => (
                  <div
                    key={m.myth}
                    className="grid grid-cols-1 gap-4 rounded-3xl border border-ink/10 bg-bone p-6 md:grid-cols-2"
                  >
                    <div className="flex gap-3">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ink/8 text-ink/55">
                        <X size={13} strokeWidth={2.5} />
                      </span>
                      <p className="text-[15px] leading-relaxed text-ink/70">
                        <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink/45 block mb-1">
                          Myt
                        </span>
                        {m.myth}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-moss/15 text-moss">
                        <Check size={13} strokeWidth={2.5} />
                      </span>
                      <p className="text-[15px] leading-relaxed text-ink/85">
                        <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-moss block mb-1">
                          Fakta
                        </span>
                        {m.fact}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {c.faq.length > 0 && (
            <section>
              <h2 className="font-display text-2xl md:text-3xl tracking-display-tight leading-snug mb-5">
                Vanliga frågor
              </h2>
              <FaqBlock items={c.faq} />
            </section>
          )}

          {(c.links ?? []).length > 0 && (
            <div className="flex flex-wrap gap-3">
              {(c.links ?? []).map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-[13.5px] text-ink/75 transition-colors hover:border-ink/40 hover:text-ink"
                >
                  {l.label} <ArrowRight size={14} />
                </Link>
              ))}
            </div>
          )}

          <KbSources sources={c.sources} />

          <KbLinkCards title="Relaterade koncept" items={relatedConcepts} />
          <KbLinkCards title="Relaterade solcellsfrågor" items={relatedQuestions} />

          <Link
            href="/batteriskolan"
            className="inline-flex items-center gap-2 text-[14px] text-ink/70 hover:text-indigo"
          >
            Se alla koncept i Batteriskolan <ArrowRight size={14} />
          </Link>
        </div>
      </article>

      <Section className="!py-16 md:!py-20">
        <BrandPanel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55">
                Vad skulle det betyda för ditt hus?
              </div>
              <h2 className="mt-3 font-display text-3xl md:text-5xl tracking-display-tight leading-tight">
                Räkna på sol och batteri, på 30 sekunder.
              </h2>
            </div>
            <div className="flex flex-col gap-3">
              <Link href="/kalkylator" className="btn-primary justify-center">
                Öppna kalkylatorn <ArrowRight size={16} />
              </Link>
              <Link href="/solcellsbatteri" className="btn-ghost justify-center">
                Solcellsbatteri: pris och storlek
              </Link>
            </div>
          </div>
        </BrandPanel>
      </Section>
    </>
  );
}
