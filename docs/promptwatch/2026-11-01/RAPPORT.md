# Promptwatch – lägesrapport för optimeraenergi.se, 1 november 2026

Underlag: hela Promptwatch-projektet exporterat via API v2 den 1 november 2026 (127 prompter, 13 AI-modeller, 3 600 AI-svar sedan 26 oktober, citat, crawler-loggar, innehållsgap, rekommendationer). Råfilerna ligger i samma mapp; `ANALYS.md` är den maskingenererade sammanställningen. Alla tal nedan kommer från dessa filer.

## 1. Var står vi?

| Prompttyp | Svar | Svar som nämner oss |
|---|---|---|
| Varumärkesprompter ("Optimera Energi omdömen" m.fl.) | 266 | 249 (94 %) |
| Konkurrentjämförelser ("Optimera Energi eller Svea Solar") | 159 | 152 (96 %) |
| Organiska prompter ("hembatteri stockholm", "bästa laddbox 22 kW") | 3 175 | 80 (3 %) |

Slutsats: när någon redan känner till oss svarar AI-motorerna bra om oss. Problemet är de organiska frågorna. 100 av 127 prompter har noll synlighet, och det är nästan uteslutande organiska prompter.

### Organiska prompter: vilka motorer nämner oss alls?

| Modell | Organiska svar | Nämner oss |
|---|---|---|
| Perplexity (sonar-pro) | 339 | 27 (8,0 %) |
| ChatGPT search (gpt-search) | 337 | 15 (4,5 %) |
| Microsoft Copilot | 384 | 12 (3,1 %) |
| Google AI Mode | 384 | 9 (2,3 %) |
| Google AI Overview | 347 | 8 (2,3 %) |
| Gemini | 382 | 7 (1,8 %) |
| Meta AI | 186 | 2 (1,1 %) |
| Claude, Grok, Mistral, DeepSeek, GPT-5.6, Alexa | 816 | 0 |

Motorer som söker på webben (Perplexity, ChatGPT search, Copilot, Google) är de enda som hittar oss. Modeller som svarar ur minnet nämner oss aldrig. Det går inte att åtgärda med sajten på kort sikt, bara genom att varumärket förekommer i fler externa källor över tid.

### De 15 organiska prompter där vi faktiskt syns

| Nämnanden | Prompt | Modeller |
|---|---|---|
| 20 | vem installerar Easyway-batteri i Stockholm | Gemini 6, Perplexity 5, AI Overview 4, ChatGPT 3 |
| 11 | installatör för solceller och batteri i Solna | Perplexity 5, ChatGPT 5 |
| 8 | hembatteri Sollentuna installation | Perplexity 4, ChatGPT 2 |
| 7 | hur lång är återbetalningstiden för solceller i Sverige | Copilot 6 |
| 6 | hemmabatteri stockholm | Perplexity 6 |
| 6 | vad gäller för grönt avdrag 2027 | Copilot 6 |
| 5 | bästa sättet att sänka elkostnaden i villa med sol, batteri, värmepump | Google AI Mode 5 |
| 5 | vilket företag i Stockholm installerar solpaneler och batteri till villa | ChatGPT 4 |
| 4 | företag som sköter allt från offert till installation | Perplexity 4 |
| 2 | solceller och batteri Lidingö företag | AI Overview, Gemini |
| 2 | laddbox kombinerad med solpaneler, Stockholmsföretag | Perplexity |
| 1 vardera | hembatteri Nacka, SAJ HS3 garanti, AI-styrning Stockholm, grönt avdrag laddbox i brf | |

Mönster: vi syns på lokala "vem installerar … i [ort]"-frågor och på Easyway/Eway, där vi i praktiken äger begreppet. Vi syns inte alls på produktfrågor (Fox ESS CQ7, Sigenergy, Zaptec/Easee), prisfrågor eller generella "bästa hembatteri 2026".

## 2. Vem tar plats i stället?

Konkurrenter i organiska svar (antal svar där de nämns): Svea Solar 271, Greenely 247, 1KOMMA5° 220, HemSol 211, Laddboxbolaget 171, Evify 143, Grönkraft 91, Stockholm Solenergi 89, Smart Solar 81, Otovo 75.

