import { OffertForm } from "@/components/offert/OffertForm";

export const metadata = {
  title: "Begär offert",
  description:
    "Boka ett kostnadsfritt hembesök direkt i kalendern – välj dag och tid, så ringer vi dagen innan och bekräftar. Och ja, vi tar med bullar.",
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
      <section className="container-edge pt-12 md:pt-20 pb-10">
        <div className="max-w-3xl">
          <div className="eyebrow">Offert · hembesök · gratis</div>
          <h1 className="mt-5 font-display text-[56px] md:text-[88px] tracking-display-tight leading-[0.95]">
            Berätta vad du
            <br />
            <span className="italic text-moss">drömmer om.</span>
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
