/**
 * Betyget på Reco – EN plats att uppdatera när nya omdömen kommer in
 * (kolla reco.se/optimera-energi). Används av startsidans recensionsrad,
 * hero-pillen och om-oss. Ingen fs-import: används även i klientkomponenter.
 */
export const RECO = {
  /** Snittbetyg som det skrivs på svenska. */
  average: "4,7",
  /** Antal omdömen totalt på profilen. */
  count: 15,
  url: "https://www.reco.se/optimera-energi",
} as const;
