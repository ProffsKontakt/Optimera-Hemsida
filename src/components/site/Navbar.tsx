"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
} from "lucide-react";
import { VISIBLE_SERVICES } from "@/lib/services";

// Tjänste-länkarna byggs från VISIBLE_SERVICES så dolda tjänster (t.ex.
// värmepump just nu) automatiskt försvinner ur navigeringen.
const links = [
  // Nyheter först: kunskapsbasen ska vara sajtens mest lättnavigerade
  // sektion – uppdateras var tredje dag under valbevakningen.
  { href: "/nyheter", label: "Nyheter" },
  ...VISIBLE_SERVICES.map((s) => ({ href: `/tjanster/${s.slug}`, label: s.short })),
  { href: "/kalkylator", label: "Kalkylator" },
  { href: "/om-oss", label: "Om oss" },
  { href: "/kontakt", label: "Kontakt" },
];

/* Mobilmenyns ikoner + accentfärger per länk (gör menyn roligare att se
   på). Ikon väljs på href, färgerna cyklar genom brand-paletten. */
const MENU_ICONS: Record<string, React.ReactNode> = {
  "/nyheter": <Newspaper size={16} />,
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
          <Image
            src="/logo.svg"
            alt="Optimera Energi"
            width={332}
            height={114}
            className="h-9 w-auto"
            fetchPriority="high"
          />
          <span className="hidden md:inline-block font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 border-l border-ink/15 pl-3 ml-1">
            byggd på kloka tankar
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-3.5 py-2 text-[13.5px] text-ink/75 hover:text-ink rounded-full hover:bg-ink/5 transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <QuoteButton className="hidden md:inline-flex" />
          {/* Hamburgare som morfar till kryss (tre linjer -> X). */}
          <button
            aria-label="Meny"
            aria-expanded={open}
            className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 bg-cream"
            onClick={() => setOpen(!open)}
          >
            <span className="relative block h-[14px] w-[18px]">
              <span
                className={`absolute left-0 top-0 h-[2px] w-full rounded-full bg-ink transition-all duration-300 ${
                  open ? "top-1/2 -translate-y-1/2 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 rounded-full bg-ink transition-all duration-200 ${
                  open ? "opacity-0 scale-x-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 bottom-0 h-[2px] w-full rounded-full bg-ink transition-all duration-300 ${
                  open ? "bottom-1/2 translate-y-1/2 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
            className="lg:hidden overflow-hidden border-t border-ink/8 bg-bone"
          >
            <div className="container-edge py-4 flex flex-col">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-center gap-4 py-3.5 border-b border-ink/8"
                  >
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-transform duration-300 group-active:scale-90 ${
                        MENU_ACCENTS[i % MENU_ACCENTS.length]
                      }`}
                    >
                      {MENU_ICONS[l.href] ?? <Zap size={16} />}
                    </span>
                    {/* Samma typsnitt som hero-radens "sol och batteri i
                        Stockholm" (Fraunces, kursiv serif). */}
                    <span className="font-serif italic text-[26px] leading-none">
                      {l.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + links.length * 0.05, duration: 0.3 }}
              >
                {/* Mobilmenyn -> wizarden (steg-flödet). Desktop-headern
                    behåller /offert – jämförs i /admin/funnel + GA4. */}
                <QuoteButton
                  href="/offert-start"
                  className="mt-5 w-full"
                  innerClassName="w-full justify-center"
                  onClick={() => setOpen(false)}
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
        className={`inline-flex items-center justify-center rounded-full bg-bone text-indigo group-hover:bg-indigo group-hover:text-bone transition-colors duration-300 px-5 py-2 text-[13.5px] font-medium ${innerClassName}`}
      >
        Begär offert
      </span>
    </Link>
  );
}
