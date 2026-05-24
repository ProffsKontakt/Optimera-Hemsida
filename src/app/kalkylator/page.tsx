import { CalcStudio } from "@/components/calc/CalcStudio";
import { JsonLd, faqPageSchema } from "@/components/seo/JsonLd";

export const metadata = {
  title: "Kalkylator – räkna på er energilösning i 3D",
  description:
    "Designa solpaneler, batteri, värmepump och laddbox i en levande 1:1-modell av huset. Sätt antal paneler, batterimärke och kapacitet, och se investering, grönt avdrag, årlig besparing och återbetalningstid räknas om i realtid.",
  alternates: { canonical: "/kalkylator" },
  openGraph: {
    title: "Kalkylator – Optimera Energi",
    description:
      "Designa er energilösning i 3D. Få investering, grönt avdrag och återbetalningstid på sekunden.",
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
    q: "Vad är stödtjänster (FCR-D / aFRR) och hur mycket kan jag tjäna?",
    a: "Stödtjänster är frekvensreglering till Svenska Kraftnät via ditt batteri. Optimera Energi använder Enequi Core eller Energy IQ som EMS, vilket ger 65 kr per kW växelriktare per månad. En Solis 10 kW-växelriktare ger cirka 7 800 kr per år, en Solis 15 kW cirka 11 700 kr per år.",
  },
  {
    q: "Vilka batterimärken installerar Optimera Energi?",
    a: "Vi installerar Easyway (7,68 kWh per modul, LFP-kemi), SAJ HS3 (10/15/20 kWh-SKUer med inbyggd 12 kW växelriktare), och Emaldo Power Store (5,12 kWh per powerbox, med Emaldo Grid Rewards på 1 110 kr/månad i SE3 och 1 370 kr/månad i SE4).",
  },
  {
    q: "Hur lång är återbetalningstiden för ett batteri?",
    a: "Återbetalningstiden beror på elzon, batteristorlek, EMS-val och årsförbrukning. För en typisk villa i Stockholm (SE3) med 23 kWh Easyway-batteri, Solis 10 kW och Energy IQ ligger nettoinvesteringen efter grönt avdrag runt 60 000 kr och årlig besparing inklusive stödtjänster runt 38 000 kr – vilket ger ungefär 1,6 års återbetalningstid.",
  },
  {
    q: "Vad kostar ett hembesök?",
    a: "Hembesöket är kostnadsfritt och utan förpliktelser. Vi tar med drönarbesiktning av taket, gör en 1:1-modell av huset i 3D, går igenom era val och lämnar en offert där priset på offerten alltid är priset på fakturan.",
  },
  {
    q: "Vilket elområde behöver jag för Emaldo Grid Rewards?",
    a: "Emaldo Power Stores Grid Rewards är endast tillgängliga i elområde SE3 (Stockholm, mellan- och södra Sverige) och SE4 (Skåne / södra Götaland). Optimera Energi installerar inte Emaldo i SE1 och SE2.",
  },
];

export default function CalculatorPage() {
  return (
    <>
      <JsonLd data={faqPageSchema(FAQ)} />
      <section className="container-edge pt-12 md:pt-20 pb-10">
        <div className="max-w-3xl">
          <div className="eyebrow">Kalkylator · 1:1-modell av huset</div>
          <h1 className="mt-5 font-display text-[44px] sm:text-[56px] md:text-[88px] tracking-display-tight leading-[0.95]">
            Räkna på din
            <br />
            <span className="italic font-serif text-indigo">helhet</span> – i 3D.
          </h1>
          <p className="mt-5 sm:mt-6 max-w-2xl text-ink/70 text-base sm:text-lg leading-relaxed">
            Byt panelmärke, växelriktare, batteristorlek, värmepump och laddbox.
            Modellen ovan uppdaterar sig – och så gör siffrorna. Det här är
            samma motor som vi använder vid våra hembesök.
          </p>
        </div>
      </section>

      <section className="container-edge pb-32">
        <CalcStudio />
      </section>
    </>
  );
}
