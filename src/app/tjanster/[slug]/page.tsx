import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICES, getService, type ServiceSlug } from "@/lib/services";
import { ServiceVignetteLazy as ServiceVignette } from "@/components/3d/ServiceVignetteLazy";
import { Section } from "@/components/site/Section";
import { Disclosure } from "@/components/site/Disclosure";
import { CITIES } from "@/lib/cities";
import {
  JsonLd,
  faqPageSchema,
  serviceSchema,
  breadcrumbSchema,
} from "@/components/seo/JsonLd";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const s = getService(params.slug as ServiceSlug);
  if (!s) return {};
  const path = `/tjanster/${s.slug}`;
  return {
    title: `${s.name} i Stockholm`,
    description: s.lede,
    // Dolda tjänster (t.ex. värmepump just nu): sidan finns kvar och funkar,
    // men indexeras inte förrän tjänsten aktiveras igen.
    ...(s.hidden ? { robots: { index: false, follow: false } } : {}),
    alternates: { canonical: path },
    openGraph: {
      title: `${s.name} – Optimera Energi`,
      description: s.oneLiner,
      url: path,
      // type "website" eftersom det är en tjänste-landing, inte ett
      // tidskänsligt blogginlägg. "article" skickade förvirrande signaler
      // till sociala crawlers.
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${s.name} – Optimera Energi`,
      description: s.oneLiner,
    },
  };
}

export default function ServicePage({
  params,
}: {
  params: { slug: string };
}) {
  const s = getService(params.slug as ServiceSlug);
  if (!s) notFound();

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: s.name,
          description: s.lede,
          url: `/tjanster/${s.slug}`,
          serviceType: s.name,
        })}
      />
      <JsonLd data={faqPageSchema(s.faq)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Hem", href: "/" },
          { name: s.name, href: `/tjanster/${s.slug}` },
        ])}
      />
      <section className="container-edge pt-12 md:pt-20 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <div className="eyebrow">Tjänst · {s.badge}</div>
            <h1 className="mt-5 font-display text-[56px] md:text-[88px] tracking-display-tight leading-[0.95]">
              {s.name}{" "}
              <span className="italic font-serif text-indigo">
                i Stockholm.
              </span>
            </h1>
            <p className="mt-6 text-2xl md:text-3xl font-display tracking-display-tight text-ink/80 leading-snug max-w-2xl">
              {s.oneLiner}
            </p>
            <p className="mt-6 max-w-xl text-ink/65 leading-relaxed text-[15.5px]">
              {s.lede}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href={`/offert?tjanst=${s.slug}`} className="btn-primary">
                Begär offert <ArrowRight size={16} />
              </Link>
              <Link href="/kalkylator" className="btn-ghost">
                Räkna på besparingen
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="aspect-[4/5] rounded-[28px] border border-ink/10 overflow-hidden relative">
              <ServiceVignette kind={s.slug} />
            </div>
          </div>
        </div>
      </section>

      {/* Batteri-sortiment + Easyway-utmärkelse. Bara på batteri-tjänsten.
          Mellan-raden listar hela sortimentet vi säljer; segmentet under
          lyfter fram Easyway med länk till förklaringssidan. */}
      {s.slug === "batterier" && (
        <>
          <div className="container-edge">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-y border-ink/10 py-5">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/50">
                Batterier vi säljer
              </span>
              <span className="text-[14px] text-ink/70">
                Easyway, Enershare, SAJ, Sigenergy, Emaldo, Sungrow, Growatt
                och många fler.
              </span>
            </div>
          </div>

          <Section
            eyebrow="Vår rekommendation"
            title={
              <>
                Vi säljer alla batterier på marknaden,{" "}
                <span className="italic font-serif text-indigo">
                  men ett står ut i vår mening.
                </span>
              </>
            }
            intro="Vi är märkesoberoende och sätter det som passar ditt hus. Men får vi välja fritt landar vi ofta i samma slutsats."
          >
            <div className="flex flex-col justify-between gap-8 rounded-[28px] border border-ink/10 bg-cream/50 p-8 md:flex-row md:items-center md:p-12">
              <div className="max-w-xl">
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/55">
                  Utmärker sig
                </div>
                <div className="mt-3 font-display text-4xl md:text-5xl tracking-display-tight">
                  Easyway
                </div>
                <p className="mt-4 text-[15.5px] leading-relaxed text-ink/70">
                  Mest kWh för pengarna, med hårdvara byggd för att hålla.
                  Styrningen sköts av växelriktaren eller en tredjepart, så
                  varje del kan göra det den är bäst på.
                </p>
              </div>
              <Link
                href="/tjanster/batterier/easyway"
                className="group shrink-0 self-start rounded-full bg-gradient-to-b from-indigo to-sun p-[3px] transition-transform duration-300 hover:scale-[1.02] md:self-auto"
              >
                <span className="inline-flex items-center gap-2 rounded-full bg-bone px-6 py-3 text-[14px] font-medium text-indigo transition-colors duration-300 group-hover:bg-indigo group-hover:text-bone">
                  Förstå varför <ArrowRight size={16} />
                </span>
              </Link>
            </div>
          </Section>
        </>
      )}

      {/* Pris-anchor för Solpaneler-service-sidan. Speglar FAQ-data men
          renderas som synlig prosa, vilket fångar prisintent direkt i SERP
          och konkurrerar med Svea Solar / Hemsols pris-snippets. */}
      {s.slug === "solpaneler" && (
        <Section
          eyebrow="Vad kostar det?"
          title={<>Pris för solpaneler i Stockholm.</>}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="rounded-3xl border border-ink/10 bg-cream/40 p-7">
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/55">
                Baspris
              </div>
              <div className="mt-3 font-display text-2xl tracking-display-tight">
                10 000, 22 500 kr
              </div>
              <p className="mt-3 text-[14.5px] text-ink/70 leading-relaxed">
                Täcker resor, ställning, montage, kabel och driftsättning.
                Trappstegspris efter antal paneler.
              </p>
            </div>
            <div className="rounded-3xl border border-ink/10 bg-cream/40 p-7">
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/55">
                Per panel
              </div>
              <div className="mt-3 font-display text-2xl tracking-display-tight">
                2 500 kr
              </div>
              <p className="mt-3 text-[14.5px] text-ink/70 leading-relaxed">
                JA Solar 500 W eller 455 W, samma pris per panel oavsett
                modell. Helsvart all-black ingår.
              </p>
            </div>
            <div className="rounded-3xl border border-ink/10 bg-cream/40 p-7">
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/55">
                Typisk villa, 14 paneler
              </div>
              <div className="mt-3 font-display text-2xl tracking-display-tight">
                ca 50 000 kr
              </div>
              <p className="mt-3 text-[14.5px] text-ink/70 leading-relaxed">
                Efter grönt avdrag på 14,55 procent. Räkna på din specifika
                installation i kalkylatorn innan hembesöket.
              </p>
            </div>
          </div>
          <p className="mt-6 text-[13.5px] text-ink/55 max-w-2xl leading-relaxed">
            Allt material och installation ingår. Priset på offerten är
            priset på fakturan. Ingen dolda påslag, ingen restidsdebitering.
          </p>
        </Section>
      )}

      <Section eyebrow="Vad du får" title={<>Inte bara specifikationer – så det faktiskt beter sig.</>}>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {s.highlights.map((h, i) => (
            <li
              key={i}
              className="rounded-3xl border border-ink/10 bg-cream/70 p-7"
            >
              <div className="font-mono text-[11px] tracking-[0.18em] text-ink/55">
                FUNKTION 0{i + 1}
              </div>
              <div className="mt-3 font-display text-xl tracking-display-tight">
                {h}
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap gap-2">
          {s.bullets.map((b) => (
            <span
              key={b}
              className="rounded-full border border-ink/12 bg-bone px-3.5 py-1.5 text-[13px] text-ink/70"
            >
              {b}
            </span>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Så jobbar vi"
        title={<>Fyra steg, ärligt prisad.</>}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {s.workflow.map((w) => (
            <div
              key={w.step}
              className="rounded-3xl border border-ink/10 bg-bone p-7"
            >
              <div className="font-mono text-[11px] tracking-[0.18em] text-ink/55">
                STEG {w.step}
              </div>
              <h3 className="mt-3 font-display text-xl tracking-display-tight">
                {w.title}
              </h3>
              <p className="mt-2 text-ink/65 text-[14.5px] leading-relaxed">
                {w.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Vanliga frågor" title={<>Klara svar, helt transparent.</>}>
        <div className="divide-y divide-ink/10 border-y border-ink/10">
          {s.faq.map((f, i) => (
            <Disclosure key={i} question={f.q}>
              {f.a}
            </Disclosure>
          ))}
        </div>
      </Section>

      {/* Per-ort-länkning: city-landingssidor finns för solpaneler. Visa
          dom bara på solpaneler-tjänsten tills batteri/värme/laddbox
          får egna city-pages. Bidragnig till intern PageRank-flöde. */}
      {s.slug === "solpaneler" && (
        <Section
          eyebrow="Per ort"
          title={<>Solpaneler där du bor.</>}
          intro="Vi installerar solpaneler i hela Stockholms-området. Läs mer om förutsättningar i din kommun."
        >
          <div className="flex flex-wrap gap-3">
            {CITIES.map((c) => (
              <Link
                key={c.slug}
                href={`/solceller/${c.slug}`}
                className="rounded-full border border-ink/15 bg-bone px-5 py-2.5 text-[14px] hover:border-ink/40 transition"
              >
                Solpaneler {c.preposition} {c.name}
              </Link>
            ))}
          </div>
        </Section>
      )}

      <Section>
        <div className="rounded-[28px] bg-bone border border-ink/10 p-10 md:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/55">
              Redo att gå vidare?
            </div>
            <h3 className="mt-3 font-display text-3xl md:text-5xl tracking-display-tight max-w-2xl leading-tight text-ink">
              Boka ett hembesök för {s.name.toLowerCase()}.
            </h3>
          </div>
          <div className="flex gap-3">
            <Link
              href={`/offert?tjanst=${s.slug}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-indigo px-7 py-4 text-base font-medium text-bone hover:bg-indigo/90 transition"
            >
              Begär offert <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
