import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BatteryCharging, BookOpen, Newspaper, Sun } from "lucide-react";
import { KbHubImage } from "@/components/kb/KbVisuals";
import { KB_HUB_IMAGE, KB_TONES, type KbImage, type KbTone } from "@/lib/kb-visuals";
import { getMedia, kbImage } from "@/lib/media";
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
  title: "Kunskapsbank: nyheter, solcellsfrågor, Batteriskolan och guider",
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
  const latest = news[0];
  const latestOverride = latest ? getMedia(`news:${latest.slug}`) : null;
  const latestNewsImage: KbImage = latestOverride
    ? { src: latestOverride.url, alt: latestOverride.alt || latest.title }
    : latest?.image ?? kbImage("bat-ekonomi");

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
    tone: KbTone;
    image: KbImage;
    eyebrow: string;
    title: string;
    text: string;
    items: { href: string; label: string; meta?: string }[];
  }[] = [
    {
      href: "/nyheter",
      icon: <Newspaper size={18} />,
      tone: "sun",
      image: latestNewsImage,
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
      tone: "indigo",
      image: kbImage(KB_HUB_IMAGE.solcellsfragor),
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
      tone: "copper",
      image: kbImage(KB_HUB_IMAGE.batteriskolan),
      eyebrow: `Batteriskolan · ${concepts.length} koncept`,
      title: "Så fungerar hembatterier, koncept för koncept",
      text: "FCR-D, effektavgift, kvartspris, ö-drift och brandsäkerhet – förklarat enkelt, utan säljsnack.",
      items: concepts.slice(0, 3).map((c) => ({
        href: `/batteriskolan/${c.slug}`,
        label: c.title,
      })),
    },
    {
      href: "/guider",
      icon: <BookOpen size={18} />,
      tone: "moss",
      image: kbImage(KB_HUB_IMAGE.guider),
      eyebrow: `Guider · ${guides.length} guider`,
      title: "Fördjupning om värmepump, laddbox och elpris",
      text: "Värmepump, laddbox, spotpris och elområden, bidrag och avdrag – raka svar först, alltid med källor.",
      items: guides.slice(0, 3).map((g) => ({
        href: `/guider/${g.slug}`,
        label: g.title,
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
        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <div className="eyebrow">Kunskapsbank</div>
          <h1 className="mt-5 font-display text-[44px] sm:text-[56px] md:text-[80px] tracking-display-tight leading-[1.05]">
            Kunskap om sol,{" "}
            <span className="italic font-serif text-indigo">batteri och el.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-ink/70 text-lg leading-relaxed">
            Fyra databaser på ett ställe: nyheterna som påverkar din elräkning,
            svar på frågorna svenskar söker på om solceller, Batteriskolan där
            hembatteriets koncept förklaras ett i taget, och guider om
            värmepump, laddbox och elpris. Allt med källor – så att du kan
            kontrollera oss.
          </p>
        </div>
        <div className="hidden lg:block lg:col-span-5">
          <KbHubImage image={kbImage(KB_HUB_IMAGE.kunskapsbank)} tone="indigo" />
        </div>
        </div>
      </section>

      <section className="container-edge pt-4 pb-0 md:pb-4">
        <KbSearch
          groups={searchGroups}
          placeholder="Sök i hela kunskapsbanken…"
          showAllWhenEmpty={false}
        />
      </section>

      <Section className="!pt-4 !pb-16 md:!pb-20">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {databases.map((d) => (
            <div
              key={d.href}
              className="group/card flex flex-col overflow-hidden rounded-3xl border border-ink/10 bg-bone p-7 md:p-8"
            >
              {/* Omslagsbild i databasens färg, med ikonen som märke. */}
              <Link
                href={d.href}
                tabIndex={-1}
                aria-hidden
                className="relative -mx-7 -mt-7 md:-mx-8 md:-mt-8 mb-6 block aspect-[16/9] overflow-hidden bg-cream"
              >
                <Image
                  src={d.image.src}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover/card:scale-[1.03]"
                />
                <span className={`absolute inset-x-0 top-0 h-1.5 ${KB_TONES[d.tone].bar}`} />
                <span
                  className={`absolute bottom-4 left-4 grid h-11 w-11 place-items-center rounded-full shadow-md ${KB_TONES[d.tone].chip}`}
                >
                  {d.icon}
                </span>
              </Link>
              <div className={`font-mono text-[10.5px] uppercase tracking-[0.18em] ${KB_TONES[d.tone].text}`}>
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
                className={`mt-auto pt-6 inline-flex items-center gap-2 text-[14px] font-medium ${KB_TONES[d.tone].text}`}
              >
                Öppna {d.eyebrow.split(" · ")[0]} <ArrowRight size={15} />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5">
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

        {/* Kontakt försvann ur toppmenyn när kunskapsbanken tog dess plats –
            här är vägen vidare för den som inte hittar sitt svar. */}
        <div className="mt-5 flex flex-col gap-4 rounded-3xl border border-ink/10 bg-bone p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div>
            <div className="font-display text-xl md:text-2xl tracking-display-tight">
              Hittar du inte svaret?
            </div>
            <p className="mt-1 text-[14.5px] text-ink/65">
              Fråga oss direkt – det du undrar över blir ofta nästa sida här.
            </p>
          </div>
          <Link href="/kontakt" className="btn-primary shrink-0 justify-center">
            Kontakta oss <ArrowRight size={16} />
          </Link>
        </div>
      </Section>
    </>
  );
}
