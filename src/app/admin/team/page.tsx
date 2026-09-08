import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, ArrowRight, ImageIcon } from "lucide-react";
import { isAdminAuthed } from "@/lib/admin-auth";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { TeamManager } from "@/components/admin/TeamManager";
import { getTeam } from "@/lib/team";
import { getMedia } from "@/lib/media";

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
  const team = getTeam();
  // Foto-status så knappen säger något konkret: vilka saknar porträtt?
  const missing = team.filter((m) => !getMedia(`team:${m.id}`));
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
            committas och är live efter deploy (1–2 min).
          </p>

          {/* Foto-genväg: varje teammedlem får en egen bild-slot automatiskt,
              och uppladdningen komprimerar till webbstandard åt en. */}
          <div className="mt-7 rounded-3xl border border-ink/10 bg-cream/50 p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-indigo text-bone">
              <ImageIcon size={19} />
            </span>
            <div className="flex-1">
              <div className="font-display text-lg tracking-display-tight">
                Ladda upp porträtt
              </div>
              <p className="mt-1 text-[13.5px] text-ink/60 leading-relaxed">
                {missing.length === 0
                  ? `Alla ${team.length} i teamet har porträtt. `
                  : `${missing.length} av ${team.length} saknar porträtt (${missing
                      .map((m) => m.name.split(" ")[0])
                      .join(", ")}). `}
                Bilderna skalas ned och sparas som WebP automatiskt – ladda
                bara upp originalet rakt av.
              </p>
            </div>
            <Link
              href="/admin/media"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-[13.5px] font-medium text-bone hover:bg-graphite transition self-start md:self-auto"
            >
              Öppna bilduppladdning <ArrowRight size={15} />
            </Link>
          </div>

          <TeamManager initial={team} />
        </div>
      </div>
    </>
  );
}
