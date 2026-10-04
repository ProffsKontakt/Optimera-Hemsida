import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/site/Section";
import { JsonLd, collectionPageSchema } from "@/components/seo/JsonLd";
import { Breadcrumbs, LastUpdated, CtaBlock } from "@/components/seo/aeo";
import { KbSearch, type KbGroup } from "@/components/kb/KbSearch";
import { snippetOf } from "@/components/kb/KbParts";
import {
  BATTERY_GROUPS,
  allConcepts,
  batteryUpdatedAt,
  conceptsInGroup,
} from "@/lib/batteriskolan";
import { allQuestions } from "@/lib/solcellsfragor";
import { KbHubImage, KbTiles } from "@/components/kb/KbVisuals";
import { KB_HUB_IMAGE, batteryGroupImageKey } from "@/lib/kb-visuals";
import { kbImage } from "@/lib/media";

const PATH = "/batteriskolan";
const BASE = "https://optimeraenergi.se";

export const metadata = {
  title: "Batteriskolan: så fungerar hembatterier, koncept för koncept",
  description:
    "FCR-D, stödtjänster, effektavgift, kvartspris, spotprisstyrning, dimensionering och brandsäkerhet – hembatteriets alla koncept förklarade enkelt, med källor.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Batteriskolan · Optimera Energi",
    description:
      "Hur hembatterier fungerar – FCR-D, effektavgift, kvartspris och mer, förklarat koncept för koncept.",
    url: PATH,
    type: "website" as const,
  },
};

export default function BatterySchoolHub() {
  const concepts = allConcepts();
  const groups: KbGroup[] = BATTERY_GROUPS.map((g) => ({
    id: g.slug,
    title: g.title,
    intro: g.intro,
    image: kbImage(batteryGroupImageKey(g.slug)),
    items: conceptsInGroup(g.slug).map((c) => ({
      href: `${PATH}/${c.slug}`,
      eyebrow: c.term,
      title: c.title,
      snippet: snippetOf(c.shortAnswer, 150),
      keywords: c.searchPhrases.join(" "),
    })),
  })).filter((g) => g.items.length > 0);

  const questionCount = allQuestions().length;

  return (
    <>
      <JsonLd
        data={collectionPageSchema({
          url: PATH,
          name: "Batteriskolan",
          description:
            "Hembatteriets koncept förklarade ett i taget: FCR-D, stödtjänster, effektavgift, kvartspris, dimensionering och säkerhet.",
          items: concepts.map((c) => ({ url: `${PATH}/${c.slug}`, name: c.title })),
        })}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "DefinedTermSet",
          "@id": `${BASE}${PATH}#termset`,
          name: "Batteriskolan",
          url: `${BASE}${PATH}`,
          inLanguage: "sv-SE",
          hasDefinedTerm: concepts.map((c) => ({
            "@type": "DefinedTerm",
            name: c.term,
            description: c.shortAnswer,
            url: `${BASE}${PATH}/${c.slug}`,
          })),
        }}
      />

      <section className="container-edge pt-10 md:pt-16 pb-6">
        <Breadcrumbs
          items={[
            { name: "Hem", href: "/" },
            { name: "Kunskapsbank", href: "/kunskapsbank" },
            { name: "Batteriskolan", href: PATH },
          ]}
        />
        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <div className="eyebrow">Kunskapsbank · {concepts.length} koncept</div>
          <h1 className="mt-5 font-display text-[44px] sm:text-[56px] md:text-[80px] tracking-display-tight leading-[1.05]">
            Batteriskolan.{" "}
            <span className="italic font-serif text-copper">Koncept för koncept.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-ink/70 text-lg leading-relaxed">
            Ett hembatteri är enkelt att använda men fullt av nya ord: FCR-D,
            effektavgift, kvartspris, ö-drift. Här förklarar vi ett koncept i
            taget – vad det är, hur det fungerar och vad det betyder för din
            kalkyl – med källor och utan säljsnack.
          </p>
          <div className="mt-8">
            <LastUpdated date={batteryUpdatedAt()} />
          </div>
        </div>
        <div className="hidden lg:block lg:col-span-5">
          <KbHubImage image={kbImage(KB_HUB_IMAGE.batteriskolan)} tone="copper" />
        </div>
        </div>
      </section>

      {/* Grupperna som bildrutor – hoppar till respektive avsnitt nedan. */}
      <section className="container-edge pt-6 pb-4 md:pt-8">
        <KbTiles
          tone="copper"
          columns={4}
          tiles={groups.map((g) => ({
            href: `${PATH}#${g.id}`,
            title: g.title,
            meta: `${g.items.length} koncept`,
            image: g.image!,
          }))}
        />
      </section>

      <section className="container-edge pt-4 pb-16 md:pb-24">
        <KbSearch
          groups={groups}
          placeholder={`Sök bland ${concepts.length} batterikoncept…`}
          variant="cards"
          tone="copper"
        />
      </section>

      <Section className="!py-12 md:!py-16">
        <Link
          href="/solcellsfragor"
          className="group flex flex-col gap-5 rounded-[28px] border border-ink/10 bg-cream/50 p-8 transition-colors hover:border-ink/30 md:flex-row md:items-center md:justify-between md:p-12"
        >
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-indigo">
              Solcellsfrågor · {questionCount} frågor
            </div>
            <h2 className="mt-3 max-w-2xl font-display text-3xl md:text-4xl tracking-display-tight leading-tight">
              Har du frågor om själva solcellerna? Vi har svarat på det
              svenskar söker mest.
            </h2>
          </div>
          <span className="inline-flex shrink-0 items-center gap-2 text-[14px] text-ink/70 group-hover:text-indigo">
            Till Solcellsfrågor <ArrowRight size={16} />
          </span>
        </Link>
      </Section>

      <Section className="!py-16 md:!py-20">
        <CtaBlock
          eyebrow="Vad skulle ett batteri göra i ditt hus?"
          title={<>Se riktningen i kalkylatorn, eller låt oss mäta din förbrukning.</>}
          primaryHref="/kalkylator"
          primaryLabel="Öppna kalkylatorn"
          secondaryHref="/solcellsbatteri"
          secondaryLabel="Solcellsbatteri: pris och storlek"
        />
      </Section>
    </>
  );
}
