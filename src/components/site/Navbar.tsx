"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Sun,
  BatteryCharging,
  PlugZap,
  Flame,
  Calculator,
  Users,
  Mail,
  Newspaper,
  Zap,
  Library,
  MessageCircleQuestion,
  GraduationCap,
  BookOpen,
  ChevronDown,
} from "lucide-react";
import { VISIBLE_SERVICES } from "@/lib/services";

type NavChild = { href: string; label: string; desc: string };
type NavLink = { href: string; label: string; children?: NavChild[] };

// Kunskapsbankens undermeny: nyheterna (ny artikel var tredje dag), de två
// databaserna och guiderna.
const KNOWLEDGE_LINKS: NavChild[] = [
  { href: "/nyheter", label: "Nyheter", desc: "Energinyheterna som påverkar din elräkning" },
  { href: "/solcellsfragor", label: "Solcellsfrågor", desc: "Svar på det svenskar söker om solceller" },
  { href: "/batteriskolan", label: "Batteriskolan", desc: "Hembatteriets koncept, ett i taget" },
  { href: "/guider", label: "Guider", desc: "Värmepump, laddbox, elpris, pris och avdrag" },
];

// Tjänste-länkarna byggs från VISIBLE_SERVICES så dolda tjänster
// automatiskt försvinner ur navigeringen.
const links: NavLink[] = [
  ...VISIBLE_SERVICES.map((s) => ({ href: `/tjanster/${s.slug}`, label: s.short })),
  { href: "/kalkylator", label: "Kalkylator" },
  { href: "/om-oss", label: "Om oss" },
  // Kunskapsbanken tog Kontakts plats i menyn (okt 2026). Kontakt nås via
  // Om oss, footern, offertknappen och kunskapsbankens "Hittar du inte svaret?".
  { href: "/kunskapsbank", label: "Kunskapsbank", children: KNOWLEDGE_LINKS },
];

/* Mobilmenyns ikoner + accentfärger per länk (gör menyn roligare att se
   på). Ikon väljs på href, färgerna cyklar genom brand-paletten. */
