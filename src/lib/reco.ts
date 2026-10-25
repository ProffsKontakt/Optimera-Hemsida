/**
 * Betyget på Reco – SENAST KÄNDA siffror. Sajten hämtar de aktuella
 * siffrorna direkt från Reco (lib/reco-live.ts, en gång i timmen) och
 * faller tillbaka hit om Reco inte svarar. Uppdatera gärna när du ändå är
 * här, men det behövs inte för att sajten ska visa rätt antal.
 * Ingen fs-import: används även i klientkomponenter.
 */
export const RECO = {
  /** Snittbetyg som det skrivs på svenska. */
  average: "4,8",
  /** Antal omdömen totalt på profilen. */
  count: 19,
  url: "https://www.reco.se/optimera-energi",
} as const;
