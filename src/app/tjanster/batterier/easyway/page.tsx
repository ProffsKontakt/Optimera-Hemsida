import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Section } from "@/components/site/Section";
import { Disclosure } from "@/components/site/Disclosure";
import {
  JsonLd,
  faqPageSchema,
  breadcrumbSchema,
} from "@/components/seo/JsonLd";

const PATH = "/tjanster/batterier/easyway";

export const metadata = {
  title: "Varför vi rekommenderar Easyway",
  description:
    "Easyway ger mest kWh för pengarna och lägger allt krut på hårdvaran, medan styrningen sköts av växelriktaren eller en tredjepart. Så tänker vi kring batterier.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Varför vi rekommenderar Easyway – Optimera Energi",
    description:
      "Mest kWh för pengarna, hårdvara byggd för att hålla och fri styrning. Varför Easyway står ut i vår mening.",
    url: PATH,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Varför vi rekommenderar Easyway – Optimera Energi",
    description:
      "Mest kWh för pengarna, hårdvara byggd för att hålla och fri styrning.",
  },
};

const FAQ = [
  {
    q: "Varför rekommenderar ni Easyway?",
    a: "För att du får mest kWh för pengarna utan att kompromissa på kvalitet. Easyway lägger sina resurser på hårdvaran, och överlåter styrningen till växelriktaren eller en tredjepart. Det ger ett batteri som håller länge och en ekonomi som en riktigt bra styrning kan optimera.",
  },
  {
    q: "Vad menar ni med att hårdvara och styrning är separerade?",
    a: "Ett batterisystem är egentligen två saker: cellerna och lådan som lagrar energin (hårdvaran), och hjärnan som bestämmer när det laddas och laddas ur (styrningen). Easyway fokuserar på hårdvaran. Styrningen kommer från växelriktaren eller en fristående tredjepart som gör bara det. Var och en kan då lägga all sin utveckling på det den är bäst på.",
  },
  {
    q: "Blir jag låst till en viss styrning?",
    a: "Nej, det är själva poängen. Eftersom hårdvaran inte är sammankopplad med en egen låst styrning kan du köra den mot växelriktarens logik eller en tredjepartsstyrning mot spotpris och stödtjänster. Byter marknaden skepnad går det att byta styrning utan att byta batteri.",
  },
  {
    q: "Passar Easyway om jag redan har solceller?",
    a: "Ja. Att lägga ett batteri till en befintlig solanläggning är ofta den bästa affären, och mycket kWh till rätt pris gör den ännu bättre. Vi dimensionerar utifrån din förbrukning och ditt elavtal, inte utifrån ett datablad.",
  },
];

