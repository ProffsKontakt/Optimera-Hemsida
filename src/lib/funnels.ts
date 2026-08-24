/**
 * Offert-funnel: kanal-varianter av det steg-baserade offertflödet.
 *
 * Varje variant får en egen URL (t.ex. /offert-fb för Facebook-annonser)
 * så att kanalerna kan A/B-jämföras och leads attribueras rätt i CRM:et
 * (Optimera Hub). Lägg till en ny kanal genom att lägga till en post i
 * FUNNELS – routen, admin-statistiken och CRM-mappningen hänger med
 * automatiskt.
 *
 * OBS: håll filen fri från React/ikoner – den importeras server-side av
 * API-routen, sitemap m.m.
 */

export type FunnelProduct = {
  /** Nyckel som skickas som service i lead-payloaden. */
  key: string;
  title: string;
  sub: string;
};

/** Produktkorten i steg 1. Samma för alla varianter. */
export const FUNNEL_PRODUCTS: FunnelProduct[] = [
  {
    key: "solpaneler",
    title: "Solpanelsinstallation",
    sub: "Sänk dina elkostnader",
  },
  {
    key: "batterier",
    title: "Batteri och växelriktare",
    sub: "Lagra din egen solel",
  },
  {
    key: "batteri-utbyggnad",
    title: "Utbyggnad av batteri",
    sub: "Bygg ut det du redan har",
  },
  {
    key: "laddboxar",
    title: "Laddbox",
    sub: "Ladda bilen hemma",
  },
];

export type Funnel = {
  /** URL-segmentet, t.ex. "offert-fb" -> optimeraenergi.se/offert-fb */
  slug: string;
  /** Kanalnamn som visas i admin-statistiken. */
  channel: string;
  /** leadsource i CRM:et (Optimera Hub). Följer befintlig konvention. */
  leadsource: string;
  /** Rubrik + underrubrik i wizardens topp. Varieras per kanal. */
  headline: string;
  intro: string;
};

export const FUNNELS: Funnel[] = [
  {
    slug: "offert-start",
    channel: "Generell",
    leadsource: "Hemsida (Funnel)",
    headline: "Vad behöver ditt hus?",
    intro: "Svara på några snabba frågor – det tar under en minut.",
  },
  {
    slug: "offert-fb",
    channel: "Facebook",
    leadsource: "Hemsida (Facebook)",
    headline: "Vad behöver ditt hus?",
    intro: "Svara på några snabba frågor – det tar under en minut och leder till en kostnadsfri offert.",
  },
  {
    slug: "offert-ig",
    channel: "Instagram",
    leadsource: "Hemsida (Instagram)",
    headline: "Vad behöver ditt hus?",
    intro: "Svara på några snabba frågor – det tar under en minut och leder till en kostnadsfri offert.",
  },
  {
    slug: "offert-hemsol",
    channel: "Hemsol",
    leadsource: "Hemsida (Hemsol)",
    headline: "Vad behöver ditt hus?",
    intro: "Du har jämfört – nu tar vi fram din offert. Några snabba frågor först.",
  },
];

export const getFunnel = (slug: string): Funnel | undefined =>
  FUNNELS.find((f) => f.slug === slug);
