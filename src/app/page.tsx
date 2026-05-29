import { Hero } from "@/components/site/Hero";
import { PressBanner } from "@/components/site/PressBanner";
import { getFeaturedPressRelease } from "@/lib/press";
import { Section } from "@/components/site/Section";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { Manifesto } from "@/components/home/Manifesto";
import { HousecallStrip } from "@/components/home/HousecallStrip";
import { Process } from "@/components/home/Process";
import { Testimonials } from "@/components/home/Testimonials";
import { VideoStage } from "@/components/home/VideoStage";
import { CtaPanel } from "@/components/home/CtaPanel";
import { Disclosure } from "@/components/site/Disclosure";
import {
  JsonLd,
  faqPageSchema,
  videoObjectSchema,
  localBusinessSchema,
} from "@/components/seo/JsonLd";

// Sex köpar-språk-frågor som matchar Google Suggest och AI-search-frågor
// för "Optimera Energi" + lokala intent-termer. Hjälper både rich snippets
// och AI-citations från ChatGPT, Gemini, Perplexity.
const HOME_FAQ = [
  {
    q: "Vad gör Optimera Energi?",
    a: "Optimera Energi Sverige AB är en svensk elinstallatör i Solna som installerar solpaneler, batterier, värmepumpar och laddboxar för villor och bostadsrättsföreningar i Stockholms län. Vi har eget montageteam, inga underentreprenörer.",
  },
  {
    q: "Var ligger Optimera Energi?",
    a: "Kontoret och lagret ligger på Vallgatan 9, 170 67 Solna. Vi installerar i Solna, Stockholm, Sundbyberg, Täby, Lidingö, Sollentuna, Nacka och Danderyd.",
  },
  {
    q: "Vad kostar solpaneler hos Optimera Energi?",
    a: "Baspriset är 10 000 till 22 500 kr beroende på antal paneler, plus 2 500 kr per JA Solar-panel. En typisk villa med 14 paneler landar runt 50 000 kr efter grönt avdrag (14,55 procent). Räkna på din lösning i 3D-kalkylatorn på optimeraenergi.se/kalkylator.",
  },
  {
    q: "Hur stort är det gröna avdraget 2026?",
    a: "Solpaneler ger 14,55 procent, batterier och laddboxar 48,5 procent, värmepump 30 procent via ROT. Avdragstaket är 50 000 kr per fastighetsägare och år. Vi drar av summan direkt på fakturan.",
  },
  {
    q: "Hur lång är återbetalningstiden för en solanläggning?",
    a: "En ren solanläggning i Stockholm har återbetalningstid på 8 till 11 år. Med batteri och stödtjänster via Energy IQ eller Enequi Core kommer tiden ner mot 3 till 5 år för hus med högre förbrukning.",
  },
  {
    q: "Vad gäller efter husförsäljning?",
    a: "Garantin på vår installation gäller även när du sålt huset, den följer fastigheten. Vi har eget montageteam så om något krånglar tre år senare är det samma personer som svarar.",
  },
];

export default function HomePage() {
  // Banderoll bara på landningssidan. Läses server-side, dismissal
  // sker client-side via localStorage i komponenten.
  const featured = getFeaturedPressRelease();
  return (
    <>
      {featured && (
        <PressBanner slug={featured.slug} title={featured.title} />
      )}
      <JsonLd data={faqPageSchema(HOME_FAQ)} />
      <JsonLd data={localBusinessSchema} />
      <JsonLd
        data={videoObjectSchema({
          name: "Optimera Energi, filmen om varför vi finns",
          description:
            "En kort film om hur Optimera bygger den första familjära men kompromisslösa elfirman i Sverige. Solpaneler, batterier, värmepumpar och laddboxar i Stockholm.",
          thumbnailUrl: "/poster.svg",
          uploadDate: "2026-05-24",
          durationISO: "PT2M14S",
          contentUrl: "/hero.mp4",
        })}
      />
      <Hero />

      <Section
        eyebrow="Allt under ett tak – bokstavligt"
        title={
          <>
            Fyra installations&shy;tjänster.
            <br />
            <span className="italic font-serif text-indigo">Ett team som tar ansvaret.</span>
          </>
        }
        intro="Vi specialiserar oss på att inte specialisera oss på en sak. När sol, batteri, värme och laddning pratar med varandra – då blir helheten större än delarna."
      >
        <ServicesGrid />
      </Section>

      <Section
        eyebrow="Vår hållning"
        title={
          <>
            Vad vi gör
            <br />
            <span className="italic font-serif">annorlunda.</span>
          </>
        }
      >
        <Manifesto />
      </Section>

      <Section
        eyebrow="Familjen Optimera på vägen"
        title={<>Vi dyker upp. Med bullar.</>}
        intro="Hembesök, montage, driftsättning. Det här är hur vi faktiskt ser ut när vi jobbar."
      >
        <HousecallStrip />
      </Section>

      <Section eyebrow="Processen" title={<>Sex steg, inga genvägar.</>}>
        <Process />
      </Section>

      <Section
        eyebrow="Filmen om oss"
        title={<>Två minuter om varför vi finns.</>}
        intro="En kort film om hur Optimera bygger den första familjära men kompromisslösa elfirman i Sverige."
      >
        <VideoStage />
      </Section>

      <Section
        eyebrow="Vad kunderna säger"
        title={<>Recensioner från riktiga kök.</>}
      >
        <Testimonials />
      </Section>

      {/* Visible FAQ: speglar FAQPage-schemat ovan. Krav för Google FAQ
          rich results, ger AI-citation-text, fångar PAA-intents
          ("vad gör optimera energi", "var ligger optimera energi", etc). */}
      <Section
        eyebrow="Vanliga frågor"
        title={<>Det vi får oftast.</>}
        intro="Korta svar med pris, plats och process. Står svaret på din fråga inte med här, ring oss på 076 305 37 32 eller mejla hej@optimeraenergi.se."
      >
        <div className="divide-y divide-ink/10 border-y border-ink/10">
          {HOME_FAQ.map((q) => (
            <Disclosure key={q.q} question={q.q}>
              <p className="text-ink/75 leading-relaxed text-[15px]">{q.a}</p>
            </Disclosure>
          ))}
        </div>
      </Section>

      <Section>
        <CtaPanel />
      </Section>
    </>
  );
}
