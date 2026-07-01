import { redirect } from "next/navigation";
import { isAdminAuthed } from "@/lib/admin-auth";
import { DemoBanner } from "@/components/admin/DemoBanner";
import { DemoSection } from "@/components/demo/DemoSection";
import { DemoCalc } from "@/components/demo/DemoCalc";

export const metadata = {
  title: "Kalkylator (demo)",
  robots: { index: false, follow: false },
};

// Auth-gate måste köras per request (cookie-koll), aldrig prerenderas.
export const dynamic = "force-dynamic";

/**
 * DEMO av en avskalad kalkylator utan exakta kronor. Konceptet (klicka i vad
 * du vill ha) är kvar, men resultatet är ärliga riktnings-spann som lotsar mot
 * ett samtal med en tekniker. Live /kalkylator är orörd.
 */
export default function DemoKalkylatorPage() {
  if (!process.env.ADMIN_PASSWORD || !isAdminAuthed()) {
    redirect("/admin/login");
  }
  return (
    <>
      <DemoBanner label="Kalkylator – demo" />
      <DemoSection
        eyebrow="Räkna på din lösning"
        title={
          <>
            Vad vill du ha –{" "}
            <span className="italic font-serif text-indigo">
              så visar vi riktningen.
            </span>
          </>
        }
        intro="Klicka i vad du funderar på. Vi visar vad det brukar innebära – och räknar fram exakta siffror åt dig när vi ses."
      >
        <DemoCalc />
      </DemoSection>
    </>
  );
}
