import Link from "next/link";
import { Section } from "@/components/site/Section";
import { JsonLd, articleSchema } from "@/components/seo/JsonLd";
import {
  AnswerBox,
  KeyTakeaways,
  ProsCons,
  RelatedPages,
  LastUpdated,
  Breadcrumbs,
  CtaBlock,
} from "@/components/seo/aeo";

const PATH = "/metodik";
const UPDATED = "2026-07-08";
const PUBLISHED = "2026-07-07";

export const metadata = {
  title: "Vår metodik – så väljer, dimensionerar och prissätter vi",
  description:
    "Optimera Energis metodik: hand-plockat sortiment, transparent pris (priset på offerten är priset på fakturan), dimensionering efter din förbrukning och när vi säger nej. Så här bör du också utvärdera en installatör.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Vår metodik – Optimera Energi",
    description:
      "Hur vi väljer produkter, sätter pris och dimensionerar – och hur du utvärderar en installatör.",
    url: PATH,
    type: "article",
  },
};

const PRINCIPLES = [
  {
    n: "01",
    title: "Hand-plockat sortiment, inte det dyraste",
    body:
      "Vi kan installera vilket märke som helst men har valt det vi säljer efter hundratals tester. Inte det dyraste, inte det billigaste – det som ger mest värde över 25-årsperspektivet. LFP-celler (järnfosfat) är vårt standardval för batteri, för säkerhet och livslängd.",
  },
  {
    n: "02",
    title: "Förståelse innan lösning",
    body:
      "Innan vi föreslår en lösning vill vi förstå din situation. Vi mäter förbrukningen, kartlägger huset och ser om lösningen faktiskt passar dig. Först då lägger vi ett konkret förslag – ingen paketförsäljning från ett datablad.",
  },
  {
    n: "03",
    title: "Rätt storlek, dimensionerad ur din förbrukning",
    body:
      "Vi dimensionerar batteriet efter husets faktiska förbrukning, inte efter en broschyr. Tumregeln: årsförbrukningen i kWh delad med 200–275 kalla dygn – en villa med 15 000 kWh per år landar på cirka 55–75 kWh batterikapacitet. Kapaciteten ska räcka för ett helt dygns förbrukning när elen är som dyrast. Vi loggar din timförbrukning innan vi låser storleken.",
  },
  {
    n: "04",
    title: "Priset på offerten är priset på fakturan",
    body:
      "Inga dolda påslag, ingen restidsdebitering i efterhand. Allt material och installation ingår i offerten, och det gröna avdraget dras direkt på fakturan. Vad vi skriver är vad du betalar.",
  },
  {
    n: "05",
    title: "Vi säger nej när det inte passar",
    body:
      "Vi finns inte för att sälja paket. När vi tycker att du borde vänta, dimensionera mindre eller satsa på något annat först, säger vi det. Ett batteri i ett hus där det inte lönar sig är en dålig affär för alla.",
  },
  {
    n: "06",
    title: "Eget team – och vi står kvar",
    body:
      "Vi driver installationerna med eget montageteam, inga underentreprenörer för det vi själva kan. Garantin på vårt arbete gäller även när du sålt huset, och ringer du tre år senare är det samma personer som svarar.",
  },
];

const RELATED = [
  {
    href: "/solcellsbatteri",
    label: "Solcellsbatteri till villa",
    desc: "Pris, storlek och grönt avdrag – vår pelarsida om batteri.",
  },
  {
    href: "/tjanster/batterier/easyway",
    label: "Varför vi rekommenderar Easyway",
    desc: "Ett konkret exempel på metodiken: mest kWh för pengarna och fri styrning.",
  },
  {
    href: "/om-oss",
    label: "Om Optimera Energi",
    desc: "Teamet, visionen och bolagsresan bakom metodiken.",
  },
  {
    href: "/fragor-och-svar",
    label: "Frågor och svar",
    desc: "Raka svar om pris, grönt avdrag, stödtjänster och process.",
  },
  {
    href: "/kalkylator",
    label: "Räkna på din lösning",
    desc: "Se riktningen på investering och återbetalning i 3D.",
  },
  {
    href: "/offert",
    label: "Boka kostnadsfritt hembesök",
    desc: "Vi mäter din förbrukning och räknar fram exakt pris och storlek.",
  },
];

