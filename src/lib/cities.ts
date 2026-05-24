/**
 * Stockholm-områdets kommuner där Optimera Energi installerar.
 *
 * Per kommun: unik intro-copy, lokal kontext (takorientering, bygglovsregler,
 * nätägare) och referenser till närliggande kommuner för intern länkning.
 * Genererar /solceller/[stad]-sidor som rankar på "solceller {stad}".
 */

export type CityFact = {
  k: string;
  v: string;
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
  /** Längre intro-copy, 80–120 ord, city-specifik. Visas i hero-sektionen. */
  intro: string;
  /** Fakta-bullets som visas som rutor under hero. */
  facts: CityFact[];
  /** Lokala förutsättningar – 2-3 stycken, 60-100 ord vardera. */
  localContext: { title: string; body: string }[];
  /** Slug:s för närliggande kommuner (för cross-linking). */
  neighbors: string[];
};

export const CITIES: City[] = [
  {
    slug: "solna",
    name: "Solna",
    preposition: "i",
    region: "Solna stad · 7 km från Stockholm City",
    oneLiner:
      "Solpaneler installerade i Solna av elektriker från Vallgatan 9.",
    intro:
      "Solna är Optimera Energis hemmakommun. Vårt kontor ligger på Vallgatan 9, och våra montörer kör från lagret i Solna ut till villaägarna i Bergshamra, Råsunda, Huvudsta, Hagalund och Järva. Eftersom vi själva bor här vet vi vilka taklutningar, skuggningsmönster och nätbolagsrutiner som gäller. Vi behöver inte räkna restid eller ta omvägar via underentreprenörer – när du bokar hembesök är det samma person som kommer förbi som driftsätter anläggningen senare.",
    facts: [
      { k: "Befolkning", v: "~85 000" },
      { k: "Nätägare", v: "Ellevio" },
      { k: "Solinstrålning", v: "~1 000 kWh/m²/år" },
      { k: "Vårt kontor", v: "Vallgatan 9" },
    ],
    localContext: [
      {
        title: "Bygglov i Solna",
        body:
          "För vanliga villatak inom detaljplan krävs ofta inget bygglov för solpaneler så länge de följer takfallet och inte ändrar byggnadens utseende väsentligt. Solna stad har en relativt rak hantering jämfört med en del andra Stockholm-kommuner. Vi hjälper dig med bygglovsansökan om din byggnad är kulturhistoriskt skyddad eller om panelerna ska placeras på fasad.",
      },
      {
        title: "Nät och elhandel",
        body:
          "Solna ligger i elområde SE3. Ellevio är nätägare för merparten av kommunen – föranmälan och färdiganmälan görs via deras installatörsportal. Vi sköter all kommunikation med Ellevio åt dig. Solna är gynnsamt för stödtjänster (FCR-D / aFRR) tack vare närheten till Stockholms balansansvariga aktörer.",
      },
    ],
    neighbors: ["sundbyberg", "stockholm", "danderyd", "sollentuna"],
  },
  {
    slug: "stockholm",
    name: "Stockholm",
    preposition: "i",
    region: "Stockholms stad · SE3",
    oneLiner:
      "Solpaneler installerade i Stockholm av elektriker med eget montageteam.",
    intro:
      "Stockholms innerstad är en sak, ytterstadens villaområden en helt annan. Vi installerar i Bromma, Spånga, Tensta, Hägersten, Älvsjö, Farsta, Skarpnäck och Enskede – där takfallen är breda och paneler får riktig solinstrålning. För kulturskyddade fastigheter i innerstaden tar vi diskussionen med Stadsbyggnadskontoret innan vi ens lämnar offert. Vi säger nej till installationer som inte fungerar, det är så vi bygger en hållbar affär över 25 år.",
    facts: [
      { k: "Befolkning", v: "~990 000" },
      { k: "Elområde", v: "SE3" },
      { k: "Nätägare", v: "Ellevio + Stockholm Exergi" },
      { k: "Solinstrålning", v: "~1 000 kWh/m²/år" },
    ],
    localContext: [
      {
        title: "Bygglov i Stockholms stad",
        body:
          "Stockholm stad kräver oftast inget bygglov för solpaneler inom detaljplan om panelerna följer takfallet. För fastigheter med kulturhistoriskt skydd, fasadinstallation eller om byggnadens utseende ändras väsentligt krävs ansökan. Vi tar dialogen med Stadsbyggnadskontoret åt dig och kan ofta avgöra inom en arbetsdag om bygglov behövs.",
      },
      {
        title: "Takförutsättningar",
        body:
          "Villaområden som Bromma, Hägersten, Älvsjö och Enskede har 70- och 80-talsvillor med sadeltak och pulpettak. Mansardtak finns mest i innerstaden. Vi gör drönarbesiktning på alla tak innan offert – inga schabloner, ingen gissning om vad som ryms.",
      },
    ],
    neighbors: ["solna", "sundbyberg", "lidingo", "nacka"],
  },
  {
    slug: "sundbyberg",
    name: "Sundbyberg",
    preposition: "i",
    region: "Sundbybergs stad · Sveriges minsta kommun till ytan",
    oneLiner:
      "Solpaneler installerade i Sundbyberg av elektriker från grannkommunen Solna.",
    intro:
      "Sundbyberg är Sveriges minsta kommun till ytan och en av Stockholmsområdets tätaste – många kunder bor i radhus, kedjehus och småhus med begränsad takyta. Vi specialiserar oss på att räkna fram exakt vilken paneluppsättning som ryms innan vi sätter en skruv. Bromsten, Hallonbergen, Ör och centrala Sundbyberg har alla olika takmönster och vi anpassar oss efter det.",
    facts: [
      { k: "Befolkning", v: "~55 000" },
      { k: "Elområde", v: "SE3" },
      { k: "Nätägare", v: "Ellevio" },
      { k: "Genomsnittlig takyta", v: "mindre än Solna" },
    ],
    localContext: [
      {
        title: "Optimerad placering på små tak",
        body:
          "I Sundbyberg är takytan oftast den begränsande faktorn, inte takets orientering. Vi dimensionerar för att maxa energi per kvadratmeter takyta snarare än absolut effekt. Det betyder JA Solar 500 W-paneler där det går (22,6 % effektivitet) och 455 W där takytan är ojämn.",
      },
      {
        title: "Bygglov och samfälligheter",
        body:
          "Många bostadsområden i Sundbyberg är organiserade som bostadsrättsföreningar eller samfälligheter. Vi hjälper styrelser och husägare att förstå vad som kräver styrelsegodkännande och vad som inte gör det innan vi går vidare med projektering.",
      },
    ],
    neighbors: ["solna", "stockholm", "sollentuna"],
  },
  {
    slug: "taby",
    name: "Täby",
    preposition: "i",
    region: "Täby kommun · 15 km norr om Stockholm City",
    oneLiner:
      "Solpaneler installerade i Täby av elektriker som tar med drönaren själv.",
    intro:
      "Täby är klassiskt villasverige med stora tomter, breda sadeltak och oftast bra söderläge. Här ligger förutsättningarna för solel på topp – och vi ser ofta installationer på 12–20 kW i Täby där det i Solna ryms 6–10 kW. Näsbypark, Roslags-Näsby, Viggbyholm, Gribbylund och Skarpäng är områden där vi installerat mest.",
    facts: [
      { k: "Befolkning", v: "~75 000" },
      { k: "Elområde", v: "SE3" },
      { k: "Nätägare", v: "Ellevio" },
      { k: "Vanlig anläggningsstorlek", v: "12–20 kW" },
    ],
    localContext: [
      {
        title: "Större anläggningar än snittet",
        body:
          "Täbys takytor klarar ofta 20+ paneler vilket gör batterilager och Solis 15 kW-växelriktare till standardval snarare än undantag. Med stödtjänster aktiverat hamnar årsekonomin på en helt annan nivå än för en mindre installation – ofta 15 000–25 000 kr i ren stödtjänstintäkt.",
      },
      {
        title: "Bygglov i Täby",
        body:
          "Täby har generellt sett en konstruktiv hantering av solpaneler. Bygglov krävs sällan inom detaljplan om panelerna följer takfallet. För Täby Park och nybyggnationer kan styrelsegodkännande eller områdesregler påverka, vilket vi reder ut innan offert.",
      },
    ],
    neighbors: ["solna", "danderyd", "sollentuna"],
  },
  {
    slug: "lidingo",
    name: "Lidingö",
    preposition: "på",
    region: "Lidingö stad · ö i Stockholms inlopp",
    oneLiner:
      "Solpaneler installerade på Lidingö av elektriker som klarar både villa och fritidshus.",
    intro:
      "Lidingö har en blandning av äldre villaområden och nybyggda fastigheter. Många hus är arkitektoniskt distinkta och vi har stor erfarenhet av att placera paneler så att de följer takets linjer snarare än stör dem. Skärsätra, Brevik, Sticklinge, Bodal och Larsberg är alla områden där vi installerat – och där vi ofta sätter mansardtak eller valmade tak i bilden.",
    facts: [
      { k: "Befolkning", v: "~48 000" },
      { k: "Elområde", v: "SE3" },
      { k: "Nätägare", v: "Ellevio" },
      { k: "Vanlig taktyp", v: "sadeltak, mansardtak" },
    ],
    localContext: [
      {
        title: "Estetiskt känsliga tak",
        body:
          "Lidingö stad har områden med kulturhistoriskt värde och vi tar alltid en diskussion med Stadsbyggnadskontoret innan vi lämnar offert om byggnaden är skyddad. Vi rekommenderar oftast helsvarta paneler (all-black) på Lidingö-tak eftersom kontrasten mot rödt eller plåttak ofta missklär.",
      },
      {
        title: "Lokalt nät och förbindelser",
        body:
          "Ellevio är nätägare för hela ön. Vi har gjort tillräckligt många installationer här för att veta vilka kabeldragningar som är värt extra arbete och vilka som inte är det. Vi tar med oss allt material från lagret i Solna – ingen omväg via underentreprenörer.",
      },
    ],
    neighbors: ["stockholm", "nacka", "danderyd"],
  },
  {
    slug: "sollentuna",
    name: "Sollentuna",
    preposition: "i",
    region: "Sollentuna kommun · norra Storstockholm",
    oneLiner:
      "Solpaneler installerade i Sollentuna av elektriker med eget lager i Solna.",
    intro:
      "Sollentuna är ett av Storstockholms snabbast växande villaområden – Edsberg, Helenelund, Häggvik, Rotebro och Tureberg har en mix av äldre 70-talsvillor och nybyggda hus. Vi installerar lika ofta små starter-anläggningar (10 paneler + 15 kWh batteri) som maxade hus med både värmepump, batteri och laddbox.",
    facts: [
      { k: "Befolkning", v: "~75 000" },
      { k: "Elområde", v: "SE3" },
      { k: "Nätägare", v: "Ellevio" },
      { k: "Genomsnittlig anläggning", v: "10–18 kW" },
    ],
    localContext: [
      {
        title: "Helhetsprojekt vanligt",
        body:
          "I Sollentuna ser vi att kunder ofta tar hela paketet på en gång – sol, batteri och värmepump i samma projekt. Det är mer ekonomiskt än att dela upp i flera installationer, och vi kan optimera dimensioneringen av växelriktare, batterikapacitet och värmepumpens elbehov tillsammans.",
      },
      {
        title: "Bygglov och kommun",
        body:
          "Sollentuna kommun har en effektiv handläggning av solanmälningar. Bygglov krävs sällan men anmälan ska göras. Vi sköter all kommunikation med både kommun och nätägare.",
      },
    ],
    neighbors: ["solna", "taby", "stockholm"],
  },
  {
    slug: "nacka",
    name: "Nacka",
    preposition: "i",
    region: "Nacka kommun · östra Stockholm",
    oneLiner:
      "Solpaneler installerade i Nacka av elektriker med drönarbesiktning på varje tak.",
    intro:
      "Nacka är en av landets största kommuner till ytan och har allt från radhus i Sickla till stora villor i Saltsjöbaden, Älta och Boo. Vi gör drönarbesiktning på varje tak innan offert – det är enda sättet att veta vilken effekt vi faktiskt kan installera utan att gissa.",
    facts: [
      { k: "Befolkning", v: "~110 000" },
      { k: "Elområde", v: "SE3" },
      { k: "Nätägare", v: "Vattenfall Eldistribution" },
      { k: "Yta", v: "Stockholms-områdets största" },
    ],
    localContext: [
      {
        title: "Vattenfall som nätägare",
        body:
          "Nacka avviker från flertalet Storstockholm-kommuner genom att Vattenfall Eldistribution är nätägare (inte Ellevio). Vi har full erfarenhet av Vattenfalls installatörsportal, föranmälan och färdiganmälan – kunden märker ingen skillnad.",
      },
      {
        title: "Skogsskuggning ett krav",
        body:
          "Nacka har mycket skogsmark inblandat och vi ser ofta tak där 1-2 paneler skuggas under delar av dagen. Vi använder MPPT-optimerare eller mikroväxelriktare där det krävs så att en skuggad panel inte drar ner hela strängens produktion.",
      },
    ],
    neighbors: ["stockholm", "lidingo"],
  },
  {
    slug: "danderyd",
    name: "Danderyd",
    preposition: "i",
    region: "Danderyds kommun · norr om Stockholm City",
    oneLiner:
      "Solpaneler installerade i Danderyd av elektriker som tar premiumtak på allvar.",
    intro:
      "Danderyd har Sveriges högsta andel villaägare och en stor del av husen är arkitektoniskt distinkta. I Stocksund, Djursholm och Enebyberg har vi installerat på allt från klassiska tegelförsedda 30-talsvillor till moderna platta tak. Vi rekommenderar nästan alltid all-black-paneler här – kontrasten är värd det estetiska lyftet.",
    facts: [
      { k: "Befolkning", v: "~33 000" },
      { k: "Elområde", v: "SE3" },
      { k: "Nätägare", v: "Ellevio" },
      { k: "Vanlig taktyp", v: "sadeltak, valmat tak" },
    ],
    localContext: [
      {
        title: "Estetik på premium-nivå",
        body:
          "Danderyd-kunder lägger ofta värde på hur installationen ser ut, inte bara hur den presterar. Vi använder all-black-paneler, dolda kabeldragningar och anpassar montagebleck efter takets linjer. Det kostar lite mer i material men ger en installation som du faktiskt vill visa upp.",
      },
      {
        title: "Större batterier än snittet",
        body:
          "Danderyd-villor har ofta hög elförbrukning och bra plats för batterilager. Easyway 46–61 kWh och SAJ HS3 20 kWh är vanliga val. Stödtjänster (FCR-D) gör att batteriets återbetalningstid kommer ner under tre år i många fall.",
      },
    ],
    neighbors: ["solna", "taby", "stockholm"],
  },
];

export function findCity(slug: string): City | undefined {
  return CITIES.find((c) => c.slug === slug);
}
