import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/site/Section";
import {
  JsonLd,
  serviceSchema,
  articleSchema,
  localBusinessSchema,
} from "@/components/seo/JsonLd";
import {
  AnswerBox,
  KeyTakeaways,
  ComparisonTable,
  ProsCons,
  FaqBlock,
  RelatedPages,
  LastUpdated,
  Breadcrumbs,
  CtaBlock,
  MethodologyCallout,
} from "@/components/seo/aeo";

const PATH = "/solcellsbatteri";
const UPDATED = "2026-07-08";
const PUBLISHED = "2026-07-07";

export const metadata = {
  title: "Solcellsbatteri till villa – pris, storlek och grönt avdrag",
  description:
    "Allt om solcellsbatteri för villa: vad det kostar, hur du dimensionerar storleken, 48,5 % grönt avdrag, återbetalningstid och vilka batterimärken vi installerar. Boka ett kostnadsfritt hembesök i Stockholm.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Solcellsbatteri till villa – pris, storlek och grönt avdrag",
    description:
      "Vad ett solcellsbatteri kostar, hur du väljer storlek, grönt avdrag på 48,5 % och återbetalningstid. Guide från Optimera Energi i Stockholm.",
    url: PATH,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Solcellsbatteri till villa – pris, storlek och grönt avdrag",
    description:
      "Pris, storlek, grönt avdrag och återbetalningstid för solcellsbatteri. Guide från Optimera Energi.",
  },
};

/* -------------------------------------------------------------------------- *
 * Innehållsdata – ALLT bygger på Optimera Energis egna, publicerade siffror
 * (catalog.ts, batteri-stadssidorna, kalkylatorns FAQ, llms.txt). Inga
 * fabricerade priser, betyg eller specifikationer.
 * -------------------------------------------------------------------------- */

const FAQ = [
  {
    q: "Vad kostar ett solcellsbatteri till villa?",
    a: "Priset styrs framför allt av kapaciteten. Ett hemmabatteri på 10 kWh landar ofta runt 70 000–110 000 kr installerat, en större bank på 20–30 kWh på cirka 130 000–200 000 kr – allt före grönt avdrag. Det gröna avdraget för batteri är 48,5 % av arbets- och materialkostnaden och dras direkt på fakturan. Exakt pris för din bostad räknar en tekniker fram vid ett kostnadsfritt hembesök.",
  },
  {
    q: "Hur stort solcellsbatteri behöver jag?",
    a: "Dimensionera efter din förbrukning, inte efter en schablon. Vår tumregel: ta husets årsförbrukning i kWh och dela med 200–275 – ungefär så många dygn per år som elen är dyr och batteriet gör full nytta. En villa med 15 000 kWh per år landar då på cirka 55–75 kWh batterikapacitet. Ett hus som förbrukar 70 kWh per dygn har liten nytta av ett litet 10 kWh-batteri – kapaciteten behöver täcka ett helt dygns förbrukning för att verkligen få ner elkostnaden. Vi loggar din timförbrukning innan vi rekommenderar exakt storlek, och i kalkylatorn kan du testa hur olika storlekar påverkar ekonomin.",
  },
  {
    q: "Hur stort är grönt avdrag för solcellsbatteri?",
    a: "Det gröna avdraget (skattereduktion för grön teknik) är 48,5 % av arbets- och materialkostnaden för batterilagring, förutsatt att huset har en solanläggning. Taket är 50 000 kr per fastighetsägare och år. Avdraget dras direkt på fakturan – du behöver inte ansöka i efterhand. Solpaneler ger 14,55 % och laddbox 48,5 % inom samma tak.",
  },
  {
    q: "Lönar sig ett solcellsbatteri?",
    a: "För de flesta villor med solceller, elvärme eller hög förbrukning: ja. Batteriet höjer självförbrukningen av din solel från typiska 30–40 % till 70–80 %, kapar dina dyraste effekttimmar och kan aktiveras för stödtjänster (FCR-D / aFRR) där Svenska kraftnät betalar för att batteriet stabiliserar nätet. Att lägga ett batteri till befintliga solceller är ofta den snabbaste affären – typiskt runt 2–5 års återbetalning; en helt ny sol- och batterilösning oftast 4–7,5 år.",
  },
  {
    q: "Behöver jag solceller för att ha ett solcellsbatteri?",
    a: "Nej. Ett batteri lönar sig även utan solpaneler genom prisarbitrage – du laddar när elen är billig och använder den när den är dyr – plus intäkt från stödtjänster. Har du redan solceller adderar batteriet självförbrukning ovanpå det. Observera att just det gröna avdraget på 48,5 % för batteri förutsätter att huset har en solanläggning.",
  },
  {
    q: "Vilka batterimärken installerar Optimera Energi?",
    a: "Vi är märkesoberoende och säljer alla batterier på marknaden. Vårt hand-plockade kärnsortiment är Easyway (LFP, moduler à 7,68 kWh), SAJ HS3 (10/15/20 kWh med inbyggd 12 kW växelriktare) och Emaldo Power Store (5,12 kWh per powerbox). Vi väljer LFP-celler (järnfosfat) som standard för brandsäkerhet och livslängd och dimensionerar märke och storlek efter ditt hus, inte efter vad vi råkar ha på lager.",
  },
  {
    q: "Vad är skillnaden på solcellsbatteri, hemmabatteri och batterilager?",
    a: "Det är tre namn på samma sak: ett stationärt batteri som lagrar el i hemmet. \"Solcellsbatteri\" och \"solpanelsbatteri\" betonar att det ofta kombineras med solceller, \"hemmabatteri\" att det sitter i villan och \"batterilager\" eller \"batterilagring\" är den mer tekniska termen. Optimera Energi installerar alla varianter för villa, radhus och bostadsrättsförening i Stockholm.",
  },
  {
    q: "Är ett solcellsbatteri säkert i hemmet?",
    a: "Ja. Vi installerar LFP-batterier (litium-järnfosfat) som standard – de brinner inte på samma sätt som NMC-kemi och är vårt val för svenska hem. Installationen följer gällande standard (SS-EN-IEC 62619) med rätt avstånd och brandklassning, och görs av noggrant utvalda, certifierade installatörer som vi tar fullt ansvar för.",
  },
];

