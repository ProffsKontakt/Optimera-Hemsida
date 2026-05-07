import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthed } from "@/lib/admin-auth";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { LightbulbIcon, Briefcase, ArrowRight } from "lucide-react";

export default function AdminHome() {
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
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl">
          <Card
            href="/admin/ideer"
            icon={<LightbulbIcon size={20} />}
            label="Idé-hörnan"
            body="Plocka in idéer för försäljning, CRM, drift, marknad. Kategorisera, status­märk och skicka vidare till KT Central."
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