Källor som AI-motorerna citerar i organiska svar där vi saknas: skatteverket.se 495, hemsol.se 462, energimyndigheten.se 343, tibber.com 339, laddboxbolaget.se 319, vattenfall.se 303, 1komma5.com 266, energify.se 260, greenely.com 219, ellevio.se 217, evify.se 210, sveasolar.se 203.

Den enskilt mest citerade sidan i hela datamängden är greenely.com/artiklar/batteri-lonsamhet (130 citat). Därefter Skatteverkets grön teknik-sida (91) och maps.google.com (85). Att Google Maps citeras 85 gånger betyder att Google Business Profile-innehållet (omdömen, beskrivning, tjänster) direkt påverkar svaren på lokala frågor.

## 3. Vad citeras från oss?

Våra mest citerade sidor över alla prompter: startsidan 270, /metodik 38, /fragor-och-svar 32, /om-oss 31, /solcellsbatteri 31, /batteri/stockholm 23, /solceller/sollentuna 19, /solceller/lidingo 19, /offert 18, /guider/aterbetalningstid-solceller 15, /guider/gront-avdrag-2026 10.

Tredjepartskälla om oss: reco.se/optimera-energi citeras 54 gånger i 17 prompter och är därmed vår näst viktigaste källa efter startsidan. Omdömen väger tungt i AI-svaren; "omdömen", "reco" och "recensioner" förekommer 132 gånger i motorernas egna sökningar.

Sidorna som byggts den senaste veckan (laddboxjämförelsen med åtta laddare, batterijämförelsen, tekniska jämförelsen, Sigenergy-granskningen, kalkylatorn) har 0–3 citat. De är för nya för att ha hunnit in i motorernas index. IndexNow är skickat; Bing Webmaster är kopplat av Julian; Google Search Console behöver fortfarande kopplas i Promptwatch.

## 4. AI-crawlers på sajten

