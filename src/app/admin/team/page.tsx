import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { isAdminAuthed } from "@/lib/admin-auth";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { TeamManager } from "@/components/admin/TeamManager";
import { getTeam } from "@/lib/team";

export const metadata = {
  title: "Team · Admin",
  robots: { index: false, follow: false },
};

// Auth-gate per request + färsk teamdata.
export const dynamic = "force-dynamic";

export default function AdminTeamPage() {
  if (!process.env.ADMIN_PASSWORD || !isAdminAuthed()) {
    redirect("/admin/login");
  }
  return (
    <>
      <AdminTopbar />
      <div className="container-edge pt-10 pb-32">
        <div className="max-w-3xl">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-[13.5px] text-ink/60 hover:text-ink transition"
          >
            <ArrowLeft size={14} /> Admin
          </Link>
          <h1 className="mt-4 font-display text-[44px] md:text-[64px] tracking-display-tight leading-[0.95]">
            Teamet.
          </h1>
          <p className="mt-4 text-ink/65 max-w-2xl leading-relaxed">
            Redigera vilka som visas på{" "}
            <Link href="/om-oss" className="underline">
              /om-oss
            </Link>
            : namn, roll, kontaktuppgifter, bio och ordning. Ändringar
            committas och är live efter deploy (1–2 min). Foton laddas upp
            under{" "}
            <Link href="/admin/media" className="underline">
              Media
            </Link>{" "}
            – varje medlem får en egen foto-slot där automatiskt.
          </p>
          <TeamManager initial={getTeam()} />
        </div>
      </div>
    </>
  );
}
