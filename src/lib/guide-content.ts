/**
 * Innehåll för publicerade guide-artiklar. Hålls separat från guides.ts
 * (metadata) så att artikel-listan är lätt att skanna och artikelinnehåll
 * är lätt att redigera utan att röra rendering-koden.
 *
 * Struktur per artikel – byggd för att citeras av Google AI Overviews,
 * ChatGPT, Perplexity m.fl.:
 *   answer    – "Kort svar" överst: 40–80 ord, börjar med svaret (siffran
 *               med enhet och år) och nämner ämnet, så att det går att
 *               citera ensamt. Nya guider har answer.
 *   tldr      – äldre guider: 3 punkter i stället för answer
 *   keyFacts  – faktaruta: siffror med enhet och giltighetsår
 *   sections  – H2 formulerad som fråga + brödtext + valfria bullets
 *   faq       – frågor/svar för FAQPage-schema och utfällbara block
 *
 * Samma redaktionella regler som resten av kunskapsbanken
 * (docs/kunskapsbank.md): varje siffra ska ha en läst källa i guidens
 * `sources`, primärkällor först, ingen säljton. `node scripts/kb-check.mjs`
 * kontrollerar guider med answer.
 */

export type GuideSection = {
  h2: string;
  body: string[];
  bullets?: string[];
};

export type GuideContent = {
  answer?: string;
  tldr?: string[];
  keyFacts?: { label: string; value: string }[];
  sections: GuideSection[];
  faq: { q: string; a: string }[];
};

