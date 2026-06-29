import { redirect } from "next/navigation";
import { isAdminAuthed } from "@/lib/admin-auth";
import { DemoBanner } from "@/components/admin/DemoBanner";
import { Hero } from "@/components/site/Hero";
import { Section } from "@/components/site/Section";
import { Disclosure } from "@/components/site/Disclosure";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { Manifesto } from "@/components/home/Manifesto";
import { HousecallStrip } from "@/components/home/HousecallStrip";
import { Process } from "@/components/home/Process";
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
    a: "Vi installerar solpaneler, batterier, värmepumpar och laddboxar för villor och bostadsrättsföreningar i Stockholm – med eget montageteam, inga underentreprenörer.",
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
  return (
    <>
      <DemoBanner label="Landningsida – demo" />
      <Hero />

      {/* Primär sektion: tjänster (full vikt) */}
      <Section
        eyebrow="Allt under ett tak"
        title={
          <>
            Fyra tjänster.{" "}
            <span className="italic font-serif text-indigo">Ett team.</span>
          </>
        }
        intro="När sol, batteri, värme och laddning pratar med varandra blir helheten större än delarna."
      >
        <ServicesGrid />
      </Section>

      {/* Social proof tidigt – tystare sektion (ingen eyebrow, mindre padding) */}
      <Section
        title={<>Recensioner från riktiga kök.</>}
        className="!py-16 md:!py-24"
      >
        <Testimonials />
      </Section>

      {/* Konsoliderat "Så jobbar vi" – ETT huvud istället för tre sektioner */}
      <Section eyebrow="Så jobbar vi" title={<>Sex steg, inga genvägar.</>}>
        <Process />
        <div className="mt-24">
          <Manifesto />
        </div>
        <div className="mt-24">
          <HousecallStrip />
        </div>
      </Section>

      {/* Film – fokuserat moment (full vikt) */}
      <Section
        eyebrow="Filmen om oss"
        title={<>Två minuter om varför vi finns.</>}
      >
        <VideoStage />
      </Section>

      {/* FAQ – kortad till 4, tystare */}
      <Section title={<>Vanliga frågor.</>} className="!py-16 md:!py-24">
        <div className="divide-y divide-ink/10 border-y border-ink/10">
          {DEMO_FAQ.map((q) => (
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
