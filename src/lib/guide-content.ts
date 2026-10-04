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
    tldr: [
      "En ren solanläggning i Stockholm (SE3) har återbetalningstid på 8–11 år vid dagens spotpris.",
      "Med batteri och stödtjänster (FCR-D / aFRR) via Energy IQ eller Enequi Core kommer återbetalningstiden ner mot 3–5 år för hus med högre förbrukning.",
      "Elområde, självförbrukningsgrad och om du använder en EMS-plattform påverkar mer än vilket panelmärke du väljer.",
    ],
    sections: [
      {
        h2: "Vad återbetalningstid faktiskt betyder",
        body: [
          "Återbetalningstid är antal år tills besparingen och eventuella intäkter har täckt din nettoinvestering. Nettoinvestering = bruttopris minus grönt avdrag (14,55 % för sol, 48,5 % för batteri och laddbox).",
          "Det är inte samma sak som livslängd. JA Solar-paneler har 25 års effektgaranti, så efter återbetalning fortsätter anläggningen att tjäna pengar i minst 15 år till. Det är där den riktiga vinsten ligger.",
        ],
      },
      {
        h2: "Räkneexempel: 20 paneler i Solna, ren solanläggning",
        body: [
          "20 st JA Solar 500 W = 10 kWp installerat. Pris efter grönt avdrag landar på cirka 55 500 kr.",
          "Med Stockholm-snitt (1 050 kWh/kWp/år, spotpris 1,45 kr/kWh, feed-in 0,85 kr/kWh) och 32 % självförbrukning utan batteri ger anläggningen ungefär 9 200 kr i årlig besparing.",
          "Återbetalningstid: 55 500 / 9 200 = 6 år. Det är bra, men inte fantastiskt – och hela uppsidan ligger i åren efter återbetalning.",
        ],
      },
      {
        h2: "Räkneexempel: samma anläggning plus 23 kWh Easyway",
        body: [
          "Lägg till en Easyway 23 kWh-batteri med Solis 10 kW växelriktare och Energy IQ som EMS. Bruttopris för batteripaketet 118 146 kr, nettopris efter 48,5 % grönt avdrag cirka 60 845 kr.",
          "Självförbrukningsgraden hoppar från 32 % till 60 %, vilket gör att solbesparingen växer till 12 000 kr. Plus 7 800 kr i stödtjänstintäkt från FCR-D (Solis 10 kW × 65 kr/månad × 12). Plus 13 800 kr i batteri-arbitrage som EMS-en löper.",
          "Total årlig nettonytta: cirka 30 000–38 000 kr. Återbetalningstid för helhetspaketet: 116 000 / 35 000 = drygt 3 år.",
        ],
        bullets: [
          "Solanläggning ensam: 6 års återbetalning, 9 200 kr/år.",
          "Solanläggning + batteri + EMS: 3,3 års återbetalning, 35 000 kr/år.",
          "Skillnaden ligger i självförbrukning och stödtjänster, inte i hårdvarans märke.",
        ],
      },
      {
        h2: "Variablerna som faktiskt rör nålen",
        body: [
          "Vi har räknat på tusentals scenarier. Tre variabler påverkar mer än alla andra tillsammans:",
        ],
        bullets: [
          "Spotpris och elområde. SE3 (Stockholm) ger 1,45 kr/kWh i snitt, SE4 (Skåne) 1,85, SE1/SE2 (norr) 0,55–0,65. Norra Sverige har dubbelt så lång återbetalningstid.",
          "Självförbrukning. Ju mer av din producerade el du själv använder, desto mer värd är varje kWh. Batteri lyfter självförbrukningen från 32 % till 60–92 %.",
          "Stödtjänster. Enequi Core eller Energy IQ ger access till FCR-D och aFRR – 65 kr per kW växelriktare per månad i ren intäkt. Inga andra EMS:er erbjuder detta i Sverige idag.",
        ],
      },
      {
        h2: "Vad vi rekommenderar",
        body: [
          "Räkna på din egen anläggning i vår kalkylator innan du bokar hembesök. Den använder samma motor och samma siffror som vi använder vid offert – byt panelmärke, batteri, EMS och se hur återbetalningstiden ändras i realtid.",
          "Vid hembesöket går vi igenom takets faktiska förutsättningar (orientering, lutning, skuggning) och justerar siffrorna efter det. Inget är slutgiltigt förrän vi har sett taket med drönaren.",
        ],
      },
    ],
    faq: [
      {
        q: "Hur lång återbetalningstid får jag om jag bor i SE4?",
        a: "I SE4 (Skåne och södra Götaland) är spotpriset cirka 28 % högre än i SE3, vilket sänker återbetalningstiden för sol med ungefär ett år. Med Emaldo Power Store kvalificerar du dig dessutom för Grid Rewards (1 370 kr/månad garanterat) – det ger ytterligare 16 440 kr i årlig intäkt på batteridelen.",
      },
      {
        q: "Vad händer med ekonomin om jag redan har solpaneler?",
        a: "Om du har befintlig solanläggning behöver du inte räkna med solinvesteringen igen – då är det batteripaketet som ska betala sig självt. Med 23 kWh Easyway, Solis 10 kW och Energy IQ ligger nettoinvesteringen på cirka 60 000 kr och årlig nettonytta 30 000–38 000 kr. Återbetalningstid 1,6–2 år.",
      },
      {
        q: "Räknar ni med elprisstegring i återbetalningstiden?",
        a: "Nej, vi räknar konservativt med dagens spotpriser och feed-in-priser. Verklig återbetalningstid blir nästan alltid kortare än vad kalkylatorn visar eftersom elpriset historiskt stigit 4-6 % per år. Vi vill hellre överraska dig positivt än sälja på framtidssiffror.",
      },
      {
        q: "Hur räknar grön teknik-avdraget mot återbetalningstiden?",
        a: "Avdraget hanteras automatiskt av installatören i fakturan, så du betalar redan ditt nettopris. Avdragstaket är 50 000 kr per fastighetsägare och år. För ett par ägare och en kombinerad sol-, batteri- och laddboxinstallation kan ni komma upp i hela 100 000 kr i avdrag samma år.",
      },
    ],
  },

  "gront-avdrag-2026": {
    tldr: [
      "Grönt teknik-avdrag 2026: 14,55 % för solpaneler, 48,5 % för batteri och laddbox, ROT på arbetskostnaden för värmepump.",
      "Avdragstaket är 50 000 kr per fastighetsägare och år. Två ägare ger 100 000 kr.",
      "Avdraget dras direkt på fakturan av installatören. Du betalar nettopriset, vi sköter rapporteringen till Skatteverket.",
    ],
    sections: [
      {
        h2: "Vad är grönt teknik-avdrag?",
        body: [
          "Grönt teknik-avdrag är ett skatteavdrag som infördes 2021 för att accelerera energiomställningen i svenska hem. Det funkar som ROT- och RUT-avdraget – installatören drar av en procent av arbets- och materialkostnaden direkt på din faktura och fakturerar Skatteverket separat.",
          "Du behöver inte själv ansöka, vi sköter all administration. Det enda kravet på dig är att du har en taxerad inkomst som motsvarar avdraget.",
        ],
      },
      {
        h2: "Procentsatser per tjänst 2026",
        body: ["Aktuella satser för året:"],
        bullets: [
          "Solpaneler: 14,55 % av hela installationskostnaden (material + arbete).",
          "Batterilager: 48,5 %. Förutsättning är att huset har en sol-anläggning (befintlig eller ny).",
          "Laddbox för elbil: 48,5 %. Gäller hela installationen inklusive nya säkringar.",
          "Värmepump: ROT-avdrag på 30 % av arbetskostnaden (inte grönt avdrag). Vid fast pris räknar Skatteverket arbetet som 35 % av totalen för bergvärme och 30 % för luftvärmepumpar. Räknas mot ROT-taket, inte grönt-taket.",
        ],
      },
      {
        h2: "Avdragstak och hur det räknas",
        body: [
          "Grönt avdrag har ett tak på 50 000 kr per fastighetsägare och kalenderår. Om ni är två ägare på fastigheten är taket 100 000 kr.",
          "ROT-avdraget för värmepump har ett separat tak på 50 000 kr per person och år. Du kan alltså i samma år ta ut maximalt grönt avdrag PLUS maximalt ROT-avdrag.",
          "Praktiskt exempel: ett par investerar i ett sol+batteri-paket på 200 000 kr. Avdraget blir cirka 70 000 kr fördelat på de två ägarna. Båda kommer under 50 000 kr-taket. Skulle samma par lägga till en värmepump dras ROT-avdraget – 30 % av arbetskostnaden – separat, mot ett eget tak.",
        ],
      },
      {
        h2: "Vanliga missförstånd",
        body: [
          "Vi möter samma missförstånd om och om igen. Här är de tre vanligaste:",
        ],
        bullets: [
          "Du behöver inte ansöka i förväg. Installatören sköter rapporteringen efter att jobbet är klart.",
          "Batteriavdraget kräver att huset har sol. Skatteverket godkänner inte 48,5 % på batterier i hus utan solanläggning. Vi installerar alltid batteri ihop med sol (befintlig eller ny).",
          "Avdraget gäller på material PLUS arbete. Det är inte ett ROT-avdrag som bara gäller arbete – hela installationskostnaden inkluderas.",
        ],
      },
      {
        h2: "Räkneexempel: full installation hos Optimera Energi",
        body: [
          "Ett par i Solna bygger ut: 20 paneler, 23 kWh Easyway, Easee laddbox, ingen värmepump.",
        ],
        bullets: [
          "Solpaneler: bruttopris 65 000 kr, avdrag 9 458 kr (14,55 %).",
          "Batteri inkl Solis växelriktare: bruttopris 118 146 kr, avdrag 57 301 kr (48,5 %).",
          "Laddbox + installation: bruttopris 16 500 kr, avdrag 8 003 kr (48,5 %).",
          "Totalt grönt avdrag: 74 762 kr fördelat på 2 ägare. Båda långt under 50 000 kr-taket.",
          "Nettopris efter avdrag: 124 884 kr.",
        ],
      },
      {
        h2: "Vad du behöver veta innan du tecknar avtal",
        body: [
          "Säkerställ att installatören har F-skatt och är registrerad för grönt avdrag hos Skatteverket. Optimera Energilösningar i Mälardalen AB (org.nr 559375-2206) är båda. Vi visar avdraget separat på offerten så du ser exakt vad du betalar netto.",
          "Vi rekommenderar att du loggar in på skatteverket.se efter installation och bekräftar att avdraget bokförts mot din person. Det är samma princip som ROT-avdrag – tar normalt 4-8 veckor från fakturadatum.",
        ],
      },
    ],
    faq: [
      {
        q: "Kan jag få grönt avdrag om jag bor i bostadsrätt?",
        a: "Ja, om du som bostadsrättshavare bekostar installationen och den sker inom din lägenhet eller på dina egna installationer. För gemensamma anläggningar (t.ex. solpaneler på taket i en BRF) är det föreningen som äger anläggningen och avdragsreglerna blir andra. Vi tar diskussionen med er styrelse om ni är osäkra.",
      },
      {
        q: "Vad händer om min inkomst inte räcker till avdraget?",
        a: "Avdraget kräver att du har en taxerad inkomst som motsvarar minst avdragsbeloppet. Saknar du tillräcklig inkomst kan du inte få avdraget. För par är det dock möjligt att fördela avdraget mellan ägarna så att den med högre inkomst tar mer av det.",
      },
      {
        q: "Räknas Emaldo Grid Rewards mot avdraget?",
        a: "Nej, Emaldo Grid Rewards är en intäkt från Emaldo (inte ett avdrag på installationspriset). Du får både grönt avdrag på 48,5 % på batteripaketet OCH månadsutbetalningarna från Emaldo, om du bor i SE3 eller SE4.",
      },
      {
        q: "Kan jag kombinera grönt avdrag med ROT?",
        a: "Ja, men inte på samma åtgärd. Grönt avdrag och ROT har separata tak (50 000 kr vardera per person och år). En sol- och batteriinstallation tar grönt avdrag, en värmepump tar ROT. Du kan alltså få båda samma år om du installerar olika åtgärder.",
      },
    ],
  },

  "solceller-pris-2026-stockholm": {
    tldr: [
      "Solceller i Stockholm 2026 kostar cirka 6 300–8 000 kr per kWp netto efter grönt avdrag, beroende på anläggningens storlek.",
      "En typisk villa med 14 paneler (7 kWp) landar runt 50 000 kr efter det gröna avdraget på 14,55 %.",
      "Priset styrs mest av takets förutsättningar (lutning, skuggning, infästning) och om du lägger till batteri, inte av panelmärket.",
    ],
    sections: [
      {
        h2: "Vad solceller kostar i Stockholm 2026",
        body: [
          "Vi prissätter solceller efter en enkel modell: ett baspris för ställning, infästning och elarbete (10 000–22 500 kr beroende på jobbets storlek) plus 2 500 kr per JA Solar-panel. Ovanpå det drar vi av grönt avdrag på 14,55 % direkt på fakturan, så du ser nettopriset på offerten.",
          "I Stockholm (elområde SE3) landar de flesta villaanläggningar mellan 35 000 och 95 000 kr netto. Spannet låter brett, men det handlar nästan helt om hur många paneler taket rymmer och hur krångligt det är att montera dem, inte om vilket märke du väljer.",
        ],
      },
      {
        h2: "Pris per kWp: exempel på 5, 10 och 15 kW i Stockholm",
        body: [
          "En JA Solar-panel på 500 W motsvarar 0,5 kWp, så 10 paneler = 5 kWp. Ju större anläggning, desto lägre pris per kWp eftersom baspris och resvägar slås ut på fler paneler. Riktpriser för Stockholm 2026, netto efter grönt avdrag:",
        ],
        bullets: [
          "5 kWp (10 paneler): cirka 40 000 kr netto, runt 8 000 kr/kWp. Passar radhus och mindre villatak.",
          "10 kWp (20 paneler): cirka 68 000 kr netto, runt 6 800 kr/kWp. Den vanligaste storleken i Stockholms villaområden.",
          "15 kWp (30 paneler): cirka 95 000 kr netto, runt 6 300 kr/kWp. Stora sadeltak i Täby, Danderyd och Nacka.",
          "Lägg till batteri och priset per nyttjad kilowattimme sjunker ytterligare, eftersom du då slipper sälja överskott billigt till nätet.",
        ],
      },
      {
        h2: "Vad som påverkar priset på ditt tak",
        body: [
          "Två likadana villor i Bromma kan få olika pris, och det är takets förutsättningar som avgör. Det här rör nålen mest:",
        ],
        bullets: [
          "Taklutning och orientering: söderläge med 30–45 graders lutning ger mest el per panel. Platta tak kräver ställning som vinklar panelerna, vilket kostar lite mer.",
          "Skuggning: skuggar en skorsten eller ett träd delar av taket använder vi effektoptimerare eller mikroväxelriktare så att en skuggad panel inte drar ner hela strängen. Det är en post på offerten.",
          "Infästning: tegel, betongpannor och plåt kräver olika montagebleck. Äldre tak i Stockholms innerstad kan behöva extra arbete.",
          "Växelriktare och batteri: storleken på växelriktaren och om du vill ha batterilager påverkar totalpriset mer än valet av panel.",
        ],
      },
      {
        h2: "Grönt avdrag drar ner priset med 14,55 %",
        body: [
          "Grönt teknik-avdrag för solceller är 14,55 % av hela installationskostnaden, material och arbete. Du behöver inte ansöka, vi som installatör drar av summan direkt på fakturan och rapporterar till Skatteverket.",
          "Avdragstaket är 50 000 kr per fastighetsägare och år. Lägger du till batteri (48,5 % avdrag) i samma projekt kan ett par komma upp i betydligt högre total avdragssumma samma år. Vi visar avdraget separat på offerten så du ser exakt vad du betalar netto.",
        ],
      },
      {
        h2: "Lönar sig solceller i Stockholm?",
        body: [
          "Ja. I SE3 ligger spotpriset runt 1,45 kr/kWh i snitt och ett välplacerat tak i Stockholm producerar cirka 1 050 kWh per kWp och år. En ren solanläggning betalar sig på 8–11 år och har sedan minst 15 år kvar av sin 25-åriga effektgaranti, det är där den riktiga vinsten ligger.",
          "Med batterilager och stödtjänster (FCR-D / aFRR) kommer återbetalningstiden ner mot 3–5 år för hus med högre förbrukning, eftersom du då använder mer av din egen el och batteriet dessutom tjänar pengar åt dig när det står stilla.",
        ],
      },
      {
        h2: "Så får du ett exakt pris för ditt hus",
        body: [
          "Räkna på din egen anläggning i vår kalkylator innan du bokar hembesök, den använder samma prismodell och samma siffror som vi använder vid offert. Byt antal paneler, lägg till batteri och se priset och återbetalningstiden ändras i realtid.",
          "Vid hembesöket gör vi en drönarbesiktning av taket och justerar siffrorna efter de faktiska förutsättningarna. Inget pris är slutgiltigt förrän vi har sett taket, vi säljer hellre rätt anläggning än störst.",
        ],
      },
    ],
    faq: [
      {
        q: "Vad kostar solceller till en villa i Stockholm?",
        a: "En typisk Stockholmsvilla med 14 paneler (7 kWp) landar runt 50 000 kr netto efter grönt avdrag på 14,55 %. Mindre anläggningar på 5 kWp ligger runt 40 000 kr och större på 15 kWp runt 95 000 kr. Priset beror främst på antal paneler och takets förutsättningar.",
      },
      {
        q: "Hur många solpaneler får plats på ett villatak i Stockholm?",
        a: "De flesta villatak i Stockholms villaområden rymmer 16–30 paneler, alltså 8–15 kWp. Stora sadeltak i Täby, Danderyd och Nacka tar ofta fler. Vi gör en drönarbesiktning innan offert för att veta exakt hur många paneler som ryms utan att gissa.",
      },
      {
        q: "Är solceller värt det i Stockholm?",
        a: "Ja. Trots att Stockholm ligger i mellersta Sverige producerar ett välplacerat tak cirka 1 050 kWh per kWp och år, och med SE3-spotpris runt 1,45 kr/kWh betalar sig en ren solanläggning på 8–11 år. Med batteri och stödtjänster kommer tiden ner mot 3–5 år.",
      },
      {
        q: "Behöver jag bygglov för solceller i Stockholm, och kostar det extra?",
        a: "Inom detaljplan krävs oftast inget bygglov om panelerna följer takfallet. För kulturskyddade fastigheter eller fasadmontage kan ansökan behövas. Vi tar dialogen med Stadsbyggnadskontoret åt dig och kan ofta avgöra inom en arbetsdag, det tillkommer ingen dold kostnad för det.",
      },
    ],
  },
};

export function getGuideContent(slug: string): GuideContent | null {
  return GUIDE_CONTENT[slug] ?? null;
}
