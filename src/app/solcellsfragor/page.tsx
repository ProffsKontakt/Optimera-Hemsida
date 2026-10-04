import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/site/Section";
import { JsonLd, collectionPageSchema } from "@/components/seo/JsonLd";
import { Breadcrumbs, LastUpdated, CtaBlock } from "@/components/seo/aeo";
import { KbSearch, type KbGroup } from "@/components/kb/KbSearch";
import { snippetOf } from "@/components/kb/KbParts";
import {
  SOLAR_CATEGORIES,
  allQuestions,
  questionsInCategory,
  solarUpdatedAt,
} from "@/lib/solcellsfragor";
import { allConcepts } from "@/lib/batteriskolan";

const PATH = "/solcellsfragor";

export function generateMetadata() {
  const count = allQuestions().length;
  return {
    title: "Solcellsfrågor: svar på det svenskar söker om solceller",
    description: `${count} frågor som svenskar söker på om solceller – pris, lönsamhet, produktion, bygglov, skatt och säkerhet – besvarade en och en, med källor. Uppdateras löpande.`,
    alternates: { canonical: PATH },
    openGraph: {
      title: "Solcellsfrågor · Optimera Energi",
      description:
        "Svar på de frågor svenskar oftast söker på om solceller – en sida per fråga, alltid med källor.",
      url: PATH,
      type: "website" as const,
    },
  };
}

export default function SolarQuestionsHub() {
  const questions = allQuestions();
  const groups: KbGroup[] = SOLAR_CATEGORIES.map((c) => ({
    id: c.slug,
    title: c.title,
    intro: c.intro,
    items: questionsInCategory(c.slug).map((q) => ({
      href: `${PATH}/${q.slug}`,
      title: q.question,
      snippet: snippetOf(q.shortAnswer),
      keywords: q.searchPhrases.join(" "),
    })),
  })).filter((g) => g.items.length > 0);

  const conceptCount = allConcepts().length;

  return (
    <>
      <JsonLd
        data={collectionPageSchema({
          url: PATH,
          name: "Solcellsfrågor",
          description:
            "Svar på de frågor svenskar oftast söker på om solceller – en sida per fråga, med källor.",
          items: questions.map((q) => ({
            url: `${PATH}/${q.slug}`,
            name: q.question,
          })),
        })}
      />

      <section className="container-edge pt-10 md:pt-16 pb-6">
        <Breadcrumbs
          items={[
            { name: "Hem", href: "/" },
            { name: "Kunskapsbank", href: "/kunskapsbank" },
            { name: "Solcellsfrågor", href: PATH },
          ]}
        />
        <div className="mt-8 max-w-3xl">
          <div className="eyebrow">Kunskapsbank · {questions.length} frågor</div>
          <h1 className="mt-5 font-display text-[44px] sm:text-[56px] md:text-[80px] tracking-display-tight leading-[1.05]">
            Solcellsfrågor.{" "}
            <span className="italic font-serif text-indigo">Besvarade.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-ink/70 text-lg leading-relaxed">
            Vi har samlat frågorna som svenskar oftast ställer till Google om
            solceller – och besvarat dem en och en. Raka svar först, sedan
            fördjupningen, och alltid med källorna så att du kan kontrollera
            oss. Nya frågor läggs till löpande.
          </p>
          <div className="mt-8">
            <LastUpdated date={solarUpdatedAt()} />
          </div>
        </div>
      </section>

      <section className="container-edge pt-4 pb-16 md:pb-24">
        <KbSearch
          groups={groups}
          placeholder={`Sök bland ${questions.length} solcellsfrågor…`}
          variant="list"
        />
      </section>

      {conceptCount > 0 && (
        <Section className="!py-12 md:!py-16">
          <Link
            href="/batteriskolan"
            className="group flex flex-col gap-5 rounded-[28px] border border-ink/10 bg-cream/50 p-8 transition-colors hover:border-ink/30 md:flex-row md:items-center md:justify-between md:p-12"
          >
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-indigo">
                Batteriskolan · {conceptCount} koncept
              </div>
              <h2 className="mt-3 max-w-2xl font-display text-3xl md:text-4xl tracking-display-tight leading-tight">
                Funderar du på batteri? Så fungerar FCR-D, effektavgift och
                kvartspris.
              </h2>
            </div>
            <span className="inline-flex shrink-0 items-center gap-2 text-[14px] text-ink/70 group-hover:text-indigo">
              Till Batteriskolan <ArrowRight size={16} />
            </span>
          </Link>
        </Section>
      )}

      <Section className="!py-16 md:!py-20">
        <CtaBlock
          eyebrow="Vill du ha svar för just ditt hus?"
          title={<>Räkna på ditt tak, eller boka ett kostnadsfritt hembesök.</>}
          primaryHref="/kalkylator"
          primaryLabel="Öppna kalkylatorn"
          secondaryHref="/offert"
          secondaryLabel="Boka hembesök"
        />
      </Section>
    </>
  );
}
