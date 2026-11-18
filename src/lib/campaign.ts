/**
 * Tidsbegränsad kampanj som visas som banderoll under menyn på hela sajten
 * (src/components/site/CampaignBar.tsx). Sätt ACTIVE_CAMPAIGN till null när
 * ingen kampanj pågår.
 *
 * Banderollen försvinner av sig själv när endsAt har passerats:
 *   - vid nästa bygge renderas den inte alls (activeCampaign() i layouten),
 *   - på sidor som byggdes före slutdatumet döljs den i webbläsaren redan
 *     före första renderingen (campaignHideScript i <head>).
 *
 * Byt `id` för varje ny kampanj – annars förblir banderollen stängd för
 * besökare som stängde den förra.
 *
 * Håll filen fri från React – den importeras av layouten och startsidan.
 */

export type Campaign = {
  /** Unikt per kampanj. Sparas i localStorage när besökaren stänger banderollen. */
  id: string;
  /** Kampanjnamnet, visas som etikett före texten. */
  label: string;
  /** Hela budskapet, för breda skärmar. */
  text: string;
  /** Kortare version för surfplattor och mindre datorskärmar. */
  mediumText: string;
  /** Kortaste versionen, för mobil. */
  shortText: string;
  /** Knapptext till höger. */
  cta: string;
  /** Vart banderollen leder. */
  href: string;
  /** Första tidpunkt då kampanjen INTE längre ska visas (ISO 8601 med tidszon). */
  endsAt: string;
};

export const ACTIVE_CAMPAIGN: Campaign | null = {
  id: "black-month-2026",
  label: "Black Month",
  text: "Sista dagen att beställa batteri och få det installerat innan årsskiftet är 30/11. Beställ senast 30/11 och få 3 000 kr rabatt.",
  mediumText: "Beställ batteri senast 30/11: 3 000 kr rabatt och installation innan årsskiftet.",
  // Ska rymmas på en rad på en vanlig mobil (390 px) efter "Black Month:".
  shortText: "−3 000 kr på batteri t.o.m. 30/11",
  cta: "Begär offert",
  href: "/offert?tjanst=batterier",
  // Hela 30 november svensk tid (CET, UTC+1).
  endsAt: "2026-12-01T00:00:00+01:00",
};

/** Kampanjen om den pågår vid tidpunkten `now`, annars null. */
export function activeCampaign(now: number = Date.now()): Campaign | null {
  const c = ACTIVE_CAMPAIGN;
  if (!c) return null;
  const end = Date.parse(c.endsAt);
  return Number.isFinite(end) && now < end ? c : null;
}

/** localStorage-nyckel för stängd banderoll. Värdet är kampanjens id. */
export const CAMPAIGN_DISMISS_KEY = "oe_dismissed_campaign";

/** Klass på <html> som döljer banderollen och dess platshållare (se globals.css). */
export const CAMPAIGN_HIDDEN_CLASS = "oe-campaign-hidden";

/**
 * Banderollens höjd som Tailwind-klasser. Samma klasser på platshållarna
 * (element med data-campaign-spacer) som håller plats för banderollen i
 * sidflödet och i startsidans hjälte, så att den inte täcker innehåll.
 */
export const CAMPAIGN_BAR_HEIGHT = "h-11 sm:h-14";

/**
 * Inline-skript för <head>: döljer banderollen före första renderingen om
 * kampanjen hunnit ta slut sedan sidan byggdes eller om besökaren redan har
 * stängt den. Då blinkar den inte till på varje sida.
 */
export function campaignHideScript(c: Campaign): string {
  const end = Date.parse(c.endsAt);
  const cls = JSON.stringify(CAMPAIGN_HIDDEN_CLASS);
  return (
    `(function(){var h=document.documentElement;` +
    `if(Date.now()>=${end}){h.classList.add(${cls});return}` +
    `try{if(localStorage.getItem(${JSON.stringify(CAMPAIGN_DISMISS_KEY)})===${JSON.stringify(c.id)})h.classList.add(${cls})}catch(e){}})()`
  );
}
