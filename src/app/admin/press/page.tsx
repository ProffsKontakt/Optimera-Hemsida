import Link from "next/link";
import { redirect } from "next/navigation";
import { Plus, ExternalLink, AlertCircle } from "lucide-react";
import { isAdminAuthed } from "@/lib/admin-auth";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { getAllPressReleases } from "@/lib/press";
import { isGitHubConfigured } from "@/lib/github";

export const metadata = {
  title: "Press · Admin",
  robots: { index: false, follow: false },
};

export default function AdminPressListPage({
  searchParams,
}: {
  searchParams?: { ok?: string; deleted?: string };
}) {
  if (!process.env.ADMIN_PASSWORD || !isAdminAuthed()) {
    redirect("/admin/login");
  }
  const releases = getAllPressReleases();
  const ghOk = isGitHubConfigured();

  return (
    <>
      <AdminTopbar />
      <div className="container-edge pt-10 pb-32">
        <div className="max-w-4xl">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55">
            Internt · pressmeddelanden
          </div>
          <h1 className="mt-3 font-display text-[44px] md:text-[64px] tracking-display-tight leading-[0.95]">
            Press.
          </h1>
          <p className="mt-4 text-ink/65 max-w-2xl leading-relaxed">
            Skriv, redigera och publicera pressmeddelanden. Varje publicering
            commitar en ny JSON-fil till repo:t som Vercel deployar inom 1-2
            minuter, sen är releasen live på{" "}
            <Link href="/press" className="underline">
              /press
            </Link>
            .
          </p>

          {!ghOk && (
            <div className="mt-8 rounded-2xl border border-copper/40 bg-copper/10 p-5 flex items-start gap-3 text-[14px]">
              <AlertCircle size={18} className="text-copper shrink-0 mt-0.5" />
              <div>
                <strong className="text-copper">GitHub-konfiguration saknas.</strong>{" "}
                Sätt GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO, GITHUB_BRANCH
                i Vercel innan du publicerar.
              </div>
            </div>
          )}

          {searchParams?.ok && (
            <div className="mt-8 rounded-2xl border border-moss/40 bg-moss/10 p-5 text-[14px] text-moss">
              Sparat. Vercel deployar nu, releasen är live inom ~1-2 minuter.
            </div>
          )}
          {searchParams?.deleted && (
            <div className="mt-8 rounded-2xl border border-ink/15 bg-cream/40 p-5 text-[14px] text-ink/70">
              Pressmeddelandet är borttaget.
            </div>
          )}

          <div className="mt-10 flex items-center justify-between gap-4">
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55">
              {releases.length} publicerade
            </div>
            <Link href="/admin/press/new" className="btn-primary">
              <Plus size={16} /> Nytt pressmeddelande
            </Link>
          </div>

          <div className="mt-6 space-y-3">
            {releases.length === 0 ? (
              <div className="rounded-3xl border border-ink/10 bg-cream/40 p-10 text-center">
                <p className="text-ink/70 leading-relaxed">
                  Inga pressmeddelanden än. Tryck på &ldquo;Nytt
                  pressmeddelande&rdquo; ovan för att publicera det första.
                </p>
              </div>
            ) : (
              releases.map((r) => (
                <article
                  key={r.slug}
                  className="rounded-3xl border border-ink/10 bg-bone p-6 md:p-7 flex flex-col md:flex-row md:items-center gap-4 md:gap-6"
                >
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/55 shrink-0 md:w-28">
                    {r.date}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-xl tracking-display-tight leading-snug">
                      {r.title}
                    </h3>
                    <div className="mt-1 font-mono text-[11px] text-ink/45">
                      /press/{r.slug}
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Link
                      href={`/press/${r.slug}`}
                      target="_blank"
                      className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-4 py-2 text-[13px] hover:border-ink/40 transition"
                    >
                      Förhandsgranska <ExternalLink size={12} />
                    </Link>
                    <Link
                      href={`/admin/press/${r.slug}/edit`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-ink text-bone px-4 py-2 text-[13px] hover:bg-graphite transition"
                    >
                      Redigera
                    </Link>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
