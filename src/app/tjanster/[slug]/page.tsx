import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICES, getService, type ServiceSlug } from "@/lib/services";
import { ServiceVignette } from "@/components/3d/ServiceVignette";
import { Section } from "@/components/site/Section";
import { Disclosure } from "@/components/site/Disclosure";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const s = getService(params.slug as ServiceSlug);
  if (!s) return {};
  return { title: s.name, description: s.oneLiner };
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
      <section className="container-edge pt-12 md:pt-20 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <div className="eyebrow">Tjänst · {s.badge}</div>
            <h1 className="mt-5 font-display text-[56px] md:text-[88px] tracking-display-tight leading-[0.95]">
              {s.name}
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

      <Section>
        <div className="rounded-[28px] bg-ink text-bone p-10 md:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone/55">
              Redo att gå vidare?
            </div>
            <h3 className="mt-3 font-display text-3xl md:text-5xl tracking-display-tight max-w-2xl leading-tight">
              Boka ett hembesök för {s.name.toLowerCase()}.
            </h3>
          </div>
          <div className="flex gap-3">
            <Link
              href={`/offert?tjanst=${s.slug}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-sun px-7 py-4 text-base font-medium text-ink hover:bg-sun-deep transition"
            >
              Begär offert <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
