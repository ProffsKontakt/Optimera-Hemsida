import type { SolarCategorySlug, SolarQuestion } from "./kb-types";
import { QUESTIONS } from "./solcellsfragor-content";

/**
 * Solcellsfrågor: databas med de frågor svenskar oftast söker på om
 * solceller, en sida per fråga. Frågorna hämtas från Google-autocomplete
 * (sv/SE) och fylls på av nyhetsrutinen var tredje dag. Ordningen i
 * QUESTIONS är sökpopularitet inom respektive kategori.
 */

export type SolarCategory = {
  slug: SolarCategorySlug;
  title: string;
  intro: string;
};

export const SOLAR_CATEGORIES: SolarCategory[] = [
  {
    slug: "kostnad-och-lonsamhet",
    title: "Kostnad och lönsamhet",
    intro:
      "Vad solceller kostar, vilket stöd som finns och när investeringen lönar sig.",
  },
  {
    slug: "produktion-och-teknik",
    title: "Produktion och teknik",
    intro:
      "Hur solceller fungerar och hur mycket el de ger – året runt och i alla väderstreck.",
  },
  {
    slug: "planering-tak-och-bygglov",
    title: "Planering, tak och bygglov",
    intro:
      "Hur stor anläggning du behöver, vilka tak som fungerar och vilka regler som gäller.",
  },
  {
    slug: "elnat-forsaljning-och-skatt",
    title: "Elnät, försäljning och skatt",
    intro:
      "Att sälja överskottsel, anmäla anläggningen och hur skatten fungerar 2026.",
  },
  {
    slug: "drift-sakerhet-och-livslangd",
    title: "Drift, säkerhet och livslängd",
    intro:
      "Livslängd, rengöring, brandsäkerhet, försäkring och vad som händer vid strömavbrott.",
  },
  {
    slug: "batteri-elbil-och-varmepump",
    title: "Batteri, elbil och värmepump",
    intro: "Solceller tillsammans med batteri, elbil och värmepump.",
  },
];

/** Senaste ändringsdatum för databasen som helhet (hubbens lastmod). */
export function solarUpdatedAt(): string {
  return QUESTIONS.reduce(
    (latest, q) => (q.updatedAt > latest ? q.updatedAt : latest),
    "2026-10-03",
  );
}

export function allQuestions(): SolarQuestion[] {
  return QUESTIONS;
}

export function findQuestion(slug: string): SolarQuestion | undefined {
  return QUESTIONS.find((q) => q.slug === slug);
}

export function findSolarCategory(slug: string): SolarCategory | undefined {
  return SOLAR_CATEGORIES.find((c) => c.slug === slug);
}

export function questionsInCategory(slug: SolarCategorySlug): SolarQuestion[] {
  return QUESTIONS.filter((q) => q.category === slug);
}

/** Ankare på hubben för en kategori, t.ex. /solcellsfragor#kostnad-och-lonsamhet. */
export function solarCategoryHref(slug: SolarCategorySlug): string {
  return `/solcellsfragor#${slug}`;
}
