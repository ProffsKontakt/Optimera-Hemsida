import Link from "next/link";
import {
  ArrowRight,
  BatteryCharging,
  Clock,
  Gauge,
  Landmark,
  Receipt,
  Sun,
} from "lucide-react";
import { Section } from "@/components/site/Section";
import { Term } from "@/components/site/Term";
import { HeatPumpGuide } from "./HeatPumpGuide";
import { SupportCalculator } from "./SupportCalculator";
import { HEATPUMP_SOURCES, ROT, VILLAEFFEKTEN, kr } from "@/lib/heatpump";

/*
 * Värmepumpssidans egna sektioner. Kopplas in i tjanster/[slug]/page.tsx
 * på samma sätt som sol- och batterisidornas segment, men ligger här så
 * att mallen inte sväller. Alla regler och siffror kommer från
 * lib/heatpump.ts (källkontrollerade mot Skatteverket och Länsstyrelsen).
 */

/** Hero-tillägg: tre siffror + snabbknappar ner till sidans segment. */
export function HeatPumpHeroExtras() {
  return (
    <>
      <div className="mt-10 grid grid-cols-3 gap-2 max-w-md">
        <Stat n="3 typer" label="berg, luft-vatten och frånluft" />
        <Stat n="30 %" label={<><Term id="rot-avdrag">ROT</Term> på arbetet, dras på fakturan</>} />
        <Stat n="0 kr" label="för hembesök och offert" />
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {[
          ["#vilken", "Vilken passar mitt hus?"],
          ["#bidrag", "Bidrag & ROT"],
          ["#tillsammans", "Med sol & batteri"],
          ["#sa-jobbar-vi", "Så jobbar vi"],
          ["#fragor", "Frågor"],
        ].map(([href, label]) => (
          <a
            key={href}
            href={href}
            className="rounded-full border border-ink/15 bg-bone/70 px-3.5 py-1.5 text-[12.5px] text-ink/70 hover:text-ink hover:border-ink/40 transition"
          >
            {label} ↓
          </a>
        ))}
      </div>
    </>
  );
}

function Stat({ n, label }: { n: string; label: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-ink/10 bg-cream/60 px-3 py-3.5">
      <div className="font-display text-lg leading-none tracking-display-tight whitespace-nowrap">
        {n}
      </div>
      <div className="mt-1.5 text-[11px] text-ink/55 leading-tight">{label}</div>
    </div>
  );
}

/** Mörk banner direkt under heron – bidraget är den starkaste kroken. */
export function HeatPumpBanner() {
  return (
    <div className="container-edge mt-2">
      <div className="rounded-[28px] bg-ink text-bone p-7 md:p-10 flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-sun text-ink">
          <Landmark size={20} />
        </span>
        <div className="flex-1">
          <h2 className="font-display text-2xl md:text-3xl tracking-display-tight leading-snug">
            Huset byggt före {VILLAEFFEKTEN.builtBefore}?
            <span className="block italic font-serif text-sun">
              Då kan du få upp till {kr(VILLAEFFEKTEN.max)} i bidrag.
            </span>
          </h2>
          <p className="mt-2 text-bone/70 text-[14.5px] leading-relaxed max-w-xl">
            <Term id="villaeffekten">Villaeffekten</Term> ger 30 % av
            materialkostnaden för bergvärme, luft-vatten och frånluft – utöver
            ROT-avdraget på arbetet.
          </p>
        </div>
        <a
          href="#bidrag"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-sun px-6 py-3.5 text-sm font-medium text-ink hover:bg-sun/85 transition self-start md:self-auto"
        >
          Räkna på ditt hus <ArrowRight size={15} />
        </a>
      </div>
    </div>
  );
}

/** "Vilken värmepump passar ditt hus?" – väljare + jämförelse. */
export function HeatPumpChooser() {
  return (
    <div id="vilken" className="scroll-mt-14">
      <Section
        eyebrow="Vilken passar ditt hus?"
        title={<>Några frågor. Sedan vet du vad som är rimligt.</>}
        intro="Värmepumparna fungerar olika och passar olika hus. Svara på frågorna så pekar vi ut vilka typer som fungerar för ditt – och varför."
      >
        <HeatPumpGuide />
      </Section>
    </div>
  );
}

