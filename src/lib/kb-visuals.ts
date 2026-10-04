/**
 * Färg och bilder i kunskapsbanken (okt 2026).
 *
 * Varje databas har en egen färg, så att man ser var man är:
 *   Nyheter – solgul, Solcellsfrågor – indigo, Batteriskolan – koppar,
 *   Guider – mossgrön.
 *
 * Varje kategori (Solcellsfrågor), grupp (Batteriskolan) och guidekategori
 * har ett foto. Fotot används i hubbarnas bildrutor, vid kategorirubrikerna
 * och som bildband överst på varje sida i kategorin – så att även nya sidor
 * som rutinen lägger till får en bild utan att något behöver genereras.
 *
 * Fotona är genererade (Higgsfield) enligt samma bildregler som nyheterna:
 * stående paneler med tunna mellanrum och blank glasyta, inga personer,
 * ingen text, inga logotyper. De ligger i public/kb/ och kan bytas mot
 * riktiga installationsfoton i admin → Media ("Kunskapsbank – bilder",
 * bildplats kb:<namn>) utan kodändring.
 *
 * Ingen fs-import: används även i klientkomponenter.
 */

export type KbImage = { src: string; alt: string };

export type KbTone = "sun" | "indigo" | "copper" | "moss";

/** Hela klassnamn – Tailwind måste se dem ordagrant. */
export const KB_TONES: Record<
  KbTone,
  { chip: string; text: string; soft: string; border: string; bar: string; hover: string }
> = {
  sun: {
    chip: "bg-sun text-ink",
    text: "text-amber-deep",
    soft: "bg-sun/[0.18]",
    border: "border-sun-deep/40",
    bar: "bg-sun",
    hover: "group-hover:text-amber-deep",
  },
  indigo: {
    chip: "bg-indigo text-bone",
    text: "text-indigo",
    soft: "bg-indigo/[0.05]",
    border: "border-indigo/25",
    bar: "bg-indigo",
    hover: "group-hover:text-indigo",
  },
  copper: {
    chip: "bg-copper text-bone",
    text: "text-copper",
    soft: "bg-copper/[0.07]",
    border: "border-copper/30",
    bar: "bg-copper",
    hover: "group-hover:text-copper",
  },
  moss: {
    chip: "bg-moss text-bone",
    text: "text-moss",
    soft: "bg-moss/[0.07]",
    border: "border-moss/30",
    bar: "bg-moss",
    hover: "group-hover:text-moss",
  },
};

/** Databasernas färger. */
export const KB_DB_TONE = {
  nyheter: "sun",
  solcellsfragor: "indigo",
  batteriskolan: "copper",
  guider: "moss",
} as const satisfies Record<string, KbTone>;

/** Standardfotona. Nyckeln är filnamnet i public/kb/ och bildplatsens id (kb:<nyckel>). */
export const KB_IMAGES = {
  "sol-kostnad-och-lonsamhet": {
    label: "Solcellsfrågor · Kostnad och lönsamhet",
    alt: "Rött trähus med en rad stående solpaneler på tegeltaket en solig sensommardag",
  },
  "sol-produktion-och-teknik": {
    label: "Solcellsfrågor · Produktion och teknik",
    alt: "Närbild på blanka solpaneler som speglar vita moln och blå himmel",
  },
  "sol-planering-tak-och-bygglov": {
    label: "Solcellsfrågor · Planering, tak och bygglov",
    alt: "Villatak med tre stående solpaneler och tomma monteringsskenor för fler paneler",
  },
  "sol-elnat-forsaljning-och-skatt": {
    label: "Solcellsfrågor · Elnät, försäljning och skatt",
    alt: "Kraftledning längs en grusväg och ett vitt hus med solpaneler på landsbygden i kvällssol",
  },
  "sol-drift-sakerhet-och-livslangd": {
    label: "Solcellsfrågor · Drift, säkerhet och livslängd",
    alt: "Stående solpaneler i snö med glittrande frostdroppar i lågt vintersolsken",
  },
  "sol-batteri-elbil-och-varmepump": {
    label: "Solcellsfrågor · Batteri, elbil och värmepump",
    alt: "Villa med solpaneler, värmepump vid husväggen och en elbil som laddar på uppfarten i solnedgången",
  },
  "bat-grunder": {
    label: "Batteriskolan · Grunderna",
    alt: "Vitt hembatteri i tre moduler på en ljus trävägg i ett tvättstugerum",
  },
  "bat-ekonomi": {
    label: "Batteriskolan · Ekonomi och styrning",
    alt: "Villa med solpaneler i skymningen, med varmt ljus i alla fönster",
  },
  "bat-elnat": {
    label: "Batteriskolan · Elnät och stödtjänster",
    alt: "Kraftledningsstolpar över skog och sjö i skymningen",
  },
  "bat-trygghet": {
    label: "Batteriskolan · Trygghet och regler",
    alt: "Upplyst villa en snöig vinterkväll medan gatan runt omkring ligger mörk",
  },
  "guide-varmepump": {
    label: "Guider · Värmepump",
    alt: "Frostig fläkt på en värmepumps utedel framför ett gult trähus en höstmorgon",
  },
  "guide-laddbox": {
    label: "Guider · Laddbox",
    alt: "Laddkabel i laddluckan på en vit elbil framför ett rött trähus i skymningen",
  },
  "guide-elpris": {
    label: "Guider · Elpris",
    alt: "Vattenkraftsdamm i en älv i norra Sverige i kvällsljus",
  },
  "guide-ekonomi": {
    label: "Guider · Stöd och ekonomi",
    alt: "Gult tegelhus från 1960-talet i höstsol",
  },
} as const;

export type KbImageKey = keyof typeof KB_IMAGES;

export function defaultKbImage(key: KbImageKey): KbImage {
  return { src: `/kb/${key}.jpg`, alt: KB_IMAGES[key].alt };
}

/** Solcellsfrågornas kategori → foto. */
export const solarCategoryImageKey = (slug: string): KbImageKey =>
  (`sol-${slug}` in KB_IMAGES ? `sol-${slug}` : "sol-produktion-och-teknik") as KbImageKey;

/** Batteriskolans grupp → foto. */
export const batteryGroupImageKey = (slug: string): KbImageKey =>
  (`bat-${slug}` in KB_IMAGES ? `bat-${slug}` : "bat-grunder") as KbImageKey;

/** Guidernas kategori → foto. */
export function guideCategoryImageKey(category: string): KbImageKey {
  switch (category) {
    case "Värmepump":
      return "guide-varmepump";
    case "Laddbox":
      return "guide-laddbox";
    case "Elpris":
      return "guide-elpris";
    case "Solceller":
      return "sol-kostnad-och-lonsamhet";
    case "Batteri":
      return "bat-grunder";
    default:
      return "guide-ekonomi";
  }
}

/** Hubbarnas huvudbilder. */
export const KB_HUB_IMAGE = {
  kunskapsbank: "sol-batteri-elbil-och-varmepump",
  solcellsfragor: "sol-produktion-och-teknik",
  batteriskolan: "bat-grunder",
  guider: "guide-varmepump",
} as const satisfies Record<string, KbImageKey>;