export default function MetodikPage() {
  return (
    <>
      <JsonLd
        data={articleSchema({
          headline: "Vår metodik – så väljer, dimensionerar och prissätter vi",
          description:
            "Optimera Energis metodik för att välja produkter, sätta pris och dimensionera sol och batteri – och hur du utvärderar en installatör.",
          url: PATH,
          datePublished: PUBLISHED,
          dateModified: UPDATED,
        })}
      />
      {/* Obs: aboutPageSchema hör hemma på /om-oss (dess @id/url pekar dit)
          och ska inte emitteras här – Article + BreadcrumbList räcker. */}

      {/* Hero */}
      <section className="container-edge pt-10 md:pt-16 pb-4">
        <Breadcrumbs
          items={[
            { name: "Hem", href: "/" },
            { name: "Metodik", href: PATH },
          ]}
        />
        <div className="mt-8 max-w-4xl">
          <div className="eyebrow">Metodik · så arbetar vi</div>
          <h1 className="mt-5 font-display text-[44px] sm:text-[56px] md:text-[80px] tracking-display-tight leading-[0.95]">
            Så väljer, dimensionerar{" "}
            <span className="italic font-serif text-indigo">
              och prissätter vi.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-ink/70 text-lg leading-relaxed">
            Vår metodik är inte en marknadsföringstext – den styr varje
            hembesök, offert och installation. Här är principerna, och hur du
            kan använda dem för att utvärdera vilken installatör som helst.
          </p>
          <div className="mt-8">
            <LastUpdated date={UPDATED} />
          </div>
        </div>
      </section>

      {/* Kort svar + takeaways */}
      <section className="container-edge py-12 md:py-16">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <AnswerBox question="Hur arbetar Optimera Energi?">
            <p>
              <strong>
                Vi mäter din förbrukning först, väljer ur ett hand-plockat
                sortiment, dimensionerar efter behov snarare än störst möjliga,
                och lämnar ett fast pris där priset på offerten är priset på
                fakturan.
              </strong>{" "}
              Vi driver installationerna med eget montageteam, säger nej när en
              lösning inte passar, och står kvar med garanti även efter att du
              sålt huset.
            </p>
          </AnswerBox>
          <KeyTakeaways
            title="Principerna i korthet"
            points={[
              <>
                <strong>Hand-plockat sortiment</strong> – mest värde över 25 år,
                inte högst marginal.
              </>,
              <>
                <strong>Mät först, föreslå sedan</strong> – lösningen följer din
                förbrukning.
              </>,
              <>
                <strong>Rätt storlek</strong> – årsförbrukning ÷ 200–275 kalla
                dygn, verifierad mot loggad timförbrukning.
              </>,
              <>
                <strong>Fast pris</strong> – inga dolda påslag, avdrag dras på
                fakturan.
              </>,
              <>
                <strong>Vi säger nej</strong> när det inte lönar sig för dig.
              </>,
            ]}
          />
        </div>
      </section>

      {/* Principer */}
      <Section
        eyebrow="Sex principer"
        title={<>Vad som styr varje projekt.</>}
        className="!py-16 md:!py-20"
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {PRINCIPLES.map((p) => (
            <article
              key={p.n}
              className="rounded-3xl border border-ink/10 bg-cream/40 p-7 md:p-8"
            >
              <div className="font-mono text-[11px] tracking-[0.18em] text-ink/55">
                PRINCIP {p.n}
              </div>
              <h2 className="mt-4 font-display text-2xl tracking-display-tight leading-snug">
                {p.title}
              </h2>
              <p className="mt-3 text-[14.5px] leading-relaxed text-ink/70">
                {p.body}
              </p>
            </article>
          ))}
        </div>
      </Section>

      {/* Så bör du utvärdera en installatör */}
      <Section
        eyebrow="Köpguide"
        title={<>Så bör du utvärdera en installatör.</>}
        intro="Använd samma måttstock på oss som på alla andra. En seriös installatör klarar den här listan – oavsett vem du väljer."
        className="!py-16 md:!py-20"
      >
        <ProsCons
          prosTitle="Tecken på en installatör att lita på"
          consTitle="Varningsflaggor"
          pros={[
            "Mäter din förbrukning innan de föreslår storlek.",
            "Lämnar ett fast pris där offert = faktura, med avdraget tydligt uträknat.",
            "Har eget montageteam eller är öppna med vilka som gör jobbet.",
            "Kan förklara varför de valt just det märket – och säger nej när det inte passar.",
            "Ger garanti på arbetet och finns kvar för service efteråt.",
          ]}
          cons={[
            "Ger en exakt besparingssiffra innan de sett ditt tak och din förbrukning.",
            "Pressar med tidsbegränsade 'kampanjpriser' samma dag.",
            "Är otydliga med underentreprenörer och vem som ansvarar för garantin.",
            "Säljer alltid störst möjliga anläggning oavsett behov.",
            "Kan inte visa hur det gröna avdraget räknas fram.",
          ]}
        />
      </Section>

      {/* Relaterat */}
      <Section
        eyebrow="Läs vidare"
        title={<>Metodiken i praktiken.</>}
        className="!py-16 md:!py-20"
      >
        <RelatedPages links={RELATED} />
      </Section>

      {/* CTA */}
      <Section className="!py-16 md:!py-20">
        <CtaBlock
          title={<>Testa metodiken på ditt hus – kostnadsfritt.</>}
          primaryHref="/offert"
          primaryLabel="Boka hembesök"
          secondaryHref="/solcellsbatteri"
          secondaryLabel="Läs om solcellsbatteri"
        />
        <p className="mt-6 text-center text-[13px] text-ink/50">
          Vill du prata direkt? Ring{" "}
          <a
            href="tel:+46763053732"
            className="text-indigo hover:underline underline-offset-2"
          >
            076 305 37 32
          </a>{" "}
          eller se{" "}
          <Link
            href="/kontakt"
            className="text-indigo hover:underline underline-offset-2"
          >
            alla kontaktuppgifter
          </Link>
          .
        </p>
      </Section>
    </>
  );
}
