import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { isAdminAuthed } from "@/lib/admin-auth";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { FUNNELS } from "@/lib/funnels";

export const metadata = {
  title: "Funnel-statistik · Admin",
  robots: { index: false, follow: false },
};

// Auth + färsk data per request.
export const dynamic = "force-dynamic";

type LeadRow = {
  inserted_at: string;
  leadsource: string | null;
  is_platsbesok: boolean;
  contact_name: string | null;
  close_metadata: { funnel?: string | null; funnel_channel?: string | null } | null;
};

/**
 * Hämtar webb-leads (leadsource Hemsida*) direkt från CRM-databasen
 * (Optimera Hub / Supabase) med samma server-nycklar som /api/offert
 * använder för att skriva. Läses server-side, exponeras aldrig mot klient.
 */
async function fetchWebLeads(): Promise<LeadRow[] | null> {
  const url = process.env.LEADS_SUPABASE_URL;
  const key = process.env.LEADS_SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  const since = new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString();
  const qs = new URLSearchParams({
    select: "inserted_at,leadsource,is_platsbesok,contact_name,close_metadata",
    leadsource: "like.Hemsida*",
    inserted_at: `gte.${since}`,
    order: "inserted_at.desc",
    limit: "1000",
  });
  try {
    const res = await fetch(`${url.replace(/\/$/, "")}/rest/v1/leads?${qs}`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    return (await res.json()) as LeadRow[];
  } catch {
    return null;
  }
}

function variantOf(row: LeadRow): string {
  return row.close_metadata?.funnel ?? "offert (standard)";
}

export default async function AdminFunnelPage() {
  if (!process.env.ADMIN_PASSWORD || !isAdminAuthed()) {
    redirect("/admin/login");
  }
  const leads = await fetchWebLeads();

  const now = Date.now();
  const d7 = now - 7 * 24 * 3600 * 1000;
  const d1 = now - 24 * 3600 * 1000;

  // Alla kända varianter + standard-/offert-flödet, även utan leads än.
  const variants = [
    ...FUNNELS.map((f) => ({
      key: f.slug,
      label: `/${f.slug}`,
      channel: f.channel,
      leadsource: f.leadsource,
    })),
    {
      key: "offert (standard)",
      label: "/offert",
      channel: "Organiskt/övrigt",
      leadsource: "Hemsida",
    },
  ];

  const rows = variants.map((v) => {
    const mine = (leads ?? []).filter((l) => variantOf(l) === v.key);
    return {
      ...v,
      total30: mine.length,
      total7: mine.filter((l) => new Date(l.inserted_at).getTime() > d7).length,
      total1: mine.filter((l) => new Date(l.inserted_at).getTime() > d1).length,
      platsbesok: mine.filter((l) => l.is_platsbesok).length,
      latest: mine[0]?.inserted_at ?? null,
    };
  });

  const recent = (leads ?? []).slice(0, 15);

  return (
    <>
      <AdminTopbar />
      <div className="container-edge pt-10 pb-32">
        <div className="max-w-5xl">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-[13.5px] text-ink/60 hover:text-ink transition"
          >
            <ArrowLeft size={14} /> Admin
          </Link>
          <h1 className="mt-4 font-display text-[44px] md:text-[64px] tracking-display-tight leading-[0.95]">
            Funnel-statistik.
          </h1>
          <p className="mt-4 text-ink/65 max-w-2xl leading-relaxed">
            Leads per kanal-variant de senaste 30 dagarna, direkt från Optimera
            Hub. Dela variant-URL:erna i respektive kanal (annonslänken pekar
            på t.ex. optimeraenergi.se/offert-fb). Steg-för-steg-avhopp finns i
            GA4 under eventet <code className="font-mono text-[13px]">funnel_step_view</code>.
          </p>

          {leads === null && (
            <div className="mt-8 rounded-2xl border border-copper/40 bg-copper/10 px-5 py-4 text-[14px] text-copper max-w-2xl">
              Kunde inte läsa från CRM-databasen. Kontrollera att
              LEADS_SUPABASE_URL och LEADS_SUPABASE_SERVICE_ROLE_KEY är satta i
              Vercel.
            </div>
          )}

          <div className="mt-10 overflow-x-auto rounded-3xl border border-ink/10">
            <table className="w-full min-w-[640px] text-[14px]">
              <thead>
                <tr className="bg-cream/60 text-left font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink/55">
                  <th className="px-5 py-3.5">Variant</th>
                  <th className="px-4 py-3.5">Kanal</th>
                  <th className="px-4 py-3.5 text-right">Idag</th>
                  <th className="px-4 py-3.5 text-right">7 dgr</th>
                  <th className="px-4 py-3.5 text-right">30 dgr</th>
                  <th className="px-4 py-3.5 text-right">Platsbesök</th>
                  <th className="px-5 py-3.5">Senaste lead</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/8">
                {rows.map((r) => (
                  <tr key={r.key}>
                    <td className="px-5 py-3.5">
                      <a
                        href={r.label}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-[13px] text-indigo hover:underline"
                      >
                        {r.label} <ExternalLink size={12} />
                      </a>
                    </td>
                    <td className="px-4 py-3.5 text-ink/70">{r.channel}</td>
                    <td className="px-4 py-3.5 text-right">{r.total1}</td>
                    <td className="px-4 py-3.5 text-right">{r.total7}</td>
                    <td className="px-4 py-3.5 text-right font-medium">{r.total30}</td>
                    <td className="px-4 py-3.5 text-right text-ink/70">{r.platsbesok}</td>
                    <td className="px-5 py-3.5 text-ink/60 text-[13px]">
                      {r.latest
                        ? new Date(r.latest).toLocaleString("sv-SE", {
                            timeZone: "Europe/Stockholm",
                            dateStyle: "short",
                            timeStyle: "short",
                          })
                        : "–"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="mt-14 font-display text-2xl tracking-display-tight">
            Senaste webb-leads
          </h2>
          <div className="mt-4 overflow-x-auto rounded-3xl border border-ink/10">
            <table className="w-full min-w-[560px] text-[14px]">
              <thead>
                <tr className="bg-cream/60 text-left font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink/55">
                  <th className="px-5 py-3.5">Tid</th>
                  <th className="px-4 py-3.5">Namn</th>
                  <th className="px-4 py-3.5">Leadkälla</th>
                  <th className="px-5 py-3.5">Variant</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/8">
                {recent.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-5 py-6 text-ink/50">
                      Inga webb-leads de senaste 30 dagarna ännu.
                    </td>
                  </tr>
                )}
                {recent.map((l, i) => (
                  <tr key={i}>
                    <td className="px-5 py-3 text-ink/60 text-[13px]">
                      {new Date(l.inserted_at).toLocaleString("sv-SE", {
                        timeZone: "Europe/Stockholm",
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </td>
                    <td className="px-4 py-3">{l.contact_name ?? "–"}</td>
                    <td className="px-4 py-3 text-ink/70">{l.leadsource}</td>
                    <td className="px-5 py-3 font-mono text-[12.5px] text-ink/60">
                      {variantOf(l)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-8 text-[13px] text-ink/50 max-w-2xl leading-relaxed">
            Produktfoton till funnel-korten laddas upp under{" "}
            <Link href="/admin/media" className="underline">
              Media
            </Link>{" "}
            (grupp &quot;Offert-funnel&quot;). Ny kanal? Lägg till en rad i
            src/lib/funnels.ts så skapas URL, spårning och CRM-mappning
            automatiskt.
          </p>
        </div>
      </div>
    </>
  );
}
