import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthed } from "@/lib/admin-auth";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { CmsStatus } from "@/components/admin/CmsStatus";
import { LightbulbIcon, Briefcase, Newspaper, ArrowRight, ImageIcon, FlaskConical, BarChart3, Users, MessageSquareQuote } from "lucide-react";

// Statuspanelen gör ett live-anrop mot GitHub – får inte cachas.
export const dynamic = "force-dynamic";

export default async function AdminHome() {
  if (!process.env.ADMIN_PASSWORD || !isAdminAuthed()) {
    redirect("/admin/login");
  }
  return (
    <>
      <AdminTopbar />
      <div className="container-edge pt-12 pb-32">
        <div className="max-w-3xl">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55">
            Internt · Optimera Energi
          </div>
          <h1 className="mt-4 font-display text-[48px] md:text-[72px] tracking-display-tight leading-[0.95]">
            Bakom kulisserna.
          </h1>
          <p className="mt-5 text-ink/65 max-w-xl leading-relaxed">
            Verktyg som bara teamet ser. Just nu finns Idé-hörnan – en
            samlingsplats för förslag som rör allt från säljarbete till hur
            CRM:et byggs ut.
          </p>
          <div className="max-w-3xl">
            <CmsStatus />
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl">
          <Card
            href="/admin/funnel"
            icon={<BarChart3 size={20} />}
            label="Funnel-statistik"
            body="Leads per kanal-variant (/offert-fb, /offert-ig, /offert-hemsol …) direkt från Optimera Hub. Jämför kanalerna och se senaste webb-leads."
          />
          <Card
            href="/admin/press"
            icon={<Newspaper size={20} />}
            label="Press"
            body="Skriv, redigera och publicera pressmeddelanden. Varje publicering commitar till repo:t och deployar inom 1-2 minuter."
          />
          <Card
            href="/admin/recensioner"
            icon={<MessageSquareQuote size={20} />}
            label="Recensioner"
            body="Kuratera vilka Reco-recensioner som visas på startsidan: klistra in, växla Visas/Dold, ändra ordning."
          />
          <Card
            href="/admin/team"
            icon={<Users size={20} />}
            label="Team"
            body="Redigera vilka som visas på om-oss: namn, roller, kontaktuppgifter, bio och ordning. Foton laddas upp under Media."
          />
          <Card
            href="/admin/media"
            icon={<ImageIcon size={20} />}
            label="Media / bilder"
            body="Välj vilken bild som ligger var (team-foton, guide-hero). Laddas upp till Vercel Blob och committas, live efter deploy."
          />
          <Card
            href="/admin/ideer"
            icon={<LightbulbIcon size={20} />}
            label="Idé-hörnan"
            body="Plocka in idéer för försäljning, CRM, drift, marknad. Kategorisera, status­märk och skicka vidare till KT Central."
          />
          <Card
            href="/admin/demo"
            icon={<FlaskConical size={20} />}
            label="Demo / sandlåda"
            body="Testa och visa varianter av sidor internt (t.ex. en avskalad landningssida) utan att röra den publika sajten."
          />
          <Card
            href="/studio"
            icon={<Briefcase size={20} />}
            label="Higgsfield-studion"
            body="Generera marknadsfilm med curerade promptar för Optimera Energis visuella språk."
          />
        </div>
      </div>
    </>
  );
}

function Card({
  href,
  icon,
  label,
  body,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  body: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-3xl border border-ink/10 bg-bone p-7 hover:border-ink/40 transition flex flex-col gap-3"
    >
      <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-bone">
        {icon}
      </span>
      <h2 className="font-display text-2xl tracking-display-tight mt-2">
        {label}
      </h2>
      <p className="text-[14.5px] text-ink/65 leading-relaxed">{body}</p>
      <span className="mt-auto inline-flex items-center gap-1 text-[13px] text-ink/70 group-hover:text-ink">
        Öppna <ArrowRight size={13} />
      </span>
    </Link>
  );
}
