/**
 * Skickar inkommande webb-leads till CRM-databasen (Supabase-projektet
 * "closer-offert-kalkyl", public.leads). Detta är den primära, pålitliga
 * destinationen för leads, jämfört med den valfria mejl/webhook-vägen.
 *
 * RLS på leads-tabellen har bara policies för `authenticated`, så insert
 * måste ske med service-role-nyckeln server-side (den bypassar RLS).
 * Nyckeln ligger som env-variabel i Vercel och exponeras aldrig mot klient.
 *
 * Insert triggar befintliga DB-triggers: entity_id sätts till "optimera",
 * en kontakt + deal skapas automatiskt (auto_create_deal_from_lead), och
 * team-notiser skickas om needs_claim = true.
 */
import { getService, type ServiceSlug } from "@/lib/services";
import { getFunnel } from "@/lib/funnels";

export type CrmSlot =
  | { date: string; time: string; dateLabel: string; weekday: string }
  | null
  | undefined;

export type CrmAttribution = {
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  gaClientId?: string;
  landingPage?: string;
  referrer?: string;
  firstSeen?: string;
};

export type CrmLeadInput = {
  namn: string;
  telefon: string;
  epost: string;
  adress?: string;
  meddelande?: string;
  boende?: string;
  contactMethod: "hembesok" | "telefon";
  slot?: CrmSlot;
  services: string[];
  /** Funnel-variantens slug (t.ex. "offert-fb"), se src/lib/funnels.ts. */
  funnel?: string;
  config?: Record<string, unknown>;
  attribution?: CrmAttribution;
};

export type SellerHint = { name: string; email?: string };

type LeadRow = Record<string, unknown>;

// Tjänst-slug -> [interest-kolumn i leads, svenskt namn]. Värmepump har
// ingen egen kolumn (och är dold just nu) – den hamnar i intresserad_av.
const SERVICE_INTEREST: Record<string, { col?: string; label: string }> = {
  solpaneler: { col: "interest_solar_panels", label: "Solpaneler" },
  batterier: { col: "interest_battery", label: "Batterier" },
  "batteri-utbyggnad": {
    col: "interest_battery_expansion",
    label: "Utbyggnad av batteri",
  },
  laddboxar: { col: "interest_ev_charger", label: "Laddbox" },
  vaermepumpar: { col: undefined, label: "Värmepump" },
};

// Boende-typ från formuläret -> customer_type i CRM. Allt utom brf räknas
// som privatkonsument (consumer).
const HOUSING_TO_CUSTOMER_TYPE: Record<string, string> = {
  "Brf / styrelse": "housing_cooperative",
};

function stockholmParts(now: Date) {
  const date = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Europe/Stockholm",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
  const time = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Europe/Stockholm",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(now);
  return { date, time };
}

// Ger Stockholm-offset ("+02:00"/"+01:00") för ett givet ögonblick så att
// platsbesok_at (timestamptz) hamnar på rätt instant året runt.
function stockholmOffset(at: Date): string {
  const part = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Stockholm",
    timeZoneName: "longOffset",
  })
    .formatToParts(at)
    .find((p) => p.type === "timeZoneName")?.value;
  return (part ?? "GMT+00:00").replace("GMT", "") || "+00:00";
}

function platsbesokAtISO(slot: CrmSlot): string | null {
  if (!slot?.date || !slot?.time) return null;
  const hm = /^\d{1,2}:\d{2}/.test(slot.time)
    ? slot.time.slice(0, 5).padStart(5, "0")
    : null;
  if (!hm) return null;
  const baseline = new Date(`${slot.date}T${hm}:00Z`);
  if (Number.isNaN(baseline.getTime())) return null;
  return `${slot.date}T${hm}:00${stockholmOffset(baseline)}`;
}

function splitName(namn: string): {
  first: string | null;
  last: string | null;
} {
  const parts = namn.trim().split(/\s+/).filter(Boolean);
  if (parts.length <= 1) return { first: parts[0] ?? null, last: null };
  return { first: parts[0], last: parts.slice(1).join(" ") };
}

function attributionSummary(a: CrmAttribution): string {
  const bits = [
    a.utmSource && `source=${a.utmSource}`,
    a.utmMedium && `medium=${a.utmMedium}`,
    a.utmCampaign && `kampanj=${a.utmCampaign}`,
    a.gclid ? "gclid" : a.gbraid ? "gbraid" : a.wbraid ? "wbraid" : null,
  ].filter(Boolean);
  return bits.length ? bits.join(", ") : "organisk/direkt";
}

