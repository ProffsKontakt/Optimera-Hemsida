import { CalcConfigurator } from "@/components/calc/CalcConfigurator";
import { Section } from "@/components/site/Section";
import {
  FaqBlock,
  KeyTakeaways,
  MethodologyCallout,
  RelatedPages,
  Breadcrumbs,
  CtaBlock,
} from "@/components/seo/aeo";

export const metadata = {
  title: "Kalkylator – räkna på solceller, batteri och laddbox",
  description:
    "Designa solceller, batteri och laddbox i en 3D-modell och se vilken riktning återbetalningen tar. Exakta siffror och pris för just din bostad räknar en tekniker fram vid ett kostnadsfritt hembesök.",
  alternates: { canonical: "/kalkylator" },
  openGraph: {
    title: "Kalkylator – Optimera Energi",
    description:
      "Bygg din energilösning i 3D och se riktningen. Exakta siffror räknar vi fram vid hembesöket.",
    url: "/kalkylator",
    type: "website",
  },
};

// FAQ renderas nu BÅDE som synlig text (FaqBlock) och som FAQPage-schema, så
// att strukturerad data matchar synligt innehåll. Hjälper AI-search (ChatGPT,
// Gemini, Perplexity) och Google AI Overviews hitta direkta svar-passager.
const FAQ = [
  {
    q: "Hur stort grönt teknik-avdrag får jag på solpaneler och batteri?",
    a: "Solpaneler ger 14,55 % grönt avdrag, batterier 48,5 % (förutsatt att huset har en sol-anläggning), laddboxar 48,5 %, och värmepumpar 30 % ROT-avdrag. Avdragstaket är 50 000 kr per fastighetsägare och år.",
  },
  {
    q: "Hur lång är återbetalningstiden för sol och batteri?",
    a: "Det beror på om du redan har solceller, batteristorlek, elområde och förbrukning. Att lägga ett batteri till befintliga solceller är ofta den snabbaste affären – typiskt runt 2–5 år. En helt ny sol- och batterilösning tar oftast 4–7,5 år, solceller ensamt längre. Exakt siffra för just din bostad räknar vi fram vid hembesöket.",
  },
  {
    q: "Vilka batterimärken installerar Optimera Energi?",
    a: "Vi installerar Easyway (7,68 kWh per modul, LFP-kemi), SAJ HS3 (10/15/20 kWh-SKUer med inbyggd 12 kW växelriktare), och Emaldo Power Store (5,12 kWh per powerbox).",
  },
  {
    q: "Vad tjänar ett batteri på smarta funktioner?",
    a: "Ett batteri skapar värde på flera sätt beroende på var du bor och hur du använder el: spotprisoptimering, stödtjänster (FCR-D / aFRR) mot Svenska Kraftnät, effektkapning (peak-shaving) och högre egen förbrukning av solelen. Vår EMS väljer automatiskt det som är mest lönsamt för just din bostad.",
  },
  {
    q: "Vad kostar ett hembesök?",
    a: "Hembesöket är kostnadsfritt och utan förpliktelser. Vi gör en drönarbesiktning av taket, går igenom era förutsättningar och val, och lämnar en offert där priset på offerten alltid är priset på fakturan.",
  },
  {
    q: "Kan jag få exakta siffror direkt i kalkylatorn?",
    a: "Nej, och det är ett medvetet val. En kalkylator känner inte ditt tak, din förbrukning eller ditt elområde fullt ut. Kalkylatorn visar vilken riktning en lösning tar – exakta siffror och pris räknar en tekniker fram och går igenom med dig vid hembesöket, så du kan lita på dem.",
  },
];

const RELATED = [
  {
    href: "/solcellsbatteri",
    label: "Solcellsbatteri till villa",
    desc: "Pris, storlek och grönt avdrag för batteri – innan du räknar.",
  },
  {
    href: "/tjanster/batterier",
    label: "Batterilager – tjänsten",
    desc: "Så dimensionerar och installerar vi batterier.",
  },
  {
    href: "/offert",
    label: "Boka kostnadsfritt hembesök",
    desc: "Nästa steg efter kalkylatorn: exakt pris och storlek för ditt hus.",
  },
];

