/**
 * Typer för kunskapsbankens två databaser: Solcellsfrågor (en sida per
 * fråga som svenskar söker på) och Batteriskolan (en sida per koncept).
 * Innehållet ligger i solcellsfragor-content.ts och batteriskolan-content.ts.
 */

export type KbSource = { title: string; publisher: string; url: string };

export type KbLink = { href: string; label: string };

export type SolarCategorySlug =
  | "kostnad-och-lonsamhet"
  | "produktion-och-teknik"
  | "planering-tak-och-bygglov"
  | "elnat-forsaljning-och-skatt"
  | "drift-sakerhet-och-livslangd"
  | "batteri-elbil-och-varmepump";

export type KbSection = { h2?: string; paragraphs: string[]; bullets?: string[] };

export type SolarQuestion = {
  slug: string;
  category: SolarCategorySlug;
  question: string;
  description: string;
  shortAnswer: string;
  body: KbSection[];
  searchPhrases: string[];
  sources: KbSource[];
  related: string[];
  concepts?: string[];
  links?: KbLink[];
  updatedAt: string;
};

export type BatteryGroup = "grunder" | "ekonomi" | "elnat" | "trygghet";

export type BatteryConcept = {
  slug: string;
  group: BatteryGroup;
  term: string;
  title: string;
  description: string;
  shortAnswer: string;
  sections: { h2: string; paragraphs: string[]; bullets?: string[] }[];
  example?: { title: string; lines: string[]; note: string };
  misconceptions?: { myth: string; fact: string }[];
  faq: { q: string; a: string }[];
  searchPhrases: string[];
  sources: KbSource[];
  related: string[];
  questions?: string[];
  links?: KbLink[];
  updatedAt: string;
};
