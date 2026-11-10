/**
 * Stockholm-områdets kommuner där Optimera Energi installerar.
 *
 * Per kommun: unik intro-copy, lokal kontext (nätägare, effektavgift,
 * bygglov) och referenser till närliggande kommuner för intern länkning.
 * Genererar /solceller/[stad]-sidor som rankar på "solceller {stad}".
 *
 * Regler för innehållet:
 *  - Nätägare och effektavgift ska stå med källa i `sources` (kommunens
 *    eller nätbolagets egen sida). Saknas primärkälla lämnas uppgiften ute.
 *  - Inga påståenden om hur många eller vilka installationer vi gjort i en
 *    kommun förrän de finns dokumenterade.
 *  - Uppdatera `checkedAt` när uppgifterna kontrollerats mot källorna.
 */

export type CityFact = {
  k: string;
  v: string;
};

export type CitySource = {
  title: string;
  publisher: string;
  url: string;
};

export type CityGrid = {
  /** Nätbolag(en) som de skrivs i löptext, t.ex. "Vattenfall Eldistribution". */
  operator: string;
  /** Vem som äger lokalnätet. Belagt i `sources`. */
  ownership: string;
  /** Vad som gäller för effektavgift, eller null när primärkälla saknas. */
  tariff: string | null;
  /** Kort värde till faktarutan på batterisidan, eller null. */
  tariffShort: string | null;
};

export type City = {
  slug: string;
  name: string;
  /** För H1 + breadcrumb. Vissa kommuner böjs annorlunda ("i Solna" vs "på Lidingö"). */
  preposition: "i" | "på";
  /** Eyebrow ovanför H1. */
  region: string;
  /** Kort intro under H1 (en mening, 15–25 ord). */
  oneLiner: string;
  /** Längre intro-copy, city-specifik. Visas i hero-sektionen. */
  intro: string;
  /** Fakta-bullets som visas som rutor under hero. */
  facts: CityFact[];
  /** Lokala förutsättningar – 2-3 stycken. */
  localContext: { title: string; body: string }[];
  /** Nätägare och effektavgift, delas med /batteri/[stad]. */
  grid: CityGrid;
  /** Källor för uppgifterna på sidan. */
  sources: CitySource[];
  /** Datum då uppgifterna senast kontrollerades mot källorna (ISO). */
  checkedAt: string;
  /** Slug:s för närliggande kommuner (för cross-linking). */
  neighbors: string[];
};

const CHECKED_AT = "2026-11-10";

// --- Gemensamma källor ------------------------------------------------------

const SRC_SCB: CitySource = {
  title: "Folkmängd efter region, 31 december 2024",
  publisher: "SCB",
  url: "https://www.statistikdatabasen.scb.se/pxweb/sv/ssd/START__BE__BE0101__BE0101A/BefolkningNy/",
};

const SRC_BYGGLOV: CitySource = {
  title: "Ändra fasad eller tak",
  publisher: "Boverket",
  url: "https://www.boverket.se/sv/byggande/bygglov-rivningslov-marklov-och-anmalan/vad-far-jag-bygga-utan-bygglov/andra-fasad-eller-tak/",
};

const SRC_PVGIS: CitySource = {
  title:
    "PVGIS 5.3: Stockholm (59,33° N, 18,07° E), 1 kWp, söder, 30° lutning, 14 % förluster, soldata 2005–2023",
  publisher: "EU-kommissionens gemensamma forskningscentrum (JRC)",
  url: "https://re.jrc.ec.europa.eu/pvg_tools/en/",
};

const SRC_ELLEVIO_AREA: CitySource = {
  title: "Ellevio nu och då (nätområde Stockholm)",
  publisher: "Ellevio",
  url: "https://www.ellevio.se/om-oss/om-foretaget/ellevio-nu-och-da/",
};

const SRC_ELLEVIO_TARIFF: CitySource = {
  title: "Ellevio återinför en prismodell utan effektavgift (pressmeddelande 20 april 2026)",
  publisher: "Ellevio",
  url: "https://www.ellevio.se/nyheter/pressmeddelanden/ellevio-aterinfor-en-prismodell-utan-effektavgift/",
};

