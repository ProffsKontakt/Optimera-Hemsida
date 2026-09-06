import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NEWS, publishedNews, formatNewsDate } from "@/lib/news";
import { getMedia } from "@/lib/media";
import { Section } from "@/components/site/Section";
import { JsonLd, collectionPageSchema } from "@/components/seo/JsonLd";

export const metadata = {
  title: "Nyheter om el, solceller och energipolitik",
  description:
    "Valet 2026, elpriser, stöd och avdrag. Vi bevakar energinyheterna som påverkar din elkostnad och skriver ner vad de faktiskt betyder för dig som villaägare – neutralt och alltid med källor.",
  alternates: { canonical: "/nyheter" },
  openGraph: {
    title: "Nyheter · Optimera Energi",
    description:
      "Energinyheterna som påverkar din elräkning – valet 2026, elpriser, stöd och avdrag. Ny artikel var tredje dag.",
    url: "/nyheter",
    type: "website",
  },
};

export default function NewsHubPage() {
  // Publicerade artiklar nyast först; drafts sist som "Snart" (de är
  // noindex på sin egen route och exkluderade ur sitemap tills de
  // godkänts och bytt status).
  const sorted = [...NEWS].sort((a, b) => {
    if (a.status !== b.status) return a.status === "published" ? -1 : 1;
    return a.publishedAt < b.publishedAt ? 1 : -1;
  });

  return (
    <>
      <JsonLd
        data={collectionPageSchema({
          url: "/nyheter",
          name: "Nyheter om el, solceller och energipolitik",
          description:
            "Energinyheterna som påverkar din elkostnad – valet 2026, elpriser, stöd och avdrag – förklarade för villaägare, med källor.",
          items: publishedNews().map((n) => ({
            url: `/nyheter/${n.slug}`,
            name: n.title,
          })),
        })}
      />
      <section className="container-edge pt-12 md:pt-20 pb-12">
        <div className="max-w-3xl">
          <div className="eyebrow">Nyheter · Kunskapsbas</div>
          <h1 className="mt-5 font-display text-[44px] sm:text-[56px] md:text-[80px] tracking-display-tight leading-[0.95]">
            Nyheterna som påverkar
            <br />
            <span className="italic font-serif text-indigo">
              din elräkning.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-ink/70 text-lg leading-relaxed">
            Riksdagsvalet, elpriserna, stöden och avdragen. Vi läser
            nyhetsflödet så att du slipper – och skriver ner vad det faktiskt
            betyder för dig som äger eller funderar på solceller, batteri
            eller värmepump. Ny artikel var tredje dag. Partipolitiskt
            neutralt, alltid med källor.
          </p>
        </div>
      </section>

      <Section className="!py-12 md:!py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {sorted.map((n) => {
            const isPublished = n.status === "published";
            // Admin-uppladdad bild (media-CMS, slot news:<slug>) vinner
            // över den committade standardbilden.
            const override = getMedia(`news:${n.slug}`);
            const img = override
              ? {
                  src: override.url,
                  alt: override.alt || n.image?.alt || n.title,
                }
              : n.image;
            const body = (
              <article
                className={[
                  "rounded-3xl border overflow-hidden h-full flex flex-col",
                  isPublished
                    ? "border-ink/10 bg-bone hover:border-ink/30"
                    : "border-ink/8 bg-cream/40 cursor-not-allowed",
                ].join(" ")}
              >
                {/* Hero-bild ovanför rubriken – färg och liv på hubben. */}
                {img && isPublished && (
                  <div className="aspect-[16/9] bg-cream border-b border-ink/8">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div className="p-7 md:p-8 flex-1 flex flex-col">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink/55">
                      {n.category}
                    </span>
                    {/* Synligt publiceringsdatum: freshness-signal för
                        Google + AI-search och ärlighetssignal för läsaren. */}
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink/40">
                      {isPublished ? formatNewsDate(n.publishedAt) : "Snart"}
                    </span>
                  </div>
                  <h2 className="mt-4 font-display text-2xl md:text-[26px] tracking-display-tight leading-tight">
                    {n.title}
                  </h2>
                  <p className="mt-3 text-ink/70 text-[14.5px] leading-relaxed">
                    {n.excerpt}
                  </p>
                  <div className="mt-6 pt-5 border-t border-ink/10 flex items-center justify-between gap-3 text-[13px] text-ink/70">
                    {isPublished ? (
                      <>
                        <span className="inline-flex items-center gap-2">
                          Läs artikeln <ArrowRight size={14} />
                        </span>
                        <span className="text-ink/45 font-mono text-[10.5px] uppercase tracking-[0.16em]">
                          {n.readTimeMin} min läsning
                        </span>
                      </>
                    ) : (
                      <span className="text-ink/45">
                        Granskas – publiceras inom kort
                      </span>
                    )}
                  </div>
                </div>
              </article>
            );
            return isPublished ? (
              <Link key={n.slug} href={`/nyheter/${n.slug}`} className="block">
                {body}
              </Link>
            ) : (
              <div key={n.slug}>{body}</div>
            );
          })}
        </div>
      </Section>
    </>
  );
}