const RELATED = [
  {
    href: "/tjanster/batterier",
    label: "Batterilager – tjänsten",
    desc: "Så dimensionerar, installerar och driftsätter vi batterier – från hembesök till driftsättning.",
  },
  {
    href: "/tjanster/batterier/easyway",
    label: "Varför vi rekommenderar Easyway",
    desc: "Mest kWh för pengarna och fri styrning – tanken bakom vårt vanligaste batterival.",
  },
  {
    href: "/kalkylator",
    label: "Räkna ut batteristorlek",
    desc: "Bygg sol och batteri i 3D och se riktningen på investering och återbetalning.",
  },
  {
    href: "/guider/gront-avdrag-2026",
    label: "Grönt avdrag 2026 – hela guiden",
    desc: "Avdragstak, regler och fällor för solceller, batteri, laddbox och värmepump.",
  },
  {
    href: "/guider/aterbetalningstid-solceller",
    label: "Återbetalningstid på solceller",
    desc: "Varje variabel som påverkar kalkylen – med räkneexempel från Stockholm.",
  },
  {
    href: "/tjanster/solpaneler",
    label: "Solpaneler till villa",
    desc: "Solcellerna som laddar batteriet – design efter takets läge och skuggning.",
  },
  {
    href: "/metodik",
    label: "Hur vi väljer och prissätter",
    desc: "Vår metodik: hand-plockat sortiment, transparent pris och när vi säger nej.",
  },
  {
    href: "/offert",
    label: "Boka kostnadsfritt hembesök",
    desc: "Vi mäter din förbrukning på plats och räknar fram exakt pris och storlek.",
  },
];

