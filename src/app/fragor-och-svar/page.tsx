import { Section } from "@/components/site/Section";
import { JsonLd, faqPageSchema, collectionPageSchema } from "@/components/seo/JsonLd";
import {
  FaqBlock,
  Breadcrumbs,
  RelatedPages,
  LastUpdated,
  CtaBlock,
} from "@/components/seo/aeo";

const PATH = "/fragor-och-svar";
const UPDATED = "2026-07-07";

export const metadata = {
  title: "Frågor och svar om solceller, batteri och grönt avdrag",
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

const CATEGORIES: { heading: string; eyebrow: string; items: { q: string; a: string }[] }[] = [
  {
    eyebrow: "Solcellsbatteri",
    heading: "Solcellsbatteri och batterilager",
    items: [
      {
        q: "Vad kostar ett solcellsbatteri till villa?",
        a: "Priset styrs framför allt av kapaciteten. Ett hemmabatteri på 10 kWh landar ofta runt 70 000–110 000 kr installerat, en större bank på 20–30 kWh på cirka 130 000–200 000 kr – allt före grönt avdrag på 48,5 %. Exakt pris för din bostad räknar en tekniker fram vid ett kostnadsfritt hembesök.",
      },
      {
        q: "Hur stort solcellsbatteri behöver jag?",
        a: "För en normalvilla landar vi oftast på 10–20 kWh. Rätt storlek beror på din dygnsförbrukning, om du har elvärme eller elbil och hur stor din solanläggning är. Vi mäter din timförbrukning innan vi rekommenderar kapacitet, så att du inte betalar för kilowattimmar du aldrig använder.",
      },
      {
        q: "Behöver jag solceller för att ha ett batteri?",
        a: "Nej. Ett batteri lönar sig även utan solpaneler genom prisarbitrage – du laddar när elen är billig och använder den när den är dyr – plus intäkt från stödtjänster. Har du redan solceller adderar batteriet självförbrukning ovanpå det. Just det gröna avdraget på 48,5 % för batteri förutsätter dock att huset har en solanläggning.",
      },
      {
        q: "Vilka batterimärken installerar Optimera Energi?",
        a: "Vi är märkesoberoende och säljer alla batterier på marknaden. Vårt hand-plockade kärnsortiment är Easyway, SAJ HS3 och Emaldo Power Store. Vi väljer LFP-celler (järnfosfat) som standard för brandsäkerhet och livslängd och dimensionerar märke och storlek efter ditt hus.",
      },
      {
        q: "Är ett batteri säkert i hemmet?",
        a: "Ja. Vi installerar LFP-batterier (litium-järnfosfat) som standard – de brinner inte på samma sätt som NMC-kemi. Installationen följer gällande standard (SS-EN-IEC 62619) med rätt avstånd och brandklassning, och görs av vårt eget montageteam.",
      },
    ],
  },
  {
    eyebrow: "Solceller",
    heading: "Solceller och solpaneler",
    items: [
      {
        q: "Hur länge håller solpanelerna?",
        a: "Våra glas-glas paneler har 30 års produktgaranti och en effektgaranti som garanterar minst 87 % effekt efter 30 år.",
      },
      {
        q: "Behöver jag bygglov för solceller?",
        a: "I de flesta fall nej – paneler som följer takets lutning är bygglovsbefriade på en- och tvåbostadshus. Vi kollar din kommun innan vi börjar.",
      },
      {
        q: "Vad händer vid strömavbrott?",
        a: "Med en hybrid-växelriktare och batteri kan vi konfigurera nödström så att utvalda kretsar fortsätter fungera även när nätet är nere.",
      },
      {
        q: "Vad kostar solpaneler i Stockholm?",
        a: "Baspriset (resor, ställning, montage, kabel, driftsättning) trappas efter antal paneler, och en JA Solar-panel ligger på 2 500 kr styck. En typisk villa med 14 paneler landar runt 50 000 kr efter grönt avdrag på 14,55 %. Priset på offerten är priset på fakturan.",
      },
    ],
  },
  {
    eyebrow: "Pris & grönt avdrag",
    heading: "Pris, grönt avdrag och återbetalning",
    items: [
      {
        q: "Hur stort grönt avdrag får jag på solceller och batteri?",
        a: "Solpaneler ger 14,55 % grönt avdrag, batterier 48,5 % (förutsatt att huset har en solanläggning), laddboxar 48,5 % och värmepumpar 30 % ROT-avdrag. Avdragstaket är 50 000 kr per fastighetsägare och år och dras direkt på fakturan.",
      },
      {
        q: "Hur lång är återbetalningstiden för sol och batteri?",
        a: "Det beror på om du redan har solceller, batteristorlek, elområde och förbrukning. Att lägga ett batteri till befintliga solceller är ofta den snabbaste affären – typiskt runt 2–5 år. En helt ny sol- och batterilösning tar oftast 4–7,5 år, solceller ensamt längre. Exakt siffra räknar vi fram vid hembesöket.",
      },
      {
        q: "Kan jag få exakta siffror direkt i kalkylatorn?",
        a: "Nej, och det är ett medvetet val. En kalkylator känner inte ditt tak, din förbrukning eller ditt elområde fullt ut. Kalkylatorn visar vilken riktning en lösning tar – exakta siffror och pris räknar en tekniker fram vid hembesöket, så att du kan lita på dem.",
      },
    ],
  },
  {
    eyebrow: "Stödtjänster & ekonomi",
    heading: "Stödtjänster och smart styrning",
    items: [
      {
        q: "Hur mycket tjänar jag på stödtjänster?",
        a: "Via FCR-D och aFRR betalar Svenska kraftnät runt 65 kr per kW växelriktare och månad för att batteriet stabiliserar nätet. En anläggning med en 10 kW-växelriktare ger i storleksordningen 7 800 kr per år, och större banker mer – utöver det du sparar på egen förbrukning. Det kräver en styrning (Energy IQ eller Enequi Core) som kör batteriet mot Svenska kraftnät.",
      },
      {
        q: "Kan jag ladda batteriet från elnätet när det är billigt?",
        a: "Ja. Vår styrning köper el när priset dippar och använder eller säljer den på topparna – automatiskt. Kombinerat med solel och stödtjänster är det så batteriet tjänar in sig.",
      },
      {
        q: "Höjer ett batteri min självförbrukning av solel?",
        a: "Ja, markant. Ett batteri höjer typiskt självförbrukningen från 30–40 % till 70–80 %, vilket betyder att du köper mindre el från nätet och säljer mindre överskott till lågt pris.",
      },
    ],
  },
  {
    eyebrow: "Så arbetar vi",
    heading: "Hembesök, process och garanti",
    items: [
      {
        q: "Vad kostar ett hembesök?",
        a: "Hembesöket är kostnadsfritt och utan förpliktelser. Vi gör en drönarbesiktning av taket, går igenom era förutsättningar och val, och lämnar en offert där priset på offerten alltid är priset på fakturan.",
      },
      {
        q: "Använder ni underentreprenörer?",
        a: "Nej, inte för det vi själva kan. Vi driver installationerna med eget montageteam. När du ringer oss tre år efter installationen är det samma personer som svarar.",
      },
      {
        q: "Gäller garantin om jag säljer huset?",
        a: "Ja. Garantin på vårt arbete gäller även när du sålt huset, så att en investering i energilösningen också blir ett värde för nästa ägare.",
      },
    ],
  },
];

const ALL_ITEMS = CATEGORIES.flatMap((c) => c.items);

const RELATED = [
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
          <h1 className="mt-5 font-display text-[44px] sm:text-[56px] md:text-[80px] tracking-display-tight leading-[0.95]">
            Frågor och{" "}
            <span className="italic font-serif text-indigo">svar.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-ink/70 text-lg leading-relaxed">
            Raka svar på det villaägare oftast frågar oss om solcellsbatteri,
            solceller, pris, grönt avdrag och stödtjänster. Hittar du inte ditt
            svar? Ring oss på 076 305 37 32.
          </p>
          <div className="mt-8">
            <LastUpdated date={UPDATED} />
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
