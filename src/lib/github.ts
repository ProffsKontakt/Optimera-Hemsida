/**
 * GitHub Contents API helper för att skriva/läsa filer direkt mot repo:t.
 * Används av press-CMS:en för att commita pressmeddelanden utan att
 * kräva manuell deploy.
 *
 * Env vars som krävs i Vercel:
 *   GITHUB_TOKEN  - fine-grained PAT med contents:write
 *   GITHUB_OWNER  - t.ex. "proffskontakt"
 *   GITHUB_REPO   - "Optimera-Hemsida" (repot bytte namn från
 *                   "klokatankar" i september 2026)
 *   GITHUB_BRANCH - "claude/kloka-tankar-el-website-yRTg7" (den gren
 *                   Vercel deployar produktion från)
 *
 * ghFetch nedan följer GitHubs 301 vid namnbyte, så CMS:et fungerar även
 * om GITHUB_REPO ligger kvar på ett gammalt namn.
 */

type GhConfig = {
  token: string;
  owner: string;
  repo: string;
  branch: string;
};

function getConfig(): GhConfig | null {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH;
  if (!token || !owner || !repo || !branch) return null;
  return { token, owner, repo, branch };
}

const API = "https://api.github.com";

/** owner/repo@branch – för felmeddelanden. Aldrig token. */
function describeConfig(): string {
  const owner = process.env.GITHUB_OWNER ?? "(saknas)";
  const repo = process.env.GITHUB_REPO ?? "(saknas)";
  const branch = process.env.GITHUB_BRANCH ?? "(saknas)";
  return `${owner}/${repo}@${branch}`;
}

/**
 * Anropar GitHub och FÖLJER en 301 själv.
 *
 * Bakgrund: repot bytte namn (klokatankar → Optimera-Hemsida), så GitHub
 * svarar 301 på det gamla namnet med Location till /repositories/{id}/...
 * Vi kan inte låta fetch följa den automatiskt (då blir PUT en GET och
 * bodyn tappas), men vi kan göra om anropet med SAMMA metod mot den nya
 * URL:en. Det gör CMS:et självläkande: det fungerar även om GITHUB_REPO
 * i Vercel ligger kvar på ett gammalt namn.
 */
async function ghFetch(url: string, init: RequestInit): Promise<Response> {
  const res = await fetch(url, { ...init, redirect: "manual" });
  if (![301, 302, 307, 308].includes(res.status)) return res;
  const location = res.headers.get("location");
  if (!location) return res;
  return fetch(location, { ...init, redirect: "manual" });
}

/**
 * Översätt GitHubs felstatusar till meddelanden som säger VAD man gör åt
 * saken. Bakgrund (team-CMS:ens 502:or 2026-09-07): ghPutFile kastade rå
 * statustext, routen svepte in den i ett generiskt "Kunde inte spara" och
 * admin såg bara en 502 — utan att veta om token gått ut, repot bytt namn
 * eller nätet strulat. Varje spar-väg (team, press, media) går genom den
 * här filen, så tolkningen görs EN gång här.
 */
function explainGitHubError(op: string, status: number, bodyText: string): Error {
  if (status === 401) {
    return new Error(
      `GitHub-token är ogiltig eller har GÅTT UT (401). Skapa en ny fine-grained PAT ` +
      `med Contents: Read and write på repot och uppdatera GITHUB_TOKEN i Vercel ` +
      `(Settings → Environment Variables) + redeploya. [${op}]`,
    );
  }
  if (status === 403) {
    return new Error(
      `GitHub-token saknar rättighet (403). Kontrollera att PAT:en har Contents: ` +
      `Read and write för just detta repo, och att den inte väntar på org-godkännande. [${op}] ${bodyText.slice(0, 200)}`,
    );
  }
  if (status === 404) {
    return new Error(
      `GitHub hittar inte repot/grenen (404) med konfigurationen ${describeConfig()}. ` +
      `Kontrollera GITHUB_OWNER/GITHUB_REPO/` +
      `GITHUB_BRANCH i Vercel — har repot bytt namn måste GITHUB_REPO uppdateras. ` +
      `(404 kan också betyda att token saknar åtkomst till ett privat repo.) [${op}]`,
    );
  }
  if (status === 409) {
    return new Error(
      `GitHub avvisade skrivningen (409, sha-konflikt) — någon annan sparade samtidigt. ` +
      `Ladda om sidan och spara igen. [${op}]`,
    );
  }
  return new Error(`GitHub ${op} ${status}: ${bodyText.slice(0, 300)}`);
}

function headers(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "Content-Type": "application/json",
  };
}

/**
 * Hämta en fil från repo:t. Returnerar sha + content (base64) eller null
 * om filen inte finns.
 */
export async function ghGetFile(
  path: string,
): Promise<{ sha: string; contentBase64: string } | null> {
  const cfg = getConfig();
  if (!cfg) throw new Error("GitHub env vars saknas");
  const url = `${API}/repos/${cfg.owner}/${cfg.repo}/contents/${encodeURIComponent(path)}?ref=${cfg.branch}`;
  const res = await ghFetch(url, { headers: headers(cfg.token), cache: "no-store" });
  if (res.status === 404) return null;
  if (!res.ok) throw explainGitHubError("ghGetFile", res.status, await res.text());
  const data = (await res.json()) as { sha: string; content: string };
  return { sha: data.sha, contentBase64: data.content };
}

/**
 * Skapa eller uppdatera en fil. Om sha skickas behandlas det som update,
 * annars create. Returnerar commit-info.
 */
export async function ghPutFile(input: {
  path: string;
  message: string;
  content: string;
  sha?: string;
}): Promise<{ commitSha: string; commitUrl: string }> {
  const cfg = getConfig();
  if (!cfg) throw new Error("GitHub env vars saknas");
  const url = `${API}/repos/${cfg.owner}/${cfg.repo}/contents/${encodeURIComponent(input.path)}`;
  const body = {
    message: input.message,
    content: Buffer.from(input.content, "utf-8").toString("base64"),
    branch: cfg.branch,
    ...(input.sha ? { sha: input.sha } : {}),
  };
  const res = await ghFetch(url, {
    method: "PUT",
    headers: headers(cfg.token),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw explainGitHubError("ghPutFile", res.status, await res.text());
  }
  const data = (await res.json()) as {
    commit: { sha: string; html_url: string };
  };
  return { commitSha: data.commit.sha, commitUrl: data.commit.html_url };
}

/**
 * Ta bort en fil. Kräver sha (GitHub Contents API safety).
 */
export async function ghDeleteFile(input: {
  path: string;
  message: string;
  sha: string;
}): Promise<{ commitSha: string }> {
  const cfg = getConfig();
  if (!cfg) throw new Error("GitHub env vars saknas");
  const url = `${API}/repos/${cfg.owner}/${cfg.repo}/contents/${encodeURIComponent(input.path)}`;
  const res = await ghFetch(url, {
    method: "DELETE",
    headers: headers(cfg.token),
    body: JSON.stringify({
      message: input.message,
      sha: input.sha,
      branch: cfg.branch,
    }),
  });
  if (!res.ok) {
    throw explainGitHubError("ghDeleteFile", res.status, await res.text());
  }
  const data = (await res.json()) as { commit: { sha: string } };
  return { commitSha: data.commit.sha };
}

export function isGitHubConfigured(): boolean {
  return !!getConfig();
}
