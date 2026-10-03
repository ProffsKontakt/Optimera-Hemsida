import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/site/Section";
import { BrandPanel } from "@/components/site/BrandPanel";
import { JsonLd, faqPageSchema } from "@/components/seo/JsonLd";
import { AnswerBox, Breadcrumbs, LastUpdated } from "@/components/seo/aeo";
import { KbBody, KbLinkCards, KbSources, snippetOf } from "@/components/kb/KbParts";
import {
  allQuestions,
  findQuestion,
  findSolarCategory,
  solarCategoryHref,
} from "@/lib/solcellsfragor";
import { findConcept } from "@/lib/batteriskolan";

export function generateStaticParams() {
  return allQuestions().map((q) => ({ slug: q.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const q = findQuestion(params.slug);
  if (!q) return {};
  const path = `/solcellsfragor/${q.slug}`;
  return {
    title: q.question,
    description: q.description,
    alternates: { canonical: path },
    openGraph: {
      title: `${q.question} · Optimera Energi`,
      description: q.description,
      url: path,
      type: "article" as const,
      modifiedTime: q.updatedAt,
    },
  };
}

export default function SolarQuestionPage({
  params,
}: {
  params: { slug: string };
}) {
  const q = findQuestion(params.slug);
  if (!q) notFound();
  const category = findSolarCategory(q.category);
  const path = `/solcellsfragor/${q.slug}`;

  const related = q.related
    .map((slug) => findQuestion(slug))
    .filter((r): r is NonNullable<typeof r> => Boolean(r))
    .map((r) => ({
      href: `/solcellsfragor/${r.slug}`,
      title: r.question,
      snippet: snippetOf(r.shortAnswer, 140),
    }));

  const concepts = (q.concepts ?? [])
    .map((slug) => findConcept(slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c))
    .map((c) => ({
      href: `/batteriskolan/${c.slug}`,
      eyebrow: `Batteriskolan · ${c.term}`,
      title: c.title,
      snippet: snippetOf(c.shortAnswer, 140),
    }));

  // Svaret i schemat ska motsvara det synliga svaret på sidan.
  const schemaAnswer = [
    q.shortAnswer,
    ...q.body.flatMap((s) => [...s.paragraphs, ...(s.bullets ?? [])]),
  ].join(" ");

  return (
    <>
      <JsonLd data={faqPageSchema([{ q: q.question, a: schemaAnswer }])} />

      <section className="container-edge pt-10 md:pt-16 pb-6">
        <Breadcrumbs
          items={[
            { name: "Hem", href: "/" },
            { name: "Solcellsfrågor", href: "/solcellsfragor" },
            ...(category
              ? [{ name: category.title, href: solarCategoryHref(category.slug) }]
              : []),
            { name: q.question, href: path },
          ]}
        />
        <div className="mt-8 max-w-3xl">
          <div className="eyebrow">
            Solcellsfrågor{category ? ` · ${category.title}` : ""}
          </div>
          <h1 className="mt-5 font-display text-[36px] sm:text-[44px] md:text-[56px] tracking-display-tight leading-[1.08]">
            {q.question}
          </h1>
          <div className="mt-6">
            <LastUpdated date={q.updatedAt} />
          </div>
        </div>
      </section>

      <article className="container-edge pb-16 md:pb-20">
        <div className="max-w-3xl space-y-10">
          <AnswerBox>
            <p>{q.shortAnswer}</p>
          </AnswerBox>

          <KbBody sections={q.body} />

          {(q.links ?? []).length > 0 && (
            <div className="flex flex-wrap gap-3">
              {(q.links ?? []).map((l) => (
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

          <KbSources sources={q.sources} />

          <KbLinkCards title="Läs mer i Batteriskolan" items={concepts} />
          <KbLinkCards title="Relaterade frågor" items={related} />

          <Link
            href="/solcellsfragor"
            className="inline-flex items-center gap-2 text-[14px] text-ink/70 hover:text-indigo"
          >
            Se alla solcellsfrågor <ArrowRight size={14} />
          </Link>
        </div>
      </article>

      <Section className="!py-16 md:!py-20">
        <BrandPanel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55">
                Vad betyder det för ditt hus?
              </div>
              <h2 className="mt-3 font-display text-3xl md:text-5xl tracking-display-tight leading-tight">
                Räkna på din egen kalkyl, på 30 sekunder.
              </h2>
            </div>
            <div className="flex flex-col gap-3">
              <Link href="/kalkylator" className="btn-primary justify-center">
                Öppna kalkylatorn <ArrowRight size={16} />
              </Link>
              <Link href="/offert" className="btn-ghost justify-center">
                Eller boka hembesök
              </Link>
            </div>
          </div>
        </BrandPanel>
      </Section>
    </>
  );
}
