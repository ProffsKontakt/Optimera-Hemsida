import { Hero } from "@/components/site/Hero";
import { Section } from "@/components/site/Section";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { Manifesto } from "@/components/home/Manifesto";
import { HousecallStrip } from "@/components/home/HousecallStrip";
import { Process } from "@/components/home/Process";
import { Testimonials } from "@/components/home/Testimonials";
import { VideoStage } from "@/components/home/VideoStage";
import { CtaPanel } from "@/components/home/CtaPanel";

export default function HomePage() {
  return (
    <>
      <Hero />

      <Section
        eyebrow="Allt under ett tak – bokstavligt"
        title={
          <>
            Fem installations&shy;tjänster.
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

      <Section>
        <CtaPanel />
      </Section>
    </>
  );
}
