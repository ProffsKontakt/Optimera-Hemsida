import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock } from "lucide-react";
import { GUIDES, findGuide, guideReviewLabel, publishedGuides } from "@/lib/guides";
import { getGuideContent } from "@/lib/guide-content";
import { VISIBLE_SERVICES } from "@/lib/services";
import { getMedia, kbImage } from "@/lib/media";
import { KbHeroImage } from "@/components/kb/KbVisuals";
import { guideCategoryImageKey } from "@/lib/kb-visuals";
import { JsonLd, articleSchema } from "@/components/seo/JsonLd";
import { AnswerBox, Breadcrumbs, CtaBlock, FaqBlock, LastUpdated } from "@/components/seo/aeo";
import { KbSources } from "@/components/kb/KbParts";
import { keepNumbersTogether as nb } from "@/lib/hyphenate";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const guide = findGuide(params.slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.excerpt,
    alternates: { canonical: `/guider/${guide.slug}` },
    openGraph: {
      title: `${guide.title} · Optimera Energi`,
      description: guide.excerpt,
      url: `/guider/${guide.slug}`,
      type: "article" as const,
      modifiedTime: guide.updatedAt,
    },
    // Utkast indexeras inte – platshållare får inte synas i sökresultat.
    ...(guide.status === "draft" ? { robots: { index: false, follow: false } } : {}),
  };
}

