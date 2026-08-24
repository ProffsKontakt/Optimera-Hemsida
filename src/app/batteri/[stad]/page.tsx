import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin, BatteryCharging } from "lucide-react";
import { BATTERY_CITIES, findBatteryCity } from "@/lib/battery-cities";
import { Section } from "@/components/site/Section";
import { BrandPanel } from "@/components/site/BrandPanel";
import {
  JsonLd,
  faqPageSchema,
  breadcrumbSchema,
  localBusinessSchema,
  serviceSchema,
} from "@/components/seo/JsonLd";

export function generateStaticParams() {
  return BATTERY_CITIES.map((c) => ({ stad: c.slug }));
}

export function generateMetadata({ params }: { params: { stad: string } }) {
  const city = findBatteryCity(params.stad);
  if (!city) return {};
  return {
    // Title leder med "Batteri" + stad (det sökord vi vill ranka på), följt
    // av "batterilager" och pris-token för CTR och synonymtäckning.
    title: `Batteri ${city.preposition} ${city.name}, batterilager och pris`,
    description: `Vi installerar batterilager och hemmabatteri ${city.preposition} ${city.name} från vårt kontor i Solna. Stödtjänster (FCR-D), effektkapning och 48,5 % grönt avdrag. Boka kostnadsfritt hembesök.`,
    alternates: { canonical: `/batteri/${city.slug}` },
    openGraph: {
      title: `Batteri ${city.preposition} ${city.name} · Optimera Energi`,
      description: city.oneLiner,
      url: `/batteri/${city.slug}`,
      type: "website",
    },
  };
}

function batteryFaq(city: ReturnType<typeof findBatteryCity>) {
  if (!city) return [];
  return [
    {
      q: `Vad kostar ett batterilager ${city.preposition} ${city.name}?`,
      a: `Priset styrs av kapacitet. Ett hemmabatteri på 10 kWh landar ofta runt 70 000–110 000 kr installerat, en större bank på 20–30 kWh på 130 000–200 000 kr, allt före grönt avdrag. Avdraget för batteri är 48,5 % av arbets- och materialkostnaden och dras direkt på fakturan. Vi räknar på din specifika förbrukning innan vi rekommenderar storlek.`,
    },
    {
      q: `Lönar sig ett batteri ${city.preposition} ${city.name}?`,
      a: `Ja, för de flesta villor med elvärme eller solceller. Batteriet kapar dina dyraste effekttimmar, höjer självförbrukningen av solel och kan aktiveras för stödtjänster (FCR-D / aFRR) där Svenska kraftnät betalar för att batteriet stabiliserar nätet. I ${city.name} ser vi återbetalningstider på 3–6 år beroende på storlek och förbrukning.`,
    },
    {
      q: `Behöver jag solceller för att ha batteri ${city.preposition} ${city.name}?`,
      a: `Nej. Ett batteri lönar sig även utan solpaneler genom prisarbitrage, du laddar när elen är billig och använder den när den är dyr, plus intäkt från stödtjänster. Har du redan solceller adderar batteriet självförbrukning ovanpå det. Vi installerar både till befintliga solanläggningar och som fristående lager.`,
    },
    {
      q: `Vilka batterimärken installerar Optimera Energi?`,
      a: `Vi arbetar med ett hand-plockat sortiment: Easyway (46–61 kWh), SAJ HS3, Emaldo och Pixii. Vi väljer LFP-celler (järnfosfat) som standard för brandsäkerhet och livslängd, och dimensionerar märke och storlek efter ditt hus, inte efter vad vi råkar ha på lager.`,
    },
  ];
}

