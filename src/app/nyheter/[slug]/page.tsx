import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Calendar, Clock, ExternalLink } from "lucide-react";
import { Section } from "@/components/site/Section";
import { BrandPanel } from "@/components/site/BrandPanel";
import {
  NEWS,
  findNewsArticle,
  formatNewsDate,
  type NewsArticle,
} from "@/lib/news";
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
          <h1 className="mt-5 font-display text-4xl md:text-5xl tracking-display-tight">
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

      <section className="container-edge pt-12 md:pt-20 pb-10">
        <div className="max-w-3xl">
          {/* Hero-bilden ligger ovanför rubriken – färg och liv direkt. */}
          {img && (
            <div className="mb-8 overflow-hidden rounded-3xl border border-ink/10 aspect-[16/9] bg-cream">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt}
                fetchPriority="high"
                className="h-full w-full object-cover"
              />
            </div>
          )}
          <div className="flex flex-wrap items-center gap-3 mb-5">
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
          <h1 className="font-display text-[40px] md:text-[64px] tracking-display-tight leading-[1.0]">
            {article.title}
          </h1>
          <p className="mt-6 text-ink/70 text-lg leading-relaxed">
            {article.excerpt}
          </p>
        </div>
      </section>

      <article className="container-edge pb-16 md:pb-24">
        <div className="max-w-3xl space-y-10">
          {content?.tldr && (
            <aside className="rounded-2xl border border-indigo/25 bg-indigo/5 p-6">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-indigo mb-3">
                Läget i korthet
              </div>
              <ul className="space-y-2 text-[15px] text-ink/85 leading-relaxed">
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
              <h2 className="font-display text-2xl md:text-3xl tracking-display-tight leading-snug mb-4">
                {s.h2}
              </h2>
              {s.body.map((p, i) => (
                <p
                  key={i}
                  className="mt-3 text-ink/80 text-[15.5px] leading-relaxed"
                >
                  {p}
                </p>
              ))}
              {s.bullets && (
                <ul className="mt-4 space-y-2 text-[15px] text-ink/80">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-indigo shrink-0" />
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
              <div className="space-y-4">
                {content.faq.map((q) => (
                  <details
                    key={q.q}
                    className="rounded-2xl border border-ink/10 bg-bone p-5"
                  >
                    <summary className="cursor-pointer font-display text-lg tracking-display-tight">
                      {q.q}
                    </summary>
                    <p className="mt-3 text-ink/75 text-[14.5px] leading-relaxed">
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
            <ol className="space-y-2.5 text-[14px] leading-relaxed">
              {article.sources.map((s, i) => (
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
              Optimera Energi är partipolitiskt neutralt. Vi bevakar
              energipolitiken för att din kalkyl ska bygga på fakta – inte på
              åsikter. Hittar du ett fel? Mejla{" "}
              <a
                href="mailto:hej@optimeraenergi.se"
                className="underline decoration-ink/30 hover:text-ink"
              >
                hej@optimeraenergi.se
              </a>{" "}
              så rättar vi och noterar ändringen.
            </p>
          </section>
        </div>
      </article>

      <Section className="!py-16 md:!py-20">
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
