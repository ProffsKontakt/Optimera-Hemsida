import Link from "next/link";
import { Mail, Download, ArrowRight } from "lucide-react";
import { Section } from "@/components/site/Section";
import { BrandPanel } from "@/components/site/BrandPanel";
import {
  JsonLd,
  breadcrumbSchema,
  organizationSchema,
} from "@/components/seo/JsonLd";

export const metadata = {
  title: "Press · Optimera Energi",
  description:
    "Pressmaterial, logotyp och kontaktuppgifter för journalister och redaktioner. Optimera Energi Sverige AB, elinstallatör i Solna.",
  alternates: { canonical: "/press" },
  openGraph: {
    title: "Press · Optimera Energi",
    description:
      "Pressmaterial, logotyp och kontaktuppgifter för journalister.",
    url: "/press",
    type: "website",
  },
};

// När pressmeddelanden finns publiceras dom här. Lista är tom tills första
// release är på plats, då kompletteras med datum, titel, ingress och länk.
const RELEASES: { date: string; title: string; lede: string; href?: string }[] = [];

const QUICK_FACTS = [
  { k: "Juridiskt namn", v: "Optimera Energi Sverige AB" },
  { k: "Organisationsnummer", v: "559375-2206" },
  { k: "Säte", v: "Vallgatan 9, 170 67 Solna" },
  { k: "Grundat", v: "2026" },
  { k: "Bransch", v: "Elinstallation, solpaneler, batterier, värmepumpar, laddboxar" },
  { k: "Tjänsteområde", v: "Stockholms län (SE3)" },
  { k: "Auktorisationer", v: "F-skatt, BAS-U, SEK" },
];

