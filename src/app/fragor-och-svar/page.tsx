import { Section } from "@/components/site/Section";
import { JsonLd, faqPageSchema, collectionPageSchema } from "@/components/seo/JsonLd";
import {
  FaqBlock,
  Breadcrumbs,
  RelatedPages,
  LastUpdated,
  CtaBlock,
} from "@/components/seo/aeo";
import { FAQ_REVIEWED_AT } from "@/lib/faq-review";
import { FAQ_CATEGORIES } from "@/lib/faq-content";
import { seoTitle } from "@/lib/seo-title";

const PATH = "/fragor-och-svar";
// Faktagranskas varje vecka av kunskapsbankens rutin – se lib/faq-review.ts.
const UPDATED = FAQ_REVIEWED_AT;

export const metadata = {
  title: seoTitle("Frågor och svar om solceller, batteri och grönt avdrag"),
  description:
    "Vanliga frågor och raka svar om solcellsbatteri, solceller, pris, grönt avdrag, stödtjänster och hur Optimera Energi arbetar. Samlade svar för villaägare i Stockholm.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Frågor och svar – Optimera Energi",
    description:
      "Raka svar om solcellsbatteri, solceller, pris, grönt avdrag och stödtjänster för villaägare.",
    url: PATH,
    type: "website",
  },
};

/* -------------------------------------------------------------------------- *
 * FAQ-hub. Svaren är hämtade och sammanställda från Optimera Energis egna
 * sidor (tjänster, kalkylator, batteri-stadssidor, om oss). Ett enda samlat
 * FAQPage-schema emitteras för hela sidan; kategorierna renderas med
 * withSchema={false} för att undvika dubblerade scheman.
 * -------------------------------------------------------------------------- */

const CATEGORIES = FAQ_CATEGORIES;

const ALL_ITEMS = CATEGORIES.flatMap((c) => c.items);

const RELATED = [
  {
    href: "/solcellsfragor",
    label: "Solcellsfrågor",
    desc: "Svar på de frågor svenskar oftast söker på om solceller – en sida per fråga, med källor.",
  },
  {
    href: "/batteriskolan",
    label: "Batteriskolan",
    desc: "FCR-D, effektavgift, kvartspris och andra batterikoncept förklarade ett i taget.",
  },
  {
    href: "/solcellsbatteri",
    label: "Solcellsbatteri till villa",
    desc: "Pris, storlek, grönt avdrag och batterimärken – vår pelarsida om batteri.",
  },
  {
    href: "/kalkylator",
    label: "Räkna på sol och batteri",
    desc: "Bygg din lösning i 3D och se riktningen på återbetalningen.",
  },
  {
    href: "/metodik",
    label: "Vår metodik",
    desc: "Hur vi väljer produkter, sätter pris och när vi säger nej.",
  },
];

export default function FaqHubPage() {
  return (
    <>
      {/* Ett samlat FAQPage-schema för hela sidan. */}
      <JsonLd data={faqPageSchema(ALL_ITEMS)} />
      <JsonLd
        data={collectionPageSchema({
          url: PATH,
          name: "Frågor och svar om solceller, batteri och grönt avdrag",
          description:
            "Samlade frågor och svar om solcellsbatteri, solceller, pris, grönt avdrag och stödtjänster.",
          items: CATEGORIES.map((c) => ({
            url: `${PATH}#${slugify(c.heading)}`,
            name: c.heading,
          })),
        })}
      />

      {/* Hero */}
      <section className="container-edge pt-10 md:pt-16 pb-4">
        <Breadcrumbs
          items={[
            { name: "Hem", href: "/" },
            { name: "Frågor och svar", href: PATH },
          ]}
        />
        <div className="mt-8 max-w-3xl">
          <div className="eyebrow">Kunskap · vanliga frågor</div>
          <h1 className="mt-5 font-display text-[44px] sm:text-[56px] md:text-[80px] tracking-display-tight leading-[1.15]">
            Frågor och{" "}
            <span className="italic font-serif text-indigo">svar.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-ink/70 text-lg leading-relaxed">
            Raka svar på det villaägare oftast frågar oss om solcellsbatteri,
            solceller, pris, grönt avdrag och stödtjänster. Hittar du inte ditt
            svar? Ring oss på 076 305 37 32.
          </p>
          <div className="mt-8">
            <LastUpdated date={UPDATED} label="Faktagranskad" />
          </div>
        </div>
      </section>

      {CATEGORIES.map((cat) => (
        <Section
          key={cat.heading}
          eyebrow={cat.eyebrow}
          title={<>{cat.heading}</>}
          className="!py-14 md:!py-16"
        >
          <div id={slugify(cat.heading)} className="scroll-mt-28" />
          {/* withSchema={false}: schemat emitteras samlat överst. */}
          <FaqBlock items={cat.items} withSchema={false} />
        </Section>
      ))}

      {/* Relaterat */}
      <Section
        eyebrow="Läs vidare"
        title={<>Fördjupa dig.</>}
        className="!py-16 md:!py-20"
      >
        <RelatedPages links={RELATED} />
      </Section>

      {/* CTA */}
      <Section className="!py-16 md:!py-20">
        <CtaBlock
          title={<>Fortfarande frågor? Ta dem på ett kostnadsfritt hembesök.</>}
          primaryHref="/offert"
          primaryLabel="Boka hembesök"
          secondaryHref="/kontakt"
          secondaryLabel="Se kontaktuppgifter"
        />
      </Section>
    </>
  );
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/å|ä/g, "a")
    .replace(/ö/g, "o")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
