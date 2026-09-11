import Link from "next/link";
import { PressBanner } from "@/components/site/PressBanner";
import { getFeaturedPressRelease } from "@/lib/press";
import { getMedia } from "@/lib/media";
import { Disclosure } from "@/components/site/Disclosure";
import { DemoHero } from "@/components/demo/DemoHero";
import { DemoSection } from "@/components/demo/DemoSection";
import { DemoBrandRow } from "@/components/demo/DemoBrandRow";
import { EnergySystem } from "@/components/home/EnergySystem";
import { getVisibleReviews } from "@/lib/reviews";
import { DemoProcess } from "@/components/demo/DemoProcess";
import { DemoManifesto } from "@/components/demo/DemoManifesto";
import { Testimonials } from "@/components/home/Testimonials";
import { CtaPanel } from "@/components/home/CtaPanel";
import { RecoBadge } from "@/components/site/RecoBadge";
import {
  JsonLd,
  faqPageSchema,
  localBusinessSchema,
} from "@/components/seo/JsonLd";

// Köpar-språk-frågor som matchar Google Suggest och AI-search-frågor för
// "Optimera Energi" + lokala intent-termer. Hjälper både rich snippets och
// AI-citations från ChatGPT, Gemini, Perplexity.
const HOME_FAQ = [
  {
    q: "Vad gör Optimera Energi?",
    a: "Optimera Energilösningar i Mälardalen AB är en svensk elinstallatör i Solna som installerar solpaneler, batterier och laddboxar för villor och bostadsrättsföreningar i Stockholms län. Installationerna görs av noggrant utvalda, certifierade installatörer som vi tar fullt ansvar för.",
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
    a: "Garantin på vår installation gäller även när du sålt huset, den följer fastigheten. Om något krånglar tre år senare är det fortfarande oss du ringer – vi tar fullt ansvar för installationen.",
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

      <DemoHero
        heroImageUrl={heroBg?.url}
        heroImageAlt={heroBg?.alt}
        heroFrost={heroBg?.frost}
      />

      {/* Social proof DIREKT under hero. Kureras i /admin/recensioner,
          källa: företagets Reco-profil. */}
      <DemoSection
        eyebrow="Recensioner · via Reco"
        title={<>Kunderna säger det bäst.</>}
        className="!py-16 md:!py-24"
        // Badgen ligger bredvid rubriken på desktop och nere vid betygsraden
        // på mobil (där rubrikraden är för smal för den).
        aside={<RecoBadge size={116} tilt className="hidden md:block" />}
      >
        <Testimonials reviews={getVisibleReviews()} />
        {/* Betyg + länk till källan. Snittbetyget uppdateras manuellt vid
            behov (kontrollera på reco.se/optimera-energi). */}
        <div className="mt-8 flex items-center gap-4">
          <RecoBadge size={66} tilt className="md:hidden" />
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[14px] text-ink/60">
            <span className="text-[#47c645]">★</span>
            <span>4,8 av 5 i betyg (10 omdömen) på</span>
            {/* Officiella Reco-loggan (hämtad från reco.se). */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/reco.svg" alt="Reco" className="h-[18px] w-auto" />
            <span>–</span>
            <a
              href="https://www.reco.se/optimera-energi"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 decoration-ink/30 hover:text-ink hover:decoration-ink/60 transition"
            >
              läs alla omdömen
            </a>
          </p>
        </div>
      </DemoSection>

      {/* Systemet: sol + batteri + laddbox som EN helhet. Ersätter den
          gamla tjänste-griden; korten länkar till tjänstesidorna. */}
      <DemoSection
        eyebrow="Så går det ihop"
        title={
          <>
            Sol, batteri och laddbox.{" "}
            <span className="italic font-serif text-indigo">Ett system.</span>
          </>
        }
        intro="Var för sig sänker de räkningen. Tillsammans gör de villan inte bara energisnål – den kan till och med gå plus över året."
      >
        <EnergySystem />
      </DemoSection>

      {/* Lugn statisk varumärkesrad */}
      <DemoBrandRow />

      {/* Konsoliderat "Så jobbar vi" – ETT huvud i stället för tre sektioner */}
      <DemoSection eyebrow="Så jobbar vi" title={<>Sex steg, inga genvägar.</>}>
        <DemoProcess />
        <div className="mt-24">
          <DemoManifesto />
        </div>
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
