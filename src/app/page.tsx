import { PressBanner } from "@/components/site/PressBanner";
import { getFeaturedPressRelease } from "@/lib/press";
import { getMedia } from "@/lib/media";
import { getVisibleReviews } from "@/lib/reviews";
import { getVisibleTeam } from "@/lib/team";
import { visibleServiceText } from "@/lib/services";
import { getRecoStats } from "@/lib/reco-live";
import {
  JsonLd,
  faqPageSchema,
  localBusinessSchema,
} from "@/components/seo/JsonLd";
import { RevealObserver } from "@/components/landing/RevealObserver";
import { RevealBoot } from "@/components/landing/RevealBoot";
import { LandingHero } from "@/components/landing/LandingHero";
import { BrandMarquee } from "@/components/landing/BrandMarquee";
import { HouseDay } from "@/components/landing/HouseDay";
import { FourParts } from "@/components/landing/FourParts";
import { CalculatorTeaser } from "@/components/landing/CalculatorTeaser";
import { ProcessGrid } from "@/components/landing/ProcessGrid";
import { OriginStory } from "@/components/landing/OriginStory";
import { ReviewWall } from "@/components/landing/ReviewWall";
import { Principles } from "@/components/landing/Principles";
import { TeamGrid, type TeamCard } from "@/components/landing/TeamGrid";
import { HomeFaq } from "@/components/landing/HomeFaq";
import { BookingCta } from "@/components/landing/BookingCta";
import { FAQ_CATEGORIES } from "@/lib/faq-content";

// Köpar-språk-frågor som matchar Google Suggest och AI-search-frågor för
// "Optimera Energi" + lokala intent-termer. Hjälper både rich snippets och
// AI-citations från ChatGPT, Gemini, Perplexity.
const HOME_FAQ = [
  {
    q: "Vad gör Optimera Energi?",
    a: `Optimera Energilösningar i Mälardalen AB är en svensk elinstallatör i Solna som installerar ${visibleServiceText("plural")} för villor och bostadsrättsföreningar i Stockholms län. Installationerna görs av noggrant utvalda, certifierade installatörer som vi tar fullt ansvar för.`,
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
    a: "Solpaneler ger 14,55 procent, batterier och laddboxar 48,5 procent. Avdragstaket är 50 000 kr per person och år. Vi drar av summan direkt på fakturan.",
  },
  {
    q: "Hur lång är återbetalningstiden?",
    a: "Att lägga batteri till befintliga solceller är ofta snabbast – typiskt 3 till 7 år. En ny sol- och batterilösning tar oftast 4 till 7 år, och ett batteri utan solceller 5 till 9 år. Exakt siffra beror på tak, förbrukning och elområde och räknar vi fram vid hembesöket.",
  },
  {
    q: "Vad gäller efter husförsäljning?",
    a: "Garantin på vår installation gäller även när du sålt huset, den följer fastigheten. Om något krånglar tre år senare är det fortfarande oss du ringer – vi tar fullt ansvar för installationen.",
  },
];

/** Hämtar en redan granskad fråga ur /fragor-och-svar (lib/faq-content.ts). */
function sharedFaq(q: string) {
  for (const cat of FAQ_CATEGORIES) {
    const hit = cat.items.find((it) => it.q === q);
    if (hit) return { q: hit.q, a: hit.a };
  }
  return null;
}

// Den synliga listan börjar med det besökaren undrar strax före bokningen:
// vad hembesöket kostar, vad anläggningen kostar och när den betalar sig.
// Tre frågor lånas ordagrant från /fragor-och-svar, där de redan finns i
// FAQ-schemat; därför ligger de inte i startsidans schema (samma fråga ska
// bara märkas upp på en sida). Försvinner en fråga där, försvinner den här.
const byQ = (q: string) => HOME_FAQ.find((it) => it.q === q) ?? null;
const VISIBLE_FAQ = [
  sharedFaq("Vad kostar ett hembesök?"),
  byQ("Vad kostar solceller hos Optimera Energi?"),
  byQ("Hur lång är återbetalningstiden?"),
  byQ("Hur stort är det gröna avdraget 2026?"),
  sharedFaq("Vem utför installationen?"),
  sharedFaq("Är ett batteri säkert i hemmet?"),
  byQ("Vad gäller efter husförsäljning?"),
  byQ("Vad gör Optimera Energi?"),
  byQ("Var ligger Optimera Energi?"),
].filter((it): it is { q: string; a: string } => it !== null);

// Reco-betyget hämtas live (lib/reco-live.ts) – sidan byggs om i bakgrunden
// högst en gång i timmen så att antalet omdömen följer Reco.
export const revalidate = 3600;

/**
 * Startsidan. Sektionerna ligger i components/landing och är i huvudsak
 * serverkomponenter. Det enda som körs i webbläsaren är dygnsväljaren,
 * kalkylen (laddas först när den närmar sig bild), sifferuppräkningen och
 * en liten observatör som tänder skroll-animationerna.
 */
export default async function HomePage() {
  const reco = await getRecoStats();
  // Banderoll bara på landningssidan. Läses server-side, dismissal
  // sker client-side via localStorage i komponenten.
  const featured = getFeaturedPressRelease();
  // Teamet redigeras i /admin/team, porträtten i /admin/media (team:<id>).
  const team: TeamCard[] = getVisibleTeam().map((m) => {
    const photo = getMedia(`team:${m.id}`);
    return {
      ...m,
      photoUrl: photo?.url ?? null,
      photoAlt: photo?.alt || `${m.name}, ${m.role} på Optimera Energi`,
    };
  });

  return (
    <>
      {featured && (
        <PressBanner slug={featured.slug} title={featured.title} />
      )}
      <JsonLd data={faqPageSchema(HOME_FAQ)} />
      <JsonLd data={localBusinessSchema} />
      <RevealObserver />

      <LandingHero reco={reco} />
      <BrandMarquee />
      <HouseDay />
      <FourParts />
      <CalculatorTeaser />
      <ProcessGrid />
      <OriginStory teamCount={team.length} />
      {/* Omdömen kureras i /admin/recensioner, källa: företagets Reco-profil. */}
      <ReviewWall reviews={getVisibleReviews()} reco={reco} />
      <Principles />
      <TeamGrid team={team} />
      {/* Alla frågor i FAQPage-schemat ovan finns i den synliga listan,
          som dessutom har tre frågor från /fragor-och-svar. */}
      <HomeFaq items={VISIBLE_FAQ} />
      <BookingCta reco={reco} />
      <RevealBoot />
    </>
  );
}