/** ROT + Villaeffekten: förklaring + kalkylator. */
export function HeatPumpSupport() {
  return (
    <div id="bidrag" className="scroll-mt-14 bg-cream/45 border-y border-ink/5">
      <Section
        eyebrow="Avdrag och bidrag 2026"
        title={<>Så mycket får du tillbaka.</>}
        intro="Två olika stöd som går att kombinera: ROT-avdraget gäller arbetet och dras på fakturan, Villaeffekten gäller materialet och betalas ut efteråt."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
          <Explainer
            icon={<Receipt size={18} />}
            title="ROT-avdrag"
            lead={`30 % av arbetskostnaden, max ${kr(ROT.capPerPerson)} per person och år.`}
          >
            Vid fast pris räknar Skatteverket arbetet som 35 % av totalen för
            bergvärme och 30 % för luft-vatten, frånluft och luft-luft. Avdraget
            blir alltså runt 9–10,5 % av totalpriset – inte 30 %. Vi drar av det
            direkt på fakturan.{" "}
            <SourceLink href={HEATPUMP_SOURCES.rotSchablon}>Skatteverket</SourceLink>
          </Explainer>
          <Explainer
            icon={<Landmark size={18} />}
            title="Villaeffekten"
            lead={`30 % av materialkostnaden, max ${kr(VILLAEFFEKTEN.max)} per hus.`}
          >
            För hus med värdeår före {VILLAEFFEKTEN.builtBefore} som inte är
            anslutna till fjärrvärme, där ägaren bor stadigvarande. Bergvärme,
            luft-vatten och frånluft omfattas – luft-luft gör det inte. Bidraget
            beviljas från {kr(VILLAEFFEKTEN.min)} och söks via Boverkets
            e-tjänst.{" "}
            <SourceLink href={HEATPUMP_SOURCES.villaeffekten}>Länsstyrelsen</SourceLink>
          </Explainer>
        </div>
        <div className="mt-5 md:mt-6">
          <SupportCalculator />
        </div>
      </Section>
    </div>
  );
}

function Explainer({
  icon,
  title,
  lead,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  lead: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-ink/10 bg-bone p-6 md:p-8">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-indigo text-bone">
          {icon}
        </span>
        <h3 className="font-display text-2xl tracking-display-tight">{title}</h3>
      </div>
      <p className="mt-4 font-display text-lg tracking-display-tight leading-snug">{lead}</p>
      <p className="mt-2 text-[14.5px] text-ink/65 leading-relaxed">{children}</p>
    </div>
  );
}

function SourceLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="whitespace-nowrap text-indigo underline underline-offset-2 decoration-indigo/40 hover:decoration-indigo"
    >
      Källa: {children} ↗
    </a>
  );
}

/** Värmepump + sol + batteri. */
export function HeatPumpTogether() {
  const points = [
    {
      icon: <Gauge size={18} />,
      title: "Störst förbrukare, störst vinst",
      body: "I ett hus med värmepump är det oftast den som drar mest el. Därför gör smart styrning störst skillnad just här.",
    },
    {
      icon: <Clock size={18} />,
      title: "Värme på billiga timmar",
      body: (
        <>
          Med styrning mot <Term id="spotpris">spotpris</Term> läggs mer av
          värmen på dygnets billigaste timmar – huset och varmvattentanken
          fungerar som ett värmelager.
        </>
      ),
    },
    {
      icon: <Sun size={18} />,
      title: "Solel till varmvattnet",
      body: "När solen ger mer än huset gör av med kan överskottet värma varmvattnet i stället för att säljas billigt.",
    },
    {
      icon: <BatteryCharging size={18} />,
      title: "Batteriet tar topparna",
      body: "Har ditt nätbolag effektavgift kan ett batteri täcka timmarna då värmepump, spis och laddbox drar samtidigt.",
    },
  ];
  return (
    <div id="tillsammans" className="scroll-mt-14">
      <Section
        eyebrow="Med sol och batteri"
        title={
          <>
            Värmepumpen blir smartare
            <span className="block italic font-serif text-indigo">
              när den inte jobbar ensam.
            </span>
          </>
        }
      >
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
          {points.map((p) => (
            <li key={p.title} className="rounded-3xl border border-ink/10 bg-bone p-6 md:p-7">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-sun text-ink">
                {p.icon}
              </span>
              <h3 className="mt-5 font-display text-xl tracking-display-tight leading-snug">
                {p.title}
              </h3>
              <p className="mt-2 text-[14.5px] text-ink/65 leading-relaxed">{p.body}</p>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/offert?tjanst=vaermepumpar" className="btn-primary">
            Räkna på helheten <ArrowRight size={16} />
          </Link>
          <Link href="/tjanster/batterier" className="btn-ghost">
            Läs om batterier
          </Link>
        </div>
      </Section>
    </div>
  );
}
