import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Section } from "@/components/site/Section";
import { BrandPanel } from "@/components/site/BrandPanel";
import { GUIDES, findGuide } from "@/lib/guides";
import {
  JsonLd,
  faqPageSchema,
  breadcrumbSchema,
} from "@/components/seo/JsonLd";
import { getGuideContent } from "@/lib/guide-content";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const guide = findGuide(params.slug);
  if (!guide) return {};
  const baseMeta = {
    title: guide.title,
    description: guide.excerpt,
    alternates: { canonical: `/guider/${guide.slug}` },
    openGraph: {
      title: `${guide.title} · Optimera Energi`,
      description: guide.excerpt,
      url: `/guider/${guide.slug}`,
      type: "article" as const,
    },
  };
  if (guide.status === "draft") {
    return {
      ...baseMeta,
      // Drafts indexeras inte – placeholders får inte vara i SERP.
      robots: { index: false, follow: false },
    };
  }
  return baseMeta;
}

const BASE = "https://optimeraenergi.se";

function articleSchema(guide: ReturnType<typeof findGuide>) {
  if (!guide) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.excerpt,
    datePublished: guide.updatedAt,
    dateModified: guide.updatedAt,
    author: {
      "@type": "Organization",
      name: "Optimera Energi Sverige AB",
      url: BASE,
    },
    publisher: { "@id": `${BASE}#organization` },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE}/guider/${guide.slug}`,
    },
    inLanguage: "sv-SE",
    articleSection: guide.category,
  };
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const guide = findGuide(params.slug);
  if (!guide) notFound();
  const content = getGuideContent(guide.slug);

  if (guide.status === "draft") {
    return (
      <section className="container-edge pt-20 pb-32">
        <div className="max-w-2xl mx-auto text-center">
          <div className="eyebrow">Snart</div>
          <h1 className="mt-5 font-display text-4xl md:text-5xl tracking-display-tight">
            {guide.title}
          </h1>
          <p className="mt-6 text-ink/70 leading-relaxed">
            Vi skriver klart den här guiden inom kort. Under tiden kan du
            räkna på din lösning i kalkylatorn eller boka ett hembesök.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/kalkylator" className="btn-primary">
              Räkna i kalkylatorn <ArrowRight size={16} />
            </Link>
            <Link href="/guider" className="btn-ghost">
              Tillbaka till guider
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Hem", href: "/" },
          { name: "Guider", href: "/guider" },
          { name: guide.title, href: `/guider/${guide.slug}` },
        ])}
      />
      <JsonLd data={articleSchema(guide)!} />
      {content?.faq && content.faq.length > 0 && (
        <JsonLd data={faqPageSchema(content.faq)} />
      )}

      <section className="container-edge pt-12 md:pt-20 pb-10">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/55">
              {guide.category}
            </span>
            <span className="flex items-center gap-1.5 font-mono text-[11px] text-ink/45">
              <Clock size={11} /> {guide.readTimeMin} min
            </span>
            <span className="flex items-center gap-1.5 font-mono text-[11px] text-ink/45">
              <Calendar size={11} /> Uppdaterad {guide.updatedAt}
            </span>
          </div>
          <h1 className="font-display text-[40px] md:text-[64px] tracking-display-tight leading-[1.0]">
            {guide.title}
          </h1>
          <p className="mt-6 text-ink/70 text-lg leading-relaxed">
            {guide.excerpt}
          </p>
        </div>
      </section>

      <article className="container-edge pb-16 md:pb-24">
        <div className="max-w-3xl space-y-10">
          {content?.tldr && (
            <aside className="rounded-2xl border border-indigo/25 bg-indigo/5 p-6">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-indigo mb-3">
                Kort svar
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
        </div>
      </article>

      <Section className="!py-16 md:!py-20">
        <BrandPanel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55">
                Räkna på din lösning
              </div>
              <h3 className="mt-3 font-display text-3xl md:text-5xl tracking-display-tight leading-tight">
                Siffror i 3D, på 30 sekunder.
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
