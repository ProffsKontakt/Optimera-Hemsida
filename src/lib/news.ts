/**
 * Nyhetssektionen på /nyheter – kunskapsbas för energinyheter som påverkar
 * villaägare: valet 2026, elpriser, stöd och avdrag.
 *
 * Status:
 *   "published" – indexeras, ligger i sitemap, visas klickbar på hubben
 *   "draft"     – noindex, exkluderas från sitemap, "Snart" på hubben
 *
 * Publiceringsflöde: ny artikel var tredje dag. Utkastet går ut för
 * godkännande (Viktor/Julian) via draft-PR + mejl innan merge – inget
 * publiceras på sajten utan godkännande.
 *
 * Metadata här, brödtext i news-content.ts – samma mönster som guides.ts.
 */

export type NewsStatus = "published" | "draft";

export type NewsSource = {
  title: string;
  publisher: string;
  url: string;
};

export type NewsCategory =
  | "Valet 2026"
  | "Elpriser"
  | "Stöd & avdrag"
  | "Energipolitik"
  | "Marknad";

export type NewsArticle = {
  slug: string;
  status: NewsStatus;
  title: string;
  excerpt: string;
  category: NewsCategory;
  /** Första publiceringsdatum (ISO). Styr sorteringen på hubben. */
  publishedAt: string;
  /** Bumpas bara när innehållet faktiskt ändras (lastmod i sitemap). */
  updatedAt: string;
  /** Estimerad lästid i minuter. */
  readTimeMin: number;
  /**
   * Hero-bild som visas ovanför rubriken på kortet och artikeln, samt som
   * OG-/schema-bild. Ligger versionshanterad i public/news/ så att bilden
   * granskas i samma PR som texten. Kan ersättas via media-CMS:en
   * (slot "news:<slug>") utan kodändring.
   */
  image?: { src: string; alt: string };
  /**
   * Sökfrågor artikeln är skriven för att besvara, hämtade från aktuella
   * söktrender (Google-autocomplete sv/SE) vid publicering. Frågorna ska
   * återfinnas ordagrant eller nära ordagrant i rubrik, H2:or eller FAQ.
   * Läggs som keywords i NewsArticle-schemat.
   */
  searchPhrases?: string[];
  /**
   * Källorna artikeln bygger på. Visas i artikelns källblock och läggs i
   * NewsArticle-schemats citation – trovärdighetssignal för läsare,
   * Google och AI-search.
   */
  sources: NewsSource[];
};

