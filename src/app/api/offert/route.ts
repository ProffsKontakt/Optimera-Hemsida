import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { z } from "zod";
import { assignSeller } from "@/lib/sellers";
import { insertWebsiteLead } from "@/lib/leads-crm";

const SlotSchema = z.object({
  date: z.string(),
  time: z.string(),
  dateLabel: z.string(),
  weekday: z.string(),
});

const Schema = z
  .object({
    namn: z.string().min(2),
    // Telefonnummer: 7–15 siffror, valfritt +, mellanslag/bindestreck/
    // parenteser tillåtna. Speglar formulärets pattern så fritext (t.ex.
    // ett efternamn) avvisas även om klient-valideringen kringgås.
    telefon: z
      .string()
      .trim()
      .regex(/^\+?[\d\s().-]{5,25}$/, "ogiltigt telefonnummer")
      .refine(
        (v) => {
          const digits = v.replace(/\D/g, "").length;
          return digits >= 7 && digits <= 15;
        },
        { message: "ogiltigt telefonnummer" },
      ),
    epost: z.string().email(),
    adress: z.string().optional(),
    meddelande: z.string().optional(),
    boende: z.string().optional(),
    contactMethod: z.enum(["hembesok", "telefon"]).default("hembesok"),
    slot: SlotSchema.nullable().optional(),
    services: z.array(z.string()).default([]),
    // Vilken funnel-variant (t.ex. "offert-fb") leadet kom ifrån. Styr
    // leadsource i CRM:et så kanalerna kan jämföras. Se src/lib/funnels.ts.
    funnel: z.string().optional(),
    config: z.record(z.any()).optional(),
    // Annons-attribution för closed-loop. Vidarebefordras till CRM-webhooken
    // så Sentinel HQ kan rapportera affärer tillbaka till Google Ads/GA4.
    attribution: z
      .object({
        gclid: z.string().optional(),
        gbraid: z.string().optional(),
        wbraid: z.string().optional(),
        utmSource: z.string().optional(),
        utmMedium: z.string().optional(),
        utmCampaign: z.string().optional(),
        utmTerm: z.string().optional(),
        utmContent: z.string().optional(),
        gaClientId: z.string().optional(),
        landingPage: z.string().optional(),
        referrer: z.string().optional(),
        firstSeen: z.string().optional(),
      })
      .partial()
      .optional(),
  })
  .refine(
    (d) => d.contactMethod !== "hembesok" || !!d.slot,
    { message: "slot krävs för hembesök", path: ["slot"] },
  );

type Lead = z.infer<typeof Schema>;

const KT_CENTRAL_INTERNAL = "julian@proffskontakt.se";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const parsed = Schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "validation", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const lead = parsed.data;
  const seller = assignSeller({
    services: lead.services,
    address: lead.adress,
    slot: lead.slot,
  });

  const customerInbox =
    process.env.QUOTE_RECIPIENT_EMAIL ?? "hej@optimeraenergi.se";

  // Logg för utvecklingsmiljön
  // eslint-disable-next-line no-console
  console.log("[offert]", {
    timestamp: new Date().toISOString(),
    seller,
    lead,
  });

  // 0) Primär destination: CRM-databasen (Supabase "closer-offert-kalkyl",
  //    public.leads). Leadkälla "Hemsida" / "Hemsida (Platsbesök)". Skapar
  //    automatiskt kontakt + deal via DB-triggers. No-op om env saknas.
  const crm = await insertWebsiteLead(lead, seller);
  if (crm.ok) {
    // eslint-disable-next-line no-console
    console.log("[offert] CRM-lead skapad", crm.id);
  } else {
    // eslint-disable-next-line no-console
    console.error("[offert] CRM-insert misslyckades:", crm.error);
  }

  // 1) Skicka till KT Central (CRM-webhook). Stödjer alla webhook-format
  //    – vi POST:ar JSON och låter KT Central plocka isär.
  if (process.env.KT_CENTRAL_WEBHOOK_URL) {
    const payload = JSON.stringify({
      source: "optimeraenergi.se",
      receivedAt: new Date().toISOString(),
      assignedSeller: seller,
      lead,
    });
    // HMAC-signera så Sentinel HQ kan verifiera att leadet kommer från oss
    // (skydd mot förfalskade leads). Samma schema som /api/conversions.
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(process.env.KT_CENTRAL_WEBHOOK_TOKEN
        ? { Authorization: `Bearer ${process.env.KT_CENTRAL_WEBHOOK_TOKEN}` }
        : {}),
    };
    if (process.env.KT_CENTRAL_WEBHOOK_SECRET) {
      const ts = Date.now().toString();
      const sig = crypto
        .createHmac("sha256", process.env.KT_CENTRAL_WEBHOOK_SECRET)
        .update(`${ts}.${payload}`)
        .digest("hex");
      headers["X-OE-Timestamp"] = ts;
      headers["X-OE-Signature"] = `sha256=${sig}`;
    }
    try {
      await fetch(process.env.KT_CENTRAL_WEBHOOK_URL, {
        method: "POST",
        headers,
        body: payload,
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("[offert] KT Central webhook failed", err);
    }
  }

  // 2) Mail till Julian (intern notifikation) + intern offertinkorg
  if (process.env.RESEND_API_KEY) {
    const recipients = Array.from(
      new Set([KT_CENTRAL_INTERNAL, customerInbox, seller.email].filter(Boolean)),
    ) as string[];
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Optimera <hej@optimeraenergi.se>",
          to: recipients,
          reply_to: lead.epost,
          subject:
            lead.contactMethod === "hembesok" && lead.slot
              ? `Nytt lead – ${lead.namn} (${lead.slot.weekday} ${lead.slot.dateLabel} kl ${lead.slot.time})`
              : `Nytt lead – ${lead.namn} (telefonkontakt)`,
          text: formatPlain(lead, seller),
        }),
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("[offert] Resend failed", err);
    }

    // 3) Bekräftelse till kunden
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Optimera <hej@optimeraenergi.se>",
          to: [lead.epost],
          subject: "Tack – vi ses snart",
          text: formatCustomer(lead, seller),
        }),
      });
    } catch {
      /* noop */
    }
  }

  return NextResponse.json({ ok: true, seller: seller.name });
}