export default function BatteryCityPage({
  params,
}: {
  params: { stad: string };
}) {
  const city = findBatteryCity(params.stad);
  if (!city) notFound();

  const faq = batteryFaq(city);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Hem", href: "/" },
          { name: "Batterier", href: "/tjanster/batterier" },
          { name: city.name, href: `/batteri/${city.slug}` },
        ])}
      />
      <JsonLd
        data={serviceSchema({
          name: `Batterilager ${city.preposition} ${city.name}`,
          description: `Installation av batterilager och hemmabatteri för villa och radhus ${city.preposition} ${city.name}, ${city.region}.`,
          url: `/batteri/${city.slug}`,
          serviceType: "Batterilager",
        })}
      />
      <JsonLd data={faqPageSchema(faq)} />
      <JsonLd data={localBusinessSchema} />

      {/* Hero */}
      <section className="container-edge pt-12 md:pt-20 pb-12">
        <div className="max-w-4xl">
          <div className="eyebrow flex items-center gap-2">
            <MapPin size={12} /> {city.region}
          </div>
          <h1 className="mt-5 font-display text-[44px] sm:text-[56px] md:text-[80px] tracking-display-tight leading-[0.95]">
            Batteri {city.preposition} {city.name},
            <br />
            <span className="italic font-serif text-indigo">
              som tjänar pengar.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-ink/70 text-lg leading-relaxed">
            {city.intro}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/offert" className="btn-primary">
              Boka hembesök <ArrowRight size={16} />
            </Link>
            <Link href="/kalkylator" className="btn-ghost">
              Räkna i kalkylatorn
            </Link>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px bg-ink/10 rounded-2xl overflow-hidden border border-ink/10">
          {city.facts.map((f) => (
            <div key={f.k} className="bg-bone p-5 md:p-6">
              <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink/55">
                {f.k}
              </div>
              <div className="mt-2 font-display text-xl md:text-2xl tracking-display-tight leading-tight">
                {f.v}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lokal kontext */}
      <Section
        eyebrow={`Lokalt ${city.preposition} ${city.name}`}
        title={<>Vad som gör batteriet lönsamt här.</>}
        className="!py-16 md:!py-20"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {city.localContext.map((c) => (
            <article
              key={c.title}
              className="rounded-3xl border border-ink/10 bg-cream/40 p-7 md:p-8"
            >
              <div className="grid h-9 w-9 place-items-center rounded-full bg-indigo/10 text-indigo">
                <BatteryCharging size={16} />
              </div>
              <h3 className="mt-4 font-display text-2xl tracking-display-tight leading-snug">
                {c.title}
              </h3>
              <p className="mt-3 text-ink/70 text-[14.5px] leading-relaxed">
                {c.body}
              </p>
            </article>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section
        eyebrow="Vanliga frågor"
        title={<>Specifikt för {city.name}.</>}
        className="!py-16 md:!py-20"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {faq.map((q) => (
            <article
              key={q.q}
              className="rounded-3xl border border-ink/10 bg-bone p-7 md:p-8"
            >
              <h3 className="font-display text-xl tracking-display-tight leading-snug">
                {q.q}
              </h3>
              <p className="mt-3 text-ink/70 text-[14px] leading-relaxed">
                {q.a}
              </p>
            </article>
          ))}
        </div>
      </Section>

      {/* Närliggande kommuner */}
      <Section
        eyebrow="Vi installerar även"
        title={<>Närliggande kommuner.</>}
        className="!py-16 md:!py-20"
      >
        <div className="flex flex-wrap gap-3">
          {city.neighbors
            .map((slug) => BATTERY_CITIES.find((c) => c.slug === slug))
            .filter(Boolean)
            .map((n) => (
              <Link
                key={n!.slug}
                href={`/batteri/${n!.slug}`}
                className="rounded-full border border-ink/15 bg-bone px-5 py-2.5 text-[14px] hover:border-ink/40 transition"
              >
                Batteri {n!.preposition} {n!.name}
              </Link>
            ))}
          <Link
            href={`/solceller/${city.slug}`}
            className="rounded-full border border-ink/15 bg-bone px-5 py-2.5 text-[14px] hover:border-ink/40 transition"
          >
            Solceller {city.preposition} {city.name}
          </Link>
          {/* Korslänk till den generella solcellsbatteri-pelarsidan. */}
          <Link
            href="/solcellsbatteri"
            className="rounded-full border border-indigo/30 bg-indigo/[0.04] px-5 py-2.5 text-[14px] text-indigo hover:border-indigo/60 transition"
          >
            Guide: solcellsbatteri till villa
          </Link>
        </div>
      </Section>

      {/* CTA */}
      <Section className="!py-16 md:!py-20">
        <BrandPanel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55">
                Boka hembesök
              </div>
              <h3 className="mt-3 font-display text-3xl md:text-5xl tracking-display-tight leading-tight">
                Vi mäter din förbrukning {city.preposition} {city.name}.
              </h3>
              <p className="mt-4 max-w-md text-ink/70 leading-relaxed">
                Kostnadsfritt och utan förpliktelser. Vi gör en lastanalys av
                ditt hus och dimensionerar batteriet efter hur du faktiskt
                använder elen. Vårt lager ligger på Vallgatan 9 i Solna.
              </p>
              <p className="mt-3 text-[15px] text-ink/80">
                Ring direkt:{" "}
                <a
                  href="tel:+46763053732"
                  className="font-medium text-ink hover:text-indigo transition"
                >
                  076 305 37 32
                </a>
              </p>
            </div>
            <div>
              <Link
                href="/offert"
                className="btn-primary w-full justify-center text-base"
              >
                Boka hembesök <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </BrandPanel>
      </Section>
    </>
  );
}