export default function SolcellsbatteriPage() {
  return (
    <>
      <JsonLd
        data={articleSchema({
          headline:
            "Solcellsbatteri till villa – pris, storlek och grönt avdrag",
          description:
            "Guide om solcellsbatteri för villa: pris, dimensionering, grönt avdrag på 48,5 %, återbetalningstid och batterimärken.",
          url: PATH,
          datePublished: PUBLISHED,
          dateModified: UPDATED,
          type: "TechArticle",
        })}
      />
      <JsonLd
        data={serviceSchema({
          name: "Solcellsbatteri till villa",
          description:
            "Installation av solcellsbatteri, hemmabatteri och batterilager för villa och radhus i Stockholm.",
          url: PATH,
          serviceType: "Batterilager",
        })}
      />
      {/* LocalBusiness-noden måste finnas på sidan för att Service.provider
          (@id #localbusiness) ska resolva i schemagrafen – annars hänger
          referensen löst. Samma mönster som /batteri/[stad]. */}
      <JsonLd data={localBusinessSchema} />
      {/* FAQPage-schema emitteras av <FaqBlock> längre ner.
          BreadcrumbList-schema emitteras av <Breadcrumbs> i heron. */}

      {/* Hero */}
      <section className="container-edge pt-10 md:pt-16 pb-4">
        <Breadcrumbs
          items={[
            { name: "Hem", href: "/" },
            { name: "Solcellsbatteri", href: PATH },
          ]}
        />
        <div className="mt-8 max-w-4xl">
          <div className="eyebrow">Solcellsbatteri · villa &amp; radhus</div>
          <h1 className="mt-5 font-display text-[44px] sm:text-[56px] md:text-[80px] tracking-display-tight leading-[0.95]">
            Solcellsbatteri till villa,{" "}
            <span className="italic font-serif text-indigo">
              rätt dimensionerat.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-ink/70 text-lg leading-relaxed">
            Ett solcellsbatteri lagrar din solel till kvällen, kapar de dyraste
            effekttimmarna och kan tjäna pengar på stödtjänster. Här är vad det
            kostar, hur du väljer storlek och hur grönt avdrag fungerar – utan
            säljsnack.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/offert?tjanst=batterier" className="btn-primary">
              Boka kostnadsfritt hembesök <ArrowRight size={16} />
            </Link>
            <Link href="/kalkylator" className="btn-ghost">
              Räkna ut batteristorlek
            </Link>
          </div>
          <div className="mt-8">
            <LastUpdated date={UPDATED} />
          </div>
        </div>
      </section>

      {/* Kort svar + key takeaways */}
      <section className="container-edge py-12 md:py-16">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <AnswerBox question="Lönar sig ett solcellsbatteri, och vad kostar det?">
            <p>
              <strong>
                Ett solcellsbatteri till villa kostar ungefär 70 000–110 000 kr
                för 10 kWh och 130 000–200 000 kr för 20–30 kWh, före grönt
                avdrag på 48,5 %.
              </strong>{" "}
              Det lönar sig för de flesta villor med solceller, elvärme eller
              hög förbrukning: batteriet höjer självförbrukningen av solelen
              från 30–40 % till 70–80 %, kapar effekttoppar och kan aktiveras
              för stödtjänster mot Svenska kraftnät. Att lägga ett batteri till
              befintliga solceller ger ofta 2–5 års återbetalning.
            </p>
          </AnswerBox>
          <KeyTakeaways
            points={[
              <>
                <strong>Pris:</strong> ca 70 000–200 000 kr beroende på storlek,
                före 48,5 % grönt avdrag.
              </>,
              <>
                <strong>Storlek:</strong> tumregeln är årsförbrukning ÷ 200–275
                kalla dygn – 15 000 kWh/år ger ca 55–75 kWh. Vi mäter din
                förbrukning först.
              </>,
              <>
                <strong>Grönt avdrag:</strong> 48,5 % på batteri, tak 50 000 kr
                per fastighetsägare och år.
              </>,
              <>
                <strong>Återbetalning:</strong> 2–5 år som tillägg till befintlig
                sol, 4–7,5 år för en helt ny sol- och batterilösning.
              </>,
              <>
                <strong>Kemi:</strong> vi installerar LFP-celler (järnfosfat) som
                standard för säkerhet och livslängd.
              </>,
            ]}
          />
        </div>
      </section>

      {/* Vad är ett solcellsbatteri */}
      <Section
        eyebrow="Grunderna"
        title={<>Vad är ett solcellsbatteri?</>}
        className="!py-16 md:!py-20"
      >
        <div className="max-w-2xl space-y-5 text-[16px] leading-relaxed text-ink/75">
          <p>
            Ett solcellsbatteri är ett stationärt hemmabatteri som lagrar el – i
            regel den solel dina paneler producerar mitt på dagen – så att du
            kan använda den på kvällen när solen inte lyser och elen är som
            dyrast. Samma produkt kallas ibland{" "}
            <strong>solpanelsbatteri</strong>, <strong>hemmabatteri</strong>{" "}
            eller <strong>batterilager</strong>; det är olika namn på samma sak.
          </p>
          <p>
            Batteriet gör tre saker som sparar pengar: det höjer{" "}
            <strong>självförbrukningen</strong> av din solel, det{" "}
            <strong>kapar effekttoppar</strong> (peak-shaving) som annars driver
            upp nätavgiften, och det kan kopplas till{" "}
            <strong>stödtjänster</strong> där Svenska kraftnät betalar för att
            batteriet hjälper till att hålla elnätet i balans. En bra styrning
            avgör hur mycket varje del ger.
          </p>
        </div>
      </Section>

      {/* Pris */}
      <Section
        eyebrow="Vad det kostar"
        title={<>Pris för solcellsbatteri.</>}
        intro="Priset styrs framför allt av kapaciteten. Nedan är typiska spann installerat, före grönt avdrag."
        className="!py-16 md:!py-20"
      >
        <div id="pris" className="scroll-mt-28" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {[
            {
              size: "10 kWh",
              price: "70 000–110 000 kr",
              body: "Täcker ungefär ett dygn på 10 kWh förbrukning – kapar kvällstoppar i hus med låg elförbrukning.",
            },
            {
              size: "15–20 kWh",
              price: "110 000–160 000 kr",
              body: "Täcker ett dygn på 15–20 kWh – för måttlig förbrukning utan elvärme.",
            },
            {
              size: "20–30 kWh",
              price: "130 000–200 000 kr",
              body: "För högre förbrukning och som grund för stödtjänstintäkt. Villor med elvärme landar ofta ännu större.",
            },
          ].map((c) => (
            <div
              key={c.size}
              className="rounded-3xl border border-ink/10 bg-cream/40 p-7"
            >
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/55">
                {c.size}
              </div>
              <div className="mt-3 font-display text-2xl tracking-display-tight">
                {c.price}
              </div>
              <p className="mt-3 text-[14.5px] leading-relaxed text-ink/70">
                {c.body}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <MethodologyCallout title="Så räknar vi på priset">
            <p>
              Spannen ovan är installerat pris <strong>före</strong> grönt
              avdrag och täcker batteri, växelriktare, montage, kabel och
              driftsättning. Det gröna avdraget på 48,5 % dras sedan direkt på
              fakturan. Villor med elvärme eller hög förbrukning landar ofta på
              betydligt större bankar än så här – Easyway byggs ut modulärt
              upp till 61 kWh – och de prissätts vid hembesöket. Vi fabricerar
              aldrig en exakt besparing i förväg; priset på offerten är priset
              på fakturan.
            </p>
          </MethodologyCallout>
        </div>
      </Section>

      {/* Grönt avdrag */}
      <Section
        eyebrow="Grönt avdrag 2026"
        title={<>Grönt avdrag för batteri.</>}
        intro="Skattereduktionen för grön teknik dras direkt på fakturan – du behöver inte ansöka i efterhand."
        className="!py-16 md:!py-20"
      >
        <div id="gront-avdrag" className="scroll-mt-28" />
        <ComparisonTable
          columns={["Teknik", "Grönt avdrag", "Villkor"]}
          rows={[
            {
              label: "Solcellsbatteri (lagring)",
              cells: [
                "48,5 %",
                "Av arbets- och materialkostnad. Förutsätter att huset har en solanläggning.",
              ],
            },
            {
              label: "Solpaneler",
              cells: ["14,55 %", "Av arbets- och materialkostnad."],
            },
            {
              label: "Laddbox till elbil",
              cells: ["48,5 %", "Av arbets- och materialkostnad."],
            },
          ]}
          footnote="Taket är 50 000 kr per fastighetsägare och år, gemensamt för grön teknik. Bor ni två ägare i huset kan ni dela på två tak. Kontrollera aktuella nivåer hos Skatteverket inför beslut."
        />
      </Section>

      {/* Jämför batterimärken */}
      <Section
        eyebrow="Bästa batterimärke"
        title={<>Batterier vi installerar.</>}
        intro="Vi är märkesoberoende. Detta är vårt hand-plockade kärnsortiment – vi väljer det som passar ditt hus, inte det med störst marginal."
        className="!py-16 md:!py-20"
      >
        <ComparisonTable
          columns={[
            "Batteri",
            "Kapacitet",
            "Cellkemi",
            "Cykler",
            "Växelriktare",
            "Passar bäst",
          ]}
          rows={[
            {
              label: "Easyway",
              cells: [
                "15–61 kWh (moduler à 7,68 kWh)",
                "LFP",
                "≈ 6 500",
                "Extern (t.ex. Solis S6 10/15 kW)",
                "Mest kWh för pengarna och fri styrning.",
              ],
            },
            {
              label: "SAJ HS3",
              cells: [
                "10 / 15 / 20 kWh",
                "LFP",
                "≈ 6 000",
                "Inbyggd 12 kW",
                "Kompakt allt-i-ett med växelriktaren i.",
              ],
            },
            {
              label: "Emaldo Power Store",
              cells: [
                "5–15 kWh (powerbox à 5,12 kWh)",
                "LFP",
                "≈ 6 500",
                "Inbyggd 10,8 kW",
                "Grid Rewards i elområde SE3/SE4.",
              ],
            },
          ]}
          caption="Jämförelse av batterimärken som Optimera Energi installerar: kapacitet, cellkemi, cykellivslängd och växelriktare."
          footnote="Utöver kärnsortimentet säljer vi bland annat Enershare, Sigenergy, Sungrow och Growatt. LFP (litium-järnfosfat) är vårt standardval för brandsäkerhet och livslängd. Läs mer om varför vi ofta landar i Easyway."
        />
        <div className="mt-6">
          <Link
            href="/tjanster/batterier/easyway"
            className="inline-flex items-center gap-2 text-[14.5px] text-indigo hover:underline underline-offset-2"
          >
            Läs varför vi rekommenderar Easyway <ArrowRight size={15} />
          </Link>
        </div>
      </Section>

      {/* När passar / passar inte */}
      <Section
        eyebrow="Passar det dig?"
        title={<>När ett solcellsbatteri passar – och inte.</>}
        className="!py-16 md:!py-20"
      >
        <ProsCons
          prosTitle="När det passar"
          consTitle="När det inte passar (än)"
          pros={[
            "Du har eller planerar solceller och vill använda mer av elen själv.",
            "Villan har elvärme, värmepump eller elbil – hög kvällsförbrukning.",
            "Din nätägare har effekttariff, så att kapade toppar sänker avgiften.",
            "Du vill ha möjlig intäkt från stödtjänster (FCR-D / aFRR) ovanpå besparingen.",
          ]}
          cons={[
            "Mycket låg elförbrukning där besparingen blir för liten för investeringen.",
            "Inget lämpligt utrymme (garage, förråd, tvättstuga) för batteriet.",
            "Du saknar solanläggning och vill ha just det gröna avdraget för batteri – då krävs sol.",
            "Du planerar att flytta snart och inte hinner räkna hem investeringen.",
          ]}
        />
        <p className="mt-6 max-w-2xl text-[14px] leading-relaxed text-ink/55">
          Passar det inte just nu säger vi det. Vi säljer inte batterier till
          hus där de inte lönar sig – det är en del av vår{" "}
          <Link href="/metodik" className="text-indigo hover:underline underline-offset-2">
            metodik
          </Link>
          .
        </p>
      </Section>

      {/* Dimensionering */}
      <Section
        eyebrow="Rätt storlek"
        title={<>Så dimensionerar du batteriet.</>}
        intro="Rätt storlek är inte störst möjliga – det är den som matchar hur du faktiskt använder el."
        className="!py-16 md:!py-20"
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {[
            {
              t: "1. Vi mäter förbrukningen",
              b: "Vi loggar din timförbrukning innan vi rekommenderar kapacitet, så batteriet matchar dygnsmönstret i just ditt hus.",
            },
            {
              t: "2. Vi väger in helheten",
              b: "Solanläggningens storlek, elvärme, värmepump och elbil avgör hur stor kvällstoppen blir – och därmed hur många kWh du behöver.",
            },
            {
              t: "3. Du testar i kalkylatorn",
              b: "I kalkylatorn ser du riktningen på investering och återbetalning för olika storlekar innan hembesöket.",
            },
          ].map((c) => (
            <div
              key={c.t}
              className="rounded-3xl border border-ink/10 bg-bone p-7"
            >
              <h3 className="font-display text-xl tracking-display-tight">
                {c.t}
              </h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-ink/70">
                {c.b}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <MethodologyCallout title="Tumregeln vi dimensionerar efter">
            <p>
              Ta husets <strong>årsförbrukning i kWh och dela med 200–275</strong>{" "}
              – ungefär så många dygn per år som elen är dyr och batteriet gör
              full nytta. Exempel: en villa med 15 000 kWh per år ger
              15 000 ÷ 275 ≈ <strong>55 kWh</strong> (spannet 55–75 kWh
              beroende på var i intervallet man räknar). Kapaciteten ska räcka
              för ett helt dygns förbrukning – ett 10 kWh-batteri gör ingen
              verklig skillnad i ett hus som drar 70 kWh per dygn. Tumregeln
              verifieras alltid mot din loggade timförbrukning innan vi lämnar
              offert.
            </p>
          </MethodologyCallout>
        </div>
        <div className="mt-8">
          <Link href="/kalkylator" className="btn-primary">
            Räkna ut batteristorlek <ArrowRight size={16} />
          </Link>
        </div>
      </Section>

      {/* Stödtjänster */}
      <Section
        eyebrow="Extra intäkt"
        title={<>Stödtjänster gör batteriet betalt.</>}
        className="!py-16 md:!py-20"
      >
        <div className="max-w-2xl space-y-5 text-[16px] leading-relaxed text-ink/75">
          <p>
            Ett batteri som står stilla kan ändå tjäna pengar. Via stödtjänsterna{" "}
            <strong>FCR-D</strong> och <strong>aFRR</strong> betalar Svenska
            kraftnät för att ditt batteri hjälper till att hålla elnätets
            frekvens stabil. Ersättningen ligger runt{" "}
            <strong>65 kr per kW växelriktare och månad</strong> – en anläggning
            med en 10 kW-växelriktare ger i storleksordningen 7 800 kr per år,
            utöver det du sparar på egen förbrukning.
          </p>
          <p>
            Stödtjänster kräver en styrning (EMS) som kan köra batteriet mot
            Svenska kraftnät – hos oss Energy IQ eller Enequi Core. Vi aktiverar
            och övervakar tjänsterna åt dig.
          </p>
        </div>
      </Section>

      {/* FAQ */}
      <Section
        eyebrow="Vanliga frågor"
        title={<>Frågor om solcellsbatteri.</>}
        className="!py-16 md:!py-20"
      >
        <FaqBlock items={FAQ} />
        <p className="mt-6 text-[14px] text-ink/60">
          Fler frågor?{" "}
          <Link
            href="/fragor-och-svar"
            className="text-indigo hover:underline underline-offset-2"
          >
            Samlade frågor och svar om solceller, batteri och grönt avdrag
          </Link>
          .
        </p>
      </Section>

      {/* Relaterat */}
      <Section
        eyebrow="Läs vidare"
        title={<>Relaterade sidor.</>}
        className="!py-16 md:!py-20"
      >
        <RelatedPages links={RELATED} />
      </Section>

      {/* CTA */}
      <Section className="!py-16 md:!py-20">
        <CtaBlock
          title={<>Vi dimensionerar rätt solcellsbatteri för ditt hus.</>}
          primaryHref="/offert?tjanst=batterier"
          primaryLabel="Boka hembesök"
          secondaryHref="/kalkylator"
          secondaryLabel="Räkna ut storlek"
        />
      </Section>
    </>
  );
}
