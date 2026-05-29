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

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === slug) setDismissed(true);
    } catch {
      // localStorage kan kasta i Safari private mode, ignorera
    }
  }, [slug]);

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

  // SSR och första klient-render: rendera ut banner-skalet så layouten är
  // korrekt. När useEffect kört kollar vi dismissal-state. Detta undviker
  // hydration mismatch.
  if (!mounted) {
    return <BannerShell slug={slug} title={title} onDismiss={onDismiss} />;
  }
  if (dismissed) return null;
  return <BannerShell slug={slug} title={title} onDismiss={onDismiss} />;
}

function BannerShell({
  slug,
  title,
  onDismiss,
}: {
  slug: string;
  title: string;
  onDismiss: (e: React.MouseEvent) => void;
}) {
  return (
    <div
      role="status"
      aria-label="Nytt pressmeddelande"
      className="relative z-[60] bg-indigo text-bone"
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
