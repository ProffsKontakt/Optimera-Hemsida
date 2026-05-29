"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { X, Megaphone } from "lucide-react";

const STORAGE_KEY = "oe_dismissed_press_banner";

export function PressBanner({
  slug,
  title,
}: {
  slug: string;
  title: string;
}) {
  const [mounted, setMounted] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === slug) setDismissed(true);
    } catch {
      // localStorage kan kasta i Safari private mode, ignorera
    }
  }, [slug]);

  // Banderollen glider upp och försvinner så fort man börjar skrolla.
  // Samma tröskel (8px) som Navbar använder för sin shrink-effekt så
  // att de två rörelserna känns synkade.
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function onDismiss(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    try {
      localStorage.setItem(STORAGE_KEY, slug);
    } catch {
      // tyst fel
    }
    setDismissed(true);
  }

  if (mounted && dismissed) return null;

  // Före hydration vill vi inte trigga animation; behandla som ej
  // skrollad så SSR-markup matchar.
  const hidden = mounted && scrolled;

  return (
    <div
      role="status"
      aria-label="Nytt pressmeddelande"
      aria-hidden={hidden || undefined}
      className={`fixed inset-x-0 top-20 z-40 bg-indigo text-bone shadow-sm transition-transform duration-300 ${
        hidden ? "-translate-y-full pointer-events-none" : "translate-y-0"
      }`}
    >
      <Link
        href={`/press/${slug}`}
        className="container-edge flex items-center gap-3 py-2.5 md:py-3 pr-12 hover:bg-indigo/95 transition group"
      >
        <Megaphone
          size={14}
          className="shrink-0 text-bone/85 hidden sm:block"
          aria-hidden
        />
        <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-bone/65 shrink-0 hidden md:inline">
          Nytt pressmeddelande
        </span>
        <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-bone/65 shrink-0 md:hidden">
          Press
        </span>
        <span className="text-[13.5px] md:text-[14px] truncate group-hover:underline">
          {title}
        </span>
        <span className="ml-auto shrink-0 text-[13px] font-medium hidden sm:inline">
          Läs mer →
        </span>
      </Link>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Stäng"
        className="absolute right-2 top-1/2 -translate-y-1/2 grid h-8 w-8 place-items-center rounded-full hover:bg-bone/15 transition text-bone/85"
      >
        <X size={14} />
      </button>
    </div>
  );
}