/** Stabilt ankar-id av en rubrik: "Vad är spotpris?" -> "vad-ar-spotpris". */
function anchorId(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const guide = findGuide(params.slug);
  if (!guide) notFound();
  const content = getGuideContent(guide.slug);
  const heroImage = getMedia(`guide:${guide.slug}`);
  // Guidens egen bild om en laddats upp, annars kategorins foto.
  const hero = heroImage
    ? { src: heroImage.url, alt: heroImage.alt || guide.title }
    : kbImage(guideCategoryImageKey(guide.category));
  const path = `/guider/${guide.slug}`;

  if (guide.status === "draft") {
    return (
      <section className="container-edge pt-20 pb-32">
        <div className="max-w-2xl mx-auto text-center">
          <div className="eyebrow">Snart</div>
          <h1 className="mt-5 font-display text-4xl md:text-5xl tracking-display-tight leading-[1.15]">
            {guide.title}
          </h1>
          <p className="mt-6 text-ink/70 leading-relaxed">
            Vi skriver klart den här guiden inom kort. Under tiden kan du
            räkna på din lösning i kalkylatorn eller läsa vidare i kunskapsbanken.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/kalkylator" className="btn-primary">
              Räkna i kalkylatorn <ArrowRight size={16} />
            </Link>
            <Link href="/kunskapsbank" className="btn-ghost">
              Till kunskapsbanken
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const sections = content?.sections ?? [];
  const sources = guide.sources ?? [];
  const services = VISIBLE_SERVICES.filter((s) => guide.services?.includes(s.slug));
  const more = publishedGuides()
    .filter((g) => g.slug !== guide.slug)
    .sort((a, b) => (a.category === guide.category ? 0 : 1) - (b.category === guide.category ? 0 : 1))
    .slice(0, 3);

  return (
    <>
      <JsonLd
        data={articleSchema({
          headline: guide.title,
          description: guide.excerpt,
          url: path,
          datePublished: guide.publishedAt ?? guide.updatedAt,
          dateModified: guide.updatedAt,
          image: hero.src,
          sources,
          keywords: guide.searchPhrases,
          articleSection: `Guider · ${guide.category}`,
        })}
      />

      <section className="container-edge pt-10 md:pt-16 pb-6">
        <Breadcrumbs
          items={[
            { name: "Hem", href: "/" },
            { name: "Kunskapsbank", href: "/kunskapsbank" },
            { name: "Guider", href: "/guider" },
            { name: guide.title, href: path },
          ]}
        />
        <div className="mt-6 md:mt-8 max-w-3xl">
          <KbHeroImage image={hero} tone="moss" label={`Guider · ${guide.category}`} />
        </div>
        <div className="mt-8 max-w-3xl">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <span className="eyebrow !text-moss">Guider · {guide.category}</span>
            <span className="flex items-center gap-1.5 font-mono text-[11px] text-ink/45">
              <Clock size={11} /> {guide.readTimeMin} min
            </span>
          </div>
          <h1 className="mt-5 font-display text-[36px] sm:text-[44px] md:text-[56px] tracking-display-tight leading-[1.08] [text-wrap:balance]">
            {guide.title}
          </h1>
          <p className="mt-6 text-ink/70 text-lg leading-relaxed">{guide.excerpt}</p>
          <div className="mt-5">
            <LastUpdated date={guide.updatedAt} label={guideReviewLabel(guide)} />
          </div>
        </div>
      </section>

      <article className="container-edge pb-16 md:pb-20">
        <div className="max-w-3xl space-y-10">
          {/* Kort svar först – det stycke AI-motorer och Googles utdrag
              oftast lyfter. Äldre guider har punkter i stället. */}
          {content?.answer ? (
            <AnswerBox tone="moss">
              <p>{nb(content.answer)}</p>
            </AnswerBox>
          ) : (
            content?.tldr && (
              <AnswerBox tone="moss">
                <ul className="space-y-2">
                  {content.tldr.map((t) => (
                    <li key={t} className="flex gap-3">
                      <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-moss shrink-0" />
                      <span>{nb(t)}</span>
                    </li>
                  ))}
                </ul>
              </AnswerBox>
            )
          )}

          {content?.keyFacts && content.keyFacts.length > 0 && (
            <section aria-labelledby="fakta">
              <h2 id="fakta" className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55 mb-3">
                Fakta i siffror
              </h2>
              <dl className="grid grid-cols-1 sm:grid-cols-2 rounded-2xl border border-ink/10 bg-bone overflow-hidden">
                {content.keyFacts.map((f) => (
                  <div
                    key={f.label}
                    className="border-b border-ink/10 sm:odd:border-r sm:last:odd:col-span-2 sm:last:odd:border-r-0 p-4 md:p-5 -mb-px"
                  >
                    <dt className="text-[13px] text-ink/60 leading-snug">{f.label}</dt>
                    <dd className="mt-1 font-display text-[20px] leading-snug tracking-display-tight">{nb(f.value)}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {sections.length >= 4 && (
            <nav aria-label="Innehåll" className="border-l-2 border-ink/10 pl-5">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55 mb-2">
                På den här sidan
              </div>
              <ol className="space-y-0.5 text-[15px]">
                {sections.map((s) => (
                  <li key={s.h2}>
                    <a href={`#${anchorId(s.h2)}`} className="inline-block py-1.5 text-ink/70 hover:text-indigo transition-colors">
                      {s.h2}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          {sections.map((s) => (
            <section key={s.h2} id={anchorId(s.h2)} className="scroll-mt-28">
              <h2 className="font-display text-2xl md:text-3xl tracking-display-tight leading-snug mb-4">{s.h2}</h2>
              {s.body.map((p, i) => (
                <p key={i} className="mt-3 text-ink/80 text-[16px] md:text-[16.5px] leading-[1.7]">
                  {nb(p)}
                </p>
              ))}
              {s.bullets && (
                <ul className="mt-4 space-y-2.5 text-[16px] leading-[1.6] text-ink/80">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span className="mt-[0.6em] h-1.5 w-1.5 rounded-full bg-moss shrink-0" />
                      <span>{nb(b)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {/* FaqBlock lägger själv ut FAQPage-schemat. */}
          {content?.faq && content.faq.length > 0 && (
            <section>
              <h2 className="font-display text-2xl md:text-3xl tracking-display-tight leading-snug mb-4">Vanliga frågor</h2>
              <FaqBlock items={content.faq.map((f) => ({ q: f.q, a: nb(f.a) }))} />
            </section>
          )}

          {sources.length > 0 && <KbSources sources={sources} />}

          {(services.length > 0 || more.length > 0) && (
            <div className="flex flex-wrap gap-3">
              {services.map((s) => (
                <Link
                  key={s.slug}
                  href={`/tjanster/${s.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-[13.5px] text-ink/75 transition-colors hover:border-ink/40 hover:text-ink"
                >
                  {s.name} <ArrowRight size={14} />
                </Link>
              ))}
              {more.map((g) => (
                <Link
                  key={g.slug}
                  href={`/guider/${g.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-[13.5px] text-ink/75 transition-colors hover:border-ink/40 hover:text-ink"
                >
                  {g.title} <ArrowRight size={14} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </article>

      <section className="container-edge pb-16 md:pb-24">
        <CtaBlock
          eyebrow="Vad betyder det för ditt hus?"
          title="Räkna på din egen kalkyl, på 30 sekunder."
          primaryHref="/kalkylator"
          primaryLabel="Öppna kalkylatorn"
          secondaryHref="/offert"
          secondaryLabel="Eller boka hembesök"
        />
      </section>
    </>
  );
}