export const NEWS: NewsArticle[] = [
  {
    slug: "elnatsavgift-2027-flaskhalsintakter-8-miljarder",
    status: "published",
    title:
      "Sänks elnätsavgiften 2027? 8,3 miljarder i flaskhalspengar – men ingen automatisk rabatt för hushållen",
    excerpt:
      "Svenska kraftnät använder drygt 8,3 miljarder kronor i flaskhalsintäkter för att sänka stamnätsavgifterna från den 1 januari 2027. Men pengarna går till nätbolagen, inte till hushållen – och den fasta stamnätsavgiften höjs ändå med cirka 20 procent i snitt. Vi förklarar vad flaskhalsintäkter är, om elnätsavgiften kommer att höjas och vad som händer med pengarna efter valet.",
    category: "Energipolitik",
    publishedAt: "2026-10-09",
    updatedAt: "2026-10-09",
    readTimeMin: 7,
    image: {
      src: "/news/elnatsavgift-2027-flaskhalsintakter-8-miljarder.jpg",
      alt: "Fyra stående solpaneler med blankt svart glas som speglar moln och sol, med kraftledningsstolpar över gula fält i bakgrunden",
    },
    searchPhrases: [
      "elnätsavgift 2027",
      "sänkt elnätsavgift",
      "kommer elnätsavgiften höjas",
      "varför är elnätsavgiften så hög",
      "flaskhalsintäkter",
      "flaskhalsintäkter vad är det",
      "flaskhalsintäkter svenska kraftnät",
      "transmissionsnät regionnät lokalnät",
    ],
    sources: [
      {
        title:
          "Svenska kraftnät använder flaskhalsinkomster för att minska avgifter med 8,3 miljarder kronor",
        publisher: "Svenska kraftnät",
        url: "https://www.svk.se/press-och-nyheter/nyheter/allmanna-nyheter/2026/svenska-kraftnat-anvander-flaskhalsinkomster-for-att-minska-avgifter-med-83-miljarder-kronor/",
      },
      {
        title: "Beslutad transmissionsnätsavgift och avgifter för balansansvariga parter 2027",
        publisher: "Svenska kraftnät",
        url: "https://www.svk.se/press-och-nyheter/nyheter/elmarknad-allmant/2026/beslutad-transmissionsnatsavgift-och-avgifter-for-balansansvariga-parter-2027/",
      },
      {
        title: "Om flaskhalsinkomster",
        publisher: "Svenska kraftnät",
        url: "https://www.svk.se/om-kraftsystemet/om-elmarknaden/elomraden/om-flaskhalsinkomster/",
      },
      {
        title: "Flaskhalsinkomster används för att stärka elnätet",
        publisher: "Svenska kraftnät",
        url: "https://www.svk.se/om-kraftsystemet/om-elmarknaden/elomraden/om-flaskhalsinkomster/flaskhalsinkomster-anvands-for-att-starka-elnatet/",
      },
      {
        title: "E.ON kommenterar: Rätt att flaskhalsintäkterna kommer elnätskunderna till del",
        publisher: "E.ON",
        url: "https://via.tt.se/pressmeddelande/4575218/eon-kommenterar-ratt-att-flaskhalsintakterna-kommer-elnatskunderna-till-del?lang=sv",
      },
      {
        title:
          "Svenska kraftnät får i uppdrag att beräkna överskott av flaskhalsinkomster och föreslå hur de ska användas",
        publisher: "Regeringen",
        url: "https://regeringen.se/pressmeddelanden/2026/09/svenska-kraftnat-far-i-uppdrag-att-berakna-overskott-av-flaskhalsinkomster-och-foresla-hur-de-ska-anvandas/",
      },
      {
        title: "Nytt regeringsuppdrag: Nya användningsområden för flaskhalsinkomster",
        publisher: "Energimarknadsinspektionen",
        url: "https://ei.se/om-oss/nyheter/2026/2026-01-16-nytt-regeringsuppdrag-nya-anvandningsomraden-for-flaskhalsinkomster",
      },
      {
        title: "Talmannens sonderingsuppdrag till Magdalena Andersson återupptas",
        publisher: "Sveriges riksdag",
        url: "https://www.riksdagen.se/sv/aktuellt/aktuelltnotiser/2026/okt/2/talmannens-sonderingsuppdrag-till-magdalena_cms77150d24-8e8b-479f-9da0-8df5bf84b9b6sv/",
      },
      {
        title: "Partiernas energipolitik inför valet 2026",
        publisher: "Elbruk",
        url: "https://www.elbruk.se/blogg/partiernas-energipolitik-2026",
      },
      {
        title: "Elmarknaden just nu: Svängiga elpriser inför uppvärmningssäsongen",
        publisher: "Vattenfall",
        url: "https://news.cision.com/se/vattenfall/r/elmarknaden-just-nu--svangiga-elpriser-infor-uppvarmningssasongen,c4403328",
      },
    ],
  },
  {
    slug: "varfor-ar-elpriset-sa-hogt-just-nu-oktober-2026",
    status: "published",
    title:
      "Varför är elpriset så högt just nu? September dyrast i söder sedan 2022 – och oktober pekar ännu högre",
    excerpt:
      "Elpriset i SE4 steg 49 procent från augusti till september, till 120 öre per kilowattimme – det dyraste i södra Sverige sedan december 2022. För oktober pekar marknaden mot omkring 140 öre. Vi reder ut varför, om elpriset kommer att stiga mer i vinter och om man ska binda elpriset nu – elområde för elområde.",
    category: "Elpriser",
    publishedAt: "2026-10-06",
    updatedAt: "2026-10-06",
    readTimeMin: 8,
    image: {
      src: "/news/varfor-ar-elpriset-sa-hogt-just-nu-oktober-2026.jpg",
      alt: "Fyra stående solpaneler med blankt svart glas som speglar sol och moln på ett rött tegeltak, med vit skorsten och gula höstträd mot blå himmel",
    },
    searchPhrases: [
      "varför är elpriset så högt just nu",
      "varför är elpriset så högt i område 4",
      "varför stiger elpriset nu",
      "elpriset september",
      "elpris oktober",
      "kommer elpriset att stiga",
      "kärnkraft revision 2026",
      "ska man binda elpriset nu",
      "binda elpriset över vintern",
    ],
    sources: [
      {
        title:
          "E.ONs elprisexpert: Elpriset i södra Sverige högst sedan 2022 – väntas stiga ytterligare i oktober",
        publisher: "E.ON",
        url: "https://via.tt.se/pressmeddelande/4578878/eons-elprisexpert-elpriset-i-sodra-sverige-hogst-sedan-2022-vantas-stiga-ytterligare-i-oktober?lang=sv",
      },
      {
        title: "Elmarknaden just nu: Svängiga elpriser inför uppvärmningssäsongen",
        publisher: "Vattenfall",
        url: "https://news.cision.com/se/vattenfall/r/elmarknaden-just-nu--svangiga-elpriser-infor-uppvarmningssasongen,c4403328",
      },
      {
        title: "Billigaste elavtalet i vinter – där du bor",
        publisher: "Elskling (Zmarta)",
        url: "https://www.mynewsdesk.com/se/zmarta/pressreleases/billigaste-elavtalet-i-vinter-daer-du-bor-3470568",
      },
      {
        title: "Kraftläget i Sverige, vecka 39 2026",
        publisher: "Energiföretagen Sverige",
        url: "https://www.energiforetagen.se/globalassets/energiforetagen/statistik/kraftlaget/tidigare-kraftlagen/2026/kraftlaget-sverige-veckorapport-vecka-2026-39.pdf",
      },
      {
        title: "Day-ahead-priser SE1–SE4, månads- och dygnsmedel 2026",
        publisher: "Nord Pool",
        url: "https://data.nordpoolgroup.com/auction/day-ahead/prices?deliveryDate=2026-10-06&currency=SEK&aggregation=Monthly&deliveryAreas=SE1,SE2,SE3,SE4",
      },
      {
        title: "Så blir elpriserna hösten och vintern 2026",
        publisher: "Tibber",
        url: "https://tibber.com/se/magazine/power-hacks/elpriser-host-vinter",
      },
      {
        title: "Så fungerar skattereduktionen för grön teknik",
        publisher: "Skatteverket",
        url: "https://www.skatteverket.se/privat/fastigheterochbostad/gronteknik/safungerarskattereduktionenforgronteknik.4.676f4884175c97df4192870.html",
      },
    ],
  },
  {
    slug: "andersson-sonderar-igen-statsministeromrostning-tidslinje",
    status: "published",
    title:
      "När blir det ny regering? Andersson sonderar igen – statsministeromröstning tidigast 14 oktober",
    excerpt:
      "Efter en vecka där ingen ville ta sonderingsuppdraget fick Magdalena Andersson tillbaka det i fredags. Nu finns en tidslinje för ny regering 2026: formell start den 5 oktober, återrapport senast den 12:e och statsministeromröstning tidigast den 14 oktober. Vi förklarar vad ett sonderingsuppdrag är, hur omröstningen går till och vad det betyder för dina elstöd.",
    category: "Valet 2026",
    publishedAt: "2026-10-03",
    updatedAt: "2026-10-03",
    readTimeMin: 6,
    image: {
      src: "/news/andersson-sonderar-igen-statsministeromrostning-tidslinje.jpg",
      alt: "Stående solpaneler i rad mot djupblå hösthimmel medan röda och gula löv virvlar förbi",
    },
    searchPhrases: [
      "när blir det ny regering efter valet",
      "ny regering 2026",
      "vem blir statsminister",
      "statsministeromröstning",
      "sonderingsuppdrag mening",
      "hur många statsministeromröstningar innan nyval",
      "extra val 2026",
      "regeringsbildning 2026",
      "längsta regeringsbildningen",
    ],
    sources: [
      {
        title: "Talmannen håller pressträff om sonderingsuppdraget",
        publisher: "TV4 Nyheterna",
        url: "https://www.tv4.se/artikel/1vTaygMHQHj4VhfJdYJuDO/talmannen-haller-presstraeff",
      },
      {
        title: "Regeringsbildningen: Inget besked från talmannen",
        publisher: "SVT Nyheter",
        url: "https://www.svt.se/nyheter/inrikes/senaste-nytt-om-val-2026?inlagg=35b63a7593913e1fe10c18489bde5660",
      },
      {
        title: "”Vill ingen bilda regering?” Talmannen inleder nya samtal",
        publisher: "SVT Nyheter",
        url: "https://www.svt.se/nyheter/inrikes/vill-ingen-bilda-regering-talmannen-inleder-nya-samtal",
      },
      {
        title:
          "Analys: ”Frågan är när talmannen tar till sitt skarpaste vapen”",
        publisher: "SVT Nyheter",
        url: "https://www.svt.se/nyheter/inrikes/fragan-ar-nar-talmannen-tar-till-sitt-skarpaste-vapen",
      },
      {
        title: "Så bildas regeringen",
        publisher: "Sveriges riksdag",
        url: "https://www.riksdagen.se/sv/sa-fungerar-riksdagen/demokrati/sa-bildas-regeringen/",
      },
      {
        title: "Extra val",
        publisher: "Sveriges riksdag",
        url: "https://www.riksdagen.se/sv/sa-fungerar-riksdagen/demokrati/val-till-riksdagen/extra-val/",
      },
      {
        title: "Ny bok: 134 dagar – om regeringsbildningen efter valet 2018",
        publisher: "Lunds universitet",
        url: "https://www.svet.lu.se/artikel/ny-bok-134-dagar-om-regeringsbildningen-efter-valet-2018",
      },
      {
        title: "Ödesdatumet: Då får M göra budgeten på walk-over",
        publisher: "Dagens PS",
        url: "https://www.dagensps.se/varlden/politik/odesdatumet-da-far-m-gora-budgeten-pa-walk-over/",
      },
      {
        title: "Så fungerar skattereduktionen för grön teknik",
        publisher: "Skatteverket",
        url: "https://www.skatteverket.se/privat/fastigheterochbostad/gronteknik/safungerarskattereduktionenforgronteknik.4.676f4884175c97df4192870.html",
      },
      {
        title: "Vad händer med priset på solpaneler och batterier hösten 2026?",
        publisher: "Senergia",
        url: "https://senergia.se/teknikblogg/vad-hander-med-priset-pa-solpaneler-och-batterier-hosten-2026/",
      },
    ],
  },
  {
    slug: "regeringsbildningen-last-budgeten-12-november-elstoden",
    status: "published",
    title:
      "Grönt avdrag 2027: budgeten ska läggas senast 12 november – med eller utan ny regering",
    excerpt:
      "Vad händer med grönt avdrag 2027? Det avgörs i budgeten – och den måste lämnas till riksdagen senast den 12 november, mitt i en regeringsbildning där sonderingarna nyss börjat om. Utan ny regering blir det en avskalad övergångsbudget utan nya reformer. Vi går igenom vad det betyder för grönt avdrag, elstöden, elpriset i vinter och din kalkyl.",
    category: "Stöd & avdrag",
    publishedAt: "2026-10-03",
    updatedAt: "2026-10-03",
    readTimeMin: 6,
    image: {
      src: "/news/regeringsbildningen-last-budgeten-12-november-elstoden.jpg",
      alt: "Glansiga solpaneler speglar en molnstrimmig kvällshimmel, gula höstlöv i förgrunden",
    },
    searchPhrases: [
      "grönt avdrag 2027",
      "hur länge kommer grönt avdrag finnas",
      "budgetpropositionen 2027",
      "när kommer budgeten",
      "vad är en övergångsregering",
      "hur blir elpriset i vinter",
      "elpriset i vinter 2026",
      "högkostnadsskydd el",
    ],
    sources: [
      {
        title: "Talmannen: ”Nya överläggningar på onsdag”",
        publisher: "SVT Nyheter",
        url: "https://www.svt.se/nyheter/inrikes/senaste-nytt-om-val-2026?inlagg=36b70af1d85eb57ba1bb10ede03bc902",
      },
      {
        title: "Talmansvalet i Sverige 2026",
        publisher: "Wikipedia",
        url: "https://sv.wikipedia.org/wiki/Talmansvalet_i_Sverige_2026",
      },
      {
        title: "Talmannen inleder process för regeringsbildning",
        publisher: "Sveriges riksdag",
        url: "https://www.riksdagen.se/sv/aktuellt/aktuelltnotiser/2026/sep/17/talmannen-inleder-process-for-regeringsbildning_cms6291f93c-a728-4498-a0b9-e30f36627e3fsv/",
      },
      {
        title: "Talmannen håller pressträff om sonderingsuppdraget",
        publisher: "TV4 Nyheterna",
        url: "https://www.tv4.se/artikel/1vTaygMHQHj4VhfJdYJuDO/talmannen-haller-presstraeff",
      },
      {
        title: "Ödesdatumet: Då får M göra budgeten på walk-over",
        publisher: "Dagens PS",
        url: "https://www.dagensps.se/varlden/politik/odesdatumet-da-far-m-gora-budgeten-pa-walk-over/",
      },
      {
        title: "Så fungerar skattereduktionen för grön teknik",
        publisher: "Skatteverket",
        url: "https://www.skatteverket.se/privat/fastigheterochbostad/gronteknik/safungerarskattereduktionenforgronteknik.4.676f4884175c97df4192870.html",
      },
      {
        title: "Partiernas energipolitik inför valet 2026",
        publisher: "Elbruk",
        url: "https://www.elbruk.se/blogg/partiernas-energipolitik-2026",
      },
      {
        title: "Så blir elpriserna hösten och vintern 2026",
        publisher: "Tibber",
        url: "https://tibber.com/se/magazine/power-hacks/elpriser-host-vinter",
      },
      {
        title: "Vad händer med priset på solpaneler och batterier hösten 2026?",
        publisher: "Senergia",
        url: "https://senergia.se/teknikblogg/vad-hander-med-priset-pa-solpaneler-och-batterier-hosten-2026/",
      },
    ],
  },
  {
    slug: "kina-fasar-ut-exportrabatter-batteripriser-2027",
    status: "published",
    title:
      "Kina fasar ut exportrabatterna: batterier kan få högre priser efter årsskiftet",
    excerpt:
      "Kinas momsrabatter för exporterade solceller försvann i våras – och för batterier trappas de ned i år och försvinner helt den 1 januari 2027. Branschen väntar sig stigande hårdvarupriser. Vi förklarar mekanismen, brasklapparna och vad det betyder för dig som funderar på batteri, samtidigt som riksdagen väljer talman i morgon.",
    category: "Marknad",
    publishedAt: "2026-09-27",
    updatedAt: "2026-09-27",
    readTimeMin: 6,
    image: {
      src: "/news/kina-fasar-ut-exportrabatter-batteripriser-2027.jpg",
      alt: "Kinesisk flagga vajar framför ett stort fabrikskomplex i rödorange kvällsljus",
    },
    sources: [
      {
        title:
          "Nya händelser i Kina påverkar priset på solpaneler och batterier under 2026",
        publisher: "Senergia",
        url: "https://senergia.se/nyheter/nya_handelser_i_kina_paverkar_priset_pa_batterier_och_solpaneler_2026/",
      },
      {
        title: "Vad händer med priset på solpaneler och batterier hösten 2026?",
        publisher: "Senergia",
        url: "https://senergia.se/teknikblogg/vad-hander-med-priset-pa-solpaneler-och-batterier-hosten-2026/",
      },
      {
        title: "Nya politiska och ekonomiska beslut i Kina",
        publisher: "Luma Energy",
        url: "https://luma.energy/om-luma/nyheter/nya-politiska-och-ekonomiska-beslut-i-kina/",
      },
      {
        title:
          "Photovoltaics: China will abolish export subsidies from April 1, 2026",
        publisher: "Xpert Digital",
        url: "https://xpert.digital/en/china-abolishes-export-subsidies",
      },
      {
        title: "Magdalena Andersson (S) får sonderingsuppdrag: \"Stor ödmjukhet\"",
        publisher: "SVT Nyheter",
        url: "https://www.svt.se/nyheter/inrikes/magdalena-andersson-s-far-sonderingsuppdrag-stor-odmjukhet",
      },
      {
        title: "Efter valet – vad händer nu?",
        publisher: "SVT Nyheter",
        url: "https://www.svt.se/nyheter/inrikes/efter-valet-vad-hander-nu",
      },
      {
        title: "Talmansvalet kan ge fingervisning om nästa regering",
        publisher: "Altinget",
        url: "https://www.altinget.se/artikel/talmansvalet-kan-ge-fingervisning-om-nasta-regering",
      },
    ],
  },
  {
    slug: "vinterns-elpriser-2026-prognos-dyrare-soder",
    status: "published",
    title:
      "Prognosen för vintern: 100–110 öre/kWh i söder – upp till 9 000 kr dyrare för en villa",
    excerpt:
      "Marknadens vinterprognos är dyster för södra Sverige: 100–110 öre per kilowattimme i elhandelspris för oktober–december enligt Tibber, och 6 800–9 000 kronor mer än förra vintern för en normalvilla enligt E.ON. Samtidigt är regeringsbildningen låst. Vi går igenom siffrorna, riskfaktorerna – och det du faktiskt kan styra själv före kylan.",
    category: "Elpriser",
    publishedAt: "2026-09-24",
    updatedAt: "2026-10-03",
    readTimeMin: 6,
    image: {
      src: "/news/vinterns-elpriser-2026-prognos-dyrare-soder.jpg",
      alt: "Grå svensk trävilla med solpaneler i kallt eftermiddagsljus med frost på gräsmattan",
    },
    sources: [
      {
        title:
          "E.ONs elprisexpert: Vinterhalvåret kan bli tusenlappar dyrare för hushåll i södra Sverige",
        publisher: "E.ON",
        url: "https://via.tt.se/pressmeddelande/4550366/eons-elprisexpert-vinterhalvaret-kan-bli-tusenlappar-dyrare-for-hushall-i-sodra-sverige?lang=sv",
      },
      {
        title: "Så blir elpriserna hösten och vintern 2026",
        publisher: "Tibber",
        url: "https://tibber.com/se/magazine/power-hacks/elpriser-host-vinter",
      },
      {
        title: "Prognos: Här kan fast elpris slå rörligt i vinter",
        publisher: "Elskling",
        url: "https://www.elskling.se/tips-rad/nyheter/elavtal-fast-elpris-kan-sla-rorligt-i-sodra-sverige",
      },
      {
        title: "Dessa svenskar kan få 9 000 kronor dyrare el i vinter",
        publisher: "Dagens PS",
        url: "https://www.dagensps.se/privatekonomi/dessa-svenskar-kan-fa-9-000-kronor-dyrare-el-i-vinter/",
      },
      {
        title: "Talmannen ger Andersson (S) uppdraget att bilda regering",
        publisher: "SVT Nyheter",
        url: "https://www.svt.se/nyheter/inrikes/senaste-nytt-om-val-2026?inlagg=f3b2f667fdf077c25b2339423849bf8b",
      },
      {
        title: "Talmannen: Partier bör vara redo överge röda linjer",
        publisher: "SVT Nyheter",
        url: "https://www.svt.se/nyheter/inrikes/senaste-nytt-om-val-2026?inlagg=558bc2f02e92727582fcca417f52fb78",
      },
      {
        title: "Då kan elpriserna gå upp igen: \"Dominoeffekter\"",
        publisher: "SVT Nyheter",
        url: "https://www.svt.se/nyheter/inrikes/da-kan-elpriserna-ga-upp-igen-dominoeffekter",
      },
    ],
  },
  {
    slug: "valresultatet-faststallt-176-173-vad-hander-nu-elen",
    status: "published",
    title:
      "Valresultatet är fastställt: 176–173. Nu avgörs allt i riksdagen – det här betyder det för din el",
    excerpt:
      "Valmyndigheten fastställde valresultatet den 19 september: S, MP, V och C samlar 176 mandat mot Tidöpartiernas 173, och valdeltagandet steg till 84,9 procent. Men mandat är inte en regering – avgörandet flyttar nu till riksdagen. Vi går igenom tidsplanen och vad som gäller för dina stöd och din elräkning under tiden.",
    category: "Valet 2026",
    publishedAt: "2026-09-21",
    updatedAt: "2026-09-21",
    readTimeMin: 5,
    image: {
      src: "/news/valresultatet-faststallt-176-173-vad-hander-nu-elen.jpg",
      alt: "Frost som smälter till glittrande droppar på glansiga solpaneler i lågt morgonljus",
    },
    sources: [
      {
        title: "Valresultat fastställt i 2026 års riksdagsval",
        publisher: "Valmyndigheten",
        url: "https://www.val.se/servicelankar/servicelankar/pressrum/nyheter--pressmeddelanden/pressmeddelande-nya/2026-09-19-valresultat-faststallt-i-2026-ars-riksdagsval",
      },
      {
        title: "Den nya riksdagen efter valet",
        publisher: "Sveriges riksdag",
        url: "https://www.riksdagen.se/sv/aktuellt/aktuelltnotiser/2026/sep/19/den-nya-riksdagen-efter-valet_cmsad780a37-f1ae-4d47-a4a7-b6ea2a69a21esv/",
      },
      {
        title: "Valmyndigheten: Resultatet fastställt",
        publisher: "SVT Nyheter",
        url: "https://www.svt.se/nyheter/inrikes/senaste-nytt-om-val-2026?inlagg=e61012eb5d0beccaf28656645890dcc6",
      },
      {
        title: "Valresultat 2026",
        publisher: "SVT Nyheter",
        url: "https://valresultat.svt.se/2026/",
      },
      {
        title: "Valresultatet för riksdagsvalet fastställt",
        publisher: "Kuriren/TT",
        url: "https://www.kuriren.nu/nyheter/sverige/artikel/valresultatet-for-riksdagsvalet-faststallt/l61z3gvj",
      },
      {
        title: "Senaste nytt om valet 2026",
        publisher: "SVT Nyheter",
        url: "https://www.svt.se/nyheter/inrikes/senaste-nytt-om-val-2026",
      },
    ],
  },
  {
    slug: "effektavgifter-2026-stoppat-krav-ny-modell-batteri",
    status: "published",
    title:
      "Effektavgifterna är i limbo: kravet stoppat, ny modell dröjer – och nätbolagen väljer själva",
    excerpt:
      "Kravet på effekttariffer i alla elnät stoppades i våras och Energimarknadsinspektionen tar fram en ny modell – klar tidigast våren 2027, på en ny regerings bord. Samtidigt väljer nätbolagen själva: de som infört effektavgifter får behålla dem, medan Ellevio tog bort sin den 1 juni. Vi reder ut vad som gäller för din nätfaktura och varför batteriet blivit det säkraste skyddet.",
    category: "Elpriser",
    publishedAt: "2026-09-18",
    updatedAt: "2026-10-03",
    readTimeMin: 6,
    image: {
      src: "/news/effektavgifter-2026-stoppat-krav-ny-modell-batteri.jpg",
      alt: "Gul svensk trävilla i skymning med solcellstak och varmt ljus i fönstren",
    },
    sources: [
      {
        title: "Krav på införande av effektavgifter stoppas",
        publisher: "Regeringen",
        url: "https://www.regeringen.se/pressmeddelanden/2026/03/krav-pa-inforande-av-effektavgifter-stoppas/",
      },
      {
        title:
          "Uppdrag till Energimarknadsinspektionen att upphäva föreskrifter och lämna förslag om en ny utformning av effektavgifterna",
        publisher: "Regeringen",
        url: "https://www.regeringen.se/regeringsuppdrag/2026/03/uppdrag-till-energimarknadsinspektionen-att-upphava-foreskrifter-och-lamna-forslag-om-en-ny-utformning-av-effektavgifterna/",
      },
      {
        title:
          "Ei har fått i uppdrag att ta fram en ny modell för effektavgifter och upphäva befintliga föreskrifter",
        publisher: "Energimarknadsinspektionen",
        url: "https://ei.se/om-oss/nyheter/2026/2026-03-13-ei-har-fatt-i-uppdrag-att-ta-fram-en-ny-modell-for-effektavgifter-och-upphava-befintliga-foreskrifter",
      },
      {
        title: "Effektavgifter",
        publisher: "Energimarknadsinspektionen",
        url: "https://ei.se/konsument/el/elnatsavgiften-och-elnatsreglering/effektavgifter",
      },
      {
        title: "Nya effekttariffer väcker oro",
        publisher: "Fastighetstidningen",
        url: "https://fastighetstidningen.se/nyhet/nya-effekttariffer-vacker-oro/",
      },
      {
        title: "Kommentar: krav på införande av effekttariffer stoppas",
        publisher: "Energiföretagen Sverige",
        url: "https://www.energiforetagen.se/pressrum/nyheter/2026/mars/kommentar-krav-pa-inforande-av-effekttariffer-stoppas",
      },
      {
        title: "Senaste nytt om valet 2026",
        publisher: "SVT Nyheter",
        url: "https://www.svt.se/nyheter/inrikes/senaste-nytt-om-val-2026",
      },
      {
        title: "Nätavgifter: Ellevio tar bort effektavgiften och återgår till välkänd prismodell",
        publisher: "Ellevio",
        url: "https://www.ellevio.se/nyheter/ellevio-i-media/natavgifter-ellevio-tar-bort-effektavgiften-och-atergar-till-valkand-prismodell/",
      },
      {
        title: "Prismodell utan effektavgift",
        publisher: "Ellevio",
        url: "https://www.ellevio.se/abonnemang/prismodell-utan-effektavgift/",
      },
    ],
  },
  {
    slug: "efter-valet-2026-rysarjamnt-vad-hander-med-elen",
    status: "published",
    title:
      "Rysarjämnt efter valet: regeringsfrågan öppen – det här gäller för din el nu",
    excerpt:
      "Rödgröna 176 mandat mot Tidöpartiernas 173 i den preliminära räkningen, slutresultatet dröjer och talman väljs först den 28 september. Vi reder ut vad det ovissa läget faktiskt betyder för avdrag, elpriser och dig som funderar på solceller eller batteri.",
    category: "Valet 2026",
    publishedAt: "2026-09-15",
    updatedAt: "2026-09-15",
    readTimeMin: 6,
    image: {
      src: "/news/efter-valet-2026-rysarjamnt-vad-hander-med-elen.jpg",
      alt: "Svensk villagata i skymning med solpaneler på taken och varmt ljus i fönstren",
    },
    sources: [
      {
        title: "Rysarjämnt i valet – oppositionen leder knappt",
        publisher: "SVT Nyheter",
        url: "https://www.svt.se/nyheter/inrikes/rysarjamnt-i-valet-oppositionen-leder-knappt",
      },
      {
        title: "Senaste nytt om valet 2026",
        publisher: "SVT Nyheter",
        url: "https://www.svt.se/nyheter/inrikes/senaste-nytt-om-val-2026",
      },
      {
        title: "Valresultat 2026 – riksdag, region och kommun",
        publisher: "Valmyndigheten",
        url: "https://www.val.se/english/election-results/elections-to-the-riksdag-and-regional-and-municipal-councils/election-results-2026",
      },
      {
        title: "Valresultat 2026",
        publisher: "SVT Nyheter",
        url: "https://valresultat.svt.se/2026/",
      },
      {
        title:
          "Sveriges val – tryggare och högre eller lägre och mer varierande elpriser",
        publisher: "Energiforsk",
        url: "https://energiforsk.se/nyheter/sveriges-val-tryggare-och-hogre-eller-lagre-och-mer-varierande-elpriser/",
      },
      {
        title:
          "Bidrag för energieffektivisering i småhus kan sökas från 1 september",
        publisher: "Boverket",
        url: "https://www.boverket.se/sv/om-boverket/nyheter-aktuellt/nyheter/bidrag-for-energieffektivisering-fran-1-september/",
      },
      {
        title: "Senaste nytt om svenska valet 2026",
        publisher: "Sveriges Radio",
        url: "https://www.sverigesradio.se/artikel/senaste-nytt-om-svenska-valet-2026",
      },
    ],
  },
  {
    slug: "valet-2026-solceller-elpriser-en-vecka-kvar",
    status: "published",
    title:
      "En vecka till valet: det här avgörs för dina solceller och din elräkning",
    excerpt:
      "Söndag den 13 september är det riksdagsval, och energin är en av valrörelsens hetaste frågor. Vi går igenom sakläget för dig som har eller funderar på solceller och batteri: avdragen som gäller, striden om solstödet, kärnkraftslinjerna och vinterns elpriser.",
    category: "Valet 2026",
    publishedAt: "2026-09-06",
    updatedAt: "2026-09-06",
    readTimeMin: 7,
    image: {
      src: "/news/valet-2026-solceller-elpriser-en-vecka-kvar.jpg",
      alt: "Faluröd svensk villa med solpaneler på taket i gyllene septemberljus",
    },
    sources: [
      {
        title: "Senaste nytt om valet 2026",
        publisher: "SVT Nyheter",
        url: "https://www.svt.se/nyheter/inrikes/senaste-nytt-om-val-2026",
      },
      {
        title: "Elpriserna 2026: Så drivs kostnaden upp",
        publisher: "Villaägarna",
        url: "https://www.villaagarna.se/debatt/energikostnader/elpriserna-2026-sa-drivs-kostnaden-upp/",
      },
      {
        title:
          "Bidrag för energieffektivisering i småhus kan sökas från 1 september",
        publisher: "Boverket",
        url: "https://www.boverket.se/sv/om-boverket/nyheter-aktuellt/nyheter/bidrag-for-energieffektivisering-fran-1-september/",
      },
      {
        title: "Valet 2026: Vilka partier är för och emot kärnkraft?",
        publisher: "Nyheter24",
        url: "https://nyheter24.se/nyheter/politik/1504671-valet-2026-vilka-partier-ar-for-och-emot-karnkraft",
      },
      {
        title: "Partiernas energipolitik inför valet 2026",
        publisher: "Elbruk",
        url: "https://www.elbruk.se/blogg/partiernas-energipolitik-2026",
      },
      {
        title: "Energipolitik inför riksdagsvalet 2026",
        publisher: "Elbyte",
        url: "https://elbyte.se/energipolitik-valet%202026",
      },
      {
        title:
          "Förändringar i skattereduktion för solceller – detta behöver du veta",
        publisher: "Höganäs kommun",
        url: "https://www.hoganas.se/arkiv/nyheter---hoganas-kommun/nyheter/2025-06-03-forandringar-i-skattereduktion-for-solceller---detta-behover-du-veta.html",
      },
    ],
  },
];

export function findNewsArticle(slug: string): NewsArticle | undefined {
  return NEWS.find((n) => n.slug === slug);
}

/** Publicerade artiklar, nyast först. */
export function publishedNews(): NewsArticle[] {
  return NEWS.filter((n) => n.status === "published").sort((a, b) =>
    a.publishedAt < b.publishedAt ? 1 : -1,
  );
}

/** "2026-09-06" -> "6 september 2026". */
export function formatNewsDate(iso: string): string {
  return new Intl.DateTimeFormat("sv-SE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}
