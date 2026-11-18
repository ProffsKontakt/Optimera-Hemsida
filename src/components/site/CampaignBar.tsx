"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import {
  CAMPAIGN_BAR_HEIGHT,
  CAMPAIGN_DISMISS_KEY,
  CAMPAIGN_HIDDEN_CLASS,
  type Campaign,
} from "@/lib/campaign";

/**
 * Kampanjbanderoll under menyn på hela sajten. Innehåll och slutdatum finns
 * i src/lib/campaign.ts. Fungerar som PressBanner: ligger fast under menyn,
 * glider undan när man börjar skrolla och kan stängas.
 *
 * Fast position i stället för en rad i sidflödet, eftersom startsidans
 * hjältebild ligger uppdragen under menyn (-mt-20) och då skulle täcka den.
 * På övriga sidor håller en platshållare lika hög som banderollen plats i
 * flödet, så att sidans första rader börjar under banderollen i stället för
 * att täckas av den. Startsidans hjälte har en egen platshållare.
 */
export function CampaignBar({ campaign }: { campaign: Campaign }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [closed, setClosed] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Sidan kan vara byggd före slutdatumet – kontrollera igen här.
    if (Date.now() >= Date.parse(campaign.endsAt)) {
      setClosed(true);
      return;
    }
    try {
      if (localStorage.getItem(CAMPAIGN_DISMISS_KEY) === campaign.id) {
        setClosed(true);
      }
    } catch {
      // localStorage kan kasta i Safari private mode, ignorera
    }
  }, [campaign.id, campaign.endsAt]);

  // Samma tröskel (8px) som Navbar och PressBanner.
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ingen kampanj i admin och studio.
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/studio")) {
    return null;
  }
  if (mounted && closed) return null;

  function onDismiss(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    try {
      localStorage.setItem(CAMPAIGN_DISMISS_KEY, campaign.id);
    } catch {
      // tyst fel
    }
    document.documentElement.classList.add(CAMPAIGN_HIDDEN_CLASS);
    setClosed(true);
    trackEvent("campaign_dismiss", { campaign_id: campaign.id });
  }

  // Före hydreringen: behandla som ej skrollad så att SSR-markup matchar.
  const hidden = mounted && scrolled;

  return (
    <>
      {pathname !== "/" && (
        <div data-campaign-spacer aria-hidden="true" className={CAMPAIGN_BAR_HEIGHT} />
      )}
      <div
        id="oe-campaign-bar"
        role="region"
        aria-label={`Kampanj: ${campaign.label}`}
        aria-hidden={hidden || undefined}
        className={`fixed inset-x-0 top-20 z-40 ${CAMPAIGN_BAR_HEIGHT} border-b border-white/10 bg-ink text-bone shadow-sm transition-transform duration-300 ${
          hidden ? "-translate-y-full pointer-events-none" : "translate-y-0"
        }`}
      >
        <Link
          href={campaign.href}
          onClick={() =>
            trackEvent("campaign_click", {
              campaign_id: campaign.id,
              page_path: pathname,
            })
          }
          className="container-edge group flex h-full items-center gap-4 pr-10 transition hover:bg-white/5 sm:pr-14"
        >
          <span className="hidden shrink-0 font-mono text-[11.5px] uppercase tracking-[0.18em] text-sun sm:inline">
            {campaign.label}
          </span>
          {/* Kort text upp till 1024 px, mellanlång till 1440 px och hela
              meningen därefter – annars kapas den i den större texten. */}
          <span className="text-[13px] leading-snug group-hover:underline sm:truncate sm:text-[14.5px] sm:font-medium lg:hidden">
            <span className="font-medium text-sun sm:hidden">{campaign.label}: </span>
            {campaign.shortText}
          </span>
          <span className="hidden truncate text-[15px] font-medium group-hover:underline lg:inline min-[1440px]:hidden">
            {campaign.mediumText}
          </span>
          <span className="hidden truncate text-[15px] font-medium group-hover:underline min-[1440px]:inline">
            {campaign.text}
          </span>
          <span className="ml-auto hidden shrink-0 rounded-full bg-sun px-4 py-1.5 text-[13.5px] font-medium text-ink transition group-hover:bg-sun/90 sm:inline-flex">
            {campaign.cta} →
          </span>
        </Link>
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Stäng kampanjen"
          className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-bone/85 transition hover:bg-bone/15 sm:right-3"
        >
          <X size={16} />
        </button>
      </div>
    </>
  );
}
