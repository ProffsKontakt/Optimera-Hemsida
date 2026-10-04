# Länkplan för optimeraenergi.se – oktober 2026 till januari 2027

Underlaget kontrollerades 2026-10-03 med curl, webbsökning och Common Crawl. **Verifierad** betyder att sidan svarade och att innehållet lästes. **Ej verifierat** betyder att sidan inte gick att kontrollera härifrån (blockerad, rate-limit eller ingen träff). Planen är dimensionerad för 3–5 timmar i veckan.

## 1. Nuläge

### 1.1 Länkprofilen idag
| Gratis källa | Vad den visar |
|---|---|
| Common Crawls domängraf jul–sep 2026 (133,2 milj. domäner) | **2 länkande domäner:** hitta.se och hembatteri.se. Grafen räknar med nofollow-länkar (Hittas länk är nofollow) men inte länkar som laddas med JavaScript. Optimera ligger på plats 25,6 miljoner i harmonic centrality, där lägre är bättre. Som jämförelse ligger reco.se på 0,44 miljoner, svensksolenergi.se på 0,46 miljoner och villaagarna.se på 0,60 miljoner. |
| Common Crawl-index CC-MAIN-2026-39 | 38 URL:er hämtades 9 sep 2026, robots.txt inräknad, men inga sidor under /nyheter. /kunskapsbank, /solcellsfragor och /batteriskolan gav 404 i produktion 3 okt, eftersom de inte är lanserade än. |
| hembatteri.se/installatörer/optimera-energi | Profil på Nettbureaus offertsajt med länk till startsidan med UTM. rel är "noreferrer noopener", så länken är **följbar**. Det är den **enda följbara externa länk** vi hittade. |
| hitta.se/optimera+energi/solna/hiigrrxfh | Betald "DirectLink". Alla länkar från profilen till sajten har nofollow, flera även sponsored. De ger inget länkvärde, bara trafik och NAP. En av länkarna går till /tjanster/vaermepumpar, som är dold och har noindex. |
| reco.se/optimera-energi | 4,8/5 på 14 omdömen, och profilen är märkt som annonsör. Webbplatslänken renderas med JavaScript och syns inte i Common Crawl. |
| Webbsökning efter "optimeraenergi.se" | Bara Reco och Syna. Övriga "Optimera"-träffar gäller *Optimera Svenska AB*, som är en byggvaruhandel. Varumärket är alltså delat. |
| Bing via skript | Gav orelevanta träffar på grund av botskydd. Använd Bing Webmaster Tools i stället. |

**Slutsats:** sajten har i praktiken en enda följbar extern länk, så allt ni bygger nu syns tydligt i mätningen.

### 1.2 Register och namn
| Register | Status |
|---|---|
| Allabolag (allabolag.se/5593752206) | Verifierad. Registrerat som "Optimera Energilösningar i Mälardalen AB" 2022-04-08. Branschen står som "Byggmästare" trots SNI 43210 Elinstallationer. **Hemsida, telefon och e-post saknas.** Uppgifterna ändras via Proff Kundweb, enligt Allabolags egen text. |
| Syna (upplysningar.syna.se) | Verifierad. Ingen länk. |
| Eniro | Ej verifierat (Cloudflare 403). |
| Google Business Profile | Ej verifierat. Sajtens schema innehåller bara en Maps-*sökning* (`hasMap`), ingen profil-URL. |
| Trustpilot | Ingen profil hittad. |
| LinkedIn, Facebook | Finns enligt `sameAs`. Ej kontrollerade, eftersom de blockerar robotar. |

