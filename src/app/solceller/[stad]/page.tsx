import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin, Sun } from "lucide-react";
import { CITIES, findCity } from "@/lib/cities";
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
  return CITIES.map((c) => ({ stad: c.slug }));
}

export function generateMetadata({ params }: { params: { stad: string } }) {
  const city = findCity(params.stad);
  if (!city) return {};
  return {
    title: `Solpaneler ${city.preposition} ${city.name}, installerat av Optimera Energi`,
    description: `Vi installerar solpaneler ${city.preposition} ${city.name} med eget montageteam från Solna. Drönarbesiktning, 1:1-modell i 3D, transparent prissättning. Boka kostnadsfritt hembesök.`,
    alternates: { canonical: `/solceller/${city.slug}` },
    openGraph: {
      title: `Solpaneler ${city.preposition} ${city.name} · Optimera Energi`,
      description: city.oneLiner,
      url: `/solceller/${city.slug}`,
      type: "website",
    },
  };
}

function cityFaq(city: ReturnType<typeof findCity>) {
  if (!city) return [];
  return [
    {
      q: `Vad kostar solpaneler ${city.preposition} ${city.name}?`,
      a: `Prisbilden ${city.preposition} ${city.name} följer samma modell som resten av Stockholm: 10 000–22 500 kr i baspris beroende på antal paneler, plus 2 500 kr per JA Solar-panel. En typisk villa med 14 paneler landar runt 50 000 kr efter grönt avdrag (14,55 %). Räkna på din specifika installation i vår kalkylator innan hembesöket.`,
    },
    {
      q: `Behöver jag bygglov för solpaneler ${city.preposition} ${city.name}?`,
      a: `Inom detaljplan i ${city.name} krävs oftast inget bygglov så länge panelerna följer takfallet och inte ändrar byggnadens utseende väsentligt. För kulturhistoriskt skyddade fastigheter eller fasadinstallation gäller andra regler. Vi tar dialogen med kommunen åt dig innan vi går vidare med projektering.`,
    },
    {
      q: `Hur lång är återbetalningstiden ${city.preposition} ${city.name}?`,
      a: `Med elområde SE3 (Stockholm) och nuvarande spotpris-snitt landar återbetalningstiden för en ren solanläggning på 8–11 år. Med batterilager och stödtjänster (FCR-D / aFRR via Energy IQ eller Enequi Core) kan tiden komma ner mot 3–5 år för hus med högre förbrukning.`,
    },
    {
      q: `Vilka områden ${city.preposition} ${city.name} installerar Optimera Energi i?`,
      a: `Vi installerar i hela ${city.name} kommun. Vårt montageteam utgår från lagret på Vallgatan 9 i Solna, så vi har korta resvägar och kan dyka upp på samma dag om något krånglar efter driftsättning.`,
    },
  ];
}

export default function CityPage({ params }: { params: { stad: string } }) {
  const city = findCity(params.stad);
  if (!city) notFound();

  const faq = cityFaq(city);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Hem", href: "/" },
          { name: "Solpaneler", href: "/tjanster/solpaneler" },
          { name: city.name, href: `/solceller/${city.slug}` },
        ])}
      />
      <JsonLd
        data={serviceSchema({
          name: `Solpaneler ${city.preposition} ${city.name}`,
          description: `Installation av solpaneler för villa och radhus ${city.preposition} ${city.name}, ${city.region}.`,
          url: `/solceller/${city.slug}`,
          serviceType: "Solpaneler",
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
            Solpaneler {city.preposition} {city.name},
            <br />
            <span className="italic font-serif text-indigo">
              utan genvägar.
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
        title={<>Vad du behöver veta innan installation.</>}
        className="!py-16 md:!py-20"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {city.localContext.map((c) => (
            <article
              key={c.title}
              className="rounded-3xl border border-ink/10 bg-cream/40 p-7 md:p-8"
            >
              <div className="grid h-9 w-9 place-items-center rounded-full bg-indigo/10 text-indigo">
                <Sun size={16} />
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
            .map((slug) => CITIES.find((c) => c.slug === slug))
            .filter(Boolean)
            .map((n) => (
              <Link
                key={n!.slug}
                href={`/solceller/${n!.slug}`}
                className="rounded-full border border-ink/15 bg-bone px-5 py-2.5 text-[14px] hover:border-ink/40 transition"
              >
                Solpaneler {n!.preposition} {n!.name}
              </Link>
            ))}
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
                Vi tar med drönaren och bullarna {city.preposition} {city.name}.
              </h3>
              <p className="mt-4 max-w-md text-ink/70 leading-relaxed">
                Kostnadsfritt och utan förpliktelser. Vi ringer dagen innan
                och stämmer av tiden.
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
