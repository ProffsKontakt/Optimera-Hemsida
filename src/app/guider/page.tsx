import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GUIDES, publishedGuides } from "@/lib/guides";
import { Section } from "@/components/site/Section";
import { JsonLd, collectionPageSchema } from "@/components/seo/JsonLd";

export const metadata = {
  title: "Guider om sol, batteri, värme och laddning",
  description:
    "Långa svar på korta frågor. Återbetalningstid, grönt avdrag, batteripris, värmepump och allt däremellan, skrivet av elektrikerna som faktiskt installerar.",
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
        <div className="max-w-3xl">
          <div className="eyebrow">Guider · Tankar från taket</div>
          <h1 className="mt-5 font-display text-[44px] sm:text-[56px] md:text-[80px] tracking-display-tight leading-[0.95]">
            Långa svar
            <br />
            <span className="italic font-serif text-indigo">
              på korta frågor.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-ink/70 text-lg leading-relaxed">
            Återbetalningstid, grönt avdrag, batteripris, värmepump och allt
            däremellan. Skrivet av elektrikerna som faktiskt installerar, inte
            av marknadsavdelningen.
          </p>
        </div>
      </section>

      <Section className="!py-12 md:!py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {sorted.map((g) => {
            const isPublished = g.status === "published";
            const body = (
              <article
                className={[
                  "rounded-3xl border p-7 md:p-8 h-full flex flex-col",
                  isPublished
                    ? "border-ink/10 bg-bone hover:border-ink/30"
                    : "border-ink/8 bg-cream/40 cursor-not-allowed",
                ].join(" ")}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink/55">
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
                <div className="mt-6 pt-5 border-t border-ink/10 flex items-center gap-2 text-[13px] text-ink/70">
                  {isPublished ? (
                    <>
                      Läs guiden <ArrowRight size={14} />
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
