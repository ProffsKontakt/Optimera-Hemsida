import { redirect } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { isAdminAuthed } from "@/lib/admin-auth";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { isGitHubConfigured } from "@/lib/github";
import { listMediaSlots, getMediaManifest } from "@/lib/media";
import { MediaManager } from "@/components/admin/MediaManager";

export const metadata = {
  title: "Media · Admin",
  robots: { index: false, follow: false },
};

export default function AdminMediaPage() {
  if (!process.env.ADMIN_PASSWORD || !isAdminAuthed()) {
    redirect("/admin/login");
  }
  const slots = listMediaSlots();
  const manifest = getMediaManifest();
  const ghOk = isGitHubConfigured();
  const blobOk = !!process.env.BLOB_READ_WRITE_TOKEN;

  return (
    <>
      <AdminTopbar />
      <div className="container-edge pt-10 pb-32">
        <div className="max-w-4xl">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55">
            Internt · bilder
          </div>
          <h1 className="mt-3 font-display text-[44px] md:text-[64px] tracking-display-tight leading-[0.95]">
            Media.
          </h1>
          <p className="mt-4 text-ink/65 max-w-2xl leading-relaxed">
            Välj vilken bild som ligger var. Bilden laddas upp till Vercel Blob
            (CDN) och valet committas till repo:t som Vercel deployar inom 1-2
            minuter. Lämna en slot tom så används nuvarande utseende (t.ex.
            färggradient för team).
          </p>

          {(!ghOk || !blobOk) && (
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-500/30 bg-amber-50/60 p-4 text-[14px] text-ink/75">
              <AlertCircle size={18} className="mt-0.5 shrink-0 text-amber-600" />
              <div>
                <strong>Konfiguration saknas:</strong>
                <ul className="mt-1 list-disc pl-5 space-y-0.5">
                  {!blobOk && (
                    <li>
                      Vercel Blob är inte kopplat. Skapa en Blob-store i Vercel
                      (Storage → Create → Blob) – den sätter{" "}
                      <code>BLOB_READ_WRITE_TOKEN</code> automatiskt.
                    </li>
                  )}
                  {!ghOk && <li>GitHub-token saknas (för att spara valet).</li>}
                </ul>
                Uppladdning är avstängd tills detta är på plats.
              </div>
            </div>
          )}

          <MediaManager slots={slots} initial={manifest} />
        </div>
      </div>
    </>
  );
}
