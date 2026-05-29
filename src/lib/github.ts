/**
 * GitHub Contents API helper för att skriva/läsa filer direkt mot repo:t.
 * Används av press-CMS:en för att commita pressmeddelanden utan att
 * kräva manuell deploy.
 *
 * Env vars som krävs i Vercel:
 *   GITHUB_TOKEN  - fine-grained PAT med contents:write
 *   GITHUB_OWNER  - t.ex. "proffskontakt"
 *   GITHUB_REPO   - t.ex. "klokatankar"
 *   GITHUB_BRANCH - t.ex. "main" eller feature-branch
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
  const res = await fetch(url, { headers: headers(cfg.token), cache: "no-store" });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub ghGetFile ${res.status}: ${await res.text()}`);
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
  const res = await fetch(url, {
    method: "PUT",
    headers: headers(cfg.token),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`GitHub ghPutFile ${res.status}: ${await res.text()}`);
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
  const res = await fetch(url, {
    method: "DELETE",
    headers: headers(cfg.token),
    body: JSON.stringify({
      message: input.message,
      sha: input.sha,
      branch: cfg.branch,
    }),
  });
  if (!res.ok) {
    throw new Error(`GitHub ghDeleteFile ${res.status}: ${await res.text()}`);
  }
  const data = (await res.json()) as { commit: { sha: string } };
  return { commitSha: data.commit.sha };
}

export function isGitHubConfigured(): boolean {
  return !!getConfig();
}
