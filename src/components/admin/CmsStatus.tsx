import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { ghGetFile } from "@/lib/github";

/**
 * Live-status för CMS:ets skrivkedja (GitHub + Blob).
 *
 * Bakgrund: när GITHUB_TOKEN gick ut och repot bytte namn syntes det bara
 * som ett 502 djupt inne i ett sparförsök. Den här panelen gör ett riktigt
 * GET mot repot vid varje sidladdning, så fel upptäcks innan någon hinner
 * skriva en text som inte går att spara. Token-värden visas aldrig – bara
 * om de finns.
 */
export async function CmsStatus() {
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH;
  const hasToken = Boolean(process.env.GITHUB_TOKEN);
  const hasBlob = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

  let ok = false;
  let problem: string | null = null;
  if (!owner || !repo || !branch || !hasToken) {
    problem =
      "GitHub-env saknas: " +
      [
        !owner && "GITHUB_OWNER",
        !repo && "GITHUB_REPO",
        !branch && "GITHUB_BRANCH",
        !hasToken && "GITHUB_TOKEN",
      ]
        .filter(Boolean)
        .join(", ");
  } else {
    try {
      // team.json finns alltid i repot – bra kanariefågel för läs+auth.
      await ghGetFile("data/team.json");
      ok = true;
    } catch (err) {
      problem = err instanceof Error ? err.message : String(err);
    }
  }

  return (
    <div
      className={`mt-10 rounded-3xl border p-5 md:p-6 ${
        ok ? "border-moss/25 bg-moss/5" : "border-copper/40 bg-copper/10"
      }`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${
            ok ? "bg-moss text-bone" : "bg-copper text-bone"
          }`}
        >
          {ok ? <CheckCircle2 size={17} /> : <AlertTriangle size={17} />}
        </span>
        <div className="min-w-0 flex-1">
          <div className="font-display text-lg tracking-display-tight">
            {ok ? "Sparning fungerar" : "Sparning är trasig"}
          </div>
          {problem ? (
            <p className="mt-1 text-[13.5px] text-copper leading-relaxed">
              {problem}
            </p>
          ) : (
            <p className="mt-1 text-[13.5px] text-ink/60 leading-relaxed">
              Team, recensioner, press och bilder kan sparas och publiceras.
            </p>
          )}
          <dl className="mt-3 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[11px] text-ink/55">
            <div>
              repo:{" "}
              <span className="text-ink/80">
                {owner ?? "?"}/{repo ?? "?"}
              </span>
            </div>
            <div>
              gren: <span className="text-ink/80">{branch ?? "?"}</span>
            </div>
            <div>
              token:{" "}
              <span className="text-ink/80">{hasToken ? "satt" : "SAKNAS"}</span>
            </div>
            <div>
              bilduppladdning:{" "}
              <span className="text-ink/80">{hasBlob ? "satt" : "SAKNAS"}</span>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
