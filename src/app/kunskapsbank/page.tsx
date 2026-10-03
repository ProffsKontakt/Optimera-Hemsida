import Link from "next/link";
import { ArrowRight, BatteryCharging, BookOpen, Newspaper, Sun } from "lucide-react";
import { Section } from "@/components/site/Section";
import { JsonLd, collectionPageSchema } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/aeo";
import { KbSearch, type KbGroup } from "@/components/kb/KbSearch";
import { snippetOf } from "@/components/kb/KbParts";
import { publishedNews, formatNewsDate } from "@/lib/news";
import { allQuestions } from "@/lib/solcellsfragor";
import { allConcepts } from "@/lib/batteriskolan";
import { publishedGuides } from "@/lib/guides";

const PATH = "/kunskapsbank";

export const metadata = {
  title: "Kunskapsbank: nyheter, solcellsfrågor och Batteriskolan",
  description:
    "Allt om sol, batteri och el på ett ställe: energinyheterna som påverkar din elräkning, svar på det svenskar söker om solceller och hembatteriets koncept förklarade – alltid med källor.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Kunskapsbank · Optimera Energi",
    description:
      "Nyheter, Solcellsfrågor och Batteriskolan – kunskap om sol, batteri och el, alltid med källor.",
    url: PATH,
    type: "website" as const,
  },
};

