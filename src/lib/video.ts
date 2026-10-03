/**
 * Tolkar en video-URL från media-CMS:en (t.ex. grundarfilmen på /om-oss).
 *
 * Tre källor stöds:
 *  - "file":    egen uppladdad fil (Vercel Blob) eller annan direktlänk till
 *               .mp4/.webm/.mov. Förstahandsvalet: ingen tredjepart, inga
 *               cookies, inget samtycke behövs.
 *  - "youtube": youtube.com/watch?v=…, youtu.be/…, /shorts/…, /embed/…
 *  - "vimeo":   vimeo.com/123, vimeo.com/123/hash (olistad),
 *               player.vimeo.com/video/123?h=hash
 *
 * Används både av admin-API:t (validering innan något sparas) och av den
 * publika spelaren, så en länk som godkänns i admin går alltid att spela.
 * Ingen fs-import: körs även i klienten.
 */
export type ParsedVideo =
  | { kind: "file"; src: string }
  | { kind: "youtube"; id: string; embed: string; watch: string }
  | { kind: "vimeo"; id: string; embed: string; watch: string };

const FILE_EXT = /\.(mp4|m4v|webm|mov)$/i;

export function parseVideoUrl(raw: string | null | undefined): ParsedVideo | null {
  if (!raw) return null;
  let u: URL;
  try {
    u = new URL(raw.trim());
  } catch {
    return null;
  }
  if (u.protocol !== "https:") return null;
  const host = u.hostname.replace(/^www\./, "").replace(/^m\./, "");

  if (host === "youtube.com" || host === "youtube-nocookie.com" || host === "youtu.be") {
    let id: string | null = null;
    if (host === "youtu.be") id = u.pathname.slice(1).split("/")[0];
    else if (u.pathname === "/watch") id = u.searchParams.get("v");
    else {
      const m = u.pathname.match(/^\/(?:shorts|embed|live)\/([^/?#]+)/);
      if (m) id = m[1];
    }
    if (!id || !/^[A-Za-z0-9_-]{6,20}$/.test(id)) return null;
    return {
      kind: "youtube",
      id,
      // nocookie-domänen + rel=0: inga "fler videor"-förslag från andra
      // kanaler när filmen är slut.
      embed: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`,
      watch: `https://www.youtube.com/watch?v=${id}`,
    };
  }

  if (host === "vimeo.com" || host === "player.vimeo.com") {
    const m = u.pathname.match(/^\/(?:video\/)?(\d{5,12})(?:\/([0-9a-f]{6,20}))?/);
    if (!m) return null;
    const id = m[1];
    const hash = m[2] ?? u.searchParams.get("h") ?? "";
    const h = /^[0-9a-f]{6,20}$/.test(hash) ? hash : "";
    return {
      kind: "vimeo",
      id,
      // dnt=1: Vimeo spårar inte tittaren.
      embed: `https://player.vimeo.com/video/${id}?autoplay=1&dnt=1${h ? `&h=${h}` : ""}`,
      watch: `https://vimeo.com/${id}${h ? `/${h}` : ""}`,
    };
  }

  if (FILE_EXT.test(u.pathname)) return { kind: "file", src: u.toString() };
  return null;
}

/** Ligger URL:en i vår egen Vercel Blob-butik (dvs. något vi får radera)? */
export function isOwnBlobUrl(raw: string | undefined): raw is string {
  if (!raw) return false;
  try {
    return new URL(raw).hostname.endsWith(".blob.vercel-storage.com");
  } catch {
    return false;
  }
}
