import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { KbHubImage } from "@/components/kb/KbVisuals";
import { KB_HUB_IMAGE, guideCategoryImageKey } from "@/lib/kb-visuals";
import { getMedia, kbImage } from "@/lib/media";
import { GUIDES, publishedGuides } from "@/lib/guides";
import { Section } from "@/components/site/Section";
import { JsonLd, collectionPageSchema } from "@/components/seo/JsonLd";

export const metadata = {
  title: "Guider om sol, batteri, värme och laddning",
  description:
    "Långa svar på korta frågor: värmepump, laddbox, elpris och elområden, grönt avdrag, bidrag och återbetalningstid – med källor.",
  alternates: { canonical: "/guider" },
  openGraph: {
    title: "Guider · Optimera Energi",
    description:
      "Långa svar på korta frågor om sol, batteri, värme och laddning.",
    url: "/guider",
    type: "website",
  },
};

export default function GuidesHubPage() {
  // Drafts visas på hubben men markeras som "Snart" så besökaren inte
  // klickar in på en tom sida. De är samtidigt noindex på sin egen route.
  const sorted = [...GUIDES].sort((a, b) => {
    if (a.status !== b.status) return a.status === "published" ? -1 : 1;
    return a.updatedAt < b.updatedAt ? 1 : -1;
  });

  return (
    <>
      <JsonLd
        data={collectionPageSchema({
          url: "/guider",
          name: "Guider om sol, batteri, värme och laddning",
          description:
            "Långa svar på korta frågor om återbetalningstid, grönt avdrag, batteripris och värmepump, skrivna av elektrikerna som faktiskt installerar.",
          items: publishedGuides().map((g) => ({
            url: `/guider/${g.slug}`,
            name: g.title,
          })),
        })}
      />
      <section className="container-edge pt-12 md:pt-20 pb-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <div className="eyebrow">Kunskapsbank · Guider</div>
          <h1 className="mt-5 font-display text-[44px] sm:text-[56px] md:text-[80px] tracking-display-tight leading-[1.15]">
            Långa svar
            <span className="block italic font-serif text-moss">
              på korta frågor.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-ink/70 text-lg leading-relaxed">
            Värmepump, laddbox, elpris och elområden, grönt avdrag, bidrag och
            återbetalningstid. Raka svar med källor du kan klicka dig vidare
            till – för frågorna som inte ryms i Solcellsfrågor och Batteriskolan.
          </p>
        </div>
        <div className="hidden lg:block lg:col-span-5">
          <KbHubImage image={kbImage(KB_HUB_IMAGE.guider)} tone="moss" />
        </div>
        </div>
      </section>

      <Section className="!py-12 md:!py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {sorted.map((g) => {
            const isPublished = g.status === "published";
            // Guidens egen bild om en laddats upp, annars kategorins foto.
            const own = getMedia(`guide:${g.slug}`);
            const cover = own ? { src: own.url, alt: own.alt || g.title } : kbImage(guideCategoryImageKey(g.category));
            const body = (
              <article
                className={[
                  "group rounded-3xl border p-7 md:p-8 h-full flex flex-col overflow-hidden",
                  isPublished
                    ? "border-ink/10 bg-bone hover:border-ink/30"
                    : "border-ink/8 bg-cream/40 cursor-not-allowed",
                ].join(" ")}
              >
                {isPublished && (
                  <div className="relative -mx-7 -mt-7 md:-mx-8 md:-mt-8 mb-6 aspect-[16/9] overflow-hidden bg-cream">
                    <Image
                      src={cover.src}
                      alt={cover.alt}
                      fill
                      sizes="(min-width: 768px) 45vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-moss" />
                  </div>
                )}
                <div className="flex items-baseline justify-between gap-3">
                  <span className={`font-mono text-[10.5px] uppercase tracking-[0.18em] ${isPublished ? "text-moss" : "text-ink/55"}`}>
                    {g.category}
                  </span>
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink/40">
                    {isPublished ? `${g.readTimeMin} min läsning` : "Snart"}
                  </span>
                </div>
                <h2 className="mt-4 font-display text-2xl md:text-[26px] tracking-display-tight leading-tight">
                  {g.title}
                </h2>
                <p className="mt-3 text-ink/70 text-[14.5px] leading-relaxed">
                  {g.excerpt}
                </p>
                <div className="mt-6 pt-5 border-t border-ink/10 flex items-center justify-between gap-3 text-[13px] text-ink/70">
                  {isPublished ? (
                    <>
                      <span className="inline-flex items-center gap-2">
                        Läs guiden <ArrowRight size={14} />
                      </span>
                      {/* Synligt uppdaterat-datum: freshness-signal för
                          Google + AI-search för tidskänsliga ämnen
                          (avdrag, priser, regler). */}
                      <span className="text-ink/45 font-mono text-[10.5px] uppercase tracking-[0.16em]">
                        Uppdaterad {g.updatedAt}
                      </span>
                    </>
                  ) : (
                    <span className="text-ink/45">Publiceras inom kort</span>
                  )}
                </div>
              </article>
            );
            return isPublished ? (
              <Link key={g.slug} href={`/guider/${g.slug}`} className="block">
                {body}
              </Link>
            ) : (
              <div key={g.slug}>{body}</div>
            );
          })}
        </div>
      </Section>
    </>
  );
}
