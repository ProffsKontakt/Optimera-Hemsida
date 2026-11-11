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
 * Fotona är genererade (nov 2026) efter ägarens bildregler: verkliga motiv,
 * panelfält i raka rader med lika stora stående moduler (cirka 1,13 x 1,76 m)
 * och fritt tak runt om, inga personer, ingen text, inga logotyper.
 * Batteribilden är ägarens egen bild av Fox ESS-batteriet. De ligger i public/kb/ och kan bytas mot
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
    alt: "Grått trähus bland björkar i skymningen, med solpaneler i två jämna rader på taket",
  },
  "sol-produktion-och-teknik": {
    label: "Solcellsfrågor · Produktion och teknik",
    alt: "Fyra svarta solpaneler sida vid sida på ett tegeltak under blå himmel",
  },
  "guide-batterier-3d": {
    label: "Guider",
    alt: "Våra fem hembatterier i 3D sida vid sida: Eway, SAJ HS3, Enershare, SigenStor och Fox ESS CQ7",
  },
  "sol-planering-tak-och-bygglov": {
    label: "Solcellsfrågor · Planering, tak och bygglov",
    alt: "Tegeltak med åtta solpaneler i två rader, fritt från skorstenen och takfönstret",
  },
  "sol-elnat-forsaljning-och-skatt": {
    label: "Solcellsfrågor · Elnät, försäljning och skatt",
    alt: "Elstolpe längs en grusväg och ett vitt hus med solpaneler på landsbygden i kvällssol",
  },
  "sol-drift-sakerhet-och-livslangd": {
    label: "Solcellsfrågor · Drift, säkerhet och livslängd",
    alt: "Solpaneler på ett vintertak där snön har glidit av den övre raden",
  },
  "sol-batteri-elbil-och-varmepump": {
    label: "Solcellsfrågor · Batteri, elbil och värmepump",
    alt: "Mörk trävilla med solpaneler, värmepump vid husväggen och en elbil som laddar på uppfarten i solnedgången",
  },
  "bat-grunder": {
    label: "Batteriskolan · Grunderna",
    alt: "Fox ESS-batteri, en vit stapel med moduler på justerbara fötter, mot en grå vägg",
  },
  "bat-ekonomi": {
    label: "Batteriskolan · Ekonomi och styrning",
    alt: "Vit villa med solpaneler i skymningen, med varmt ljus i alla fönster",
  },
  "bat-elnat": {
    label: "Batteriskolan · Elnät och stödtjänster",
    alt: "Kraftledning på trästolpar genom skogen ner mot en sjö i skymningen",
  },
  "bat-trygghet": {
    label: "Batteriskolan · Trygghet och regler",
    alt: "Rött trähus med solpaneler och tända fönster en snöig vinterkväll",
  },
  "guide-varmepump": {
    label: "Guider · Värmepump",
    alt: "Vit luft-vatten-värmepump på betongplintar vid en gul trävilla en frostig höstmorgon",
  },
  "guide-laddbox": {
    label: "Guider · Laddbox",
    alt: "Vit elbil som laddar vid ett rött garage en höstnatt",
  },
  "guide-elpris": {
    label: "Guider · Elpris",
    alt: "Vattenkraftsdamm i en älv i norra Sverige i kvällsljus",
  },
  "guide-ekonomi": {
    label: "Guider · Stöd och ekonomi",
    alt: "Gul trävilla med solpaneler på taket i lågt morgonljus",
  },
} as const;

export type KbImageKey = keyof typeof KB_IMAGES;

/** Versionssträng som byts när en bild i /public/kb ersätts – Vercel och
 *  webbläsare cachar annars den gamla bilden på samma adress. */
const KB_IMAGE_VERSION = "20261111";

export function defaultKbImage(key: KbImageKey): KbImage {
  return { src: `/kb/${key}.jpg?v=${KB_IMAGE_VERSION}`, alt: KB_IMAGES[key].alt };
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
  guider: "guide-batterier-3d",
} as const satisfies Record<string, KbImageKey>;
