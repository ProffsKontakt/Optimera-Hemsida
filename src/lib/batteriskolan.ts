import type { BatteryConcept, BatteryGroup } from "./kb-types";
import { CONCEPTS } from "./batteriskolan-content";

/**
 * Batteriskolan: hur hembatterier fungerar, koncept för koncept. Varje
 * koncept har en egen sida med kort svar, fördjupning, räkneexempel,
 * vanliga missförstånd, FAQ och källor.
 */

export type BatteryGroupInfo = {
  slug: BatteryGroup;
  title: string;
  intro: string;
};

export const BATTERY_GROUPS: BatteryGroupInfo[] = [
  {
    slug: "grunder",
    title: "Grunderna",
    intro: "Hur ett hembatteri fungerar, hur stort det ska vara och hur länge det håller.",
  },
  {
    slug: "ekonomi",
    title: "Ekonomi och styrning",
    intro:
      "Självförbrukning, spotpris, kvartspris och effektavgifter – så tjänar batteriet in sig.",
  },
  {
    slug: "elnat",
    title: "Elnät och stödtjänster",
    intro: "FCR-D, aFRR och aggregatorer – när batteriet hjälper elnätet och får betalt.",
  },
  {
    slug: "trygghet",
    title: "Trygghet och regler",
    intro: "Strömavbrott, brandsäkerhet, placering och grönt avdrag.",
  },
];

export function batteryUpdatedAt(): string {
  return CONCEPTS.reduce(
    (latest, c) => (c.updatedAt > latest ? c.updatedAt : latest),
    "2026-10-03",
  );
}

export function allConcepts(): BatteryConcept[] {
  return CONCEPTS;
}

export function findConcept(slug: string): BatteryConcept | undefined {
  return CONCEPTS.find((c) => c.slug === slug);
}

export function findBatteryGroup(slug: string): BatteryGroupInfo | undefined {
  return BATTERY_GROUPS.find((g) => g.slug === slug);
}

export function conceptsInGroup(slug: BatteryGroup): BatteryConcept[] {
  return CONCEPTS.filter((c) => c.group === slug);
}

export function batteryGroupHref(slug: BatteryGroup): string {
  return `/batteriskolan#${slug}`;
}
