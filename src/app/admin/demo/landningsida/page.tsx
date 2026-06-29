import { redirect } from "next/navigation";
import { isAdminAuthed } from "@/lib/admin-auth";
import { getMedia } from "@/lib/media";
import { DemoBanner } from "@/components/admin/DemoBanner";
import { DemoHero } from "@/components/demo/DemoHero";
import { DemoServicesGrid } from "@/components/demo/DemoServicesGrid";
import { DemoBrandRow } from "@/components/demo/DemoBrandRow";
import { DemoSection } from "@/components/demo/DemoSection";
import { Disclosure } from "@/components/site/Disclosure";
import { DemoManifesto } from "@/components/demo/DemoManifesto";
import { HousecallStrip } from "@/components/home/HousecallStrip";
import { DemoProcess } from "@/components/demo/DemoProcess";
import { Testimonials } from "@/components/home/Testimonials";
import { VideoStage } from "@/components/home/VideoStage";
import { CtaPanel } from "@/components/home/CtaPanel";

export const metadata = {
  title: "Landningsida (demo)",
  robots: { index: false, follow: false },
};

// Auth-gate måste köras per request (cookie-koll), aldrig prerenderas.
export const dynamic = "force-dynamic";

// Trimmad FAQ för demon (live visar 6). Egen kopia så live-sidan är orörd.
const DEMO_FAQ = [
  {
    q: "Vad gör Optimera Energi?",
    a: "Vi installerar solpaneler, batterier och laddboxar för villor och bostadsrättsföreningar i Stockholm – med eget montageteam, inga underentreprenörer.",
  },
  {
    q: "Vad kostar solceller hos er?",
    a: "En typisk villa med 14 paneler landar runt 50 000 kr efter grönt avdrag (14,55 %). Räkna på din lösning i kalkylatorn.",
  },
  {
    q: "Var installerar ni?",
    a: "Solna, Stockholm, Sundbyberg, Täby, Lidingö, Sollentuna, Nacka och Danderyd. Vårt lager ligger på Vallgatan 9 i Solna.",
  },
  {
    q: "Hur lång är återbetalningstiden?",
    a: "En ren solanläggning i Stockholm har 8–11 år. Med batteri och stödtjänster kommer den ner mot 3–5 år för hus med högre förbrukning.",
  },
];

/**
 * DEMO av startsidan. Samma komponenter som live, men en avskalad
 * komposition (declutter-förslagen): konsoliderad "Så jobbar vi", social
 * proof tidigare, lättare sektionsvikter (eyebrows borttagna + mindre padding
 * på sekundära sektioner) och kortad FAQ. Inga delade komponenter ändras –
 * live-startsidan (/) påverkas inte alls.
 */
export default function DemoLandingPage() {
  if (!process.env.ADMIN_PASSWORD || !isAdminAuthed()) {
    redirect("/admin/login");
  }
  const hero = getMedia("demo:hero-landningsida");
  return (
    <>
      <DemoBanner label="Landningsida – demo" />
      <DemoHero heroImageUrl={hero?.url} heroImageAlt={hero?.alt} />

      {/* Primär sektion: tjänster (full vikt), rensade kort */}
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

      {/* Lugn statisk varumärkesrad (ersätter hero-marqueen) */}
      <DemoBrandRow />

      {/* Social proof tidigt – tystare sektion (ingen eyebrow, mindre padding) */}
      <DemoSection
        title={<>Recensioner från riktiga kunder.</>}
        className="!py-16 md:!py-24"
      >
        <Testimonials />
      </DemoSection>

      {/* Konsoliderat "Så jobbar vi" – ETT huvud istället för tre sektioner */}
      <DemoSection eyebrow="Så jobbar vi" title={<>Sex steg, inga genvägar.</>}>
        <DemoProcess />
        <div className="mt-24">
          <DemoManifesto />
        </div>
        <div className="mt-24">
          <HousecallStrip />
        </div>
      </DemoSection>

      {/* Film – fokuserat moment (full vikt) */}
      <DemoSection
        eyebrow="Filmen om oss"
        title={<>Två minuter om varför vi finns.</>}
      >
        <VideoStage />
      </DemoSection>

      {/* FAQ – kortad till 4, tystare */}
      <DemoSection title={<>Vanliga frågor.</>} className="!py-16 md:!py-24">
        <div className="divide-y divide-ink/10 border-y border-ink/10">
          {DEMO_FAQ.map((q) => (
            <Disclosure key={q.q} question={q.q}>
              <p className="text-ink/75 leading-relaxed text-[15px]">{q.a}</p>
            </Disclosure>
          ))}
        </div>
      </DemoSection>

      <DemoSection>
        <CtaPanel />
      </DemoSection>
    </>
  );
}