export default function KnowledgeBankPage() {
  const news = publishedNews();
  const questions = allQuestions();
  const concepts = allConcepts();
  const guides = publishedGuides();

  const searchGroups: KbGroup[] = [
    {
      id: "sok-nyheter",
      title: "Nyheter",
      items: news.map((n) => ({
        href: `/nyheter/${n.slug}`,
        title: n.title,
        snippet: snippetOf(n.excerpt),
        keywords: (n.searchPhrases ?? []).join(" "),
      })),
    },
    {
      id: "sok-solcellsfragor",
      title: "Solcellsfrågor",
      items: questions.map((q) => ({
        href: `/solcellsfragor/${q.slug}`,
        title: q.question,
        snippet: snippetOf(q.shortAnswer),
        keywords: q.searchPhrases.join(" "),
      })),
    },
    {
      id: "sok-batteriskolan",
      title: "Batteriskolan",
      items: concepts.map((c) => ({
        href: `/batteriskolan/${c.slug}`,
        eyebrow: c.term,
        title: c.title,
        snippet: snippetOf(c.shortAnswer),
        keywords: c.searchPhrases.join(" "),
      })),
    },
    {
      id: "sok-guider",
      title: "Guider",
      items: guides.map((g) => ({ href: `/guider/${g.slug}`, title: g.title })),
    },
  ];

  const databases: {
    href: string;
    icon: React.ReactNode;
    accent: string;
    eyebrow: string;
    title: string;
    text: string;
    items: { href: string; label: string; meta?: string }[];
  }[] = [
    {
      href: "/nyheter",
      icon: <Newspaper size={18} />,
      accent: "bg-sun text-ink",
      eyebrow: `Nyheter · ny artikel var tredje dag`,
      title: "Nyheterna som påverkar din elräkning",
      text: "Valet, elpriserna, stöden och avdragen – vad de faktiskt betyder för dig som villaägare. Partipolitiskt neutralt, alltid med källor.",
      items: news.slice(0, 3).map((n) => ({
        href: `/nyheter/${n.slug}`,
        label: n.title,
        meta: formatNewsDate(n.publishedAt),
      })),
    },
    {
      href: "/solcellsfragor",
      icon: <Sun size={18} />,
      accent: "bg-indigo text-bone",
      eyebrow: `Solcellsfrågor · ${questions.length} frågor`,
      title: "Svar på det svenskar söker om solceller",
      text: "Pris, lönsamhet, produktion, bygglov, skatt och säkerhet – en sida per fråga, raka svar först.",
      items: questions.slice(0, 3).map((q) => ({
        href: `/solcellsfragor/${q.slug}`,
        label: q.question,
      })),
    },
    {
      href: "/batteriskolan",
      icon: <BatteryCharging size={18} />,
      accent: "bg-copper text-bone",
      eyebrow: `Batteriskolan · ${concepts.length} koncept`,
      title: "Så fungerar hembatterier, koncept för koncept",
      text: "FCR-D, effektavgift, kvartspris, ö-drift och brandsäkerhet – förklarat enkelt, utan säljsnack.",
      items: concepts.slice(0, 3).map((c) => ({
        href: `/batteriskolan/${c.slug}`,
        label: c.title,
      })),
    },
  ];

  return (
    <>
      <JsonLd
        data={collectionPageSchema({
          url: PATH,
          name: "Kunskapsbank",
          description:
            "Nyheter, Solcellsfrågor och Batteriskolan – Optimera Energis samlade kunskap om sol, batteri och el.",
          items: [
            { url: "/nyheter", name: "Nyheter" },
            { url: "/solcellsfragor", name: "Solcellsfrågor" },
            { url: "/batteriskolan", name: "Batteriskolan" },
            { url: "/guider", name: "Guider" },
          ],
        })}
      />

      <section className="container-edge pt-10 md:pt-16 pb-6">
        <Breadcrumbs
          items={[
            { name: "Hem", href: "/" },
            { name: "Kunskapsbank", href: PATH },
          ]}
        />
        <div className="mt-8 max-w-3xl">
          <div className="eyebrow">Kunskapsbank</div>
          <h1 className="mt-5 font-display text-[44px] sm:text-[56px] md:text-[80px] tracking-display-tight leading-[1.05]">
            Kunskap om sol,{" "}
            <span className="italic font-serif text-indigo">batteri och el.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-ink/70 text-lg leading-relaxed">
            Tre databaser på ett ställe: nyheterna som påverkar din elräkning,
            svar på frågorna svenskar söker på om solceller, och Batteriskolan
            där hembatteriets koncept förklaras ett i taget. Allt med källor –
            så att du kan kontrollera oss.
          </p>
        </div>
      </section>

      <section className="container-edge pt-4 pb-12">
        <KbSearch
          groups={searchGroups}
          placeholder="Sök i hela kunskapsbanken…"
          showAllWhenEmpty={false}
        />
      </section>

      <Section className="!pt-4 !pb-16 md:!pb-20">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {databases.map((d) => (
            <div
              key={d.href}
              className="flex flex-col rounded-3xl border border-ink/10 bg-bone p-7 md:p-8"
            >
              <span className={`grid h-10 w-10 place-items-center rounded-full ${d.accent}`}>
                {d.icon}
              </span>
              <div className="mt-5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink/50">
                {d.eyebrow}
              </div>
              <h2 className="mt-3 font-display text-2xl md:text-[28px] tracking-display-tight leading-tight">
                <Link href={d.href} className="hover:text-indigo transition-colors">
                  {d.title}
                </Link>
              </h2>
              <p className="mt-3 text-[14.5px] leading-relaxed text-ink/65">{d.text}</p>
              {d.items.length > 0 && (
                <ul className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
                  {d.items.map((it) => (
                    <li key={it.href}>
                      <Link
                        href={it.href}
                        className="group flex items-start justify-between gap-3 py-3.5 text-[14px] leading-snug text-ink/80 hover:text-ink"
                      >
                        <span>
                          {it.label}
                          {it.meta && (
                            <span className="block mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/40">
                              {it.meta}
                            </span>
                          )}
                        </span>
                        <ArrowRight
                          size={14}
                          className="mt-0.5 shrink-0 text-ink/30 group-hover:text-indigo"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              <Link
                href={d.href}
                className="mt-auto pt-6 inline-flex items-center gap-2 text-[14px] font-medium text-indigo"
              >
                Öppna {d.eyebrow.split(" · ")[0]} <ArrowRight size={15} />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          <Link
            href="/guider"
            className="group flex items-center justify-between gap-4 rounded-3xl border border-ink/10 bg-cream/50 p-6 transition-colors hover:border-ink/30"
          >
            <span className="flex items-center gap-4">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-moss text-bone">
                <BookOpen size={18} />
              </span>
              <span>
                <span className="block font-display text-xl tracking-display-tight">Guider</span>
                <span className="block text-[13.5px] text-ink/60">
                  Fördjupning om pris, grönt avdrag och återbetalningstid.
                </span>
              </span>
            </span>
            <ArrowRight size={16} className="shrink-0 text-ink/35 group-hover:text-indigo" />
          </Link>
          <Link
            href="/fragor-och-svar"
            className="group flex items-center justify-between gap-4 rounded-3xl border border-ink/10 bg-cream/50 p-6 transition-colors hover:border-ink/30"
          >
            <span className="flex items-center gap-4">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-graphite text-bone">
                <BookOpen size={18} />
              </span>
              <span>
                <span className="block font-display text-xl tracking-display-tight">
                  Frågor om oss
                </span>
                <span className="block text-[13.5px] text-ink/60">
                  Hembesök, garanti, märken och hur vi arbetar.
                </span>
              </span>
            </span>
            <ArrowRight size={16} className="shrink-0 text-ink/35 group-hover:text-indigo" />
          </Link>
        </div>
      </Section>
    </>
  );
}