const SRC_VATTENFALL_AREA: CitySource = {
  title: "Nätutvecklingsplan 2025–2034, bilaga 1: prognos lokalnät per kommun",
  publisher: "Vattenfall Eldistribution",
  url: "https://www.vattenfalleldistribution.se/globalassets/4.-var-verksamhet/om-elnatet/kapacitet-och-flexibilitet/natutvecklingsplaner/bilaga-1-prognos-lokalnat-per-kommun.pdf",
};

const SRC_VATTENFALL_TARIFF: CitySource = {
  title: "Effektguiden",
  publisher: "Vattenfall Eldistribution",
  url: "https://www.vattenfalleldistribution.se/abonnemang-och-avgifter/avtal-och-avgifter/effektguiden/",
};

// --- Återkommande formuleringar --------------------------------------------

const BYGGLOV_RULE =
  "Sedan den 1 december 2025 krävs inget bygglov för solceller på tak eller fasad på villor, radhus och andra en- och tvåbostadshus, enligt Boverket. Undantag gäller för hus och områden som är särskilt värdefulla och där detaljplanen har utökad lovplikt.";

const ELLEVIO_TARIFF =
  "Ellevio tog bort effektavgiften den 1 juni 2026 för villa, radhus och fritidshus. Nu gäller en fast avgift efter säkringsstorlek plus en överföringsavgift per kWh.";

const VATTENFALL_TARIFF =
  "Vattenfall Eldistribution har ingen effektavgift i dag. Bolaget har pausat det planerade införandet hösten 2026 i väntan på nya föreskrifter från Energimarknadsinspektionen.";

const ANMALAN =
  "Vi gör föranmälan innan arbetet börjar och färdiganmälan innan anläggningen tas i drift.";

