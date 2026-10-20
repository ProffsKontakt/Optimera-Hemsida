/**
 * Allmänna villkor — samma text som kunden godkänner i offerten i Hubben.
 *
 * GENERERAD, redigera inte för hand. Källa: sentinel-hq
 * src/lib/offert/terms-content.ts (buildAllmannaVillkorSektioner, md5
 * bb370859bc36fc595192c9c69724353a) med prislistan i offert_villkor_priser
 * (senast ändrad 2026-09-08). Genererad 2026-10-20.
 *
 * Ändras villkoren eller prislistan i Hubben ska filen genereras om, annars
 * säger hemsidan något annat än offerten kunden skriver under.
 */

export interface VillkorSektion {
  rubrik: string;
  /** Varje del är ett stycke (string) eller en punktlista (string[]). */
  delar: (string | string[])[];
}

export const VILLKOR_UPPDATERADE = "2026-10-20";

export const VILLKOR_INTRO = "Optimera Energilösningar i Mälardalen AB · Org.nr 559375-2206 · Tillämplighet och allmänna villkor";

export const VILLKOR_SEKTIONER: VillkorSektion[] = [
  {
    "rubrik": "1. Tillämplighet och avtalets ingående",
    "delar": [
      "Dessa allmänna villkor gäller för samtliga offerter, leveranser och entreprenader som utföraren tillhandahåller beställaren, om inte annat uttryckligen och skriftligen avtalats. Avtal ingås när beställaren accepterar offerten skriftligen eller elektroniskt (till exempel genom signering med BankID) eller när utföraren efter beställning påbörjar fullgörandet. Vid motstridighet mellan handlingar gäller de i följande ordning: (1) offerten med eventuella särskilda villkor, (2) dessa allmänna villkor, (3) tillämplig lag. Ingenting i dessa villkor inskränker de rättigheter beställaren har enligt tvingande konsumentlagstiftning.",
      "Entreprenaden regleras av konsumenttjänstlagen (1985:716) tillsammans med vad som föreskrivs i dessa bestämmelser. Utföraren ska utföra tjänsten fackmässigt och med tillbörlig omsorg tillvarata beställarens intressen samt samråda med beställaren i den utsträckning det behövs och är möjligt. Utföraren har rätt till pristillägg om tilläggsarbete har utförts i enlighet med dessa bestämmelser eller om tjänsten har fördyrats på grund av omständigheter som är hänförliga till beställaren och som utföraren inte borde ha förutsett vid avtalets ingående.",
      "Optimera Energilösningar i Mälardalen AB har vid var tid en hög projektvolym och bolagets anställda elektriker och installatörer är regelmässigt fullbokade under längre perioder. För att säkerställa att entreprenaden kan utföras inom skälig tid och med bibehållen kvalitet förbehåller sig utföraren rätten att, vid behov, anlita kvalitetssäkrade och förhandsgranskade underentreprenörer för utförandet av hela eller delar av entreprenaden. Utföraren ansvarar för underentreprenörens arbete som för sitt eget och säkerställer att underentreprenören uppfyller samma krav på fackmässighet, behörighet och försäkring som ställs på utföraren enligt dessa bestämmelser och konsumenttjänstlagen."
    ]
  },
  {
    "rubrik": "2. Omfattning — detta ingår i standardinstallationen",
    "delar": [
      "Om inte annat uttryckligen anges i offerten omfattar en standardinstallation följande arbetsmoment och material:",
      [
        "Installation av växelriktare, med max 10 meter kabeldragning från elcentral.",
        "Installation av batteri, med max 3 meter kabeldragning från växelriktaren.",
        "Installation av smartmätare, med max 15 meter kommunikationskabel.",
        "Uppkoppling av växelriktaren till Wi-Fi. Fungerande Wi-Fi med tillräcklig signalstyrka vid installationsplatsen måste finnas tillgängligt — se avsnitt 4.",
        "För- och färdiganmälan till elnätsleverantören.",
        "Genomgång av anläggningen tillsammans med kund efter slutförd installation."
      ],
      "Arbetsmoment, material eller utrustning utöver ovanstående ingår inte i standardinstallationen. Sådana arbeten utgör tilläggsarbete som debiteras enligt avsnitt 5, enligt separat offert eller på löpande räkning."
    ]
  },
  {
    "rubrik": "3. Detta ingår inte i standardinstallationen",
    "delar": [
      "Följande ingår aldrig i standardinstallationen, om det inte uttryckligen anges i offerten:",
      [
        "Grävnings-, schakt- och övriga markarbeten samt återställning av mark, plattläggning, asfalt eller växtlighet — se avsnitt 5.",
        "Kabeldragning utöver de 10 meter (växelriktare) respektive 3 meter (batteri), samt kommunikationskabel utöver de 15 meter, som anges i avsnitt 2.",
        "Trådlös kommunikationsutrustning (till exempel Lumen Radio) när kabeldragning av kommunikationskabel inte är möjlig eller lämplig.",
        "Utrustning för att förstärka eller utöka beställarens Wi-Fi, till exempel meshrouter, när det befintliga nätverket inte når installationsplatsen.",
        "Extra smartmätare, exempelvis för att läsa in befintlig solproduktion i nya anläggningens app(ar).",
        "Åtgärder i eller uppgradering av befintlig elanläggning, till exempel byte av elcentral eller huvudsäkring eller åtgärdande av fel och brister som upptäcks i den befintliga installationen.",
        "Bygg- och efterlagningsarbeten såsom målning, spackling eller återställning av ytskikt efter nödvändig håltagning och kabeldragning.",
        "Byggställning, skylift eller andra särskilda tillträdesanordningar, om sådana krävs för arbetets utförande.",
        "Avgifter från elnätsägare eller elhandelsbolag, till exempel för mätarbyte, säkringsändring eller abonnemangsändring."
      ],
      "Behöver något av ovanstående utföras, tillhandahållas eller bekostas för att installationen ska kunna genomföras utgör det tilläggsarbete som bekostas av beställaren enligt avsnitt 5."
    ]
  },
  {
    "rubrik": "4. Beställarens ansvar och uppgiftsskyldighet",
    "delar": [
      "Offerten är beräknad utifrån de uppgifter beställaren lämnat. Beställaren ansvarar för att uppgifterna är korrekta och fullständiga och ska före avtalets ingående, dock senast före installationsdagen, särskilt uppge:",
      [
        "Var fastighetens huvudmätare (fasadmätarskåp/mätarskåp) är placerad — särskilt om den är placerad i en annan byggnad eller på en annan fastighet än den plats där batteri och växelriktare ska installeras.",
        "Avståndet i faktisk kabelväg — inte fågelvägen — mellan huvudmätaren och den plats där batteri och växelriktare ska installeras. Den nya smartmätaren monteras i anslutning till huvudmätaren, och avståndet avgör därför hur många meter kommunikationskabel som krävs.",
        "Att fungerande Wi-Fi med tillräcklig signalstyrka finns tillgängligt vid växelriktarens installationsplats, alternativt att internetanslutning kan ordnas på annat sätt.",
        "Kända fel, brister eller avvikelser i den befintliga elanläggningen samt övriga förhållanden av betydelse för installationens genomförande."
      ],
      "Beställaren ansvarar för att arbetsplatsen är i sådant skick att arbetet kan utföras. Detta innefattar bland annat att flytta bohag och andra föremål så att utföraren får erforderligt tillträde. Om inte annat särskilt avtalats ska beställaren utan ersättning tillhandahålla el, vatten samt möjlighet för hantverkarna att nyttja toalett, laga mat och tillgodose liknande behov under arbetets gång.",
      "Visar sig lämnade uppgifter vara felaktiga eller ofullständiga, eller avviker förhållandena på plats från vad utföraren haft rätt att förutsätta — exempelvis att huvudmätaren är placerad i en annan byggnad eller på en annan fastighet än vad som uppgetts, att kabelvägen är längre än vad som uppgetts eller att fungerande Wi-Fi saknas — bär beställaren de merkostnader som detta medför. Merkostnaderna debiteras som tilläggsarbete enligt prislistan i avsnitt 5 eller, där prislistan inte är tillämplig, på löpande räkning. Detta gäller även kostnaden för extra utrustning som krävs för att slutföra installationen, exempelvis trådlös kommunikationslösning (Lumen Radio), meshrouter eller extra smartmätare."
    ]
  },
  {
    "rubrik": "5. Tilläggsarbeten och prislista",
    "delar": [
      "För vanligt förekommande tilläggsarbeten gäller följande priser. Samtliga priser är angivna inklusive moms och efter eventuell skattereduktion för grön teknik; i de fall arbetet och materialet berättigar till skattereduktion tillämpas denna enligt Skatteverkets vid var tid gällande regler.",
      [
        "Kommunikationskabel utöver de 15 meter som ingår: 200 kr per påbörjad meter, inklusive material och arbete.",
        "AC-kraftkabel utöver de 10 meter (växelriktare) respektive 3 meter (batteri) som ingår: 150 kr per påbörjad meter för 6 mm², 200 kr för 10 mm² respektive 250 kr för 16 mm², inklusive material och arbete.",
        "Extra smartmätare, exempelvis för att läsa in befintlig solproduktion i nya anläggningens app(ar): 1 400 kr per styck.",
        "Trådlös kommunikationslösning Lumen Radio: 5 500 kr. Överstiger kabelvägen 25 meter rekommenderar utföraren Lumen Radio i stället för kabeldragning.",
        "Meshrouter, när beställarens Wi-Fi inte når fram till växelriktarens installationsplats: 1 500 kr per styck.",
        "Grävnings- och markarbeten: 650 kr per påbörjad timme."
      ],
      "Grävning ingår aldrig i standardinstallationen och utföraren ansvarar inte för grävnings- eller markarbeten. Om grävning behöver utföras kan utföraren mot debitering enligt ovan bistå med detta, alternativt kan beställaren själv utföra eller ombesörja grävningen. Väljer beställaren att gräva själv ska schaktet vara färdigställt, fritt och klart enligt utförarens anvisningar senast vid installationsdagens början. Beställaren ansvarar för anvisning av befintliga ledningar i mark (till exempel via Ledningskollen). Utföraren ansvarar inte för markförhållanden, för skador på ledningar som inte anvisats eller för återställning av mark och ytskikt.",
      "Övriga tilläggsarbeten som inte omfattas av prislistan ovan offereras separat eller debiteras på löpande räkning."
    ]
  },
  {
    "rubrik": "6. Avrådande och ändrade förhållanden",
    "delar": [
      "Om det med hänsyn till priset, värdet av föremålet för tjänsten eller andra särskilda omständigheter inte kan anses vara till rimlig nytta för beställaren att låta utföra tjänsten, ska utföraren avråda från detta. Om det först efter att arbetet har påbörjats visar sig att tjänsten inte är till rimlig nytta för beställaren eller att priset kan bli betydligt högre än beställaren haft anledning att räkna med, ska utföraren underrätta beställaren och begära anvisningar. Om beställaren inte kan nås eller inte lämnar anvisningar inom rimlig tid, ska arbetet avbrytas, såvida det inte finns särskilda skäl att anta att beställaren ändå önskar att tjänsten fullföljs. Har utföraren åsidosatt denna skyldighet och det finns starka skäl att anta att beställaren annars hade avstått från att beställa tjänsten eller hade avbeställt den, har utföraren inte större rätt till ersättning än vad som skulle ha gällt vid en sådan situation. Utföraren har dock rätt till ersättning i den mån beställaren annars skulle gynnas på ett oskäligt sätt.",
      "Om det under arbetets utförande uppkommer behov av arbete som på grund av sitt samband med uppdraget lämpligen bör utföras samtidigt med detta, så kallat tilläggsarbete, ska utföraren underrätta beställaren och begära anvisningar. Med tilläggsarbete avses exempelvis arbete som föranletts av att uppgifter eller information från beställaren varit felaktiga, att arbetsområdet eller andra förhållanden avviker väsentligt från vad utföraren haft rätt att förutsätta, eller att omständigheterna i övrigt visar sig vara av annan karaktär än vad som kunnat antas vid en fackmässig bedömning. Om beställaren inte kan nås eller inte lämnar anvisningar inom rimlig tid, får utföraren utföra tilläggsarbetet om kostnaden inte överstiger 15 procent av kostnaden för det beställda arbetet, eller om det finns särskilda skäl att anta att beställaren önskar få tilläggsarbetet utfört i samband med arbetet. Utföraren är även skyldig att utföra sådant tilläggsarbete som inte kan skjutas upp utan fara för allvarlig skada för beställaren, om beställarens anvisningar inte kan inhämtas eller om beställaren begär det. I sådana fall har utföraren rätt till pristillägg."
    ]
  },
  {
    "rubrik": "7. Pris, betalning och skattereduktion",
    "delar": [
      "Om inte annat anges är priser i offerten angivna inklusive moms och, där så framgår, efter skattereduktion för grön teknik. Betalning sker enligt vad som anges i offerten eller på fakturan. Vid försenad betalning har utföraren rätt till dröjsmålsränta enligt räntelagen samt lagstadgade påminnelse- och inkassoavgifter. Levererade varor förblir utförarens egendom till dess full betalning erlagts, i den utsträckning ett sådant förbehåll är giltigt enligt lag. Utföraren har rätt att överlåta sin rätt till betalning enligt avtalet till finansbolag eller annan tredje part.",
      "En ungefärlig prisuppgift omfattar endast de arbeten och åtaganden som anges under rubriken omfattning och i dessa bestämmelser. Har utföraren lämnat en ungefärlig prisuppgift får det angivna priset inte överskridas med mer än 15 procent, om inte annan prisgräns avtalats eller utföraren har rätt till pristillägg enligt dessa bestämmelser eller konsumenttjänstlagen. För markarbeten, rivningsarbeten eller andra arbeten som kräver undersökningar som utföraren normalt inte är skyldig att utföra i anbudsskedet gäller i stället en prisgräns om 25 procent.",
      "När det gäller skattereduktion för grön teknik är beställaren på begäran skyldig att visa intyg från Skatteverket som visar hur mycket skattereduktion som utnyttjats under året. Om Skatteverket helt eller delvis inte medger utbetalning efter utförarens ansökan eller återkräver redan utbetalt skattereduktionsbelopp, är beställaren skyldig att betala återstående arbetskostnad till utföraren. Detta gäller dock inte om orsaken till att utbetalning inte medges eller återkrävs beror på omständigheter som utföraren ansvarar för. Återstående arbetskostnad ska betalas inom tio dagar från det att utföraren framställt krav, varefter dröjsmålsränta utgår enligt räntelagen. Beställaren försäkrar även att denne nyttjar den aktuella fastigheten, bostadsrätten eller ägarlägenheten samt är ägare eller innehavare av densamma.",
      "Om betalning enligt avtalet helt eller delvis ska ske innan tjänsten har utförts och konsumenten inte betalar i rätt tid, har näringsidkaren rätt att inställa arbetet tills betalning sker. Detsamma gäller om konsumenten enligt avtalet ska medverka till tjänstens utförande och inte i rätt tid lämnar sådan medverkan som utgör en väsentlig förutsättning för arbetets genomförande. Om tjänsten redan har påbörjats är näringsidkaren dock skyldig att, så långt möjligt, utföra arbete som inte kan skjutas upp utan risk för allvarlig skada för konsumenten, förutsatt att arbetet inte medför väsentliga kostnader eller olägenheter för näringsidkaren. Om arbetet inställs enligt denna bestämmelse har näringsidkaren rätt till ersättning för kostnader och andra förluster som detta orsakar, om inte konsumenten visar att dröjsmålet inte beror på försummelse från konsumentens sida."
    ]
  },
  {
    "rubrik": "8. Tid för utförande, hinder och force majeure",
    "delar": [
      "Arbetet ska vara färdigställt och tillgängligt för slutbesiktning inom avtalad tid eller, om någon sådan tid inte avtalats, inom skälig tid med hänsyn till vad som normalt gäller för tjänster av samma art och omfattning. Om ändringar eller tilläggsarbeten medför ökad eller minskad tidsåtgång ska den avtalade tiden förlängas eller förkortas i motsvarande mån. Om inte lämplig årstid eller entreprenadens ibruktagande bör avvaktas ska även intrimning, justering och provning som ingår i arbetet vara slutförda inom avtalad tid.",
      "Utföraren har rätt till erforderlig tidsförlängning om arbetet hindras av omständigheter utanför dennes kontroll, som utföraren inte skäligen kunnat räkna med vid avtalets ingående och vars följder inte heller skäligen kunnat undvikas eller övervinnas. Dröjsmål från utförarens sida föreligger om uppdraget, utan att detta beror på förhållanden på beställarens sida, inte avslutats inom avtalad tid eller inom sådan ändrad tid som ska gälla enligt ovan. Dröjsmål föreligger även om utföraren inte håller överenskommen tid för påbörjande eller arbetets framskridande, om inte rätt till tidsförlängning föreligger.",
      "Vid dröjsmål från näringsidkarens sida får konsumenten hålla inne betalning enligt 27 § konsumenttjänstlagen. Konsumenten får också välja mellan att kräva att tjänsten fullgörs enligt 28 § eller att häva avtalet enligt 29 §. Därutöver får konsumenten kräva skadestånd enligt 31 §.",
      "Utföraren är befriad från skyldighet att fullgöra viss förpliktelse och från skyldighet att utge ersättning om underlåtenheten beror på omständighet utanför utförarens kontroll som utföraren inte skäligen kunnat förutse eller undvika — såsom krig, naturkatastrof, brand, epidemi eller pandemi, myndighetsbeslut, arbetskonflikt, störningar i transporter eller energiförsörjning, extrema väderförhållanden eller fel och förseningar hos leverantörer till följd av sådana omständigheter (force majeure). Den part som åberopar force majeure ska utan dröjsmål underrätta den andra parten och vidta skäliga åtgärder för att begränsa verkningarna. Bestämmelsen tillämpas med de begränsningar som följer av tvingande konsumentlagstiftning."
    ]
  },
  {
    "rubrik": "9. Fel, reklamation, garanti och besiktning",
    "delar": [
      "Om tjänsten är felaktig utan att detta beror på något förhållande på konsumentens sida, har konsumenten rätt att hålla inne betalning enligt 19 § konsumenttjänstlagen. Konsumenten får också kräva att felet avhjälps enligt 20 § första stycket eller göra prisavdrag eller häva avtalet enligt 21 §. Därutöver får konsumenten kräva skadestånd enligt 31 §. I fråga om konsumentens rätt till skadestånd av annan än näringsidkaren gäller även bestämmelserna i 33 §.",
      "Konsumenten har rätt att kräva att näringsidkaren avhjälper fel, om detta inte medför oskäligt stora kostnader eller olägenheter för näringsidkaren i förhållande till felets betydelse för konsumenten. Även om konsumenten inte kräver det, får näringsidkaren avhjälpa felet om denne utan uppskov efter mottagen reklamation erbjuder sig att göra detta och konsumenten inte har särskilda skäl att avvisa erbjudandet. Avhjälpande ska ske inom skälig tid efter att konsumenten gett näringsidkaren tillfälle till det och utan kostnad för konsumenten, med undantag för kostnader som skulle ha uppkommit även om tjänsten utförts felfritt eller, om felet beror på olyckshändelse eller liknande, kostnader för att ersätta material som konsumenten enligt avtalet tillhandahållit och bekostat.",
      "Om konsumenten vill åberopa att tjänsten är felaktig ska denne reklamera inom skälig tid efter att felet märkts eller borde ha märkts. Reklamation som sker inom två månader från det att felet upptäckts ska alltid anses ha skett i rätt tid. Reklamation får dock inte ske senare än tre år efter att uppdraget avslutades eller, när det gäller arbete på mark, byggnader, anläggningar eller andra fasta saker, senare än tio år efter att uppdraget avslutades, om inte annat följer av garanti eller liknande utfästelse.",
      "Om slutbesiktning har avtalats ska utföraren i god tid underrätta beställaren om när arbetet beräknas vara avslutat och när slutbesiktning kan genomföras. Beställaren eller utföraren har rätt att vid avtalad garantitid begära garantibesiktning före garantitidens utgång samt att begära efterbesiktning av arbete som utförts för att avhjälpa fel. Enligt konsumenttjänstlagen ska beställaren meddela utföraren om besiktning begärs och utse en besiktningsman. Om inte annat avtalats ska beställaren slutligt svara för ersättningen till besiktningsmannen vid slutbesiktning och garantibesiktning. Vid efterbesiktning ska utföraren stå för den del av kostnaden som hänför sig till den nya besiktningen om fel kvarstår, annars svarar beställaren för kostnaden. Resultatet av slutbesiktningen ska snarast redovisas skriftligen till parterna.",
      "För levererade produkter gäller respektive tillverkares garantivillkor. Garantitider framgår av offerten eller av tillverkarens garantivillkor och produktdokumentation. Garantierna omfattar inte fel som beror på yttre påverkan, olyckshändelse, felaktig användning eller skötsel, ingrepp eller ändringar utförda av annan än utföraren eller av utföraren anvisad part, eller på att beställarens el-, internet- eller Wi-Fi-anslutning inte uppfyllt kraven. Vissa tillverkargarantier förutsätter att anläggningen är kontinuerligt uppkopplad mot internet; beställaren ansvarar för att anläggningen förblir uppkopplad, och utföraren ansvarar inte för garantiinskränkningar som beror på bruten uppkoppling.",
      "För det fall Optimera Energilösningar i Mälardalen AB skulle försättas i konkurs, inleda rekonstruktion eller likvidation, eller upphöra med sin verksamhet blir Energy Group AES AB beställarens kontakt för garantiärenden avseende produktgarantin för produkter som levererats via Energy Group. Energy Group AES AB driver ärendet mot tillverkaren av den produkt som gått sönder. Godkänner tillverkaren ärendet erhåller beställaren ersättningsprodukten utan materialkostnad, med den garantitid som gällde när anläggningen togs i drift; garantitiden börjar inte om och förkortas inte. Energy Group AES AB anvisar även ett behörigt installationsföretag som kan utföra arbetet; arbetet beställer beställaren direkt av installatören på vanliga villkor. Åtagandet följer respektive tillverkares garantivillkor och omfattar inte fel som beror på installation eller dimensionering, skador av yttre påverkan eller ingrepp av annan än behörig installatör. Beställaren bör spara orderbekräftelse eller faktura, som visar vilka produkter som omfattas. Skulle en enskild tillverkare upphöra bistår Energy Group AES AB beställaren med att hitta en likvärdig ersättningsprodukt; kostnaden för denna står beställaren för."
    ]
  },
  {
    "rubrik": "10. Ansvar och försäkring",
    "delar": [
      "Dessa bestämmelser reglerar inte personskador. Beställaren har rätt till skadestånd enligt konsumenttjänstlagen, vilket bland annat omfattar förluster och kostnader som orsakats genom dröjsmål eller fel. Skadestånd omfattar dock inte ersättning för förlust i näringsverksamhet. Utföraren ska även, under de förutsättningar som följer av konsumenttjänstlagen, ersätta skada på beställarens egendom som uppkommit när egendomen varit under utförarens kontroll. Beställaren ska samtidigt så långt som möjligt vidta skäliga åtgärder för att begränsa skadans omfattning.",
      "Utföraren ska ha allriskförsäkring för skador på entreprenaden, där beställaren ska vara medförsäkrad. Utföraren ska även ha ansvarsförsäkring för entreprenadverksamhet, både under entreprenadtiden och under två år efter entreprenadens godkännande."
    ]
  },
  {
    "rubrik": "11. Beräknad produktion, besparing och appfunktioner",
    "delar": [
      "Uppgifter i offerten om beräknad elproduktion, besparing, avkastning eller intäkter — inklusive intäkter från stödtjänster, arbitrage eller liknande — är uppskattningar baserade på antaganden om bland annat elpriser, nätavgifter, solinstrålning, väderförhållanden och hushållets förbrukningsmönster. Uppskattningarna utgör inte någon utfästelse eller garanti om faktiskt utfall. Faktisk produktion, besparing och intäkt påverkas av förhållanden utanför utförarens kontroll, däribland marknadspriser på el samt regelverk för skatter, avgifter och stödtjänster.",
      "Anläggningens app-, övervaknings- och styrfunktioner tillhandahålls av respektive tillverkare eller tjänsteleverantör och förutsätter fungerande internetanslutning hos beställaren. Utföraren ansvarar inte för tillfällig otillgänglighet i, förändringar av eller avveckling av sådana tjänster från tredje part."
    ]
  },
  {
    "rubrik": "12. Avbeställning och ångerrätt",
    "delar": [
      "Om beställaren avbeställer tjänsten innan den slutförts har utföraren rätt till ersättning för den del av tjänsten som redan utförts, i enlighet med konsumenttjänstlagens bestämmelser.",
      "Vid distansköp samtycker beställaren till att tjänsten får påbörjas och utföras samt avstår frivilligt från ångerrätt avseende tjänster enligt dessa bestämmelser i enlighet med 10 och 11 §§ lag (2005:59) om distansavtal och avtal utanför affärslokaler."
    ]
  },
  {
    "rubrik": "13. Behandling av personuppgifter",
    "delar": [
      "Utföraren behandlar beställarens personuppgifter i enlighet med gällande dataskyddslagstiftning (GDPR) i den utsträckning det krävs för att fullgöra avtalet — bland annat för offert, installation, för- och färdiganmälan till elnätsägaren, ansökan om skattereduktion samt garanti- och serviceärenden. Uppgifter lämnas ut till tredje part endast när det krävs för avtalets fullgörande eller följer av lag. Beställaren har rätt att begära information om, rättelse av eller radering av sina personuppgifter genom att kontakta utföraren."
    ]
  },
  {
    "rubrik": "14. Övriga bestämmelser",
    "delar": [
      "Dokumentation såsom tekniska handlingar och ritningar som utföraren tillhandahåller beställaren förblir utförarens egendom. Beställaren åtar sig att inte sprida eller överlämna sådan dokumentation till utomstående i illojalt syfte.",
      "Åtaganden utöver offerten och dessa villkor gäller endast om de bekräftats skriftligen av utföraren. Ändringar av och tillägg till avtalet ska ske skriftligen, varmed även avses e-post eller annan elektronisk kommunikation som bekräftats av båda parter.",
      "Skulle någon bestämmelse i dessa villkor helt eller delvis vara ogiltig eller inte kunna göras gällande, gäller övriga bestämmelser fortsatt fullt ut. Den aktuella bestämmelsen ska justeras endast i den utsträckning som krävs för att den ska vara giltig."
    ]
  },
  {
    "rubrik": "15. Tvist",
    "delar": [
      "Tvister ska avgöras av allmän domstol. Beställaren kan även vända sig till kommunens konsumentvägledare och i vissa fall få tvisten prövad av Allmänna reklamationsnämnden."
    ]
  }
];