export default function PressPage() {
  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Hem", href: "/" },
          { name: "Press", href: "/press" },
        ])}
      />

      <section className="container-edge pt-12 md:pt-20 pb-16">
        <div className="max-w-3xl">
          <div className="eyebrow">Press · För journalister</div>
          <h1 className="mt-5 font-display text-[44px] md:text-[80px] tracking-display-tight leading-[0.95]">
            Press,
            <br />
            <span className="italic font-serif text-indigo">utan omvägar.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-ink/70 text-lg leading-relaxed">
            Skriver du om Optimera Energi? Här hittar du pressmaterial,
            logotyp, snabbfakta och en direktlinje till våra grundare.
            Vi svarar inom en arbetsdag, ofta samma dag.
          </p>
        </div>
      </section>

      {/* Pressmeddelanden */}
      <Section
        eyebrow="Pressmeddelanden"
        title={<>Aktuellt från Optimera.</>}
        className="!py-16 md:!py-20"
      >
        {RELEASES.length === 0 ? (
          <div className="rounded-3xl border border-ink/10 bg-cream/40 p-8 md:p-12">
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55">
              Inget publicerat än
            </div>
            <p className="mt-4 max-w-xl text-ink/70 leading-relaxed">
              Optimera Energi är ett nytt bolag, första pressmeddelandet
              publiceras under 2026. Skriv på e-post nedan om du vill att
              vi mejlar dig direkt när första releasen är klar.
            </p>
          </div>
        ) : (
          <ol className="space-y-5">
            {RELEASES.map((r, i) => (
              <li
                key={i}
                className="rounded-3xl border border-ink/10 bg-bone p-7 md:p-8"
              >
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55">
                  {r.date}
                </div>
                <h3 className="mt-3 font-display text-2xl md:text-3xl tracking-display-tight leading-snug">
                  {r.title}
                </h3>
                <p className="mt-3 text-ink/70 leading-relaxed">{r.lede}</p>
                {r.href && (
                  <Link
                    href={r.href}
                    className="mt-4 inline-flex items-center gap-2 text-indigo hover:underline font-mono text-[12px] uppercase tracking-[0.18em]"
                  >
                    Läs hela <ArrowRight size={14} />
                  </Link>
                )}
              </li>
            ))}
          </ol>
        )}
      </Section>

      {/* Snabbfakta */}
      <Section
        eyebrow="Snabbfakta"
        title={<>Bolaget i fyra rader.</>}
        intro="Kopiera fritt. Säg till om du behöver bekräftelse på siffror eller datum."
        className="!py-16 md:!py-20"
      >
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {QUICK_FACTS.map((f) => (
            <div
              key={f.k}
              className="rounded-2xl border border-ink/10 bg-bone p-5 md:p-6"
            >
              <dt className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink/55">
                {f.k}
              </dt>
              <dd className="mt-2 text-ink/85 text-[15px]">{f.v}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* Pressmaterial */}
      <Section
        eyebrow="Pressmaterial"
        title={<>Logotyp och brand-tillgångar.</>}
        intro="Använd gärna i tryck eller online. Behåll proportioner och färger."
        className="!py-16 md:!py-20"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <a
            href="/logo.svg"
            download
            className="rounded-3xl border border-ink/10 bg-bone p-7 hover:border-ink/30 transition flex flex-col gap-4"
          >
            <div className="aspect-[332/114] rounded-xl bg-cream/60 border border-ink/5 grid place-items-center p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.svg" alt="Optimera Energi logotyp ljus" className="max-h-full max-w-full" />
            </div>
            <div>
              <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink/55">
                Ljus logotyp
              </div>
              <div className="mt-1 font-display text-lg tracking-display-tight">
                logo.svg
              </div>
            </div>
            <div className="mt-auto pt-3 border-t border-ink/10 flex items-center gap-2 text-[13px] text-ink/70">
              <Download size={14} /> Ladda ner SVG
            </div>
          </a>

          <a
            href="/logo-dark.svg"
            download
            className="rounded-3xl border border-ink/10 bg-ink p-7 hover:border-ink/30 transition flex flex-col gap-4"
          >
            <div className="aspect-[332/114] rounded-xl bg-graphite border border-bone/10 grid place-items-center p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-dark.svg" alt="Optimera Energi logotyp mörk" className="max-h-full max-w-full" />
            </div>
            <div>
              <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-bone/55">
                Mörk logotyp
              </div>
              <div className="mt-1 font-display text-lg tracking-display-tight text-bone">
                logo-dark.svg
              </div>
            </div>
            <div className="mt-auto pt-3 border-t border-bone/15 flex items-center gap-2 text-[13px] text-bone/70">
              <Download size={14} /> Ladda ner SVG
            </div>
          </a>

          <a
            href="/icon.svg"
            download
            className="rounded-3xl border border-ink/10 bg-bone p-7 hover:border-ink/30 transition flex flex-col gap-4"
          >
            <div className="aspect-square rounded-xl bg-cream/60 border border-ink/5 grid place-items-center p-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icon.svg" alt="Optimera Energi ikon" className="max-h-full max-w-full" />
            </div>
            <div>
              <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink/55">
                Symbol
              </div>
              <div className="mt-1 font-display text-lg tracking-display-tight">
                icon.svg
              </div>
            </div>
            <div className="mt-auto pt-3 border-t border-ink/10 flex items-center gap-2 text-[13px] text-ink/70">
              <Download size={14} /> Ladda ner SVG
            </div>
          </a>
        </div>

        <div className="mt-8 rounded-2xl border border-ink/10 bg-cream/40 p-6 text-[14px] text-ink/75 leading-relaxed">
          <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink/55 mb-2">
            Brand-färger
          </div>
          <div className="flex flex-wrap gap-4">
            <SwatchLine name="Indigo" hex="#3648C3" />
            <SwatchLine name="Sun" hex="#FFDD6C" />
            <SwatchLine name="Bone" hex="#F4F1EA" />
            <SwatchLine name="Cream" hex="#EFE9DC" />
            <SwatchLine name="Ink" hex="#0E0E0C" />
          </div>
        </div>
      </Section>

      {/* Presskontakt */}
      <Section className="!py-16 md:!py-20">
        <BrandPanel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55">
                Presskontakt
              </div>
              <h3 className="mt-3 font-display text-3xl md:text-5xl tracking-display-tight leading-tight">
                Hör av dig direkt.
              </h3>
              <p className="mt-4 max-w-md text-ink/70 leading-relaxed">
                För intervjuer, citat eller faktakontroll når du Viktor
                Tiberg (grundare och VD) eller Julian Nordgren (grundare
                och operativ chef).
              </p>
            </div>
            <div className="space-y-3">
              <a
                href="mailto:hej@optimeraenergi.se?subject=Pressfråga"
                className="btn-primary w-full justify-center"
              >
                <Mail size={16} /> hej@optimeraenergi.se
              </a>
              <a
                href="tel:+46763053732"
                className="btn-ghost w-full justify-center"
              >
                076 305 37 32
              </a>
            </div>
          </div>
        </BrandPanel>
      </Section>
    </>
  );
}

function SwatchLine({ name, hex }: { name: string; hex: string }) {
  return (
    <div className="inline-flex items-center gap-2">
      <span
        className="h-5 w-5 rounded-full border border-ink/10"
        style={{ backgroundColor: hex }}
        aria-hidden
      />
      <span className="font-mono text-[12px] text-ink/80">
        {name} <span className="text-ink/45">{hex}</span>
      </span>
    </div>
  );
}
