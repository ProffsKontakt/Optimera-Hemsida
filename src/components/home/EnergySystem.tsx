import Link from "next/link";
import {
  ArrowRight,
  BatteryCharging,
  PlugZap,
  Sun,
  TrendingUp,
} from "lucide-react";

/**
 * "Så går det ihop"-sektionen: samlar solpaneler + batteri + laddbox som
 * ETT system och förklarar hur delarna spelar ihop – huset blir energisnålt
 * och kan i bästa fall gå plus över året. Ersätter den gamla tjänste-griden
 * på landningssidan; varje kort länkar vidare till sin tjänstesida.
 */
const PARTS = [
  {
    n: "01",
    icon: <Sun size={18} />,
    title: "Solpanelerna producerar",
    body: "Taket jobbar varje ljus timme. Elen går först till huset, sedan till batteriet – och det som blir över säljs.",
    href: "/tjanster/solpaneler",
    label: "Om solpaneler",
  },
  {
    n: "02",
    icon: <BatteryCharging size={18} />,
    title: "Batteriet är hjärnan",
    body: "Sparar solen till kvällen, köper el när den är billig och säljer när den är dyr. Med stödtjänster tjänar det pengar även när solen inte skiner.",
    href: "/tjanster/batterier",
    label: "Om batterier",
  },
  {
    n: "03",
    icon: <PlugZap size={18} />,
    title: "Laddboxen tankar smart",
    body: "Bilen laddas på nattens billigaste timmar eller på ditt eget solöverskott – aldrig på dyr topp-el.",
    href: "/tjanster/laddboxar",
    label: "Om laddboxar",
  },
];

export function EnergySystem() {
  return (
    <div>
      {/* De tre delarna, med visuell koppling mellan korten. */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5 relative">
        {PARTS.map((p, i) => (
          <div key={p.n} className="relative">
            {/* Kopplingslinje mellan korten (desktop). */}
            {i > 0 && (
              <span
                aria-hidden
                className="hidden md:block absolute top-1/2 -left-5 w-5 h-px bg-ink/20"
              />
            )}
            <Link
              href={p.href}
              className="group flex h-full flex-col rounded-3xl border border-ink/10 bg-cream/60 p-7 transition hover:border-ink/35"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-indigo text-bone">
                  {p.icon}
                </span>
                <span className="font-mono text-[11px] tracking-[0.18em] text-ink/45">
                  {p.n}
                </span>
              </div>
              <h3 className="mt-5 font-display text-xl tracking-display-tight">
                {p.title}
              </h3>
              <p className="mt-2 text-[14.5px] text-ink/70 leading-relaxed">
                {p.body}
              </p>
              <span className="mt-auto pt-5 inline-flex items-center gap-1.5 text-[13px] text-ink/60 group-hover:text-ink transition">
                {p.label} <ArrowRight size={13} />
              </span>
            </Link>
          </div>
        ))}
      </div>

      {/* Summan av delarna. */}
      <div className="mt-5 md:mt-6 rounded-[28px] bg-ink text-bone p-8 md:p-12 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-sun text-ink">
          <TrendingUp size={20} />
        </span>
        <div className="flex-1">
          <h3 className="font-display text-2xl md:text-3xl tracking-display-tight leading-snug">
            Tillsammans blir villan energisnål –{" "}
            <span className="italic font-serif text-sun">
              och kan i bästa fall gå plus.
            </span>
          </h3>
          <p className="mt-3 text-bone/70 text-[15px] leading-relaxed max-w-2xl">
            Delarna är bra var för sig. Men det är när de pratar med varandra
            som räkningen krymper på riktigt: huset använder sin egen el först,
            handlar smart med resten – och batteriet tjänar pengar på att
            stötta elnätet.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 md:shrink-0">
          <Link
            href="/offert"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-sun px-6 py-3.5 text-sm font-medium text-ink hover:bg-sun/85 transition"
          >
            Begär offert <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}