export const CITIES: City[] = [
  {
    slug: "solna",
    name: "Solna",
    preposition: "i",
    region: "Solna stad · Stockholms län",
    oneLiner: "Solceller i Solna, installerade från vårt kontor på Vallgatan 9.",
    intro:
      "Solna är Optimera Energis hemmakommun. Kontoret ligger på Vallgatan 9, så vägen är kort till Bergshamra, Råsunda, Huvudsta och Hagalund, både vid hembesöket och om något behöver följas upp efter driftsättning. Elnätet i hela Solna ägs av Vattenfall, och det är dit vi anmäler din anläggning.",
    facts: [
      { k: "Befolkning", v: "85 789 (2024)" },
      { k: "Nätägare", v: "Vattenfall Eldistribution" },
      { k: "Elområde", v: "SE3" },
      { k: "Vårt kontor", v: "Vallgatan 9" },
    ],
    localContext: [
      {
        title: "Bygglov i Solna",
        body: `${BYGGLOV_RULE} Är du osäker på vad som gäller ditt hus hjälper vi dig att reda ut det med Solna stad, och med ansökan om bygglov behövs.`,
      },
      {
        title: "Nät och anmälan",
        body: `Solna ligger i elområde SE3. Enligt Solna stad äger Vattenfall det lokala elnätet i hela kommunen. ${ANMALAN} ${VATTENFALL_TARIFF}`,
      },
    ],
    grid: {
      operator: "Vattenfall Eldistribution",
      ownership: "Enligt Solna stad äger Vattenfall det lokala elnätet i hela Solna.",
      tariff: VATTENFALL_TARIFF,
      tariffShort: "Nej, införandet pausat",
    },
    sources: [
      { title: "Fjärrvärme och elnät", publisher: "Solna stad", url: "https://www.solna.se/bygga-bo--miljo/energi-och-uppvarmning/fjarrvarme-och-elnat" },
      SRC_VATTENFALL_TARIFF,
      SRC_BYGGLOV,
      SRC_SCB,
    ],
    checkedAt: CHECKED_AT,
    neighbors: ["sundbyberg", "stockholm", "danderyd", "sollentuna"],
  },
  {
    slug: "stockholm",
    name: "Stockholm",
    preposition: "i",
    region: "Stockholms stad · SE3",
    oneLiner: "Solceller i Stockholm, installerade av certifierade elektriker.",
    intro:
      "Stockholms innerstad är en sak, ytterstadens villaområden en annan. Vi installerar i hela kommunen, till exempel i Bromma, Spånga, Hägersten, Älvsjö, Farsta, Skarpnäck och Enskede. För hus i kulturhistoriskt värdefulla miljöer reder vi ut med Stadsbyggnadskontoret vad som gäller innan vi lämnar offert. Vi säger nej till installationer som inte ger en rimlig kalkyl.",
    facts: [
      { k: "Befolkning", v: "995 574 (2024)" },
      { k: "Elområde", v: "SE3" },
      { k: "Nätägare", v: "Ellevio" },
      { k: "Solinstrålning", v: "ca 990 kWh/m² och år" },
    ],
    localContext: [
      {
        title: "Bygglov i Stockholms stad",
        body: `${BYGGLOV_RULE} I Stockholm finns många kulturhistoriskt värdefulla miljöer, och där kan bygglov krävas. Stadsbyggnadskontoret avgör vad som gäller för ditt hus.`,
      },
      {
        title: "Så mycket ger taket",
        body:
          "I Stockholm ger solceller cirka 940–970 kWh per kWp och år mot söder med 30 graders lutning, enligt EU-kommissionens beräkningsverktyg PVGIS. Mot öster eller väster ger samma tak cirka 730–760 kWh per kWp. Vi besiktar taket med drönare före offert, så att kalkylen bygger på ditt tak och inte på en schablon.",
      },
      {
        title: "Nät och anmälan",
        body: `Ellevio äger elnätet i Stockholms stad. ${ANMALAN} ${ELLEVIO_TARIFF}`,
      },
    ],
    grid: {
      operator: "Ellevio",
      ownership: "Ellevio äger elnätet i Stockholms stad.",
      tariff: ELLEVIO_TARIFF,
      tariffShort: "Nej, borttagen 1 juni 2026",
    },
    sources: [SRC_ELLEVIO_AREA, SRC_ELLEVIO_TARIFF, SRC_PVGIS, SRC_BYGGLOV, SRC_SCB],
    checkedAt: CHECKED_AT,
    neighbors: ["solna", "sundbyberg", "lidingo", "nacka"],
  },
  {
    slug: "sundbyberg",
    name: "Sundbyberg",
    preposition: "i",
    region: "Sundbybergs stad · Sveriges minsta kommun till ytan",
    oneLiner: "Solceller i Sundbyberg, installerade från grannkommunen Solna.",
    intro:
      "Sundbyberg är Sveriges minsta kommun till ytan och tätt bebyggd, med radhus, kedjehus och småhus där takytan ofta är begränsad. Därför räknar vi fram vilken paneluppsättning som faktiskt ryms innan vi lämnar pris. Vi installerar i hela kommunen, från Duvbo och Lilla Alby till Hallonbergen, Ör och Ursvik.",
    facts: [
      { k: "Befolkning", v: "56 274 (2024)" },
      { k: "Elområde", v: "SE3" },
      { k: "Nätägare", v: "Vattenfall Eldistribution" },
      { k: "Vårt kontor", v: "Solna, grannkommun" },
    ],
    localContext: [
      {
        title: "Små tak kräver noggrann placering",
        body:
          "På ett litet tak är ytan den begränsande faktorn, inte takets riktning. Vi dimensionerar för mest energi per kvadratmeter, med JA Solar 500 W (22,6 % verkningsgrad) där panelen får plats och den mindre 455 W-panelen där taket är uppdelat.",
      },
      {
        title: "Bostadsrätt, bygglov och nät",
        body: `Bor du i en bostadsrättsförening är det föreningen som äger huset, och den måste godkänna installationen. ${BYGGLOV_RULE} Vattenfall Eldistribution har lokalnätet i Sundbyberg. ${ANMALAN} ${VATTENFALL_TARIFF}`,
      },
    ],
    grid: {
      operator: "Vattenfall Eldistribution",
      ownership: "Vattenfall Eldistribution har lokalnätet i Sundbyberg.",
      tariff: VATTENFALL_TARIFF,
      tariffShort: "Nej, införandet pausat",
    },
    sources: [SRC_VATTENFALL_AREA, SRC_VATTENFALL_TARIFF, SRC_BYGGLOV, SRC_SCB],
    checkedAt: CHECKED_AT,
    neighbors: ["solna", "stockholm", "sollentuna"],
  },
  {
    slug: "taby",
    name: "Täby",
    preposition: "i",
    region: "Täby kommun · norr om Stockholm",
    oneLiner: "Solceller i Täby, med drönarbesiktning av taket före offert.",
    intro:
      "Täby har stora villaområden som Näsbypark, Roslags-Näsby, Viggbyholm, Gribbylund och Skarpäng. Ett stort tak ger plats för en större anläggning, och då spelar dimensioneringen roll: vi utgår från din förbrukning och takets läge, inte från hur många paneler som går att få upp.",
    facts: [
      { k: "Befolkning", v: "77 744 (2024)" },
      { k: "Elområde", v: "SE3" },
      { k: "Nätägare", v: "Ellevio" },
      { k: "Bygglov", v: "Krävs oftast inte" },
    ],
    localContext: [
      {
        title: "Större tak, större anläggning",
        body:
          "På ett stort tak ryms ofta fler paneler än huset behöver. Vi räknar på hur mycket av solelen du använder själv, eftersom en egenanvänd kilowattimme är värd mer än en såld, och föreslår batteri när det höjer egenanvändningen. Med ett batteri som prisstyr betalar sig sol och batteri tillsammans på ungefär 4–7 år.",
      },
      {
        title: "Bygglov och nät i Täby",
        body: `${BYGGLOV_RULE} Enligt Täby kommun äger och ansvarar Ellevio för elnätet i kommunen. ${ANMALAN} ${ELLEVIO_TARIFF}`,
      },
    ],
    grid: {
      operator: "Ellevio",
      ownership: "Enligt Täby kommun äger och ansvarar Ellevio för elnätet i Täby.",
      tariff: ELLEVIO_TARIFF,
      tariffShort: "Nej, borttagen 1 juni 2026",
    },
    sources: [
      { title: "Elnät", publisher: "Täby kommun", url: "https://www.taby.se/bygga-bo-och-miljo/boendemiljo/elnat" },
      SRC_ELLEVIO_TARIFF,
      SRC_BYGGLOV,
      SRC_SCB,
    ],
    checkedAt: CHECKED_AT,
    neighbors: ["solna", "danderyd", "sollentuna"],
  },
  {
    slug: "lidingo",
    name: "Lidingö",
    preposition: "på",
    region: "Lidingö stad · ö i Stockholms inlopp",
    oneLiner: "Solceller på Lidingö, för villa och radhus.",
    intro:
      "Vi installerar på hela Lidingö, i stadsdelar som Skärsätra, Brevik, Sticklinge och Bodal. På hus med flera takfall och vinklar lägger vi panelerna så att de följer takets linjer. Ellevio har elnätet på ön.",
    facts: [
      { k: "Befolkning", v: "48 377 (2024)" },
      { k: "Elområde", v: "SE3" },
      { k: "Nätägare", v: "Ellevio" },
      { k: "Bygglov", v: "Krävs oftast inte" },
    ],
    localContext: [
      {
        title: "Tak som syns",
        body: `${BYGGLOV_RULE} Lidingö stad avgör vad som gäller för ditt hus. Där taket syns mycket föreslår vi ofta helsvarta paneler, som smälter in bättre mot mörka tak.`,
      },
      {
        title: "Nät och anmälan",
        body: `Lidingö ingår i Ellevios nätområde Stockholm. ${ANMALAN} ${ELLEVIO_TARIFF}`,
      },
    ],
    grid: {
      operator: "Ellevio",
      ownership: "Lidingö ingår i Ellevios nätområde Stockholm.",
      tariff: ELLEVIO_TARIFF,
      tariffShort: "Nej, borttagen 1 juni 2026",
    },
    sources: [SRC_ELLEVIO_AREA, SRC_ELLEVIO_TARIFF, SRC_BYGGLOV, SRC_SCB],
    checkedAt: CHECKED_AT,
    neighbors: ["stockholm", "nacka", "danderyd"],
  },
  {
    slug: "sollentuna",
    name: "Sollentuna",
    preposition: "i",
    region: "Sollentuna kommun · norra Storstockholm",
    oneLiner: "Solceller i Sollentuna, installerade från vårt kontor i Solna.",
    intro:
      "I Sollentuna finns villaområden som Edsberg, Helenelund, Häggvik, Rotebro och Tureberg, med både äldre villor och nybyggda hus. Här äger kommunens eget bolag, Sollentuna Energi & Miljö, elnätet, och nätavgiften har en effektavgift. Därför bör sol, batteri och värmepump dimensioneras tillsammans.",
    facts: [
      { k: "Befolkning", v: "77 624 (2024)" },
      { k: "Elområde", v: "SE3" },
      { k: "Nätägare", v: "Sollentuna Energi & Miljö" },
      { k: "Effektavgift", v: "Ja" },
    ],
    localContext: [
      {
        title: "Effektavgift hos Sollentuna Energi & Miljö",
        body:
          "Sollentuna Energi & Miljö äger elnätet i Sollentuna och har effektavgift: en del av nätavgiften beror på hur mycket el du använder samtidigt och när på dygnet. Solceller sänker inte effekttoppen en mörk vinterkväll, men ett batteri med effektvakt kan göra det. Därför räknar vi på effekten och inte bara på kilowattimmarna.",
      },
      {
        title: "Bygglov och anmälan",
        body: `${BYGGLOV_RULE} ${ANMALAN} Anmälningarna går till Sollentuna Energi & Miljö, och vi sköter kontakten.`,
      },
    ],
    grid: {
      operator: "Sollentuna Energi & Miljö",
      ownership: "Sollentuna Energi & Miljö, som ägs av kommunen, äger elnätet i Sollentuna.",
      tariff:
        "Sollentuna Energi & Miljö har effektavgift: en del av nätavgiften beror på hur mycket el du använder samtidigt och när på dygnet.",
      tariffShort: "Ja",
    },
    sources: [
      { title: "Elnät", publisher: "Sollentuna Energi & Miljö", url: "https://www.seom.se/el/elnat/" },
      { title: "Så funkar effektavgiften", publisher: "Sollentuna Energi & Miljö", url: "https://www.seom.se/elnat/priser-och-villkor/sa-funkar-effektavgiften/" },
      SRC_BYGGLOV,
      SRC_SCB,
    ],
    checkedAt: CHECKED_AT,
    neighbors: ["solna", "taby", "stockholm"],
  },
  {
    slug: "nacka",
    name: "Nacka",
    preposition: "i",
    region: "Nacka kommun · östra Stockholm",
    oneLiner: "Solceller i Nacka, med drönarbesiktning av taket före offert.",
    intro:
      "Nacka sträcker sig från Sickla och Henriksdal till Saltsjöbaden, Älta och Boo, med allt från radhus till stora villor. Elnätet är delat mellan två bolag: Nacka Energi i större delen av kommunen och Boo Energi i Saltsjö-Boo. Vilket bolag du har avgör både anmälan och nätavgift.",
    facts: [
      { k: "Befolkning", v: "112 112 (2024)" },
      { k: "Elområde", v: "SE3" },
      { k: "Nätägare", v: "Nacka Energi och Boo Energi" },
      { k: "Bygglov", v: "Krävs oftast inte" },
    ],
    localContext: [
      {
        title: "Två nätbolag i Nacka",
        body: `Nacka Energi, som ägs av Nacka kommun, har elnätet från Henriksdal till Skurusundet samt i Älta och Saltsjöbaden. Boo Energi har Saltsjö-Boo. Nacka Energi har haft effektavgift sedan 2020, medan Boo Energi har pausat sitt införande och tar ut en fast avgift efter säkringsstorlek. ${ANMALAN} Anmälningarna går till det bolag som har nätet där du bor.`,
      },
      {
        title: "Skugga och bygglov",
        body: `Ligger huset nära skog eller höga träd kan en eller ett par paneler skuggas delar av dagen. Då räknar vi på skuggningen i projekteringen och väljer en lösning där en skuggad panel inte drar ner resten av anläggningen. ${BYGGLOV_RULE}`,
      },
    ],
    grid: {
      operator: "Nacka Energi och Boo Energi",
      ownership:
        "Nacka Energi har elnätet från Henriksdal till Skurusundet samt i Älta och Saltsjöbaden. Boo Energi har Saltsjö-Boo.",
      tariff:
        "Nacka Energi har haft effektavgift sedan 2020. Boo Energi har pausat sitt införande och tar ut en fast avgift efter säkringsstorlek.",
      tariffShort: "Nacka Energi: ja · Boo Energi: nej",
    },
    sources: [
      { title: "Det här är Nacka Energi", publisher: "Nacka Energi", url: "https://www.nackaenergi.se/om-nacka-energi/det-har-ar-nacka-energi" },
      { title: "Frågor & svar om effektavgiften (uppdaterad 1 juli 2026)", publisher: "Nacka Energi", url: "https://www.nackaenergi.se/kundservice-och-faq/vara-elnatspriser/fragor--svar-om-effektavgiften" },
      { title: "Elnät", publisher: "Boo Energi", url: "https://www.booenergi.se/privat/elnat/" },
      { title: "Vi pausar införandet av effektavgifter", publisher: "Boo Energi", url: "https://www.booenergi.se/effektavgift/" },
      SRC_BYGGLOV,
      SRC_SCB,
    ],
    checkedAt: CHECKED_AT,
    neighbors: ["stockholm", "lidingo"],
  },
  {
    slug: "danderyd",
    name: "Danderyd",
    preposition: "i",
    region: "Danderyds kommun · norr om Stockholm",
    oneLiner: "Solceller i Danderyd, med omsorg om hur taket ser ut.",
    intro:
      "Danderyd består av kommundelarna Danderyd, Djursholm, Enebyberg och Stocksund. Här finns många äldre villor, och vi lägger vikt vid hur panelerna placeras på taket. E.ON ansvarar för elnätet i kommunen.",
    facts: [
      { k: "Befolkning", v: "32 425 (2024)" },
      { k: "Elområde", v: "SE3" },
      { k: "Nätägare", v: "E.ON Energidistribution" },
      { k: "Bygglov", v: "Krävs oftast inte" },
    ],
    localContext: [
      {
        title: "Paneler som passar huset",
        body: `Vi föreslår ofta helsvarta paneler, drar kablar dolt där det går och anpassar placeringen efter takets linjer. ${BYGGLOV_RULE} Danderyds kommun avgör vad som gäller för ditt hus.`,
      },
      {
        title: "Nät och batteri",
        body: `Enligt Danderyds kommun är det E.ON som ansvarar för elnätet. ${ANMALAN} Har huset hög förbrukning kan ett batteri löna sig: med solceller betalar det sig på ungefär 3–7 år.`,
      },
    ],
    grid: {
      operator: "E.ON Energidistribution",
      ownership: "Enligt Danderyds kommun är det E.ON som ansvarar för elnätet i kommunen.",
      tariff: null,
      tariffShort: null,
    },
    sources: [
      { title: "Fjärrvärme och elnät", publisher: "Danderyds kommun", url: "https://www.danderyd.se/bygga-bo-och-miljo/energi/fjarrvarme-och-elnat/" },
      SRC_BYGGLOV,
      SRC_SCB,
    ],
    checkedAt: CHECKED_AT,
    neighbors: ["solna", "taby", "stockholm"],
  },
];

export function findCity(slug: string): City | undefined {
  return CITIES.find((c) => c.slug === slug);
}

const MONTHS = [
  "januari", "februari", "mars", "april", "maj", "juni",
  "juli", "augusti", "september", "oktober", "november", "december",
];

/** "2026-11-10" -> "10 november 2026". */
export function formatCheckedAt(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}
