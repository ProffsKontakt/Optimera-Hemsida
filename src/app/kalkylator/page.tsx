import { CalcConfigurator } from "@/components/calc/CalcConfigurator";
import { JsonLd, faqPageSchema } from "@/components/seo/JsonLd";

export const metadata = {
  title: "Kalkylator – bygg din energilösning i 3D",
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

// FAQPage-schema laddas på kalkylator-sidan eftersom det är där användare
// kommer med tekniska frågor. Hjälper AI-search (ChatGPT, Gemini, Perplexity)
// och Google AI Overviews att hitta direkta svar-passager för citering.
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

export default function CalculatorPage() {
  return (
    <>
      <JsonLd data={faqPageSchema(FAQ)} />
      <section className="container-edge pt-12 md:pt-20 pb-10">
        <div className="max-w-3xl">
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

      <section className="container-edge pb-32">
        <CalcConfigurator />
      </section>
    </>
  );
}
