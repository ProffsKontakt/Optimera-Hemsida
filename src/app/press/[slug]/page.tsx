import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Mail, Phone } from "lucide-react";
import { Section } from "@/components/site/Section";
import { BrandPanel } from "@/components/site/BrandPanel";
import {
  JsonLd,
  breadcrumbSchema,
} from "@/components/seo/JsonLd";
import { getAllPressReleases, getPressRelease } from "@/lib/press";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://optimeraenergi.se";

export function generateStaticParams() {
  return getAllPressReleases().map((r) => ({ slug: r.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const r = getPressRelease(params.slug);
  if (!r) return {};
  return {
    title: r.title,
    description: r.lede,
    alternates: { canonical: `/press/${r.slug}` },
    openGraph: {
      title: r.title,
      description: r.lede,
      url: `/press/${r.slug}`,
      type: "article",
      publishedTime: r.date,
    },
  };
}

function telHref(phone: string): string {
  // tel:-länkar mår bäst av rena siffror med + framför landskoden.
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("46")) return `tel:+${digits}`;
  if (digits.startsWith("0")) return `tel:+46${digits.slice(1)}`;
  return `tel:+${digits}`;
}

function newsArticleSchema(r: ReturnType<typeof getPressRelease>) {
  if (!r) return null;
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: r.title,
    description: r.lede,
    datePublished: r.date,
    dateModified: r.date,
    image: `${BASE}/opengraph-image`,
    author: {
      "@type": "Person",
      name: r.author.name,
      jobTitle: r.author.title,
      email: r.author.email,
      telephone: r.author.phone,
      worksFor: { "@id": `${BASE}#organization` },
    },
    publisher: { "@id": `${BASE}#organization` },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE}/press/${r.slug}`,
    },
    inLanguage: "sv-SE",
  };
}

export default function PressDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const r = getPressRelease(params.slug);
  if (!r) notFound();

  // Brödtext: dela på blanka rader till stycken. Render som <p>.
  const paragraphs = r.body.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Hem", href: "/" },
          { name: "Press", href: "/press" },
          { name: r.title, href: `/press/${r.slug}` },
        ])}
      />
      <JsonLd data={newsArticleSchema(r)!} />

      <section className="container-edge pt-12 md:pt-20 pb-8">
        <div className="max-w-3xl">
          <Link
            href="/press"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/55 hover:text-ink transition mb-8"
          >
            <ArrowLeft size={12} /> Press
          </Link>
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55">
            Pressmeddelande · {r.date} · Stockholm
          </div>
          <h1 className="mt-5 font-display text-[40px] md:text-[64px] tracking-display-tight leading-[1.0]">
            {r.title}
          </h1>
          <p className="mt-6 text-ink/75 text-lg leading-relaxed">{r.lede}</p>
        </div>
      </section>

      <article className="container-edge pb-12">
        <div className="max-w-3xl space-y-5 text-[16px] md:text-[17px] text-ink/80 leading-relaxed">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}

          {r.quote && (
            <blockquote className="rounded-3xl border-l-4 border-indigo bg-cream/40 p-7 my-8">
              <p className="font-display text-xl md:text-2xl tracking-display-tight leading-snug text-ink">
                &ldquo;{r.quote.text}&rdquo;
              </p>
              <footer className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/55">
                {r.quote.attribution}
              </footer>
            </blockquote>
          )}
        </div>
      </article>

      {/* Mediakontakt */}
      <Section className="!py-12 md:!py-16">
        <BrandPanel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55">
                Mediakontakt
              </div>
              <h3 className="mt-3 font-display text-2xl md:text-3xl tracking-display-tight leading-tight">
                {r.author.name}
              </h3>
              <p className="mt-2 text-ink/65 text-[14px]">{r.author.title}</p>
            </div>
            <div className="space-y-2 text-[14px]">
              <a
                href={`mailto:${r.author.email}`}
                className="inline-flex items-center gap-2 text-ink hover:text-indigo transition"
              >
                <Mail size={14} /> {r.author.email}
              </a>
              <div>
                <a
                  href={telHref(r.author.phone)}
                  className="inline-flex items-center gap-2 text-ink hover:text-indigo transition"
                >
                  <Phone size={14} /> {r.author.phone}
                </a>
              </div>
            </div>
          </div>
        </BrandPanel>
      </Section>
    </>
  );
}
