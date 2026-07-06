import { Section } from "@/components/site/Section";

export const metadata = {
  title: "Tankar – bloggen",
  description:
    "Tankar om energi, ingenjörskonst och småskaliga beslut som bygger framtiden.",
  alternates: { canonical: "/tankar" },
};

const drafts = [
  {
    title: "Så räknar vi på ditt tak innan vi sätter en skruv",
    body: "En genomgång av processen – från drönarbesiktning till dimensionering och kalkyl på husets förutsättningar.",
    label: "Process",
  },
  {
    title: "LFP vs NMC: Varför vi alltid väljer järnfosfat hemma hos kunder",
    body: "Brandsäkerhet, livslängd, kobolt – och varför specifikationsbladet inte berättar hela sanningen.",
    label: "Teknik",
  },
  {
    title: "Stödtjänster på riktigt: Hur ditt batteri kan tjäna 50 000 kr/år",
    body: "FCR-D, aFRR, mFRR – vad de är, vilka batterier som klarar dem, och hur intäkten faktiskt ser ut 2026.",
    label: "Ekonomi",
  },
];

export default function TankarPage() {
  return (
    <>
      <section className="container-edge pt-12 md:pt-20 pb-10">
        <div className="max-w-3xl">
          <div className="eyebrow">Tankar · bloggen</div>
          <h1 className="mt-5 font-display text-[56px] md:text-[88px] tracking-display-tight leading-[0.95]">
            Vi delar med oss
            <br />
            <span className="italic font-serif text-indigo">av tankarna.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-ink/70 text-lg leading-relaxed">
            Långsam, ärlig journalistik om energi, hus och hur vi tänker när vi
            jobbar. Snart kommer riktiga inlägg – här är vad som ligger på
            ritbordet.
          </p>
        </div>
      </section>

      <Section eyebrow="På ritbordet" title={<>Kommande inlägg.</>}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {drafts.map((d) => (
            <article
              key={d.title}
              className="rounded-3xl border border-ink/10 bg-cream/70 p-7"
            >
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/55">
                {d.label}
              </div>
              <h3 className="mt-3 font-display text-2xl tracking-display-tight leading-snug">
                {d.title}
              </h3>
              <p className="mt-3 text-ink/65 text-[14.5px] leading-relaxed">
                {d.body}
              </p>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
