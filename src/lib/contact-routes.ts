/**
 * "Vem ska du höra av dig till?" på /om-oss.
 *
 * Varje teammedlem kan markeras som kontakt för en eller flera av de här
 * situationerna i /admin/team (fältet contactFor i data/team.json). Sidan
 * visar sedan rätt person per situation – och faller tillbaka på bolagets
 * allmänna nummer och mejl om ingen synlig person är markerad, så att en
 * dold eller borttagen medarbetare aldrig lämnar ett tomt hål.
 *
 * Ingen fs-import här: filen används både server-side (om-oss) och i
 * admin-klienten (kryssrutorna i TeamManager).
 */
export const CONTACT_ROUTES = [
  {
    id: "ny-kund",
    /** Kort etikett i admin. */
    label: "Nya kunder",
    /** Etikett på personens kort i teamet (med telefonikon framför). */
    cardLabel: "Nya kunder",
    /** Frågan besökaren känner igen sig i. */
    question: "Funderar du på sol, batteri eller laddbox?",
    /** Visas när flera personer delar situationen (t.ex. alla rådgivare). */
    groupTitle: "En av våra rådgivare",
    groupNote: "Du får en fast rådgivare från första samtalet.",
  },
  {
    id: "projekt",
    label: "Pågående installation",
    // Kort nog för mobilens smala kort (~150px).
    cardLabel: "Pågående projekt",
    question: "Har du redan beställt?",
    groupTitle: "Projektledningen",
    groupNote: "Samma person följer din installation hela vägen.",
  },
  {
    id: "teknik",
    label: "Teknisk fråga",
    cardLabel: "Tekniska frågor",
    question: "Fråga om en befintlig anläggning?",
    groupTitle: "Tekniska teamet",
    groupNote: "Hör av dig direkt om något krånglar.",
  },
  {
    id: "foretag",
    label: "Företag & press",
    cardLabel: "Företag & press",
    question: "Företag, press eller samarbete?",
    groupTitle: "Ledningen",
    groupNote: "Hör av dig direkt till ledningen.",
  },
] as const;

export type ContactRouteId = (typeof CONTACT_ROUTES)[number]["id"];

export const CONTACT_ROUTE_IDS = CONTACT_ROUTES.map((r) => r.id) as [
  ContactRouteId,
  ...ContactRouteId[],
];

/** Bolagets allmänna kontaktvägar (samma som footern). */
export const COMPANY_CONTACT = {
  phone: "+46763053732",
  phoneDisplay: "076 305 37 32",
  email: "hej@optimeraenergi.se",
} as const;

export function isContactRouteId(x: unknown): x is ContactRouteId {
  return typeof x === "string" && (CONTACT_ROUTE_IDS as string[]).includes(x);
}
