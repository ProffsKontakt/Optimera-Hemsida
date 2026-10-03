/**
 * Kvalitetskontroll för "Läget i korthet" (tldr) i nyhetsartiklarna –
 * redaktionsregel 6 i news-content.ts. Rutorna står direkt under ingressen,
 * så en punkt som upprepar ingressen eller är ett helt stycke lång gör
 * sammanfattningen tyngre att läsa än själva artikeln.
 *
 * Används av `npm run check:news` (rutinen kör den före publicering) och
 * varnar i byggloggen. Varnar, stoppar aldrig bygget: en publicering ska
 * inte blockeras av en för lång punkt.
 *
 * Ingen import här – filen körs direkt av Node i check-skriptet.
 */

/** Regeln gäller artiklar publicerade från och med detta datum. */
export const TLDR_RULE_FROM = "2026-10-03";
export const TLDR_MAX_CHARS = 220;
export const TLDR_MAX_SENTENCES = 2;
/** Max andel av punktens ord (4+ bokstäver) som också står i ingressen. */
export const TLDR_MAX_OVERLAP = 0.4;

const words = (s: string) => new Set(s.toLowerCase().match(/\p{L}{4,}/gu) ?? []);

/** Meningsgräns: punkt/frågetecken/utropstecken följt av versal eller siffra. */
const sentenceCount = (s: string) => s.trim().split(/(?<=[.!?])\s+(?=[A-ZÅÄÖ0-9])/).length;

export function tldrIssues(excerpt: string, tldr: string[]): string[] {
  const ex = words(excerpt);
  const issues: string[] = [];
  tldr.forEach((t, i) => {
    const n = `Punkt ${i + 1}`;
    if (t.length > TLDR_MAX_CHARS) issues.push(`${n} är ${t.length} tecken (max ${TLDR_MAX_CHARS}).`);
    const s = sentenceCount(t);
    if (s > TLDR_MAX_SENTENCES) issues.push(`${n} har ${s} meningar (max ${TLDR_MAX_SENTENCES}).`);
    const w = words(t);
    const overlap = w.size ? [...w].filter((x) => ex.has(x)).length / w.size : 0;
    if (overlap > TLDR_MAX_OVERLAP)
      issues.push(`${n} upprepar ingressen (${Math.round(overlap * 100)} % av orden står redan där).`);
  });
  if (tldr.length !== 3) issues.push(`${tldr.length} punkter (ska vara 3).`);
  return issues;
}

export function newsTldrReport(
  articles: { slug: string; excerpt: string; publishedAt: string }[],
  getContent: (slug: string) => { tldr: string[] } | undefined,
): { slug: string; issues: string[] }[] {
  return articles
    .filter((a) => a.publishedAt >= TLDR_RULE_FROM)
    .map((a) => ({ slug: a.slug, issues: tldrIssues(a.excerpt, getContent(a.slug)?.tldr ?? []) }))
    .filter((r) => r.issues.length > 0);
}
