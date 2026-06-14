import Link from "next/link";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import { Section } from "@/components/site/Section";
import { BrandPanel } from "@/components/site/BrandPanel";
import {
  JsonLd,
  localBusinessSchema,
  contactPageSchema,
  breadcrumbSchema,
} from "@/components/seo/JsonLd";

export const metadata = {
  title: "Kontakt – Vallgatan 9, Solna",
  description:
    "Ring 076 305 37 32, mejla hej@optimeraenergi.se eller kom förbi vårt kontor på Vallgatan 9 i Solna. Vi svarar inom 24 timmar.",
  alternates: { canonical: "/kontakt" },
  openGraph: {
    title: "Kontakt – Optimera Energi",
    description:
      "Telefon, e-post och kontoradress till Optimera Energi Sverige AB i Solna.",
    url: "/kontakt",
    type: "website",
  },
};

const TEAM = [
  {
    name: "Viktor Tiberg",
    role: "Grundare och VD",
    email: "viktor@optimeraenergi.se",
    phone: "0763053732",
  },
  {
    name: "Julian Nordgren",
    role: "Grundare och Operativ Chef",
    email: "julian@optimeraenergi.se",
    phone: "0763015202",
  },
  {
    name: "Moltas Roslund",
    role: "Sales Operations",
    email: "moltas@optimeraenergi.se",
    phone: "0705340154",
  },
];

export default function KontaktPage() {
  return (
    <>
      <JsonLd data={contactPageSchema} />
      <JsonLd data={localBusinessSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Hem", href: "/" },
          { name: "Kontakt", href: "/kontakt" },
        ])}
      />
      <section className="container-edge pt-12 md:pt-20 pb-10">
        <div className="max-w-3xl">
          <div className="eyebrow">Kontakt</div>
          <h1 className="mt-5 font-display text-[44px] md:text-[80px] tracking-display-tight leading-[0.95]">
            Hör av dig.
            <br />
            <span className="italic font-serif text-indigo">
              Vi svarar.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-ink/70 text-lg leading-relaxed">
            Ring, mejla eller titta förbi kontoret i Solna. Vill du boka ett
            kostnadsfritt hembesök går det snabbast via vårt offertformulär.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/offert" className="btn-primary">
              Begär hembesök <ArrowRight size={16} />
            </Link>
            <a href="tel:+46763053732" className="btn-ghost">
              Ring 076 305 37 32
            </a>
          </div>
        </div>
      </section>

      <Section eyebrow="Snabbkontakt" title={<>Det här är genvägarna.</>}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ContactCard
            icon={<Phone size={18} />}
            label="Telefon"
            value="076 305 37 32"
            href="tel:+46763053732"
          />
          <ContactCard
            icon={<Mail size={18} />}
            label="E-post"
            value="hej@optimeraenergi.se"
            href="mailto:hej@optimeraenergi.se"
          />
          <ContactCard
            icon={<MapPin size={18} />}
            label="Besöksadress"
            value={"Vallgatan 9\n170 67 Solna"}
            href="https://maps.google.com/?q=Vallgatan+9+Solna"
          />
        </div>
      </Section>

      <Section eyebrow="Teamet" title={<>Prata direkt med oss.</>}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TEAM.map((p) => (
            <article
              key={p.email}
              className="rounded-3xl border border-ink/10 bg-bone p-6 md:p-7 flex flex-col gap-3"
            >
              <div>
                <h3 className="font-display text-2xl tracking-display-tight">
                  {p.name}
                </h3>
                <p className="text-[13.5px] text-ink/55 mt-1">{p.role}</p>
              </div>
              <div className="mt-2 space-y-2 text-[14.5px]">
                <a
                  href={`mailto:${p.email}`}
                  className="flex items-center gap-3 text-ink hover:text-indigo transition group"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-cream/60 text-ink/65 group-hover:bg-indigo group-hover:text-bone transition">
                    <Mail size={14} />
                  </span>
                  <span className="break-all">{p.email}</span>
                </a>
                <a
                  href={`tel:+46${p.phone.replace(/^0/, "")}`}
                  className="flex items-center gap-3 text-ink hover:text-indigo transition group"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-cream/60 text-ink/65 group-hover:bg-indigo group-hover:text-bone transition">
                    <Phone size={14} />
                  </span>
                  <span>{formatPhone(p.phone)}</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <BrandPanel>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-8">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55">
                Optimera Energi Sverige AB
              </div>
              <h2 className="mt-4 font-display text-3xl md:text-5xl tracking-display-tight leading-tight">
                Vallgatan 9, 170 67 Solna.
              </h2>
              <p className="mt-4 text-ink/70 max-w-xl text-[15px] leading-relaxed">
                Kom förbi kontoret om du hellre pratar öga mot öga. Säg till
                i förväg så ser vi till att rätt person finns på plats. Org.nr
                559375-2206.
              </p>
            </div>
            <div className="md:col-span-4">
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

function ContactCard({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="rounded-3xl border border-ink/10 bg-bone p-6 md:p-7 hover:border-ink/40 transition flex flex-col gap-4 group"
    >
      <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-bone group-hover:bg-indigo transition">
        {icon}
      </span>
      <div>
        <div className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink/55">
          {label}
        </div>
        <div className="mt-1.5 font-display text-xl tracking-display-tight whitespace-pre-line leading-snug">
          {value}
        </div>
      </div>
    </a>
  );
}

function formatPhone(p: string): string {
  // 0763015202 → 076 301 52 02
  if (p.length === 10) {
    return `${p.slice(0, 3)} ${p.slice(3, 6)} ${p.slice(6, 8)} ${p.slice(8)}`;
  }
  return p;
}
