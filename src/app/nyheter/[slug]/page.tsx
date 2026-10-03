import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, ChevronDown, Clock, ExternalLink } from "lucide-react";
import { Section } from "@/components/site/Section";
import { BrandPanel } from "@/components/site/BrandPanel";
import {
  NEWS,
  findNewsArticle,
  formatNewsDate,
  publishedNews,
  type NewsArticle,
} from "@/lib/news";
import { ShareButton } from "@/components/news/ShareButton";
import { formatHeadline } from "@/lib/hyphenate";
import { getMedia } from "@/lib/media";
import {
  JsonLd,
  faqPageSchema,
  breadcrumbSchema,
} from "@/components/seo/JsonLd";
import { getNewsContent } from "@/lib/news-content";

export function generateStaticParams() {
  return NEWS.map((n) => ({ slug: n.slug }));
}

const BASE = "https://optimeraenergi.se";

/** Admin-uppladdad bild (media-CMS) vinner över den committade. */
function resolveHeroImage(article: NewsArticle) {
  const override = getMedia(`news:${article.slug}`);
  if (override) {
    return {
      src: override.url,
      alt: override.alt || article.image?.alt || article.title,
    };
  }
  return article.image;
}

function absoluteUrl(src: string) {
  return src.startsWith("http") ? src : `${BASE}${src}`;
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const article = findNewsArticle(params.slug);
  if (!article) return {};
  const img = resolveHeroImage(article);
  const baseMeta = {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/nyheter/${article.slug}` },
    openGraph: {
      title: `${article.title} · Optimera Energi`,
      description: article.excerpt,
      url: `/nyheter/${article.slug}`,
      type: "article" as const,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      ...(img ? { images: [{ url: img.src, alt: img.alt }] } : {}),
    },
  };
  if (article.status === "draft") {
    return {
      ...baseMeta,
      // Utkast indexeras inte – de väntar på godkännande.
      robots: { index: false, follow: false },
    };
  }
  return baseMeta;
}

/**
 * NewsArticle-schema med citation-lista. Person-författare (som guiderna)
 * för E-E-A-T, plus källorna som CreativeWork-citations – viktigt för
 * trovärdighet i Google News-ekosystemet och AI-search.
 */
function newsArticleSchema(article: NewsArticle, imageUrl?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "@id": `${BASE}/nyheter/${article.slug}#article`,
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    image: imageUrl ?? `${BASE}/opengraph-image`,
    author: {
      "@type": "Person",
      name: "Viktor Tiberg",
      jobTitle: "Grundare och VD",
      url: `${BASE}/om-oss`,
      worksFor: { "@id": `${BASE}#organization` },
    },
    publisher: { "@id": `${BASE}#organization` },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE}/nyheter/${article.slug}`,
    },
    inLanguage: "sv-SE",
    articleSection: article.category,
    ...(article.searchPhrases?.length
      ? { keywords: article.searchPhrases.join(", ") }
      : {}),
    citation: article.sources.map((s) => ({
      "@type": "CreativeWork",
      name: s.title,
      url: s.url,
      publisher: { "@type": "Organization", name: s.publisher },
    })),
  };
}

export default function NewsArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = findNewsArticle(params.slug);
  if (!article) notFound();
  const content = getNewsContent(article.slug);
  const img = resolveHeroImage(article);

  if (article.status === "draft") {
    return (
      <section className="container-edge pt-20 pb-32">
        <div className="max-w-2xl mx-auto text-center">
          <div className="eyebrow">Snart</div>
          <h1 className="mt-5 font-display text-4xl md:text-5xl tracking-display-tight leading-[1.15]">
            {article.title}
          </h1>
          <p className="mt-6 text-ink/70 leading-relaxed">
            Artikeln granskas just nu och publiceras inom kort. Under tiden
            hittar du alla publicerade nyheter i kunskapsbasen.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/nyheter" className="btn-primary">
              Till nyheterna <ArrowRight size={16} />
            </Link>
            <Link href="/kalkylator" className="btn-ghost">
              Räkna i kalkylatorn
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const showUpdated = article.updatedAt !== article.publishedAt;
  // Tre senaste andra publicerade artiklar.
  const more = publishedNews()
    .filter((n) => n.slug !== article.slug)
    .slice(0, 3);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Hem", href: "/" },
          { name: "Nyheter", href: "/nyheter" },
          { name: article.title, href: `/nyheter/${article.slug}` },
        ])}
      />
      <JsonLd
        data={newsArticleSchema(article, img ? absoluteUrl(img.src) : undefined)}
      />
      {content?.faq && content.faq.length > 0 && (
        <JsonLd data={faqPageSchema(content.faq)} />
      )}

      {/* Läsarvy (okt 2026): optimerad för telefon. Mindre rubrik som inte
          fyller hela skärmen, 17px brödtext, tillbakalänk och fler nyheter
          i slutet så läsaren aldrig hamnar i en återvändsgränd. */}
      <section className="container-edge pt-6 md:pt-16 pb-8 md:pb-10">
        <div className="max-w-3xl">
          <Link
            href="/nyheter"
            className="mb-5 md:mb-8 inline-flex h-10 items-center gap-1.5 text-[14px] text-ink/60 hover:text-ink transition"
          >
            <ArrowLeft size={15} /> Alla nyheter
          </Link>
          {/* Hero-bilden ligger ovanför rubriken – färg och liv direkt. */}
          {img && (
            <div className="mb-6 md:mb-8 overflow-hidden rounded-2xl md:rounded-3xl border border-ink/10 aspect-[16/9] bg-cream">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt}
                fetchPriority="high"
                className="h-full w-full object-cover"
              />
            </div>
          )}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-4 md:mb-5">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/55">
              {article.category}
            </span>
            <span className="flex items-center gap-1.5 font-mono text-[11px] text-ink/45">
              <Clock size={11} /> {article.readTimeMin} min
            </span>
            <span className="flex items-center gap-1.5 font-mono text-[11px] text-ink/45">
              <Calendar size={11} /> Publicerad {formatNewsDate(article.publishedAt)}
            </span>
            {showUpdated && (
              <span className="font-mono text-[11px] text-ink/45">
                Uppdaterad {formatNewsDate(article.updatedAt)}
              </span>
            )}
          </div>
          {/* Mobil: mjuka bindestreck i långa ord (lib/hyphenate.ts) så att
              t.ex. "statsministeromröstning" bryts snyggt i alla webbläsare,
              och radfyllning (pretty) i stället för balansering – balance
              valde annars onödiga brytningar mitt i ord.
              Från sm: bindestrecken ignoreras (hyphens:none) och storleken
              är vald så att även långa ord får plats (64px gav 780px för
              ett ord i en 768px-spalt). */}
          <h1 className="font-display text-[30px] sm:text-[40px] md:text-[52px] lg:text-[56px] tracking-display-tight leading-[1.15] [text-wrap:pretty] sm:[text-wrap:balance] sm:[-webkit-hyphens:none] sm:[hyphens:none]">
            {formatHeadline(article.title, { hyphenate: true })}
          </h1>
          <p className="mt-5 md:mt-6 text-ink/75 text-[18px] md:text-lg leading-relaxed">
            {article.excerpt}
          </p>
        </div>
      </section>

      <article className="container-edge pb-10 md:pb-20">
        <div className="max-w-3xl space-y-10 md:space-y-12">
          {content?.tldr && (
            <aside className="rounded-2xl border border-indigo/25 bg-indigo/5 p-5 md:p-6">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-indigo mb-3">
                Läget i korthet
              </div>
              <ul className="space-y-3 text-[16px] text-ink/85 leading-relaxed">
                {content.tldr.map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-indigo shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </aside>
          )}

          {content?.sections.map((s) => (
            <section key={s.h2}>
              <h2 className="font-display text-[24px] md:text-3xl tracking-display-tight leading-snug mb-3 md:mb-4">
                {s.h2}
              </h2>
              {s.body.map((p, i) => (
                <p
                  key={i}
                  className="mt-4 text-ink/85 text-[17px] leading-[1.7]"
                >
                  {p}
                </p>
              ))}
              {s.bullets && (
                <ul className="mt-5 space-y-3 text-[17px] leading-[1.6] text-ink/85">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span className="mt-[0.6em] h-1.5 w-1.5 rounded-full bg-indigo shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {content?.faq && content.faq.length > 0 && (
            <section>
              <h2 className="font-display text-2xl md:text-3xl tracking-display-tight leading-snug mb-4">
                Vanliga frågor
              </h2>
              <div className="space-y-3">
                {content.faq.map((q) => (
                  <details
                    key={q.q}
                    className="group rounded-2xl border border-ink/10 bg-bone"
                  >
                    {/* Hela raden är tryckyta; egen chevron i stället för
                        webbläsarens ▶-markör. */}
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4 p-5 font-display text-[18px] leading-snug tracking-display-tight [&::-webkit-details-marker]:hidden">
                      <span>{q.q}</span>
                      <ChevronDown
                        size={18}
                        className="mt-1 shrink-0 text-ink/50 transition-transform group-open:rotate-180"
                      />
                    </summary>
                    <p className="px-5 pb-5 -mt-1 text-ink/80 text-[16px] leading-[1.65]">
                      {q.a}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* Källblock: öppna, klickbara källor är artikelseriens
              trovärdighetskontrakt – läsaren ska kunna kontrollera oss. */}
          <section className="rounded-2xl border border-ink/10 bg-bone p-6">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55 mb-4">
              Källor
            </h2>
            <ol className="space-y-1 text-[14.5px] leading-relaxed">
              {article.sources.map((s, i) => (
                <li key={s.url} className="flex gap-3">
                  <span className="font-mono text-[11px] text-ink/40 pt-0.5 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-1.5 text-ink/80 hover:text-ink transition-colors inline-flex items-start justify-between gap-2"
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
              Optimera Energi är partipolitiskt neutralt. Vi bevakar
              energipolitiken för att din kalkyl ska bygga på fakta – inte på
              åsikter. Hittar du ett fel? Mejla{" "}
              <a
                href="mailto:hej@optimeraenergi.se"
                className="inline-block py-1 underline decoration-ink/30 hover:text-ink"
              >
                hej@optimeraenergi.se
              </a>{" "}
              så rättar vi och noterar ändringen.
            </p>
          </section>

          <div className="flex flex-wrap items-center gap-3">
            <ShareButton title={article.title} url={`${BASE}/nyheter/${article.slug}`} />
            <Link
              href="/nyheter"
              className="inline-flex h-11 items-center gap-1.5 rounded-full px-3 text-[14px] text-ink/60 hover:text-ink transition"
            >
              <ArrowLeft size={15} /> Alla nyheter
            </Link>
          </div>

          {/* Fler nyheter – läsaren ska aldrig hamna i en återvändsgränd. */}
          {more.length > 0 && (
            <section>
              <h2 className="font-display text-[24px] md:text-3xl tracking-display-tight leading-snug mb-2">
                Fler nyheter
              </h2>
              <ul className="divide-y divide-ink/10 border-y border-ink/10">
                {more.map((n) => (
                  <li key={n.slug}>
                    <Link
                      href={`/nyheter/${n.slug}`}
                      className="group flex items-start justify-between gap-4 py-4"
                    >
                      <span>
                        <span className="block font-mono text-[11px] uppercase tracking-[0.16em] text-ink/50">
                          {n.category} · {formatNewsDate(n.publishedAt)}
                        </span>
                        <span className="mt-1 block font-display text-[18px] leading-snug tracking-display-tight group-hover:text-indigo transition-colors">
                          {formatHeadline(n.title)}
                        </span>
                      </span>
                      <ArrowRight size={16} className="mt-6 shrink-0 text-ink/40 group-hover:text-indigo transition-colors" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </article>

      <Section className="!pt-4 !pb-16 md:!py-20">
        <BrandPanel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55">
                Vad betyder det för ditt hus?
              </div>
              <h3 className="mt-3 font-display text-3xl md:text-5xl tracking-display-tight leading-tight">
                Räkna på din egen kalkyl, på 30 sekunder.
              </h3>
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