function formatPlain(d: Lead, seller: { name: string; email?: string }) {
  const contactLine =
    d.contactMethod === "hembesok" && d.slot
      ? `Bokat besök: ${d.slot.weekday} ${d.slot.dateLabel} kl ${d.slot.time}`
      : "Önskar telefonkontakt – ring upp under nästa vardag.";
  return [
    `Namn:      ${d.namn}`,
    `Telefon:   ${d.telefon}`,
    `E-post:    ${d.epost}`,
    `Adress:    ${d.adress ?? "-"}`,
    `Boende:    ${d.boende ?? "-"}`,
    "",
    contactLine,
    `Tilldelad säljare: ${seller.name}${seller.email ? ` <${seller.email}>` : ""}`,
    `Tjänster: ${d.services.join(", ") || "-"}`,
    "",
    "Konfiguration från kalkylatorn:",
    JSON.stringify(d.config ?? {}, null, 2),
    "",
    "Attribution (för closed-loop / offline conversions):",
    formatAttribution(d.attribution),
    "",
    "Meddelande från kunden:",
    d.meddelande ?? "-",
  ].join("\n");
}

function formatAttribution(a: Lead["attribution"]): string {
  if (!a || Object.keys(a).length === 0) return "  (ingen – troligen organisk/direkt)";
  const line = (label: string, v?: string) => (v ? `  ${label}: ${v}` : null);
  return [
    line("gclid", a.gclid),
    line("gbraid", a.gbraid),
    line("wbraid", a.wbraid),
    line("GA4 client_id", a.gaClientId),
    line("utm_source", a.utmSource),
    line("utm_medium", a.utmMedium),
    line("utm_campaign", a.utmCampaign),
    line("utm_term", a.utmTerm),
    line("utm_content", a.utmContent),
    line("landningssida", a.landingPage),
    line("referrer", a.referrer),
    line("första besök", a.firstSeen),
  ]
    .filter(Boolean)
    .join("\n") || "  (ingen – troligen organisk/direkt)";
}

function formatCustomer(d: Lead, seller: { name: string }) {
  const middleLine =
    d.contactMethod === "hembesok" && d.slot
      ? `Tack för din förfrågan! Vi har bokat in besöket ${d.slot.weekday} ${d.slot.dateLabel} kl ${d.slot.time}.\n${seller.name} kommer förbi och ringer dagen innan för att stämma av.`
      : `Tack för din förfrågan! ${seller.name} ringer upp dig under nästa vardag så stämmer vi av vad du funderar på.`;
  return [
    `Hej ${d.namn.split(" ")[0]},`,
    "",
    middleLine,
    "",
    "Vi tar med kanelbullar och inmätningsutrustning. Säg till om du är allergisk så fixar vi något annat.",
    "",
    "Hälsningar,",
    "Optimera",
  ].join("\n");
}