**Rätta det här före all katalogregistrering, annars sprids felen vidare:**
1. ~~`public/llms.txt` anger "Optimera Energi Sverige AB" som juridiskt namn.~~ Rättat 3 okt till "Optimera Energilösningar i Mälardalen AB", som sajten och Allabolag anger.
2. Recos företagstext beskriver ett "nätverk av elektriker från Sundsvall och söderut" och nämner värmepumpar, som är en dold tjänst. Sajten säger Stockholms län. Profiltexten på hembatteri.se nämner också värmepumpar.
3. `sameAs` i `src/components/seo/JsonLd.tsx` pekar på den gamla Allabolag-adressen (solpanelsgruppen-…), som omdirigeras. Byt till den nya. Hitta länkar till instagram.com/optimeraenergi.se; om kontot är ert, lägg till det i `sameAs`. Byt också Hittas länk till /tjanster/vaermepumpar mot /solcellsbatteri.
4. Bestäm en NAP-rad (Vallgatan 9, 170 67 Solna, 076-305 37 32) och en beskrivning på två meningar, och använd dem ordagrant överallt.

### 1.3 Vad som inte syns utan betalverktyg
Utan Ahrefs eller Semrush ser ni inte alla länkande sidor, ankartexter i skala, follow/nofollow, länkhistorik eller konkurrenternas länkar. Med en enda länk ger sådana verktyg lite i dag. Det här kan ni använda gratis:
- **Search Console → Länkar.** DNS har google-site-verification-poster, så en domänegendom finns troligen redan (posterna kan också gälla Google Workspace). Be ägaren lägga till Julian som användare. Rapporten visar vilka webbplatser (rotdomän) som länkar mest, vilka sidor som får flest länkar och vilken länktext som används. Tabellerna visar högst 1 000 rader. Exporten "De senaste länkarna" sorteras på upptäcktsdatum. Rapporten **anger inte nofollow** och kan innehålla länkar som redan är borttagna ([hjälpsidan](https://support.google.com/webmasters/answer/9049606?hl=sv)).
- **Bing Webmaster Tools → Backlinks** ([bing.com/webmasters](https://www.bing.com/webmasters/)). Live-HTML saknar `msvalidate.01`, så importera sajten från Search Console. Verktyget visar egna länkar och har vyn "Similar sites", där ni jämför er med två konkurrenter. Filtret "Not linking to my site" ger en färdig prospektlista.

## 2. Snabba vinster (vecka 1–4)

| Prio | Mål | URL | Länk ut? | Krav och kostnad | Nästa steg |
|---|---|---|---|---|---|
| 1 | hembatteri.se (befintlig) | hembatteri.se/installatörer/optimera-energi | **Följbar** (verifierad) | Betald leadstjänst | Rätta texten (värmepumpar, område) |
| 1 | Google Business Profile | business.google.com | Ingen klassisk bakåtlänk, men den viktigaste lokala signalen | Gratis | Skapa eller verifiera profilen, välj kategori, ange de 8 kommunerna som tjänsteområde och länka /solceller/solna |
| 1 | Bing Places, Apple Business Connect | bingplaces.com (→ bing.com/forbusiness), business.apple.com (båda verifierade) | Katalog | Gratis | Bing: importera från Google. Apple: samma NAP |
| 1 | Allabolag/Proff | allabolag.se/5593752206 | Hemsidefältet är tomt, rel okänt | Ändras via Proff Kundweb | Lägg till webbplats, telefon och e-post. Rätta branschen |
| 1 | Enequi installatörsnätverk | enequi.com/installatorer (verifierad) | 148 partner visas med namn utan länk. Ni syns inte bland de 24 som visas utan JavaScript | Partnerskap (ni säljer Enequi Core) | Be om att bli listade, gärna med länk |
| 1 | Emaldo | emaldo.com/sv/home/find-installer (verifierad, "certifierad Emaldo-installatör") | Listan laddas med JavaScript, rel ej avläsbar | Certifiering: emaldo.com/sv/installer | Be om listning och erbjud ett kundcase till emaldo.com/sv/news, där kundberättelser publiceras |
| 2 | Svensk Solenergi | svensksolenergi.se/medlemskap/medlemskategorier/ | **Följbar** på medlemssidan (kontrollerat på /medlem/soltech/). Medlemsregistret visar "länk och kontaktuppgifter" | Kopparnivån (under 10 Mkr i omsättning): 9 900 kr/år + 700 kr/år + 15 000 kr i engångsinträde (ex moms). Minst en montör måste vara certifierad av föreningen för att ni ska synas som installatör, och det gäller även underleverantörer | Kontrollera certifieringen och ansök |
| 2 | Easee | easee.com/sv/hitta-installator/ (verifierad) | Kartlista med JavaScript, rel ej avläsbar | Formulär under "Bli installatör" | Ansök, om ni inte redan är med |
| 2 | Zaptec | zaptec.com/sv/hitta-en-installator (verifierad) | JavaScript, rel ej avläsbar | zaptec.com/sv/partners/bli-partner | Ansök |
| 2 | Grossisten Senergia | senergia.se/kundcase/ (verifierad) | **Följbar** till installatören (kontrollerat på kundcaset "Elcenter i Borås") | Kräver att ni är kund. De har produktsidor för SAJ HS3 och Solis | Om ni köper där: föreslå ett kundcase |
| 3 | Charge Amps | chargeamps.com | Ej verifierat (429) | – | Fråga er kontakt om de har en installatörslista |
| 3 | Easyway, SAJ, Solis, JA Solar | – | Ingen svensk installatörslista hittades, och ingen officiell svensk Easyway-sajt | – | Fråga distributören om partnerlista eller kundcase |
| 3 | Installatörsföretagen | in.se/hitta-installator/ (verifierad) | **Ingen webblänk**, bara namn, telefon och e-post | Årsavgift + serviceavgift. Svenskt AB krävs från 1/4 2026 | Värt det bara om ni vill ha en arbetsgivarorganisation, inte för länkar |
| 3 | Elsäkerhetsverkets "Kolla elföretaget" | e-tjanster.elsakerhetsverket.se (verifierad) | Ingen länk | Registrering är lagkrav | Kontrollera registreringen och länka dit från /om-oss som förtroendesignal |

**Uteslutna efter kontroll:**
- Servicefinder: profilerna saknar webblänk (3 kontrollerade).
- Solcellskollen: avslutade sin offerttjänst 1/1 2025.
- Offerta: betald leadsplattform som kräver F-skatt, moms och inga skulder hos Kronofogden. Länken i profilen gick inte att verifiera.
- Mittanbud: svarade inte.
- Second Opinion: sajten meddelar att den läggs ned (juli 2026).
- radochron.se: domänen finns inte. Råd & Rön ligger på radron.se.

## 3. Innehållsdriven länkning (månad 1–3)

Journalister citerar Skatteverket direkt, inte en installatörs sammanfattning av Skatteverket. Länkar kommer till det som bara ni har: egna beräkningar, serier över tid och lokala siffror.

### 3.1 Prio 1: Månadsrapport "Elpriset och hembatteriet" per elområde
- Ge rapporterna en fast adress, t.ex. `/kunskapsbank/rapporter/2026-10`, och en hubbsida som alltid visar den senaste.
- Börja med tre citerbara siffror per elområde (SE1–SE4):
  - snittpris
  - medianskillnaden mellan dygnets dyraste och billigaste kvart
  - antal kvartar med negativt pris
- Visa också vad ett 10 kWh-batteri hade kunnat spara. Redovisa antagandena och ange att det är Optimeras egen modell, enligt de redaktionella reglerna.
- Källorna verifierades 3 okt:
  - elprisetjustnu.se-API (96 kvartspriser per dygn)
  - Svenska kraftnäts Mimer (FCR-D)
  - SMHI STRÅNG (solinstrålning)
  - Energimyndighetens statistik över nätanslutna solcellsanläggningar
  - Svensk Solenergis statistik om grönt avdrag
- Kontrollera villkor och krav på källangivelse för prisdatan.
- Erbjud CSV, ett metodavsnitt som länkar till /metodik och en rad om att siffrorna är "fria att citera med källa och länk".
- Lägg ett skript i `scripts/`, i samma stil som sokfragor.py, så att varje rapport tar ungefär 2 timmar.
- Pitcha månadsrapporterna till lokal- och nischpress. Gör en årsrapport för 2026 i januari och pitcha den till rikspress.

### 3.2 Gör kunskapsbanken citerbar
- Lägg en ruta "Citera så här" på varje sida i Solcellsfrågor och Batteriskolan: en mening, siffran, datum, primärkälla och er URL.
- När nyheter om effektavgift, kvartspris eller FCR-D dyker upp: mejla reportern en länk till Batteriskolans förklaring, inte till säljsidan.
- Nyheter får sällan länkar. Det som får länkar är tidslinjer och sammanställningar av typen "vad gäller nu", med datum som hålls uppdaterade.

### 3.3 Prio 3: Inbäddningsbar widget
`/kalkylator` är en tung 3D-app och passar inte att bädda in. Bygg i stället en lätt iframe, t.ex. en kvartsprisgraf eller en snabbkalkyl för batteri per elområde, med en synlig rad "Data: Optimera Energi". Google räknar dolda eller sökordsfyllda länkar i widgets som länkspam. Använd därför varumärkesnamnet som länktext och sätt gärna `rel="nofollow"` i inbäddningskoden. Målgrupp: villaägareföreningar, BRF-sajter och lokala bloggar.

### 3.4 Pitchlista (personliga mejl, högst 10 per rapport)
| Redaktion | Kanal | Vinkel |
|---|---|---|
| Mitt i, med lokalupplagor för Solna, Sundbyberg, Täby, Danderyd, Sollentuna, Lidingö, Nacka och Stockholms villaområden (verifierat) | mitti.se/tipsa-6.10.0.6d2b4177c8 samt debattsidan | Kommunens siffror ur rapporten. Debattartikel om effektavgift |
| Nacka Värmdö Posten (verifierad) | nvp.se/tipsa, nvp.se/skicka-in-debattartikel | Nackavinkel |
| Villaägarna (villaliv.se omdirigerar hit). Medlemstidningen heter Villaägaren | villaagarna.se | Villaägarnas elräkning per elområde |
| Byggahus.se, redaktionen (ej verifierat direkt på grund av Cloudflare, men sajten finns i sökindex) | – | Expertkommentar om batteri till befintliga solceller |
| Råd & Rön (verifierad) | radron.se/om-rad--ron/kontakta-oss/ | Neutral checklista för att jämföra batterioffert |
| Allt om Elbil, Elbilen (verifierade) | alltomelbil.se/tips/, elbilen.se/om-oss/ | Laddbox, solel och effektavgift |
| Energinyheter.se (Dagens Näringsliv, verifierad). Publicerar krönikor | Tips via dagensnaringsliv.se/om-oss-kontakt-gdpr | Krönika om kvartspris för villaägare |
| Ny Teknik, Aktuell Hållbarhet, Elinstallatören (verifierade) | nyteknik.se, aktuellhallbarhet.se, elinstallatoren.se | Kvartalsdata. FCR-D i villor |

Ej verifierade: Lidingö Tidning och Danderydsnytt (svarade inte).

### 3.5 Press och expertkommentarer
- Skicka pressmeddelanden bara när ni har något nytt, som rapporten eller ett event, och skicka dem direkt till reportrar. MyNewsdesk och via TT är valfria betaltjänster. Länka med varumärke eller URL: sökordsfylld ankartext i pressmeddelanden räknas som länkspam enligt Google.
- Komplettera /press med en expertlista: 2 talespersoner, deras ämnen (batteri och stödtjänster, solceller och grönt avdrag, laddbox och effektavgift), direktnummer och löftet om svar samma dag.
- Lägg upp Google Alerts på "effektavgift", "kvartspris", "solcellsbatteri" och "grönt avdrag", och erbjud en kommentar inom ett dygn.

### 3.6 Forum
- **Byggahus forum är ingen länkkanal.** Användarvillkoren (tråd 220278, läst via sökindex eftersom direktåtkomst blockerades) förbjuder företag att delta utan särskilt tillstånd. De förbjuder också reklam och kommersiella webbplatser i profil och signatur; signaturer får bara innehålla interna länkar. Använd forumet för att hitta nya frågor till Solcellsfrågor. Vill ni svara, be Byggahus om tillstånd och länka aldrig till egna sidor.
- **Elbilsforum.se:** "Egenreklam är förbjuden i forumen och via PM", men icke-kommersiella länkar är tillåtna. Forumet är litet, så låg prio.
- Reddit: ej verifierat.

## 4. Lokalt
- **Villaägareföreningar.** Sidorna är verifierade på villaagarna.se för Solna, Täby, Centrala Lidingö, Danderyd och Turebergs (Sollentuna). I regionen listas också föreningar i Djursholm, Edsberg, Norrviken, Ektorp, Skuru, Saltsjöbaden, Enskede, Spånga, Hässelby och Vinsta.
  - Föreningarnas sidor "Lokala medlemsrabatter" länkar till lokala företag utan nofollow (verifierat hos Turebergs).
  - Erbjud dels en kostnadsfri informationskväll utan säljinslag om solel och batteri, med rapportens lokala siffror, dels en medlemsförmån.
  - En listning i utbyte mot rabatt är ett kommersiellt arrangemang. Be därför inte om "dofollow" eller viss ankartext; värdet ligger i publiken.
  - Alla föreningssidor ligger på villaagarna.se och räknas därför som en enda domän. Varje sida ger ändå lokal relevans och trafik.
- **Kommunal energi- och klimatrådgivning.** Stockholms stad har egen rådgivning (boende.stockholm, "kostnadsfri och opartisk"). Solna och Sundbyberg ingår i ett kluster med Ekerö och Järfälla som drivs av Järfälla, enligt en KS-handling från Solna som hittades via sökning. Rådgivarna är opartiska och **länkar i praktiken inte till företag**, så räkna inte med länkar därifrån. Länka själva till dem som källa och erbjud data om de vill ha.
- **Sponsring av lokala föreningar.** Google vill att sponsorlänkar har `rel="sponsored"` eller nofollow. Sponsra för varumärkets skull, inte för länken. Hur enskilda föreningars sajter hanterar länkarna är ej verifierat.
- **Kundcase och samarbeten.** Med kundens tillstånd kan ni publicera kundcase hos leverantörer (Emaldo, grossisten) och göra innehåll med lokala partner, t.ex. en gemensam guide med en takläggare om solceller vid takbyte. Det ska vara riktiga samarbeten, inte partnersidor som bara finns för att länka till varandra.
- **Företagarna Solna** (foretagarna.se/solna) ger nätverk, men vi hittade inget publikt medlemsregister. Där handlar det om relationer, inte länkar.

## 5. Gör inte
Följande bryter mot [Googles spampolicyer](https://developers.google.com/search/docs/essentials/spam-policies) och [Search Essentials](https://developers.google.com/search/docs/essentials) och kan ge manuella åtgärder:
- Köpa länkar, eller ge pengar, varor eller tjänster i utbyte mot länkar (t.ex. rabatt mot ett blogginlägg med länk), om länken inte [märks](https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links) `sponsored` eller `nofollow`.
- PBN eller egna satellitsajter, länkbyten i stor skala och partnersidor som bara finns för att länka till varandra.
- Kräva länk i avtal, t.ex. en "installerat av"-länk i sidfoten hos kunder eller BRF:er, utan att de får välja nofollow.
- Använda sökordsankare som "solceller Solna" i pressmeddelanden, gästinlägg och widgets.
- Skriva forumsvar eller signaturer med optimerade länkar, eller publicera AI-genererade forumsvar.
- Massproducera AI-sidor utan mervärde ("scaled content abuse"). Det gäller även egna stadssidor.
- Massregistrera sajten i lågkvalitativa kataloger, eller lägga in egna länkar på Wikipedia (intressekonflikt).

## 6. Mätning
| KPI | Baslinje 3 okt | Mål dag 90 | Källa och frekvens |
|---|---|---|---|
| Refererande domäner med följbar länk | 1 (hembatteri.se) | 5–8 | Search Console + Bing WMT, varje månad |
| Refererande domäner totalt | 2 i Common Crawl (+ Reco) | 10–15 | Search Console, varje månad |
| Externa domäner som länkar till kunskapsbanken eller rapporterna | 0 (ej live) | Minst 2 | Search Console → "Mest länkade sidorna", filtrera på /kunskapsbank, /solcellsfragor och /batteriskolan |
| Varumärkessökningar | Mät vecka 1 | Stigande trend | Search Console: frågor som innehåller "optimera energi" eller "optimeraenergi" (inte bara "optimera") |
| Omnämnanden | 0 kända | Minst 2 i månaden från månad 2 | Google Alerts på "Optimera Energi". Be om länk när ett omnämnande saknar länk |
| Leads via hänvisningar | Mät | Följ | GA4 källa/medium (hembatteri.se skickar UTM) |

Följ upp allt i en länklogg (kalkylark) med datum, domän, URL, rel, typ, kontakt och status. Som extra kontroll kan Common Crawls graf köras en gång per kvartal. Rank- och kantfilerna finns på commoncrawl.org/web-graphs, och själva sökningen tar cirka 10 minuter med skript.

## 7. 90-dagarsplan, 5 okt–8 jan (3–5 h/vecka)
| Vecka | Aktivitet | Ansvarig roll | Förväntad effekt |
|---|---|---|---|
| 1 (5/10) | Rätta namn och NAP enligt 1.2. Ge Julian åtkomst till Search Console och lägg till Bing WMT. Exportera baslinjen, skapa länkloggen och lägg upp Google Alerts | Operativ chef + webb | Konsekvent entitet och en baslinje |
| 1–2 | Google-profil, Bing Places, Apple Business. Allabolag via Proff Kundweb. Kontrollera Eniro manuellt | Operativ chef | Lokala signaler inom 2–4 veckor |
| 2 | Mejla Enequi, Emaldo, Easee, Zaptec och Charge Amps om listning med länk till relevant tjänstesida | VD | 2–4 relevanta länkar inom 4–8 veckor |
| 3 | Svensk Solenergi: kontrollera certifierad montör och ansök. Fråga grossisten om kundcase | VD | 1 stark branschlänk (handläggningstid) |
| 3–4 | Lansera kunskapsbanken i sitemapen med "Citera så här"-rutor, expertlista på /press och rapportskriptet | Webb/innehåll | Material som går att citera |
| 4 | Publicera rapport 1 (september) med CSV | Webb + operativ chef | Den första länkbara tillgången |
| 5 | Pitch 1: 8–10 personliga mejl till Mitt i lokalt, NVP, Villaägarna, Allt om Elbil, Elbilen och Energinyheter | Sälj/marknad | 0–2 omnämnanden och nya relationer |
| 6 | Publicera rapport 2 (oktober). Kontakta 5 villaägareföreningar och erbjud informationskväll och medlemsförmån | Sälj/marknad | 1–3 listningar på villaagarna.se |
| 7–8 | Kundcase med kundens godkännande, både på egen sida och skickat till Emaldo eller grossisten. Lokal debattartikel om effektavgift eller kvartspris | VD + webb | 1 leverantörslänk och lokal synlighet |
| 9 | Länkåtervinning. Kör Bing "Similar sites" mot 2 lokala konkurrenter och plocka ut 5 nya prospekt | Sälj/marknad | 1–2 länkar till |
| 10 | Publicera rapport 3 (november). Bygg en widgetprototyp om tid finns | Webb/innehåll | Underlag till årsrapporten |
| 11–12 (14–23/12) | Följ upp alla öppna förfrågningar och boka informationskvällar till jan–feb | Sälj/marknad | Avslutade ärenden och inbokade event |
| 13–14 (28/12–8/1) | Årsrapporten "Elåret 2026 för villaägare" när decemberdatan är komplett, pitchad till Råd & Rön, Ny Teknik och Villaägarna. Gå igenom KPI:erna och besluta om betalda profiler (Hitta, Offerta) | VD + operativ chef | Bästa chansen till starka länkar. Plan för Q1 |

**Osäkert och bör stämmas av internt:** vilka installatörsprogram ni redan är med i, om ni köper via Senergia, om det finns budget för Svensk Solenergi och om en Google-profil redan finns.