export const GUIDE_CONTENT: Record<string, GuideContent> = {
  "installera-laddbox-hemma": {
    answer: "En laddbox kostar cirka 5 000–12 000 kr plus installation, enligt Energi- och klimatrådgivningen (prisnivå 2024). Installationen kostar mer om kabeln från elcentralen blir lång, om elcentralen måste byggas ut eller om huvudsäkringen behöver höjas. Arbetet ska göras av ett elinstallationsföretag som är registrerat hos Elsäkerhetsverket. Grönt avdrag sänker 2026 priset med 50 % av arbete och material, alltså 48,5 % av totalpriset vid fast pris.",
    keyFacts: [
      {
        label: "Laddbox, pris (2024)",
        value: "Cirka 5 000–12 000 kr plus installation",
      },
      {
        label: "Grönt avdrag för laddbox 2026",
        value: "50 % av arbete och material, 48,5 % av totalpriset vid fast pris",
      },
      {
        label: "Avdragstak 2026",
        value: "50 000 kr per person och år, sammanlagt för all grön teknik",
      },
      {
        label: "Vem får installera",
        value: "Bara ett elinstallationsföretag som är registrerat hos Elsäkerhetsverket",
      },
      {
        label: "Bidraget Ladda bilen 2026 (föreningar)",
        value: "50 % av bidragsberättigade kostnader, högst 15 000 kr per laddpunkt",
      },
      {
        label: "Bostadsrätt sedan 29 maj 2026",
        value: "Rätt att begära en laddpunkt vid din parkeringsplats, på egen bekostnad",
      },
    ],
    sections: [
      {
        h2: "Vad kostar en laddbox med installation?",
        body: [
          "Själva laddboxen kostar cirka 5 000–12 000 kr plus installation, enligt Energi- och klimatrådgivningens prisnivå för 2024. Energi- och klimatrådgivningen är ett samarbete mellan Energimyndigheten och kommunerna.",
          "Vad installationen kostar beror på förutsättningarna hemma hos dig. Billigast är oftast en laddbox på hus- eller garageväggen. En fristående laddstolpe brukar kräva markarbete och kan bli dyrare.",
          "Det här påverkar priset:",
        ],
        bullets: [
          "Kabeldragningen. Laddboxen ska ha en egen grupp, alltså en egen krets från elcentralen (proppskåpet). Ju längre och krångligare väg kabeln ska dras, desto mer material och arbetstid.",
          "Jordfelsbrytaren. Laddboxen ska ha en egen jordfelsbrytare, ett skydd som slår av strömmen om ström läcker ut där den inte ska. Den kan vara inbyggd i laddboxen. Annars behöver en separat jordfelsbrytare installeras.",
          "Elcentralen. Måste elcentralen bytas eller byggas ut blir det ett extra arbete. Det ingår inte i grönt avdrag, och Skatteverket hänvisar i stället till rotavdraget.",
          "Huvudsäkringen. Den avgör hur mycket ström hela huset kan ta ut samtidigt. Räcker den inte kan den behöva höjas, och då ska nätbolaget kontaktas. En större huvudsäkring gör också elnätsabonnemanget dyrare.",
          "Lastbalansering. Med lastbalansering sänker laddboxen effekten när resten av huset drar mycket ström. Det kräver utrustning vid elmätaren, men kan göra att du slipper höja huvudsäkringen.",
          "Tillbehör. Ibland behövs påkörningsskydd, väderskydd eller belysning vid laddplatsen.",
        ],
      },
      {
        h2: "Finns det bidrag för laddbox 2026?",
        body: [
          "För dig som privatperson är stödet grönt avdrag, inte ett bidrag: 2026 får du skattereduktion med 50 % av kostnaden för arbete och material. Bidraget Ladda bilen från Naturvårdsverket söks av föreningar och andra organisationer, till exempel bostadsrättsföreningar och samfälligheter.",
          "Grönt avdrag är högst 50 000 kr per person och år, sammanlagt för solceller, batteri och laddbox. Vid fast pris räknas 97 % av totalpriset som arbete och material, så avdraget blir 48,5 % av totalen. För varje 10 000 kr i fast pris blir avdraget alltså 4 850 kr.",
          "Företaget drar av beloppet direkt på fakturan. Det ska vara godkänt för F-skatt, och du måste betala elektroniskt, till exempel med kort eller via banken. Kontanter godtas inte. För avdrag ska laddboxen också vara förberedd för elmätning och ha uttag eller kontakt av typ 2 eller Combo.",
          "Det här ger inget grönt avdrag:",
        ],
        bullets: [
          "Material som du köper själv. Har du egen laddbox och låter ett företag installera den får du avdrag bara för arbetet.",
          "Nyinstallation, byte eller utbyggnad av elcentralen. Grönt avdrag och rotavdrag kan inte ges för samma arbete.",
          "Resor, maskiner, administration och projektering. Vid fast pris räknas de som 3 % av totalpriset.",
          "Mobila laddare och extra laddkablar.",
          "En laddbox som flera hushåll använder.",
          "En installation som du också får bidrag för från staten, en kommun eller en region.",
        ],
      },
      {
        h2: "Får man installera en laddbox själv?",
        body: [
          "Nej. Enligt Elsäkerhetsverket ska en laddbox alltid installeras av ett elinstallationsföretag som är registrerat hos myndigheten. Företaget ska vara registrerat för verksamhetstypen Övriga anläggningar för användning av el. Det kontrollerar du i Elsäkerhetsverkets e-tjänst Kolla elföretaget, och som köpare är du skyldig att göra den kontrollen.",
          "Det är straffbart att utföra elinstallationsarbete utan behörighet, och sådana brott utreds av polisen. Ett olagligt utfört arbete kan också ge dig problem när du säljer huset eller har ett försäkringsärende. Dessutom kräver grönt avdrag att ett företag utför installationen.",
          "Det du själv gör är att planera: var laddboxen ska sitta, vilken effekt du behöver och vad du ska fråga installatören. Fråga det här innan du beställer:",
        ],
        bullets: [
          "Har ni F-skatt, och drar ni grönt avdrag direkt på fakturan?",
          "Är priset fast, eller står arbete, material och övriga kostnader var för sig?",
          "Klarar elanläggningen och huvudsäkringen laddningen, eller behövs lastbalansering?",
          "Har laddboxen inbyggd jordfelsbrytare, eller behövs en separat?",
          "Måste elcentralen byggas ut, och vad kostar det arbetet separat?",
          "Sköter ni kontakten med nätbolaget om huvudsäkringen behöver höjas?",
          "Får jag en dokumenterad kontroll innan laddboxen tas i drift, plus bruks- och underhållsanvisningar?",
        ],
      },
      {
        h2: "Vad krävs tekniskt vid installation av laddbox?",
        body: [
          "Laddboxen ska ha egen matning från elcentralen och en egen jordfelsbrytare, och installationen ska klara hög last under lång tid. Laddning ger en jämn och hög belastning i timmar, medan de flesta elanläggningar är byggda för toppar under kortare tid. Elinstallatören ska därför kontrollera att din anläggning klarar den nya belastningen.",
          "Laddning sker på fyra säkerhetsnivåer, mod 1–4. En laddbox laddar enligt mod 3, som är den säkraste nivån för laddning med växelström. Laddboxen kommunicerar med bilen under hela laddningen och låser kabeln. I ett vanligt uttag laddar bilen enligt mod 2, och då kan kabeln dras ur mitt under laddningen.",
          "Behövs en större huvudsäkring ska nätbolaget kontaktas, så att ledningen in till huset klarar belastningen. Elinstallationsföretaget sköter vanligen den kontakten. Vilken laddeffekt du behöver och vad elen kostar per år läser du i guiden om vad det kostar att ladda elbilen hemma.",
          "Checklista för installationen:",
        ],
        bullets: [
          "Egen grupp från elcentralen, dimensionerad för hög last under lång tid.",
          "Egen jordfelsbrytare. Laddboxen får inte kopplas in under husets befintliga jordfelsbrytare.",
          "Uttag eller fast kabel med typ 2-kontakt. Typ 2 är vanligast, och typ 2 eller Combo är ett krav för grönt avdrag.",
          "CE-märkning och bruks- och säkerhetsanvisning på svenska.",
          "Lastbalansering eller lastbegränsning om huvudsäkringen annars kan lösa ut.",
          "Dokumentation och märkning av den nya delen av elanläggningen.",
        ],
      },
      {
        h2: "När behövs en laddbox med dubbla uttag?",
        body: [
          "En laddbox med dubbla uttag behövs när två bilar ska kunna ladda samtidigt, till exempel om hushållet har två laddbara bilar som står hemma på natten. Räcker det att bilarna turas om, klarar du dig med ett uttag.",
          "Varje uttag är en egen laddningspunkt, eftersom en laddningspunkt är där ett fordon i taget kan laddas. Varje laddningspunkt ska ha ett eget skydd med jordfelsbrytare.",
          "Två bilar delar på husets huvudsäkring. Laddar båda med 11 kW samtidigt tar de tillsammans 22 kW. Det motsvarar 3 × 32 A, mer än vad en huvudsäkring på 25 A eller mindre klarar. Med en sådan huvudsäkring behöver laddboxen lastbalansering, så att uttagen och resten av huset delar på den effekt som finns.",
          "Grönt avdrag gäller båda uttagen så länge bara ditt hushåll använder dem. Delar du laddboxen med en granne ger den inget grönt avdrag.",
        ],
      },
      {
        h2: "Hur går det till i en bostadsrättsförening eller samfällighet?",
        body: [
          "I en bostadsrättsförening får du sedan 29 maj 2026 begära att föreningen installerar en laddningspunkt vid din parkeringsplats, men du betalar kostnaderna själv. Rätten gäller när föreningen har upplåtit både lägenheten och parkeringsplatsen till dig, och platsen ligger i samma hus eller i närheten. Har du lägenheten eller platsen i andra hand gäller den inte.",
          "Det är föreningen som installerar, och styrelsen fattar beslutet. Du står för alla kostnader som laddningspunkten medför, till exempel installation, förberedande arbete, el, underhåll och administration. Föreningen får bara säga nej om det finns befogad anledning. Enligt propositionen kan det vara att det redan finns eller planeras gemensamma laddplatser som du kan erbjudas, eller att installationen kräver uppgraderingar av fastighetens elinfrastruktur och ger kostnader som du inte ska betala. Säger föreningen nej kan du begära att hyresnämnden prövar frågan.",
          "Grönt avdrag kan du få i bostadsrätt om laddpunkten hör till din lägenhet, bara gynnar den, avtalet tecknas med dig och laddpunkten följer med lägenheten vid en försäljning. Eftersom det är föreningen som installerar enligt de nya reglerna bör du fråga Skatteverket innan arbetet beställs om avdraget gäller i ditt fall.",
          "Vill föreningen själv bygga laddplatser för de boende kan den söka Naturvårdsverkets bidrag Ladda bilen: 50 % av de bidragsberättigade kostnaderna, högst 15 000 kr per laddpunkt. Samfälligheter kan också söka.",
          "Har du gemensam parkering i en samfällighet gäller inte de nya reglerna, eftersom parkeringsplatser i en gemensamhetsanläggning är undantagna. Samfällighetsföreningen får bara sköta det som ingår i anläggningens ändamål, och för att ändra ändamålet krävs en ny förrättning hos lantmäterimyndigheten. Ett förslag om att slippa förrättningen för laddplatser är inte beslutat. Regeringen skrev i mars 2026 att den avser att återkomma i frågan.",
        ],
      },
    ],
    faq: [
      {
        q: "Kan man köpa laddboxen själv och låta ett elinstallationsföretag installera den?",
        a: "Ja, men då får du grönt avdrag bara för arbetet. Köper du laddboxen av företaget som installerar den räknas den som material, och då ger den också avdrag. Laddboxen ska vara CE-märkt och ha bruks- och säkerhetsanvisning på svenska.",
      },
      {
        q: "Behöver man ny jordfelsbrytare till laddbox?",
        a: "Laddboxen ska ha en egen jordfelsbrytare och får inte kopplas in under husets befintliga. Jordfelsbrytaren kan vara inbyggd i laddboxen. Annars behöver en separat jordfelsbrytare installeras, vilket påverkar priset.",
      },
      {
        q: "Behöver man bygglov för en laddbox?",
        a: "Det finns inget generellt krav på bygglov eller bygganmälan för att installera en laddningspunkt, enligt myndigheternas gemensamma vägledning från 2025. Kommunens byggnadsnämnd avgör i det enskilda fallet, till exempel om fasaden påverkas eller brandskyddet ändras.",
      },
      {
        q: "Kan bostadsrättsföreningen säga nej till laddbox?",
        a: "Bara om det finns befogad anledning, till exempel att föreningen redan har eller planerar gemensamma laddplatser. Rätten gäller begäranden från och med 29 maj 2026, och du betalar själv installationen. Säger föreningen nej kan du begära att hyresnämnden prövar frågan.",
      },
    ],
  },
  "villaeffekten-bidrag": {
    answer: "Villaeffekten är statens bidrag för energieffektivisering i småhus. Sedan 1 september 2026 kan du få 30 % av materialkostnaden, högst 60 000 kr per hus, för till exempel bergvärme, luft-vattenvärmepump, tilläggsisolering eller nya fönster. Huset ska ha värdeår före 1990 och inte ha fjärrvärme, och du ska äga och bo i det. Du söker i Boverkets e-tjänst och Länsstyrelsen beslutar.",
    keyFacts: [
      {
        label: "Bidragets storlek",
        value: "30 % av materialkostnaden inkl. moms, högst 60 000 kr per småhus",
      },
      {
        label: "Lägsta bidrag",
        value: "10 000 kr, alltså minst 33 334 kr i material",
      },
      {
        label: "Krav på huset",
        value: "En- eller tvåbostadshus, värdeår före 1990, ej anslutet till fjärrvärme",
      },
      {
        label: "Sista dag att söka",
        value: "6 månader efter att arbetet påbörjades, senast 1 juni 2030",
      },
      {
        label: "Budget",
        value: "300 miljoner kr per år till slutet av 2030",
      },
      {
        label: "Kombination med ROT",
        value: "Bidrag på materialet, rotavdrag 30 % på arbetet",
      },
    ],
    sections: [
      {
        h2: "Vem kan söka Villaeffekten?",
        body: [
          "Villaeffekten kan sökas av privatpersoner som helt eller delvis äger ett småhus och bor stadigvarande i det, senast när de begär utbetalning. Huset ska vara permanentbostad och du ska normalt vara folkbokförd där. Fritidshus ger inte bidrag.",
          "Huset ska vara ett en- eller tvåbostadshus, friliggande eller par-, rad- eller kedjehus. Det ska ha ett värdeår före 1990 och får inte vara anslutet till ett fjärrvärmenät.",
          "Värdeåret står i Skatteverkets beslut om fastighetstaxering och är ofta samma som byggåret. Det kan ha flyttats fram efter en större om- eller tillbyggnad, så ett äldre hus kan ändå ha ett för sent värdeår. Söker du i e-tjänsten hämtas värdeåret automatiskt från Lantmäteriets fastighetsregister.",
        ],
      },
      {
        h2: "Vilka åtgärder ger bidrag från Villaeffekten?",
        body: [
          "Bidraget gäller material för att förbättra husets värmesystem eller klimatskärm. Du kan söka för en eller flera åtgärder, i vilken ordning du vill.",
          "Värmepumpen ska vara styrbar, det vill säga kunna planera och justera värmen automatiskt efter till exempel utetemperatur eller elpris. Produkterna ska ligga i någon av de två högsta energiklasserna som används inom produktgruppen. Bidrag ges inte för utrymmen som inte har värmts upp tidigare.",
          "Regeringens frågor och svar skriver att luftvärmepumpar inte omfattas, men förordningen och Boverket nämner luft-vattenvärmepump uttryckligen. Det är luft-luftvärmepumpen som är undantagen.",
        ],
        bullets: [
          "Styrbar värmepump: frånluft, luft-vatten, berg, sjö eller jord – inte luft-luft",
          "Styrbar varmvattenberedare med inbyggd värmepump",
          "Nyinstallation av vattenburet värmesystem, inte byte av enstaka radiatorer",
          "Anslutning till fjärrvärme – materialet, inte anslutningsavgiften",
          "Till- och frånluftsventilation med värmeåtervinning (FTX)",
          "Effektstyrd biobränsleanordning med automatisk bränslematning, till exempel pelletskamin",
          "Tilläggsisolering och vindtätning av klimatskärmen",
          "Tilläggsglas eller tilläggsisolering av befintliga fönster och dörrar, eller byte till nya",
        ],
      },
      {
        h2: "Hur mycket kan man få, och går det att kombinera med rotavdrag?",
        body: [
          "Du kan få högst 30 % av materialkostnaden inklusive moms och högst 60 000 kr per småhus. Bidrag under 10 000 kr beviljas inte, så materialet måste kosta minst 33 334 kr. Bidrag som betalats ut i förra omgången, 2023–2025, räknas in i taket.",
          "Exempel: material för 100 000 kr ger 30 000 kr i bidrag, och taket nås vid 200 000 kr i material. Arbetskostnader och avgifter ger inget bidrag, och inte heller kostnader som försäkringen har ersatt. Bidraget betalas ut vid högst två tillfällen.",
          "Eftersom bidraget bara gäller material kan du få rotavdrag på arbetet. Rotavdraget är 30 % av arbetskostnaden, högst 50 000 kr per person och år. Skatteverket ger inte rotavdrag för arbete som staten ger bidrag för, men Villaeffekten täcker inte arbetet.",
        ],
      },
      {
        h2: "Hur och var söker man Villaeffekten?",
        body: [
          "Du söker i Boverkets e-tjänst med e-legitimation. Ansökan går automatiskt till Länsstyrelsen i det län där huset ligger, och det är Länsstyrelsen som handlägger och beslutar. Boverket sköter e-tjänsten, betalar ut bidraget och prövar överklaganden.",
          "Kan du inte använda e-tjänsten finns blanketter hos Boverket som du skickar direkt till Länsstyrelsen. I Stockholms län går det att mejla blanketten. Frågor om villkoren ställer du till Länsstyrelsen, tekniska problem med e-tjänsten till Boverket.",
        ],
        bullets: [
          "Alltid: teknisk specifikation eller produktblad som visar egenskaper och energiklass",
          "Före arbetet: offert eller beställning där materialkostnaden är specificerad",
          "Efter arbetet: fakturor eller kvitton där material och arbete står var för sig, med datum för start och färdigställande",
          "Anlitar du ett företag ska det vara godkänt för F-skatt",
        ],
      },
      {
        h2: "Ska man söka Villaeffekten före eller efter att arbetet görs?",
        body: [
          "Du kan söka både före och efter, men ansökan ska vara inne inom sex månader från att arbetet påbörjades och senast 1 juni 2030. Arbetet räknas som påbörjat när installationen startar. Projektering och andra förberedelser räknas inte.",
          "Påbörjades arbetet mellan 17 oktober 2025 och 31 augusti 2026 är sista dag 28 februari 2027. Bidrag ges bara för material som beställts tidigast 17 oktober 2025. Levererar företaget materialet räknas dagen du beställde tjänsten.",
          "Söker du före och beviljas bidrag får du ett preliminärt beslut med högsta möjliga belopp och sista dag att begära utbetalning. Det slutliga bidraget kan inte bli högre än det preliminära. Pengarna betalas ut först när arbetet är klart och du har begärt utbetalning, och är arbetet redan klart kan du begära utbetalning direkt i ansökan.",
        ],
      },
      {
        h2: "Hur lång är handläggningstiden och kan pengarna ta slut?",
        body: [
          "Varken Boverket eller Länsstyrelsen anger någon handläggningstid i oktober 2026. Länsstyrelsen handlägger ansökningarna i den ordning de kommer in, och Boverkets e-tjänst har ibland ett väntrum när många är inne samtidigt.",
          "Regeringen har avsatt 300 miljoner kr per år till slutet av 2030, och enligt förordningen lämnas bidrag bara om det finns medel. Tar 2026 års pengar slut behandlas ansökningarna ändå i turordning, och du kan få utbetalning ur nästa års medel.",
          "Boverket räknar med att cirka 25 000 småhusägare kan få bidrag 2026–2030 om alla får maxbeloppet. Eftersom kön går i turordning hamnar en tidig ansökan tidigare i kön.",
        ],
      },
    ],
    faq: [
      {
        q: "Kan man få Villaeffekten för en luft-luftvärmepump?",
        a: "Nej. Villaeffekten gäller styrbara frånlufts-, luft-vatten-, berg-, sjö- och jordvärmepumpar samt varmvattenberedare med inbyggd värmepump, men inte luft-luftvärmepumpar.",
      },
      {
        q: "Kan man få Villaeffekten för arbete som redan är gjort?",
        a: "Ja, om arbetet påbörjades tidigast 17 oktober 2025 och materialet beställdes från det datumet. Påbörjades arbetet före 1 september 2026 ska ansökan vara inne senast 28 februari 2027.",
      },
      {
        q: "Gäller Villaeffekten om huset har fjärrvärme?",
        a: "Nej, hus som är anslutna till fjärrvärme omfattas inte av Villaeffekten. Däremot kan du få bidrag för materialet om du ansluter ett hus utan fjärrvärme till fjärrvärmenätet.",
      },
      {
        q: "Får man Villaeffekten om man gör jobbet själv?",
        a: "Ja, Villaeffekten gäller materialet även om du utför arbetet själv. Du behöver ändå följa byggregler och elsäkerhetskrav.",
      },
      {
        q: "Kan man få både Villaeffekten och rotavdrag?",
        a: "Ja. Villaeffekten ger 30 % av materialkostnaden och rotavdraget 30 % av arbetskostnaden 2026, så de gäller olika delar av samma jobb.",
      },
    ],
  },

  "ladda-elbil-hemma-kostnad": {
    answer: "Att ladda elbilen hemma kostar elpriset gånger bilens förbrukning. Nya elbilar som registrerades 2025 drog i snitt 1,7 kWh per mil i WLTP-provet, visar Trafikverkets siffror. Räknar du med 2 kWh per mil och ett exempelpris på 2 kr per kWh blir det 4 kr per mil. Elsäkerhetsverket avråder från regelbunden laddning i vanligt vägguttag, och en installerad laddbox ger 50 % grönt avdrag på arbete och material 2026.",
    keyFacts: [
      {
        label: "Förbrukning, nya elbilar 2025 (WLTP)",
        value: "17 kWh per 100 km, alltså 1,7 kWh per mil",
      },
      {
        label: "Räkneexempel: 1 200 mil, 2 kWh/mil, 2 kr/kWh",
        value: "2 400 kWh och 4 800 kr per år (4 kr per mil)",
      },
      {
        label: "Vanligt vägguttag",
        value: "Elsäkerhetsverket avråder från regelbunden laddning; måste du ändå, max 8–10 A",
      },
      {
        label: "Laddeffekt",
        value: "1-fas 2,3–3,7 kW, 3-fas 3 × 16 A = 11 kW, 3 × 32 A = 22 kW",
      },
      {
        label: "Grönt avdrag för laddbox 2026",
        value: "50 % av arbete och material, högst 50 000 kr per person och år",
      },
      {
        label: "Bostadsrätt",
        value: "Avdrag bara om laddpunkten är din egen, avtalet tecknas med dig och den följer lägenheten",
      },
    ],
    sections: [
      {
        h2: "Hur mycket el drar en elbil per mil?",
        body: [
          "En ny elbil som registrerades i Sverige 2025 drog i snitt 17 kWh per 100 km enligt WLTP-provet, alltså 1,7 kWh per mil. Siffran kommer från Trafikverkets sammanställning av nya personbilar.",
          "WLTP är ett standardiserat prov. Trafikverket påpekar att provet ligger närmare verklig körning än äldre metoder, men att det fortfarande finns faktorer som det inte tar hänsyn till. Din egen förbrukning kan därför bli högre. Bilens färddator eller laddboxens mätning visar vad just din bil drar.",
        ],
      },
      {
        h2: "Vad kostar det att ladda elbilen hemma per år?",
        body: [
          "Kostnaden är antalet kWh du laddar gånger vad du betalar per kWh, allt inräknat. Exempel: du kör 1 200 mil per år och räknar med 2 kWh per mil, alltså lite mer än WLTP-snittet. Det blir 2 400 kWh per år.",
          "Anta att du betalar 2 kr per kWh för elhandel, nätets överföringsavgift, energiskatt och moms tillsammans. Det är ett antaget exempelpris, inte ett aktuellt pris. Då kostar laddningen 4 800 kr per år, eller 4 kr per mil. Betalar du 1,50 kr per kWh blir det 3 600 kr, och vid 2,50 kr blir det 6 000 kr.",
          "När du laddar kan också spela roll. Med Vattenfall Eldistributions tidstariff 2026 kostar överföringen 76,5 öre per kWh vardagar kl. 6–22 i januari, februari, mars, november och december, och 30,5 öre per kWh övrig tid, inklusive moms. En laddbox som går att styra kan lägga laddningen på de billigare tiderna.",
        ],
      },
      {
        h2: "Kan man ladda elbilen i ett vanligt vägguttag?",
        body: [
          "Det går, men Elsäkerhetsverket avråder från regelbunden laddning i vanliga vägguttag (Schuko) och motorvärmaruttag. De är inte gjorda för hög belastning under lång tid. Över tid kan det bli brandrisk, och risken beror bland annat på laddström, hur ofta du laddar och elanläggningens skick.",
          "Laddning i vanligt uttag sker med mod 2, som inte ger samma säkerhet som en laddbox med mod 3. Gamla eller felaktiga kopplingar i huset kan bli varma vid hög belastning.",
          "Måste du ändå ladda i ett vanligt uttag ger myndigheternas gemensamma vägledning de här råden:",
        ],
        bullets: [
          "Låt ett elinstallationsföretag kontrollera att elanläggningen klarar belastningen.",
          "Begränsa laddströmmen till 8–10 A. Ju lägre ström, desto säkrare.",
          "Använd inga förlängningssladdar, timrar eller grenuttag mellan uttaget och laddkabeln.",
          "Låt inte en tung kontrollbox hänga i kabeln, eftersom det kan ge glapp i uttaget.",
        ],
      },
      {
        h2: "Ska man välja 1-fas eller 3-fas, 11 kW eller 22 kW?",
        body: [
          "En laddbox på 3-fas med 16 A per fas, alltså 11 kW, är det vanliga valet och räcker gott för nattladdning. På 1-fas blir effekten 2,3–3,7 kW, och laddningen tar längre tid.",
          "Räkneexempel: 11 kW i en timme ger 11 kWh, vilket motsvarar ungefär 5 mil vid 2 kWh per mil. Även 3,7 kW i åtta timmar ger cirka 30 kWh, eller runt 15 mil. Den som kör 1 200 mil per år behöver i snitt drygt 3 mil per dag.",
          "22 kW kräver 3 × 32 A, vilket är mer än en huvudsäkring på 16, 20 eller 25 A klarar. Bilens inbyggda laddare styr dessutom hur stor effekt bilen kan ta emot, så en större laddbox laddar inte snabbare om bilen inte klarar det.",
        ],
      },
      {
        h2: "Vad är lastbalansering och behöver man det?",
        body: [
          "Lastbalansering behövs om huvudsäkringen inte räcker när laddboxen och resten av huset drar ström samtidigt. Funktionen fördelar husets tillgängliga effekt mellan laddboxen och övriga apparater, så att laddboxen drar ner laddningen när till exempel värmepump, spis och tvättmaskin går.",
          "Sedan 1 januari 2025 har alla elmätare en anslutning som en lastbalanserare kan använda för att läsa av husets förbrukning i realtid.",
          "Alternativet är ofta en större huvudsäkring, och den kostar mer varje år. Hos Vattenfall Eldistribution kostar 20 A 8 085 kr och 25 A 10 125 kr per år i fast avgift 2026, inklusive moms. Steget upp kostar alltså 2 040 kr per år. Behöver du större säkring ska du kontakta ditt nätbolag.",
        ],
      },
      {
        h2: "Vilket grönt avdrag får man för laddbox 2026, och gäller det i bostadsrätt?",
        body: [
          "Du får 50 % skattereduktion på arbete och material när ett företag installerar laddboxen, högst 50 000 kr per person och år för all grön teknik sammanlagt. Vid fast pris räknas 97 % av priset som arbete och material, så avdraget blir 48,5 % av totalen. Avdraget dras direkt på fakturan.",
          "Laddboxen ska vara väggfast eller en fristående laddstolpe, bara användas av ditt hushåll, vara förberedd för elmätning och ha Typ 2- eller CCS-anslutning enligt standarden EN 62196-2 eller EN 62196-3. Mobila laddare, extra laddkablar och nyinstallation, byte eller utökning av elcentralen ingår inte. För elcentralen hänvisar Skatteverket i stället till reglerna för rotavdrag.",
          "Bor du i bostadsrätt kan du få avdraget, men bara om laddpunkten är kopplad till just din lägenhet och nyttan bara går till den. Avtalet ska tecknas med dig som enskild bostadsrättshavare, och laddpunkten ska följa med lägenheten om du säljer. Gemensamma laddplatser som flera hushåll använder ger inget avdrag. Beställer föreningen installationen och du betalar föreningen är det osäkert om kravet på avtal med dig är uppfyllt. Fråga Skatteverket innan.",
        ],
      },
    ],
    faq: [
      {
        q: "Behöver man en laddbox för att ladda elbil hemma?",
        a: "Enligt myndigheternas gemensamma vägledning från 2025 finns inget krav på laddbox för privat laddning upp till 16 A. Elsäkerhetsverket rekommenderar ändå laddbox och avråder från regelbunden laddning i vanliga vägguttag, eftersom de inte är gjorda för hög belastning under lång tid.",
      },
      {
        q: "Hur lång tid tar det att ladda en elbil hemma?",
        a: "En laddbox på 11 kW tillför i teorin 11 kWh per timme, ungefär 5 mil vid 2 kWh per mil. På 1-fas med 3,7 kW tar samma påfyllning ungefär tre gånger så lång tid. Bilens inbyggda laddare kan begränsa effekten.",
      },
      {
        q: "Kan jag få både grönt avdrag och rotavdrag för samma laddbox?",
        a: "Nej, Skatteverket ger inte grönt avdrag och rotavdrag för samma arbete. Utbyte eller utbyggnad av elcentralen ingår inte i det gröna avdraget, och för det arbetet hänvisar Skatteverket till rotreglerna.",
      },
      {
        q: "Är det billigare att ladda elbilen på natten?",
        a: "Det beror på ditt elavtal och ditt nätbolag. Med Vattenfall Eldistributions tidstariff 2026 kostar överföringen 30,5 öre per kWh utanför höglasttid, mot 76,5 öre vardagar kl. 6–22 i januari–mars, november och december.",
      },
      {
        q: "Får man grönt avdrag för laddbox i bostadsrätt?",
        a: "Ja, om laddpunkten bara används av ditt hushåll, är kopplad till din lägenhet, avtalet tecknas med dig och laddpunkten följer med lägenheten vid försäljning. Gemensamma laddplatser i föreningen ger inget avdrag för den enskilda medlemmen.",
      },
    ],
  },

  "spotpris-och-elomraden": {
    answer: "Spotpriset är elens marknadspris på elbörsen, satt dagen före för varje elområde. Sedan leveransdygnet 1 oktober 2025 sätts spotpriset per kvart i stället för per timme. Sverige har fyra elområden sedan 2011: SE1 Luleå, SE2 Sundsvall, SE3 Stockholm och SE4 Malmö. Södra Sverige får oftare högre pris när ledningarna från norr inte räcker till. Utöver spotpriset betalar du elhandlarens påslag, elnätsavgift, energiskatt (36,0 öre/kWh exklusive moms 2026) och moms.",
    keyFacts: [
      {
        label: "Elområden",
        value: "4 st sedan 2011: SE1 Luleå, SE2 Sundsvall, SE3 Stockholm, SE4 Malmö",
      },
      {
        label: "Spotpriset sätts",
        value: "Per kvart (15 minuter) sedan 1 oktober 2025, tidigare per timme",
      },
      {
        label: "Priset för nästa dygn",
        value: "Fastställs klockan 13.00 dagen före",
      },
      {
        label: "Energiskatt på el 2026",
        value: "36,0 öre/kWh exklusive moms, 45 öre/kWh inklusive moms",
      },
      {
        label: "Energiskatt 2025",
        value: "43,9 öre/kWh exklusive moms",
      },
      {
        label: "Kolla ditt elområde",
        value: "natomraden.se – sök på kommun, nätområde eller nätbolag",
      },
    ],
    sections: [
      {
        h2: "Vad är spotpriset och hur sätts det?",
        body: [
          "Spotpriset är vad elen kostar på elbörsen, och det sätts dagen före leverans för varje elområde. Elhandlare och elproducenter lägger bud, och priset hamnar där utbud och efterfrågan möts, med hänsyn till hur mycket el ledningarna klarar att föra mellan områdena.",
          "Handeln sker i den gemensamma europeiska dagen före-marknaden (SDAC), där Nord Pool är en av börserna. Enligt Nord Pool infördes 15-minuterspriser i alla europeiska budområden på handelsdagen 30 september 2025, för leveransdygnet 1 oktober 2025. Sedan dess får du fyra spotpriser i timmen i stället för ett.",
          "Enligt Energimarknadsinspektionen (Ei) fastställs spotpriset för nästkommande dygn klockan 13.00. Har du ett avtal som följer spotpriset kan du alltså se dagen innan när elen blir dyrast och billigast.",
        ],
      },
      {
        h2: "Varför delades Sverige in i fyra elområden 2011?",
        body: [
          "Sverige delades in i fyra elområden 2011 för att hantera flaskhalsar i transmissionsnätet (stamnätet) på ett sätt som är förenligt med EU:s konkurrensregler. Tidigare begränsade Svenska kraftnät exporten av el, bland annat kalla vinterdagar när nätet inte räckte för att föra el från norr till söder och vidare till grannländerna.",
          "EU-kommissionen krävde att Svenska kraftnät skulle hantera begränsningarna på ett annat sätt, så att kunder i andra länder inte diskriminerades. Lösningen blev elområden, där gränserna dras där de fysiska flaskhalsarna finns. Det var alltså inte EU som ritade områdena, men EU:s krav var skälet till att Sverige bytte metod.",
          "Indelningen kan ändras. Enligt Ei föreslog en EU-gemensam översyn i april 2025 inga ändringar för Sveriges del. Regeringen har därefter gett Svenska kraftnät ett nytt uppdrag om elområdesindelningen, som utökades i maj 2026 och ska redovisas senast den 29 januari 2027.",
        ],
      },
      {
        h2: "Varför är elen ofta dyrare i södra Sverige?",
        body: [
          "Elen blir dyrare i södra Sverige när det behövs mer el där än ledningarna från norr kan föra över. Enligt Svenska kraftnät produceras mest el i norra Sverige och mest används i södra. Så länge det finns plats i ledningarna jämnas priset ut, men när de är fulla uppstår en flaskhals och priset blir högre i området med underskott.",
          "Det märks mest under årets kallaste dagar, när elanvändningen är som högst. Svenska kraftnät pekar också på att kraftverk i södra Sverige har lagts ner samtidigt som vindkraften byggts ut i norr, vilket har ökat prisskillnaderna.",
          "Svenska kraftnät bygger ut stamnätet för att minska skillnaderna. SydVästlänken togs i drift fullt ut 2021 och investeringspaketet NordSyd ska öka överföringen från norr till söder. Ei skriver att det är svårt att förutsäga hur mycket och hur ofta priserna kommer att skilja mellan områdena.",
        ],
      },
      {
        h2: "Vad består elräkningen av utöver spotpriset?",
        body: [
          "Utöver spotpriset består elräkningen av elhandlarens påslag, elnätsavgiften, energiskatt och moms. Elhandeln och elnätet är två olika avtal: elhandlaren väljer du fritt, men elnätsavgiften går till det nätbolag som äger ledningarna där du bor.",
          "Energiskatten tas ut på elnätsfakturan och betalas för varje kWh. Enligt Skatteverket sänktes den 1 januari 2026 från 43,9 till 36,0 öre/kWh. Med moms blir det 45 öre/kWh, enligt Ei. I vissa kommuner i norra Sverige är skatten 9,6 öre/kWh lägre för hushåll.",
        ],
        bullets: [
          "Elhandel: spotpris (eller avtalat pris) plus elhandlarens påslag och moms.",
          "Elnät: avgift till nätbolaget, oftast en fast del efter huvudsäkringens storlek och en rörlig överföringsavgift per kWh.",
          "Energiskatt 2026: 36,0 öre/kWh exklusive moms, 45 öre/kWh inklusive moms.",
          "Moms läggs på både elhandel, elnät och energiskatt.",
        ],
      },
      {
        h2: "Kvartspris, månadspris eller fast pris – vad är skillnaden?",
        body: [
          "Skillnaden är hur ofta priset ändras och om du själv kan påverka det. Med kvartspris betalar du spotpriset för varje kvart plus påslag och moms. Flyttar du till exempel elbilsladdning eller uppvärmning till billiga kvartar sjunker kostnaden, men använder du mycket el när priset är högt kan kvartspris bli dyrare än andra avtal.",
          "Med månadspris, det som många kallar rörligt pris, betalar du samma pris för hela månaden. Det sätts i efterhand som ett volymvägt medelvärde av spotpriset plus påslag, och påverkas av hur alla elhandlarens kunder med samma avtal använder el. Du kan inte sänka kostnaden genom att flytta din elanvändning.",
          "Med fast pris betalar du samma pris per kWh hela avtalstiden, oftast 1, 2 eller 3 år. Det är förutsägbart men enligt Ei ofta dyrare över tid, eftersom elhandlaren tar höjd för stigande inköpspriser.",
        ],
        bullets: [
          "Timpris: har till största del ersatts av kvartspris. Dagens timprisavtal ger inte individuell prissättning per kvart.",
          "Mixpris: blandning, ofta månadspris och fast pris.",
          "Anvisat pris: det du får om du inte väljer själv. Ofta dyrare, högst 14 dagars uppsägningstid.",
          "Har du både kvartspris och effektavgift på elnätet behöver du ta hänsyn till båda när du styr elanvändningen.",
        ],
      },
      {
        h2: "Hur tar du reda på vilket elområde du bor i?",
        body: [
          "Det enklaste sättet är att söka på natomraden.se, som Ei hänvisar till. Där kan du söka på kommun, nätområde eller nätbolag och se vilket elområde nätet tillhör.",
          "Elområdet bestäms av var huset är anslutet, inte av vilken elhandlare du har. Stockholmsområdet ligger i SE3, som heter Elområde Stockholm.",
        ],
      },
    ],
    faq: [
      {
        q: "Vilket elområde ligger Stockholm i?",
        a: "Stockholm ligger i elområde SE3, Elområde Stockholm. Vill du kontrollera din egen adress kan du söka på kommun eller nätbolag på natomraden.se.",
      },
      {
        q: "När infördes kvartspris på el?",
        a: "Elbörsen gick över till 15-minuterspriser för leveransdygnet 1 oktober 2025, med handel dagen före, 30 september 2025. Sedan dess sätts spotpriset per kvart i alla europeiska budområden, även i SE1–SE4.",
      },
      {
        q: "Hur mycket är energiskatten på el 2026?",
        a: "Energiskatten på el är 36,0 öre/kWh exklusive moms 2026, sänkt från 43,9 öre/kWh den 1 januari 2026. Inklusive moms blir det 45 öre/kWh. I vissa kommuner i norra Sverige är skatten 9,6 öre/kWh lägre.",
      },
      {
        q: "Varför skiljer sig elpriset mellan SE3 och SE4?",
        a: "Elpriset skiljer sig när ledningarna mellan elområdena är fulla. Då blir priset högre i området som har underskott på el, oftast längre söderut, och lägre där det finns överskott.",
      },
      {
        q: "Kommer elområdena att ändras?",
        a: "Inget beslut finns. En EU-gemensam översyn föreslog 2025 oförändrad indelning för Sverige, men Svenska kraftnät har ett utökat regeringsuppdrag om elområdena som ska redovisas senast den 29 januari 2027.",
      },
    ],
  },

  "luft-vatten-eller-bergvarme": {
    answer: "Bergvärme passar bäst om huset har vattenburen värme, ett stort värmebehov och du får borra på tomten. Bergvärmen påverkas inte av utetemperaturen och har högre årsvärmefaktor, SCOP 4,0–5,5, än luft-vatten med 3,0–4,5. En luft-vattenvärmepump kostar ofta mindre, cirka 100 000–160 000 kr mot 120 000–250 000 kr för bergvärme (2023 års nivå), men tappar effekt i sträng kyla. Båda kan ge ROT och Villaeffekten 2026.",
    keyFacts: [
      {
        label: "Årsvärmefaktor (SCOP)",
        value: "Bergvärme 4,0–5,5, luft-vatten 3,0–4,5, frånluft 2,5–4,0",
      },
      {
        label: "Vanlig kostnad för villa (2023)",
        value: "Bergvärme 120 000–250 000 kr, luft-vatten 100 000–160 000 kr",
      },
      {
        label: "Värme ur borrhål",
        value: "Cirka 145 kWh per meter borrhål och år",
      },
      {
        label: "ROT 2026 vid fast pris",
        value: "30 % av arbetet, där arbetet räknas som 35 % (berg) eller 30 % (luft) av totalpriset",
      },
      {
        label: "Villaeffekten 2026",
        value: "30 % av materialet, max 60 000 kr – berg, luft-vatten och frånluft, inte luft-luft",
      },
      {
        label: "Krav för bergvärme",
        value: "Anmälan till kommunen innan du borrar",
      },
    ],
    sections: [
      {
        h2: "Vad är skillnaden mellan bergvärme och luft-vattenvärmepump?",
        body: [
          "Skillnaden är var värmen hämtas. En bergvärmepump tar värme ur ett borrhål i berget, där temperaturen är ungefär densamma året om. En luft-vattenvärmepump tar värmen ur uteluften via en utedel med fläkt.",
          "Båda lämnar värmen till husets vattenburna system, alltså radiatorer eller golvvärme, och båda kan värma tappvarmvattnet. Har huset bara direktverkande el måste du först installera rör och radiatorer innan någon av dem är aktuell.",
          "Energimyndigheten beskriver bergvärme som ett alternativ för större hus med många boende, och luft-vatten som ett alternativ för både mindre och större hus i södra Sverige. Enligt energi- och klimatrådgivningen är bergvärme lönsamt för hus som behöver 15 000–25 000 kWh värme och varmvatten per år eller mer.",
        ],
      },
      {
        h2: "Varför har bergvärme högre årsvärmefaktor än luft-vatten i kallt klimat?",
        body: [
          "Bergvärmen får högre årsvärmefaktor för att berget håller jämn temperatur, medan uteluften är som kallast just när huset behöver mest värme. Årsvärmefaktorn, SCOP, är ett säsongsmedelvärde: hur många kWh värme pumpen ger per kWh el över ett helt år.",
          "Energimyndighetens värmepumpsguide från 2025 anger SCOP 4,0–5,5 för bergvärme och 3,0–4,5 för luft-vatten. SCOP mäts för tre klimatzoner i Europa och Sverige hör till zonen för kallt klimat. Jämför därför alltid värdet för kallt klimat på energimärkningen.",
          "Nyare luft-vattenvärmepumpar ger värme ner till −20 eller −30 °C, men då behövs extra energi, oftast från en elpatron. Märkningens SCOP är ett standardiserat värde. I verklig drift brukar en bergvärmepump ge 3–4 gånger så mycket värme som den använder i el, enligt energi- och klimatrådgivningen.",
        ],
      },
      {
        h2: "Vad kostar bergvärme och luft-vatten att köpa och att driva?",
        body: [
          "Enligt energi- och klimatrådgivningen kostar bergvärme för en villa vanligen 120 000–250 000 kr och en luft-vattenvärmepump 100 000–160 000 kr. Siffrorna gäller 2023. Intervallen överlappar, så det billigaste alternativet för just ditt hus syns först när du har flera offerter.",
          "Driftkostnaden styrs av hur mycket el pumpen drar, alltså av årsvärmefaktorn. Förenklat räkneexempel: huset behöver 20 000 kWh värme per år. Med SCOP 3 köper du cirka 6 700 kWh el, med SCOP 4,5 cirka 4 400 kWh. Skillnaden, cirka 2 200 kWh per år, gånger ditt elpris är vad den effektivare pumpen sparar.",
          "Storleken påverkar också. En tumregel är att pumpen ska täcka cirka 95 % av husets årliga energibehov och att resten tas av spetsvärme, oftast en elpatron. En för liten pump kräver mycket spetsvärme till hög driftkostnad, en för stor blir en onödig investering.",
        ],
      },
      {
        h2: "Vad krävs för att installera bergvärme eller luft-vatten?",
        body: [
          "För bergvärme krävs en anmälan till kommunen innan du borrar. En del kommuner kräver tillstånd, och i till exempel vattenskyddsområden kan bergvärme vara helt förbjudet. Hör därför med kommunen innan du skriver avtal.",
          "Luft-vatten kräver ingen borrning, men utedelen har en fläkt som hörs. Placera den där den inte stör grannar eller din egen nattsömn, och led bort smältvattnet så att det inte bildas is. Energimärkningen visar pumpens ljudeffektnivå.",
        ],
        bullets: [
          "Borrhål: minst 20 meter mellan borrhål, 10 meter till tomtgränsen och 4 meter till huset, enligt energi- och klimatrådgivningen.",
          "Grannens borrhål: Sveriges geologiska undersökning (SGU) har en databas över energibrunnar där du kan se om ditt hål hamnar nära ett annat.",
          "Luft-vatten: rör och radiatorer ska klara 55 grader, och gör pumpen tappvarmvatten ska den klara minst 60 grader för att motverka legionella.",
          "El: installationen ska göras av ett registrerat elföretag, och du kan behöva en större huvudsäkring.",
        ],
      },
      {
        h2: "Hur mycket ger ROT och Villaeffekten på en värmepump 2026?",
        body: [
          "ROT-avdraget 2026 är 30 % av arbetskostnaden. Vid totalentreprenad till fast pris räknas arbetet enligt Skatteverkets schablon: 35 % av totalpriset för vätska-vattenvärmepump, till exempel bergvärme, och 30 % för luftvärmepumpar som luft-vatten, luft-luft och frånluft. ROT blir då cirka 10,5 % respektive 9 % av totalpriset, inte 30 %.",
          "Villaeffekten, bidraget för energieffektivisering i småhus, ger 30 % av materialkostnaden, högst 60 000 kr per hus. Det gäller bergvärme, luft-vatten och frånluft men inte luft-luft. Huset ska ha värdeår före 1990 och inte vara anslutet till fjärrvärme, och du ska äga och bo i det. Bidrag under 10 000 kr beviljas inte.",
          "Räkneexempel: bergvärme för 200 000 kr till fast pris. Arbetet räknas som 70 000 kr och ROT blir 21 000 kr. Anger fakturan 130 000 kr i material blir Villaeffekten 39 000 kr.",
          "Luft-vatten för 130 000 kr ger på samma sätt 11 700 kr i ROT och, med 91 000 kr i material, 27 300 kr i bidrag. Bidraget räknas på materialet som specificeras på fakturan, inte på schablonen.",
        ],
      },
      {
        h2: "När är frånluftsvärmepump eller luft-luft ett bättre val?",
        body: [
          "En frånluftsvärmepump passar om huset redan har mekanisk frånluftsventilation. Den tar värme ur inomhusluften innan den lämnar huset, och den luften har jämn temperatur året om. Men luftmängden är begränsad och räcker inte alltid till hela värme- och varmvattenbehovet. SCOP ligger på 2,5–4,0 enligt Energimyndighetens guide.",
          "En luft-luftvärmepump är enligt Energimyndigheten ett av få enkla alternativ om huset har direktverkande el. Den värmer rumsluften men inte tappvarmvattnet, fungerar sämre i norra Sverige och gör mest nytta med inomhusdelen centralt placerad. Frånluft omfattas av Villaeffekten, luft-luft gör det inte.",
        ],
      },
    ],
    faq: [
      {
        q: "Behöver man tillstånd för bergvärme?",
        a: "Bergvärme kräver alltid en anmälan till kommunen innan du borrar. En del kommuner kräver tillstånd, och i till exempel vattenskyddsområden kan bergvärme vara helt förbjudet.",
      },
      {
        q: "Fungerar en luft-vattenvärmepump när det är riktigt kallt?",
        a: "Ja, nyare luft-vattenvärmepumpar ger värme ner till −20 eller −30 °C, men då behöver de hjälp av en elpatron. Uteluftvärmepumpar lämpar sig bäst i södra och mellersta Sverige, eftersom de blir mindre effektiva när det är riktigt kallt.",
      },
      {
        q: "Hur länge håller en värmepump?",
        a: "Energimyndighetens värmepumpsguide anger ingen fast livslängd utan betonar skötseln: service en gång om året eller vartannat år, helst före uppvärmningssäsongen. Går pumpen sönder tar spetsvärmen över, så huset blir varmt men elräkningen betydligt högre.",
      },
      {
        q: "Får man Villaeffekten för en luft-luftvärmepump?",
        a: "Nej. Villaeffekten gäller styrbara frånlufts-, luft-vatten-, berg-, sjö- och jordvärmepumpar men inte luft-luftvärmepumpar. Luft-luft ger däremot rotavdrag på arbetet.",
      },
      {
        q: "Hur stort blir rotavdraget på bergvärme 2026?",
        a: "Rotavdraget 2026 är 30 % av arbetskostnaden. Vid fast pris räknas arbetet för bergvärme som 35 % av totalpriset, så avdraget blir cirka 10,5 % av totalen, till exempel 21 000 kr på en installation för 200 000 kr.",
      },
    ],
  },

  "aterbetalningstid-solceller": {
    answer: "Återbetalningstiden för solceller blir cirka 8,5–19 år 2026 i vårt räkneexempel för 7 kWp i Stockholm (SE3), beroende på vad anläggningen kostar. Du räknar ut den som nettopriset efter grönt avdrag delat med årlig nytta: egenanvänd el gånger hela elpriset plus såld el gånger spotpriset. Exemplet ger cirka 5 900 kr per år. Högre egenanvändning, elområde SE4 och, med batteri, stödtjänster kortar tiden. Att skattereduktionen på 60 öre/kWh för såld el slopades 2026 förlängde den.",
    keyFacts: [
      {
        label: "Räkneexempel 2026: 7 kWp i Stockholm (SE3)",
        value: "Cirka 5 900 kr per år: 8,5 år vid 50 000 kr och 19 år vid 110 000 kr netto",
      },
      {
        label: "Värde per kWh 2026 (SE3, Ellevios nät)",
        value: "Egenanvänd cirka 1,40 kr, såld cirka 55 öre",
      },
      {
        label: "Grönt avdrag 2026 vid fast pris",
        value: "14,55 % för solceller och 48,5 % för batteri, högst 50 000 kr per person och år",
      },
      {
        label: "Skattereduktion 60 öre/kWh för såld el",
        value: "Slopad för el som matas in från 1 januari 2026",
      },
      {
        label: "Spotpris vägt efter solproduktion, okt 2025–sep 2026",
        value: "Cirka 55 öre/kWh i SE3 och 64 öre/kWh i SE4",
      },
      {
        label: "Energimyndighetens solelkalkyl, förifyllda värden (okt 2026)",
        value: "Cirka 23 år för en typisk villa, med 2 % kalkylränta",
      },
    ],
    sections: [
      {
        h2: "Hur räknar man ut återbetalningstiden steg för steg?",
        body: [
          "Du räknar ut återbetalningstiden genom att dela nettopriset med den årliga nyttan, alltså värdet av el du slipper köpa plus ersättningen för el du säljer. Det ger en enkel återbetalningstid i år, utan ränta och reparationer. Gör så här:",
        ],
        bullets: [
          "Nettopris: totalpriset minus grönt avdrag. Avdraget är 15 % av kostnaden för arbete och material för solceller och 50 % för batteri. Vid fast pris räknas 97 % av totalpriset som arbete och material, så avdraget blir 14,55 % respektive 48,5 % av totalpriset. Taket är 50 000 kr per person och år för all grön teknik.",
          "Årsproduktion: effekten i kWp, kilowatt toppeffekt, gånger antalet kWh per kWp och år. Energimyndigheten anger 800–1 100 kWh per kW och år som normalt för ett fast system utan skuggning.",
          "Egenanvändning: den del av solelen du använder själv i samma stund som den produceras. En vanlig villa har 20–50 %, enligt Energimyndigheten. Resten matas ut på nätet och säljs.",
          "Värde per kWh: egenanvänd el ersätter spotpris, elhandlarens påslag, energiskatt, rörlig nätavgift och moms. Såld el ger ungefär spotpriset, alltså elbörsens pris, plus några öre i nätnytta från nätbolaget.",
          "Återbetalningstid = nettopris ÷ (egenanvända kWh × köppris + sålda kWh × säljpris).",
        ],
      },
      {
        h2: "Vad är en kWh solel värd 2026?",
        body: [
          "En egenanvänd kWh är värd cirka 1,40 kr och en såld kWh cirka 55 öre i vårt exempel för Stockholm 2026, alltså ungefär 2,5 gånger mer. Därför betyder egenanvändningen så mycket.",
          "Spotpriset 55 öre/kWh är samma nivå som Energimyndigheten antar för såld el i sin solelkalkyl. Det motsvarar också vad solelen var värd i SE3 under oktober 2025–september 2026: vägt efter när solceller producerar var spotpriset cirka 55 öre/kWh, mot 73 öre i snitt för alla timmar. Det är vår beräkning med en produktionsprofil från PVGIS, EU:s beräkningsverktyg för solel.",
          "Skattereduktionen på 60 öre/kWh gäller inte el som matas in från 1 januari 2026. Ersättningen för såld el är inkomst av kapital, men 40 000 kr per år och privatbostad dras av som schablon.",
        ],
        bullets: [
          "Spotpris: 55 öre/kWh, cirka 69 öre med 25 % moms.",
          "Energiskatt: 36,0 öre/kWh 2026, 45 öre med moms.",
          "Rörlig överföringsavgift hos Ellevio från 1 juni 2026: 20,8 öre/kWh, 26,0 öre med moms. Andra nätbolag har andra avgifter.",
          "Egenanvänd kWh: 69 + 45 + 26 öre, alltså cirka 1,40 kr, plus eventuellt påslag från elhandlaren.",
          "Såld kWh: spotpriset, cirka 55 öre, utan moms om du säljer varor och tjänster för högst 120 000 kr per år. Nätnyttan, vanligen några öre per kWh, räknar vi inte med.",
        ],
      },
      {
        h2: "Hur mycket påverkar egenanvändningen återbetalningstiden?",
        body: [
          "Tio procentenheter mer egenanvändning ger cirka 600 kr mer per år för 7 kWp, eftersom 700 kWh då ersätter köpt el för 1,40 kr i stället för att säljas för 55 öre. Det kan flytta återbetalningstiden flera år.",
          "Räkneexemplets antaganden: 7 kWp i Stockholm, till exempel 14 paneler på 500 W, som ger 7 000 kWh per år. Det är 1 000 kWh per kWp, i nivå med vad PVGIS ger för ett skuggfritt tak i söderläge. Nettopriset är antingen 50 000 kr, i nivå med Optimera Energis riktpris för en typisk villa med 14 paneler, eller 110 000 kr, som motsvarar Energimyndighetens medelpris för 2024 på 18 400 kr per kW före avdrag.",
        ],
        bullets: [
          "20 % egenanvändning: cirka 5 000 kr per år. Knappt 10 år vid 50 000 kr och cirka 22 år vid 110 000 kr.",
          "35 % egenanvändning: cirka 5 900 kr per år. Cirka 8,5 år respektive 19 år.",
          "50 % egenanvändning: cirka 6 800 kr per år. Drygt 7 år respektive 16 år.",
          "Ju mer el du använder dagtid, desto högre egenanvändning. Disk, tvätt och elbilsladdning när solen lyser höjer den, liksom ett batteri. En anläggning som är stor jämfört med din elanvändning dagtid sänker den.",
        ],
      },
      {
        h2: "Hur skiljer sig återbetalningstiden mellan SE3 och SE4?",
        body: [
          "Samma anläggning betalar sig cirka 1,5 år snabbare i Malmö (SE4) än i Stockholm (SE3) i vårt exempel: knappt 7 år mot 8,5 år vid 50 000 kr. Två saker skiljer: spotpriset och hur mycket solen ger.",
          "Under oktober 2025–september 2026 var spotpriset i snitt 43 öre/kWh i SE1, 44 öre i SE2, 73 öre i SE3 och 90 öre i SE4, enligt Nord Pool. Vägt efter när solceller producerar var skillnaden mellan SE3 och SE4 ungefär hälften så stor, cirka 55 mot 64 öre/kWh, enligt vår beräkning. Elen är nämligen ofta billigare när solen lyser än på kvällen.",
          "PVGIS ger cirka 10 % högre årsproduktion i Malmö än i Stockholm för samma tak: cirka 1 080 mot 980 kWh per kWp, med 35 graders lutning mot söder.",
        ],
        bullets: [
          "Stockholm (SE3): 7 000 kWh, 35 % egenanvändning och 55 öre ger cirka 5 900 kr per år. Cirka 8,5 år vid 50 000 kr och 19 år vid 110 000 kr.",
          "Malmö (SE4): 7 700 kWh, 35 % egenanvändning och 64 öre ger cirka 7 300 kr per år, och en egenanvänd kWh är värd cirka 1,51 kr. Knappt 7 år respektive cirka 15 år.",
          "Vi räknar med Ellevios överföringsavgift i båda fallen, så att bara elområdet skiljer. Kontrollera ditt eget nätbolags avgift. I SE1 och SE2 är varje kWh solel mindre värd, eftersom spotpriset har varit lägre där.",
        ],
      },
      {
        h2: "Blir återbetalningstiden kortare med batteri?",
        body: [
          "Ett batteri kortar återbetalningstiden i vårt exempel bara om det också säljer stödtjänster. Utan stödtjänster tar sol och batteri tillsammans knappt 11 år att betala, mot 8,5 år för solcellerna ensamma.",
          "Antaganden: grundexemplet i SE3 får ett 10 kWh-batteri för 90 000 kr, inom Optimera Energis prisintervall 70 000–110 000 kr för ett installerat 10 kWh-batteri. Efter 48,5 % grönt avdrag kostar det cirka 46 400 kr. Batteriet flyttar 9 kWh solel till kvällen 150 dagar per år, alltså 1 350 kWh. Egenanvändningen stiger då från 35 till drygt 50 %.",
          "Varje flyttad kWh är värd cirka 1,50 kr. I stället för att säljas för cirka 43 öre mitt på dagen ersätter den köpt el för cirka 1,94 kr på kvällen, med moms, energiskatt och nätavgift. Det bygger på att spotpriset i SE3 april–september 2026 i snitt var 43 öre/kWh klockan 10–15 och 98 öre klockan 17–21, exklusive moms, enligt vår beräkning. Det blir cirka 2 000 kr per år. Prisstyrning vintertid, alltså att ladda billigt och använda elen när den är dyr, ger uppskattningsvis 1 000 kr till.",
          "Stödtjänster innebär att Svenska kraftnät köper effekt i förväg för att hålla elnätet i balans. Villaägare säljer oftast stödtjänsten FCR-D via en aggregator. Under de timmar batteriet är sålt kan det inte användas till annat, så vi räknar då med att solel och prisstyrning bara ger cirka 1 000 kr per år.",
        ],
        bullets: [
          "Utan stödtjänster: batteriet ensamt ger cirka 3 000 kr per år och tar cirka 15 år. Sol och batteri kostar 96 400 kr netto, ger cirka 8 900 kr per år och tar knappt 11 år.",
          "Med FCR-D på 10 kW till Mölndal Energis utbetalningsnivåer, i snitt 52 kr per kW och månad 2025 och cirka 33 kr januari–juni 2026, exklusive moms: 4 000–6 200 kr per år. Sol och batteri tar då cirka 7,5–9 år.",
          "Med Optimera Energis kalkylatorschablon (65 kr per kW växelriktareffekt och månad): 7 800 kr per år och cirka 6,5 år för sol och batteri. Faktiska ersättningar har varierat och legat lägre. Hos Mölndal Energi gav juni 2026 bara 17 kr per kW, exklusive moms.",
          "Optimera Energi anger att ett batteri typiskt höjer självförbrukningen från 30–40 % till 70–80 % och att en helt ny sol- och batterilösning oftast tar 4–7,5 år. Vårt exempel ger lägre egenanvändning och längre tid. Skillnaden beror främst på batteriets storlek, när du använder el och vad stödtjänsterna betalar, och ingen kan lova en viss ersättning.",
          "De flesta batterier har 10 års garanti, enligt Energimyndigheten. Jämför återbetalningstiden med den.",
        ],
      },
      {
        h2: "Varför ger olika kalkyler så olika återbetalningstid?",
        body: [
          "Kalkylerna skiljer sig mest i pris per kW, produktion, elpris och ränta. Energimyndighetens solelkalkyl ger med sina förifyllda värden för en typisk villa cirka 23 år, betydligt längre än vårt exempel.",
          "Den utgår bland annat från medelpriset 2024 på 18 400 kr per kW före avdrag och 900 kWh per kW och år, som är medelproduktionen för anläggningar i elcertifikatsystemet. Den räknar också med kalkylränta, alltså vad pengarna kunde ha gett med en annan placering eller vad ett lån kostar. Förifyllt är 2 %, och Energimyndigheten anger 1–4 % som rimligt för en privatperson.",
          "Lägger du in vårt exempel med 50 000 kr netto i solelkalkylen blir återbetalningstiden cirka 10 år med 2 % kalkylränta, mot 8,5 år i den enkla kalkylen. Tänk också på garantierna: Energimyndigheten anger cirka 15 års produktionsgaranti för solceller men 5 år för de flesta växelriktare, så ta höjd för en reparation eller ett byte.",
        ],
        bullets: [
          "Längre tid: högre pris per kW, skugga eller sämre väderstreck, låg egenanvändning, lägre elpris, ränta och reparationer.",
          "Kortare tid: lägre pris, hög egenanvändning, högre elpris, elområde SE4 och, för batteri, stödtjänster.",
          "Be alltid om antagandena bakom en kalkyl: pris efter avdrag, kWh per kWp, egenanvändning och elpris.",
        ],
      },
    ],
    faq: [
      {
        q: "Hur påverkade slopade 60-öringen återbetalningstiden för solceller?",
        a: "Utan 60 öre/kWh blev återbetalningstiden knappt 3 år längre i vårt grundexempel. De 4 550 kWh som säljs gav tidigare cirka 2 700 kr per år i skattereduktion, om hushållet köpte minst lika mycket el från nätet. Då betalades 50 000 kr på knappt 6 år i stället för 8,5. Underlaget var högst 30 000 kWh per år, och skattereduktionen gäller inte el som matas in från 1 januari 2026.",
      },
      {
        q: "Räknar man med grönt avdrag i återbetalningstiden?",
        a: "Ja. Räkna på nettopriset efter avdraget, eftersom företaget drar av det direkt på fakturan. För solceller är avdraget 15 % av arbete och material, vid fast pris 14,55 % av totalpriset, och för batteri 48,5 %. Taket är 50 000 kr per person och år, och du måste ha betalat tillräckligt med skatt för att få hela avdraget.",
      },
      {
        q: "Ska man räkna med att elpriset stiger?",
        a: "Räkna hellre med flera elpriser än med en stadig ökning. Spotpriset i SE3 var i snitt 41 öre/kWh 2024, 51 öre 2025 och 77 öre januari–september 2026, enligt Nord Pool. Energimyndighetens scenarier pekar på omkring 50–60 öre/kWh i snitt 2030–2060. Högre elpris kortar återbetalningstiden och lägre elpris förlänger den.",
      },
      {
        q: "Vad räknar Energimyndighetens solelkalkyl med?",
        a: "Förifyllt för en typisk villa: 18 400 kr per kW före avdrag, 900 kWh per kW och år, 40 % egenanvändning, 2 kr/kWh för köpt el, 55 öre för såld el, 5 öre i nätnytta, 2 % kalkylränta och 30 års ekonomisk livslängd. Det ger cirka 23 år. Byt till dina egna värden, särskilt pris och produktion, så ändras resultatet mycket.",
      },
      {
        q: "Hur gör man en kalkyl för solceller med batteri?",
        a: "Lägg ihop nettopriserna och den årliga nyttan av båda. Batteriets nytta är skillnaden mellan kvällens köppris och dagens säljpris för den el det flyttar, plus prisstyrning och eventuella stödtjänster. I vårt exempel kostar sol och batteri 96 400 kr efter avdrag och ger cirka 8 900 kr per år utan stödtjänster, alltså knappt 11 år.",
      },
    ],
  },

  "gront-avdrag-2026": {
    answer: "Grönt avdrag 2026 är 15 % av kostnaden för arbete och material när ett företag installerar solceller, och 50 % för batteri som lagrar egenproducerad el och för laddbox till elbil. Vid fast pris blir det 14,55 % respektive 48,5 % av totalpriset. Avdraget är högst 50 000 kr per person och år för all grön teknik och dras direkt på fakturan. För 2027 är inga ändringar beslutade per 5 oktober 2026.",
    keyFacts: [
      {
        label: "Solceller 2026",
        value: "15 % av arbete och material, sänkt från 20 % den 1 juli 2025",
      },
      {
        label: "Batteri och laddbox 2026",
        value: "50 % av arbete och material",
      },
      {
        label: "Vid fast pris 2026",
        value: "14,55 % av totalpriset för solceller, 48,5 % för batteri och laddbox",
      },
      {
        label: "Tak för grönt avdrag 2026",
        value: "50 000 kr per person och år för all grön teknik tillsammans",
      },
      {
        label: "Värmepump 2026",
        value: "Inget grönt avdrag – rotavdrag med 30 % av arbetskostnaden",
      },
      {
        label: "Grönt avdrag 2027",
        value: "Inga ändringar beslutade per 5 oktober 2026; budgetpropositionen senast 12 november 2026",
      },
    ],
    sections: [
      {
        h2: "Hur mycket är grönt avdrag 2026?",
        body: [
          "Grönt avdrag 2026 är 15 % av kostnaden för arbete och material för solceller och 50 % för batteri och laddbox. Det formella namnet är skattereduktion för installation av grön teknik, och den har funnits sedan 1 januari 2021. Avdraget för solceller sänktes från 20 till 15 % den 1 juli 2025, efter beslut i riksdagen.",
          "Bara arbete och material ger avdrag. Har du och företaget kommit överens om ett fast pris för hela installationen, så kallad totalentreprenad, får arbete och material enligt Skatteverket räknas som 97 % av totalpriset. Avdraget blir då 14,55 % av totalpriset för solceller och 48,5 % för batteri och laddbox.",
          "Taket är 50 000 kr per person och år, och det är gemensamt för solceller, batteri och laddbox. Installerar du solceller och batteri vid samma tillfälle räknas växelriktaren till solcellsinstallationen, enligt Skatteverket. Solcellerna och batteriet bör redovisas var för sig på fakturan.",
          "Räkneexempel med påhittade priser: solceller för 120 000 kr och ett batteri för 100 000 kr, båda till fast pris. Avdraget blir 17 460 kr för solcellerna och 48 500 kr för batteriet, totalt 65 960 kr. Äger du huset ensam stannar avdraget vid 50 000 kr. Äger ni huset tillsammans, båda betalar och ni delar lika blir det 32 980 kr var. Exemplet förutsätter att ingen av er har använt grönt avdrag för något annat samma år och att ni har betalat tillräckligt med skatt.",
        ],
      },
      {
        h2: "Vilka villkor gäller för grönt avdrag?",
        body: [
          "Du får grönt avdrag om du äger bostaden när arbetet görs, installationen hör till ditt eller din förälders hushåll och ett företag gör jobbet. Bostaden kan vara ett småhus, en ägarlägenhet, en bostadsrätt som du har eller ett hus under byggnad som ska bli småhus eller ägarlägenhet. Även ett fritidshus som du äger räknas.",
          "Bor du i bostadsrätt ska installationen vara kopplad till din lägenhet och bara komma den till nytta, men den behöver inte sitta i eller på lägenheten. Avtalet ska tecknas med dig, och installationen ska följa med lägenheten om du säljer. En gemensam anläggning som flera hushåll använder, till exempel solceller som förser hela huset, ger inget grönt avdrag. Avdraget ges bara till privatpersoner, inte till föreningen.",
          "Dessutom gäller det här:",
        ],
        bullets: [
          "Företaget ska vara godkänt för F-skatt när ni gör avtalet eller när du betalar. Det kan du kontrollera i Skatteverkets tjänst Hämta företagsinformation.",
          "Köper du bara material får du inget avdrag. Har du eget material får du avdrag bara för arbetet.",
          "Du ska betala elektroniskt, till exempel med kort, Swish eller via banken. Kontant betalning ger inget avdrag.",
          "Bostaden ska vara ansluten till elnätet. Hyrd eller uthyrd bostad och ditt barns bostad ger inget avdrag, och inte heller en installation som också förser till exempel ett uthyrt hus med el.",
          "Du ska ha fyllt 18 år senast vid årets slut och vara skattskyldig i Sverige.",
          "Får du rotavdrag, försäkringsersättning eller bidrag från stat, kommun eller region för installationen ger den inget grönt avdrag.",
        ],
      },
      {
        h2: "Vad ingår i grönt avdrag för solceller, batteri och laddbox?",
        body: [
          "Grönt avdrag gäller själva installationen och det material som behövs för den, men inte kostnader runt omkring som resor, frakt, maskiner, projektering och administration. Den delen betalar du fullt ut. Det här står i Skatteverkets lista över godkända arbeten:",
        ],
        bullets: [
          "Solceller: avdraget gäller solcellerna och material som behövs, till exempel stativ, kablage och växelriktare. Anslutningsavgiften till elnätet, byte eller uppgradering av elcentralen, ombyggnad av taket och återställningsarbete ingår inte. Reparation och nedmontering ger inget grönt avdrag men kan ge rotavdrag.",
          "Batteri: batteriet ska vara kopplat till en nätansluten anläggning för egen förnybar el, till exempel solceller, och lagra egenproducerad el. Solcellerna ska redan finnas eller installeras samtidigt. Ett batteri utan egen elproduktion ger inget avdrag, och inte heller reparation och underhåll.",
          "Stödtjänster: sedan 4 juli 2024 godtar Skatteverket att batteriet delvis används för stödtjänster till elnätet eller för elprisarbitrage, alltså att lagra el när den är billig och använda den när den är dyr. Villkoret är att batteriet också lagrar din egen el.",
          "Laddbox: avdraget gäller en väggfast laddbox eller en fristående laddstolpe som bara ditt hushåll använder. Den ska vara förberedd för elmätning och debitering av elkostnad och ha uttag eller kontaktdon av typ 2 eller typ Combo enligt standarderna EN 62196-2 och EN 62196-3.",
          "Det som normalt ger avdrag för laddboxen är själva laddningspunkten, fästet, kabeldragningen till elcentralen och laddkabeln. Nyinstallation, byte eller utökning av elcentralen ingår inte, och inte heller mobila laddare eller extra laddkablar. Arbetet med elcentralen kan i stället ge rotavdrag.",
        ],
      },
      {
        h2: "Hur fungerar grönt avdrag hos Skatteverket?",
        body: [
          "Företaget drar av grönt avdrag direkt på fakturan och begär sedan pengarna från Skatteverket, så du behöver inte ansöka själv. Grönt avdrag är en skattereduktion, alltså en minskning av din skatt, som du får i förskott som avdrag på fakturan. Systemet liknar rot- och rutavdraget men är en egen skattereduktion med eget tak.",
          "Företaget får begära utbetalning först när installationen är klar och slutbetald, och begäran ska ha kommit in till Skatteverket senast den 31 januari året efter att du betalade. När Skatteverket har beslutat får du ett meddelande om preliminär skattereduktion. Kontrollera att företaget, betalningsdagen, beloppet och fastighetsbeteckningen stämmer. Vill du veta om begäran har skickats in frågar du företaget, eftersom Skatteverket inte får lämna ut det.",
          "Avdraget syns i deklarationen året efter. Har du betalat för lite skatt för att rymma avdraget får du betala tillbaka skillnaden. Skatteverkets exempel: blir din slutliga skatt 35 000 kr och företaget har fått 50 000 kr för din installation, betalar du tillbaka 15 000 kr. Med Skatteverkets tjänst Räkna ut skatt kan du uppskatta utrymmet i förväg, särskilt om du också använder rot- eller rutavdrag samma år.",
          "Det är året du slutbetalar som avgör vilket år avdraget räknas till. Betalar du en del i förskott ett år och slutbetalar nästa år räknas båda betalningarna till det andra året. Hur mycket du har kvar av årets tak kan du få veta genom ett intyg från Skatteverket.",
        ],
      },
      {
        h2: "Får man grönt avdrag för värmepump, och kan det kombineras med rotavdrag?",
        body: [
          "Nej, en värmepump ger inte grönt avdrag, men installationen kan ge rotavdrag med 30 % av arbetskostnaden 2026. Grönt avdrag gäller bara solceller, batterier och laddningspunkter, medan Skatteverket räknar installation av värmepump som rotarbete.",
          "Vid fast pris kan arbetet enligt Skatteverkets schablon räknas som 35 % av totalpriset för bergvärme och andra vätska-vattenvärmepumpar och 30 % för luftvärmepumpar, till exempel luft-vatten, luft-luft och frånluft. Rotavdraget blir då cirka 10,5 % respektive 9 % av totalpriset.",
          "Rot- och rutavdrag har ett eget tak på upp till 75 000 kr per person och år, skilt från taket för grönt avdrag. Du kan alltså få båda samma år för olika arbeten, om du har betalat tillräckligt med skatt. Men grönt avdrag och rotavdrag kan aldrig ges för samma arbete.",
          "Skatteverkets exempel: lägger du om taket och installerar sedan solceller kan du få rotavdrag för takomläggningen och grönt avdrag för solcellerna. På samma sätt kan arbete med elcentralen inför en laddbox ge rotavdrag, medan laddboxen ger grönt avdrag.",
        ],
      },
      {
        h2: "Vad gäller för grönt avdrag 2027?",
        body: [
          "För 2027 är inga ändringar av grönt avdrag beslutade per 5 oktober 2026, så dagens procentsatser och tak gäller tills riksdagen beslutar något annat.",
          "Under ett valår lämnas budgetpropositionen tre veckor efter statsministeromröstningen eller regeringsskiftet. Budgetpropositionen för 2027 ska enligt regeringen lämnas till riksdagen senast den 12 november 2026. I regeringens sammanställning från maj 2026 över skatteförslag som skickats på remiss inför höstbudgeten 2027 finns inget om grönt avdrag. Regeringen skriver samtidigt att det beror på bland annat valutgången och det ekonomiska läget om förslagen kommer med i budgeten.",
          "Ett förslag som rör grönt avdrag från 1 januari 2027 ligger redan hos riksdagen: effektivare kontroll av rot, rut och grön teknik (proposition 2025/26:282). Företaget ska då bland annat ange om underentreprenörer eller bemanningsföretag har anlitats, och uppgifterna ska lämnas på heder och samvete. Förslaget gäller inte procentsatserna eller taket, och riksdagen har ännu inte beslutat om det.",
          "Avdraget räknas till det år du slutbetalar och mot det årets tak. Planerar du en installation kring årsskiftet bör du läsa om reglerna på nytt när budgetpropositionen har lämnats.",
        ],
      },
    ],
    faq: [
      {
        q: "Är grönt avdrag per person eller per hushåll?",
        a: "Per person. Taket är 50 000 kr per person och år för all grön teknik tillsammans. Äger ni bostaden tillsammans och båda betalar kan ni dela avdraget, och då har var och en sitt eget tak. Båda behöver ha betalat tillräckligt med skatt, och det bör stå på fakturan hur mycket var och en ska få.",
      },
      {
        q: "Är grönt avdrag samma som rotavdrag?",
        a: "Nej. Grönt avdrag är en egen skattereduktion med eget tak, även om den fungerar på samma sätt med avdrag direkt på fakturan. Grönt avdrag gäller arbete och material, rotavdraget bara arbetskostnaden. Samma arbete kan inte ge båda.",
      },
      {
        q: "Vad händer om min skatt inte räcker till grönt avdrag?",
        a: "Då får du betala tillbaka det du fått för mycket när den slutliga skatten räknas ut, eftersom avdraget inte kan bli större än din slutliga skatt. Är ni gifta eller sambor med gemensamt hushåll kan ni omfördela avdraget till den som har skatt kvar att räkna av mot, om den personen också uppfyller villkoren.",
      },
      {
        q: "Får man grönt avdrag för växelriktaren?",
        a: "Ja, växelriktaren räknas som material som behövs för solcellsinstallationen. Installerar du solceller och batteri vid samma tillfälle räknar Skatteverket växelriktaren till solcellsinstallationen, så den ger 15 % och inte 50 %.",
      },
      {
        q: "Gäller grönt avdrag för fritidshus?",
        a: "Ja, om du äger fritidshuset, det är inrett för boende, används av ditt hushåll och är anslutet till elnätet. Hyr du ut det, eller bor någon annan där permanent, får du inget avdrag för installationen.",
      },
    ],
  },

  "solceller-pris-2026-stockholm": {
    answer: "Solceller på en villa i Stockholm kostar 2026 runt 92 500 kr för 5 kW före avdrag, räknat med Energimyndighetens allmänna prisexempel, och cirka 79 000 kr efter grönt avdrag på 14,55 %. Optimera Energis riktpris för en typisk villa med 14 paneler är runt 50 000 kr efter avdrag. I stora delar av Stockholms stad krävs bygglov, som kostar 5 620 kr enligt stadens taxa.",
    keyFacts: [
      {
        label: "Energimyndighetens prisexempel 2026, 5 kW",
        value: "Cirka 92 500 kr inkl. moms före avdrag, runt 79 000 kr efter",
      },
      {
        label: "Grönt avdrag för solceller 2026",
        value: "15 % av arbete och material, 14,55 % av totalpriset vid fast pris, högst 50 000 kr per person och år",
      },
      {
        label: "Solel per kWp i Stockholm (PVGIS)",
        value: "Cirka 940–970 kWh per år mot söder, 30 graders lutning",
      },
      {
        label: "Bygglovsavgift i Stockholms stad (taxa sedan 2024)",
        value: "5 620 kr för solpaneler på en villa, när lov krävs",
      },
      {
        label: "Ellevios nätnytta 2026, nätprisområde Stockholm",
        value: "3,30–4,40 öre/kWh exkl. moms, ingen avgift för inmatning",
      },
      {
        label: "Avgiftsfri inmatning enligt ellagen",
        value: "Högst 63 A och 43,5 kW, ellagen upphävs 1 januari 2027",
      },
    ],
    sections: [
      {
        h2: "Vilket pris ska du räkna med för solceller i Stockholm?",
        body: [
          "Räkna med ungefär 92 500 kr inklusive moms före avdrag för en villaanläggning på 5 kW, enligt Energimyndighetens prisexempel. Myndigheten beskriver 5 kW som rimligt för en vanlig villa. Effekten anges ofta i kWp, kilowatt peak, som är panelernas sammanlagda toppeffekt.",
          "Optimera Energis riktpris för en typisk villa med 14 paneler är runt 50 000 kr efter grönt avdrag på 14,55 %. Det är företagets eget pris och inte ett marknadssnitt. Priset skiljer sig mellan leverantörer, så be om flera offerter och räkna om dem till kronor per kW.",
          "Enligt Energimyndigheten påverkas priset bland annat av anläggningens storlek, vilken leverantör du väljer, vilken typ av solceller du vill ha och hur svår installationen är. Kostnaden per watt blir oftast lägre ju större anläggningen är, eftersom arbetskostnaden är ungefär densamma för en stor och en liten anläggning.",
          "Två kostnader utöver själva anläggningen kan tillkomma: avgiften för bygglov där lov krävs och, från 2027, avgifter till nätbolaget, eftersom ellagens regler om avgiftsfri anslutning och inmatning då upphör. Båda förklaras längre ned.",
        ],
      },
      {
        h2: "Vad kostar 5, 10 och 15 kW efter grönt avdrag?",
        body: [
          "Räknat på Energimyndighetens prisexempel kostar 5 kW cirka 79 000 kr och 15 kW cirka 192 000 kr efter grönt avdrag. För 10 kW blir det cirka 128 000–158 000 kr, om priset per kW hamnar mellan de två exemplen. Grönt avdrag är skattereduktionen för installation av grön teknik. För solceller är den 15 % av kostnaden för arbete och material. Vid fast pris räknas 97 % av totalpriset som arbete och material, så avdraget blir 14,55 % av totalpriset.",
          "Företaget drar av skattereduktionen direkt på fakturan. Resor, utrustning och projektering ger inget avdrag. Taket är 50 000 kr per person och år för all grön teknik tillsammans, och du behöver ha betalat tillräckligt med skatt. Solceller ensamma når taket först vid ett totalpris på cirka 344 000 kr, men installerar du samma år ett batteri, som ger 50 % avdrag, kan du slå i taket. Äger ni huset tillsammans kan ni båda få skattereduktion.",
          "Exemplen räknar med priser inklusive moms och 14,55 % avdrag:",
        ],
        bullets: [
          "5 kW: 92 500 kr före avdrag, cirka 13 500 kr i avdrag och cirka 79 000 kr efter. Energimyndighetens exempel för en vanlig villa.",
          "10 kW: cirka 150 000–185 000 kr före avdrag och 128 000–158 000 kr efter. Energimyndigheten har inget exempel för 10 kW, så här antas 15 000–18 500 kr per kW, alltså mellan myndighetens exempel för 15 och 5 kW.",
          "15 kW: 225 000 kr före avdrag, Energimyndighetens genomsnittspris för en mindre fastighet eller ett mindre lantbruk. Sitter anläggningen på din villa blir avdraget cirka 32 700 kr och priset cirka 192 000 kr.",
        ],
      },
      {
        h2: "Hur mycket el ger solceller i Stockholm?",
        body: [
          "I Stockholm ger solceller cirka 940–970 kWh per kWp och år mot söder med 30 graders lutning, enligt EU-kommissionens beräkningsverktyg PVGIS. Beräkningen bygger på soldata från 2005–2023 och 14 % förluster i systemet, och spannet beror på hur panelerna är monterade. Energimyndigheten anger 800–1 100 kWh per kW och år i söderläge med 30–50 graders lutning och utan skugga.",
          "Solinstrålningen mot en vågrät yta är i snitt cirka 990 kWh per kvadratmeter och år enligt samma beräkning. Drygt tre fjärdedelar av solelen kommer under april–september. En kWp ger runt 140 kWh i juni men bara cirka 10 kWh i december.",
          "Mot öster eller väster ger samma tak cirka 730–760 kWh per kWp, knappt 80 % av söderläget. Delvis skuggade anläggningar ger i regel mindre, enligt Energimyndigheten. Med Stockholms stads solkarta kan du uppskatta hur mycket energi ditt eget tak kan ge.",
          "Med siffrorna från PVGIS för söder och 30 graders lutning blir årsproduktionen:",
        ],
        bullets: [
          "5 kWp: cirka 4 700–4 800 kWh per år",
          "10 kWp: cirka 9 400–9 700 kWh per år",
          "15 kWp: cirka 14 000–14 500 kWh per år",
        ],
      },
      {
        h2: "Behöver du bygglov för solceller i Stockholm?",
        body: [
          "Ofta ja i Stockholms stad, trots att reglerna från 1 december 2025 i grunden gör solceller på villor bygglovsfria. Enligt Boverket behöver du inget bygglov för solceller på taket eller fasaden på ett småhus, som en villa eller ett radhus. Undantagen gör dock att lov krävs i vissa områden.",
          "Stockholms stad skriver att du behöver bygglov för solceller i stora delar av staden. Inom detaljplan, alltså kommunens plan för hur ett område får bebyggas, krävs lov om huset ligger inom eller i anslutning till ett riksintresse för totalförsvaret, ett område av nationell betydelse för försvaret. Stora delar av Stockholm omfattas bland annat av riksintresset för väderradarn i Håtuna.",
          "Lov krävs också för särskilt kulturhistoriskt värdefulla byggnader och områden, och där detaljplanen har bestämmelser om skydd för särskilda värden. Stadsmuseets klassificeringskarta ger en första indikation på om ditt hus berörs. Det är kommunen som avgör, i Stockholms stad stadsbyggnadskontoret.",
          "Krävs lov kostar det 5 620 kr för solpaneler på en villa enligt stadsbyggnadsnämndens taxa, som gäller sedan februari 2024: 3 350 kr för lovet och 2 270 kr för genomförandet. Beslut ska komma inom tio veckor från att ansökan är komplett, och tiden kan förlängas en gång med högst tio veckor.",
          "I kranskommunerna gäller samma regler i plan- och bygglagen, men utfallet beror på detaljplan, kulturvärden och riksintressen där huset ligger. Solna stad skriver till exempel att du alltid behöver bygglov om solcellerna sätts upp inom detaljplan och samtidigt inom eller i anslutning till ett riksintresse för totalförsvaret. Fråga byggnadsnämnden i din kommun innan du beställer. Även utan bygglov ska installationen vara varsam mot huset, och taket ska klara den nya lasten.",
        ],
      },
      {
        h2: "Vilka villkor har nätbolagen i Stockholm för solceller?",
        body: [
          "Ellevio, som äger elnätet i nätområdet Stockholm, tar 2026 ingen avgift för inmatningen och betalar 3,30–4,40 öre/kWh i nätnytta. Nätnytta är nätbolagets ersättning för att din el minskar förlusterna i elnätet. Den högre nivån gäller under höglasttid, vardagar kl. 6–22 från november till mars. Beloppen är exklusive moms, och privatpersoner får dem utan moms. Drygt 80 % av solelen i Stockholm produceras april–oktober, så det mesta ger den lägre nivån.",
          "Ellevios villkor för mikroproduktion, egen elproduktion med huvudsäkring upp till 63 A, är att växelriktarens effekt inte får vara större än huvudsäkringen tillåter. Växelriktaren gör om solelen till växelström. Gränsen är 11,1 kW vid 16 A, 13,9 kW vid 20 A och 17,3 kW vid 25 A. Med en separat produktionssäkring på högst 25 A kan även 16 och 20 A få upp till 17,3 kW.",
          "I länet finns också andra nätbolag, bland dem Vattenfall Eldistribution, som betalar 10,4 öre/kWh i nätnytta 2026 för inmatning på lågspänning, som villor har. Vilket nätbolag du har står på elnätsfakturan, och villkoren för solel skiljer sig mellan bolagen.",
          "Enligt ellagen ska du inte betala någon avgift för inmatningen om din säkring är högst 63 A och anläggningen kan mata in högst 43,5 kW. Du ska inte heller betala för att ansluta anläggningen, om dess effekt inte är större än ditt uttagsabonnemang. Ellagen upphävs den 1 januari 2027, och då upphör också de reglerna. Fråga ditt nätbolag vilka avgifter som gäller från 2027, särskilt om anläggningen ansluts efter årsskiftet.",
        ],
      },
      {
        h2: "Vad är solelen värd i elområde SE3?",
        body: [
          "En kWh du säljer ger det elhandlaren betalar plus några öre i nätnytta, medan en kWh du använder själv sparar allt du annars hade betalat för den. Sverige har fyra elområden, SE1–SE4, och ibland skiljer sig elpriset mellan dem. Stockholm ligger i elområde 3, SE3.",
          "Som jämförelse låg månadsmedelpriset på elbörsen i SE3 mellan 23 och 52 öre/kWh under april–september 2025, och på 51,4 öre/kWh för hela året. Vad du får för den el du säljer beror på avtalet med din elhandlare.",
          "Den el du använder själv slipper du köpa. Då slipper du också nätbolagets överföringsavgift och energiskatten för den kilowattimmen, plus moms. Därför är egenanvänd solel oftast värd mer än såld.",
        ],
      },
    ],
    faq: [
      {
        q: "Behöver man bygglov för solceller i Stockholm?",
        a: "Ofta ja i Stockholms stad. Staden skriver att lov krävs i stora delar av Stockholm, bland annat på grund av riksintresset för väderradarn i Håtuna. Lov krävs också för särskilt kulturhistoriskt värdefulla byggnader och områden. Stadsbyggnadskontoret avgör vad som gäller för ditt hus.",
      },
      {
        q: "Vad kostar bygglov för solceller i Stockholm?",
        a: "I Stockholms stad kostar bygglov för solpaneler på en villa 5 620 kr enligt stadsbyggnadsnämndens taxa från februari 2024, varav 3 350 kr för lovet och 2 270 kr för genomförandet. Andra kommuner tar ut avgift enligt sina egna taxor.",
      },
      {
        q: "Hur mycket el ger 10 kW solceller i Stockholm?",
        a: "Cirka 9 400–9 700 kWh per år mot söder med 30 graders lutning, enligt EU:s beräkningsverktyg PVGIS. Mot öster eller väster blir det cirka 7 300–7 600 kWh, och skugga sänker produktionen ytterligare.",
      },
      {
        q: "Vad betalar Ellevio för solel 2026?",
        a: "Ellevio betalar nätnytta på 3,30 öre/kWh, och 4,40 öre/kWh under höglasttid, i nätprisområde Stockholm 2026, exklusive moms. Ellevio tar ingen avgift för inmatningen. Betalt för själva elen får du av det elhandelsföretag du säljer överskottet till.",
      },
      {
        q: "Kostar det något att mata in solel på elnätet?",
        a: "Enligt ellagen ska du inte betala någon avgift för inmatningen om din säkring är högst 63 A och anläggningen kan mata in högst 43,5 kW, och Ellevio tar ingen sådan avgift 2026. Ellagen upphävs den 1 januari 2027, så fråga ditt nätbolag vilka avgifter som gäller därefter.",
      },
    ],
  },
};

export function getGuideContent(slug: string): GuideContent | null {
  return GUIDE_CONTENT[slug] ?? null;
}