Vercel-loggarna kopplades till Promptwatch 31 oktober. Sedan dess 75 crawler-träffar: meta-web-indexer 47, openai-searchbot 15, perplexity-bot 8, chatgpt-user 4, meta-external-agent 1. OpenAI och Perplexity hämtar främst startsidan, robots.txt, /om-oss, /tjanster/* och /kalkylator. Loggarna fungerar; dataunderlaget växer för varje dag.

## 5. Vad AI-motorerna själva söker efter (fanouts)

De vanligaste orden i motorernas egna delsökningar för våra prompter: 2026 (627), solceller (547), stockholm (529), sverige (493), batteri (359), hembatteri (256), installation (252), laddbox (238), villa (195), företag (169), avdrag (140), grönt (116), pris (92), skatteverket (92), zaptec (91), installatör (86), värmepump (82), easee (78), jämförelse (76), skattereduktion (76), eway (73), garanti (53), regler (53), sigenergy (54), återbetalningstid (50), stödtjänster (47), specifikationer (41), homevolt (34), brandcell (34).

Motorerna letar alltså efter årtal, ort, pris, garanti och regler. Sidor som saknar explicit "2026", "Stockholm", konkreta kronor och garantivillkor i rubriker och första stycke blir svårare att plocka.

## 6. Promptwatchs innehållsgap och rekommendationer

Täckningsanalysen omfattar 81 prompter: medeltäckning 69 av 100, fördelning 42 excellent, 28 good, 4 medium, 3 low. Konkurrentjämförelser har lägst täckning (48). Återkommande rekommendationer från Promptwatch:

- Publicera Reco-omdömen på sajten med flöde, betygsfördelning och svar på kritiska omdömen (märkt HIGH / QUICK_WIN).
- Paketpris-exempel för solpaneler + batteri till villa i Stockholm, och installerade prisintervall på Stockholmssidorna.
- Regional återbetalningssammanfattning SE1–SE4 och tydligt redovisade antaganden.
- Egen jämförelse Easee Core mot Easee Max (täckning 10 när Promptwatch analyserade; laddboxjämförelsen med båda modellerna publicerades efteråt).
- SAJ HS3 med inbyggd laddbox: produkt-/integrationssida och installationsguide batteri + laddbox i samma system.
- Steg-för-steg-guide för Villaeffekten-ansökan och mall för fakturaspecifikation.
- Laddbox på IT-nät: förklara varför vissa modeller passar bättre, installatörschecklista.
- Bergvärme-prisguide 2026 efter ROT.
- Effektavgift: steg-för-steg "så ser du om du betalar effektavgift" plus publiceringsdatum på sidan.

Sajtrevisionen (138 adresser, 26 oktober): hälsopoäng 100, 0 fel, 4 varningar (tunt innehåll på /kontakt, /cookies, /press, /tjanster/laddboxar), 47 titlar utanför rekommenderad längd (titlarna kortades site-wide den 31 oktober via seoTitle, nästa revision visar om det slog igenom), 7 länkade sidor saknas i sitemap.

## 7. Innehållsgenerering

Kvoten på fem innehållsgenereringar är förbrukad. Fem dokument ligger i `content/`: fyra OPTIMIZE-förslag från 31 oktober och ett för /tjanster/batterier som blev klart 1 november. Det sista bygger på den gamla sidversionen (det citerar återbetalningstiden "6,5–15 år" som är borttagen) och ska bara användas som strukturinspiration, inte som text.

## 8. Åtgärdslista i prioritetsordning

1. **Omdömen.** Lyft Reco-betyget (4,7/5, 22 omdömen) och Google-omdömen på startsidan, /om-oss och en egen omdömessida, med Review-schema. Be aktivt kunder om Google-omdömen: maps.google.com citeras 85 gånger i organiska svar.
2. **Google Business Profile.** Fyll profilen med tjänster, produkter (Eway, SAJ, Fox ESS, Zaptec, Easee), bilder från installationer, öppettider 08–20 och länk till sajten. Samma profil citeras direkt av Google AI Mode och AI Overview.
3. **Batteriets lönsamhet som egen guide.** Greenelys lönsamhetsartikel är den mest citerade sidan i hela datamängden. Vi behöver en motsvarande svarsförst-sida med 3–7 år (batteri till befintlig sol), 4–7 år (sol + batteri), 5–9 år (batteri utan sol), redovisade antaganden per elområde och länk till kalkylatorn.
4. **Priser i klartext.** Installerade priser inkl. moms och efter grönt avdrag på /tjanster/batterier, /tjanster/laddboxar och Stockholmssidorna. Prompter om "vad kostar … 2026" har 0 synlighet. Kräver prislistan för Enershare, SigenStor, Fox ESS CQ7 + H3 Smart, DEFA Power, Easee Max och Fox A022K.
5. **Produktfrågor.** Egna produktsidor (eller tydliga ankare) för Fox ESS CQ7, SAJ HS3, Eway UNIV7600, Zaptec Go 2, Easee Core/Max med specifikationer, garanti och installerat pris, eftersom "specifikationer" och "garanti" är vanliga fanout-ord och alla produktprompter ligger på 0.
6. **Lokala sidor.** Vi vinner redan på Solna, Sollentuna och Lidingö. Lägg till Täby, Danderyd, Nacka och Sundbyberg med lokalt innehåll (nätbolag, effektavgift, typiska tak) i stället för bara ortnamn.
7. **Koppla Google Search Console i Promptwatch** (dashboard) så att GSC-data kan matchas mot AI-synlighet. Tryck "Start receiving data" under Visitor Analytics så att AI-trafiken börjar loggas.
8. **Uppföljning.** Kör exporten igen om två veckor (scriptet `$S/pw-run.sh` i sessionen, eller samma API-anrop) och jämför `brand-rank.json` mot denna mapp. Nya sidor från vecka 44 bör då ha börjat citeras.

## 9. Konto och säkerhet

API-nyckeln som använts för exporten ligger inte i repot. Vercel-drainen till Promptwatch använder samma nyckel. När provperioden går över i betald plan: skapa en ny nyckel i Promptwatch, uppdatera drainen i Vercel och ta bort den gamla.