const MENU_ICONS: Record<string, React.ReactNode> = {
  "/kunskapsbank": <Library size={16} />,
  "/nyheter": <Newspaper size={16} />,
  "/solcellsfragor": <MessageCircleQuestion size={16} />,
  "/batteriskolan": <GraduationCap size={16} />,
  "/guider": <BookOpen size={16} />,
  "/tjanster/solpaneler": <Sun size={16} />,
  "/tjanster/batterier": <BatteryCharging size={16} />,
  "/tjanster/laddboxar": <PlugZap size={16} />,
  "/tjanster/vaermepumpar": <Flame size={16} />,
  "/kalkylator": <Calculator size={16} />,
  "/om-oss": <Users size={16} />,
  "/kontakt": <Mail size={16} />,
};
const MENU_ACCENTS = [
  "bg-sun text-ink",
  "bg-indigo text-bone",
  "bg-copper text-bone",
  "bg-moss text-bone",
  "bg-amber text-ink",
  "bg-graphite text-bone",
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // Startsidan har en mörk hjältebild som går ända upp bakom menyn. Där
  // ligger menyn genomskinlig med ljus text tills man skrollar eller öppnar
  // mobilmenyn. Övriga sidor har ljus bakgrund och mörk text som förut.
  const pathname = usePathname();
  const onHero = pathname === "/" && !scrolled && !open;
  const linkTone = onHero
    ? "text-white/85 hover:text-white hover:bg-white/10"
    : "text-ink/75 hover:text-ink hover:bg-ink/5";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-bone/85 backdrop-blur-xl border-b border-ink/8"
          : open
            ? "bg-bone"
            : "bg-transparent",
      ].join(" ")}
    >
      <div className="container-edge flex h-20 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 group"
          onClick={() => setOpen(false)}
          aria-label="Optimera Energi – startsidan"
        >
          <span className="relative block">
            <Image
              src="/logo.svg"
              alt="Optimera Energi"
              width={332}
              height={114}
              className={`h-9 w-auto transition-opacity duration-300 ${onHero ? "opacity-0" : "opacity-100"}`}
              fetchPriority="high"
            />
            {/* Ljus logga för den mörka hjältebilden på startsidan. */}
            <Image
              src="/logo-dark.svg"
              alt=""
              aria-hidden
              width={332}
              height={114}
              className={`absolute inset-0 h-9 w-auto transition-opacity duration-300 ${onHero ? "opacity-100" : "opacity-0"}`}
            />
          </span>
          {/* Taglinen göms i spannet 1024–1279px: där får den fulla menyn
              (åtta flikar) inte plats bredvid den. Två rader så att den inte
              blir bredare än den gamla korta taglinen. */}
          <span className={`hidden md:block lg:hidden xl:block font-mono text-[9.5px] leading-[1.45] uppercase tracking-[0.16em] transition-colors duration-300 ${onHero ? "text-white/70 border-white/25" : "text-ink/55 border-ink/15"} border-l pl-3 ml-1`}>
            <span className="block whitespace-nowrap">För dig som vill Optimera</span>
            <span className="block whitespace-nowrap">din energianvändning</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) =>
            l.children ? (
              <div key={l.href} className="group relative">
                <Link
                  href={l.href}
                  className={`inline-flex items-center gap-1 whitespace-nowrap px-2.5 xl:px-3.5 py-2 text-[13.5px] rounded-full transition-colors ${linkTone}`}
                >
                  {l.label}
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180 ${onHero ? "text-white/60" : "text-ink/45"}`}
                  />
                </Link>
                {/* pt-2 överbryggar glappet så att hover inte bryts på
                    vägen ner till panelen. Högerförankrad: kunskapsbanken
                    är sista fliken, så panelen öppnar inåt mot sidan. */}
                <div className="invisible absolute right-0 top-full z-50 pt-2 opacity-0 translate-y-1 transition duration-200 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0">
                  <div className="w-[340px] rounded-3xl border border-ink/10 bg-bone p-2 shadow-xl shadow-ink/10">
                    {l.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className="flex items-start gap-3 rounded-2xl p-3 transition-colors hover:bg-ink/5 focus-visible:bg-ink/5"
                      >
                        <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-cream text-indigo">
                          {MENU_ICONS[c.href] ?? <Zap size={16} />}
                        </span>
                        <span>
                          <span className="block text-[14px] text-ink">{c.label}</span>
                          <span className="block text-[12.5px] leading-snug text-ink/55">
                            {c.desc}
                          </span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={l.href}
                href={l.href}
                className={`whitespace-nowrap px-2.5 xl:px-3.5 py-2 text-[13.5px] rounded-full transition-colors ${linkTone}`}
              >
                {l.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-3">
          <QuoteButton className="hidden md:inline-flex" />
          {/* Hamburgare som morfar till kryss (tre linjer -> X). */}
          <button
            aria-label="Meny"
            aria-expanded={open}
            className={`lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-300 ${
              onHero ? "border-white/30 bg-white/10 backdrop-blur" : "border-ink/15 bg-cream"
            }`}
            onClick={() => setOpen(!open)}
          >
            <span className="relative block h-[14px] w-[18px]">
              <span
                className={`absolute left-0 top-0 h-[2px] w-full rounded-full transition-all duration-300 ${onHero ? "bg-white" : "bg-ink"} ${
                  open ? "top-1/2 -translate-y-1/2 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 rounded-full transition-all duration-200 ${onHero ? "bg-white" : "bg-ink"} ${
                  open ? "opacity-0 scale-x-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 bottom-0 h-[2px] w-full rounded-full transition-all duration-300 ${onHero ? "bg-white" : "bg-ink"} ${
                  open ? "bottom-1/2 translate-y-1/2 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobilmenyn. Fälls ut med CSS (grid-rader 0fr -> 1fr) och länkarna
          tonar in en i taget med stegrad fördröjning. Inget
          animationsbibliotek behövs, så menyn tynger inte varje sida. */}
      <div
        className={`lg:hidden grid border-ink/8 bg-bone transition-[grid-template-rows,visibility] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none ${
          open ? "visible grid-rows-[1fr] border-t" : "invisible grid-rows-[0fr]"
        }`}
        aria-hidden={!open}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="container-edge py-4 flex flex-col">
            {links.map((l, i) => (
              <div
                key={l.href}
                className={`transition-[opacity,transform] duration-300 motion-reduce:transition-none ${
                  open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"
                }`}
                style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
              >
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`group flex items-center gap-4 py-3.5 ${
                    l.children ? "" : "border-b border-ink/8"
                  }`}
                >
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-transform duration-300 group-active:scale-90 ${
                      MENU_ACCENTS[i % MENU_ACCENTS.length]
                    }`}
                  >
                    {MENU_ICONS[l.href] ?? <Zap size={16} />}
                  </span>
                  {/* Samma typsnitt som hero-radens kursiva accent
                      (Fraunces, kursiv serif). */}
                  <span className="font-serif italic text-[26px] leading-none">
                    {l.label}
                  </span>
                </Link>
                {l.children && (
                  <div className="flex flex-wrap gap-2 border-b border-ink/8 pb-4 pl-[52px]">
                    {l.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        onClick={() => setOpen(false)}
                        className="rounded-full border border-ink/15 bg-cream px-3.5 py-1.5 text-[13.5px] text-ink/80 active:scale-95 transition-transform"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div
              className={`transition-[opacity,transform] duration-300 motion-reduce:transition-none ${
                open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
              style={{ transitionDelay: open ? `${80 + links.length * 50}ms` : "0ms" }}
            >
              {/* Mobilmenyn -> wizarden (steg-flödet). Desktop-headern
                  behåller /offert – jämförs i /admin/funnel + GA4. */}
              <QuoteButton
                href="/offert-start"
                className="mt-5 w-full"
                innerClassName="w-full justify-center"
                onClick={() => setOpen(false)}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

/**
 * "Begär offert" med gradient-outline (indigo -> sun, blå -> gul), vit insida
 * + indigo text i vila; fyller helt indigo med bone-text vid hover (mjuk
 * 300ms-övergång). Ögonfångande i vila, tydlig blå knapp vid interaktion.
 */
function QuoteButton({
  className = "",
  innerClassName = "",
  onClick,
  href = "/offert",
}: {
  className?: string;
  innerClassName?: string;
  onClick?: () => void;
  /** Mobilytor pekar mot wizarden (/offert-start) för A/B-jämförelse. */
  href?: string;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`group inline-flex rounded-full p-[3px] bg-gradient-to-r from-indigo via-sun to-indigo animate-gradient-drift transition-transform duration-300 hover:scale-[1.02] ${className}`}
    >
      <span
        className={`inline-flex items-center justify-center whitespace-nowrap rounded-full bg-bone text-indigo group-hover:bg-indigo group-hover:text-bone transition-colors duration-300 px-5 py-2 text-[13.5px] font-medium ${innerClassName}`}
      >
        Begär offert
      </span>
    </Link>
  );
}
