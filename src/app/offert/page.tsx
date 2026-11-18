import { Check, Phone, Star } from "lucide-react";
import { OffertForm } from "@/components/offert/OffertForm";
import { JsonLd, reservePageSchema } from "@/components/seo/JsonLd";
import { getRecoStats } from "@/lib/reco-live";

export const metadata = {
  title: "Begär offert – kostnadsfritt och utan förpliktelser",
  description:
    "Fyll i namn, telefon och e-post så ringer vi upp nästa vardag och bokar ett kostnadsfritt hembesök. Solpaneler, batterier, värmepumpar och laddboxar i Stockholm.",
  alternates: { canonical: "/offert" },
  openGraph: {
    title: "Begär offert – Optimera Energi",
    description:
      "Kostnadsfri offert på solpaneler, batteri, värmepump eller laddbox. Vi ringer upp nästa vardag.",
    url: "/offert",
    type: "website",
  },
};

// Avslutningen på rubriken när besökaren kommer från en tjänstesida
// (/offert?tjanst=…). Utan känd tjänst: "på ditt hus."
const OFFER_FOR: Record<string, string> = {
  solpaneler: "på solpaneler.",
  batterier: "på batteri.",
  vaermepumpar: "på värmepump.",
  laddboxar: "på laddbox.",
};

const INCLUDED = [
  "Hembesök med drönarbesiktning av taket",
  "Kalkyl på just era förutsättningar",
  "Alltid samma pris som står på offerten",
  "Kostnadsfritt och utan förpliktelser",
];

export default async function OffertPage({
  searchParams,
}: {
  searchParams: { [k: string]: string | string[] | undefined };
}) {
  const get = (k: string) => {
    const v = searchParams[k];
    return Array.isArray(v) ? v[0] : v;
  };
  const tjanst = get("tjanst") ?? null;
  const reco = await getRecoStats();

  return (
    <>
      <JsonLd data={reservePageSchema} />
      <section className="container-edge pb-24 pt-12 md:pt-14">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5 lg:pt-6">
            <div className="eyebrow">Offert · svar nästa vardag</div>
            <h1 className="mt-4 font-display text-[40px] leading-[1.05] tracking-display-tight sm:text-[52px] md:text-[64px]">
              Kostnadsfri offert
              <span className="block font-serif italic text-indigo">
                {(tjanst && OFFER_FOR[tjanst]) || "på ditt hus."}
              </span>
            </h1>
            {/* Ingressen döljs på mobil så att formuläret och knappen syns
                utan skroll – "nästa vardag" står redan i etiketten ovan och
                under knappen. */}
            <p className="mt-5 hidden max-w-md text-lg leading-relaxed text-ink/70 sm:block">
              Det tar en halv minut. Vi ringer upp nästa vardag, svarar på dina
              frågor och bokar ett hembesök när det passar dig.
            </p>
            <RecoLine reco={reco} className="mt-5 hidden lg:inline-flex" />
            <Included className="mt-8 hidden lg:block" />
            <CallUs className="mt-8 hidden lg:flex" />
          </div>

          <div className="lg:col-span-7">
            <OffertForm
              defaults={{
                tjanst,
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
          </div>

          {/* Mobil: det som ingår och telefonnumret kommer efter formuläret,
              så att formuläret syns direkt. */}
          <div className="lg:hidden">
            <RecoLine reco={reco} className="mb-7 inline-flex" />
            <Included />
            <CallUs className="mt-6 flex" />
          </div>
        </div>
      </section>
    </>
  );
}

function RecoLine({
  reco,
  className = "",
}: {
  reco: { average: string; count: number; url: string };
  className?: string;
}) {
  return (
    <a
      href={reco.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`items-center gap-2 text-[14px] text-ink/70 transition hover:text-ink ${className}`}
    >
      <span className="flex text-sun" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
        ))}
      </span>
      <span>
        <strong className="font-medium text-ink">{reco.average} av 5</strong> på
        Reco · {reco.count} omdömen
      </span>
    </a>
  );
}

function Included({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/55">
        Det här ingår
      </div>
      <ul className="mt-4 space-y-3 text-[15px] text-ink/80">
        {INCLUDED.map((b) => (
          <li key={b} className="flex items-start gap-3">
            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-sun text-ink">
              <Check size={12} aria-hidden />
            </span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CallUs({ className = "" }: { className?: string }) {
  return (
    <a
      href="tel:+46763053732"
      className={`items-center gap-3 rounded-2xl border border-ink/10 bg-cream/60 px-5 py-4 transition hover:border-ink/30 ${className}`}
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-bone">
        <Phone size={16} aria-hidden />
      </span>
      <span>
        <span className="block text-[13px] text-ink/60">Hellre ringa?</span>
        <span className="block text-[16px] font-medium">076 305 37 32</span>
      </span>
    </a>
  );
}
