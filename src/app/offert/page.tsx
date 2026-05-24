import { OffertForm } from "@/components/offert/OffertForm";
import { JsonLd, reservePageSchema } from "@/components/seo/JsonLd";

export const metadata = {
  title: "Begär offert – boka kostnadsfritt hembesök",
  description:
    "Boka ett kostnadsfritt hembesök direkt i kalendern. Välj dag och tid, så ringer vi dagen innan och bekräftar. Vi tar med bullar och inmätningsutrustning.",
  alternates: { canonical: "/offert" },
  openGraph: {
    title: "Begär offert – Optimera Energi",
    description:
      "Boka ett kostnadsfritt hembesök i Stockholm. Vi ringer dagen innan och bekräftar.",
    url: "/offert",
    type: "website",
  },
};

export default function OffertPage({
  searchParams,
}: {
  searchParams: { [k: string]: string | string[] | undefined };
}) {
  const get = (k: string) => {
    const v = searchParams[k];
    return Array.isArray(v) ? v[0] : v;
  };
  return (
    <>
      <JsonLd data={reservePageSchema} />
      <section className="container-edge pt-12 md:pt-20 pb-10">
        <div className="max-w-3xl">
          <div className="eyebrow">Offert · hembesök · gratis</div>
          <h1 className="mt-5 font-display text-[56px] md:text-[88px] tracking-display-tight leading-[0.95]">
            Berätta vad du
            <br />
            <span className="italic font-serif text-indigo">drömmer om.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-ink/70 text-lg leading-relaxed">
            Välj en tid som passar er nedan, så ringer vi dagen innan och
            bekräftar vem som kommer förbi. Hembesöket är kostnadsfritt och
            utan förpliktelser. Är du allergisk mot kanel säger du bara till
            så fixar vi något annat.
          </p>
        </div>
      </section>

      <section className="container-edge pb-32">
        <OffertForm
          defaults={{
            tjanst: get("tjanst") ?? null,
            panel: get("panel") ?? null,
            n: get("n") ?? null,
            inv: get("inv") ?? null,
            bat: get("bat") ?? null,
            batkwh: get("batkwh") ?? null,
            pump: get("pump") ?? null,
            chrg: get("chrg") ?? null,
            wind: get("wind") ?? null,
            ems: get("ems") ?? null,
          }}
        />
      </section>
    </>
  );
}
