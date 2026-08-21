import Link from "next/link";
import { PressBanner } from "@/components/site/PressBanner";
import { getFeaturedPressRelease } from "@/lib/press";
import { getMedia } from "@/lib/media";
import { Disclosure } from "@/components/site/Disclosure";
import { DemoHero } from "@/components/demo/DemoHero";
import { DemoSection } from "@/components/demo/DemoSection";
import { DemoServicesGrid } from "@/components/demo/DemoServicesGrid";
import { DemoBrandRow } from "@/components/demo/DemoBrandRow";
import { DemoProcess } from "@/components/demo/DemoProcess";
import { DemoManifesto } from "@/components/demo/DemoManifesto";
import { HousecallStrip } from "@/components/home/HousecallStrip";
import { Testimonials } from "@/components/home/Testimonials";
import { VideoStage } from "@/components/home/VideoStage";
import { CtaPanel } from "@/components/home/CtaPanel";
import {
  JsonLd,
  faqPageSchema,
  videoObjectSchema,
  localBusinessSchema,
} from "@/components/seo/JsonLd";

// Köpar-språk-frågor som matchar Google Suggest och AI-search-frågor för
// "Optimera Energi" + lokala intent-termer. Hjälper både rich snippets och
// AI-citations från ChatGPT, Gemini, Perplexity.
const HOME_FAQ = [
  {
    q: "Vad gör Optimera Energi?",
    a: "Optimera Energi Sverige AB är en svensk elinstallatör i Solna som installerar solpaneler, batterier och laddboxar för villor och bostadsrättsföreningar i Stockholms län. Vi har eget montageteam, inga underentreprenörer.",
  },
  {
    q: "Var ligger Optimera Energi?",
    a: "Kontoret och lagret ligger på Vallgatan 9, 170 67 Solna. Vi installerar i Solna, Stockholm, Sundbyberg, Täby, Lidingö, Sollentuna, Nacka och Danderyd.",
  },
  {
    q: "Vad kostar solceller hos Optimera Energi?",
    a: "En typisk villa med 14 paneler landar runt 50 000 kr efter grönt avdrag (14,55 procent). Bygg din lösning i 3D-kalkylatorn på optimeraenergi.se/kalkylator och se vilken riktning återbetalningen tar – exakt pris räknar en tekniker fram vid hembesöket.",
  },
  {
    q: "Hur stort är det gröna avdraget 2026?",
    a: "Solpaneler ger 14,55 procent, batterier och laddboxar 48,5 procent. Avdragstaket är 50 000 kr per fastighetsägare och år. Vi drar av summan direkt på fakturan.",
  },
  {
    q: "Hur lång är återbetalningstiden?",
    a: "Att lägga batteri till befintliga solceller är ofta snabbast – typiskt 2 till 5 år. En ny sol- och batterilösning tar oftast 4 till 7,5 år. Exakt siffra beror på tak, förbrukning och elområde och räknar vi fram vid hembesöket.",
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
  // Frostad hero-bakgrund: bild + frostningsgrad väljs i /admin/media
  // (slot demo:hero-landningsida). Utan bild: ren bone-bakgrund.
  const heroBg = getMedia("demo:hero-landningsida");
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
            "En kort film om hur Optimera bygger den första familjära men kompromisslösa elfirman i Sverige. Solpaneler, batterier och laddboxar i Stockholm.",
          thumbnailUrl: "/poster.svg",
          uploadDate: "2026-05-24",
          durationISO: "PT2M14S",
          contentUrl: "/hero.mp4",
        })}
      />

      <DemoHero
        heroImageUrl={heroBg?.url}
        heroImageAlt={heroBg?.alt}
        heroFrost={heroBg?.frost}
      />

      {/* Tjänster (full vikt) – tre tjänster, rensade kort */}
      <DemoSection
        eyebrow="Allt under ett tak"
        title={
          <>
            Tre tjänster.{" "}
            <span className="italic font-serif text-indigo">Ett team.</span>
          </>
        }
        intro="När sol, batteri och laddning pratar med varandra blir helheten större än delarna."
      >
        <DemoServicesGrid />
      </DemoSection>

      {/* Lugn statisk varumärkesrad */}
      <DemoBrandRow />

      {/* Social proof tidigt – tystare sektion */}
      <DemoSection
        title={<>Recensioner från riktiga kunder.</>}
        className="!py-16 md:!py-24"
      >
        <Testimonials />
      </DemoSection>

      {/* Konsoliderat "Så jobbar vi" – ETT huvud i stället för tre sektioner */}
      <DemoSection eyebrow="Så jobbar vi" title={<>Sex steg, inga genvägar.</>}>
        <DemoProcess />
        <div className="mt-24">
          <DemoManifesto />
        </div>
        <div className="mt-24">
          <HousecallStrip />
        </div>
      </DemoSection>

      {/* Film */}
      <DemoSection
        eyebrow="Filmen om oss"
        title={<>Två minuter om varför vi finns.</>}
      >
        <VideoStage />
      </DemoSection>

      {/* Synlig FAQ speglar FAQPage-schemat ovan (Google rich results +
          AI-citation-text). */}
      <DemoSection title={<>Vanliga frågor.</>} className="!py-16 md:!py-24">
        <div className="divide-y divide-ink/10 border-y border-ink/10">
          {HOME_FAQ.map((q) => (
            <Disclosure key={q.q} question={q.q}>
              <p className="text-ink/75 leading-relaxed text-[15px]">{q.a}</p>
            </Disclosure>
          ))}
        </div>
        {/* Beskrivande interna länkar från sajtens starkaste sida till
            FAQ-hubben och solcellsbatteri-pelarsidan (AI-search/PageRank). */}
        <p className="mt-6 text-[14px] text-ink/60 leading-relaxed">
          Fler frågor? Läs våra{" "}
          <Link
            href="/fragor-och-svar"
            className="text-indigo hover:underline underline-offset-2"
          >
            samlade frågor och svar
          </Link>
          . Funderar du på batteri? Läs guiden{" "}
          <Link
            href="/solcellsbatteri"
            className="text-indigo hover:underline underline-offset-2"
          >
            solcellsbatteri till villa – pris, storlek och grönt avdrag
          </Link>
          .
        </p>
      </DemoSection>

      <DemoSection>
        <CtaPanel />
      </DemoSection>
    </>
  );
}