/** Bygger en rad för public.leads utifrån ett webb-lead. Exporterad för test. */
export function buildLeadRow(lead: CrmLeadInput, seller: SellerHint): LeadRow {
  const { date, time } = stockholmParts(new Date());
  const isPlatsbesok = lead.contactMethod === "hembesok";
  const { first, last } = splitName(lead.namn);
  const selected = new Set(lead.services);
  // Kanal-variant (t.ex. Facebook-funneln) styr leadsource så kanalerna
  // kan särskiljas i CRM:et. Utan funnel: befintlig Hemsida-konvention.
  const funnelCfg = lead.funnel ? getFunnel(lead.funnel) : undefined;
  const leadsource =
    funnelCfg?.leadsource ??
    (isPlatsbesok ? "Hemsida (Platsbesök)" : "Hemsida");

  const labels = lead.services.map(
    (s) =>
      SERVICE_INTEREST[s]?.label ??
      getService(s as ServiceSlug)?.name ??
      s,
  );

  const interest: LeadRow = {};
  for (const [slug, { col }] of Object.entries(SERVICE_INTEREST)) {
    if (col) interest[col] = selected.has(slug) ? "true" : "false";
  }
  if (lead.services.length === 0) interest.interest_unsure = "true";

  const attribution = lead.attribution ?? {};
  const notes = [
    `Inkommet via optimeraenergi.se (${
      isPlatsbesok ? "hembesök" : "telefonkontakt"
    }).`,
    funnelCfg ? `Kanal: ${funnelCfg.channel} (funnel /${funnelCfg.slug}).` : null,
    isPlatsbesok && lead.slot
      ? `Önskad tid: ${lead.slot.weekday} ${lead.slot.dateLabel} kl ${lead.slot.time}.`
      : null,
    lead.boende ? `Boende: ${lead.boende}.` : null,
    labels.length ? `Intresse: ${labels.join(", ")}.` : null,
    `Föreslagen säljare (webbregel): ${seller.name}.`,
    `Annonskälla: ${attributionSummary(attribution)}.`,
  ]
    .filter(Boolean)
    .join("\n");

  return {
    created_date: date,
    created_time: time,
    installer_name: "Optimera Energi",
    contact_name: lead.namn,
    contact_first_name: first,
    contact_last_name: last,
    contact_email: lead.epost,
    contact_phone: lead.telefon,
    street_address: lead.adress ?? null,
    customer_type: lead.boende
      ? HOUSING_TO_CUSTOMER_TYPE[lead.boende] ?? "consumer"
      : null,
    ...interest,
    intresserad_av: labels.join(", ") || null,
    message: lead.meddelande ?? null,
    leadsource,
    form_name: funnelCfg
      ? `Funnel ${funnelCfg.channel} (webb)`
      : isPlatsbesok
        ? "Boka hembesök (webb)"
        : "Begär offert (webb)",
    status: "Open",
    is_platsbesok: isPlatsbesok,
    platsbesok_at: isPlatsbesok ? platsbesokAtISO(lead.slot) : null,
    campaign_name: attribution.utmCampaign ?? null,
    ad_name: attribution.utmContent ?? null,
    notes,
    // Allt råmaterial bevaras losslessly här för spårbarhet.
    close_metadata: {
      source: "optimeraenergi.se",
      form: isPlatsbesok ? "Boka hembesök (webb)" : "Begär offert (webb)",
      funnel: funnelCfg?.slug ?? null,
      funnel_channel: funnelCfg?.channel ?? null,
      housing_type: lead.boende ?? null,
      services: lead.services,
      suggested_seller: seller,
      calc_config: lead.config ?? null,
      attribution: lead.attribution ?? null,
      slot: lead.slot ?? null,
    },
  };
}

/**
 * Infogar leadet i CRM-tabellen. No-op (ok:false) om env-variablerna
 * saknas, så bygget aldrig går sönder utan konfiguration.
 */
export async function insertWebsiteLead(
  lead: CrmLeadInput,
  seller: SellerHint,
): Promise<{ ok: boolean; id?: string; error?: string }> {
  const url = process.env.LEADS_SUPABASE_URL;
  const key = process.env.LEADS_SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return { ok: false, error: "LEADS_SUPABASE_* saknas" };

  const row = buildLeadRow(lead, seller);
  try {
    const res = await fetch(`${url.replace(/\/$/, "")}/rest/v1/leads`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify(row),
    });
    if (!res.ok) {
      const text = await res.text();
      return { ok: false, error: `${res.status} ${text.slice(0, 500)}` };
    }
    const data = (await res.json()) as Array<{ id?: string }>;
    return { ok: true, id: data?.[0]?.id };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "okänt fel",
    };
  }
}
