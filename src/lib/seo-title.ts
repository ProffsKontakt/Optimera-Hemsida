// Sidtitlar som håller sig inom 70 tecken.
//
// Layouten lägger till " · Optimera Energi" efter varje titel. Långa
// rubriker (nyheter, frågor) blir då 90–120 tecken, och sökmotorer och
// Promptwatch-granskningen klipper dem. seoTitle() behåller
// företagsnamnet när det får plats, skippar det annars och kortar riktigt
// långa rubriker vid första naturliga paus (?, punkt, tankstreck, kolon).
// Rubriken på sidan och i delningskort (og:title) är oförändrad.

const SUFFIX = " · Optimera Energi";
export const MAX_TITLE = 70;
const MIN_PIECE = 20;

/** Kortar en rubrik vid första naturliga paus som ger minst MIN_PIECE tecken. */
function shorten(title: string): string {
  // Meningsslut först, sedan tankstreck och kolon.
  const breaks: Array<[string, boolean]> = [
    ["? ", true],
    [". ", false],
    ["! ", true],
    [" – ", false],
    [": ", false],
  ];
  for (const [sep, keep] of breaks) {
    let i = title.indexOf(sep);
    while (i !== -1) {
      const piece = title.slice(0, keep ? i + 1 : i).trim();
      if (piece.length >= MIN_PIECE && piece.length <= MAX_TITLE) return piece;
      if (piece.length > MAX_TITLE) break;
      i = title.indexOf(sep, i + 1);
    }
  }
  // Ingen paus passar: klipp vid sista hela ordet.
  const cut = title.slice(0, MAX_TITLE - 1);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

/** Titel till Next-metadata: vanlig sträng (mallen lägger till företagsnamnet) eller absolut. */
export function seoTitle(title: string): string | { absolute: string } {
  if (title.length + SUFFIX.length <= MAX_TITLE) return title;
  if (title.length <= MAX_TITLE) return { absolute: title };
  const short = shorten(title);
  return short.length + SUFFIX.length <= MAX_TITLE ? short : { absolute: short };
}
