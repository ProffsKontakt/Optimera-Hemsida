/**
 * Startsidans foton. Varje bild har en plats i admin → Media (gruppen
 * "Startsida", bildplats start:<namn>), så att den kan bytas mot ett eget
 * foto utan kodändring. Finns ingen uppladdad bild används standardbilden
 * i public/start.
 *
 * Bildregler (ägarens): verkliga motiv, solpaneler i raka rader med lika
 * stora moduler i rätt storlek, och batteribilder som visar Fox ESS.
 *
 * Ingen fs-import här: filen används även av klientkomponenter.
 */
export type StartImageKey =
  | "hero"
  | "dygn-02"
  | "dygn-07"
  | "dygn-12"
  | "dygn-18"
  | "dygn-247"
  | "kort-sol"
  | "kort-batteri"
  | "kort-varmepump"
  | "kort-laddbox"
  | "borjan"
  | "boka";

export type StartImage = {
  src: string;
  alt: string;
  /** Sant när bilden är uppladdad i admin (då gäller inte standardbildens utsnitt). */
  uploaded?: boolean;
};

type StartImageDef = {
  /** Namn i admin. */
  label: string;
  alt: string;
  /** Förhandsvisningens format i admin. */
  aspect: string;
  /** Vad bilden ska föreställa och hur den beskärs. */
  hint: string;
  /** Största bredd som sparas vid uppladdning. */
  maxWidth: number;
};

export const START_IMAGES: Record<StartImageKey, StartImageDef> = {
  hero: {
    label: "Hjälten (första vyn)",
    alt: "",
    aspect: "16 / 9",
    hint: "Liggande foto, helst minst 3000 px brett. Hus med solpaneler på taket. Rubriken ligger nere till vänster, så den delen bör vara lugn och gärna mörk.",
    maxWidth: 3200,
  },
  "dygn-02": {
    label: "Husets dygn 02:00 (natt)",
    alt: "Elbil som laddar vid ett rött garage en höstnatt",
    aspect: "4 / 3",
    hint: "Nattbild: elbil som laddar hemma. Motivet bör ligga mitt i bilden.",
    maxWidth: 2400,
  },
  "dygn-07": {
    label: "Husets dygn 07:00 (morgon)",
    alt: "Gul trävilla med solpaneler på taket i lågt morgonljus",
    aspect: "4 / 3",
    hint: "Morgonbild: hus med solpaneler i lågt ljus.",
    maxWidth: 2400,
  },
  "dygn-12": {
    label: "Husets dygn 12:00 (dag)",
    alt: "Svarta solpaneler på ett tegeltak under blå himmel",
    aspect: "4 / 3",
    hint: "Dagbild: solpaneler på tak i dagsljus, gärna i närbild.",
    maxWidth: 2400,
  },
  "dygn-18": {
    label: "Husets dygn 18:00 (kväll)",
    alt: "Vitt hus med solpaneler och tända fönster i skymningen",
    aspect: "4 / 3",
    hint: "Kvällsbild: hus med tända fönster i skymningen.",
    maxWidth: 2400,
  },
  "dygn-247": {
    label: "Husets dygn 24/7 (batteriet)",
    alt: "Fox ESS-batteri, en vit stapel med moduler, mot en grå vägg",
    aspect: "4 / 3",
    hint: "Fox ESS-batteriet installerat, gärna med växelriktaren. Batteriet mitt i bilden.",
    maxWidth: 2400,
  },
  "kort-sol": {
    label: "Tjänstekort: Solpaneler",
    alt: "Rött trähus med svarta solpaneler i två jämna rader på taket",
    aspect: "5 / 6",
    hint: "Stående foto. Tak med solpaneler i övre halvan.",
    maxWidth: 1600,
  },
  "kort-batteri": {
    label: "Tjänstekort: Batterier",
    alt: "Fox ESS-batteri, en vit stapel med moduler på justerbara fötter",
    aspect: "5 / 6",
    hint: "Stående foto av Fox ESS-batteriet.",
    maxWidth: 1600,
  },
  "kort-varmepump": {
    label: "Tjänstekort: Värmepumpar",
    alt: "Vit luft-vatten-värmepump på betongplintar vid en gul trävilla",
    aspect: "5 / 6",
    hint: "Stående foto av en installerad värmepump (utedelen).",
    maxWidth: 1600,
  },
  "kort-laddbox": {
    label: "Tjänstekort: Laddboxar",
    alt: "Elbil som laddar från en laddbox på en röd garagevägg",
    aspect: "5 / 6",
    hint: "Stående foto: laddbox på vägg och kabeln i bilen.",
    maxWidth: 1600,
  },
  borjan: {
    label: "Så började det",
    alt: "Grått trähus bland björkar i skymningen, med tända fönster och solpaneler i två jämna rader på taket",
    aspect: "4 / 3",
    hint: "Varm kvällsbild av ett hus med solpaneler.",
    maxWidth: 2400,
  },
  boka: {
    label: "Bokningsrutan (längst ner)",
    alt: "",
    aspect: "16 / 9",
    hint: "Liggande foto, gärna vinter. Huset till höger i bilden, eftersom texten ligger till vänster.",
    maxWidth: 3200,
  },
};

export const START_IMAGE_KEYS = Object.keys(START_IMAGES) as StartImageKey[];

/** Standardbilden i public/start. */
export function defaultStartImage(key: StartImageKey): StartImage {
  return { src: `/start/${key}.jpg`, alt: START_IMAGES[key].alt };
}