export default function CalculatorPage() {
  return (
    <>
      <section className="container-edge pt-10 md:pt-16 pb-6">
        <Breadcrumbs
          items={[
            { name: "Hem", href: "/" },
            { name: "Kalkylator", href: "/kalkylator" },
          ]}
        />
        <div className="mt-8 max-w-3xl">
          <div className="eyebrow">Kalkylator · bygg din lösning i 3D</div>
          <h1 className="mt-5 font-display text-[44px] sm:text-[56px] md:text-[88px] tracking-display-tight leading-[0.95]">
            Vad vill du ha,
            <br />
            <span className="italic font-serif text-indigo">
              så visar vi riktningen.
            </span>
          </h1>
          <p className="mt-5 sm:mt-6 max-w-2xl text-ink/70 text-base sm:text-lg leading-relaxed">
            Bygg din lösning i 3D och se vilken riktning återbetalningen tar.
            Exakta siffror och pris för just din bostad räknar en tekniker fram
            vid ett kostnadsfritt hembesök – så du kan lita på dem.
          </p>
        </div>
      </section>

      <section className="container-edge pb-16 md:pb-24">
        <CalcConfigurator />
      </section>

      {/* Statisk förklaring – gör verktyget begripligt för både besökare och
          AI-crawlers (som inte kör den interaktiva 3D-konfiguratorn). */}
      <Section
        eyebrow="Så fungerar kalkylatorn"
        title={<>En riktning att utgå från, inte ett löfte.</>}
        className="!py-16 md:!py-20"
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="max-w-2xl space-y-5 text-[16px] leading-relaxed text-ink/75">
            <p>
              Kalkylatorn låter dig bygga en anläggning med solpaneler, batteri
              och laddbox och se hur investering, grönt avdrag, årlig besparing
              och återbetalningstid rör sig när du ändrar storlek och val. Den
              är byggd för att ge dig en <strong>riktning</strong> – ett sätt
              att förstå storleksordningen innan du pratar med en människa.
            </p>
            <p>
              Vi visar medvetet inte en exakt besparingssiffra i verktyget. En
              kalkylator känner inte ditt taks skuggning, din faktiska
              timförbrukning eller ditt elområde fullt ut. Exakta siffror räknar
              en tekniker fram vid hembesöket och går igenom med dig, så att de
              går att lita på.
            </p>
          </div>
          <KeyTakeaways
            title="Vad kalkylatorn visar"
            points={[
              <>Investering och <strong>grönt avdrag</strong> per teknik.</>,
              <>Ungefärlig <strong>årlig besparing</strong> och riktning på återbetalning.</>,
              <>Hur <strong>batteristorlek</strong> påverkar ekonomin.</>,
              <>Effekten av <strong>stödtjänster</strong> och smart styrning.</>,
              <>Nästa steg: ett <strong>kostnadsfritt hembesök</strong> för exakt pris.</>,
            ]}
          />
        </div>
        <div className="mt-8">
          <MethodologyCallout title="Varför inga exakta siffror i verktyget">
            <p>
              Priset på offerten är priset på fakturan – därför vill vi inte
              lova en exakt besparing innan vi sett ditt hus. Kalkylatorns
              värden bygger på förenklade antaganden för Mellansverige (SE3) och
              ska läsas som storleksordningar. Vill du ha bindande siffror,{" "}
              boka ett hembesök så räknar vi på just din bostad.
            </p>
          </MethodologyCallout>
        </div>
      </Section>

      {/* FAQ – synlig text + FAQPage-schema (matchar synligt innehåll). */}
      <Section
        eyebrow="Vanliga frågor"
        title={<>Frågor om kalkylen.</>}
        className="!py-16 md:!py-20"
      >
        <FaqBlock items={FAQ} />
      </Section>

      {/* Relaterat */}
      <Section
        eyebrow="Läs vidare"
        title={<>Innan du bokar.</>}
        className="!py-16 md:!py-20"
      >
        <RelatedPages links={RELATED} />
      </Section>

      {/* CTA – resultatet ska leda till offertförfrågan. */}
      <Section className="!py-16 md:!py-20">
        <CtaBlock
          title={<>Redo för exakta siffror? Boka ett kostnadsfritt hembesök.</>}
          primaryHref="/offert"
          primaryLabel="Boka hembesök"
          secondaryHref="/solcellsbatteri"
          secondaryLabel="Läs om solcellsbatteri"
        />
      </Section>
    </>
  );
}
