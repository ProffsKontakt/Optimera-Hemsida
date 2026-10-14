import { LegalLayout, H2, P, UL } from "@/components/site/LegalLayout";
import {
  VILLKOR_INTRO,
  VILLKOR_SEKTIONER,
  VILLKOR_UPPDATERADE,
} from "@/lib/allmanna-villkor";

export const metadata = {
  title: "Allmänna villkor",
  description:
    "Allmänna villkor för offerter, leveranser och installationer från Optimera Energilösningar i Mälardalen AB — samma villkor som i din offert.",
  alternates: { canonical: "/villkor" },
};

/**
 * Samma allmänna villkor som kunden godkänner i offerten och som säljarnas
 * miniavtal och energiprotokoll hänvisar till. Texten genereras ur Hubben
 * (src/lib/allmanna-villkor.ts) — ändra den där, inte här.
 */
export default function VillkorPage() {
  return (
    <LegalLayout
      eyebrow="Juridik"
      title="Allmänna villkor"
      updatedAt={VILLKOR_UPPDATERADE}
    >
      <P>
        De här villkoren gäller när du köper solceller, batteri, laddbox eller
        annan installation av oss. Det är samma villkor som står i din offert
        och som gäller för avtal som skrivs vid ett hembesök. Har du frågor,
        mejla{" "}
        <a className="text-indigo underline" href="mailto:hej@optimeraenergi.se">
          hej@optimeraenergi.se
        </a>{" "}
        eller ring 076-305 37 32.
      </P>
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/55">
        {VILLKOR_INTRO}
      </p>

      {VILLKOR_SEKTIONER.map((sektion) => (
        <section key={sektion.rubrik}>
          <H2>{sektion.rubrik}</H2>
          <div className="space-y-4">
            {sektion.delar.map((del, i) =>
              typeof del === "string" ? (
                <P key={i}>{del}</P>
              ) : (
                <UL key={i}>
                  {del.map((punkt) => (
                    <li key={punkt}>{punkt}</li>
                  ))}
                </UL>
              ),
            )}
          </div>
        </section>
      ))}

      <H2>Bolagsuppgifter</H2>
      <P>
        Optimera Energilösningar i Mälardalen AB, org.nr 559375-2206,
        Vallgatan 9, Solna. Telefon 076-305 37 32, e-post{" "}
        <a className="text-indigo underline" href="mailto:hej@optimeraenergi.se">
          hej@optimeraenergi.se
        </a>
        .
      </P>
    </LegalLayout>
  );
}