export default function EasywayPage() {
  return (
    <>
      <JsonLd data={faqPageSchema(FAQ)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Hem", href: "/" },
          { name: "Batterier", href: "/tjanster/batterier" },
          { name: "Easyway", href: PATH },
        ])}
      />

      <section className="container-edge pt-12 md:pt-20 pb-4">
        <Link
          href="/tjanster/batterier"
          className="inline-flex items-center gap-2 text-[13.5px] text-ink/60 hover:text-ink transition-colors"
        >
          <ArrowLeft size={15} /> Tillbaka till batterier
        </Link>
        <div className="mt-8 max-w-3xl">
          <div className="eyebrow">Batteri · Vår rekommendation</div>
          <h1 className="mt-5 font-display text-[56px] md:text-[88px] tracking-display-tight leading-[0.95]">
            Därför{" "}
            <span className="italic font-serif text-indigo">Easyway.</span>
          </h1>
          <p className="mt-6 text-2xl md:text-3xl font-display tracking-display-tight text-ink/80 leading-snug max-w-2xl">
            Mycket batteri för pengarna, och en styrning som får lösa ekonomin.
          </p>
          <p className="mt-6 max-w-xl text-ink/65 leading-relaxed text-[15.5px]">
            Vi är märkesoberoende och säljer alla batterier på marknaden. Men
            får vi resonera fritt landar vi ofta i Easyway. Här är tanken bakom
            det.
          </p>
        </div>
      </section>

      <Section
        eyebrow="Grundtanken"
        title={<>Det viktiga idag är tillgång till kWh.</>}
      >
        <div className="max-w-2xl space-y-5 text-[16px] leading-relaxed text-ink/75">
          <p>
            Batterimarknaden mognar snabbt. Det som avgör om ett batteri är en
            bra affär är inte längre vilken logotyp som sitter på lådan, utan
            hur många kilowattimmar du får tillgång till för pengarna, och hur
            smart de används.
          </p>
          <p>
            Vår hållning är enkel: skaffa tillräckligt med kWh, och låt en bra
            styrning lösa ekonomin. Ett stort, prisvärt lager som styrs mot
            spotpris och stödtjänster tjänar oftast in sig snabbare än ett
            mindre, dyrare system med en låst egen app.
          </p>
        </div>
      </Section>

      <Section
        eyebrow="Så tänker vi"
        title={<>Hårdvara och styrning, var för sig.</>}
        intro="Ett batterisystem är egentligen två saker. Easyway gör det ena riktigt bra och låter någon annan göra det andra."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="rounded-3xl border border-ink/10 bg-cream/60 p-8">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/55">
              Hårdvaran
            </div>
            <h3 className="mt-3 font-display text-2xl tracking-display-tight">
              Easyways fokus
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-ink/70">
              Easyway lägger allt krut på hårdvaran: cellerna, kylningen,
              säkerheten och byggkvaliteten. När ett företag inte behöver dela
              sina resurser med att bygga en egen styrning kan de göra just
              hårdvaran bäst. Det är därför deras hårdvara håller.
            </p>
          </div>
          <div className="rounded-3xl border border-ink/10 bg-cream/60 p-8">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/55">
              Styrningen
            </div>
            <h3 className="mt-3 font-display text-2xl tracking-display-tight">
              Växelriktare eller tredjepart
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-ink/70">
              Styrningen kommer i stället från växelriktaren eller en
              fristående tredjepart som bara gör styrning. De kan lägga all sin
              utveckling på att köpa när elen är billig och sälja när den är
              dyr, och på stödtjänsterna mot Svenska Kraftnät.
            </p>
          </div>
        </div>
        <p className="mt-8 max-w-2xl text-[15.5px] leading-relaxed text-ink/70">
          Resultatet: Easyway kan fokusera sina resurser på att göra bra
          hårdvara, och tredjepartsstyrningarna kan fokusera sina resurser på
          styrningen. Var och en blir bäst på sitt, och du får ett system där
          båda delarna är i framkant, i stället för ett där en av dem drar ner
          helheten.
        </p>
      </Section>

      <Section
        eyebrow="Vad det betyder för dig"
        title={<>Tre konkreta fördelar.</>}
      >
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              t: "Mer kWh per krona",
              b: "Du betalar för lagringskapacitet, inte för en dyr programvara. Det ger fler kilowattimmar att jobba med och en snabbare återbetalning.",
            },
            {
              t: "Fri att välja styrning",
              b: "Du är inte inlåst i en tillverkares app. Byter marknaden eller elavtalet skepnad kan styrningen bytas utan att batteriet byts.",
            },
            {
              t: "Byggt för att hålla",
              b: "Hårdvara som fått fullt fokus åldras bättre. LFP-celler, ordentlig kylning och en robust konstruktion som ska leva i många cykler.",
            },
          ].map((c) => (
            <li
              key={c.t}
              className="rounded-3xl border border-ink/10 bg-bone p-7"
            >
              <div className="mt-1 font-display text-xl tracking-display-tight">
                {c.t}
              </div>
              <p className="mt-3 text-[14.5px] leading-relaxed text-ink/70">
                {c.b}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-2xl text-[13.5px] leading-relaxed text-ink/55">
          Easyway är vår rekommendation, inte ett tvång. Passar ett annat
          fabrikat ditt hus bättre säger vi det. Vi säljer bland annat även
          Enershare, SAJ, Sigenergy, Emaldo, Sungrow och Growatt.
        </p>
      </Section>

      <Section eyebrow="Vanliga frågor" title={<>Frågor om Easyway.</>}>
        <div className="divide-y divide-ink/10 border-y border-ink/10">
          {FAQ.map((f, i) => (
            <Disclosure key={i} question={f.q}>
              {f.a}
            </Disclosure>
          ))}
        </div>
      </Section>

      <Section>
        <div className="rounded-[28px] bg-bone border border-ink/10 p-10 md:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/55">
              Redo att gå vidare?
            </div>
            <h3 className="mt-3 font-display text-3xl md:text-5xl tracking-display-tight max-w-2xl leading-tight text-ink">
              Vi dimensionerar rätt batteri för ditt hus.
            </h3>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/offert?tjanst=batterier"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-indigo px-7 py-4 text-base font-medium text-bone hover:bg-indigo/90 transition"
            >
              Begär offert <ArrowRight size={16} />
            </Link>
            <Link href="/kalkylator" className="btn-ghost">
              Räkna på besparingen
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
