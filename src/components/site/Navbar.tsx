"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/tjanster/solpaneler", label: "Sol" },
  { href: "/tjanster/batterier", label: "Batteri" },
  { href: "/tjanster/vaermepumpar", label: "Värme" },
  { href: "/tjanster/laddboxar", label: "Laddning" },
  { href: "/kalkylator", label: "Kalkylator" },
  { href: "/om-oss", label: "Om oss" },
  { href: "/kontakt", label: "Kontakt" },
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
          {/* Sajten är alltid på cream/bone — vi använder ALLTID den ljusa
              logon (svart text). public/logo-dark.svg finns för framtida
              dark mode-implementation, men ska INTE plockas in automatiskt
              via prefers-color-scheme eftersom användarens OS-preferens
              inte påverkar våra sidors faktiska bakgrund. */}
          <Image
            src="/logo.svg"
            alt="Optimera Energi"
            width={332}
            height={114}
            className="h-9 w-auto"
            priority
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
          <Link href="/offert" className="hidden md:inline-flex btn-primary">
            Begär offert
          </Link>
          <button
            aria-label="Meny"
            className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 bg-cream"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-ink/8 bg-bone">
          <div className="container-edge py-4 flex flex-col">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 text-base border-b border-ink/8"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/offert"
              onClick={() => setOpen(false)}
              className="mt-4 btn-primary justify-center"
            >
              Begär offert
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
