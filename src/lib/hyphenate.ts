import { hyphenateSync } from "hyphen/sv";

/**
 * Lägger in mjuka bindestreck (U+00AD) i långa svenska ord, enligt
 * svenska avstavningsmönster.
 *
 * Varför: sammansättningar som "statsministeromröstning" är bredare än en
 * telefonskärm i rubrikstorlek. CSS `hyphens: auto` kräver att webbläsaren
 * har en svensk ordlista – det har inte alla (t.ex. Chrome på dator), och
 * då bröts ordet mekaniskt som "statsministeromröstni / ng". Mjuka
 * bindestreck fungerar i alla webbläsare, syns bara där raden faktiskt
 * bryts och kostar ingen JavaScript hos läsaren (körs på servern).
 *
 * Bara ord på minst `minLength` tecken – vanliga ord berörs aldrig.
 * Används för synlig rubriktext; skicka aldrig resultatet till metadata
 * eller JSON-LD.
 */
export function softHyphenate(text: string, minLength = 16): string {
  return text.replace(new RegExp(`\\p{L}{${minLength},}`, "gu"), (word) =>
    hyphenateSync(word),
  );
}

/**
 * Håller ihop sifferintervall ("100–110", "176–173") med osynliga
 * ordbindare (U+2060) runt tankstrecket. Webbläsare får annars bryta
 * raden efter tankstrecket, och då står "100–" och "110 öre" på olika
 * rader – vanligt i elpris- och valrubriker.
 */
export function keepRangesTogether(text: string): string {
  return text.replace(/(\d)\s?([–-])\s?(?=\d)/g, "$1⁠$2⁠");
}

/**
 * Håller ihop tal med tusentalsavgränsare ("60 000") och tal med sin enhet
 * ("30 %", "4 kr", "11 kW") med hårda mellanslag (U+00A0). Annars kan en
 * smal skärm bryta "högst 60 / 000 kr" mitt i beloppet.
 */
export function keepNumbersTogether(text: string): string {
  return text
    .replace(/(\d) (?=\d{3}(?!\d))/g, "$1\u00A0")
    .replace(/(\d) (?=(?:%|kr|öre|kWh|kWp|kW|mil|år|A|°C)(?![\p{L}\d]))/gu, "$1\u00A0");
}

/** Synlig rubriktext: intervall hålls ihop, långa ord kan avstavas. */
export function formatHeadline(text: string, opts: { hyphenate?: boolean } = {}): string {
  const t = keepRangesTogether(text);
  return opts.hyphenate ? softHyphenate(t) : t;
}
