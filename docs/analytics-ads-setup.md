# Analytics & Google Ads – setup och event-taxonomi

_Senast uppdaterad: 2026-07-07_

Det här dokumentet beskriver hur mätningen på optimeraenergi.se är uppbyggd,
vilka events koden skickar, och **exakt vad som ska konfigureras i Google Tag
Manager / Google Ads** innan första kampanjen startas. Koden är klar – det som
återstår är klick i GTM/Ads-gränssnitten (de kan inte versionshanteras här).

---

## 1. Arkitektur – vad ligger var

| Lager | Vad | Var |
| --- | --- | --- |
| **Consent Mode v2** | Default `denied` för alla fyra signaler (`ad_storage`, `ad_user_data`, `ad_personalization`, `analytics_storage`) innan något laddas; Cookiebot-samtycke uppgraderar via `CookiebotOnAccept`-brygga | `src/components/analytics/GoogleAnalytics.tsx` |
| **GA4** | `G-5DY857B8TL` direkt via gtag.js (INTE via GTM – se varning nedan) | samma fil |
| **GTM** | Container `GTM-5HD9BPW6`, delar `dataLayer` med gtag | `src/components/analytics/GoogleTagManager.tsx` |
| **Events** | `trackEvent()` skickar VARJE event i två format: `dataLayer.push({event})` (för GTM-triggers) + `gtag('event')` (för GA4) | `src/lib/analytics.ts` |
| **Enhanced Conversions** | SHA-256-hashad e-post/telefon, endast vid marknadsföringssamtycke; skickas både via `gtag('set','user_data')` och som `user_data_ready`-push för GTM | samma fil |
| **Attribution** | gclid/gbraid/wbraid + UTM + GA4 client_id fångas på landning (90 dagar, localStorage) och följer med offerten in i CRM:et | `src/lib/attribution.ts` |
| **Offline-konverteringar** | Säkrat relä CRM → sajt → GA4 Measurement Protocol (HMAC-signerat, replay-skyddat) för `qualify_lead` / `close_convert_lead` / `purchase` | `src/app/api/conversions/route.ts` |

> ⚠️ **Dubbelräkningsvarning:** GA4 skickas redan direkt via gtag. Lägg ALDRIG
> till en "Google Tag / GA4 Configuration" för `G-5DY857B8TL` inne i GTM –
> då räknas alla sidvisningar och events dubbelt. GTM används enbart för
> Ads-/remarketing-/tredjepartstaggar.

## 2. Event-taxonomi (skickas av koden idag)

| Event | När | Parametrar | Roll i Ads |
| --- | --- | --- | --- |
| `generate_lead` | Offert skickad (fyras på `/offert/klar`, endast vid äkta inskickning) | `method` (hembesok/telefon), `services`, `value` (SEK-proxy per tjänst), `currency: "SEK"` | **Primär konvertering** |
| `form_start` | Första interaktionen med offertformuläret (en gång per sidladdning) | `form: "offert"` | Mikro-konvertering / funnel-signal |
| `phone_click` | Klick på valfri `tel:`-länk (global delegation) | `link_url` | Mikro-konvertering |
| `email_click` | Klick på valfri `mailto:`-länk | `link_url` | Mikro-konvertering |
| `user_data_ready` | Precis före `generate_lead`, om marknadsföringssamtycke finns | `user_data: { sha256_email_address, sha256_phone_number }` | Enhanced Conversions-källa |
| `qualify_lead`, `close_convert_lead`, `purchase` | Från CRM via `/api/conversions` (server-side, GA4 MP) | valfria + gclid | Offline-konverteringar / värdejustering |

Lead-värdesproxy (tills CRM rapporterar verkligt värde): solpaneler 800,
batterier 600, värmepumpar 500, laddboxar 200, övrigt 300 SEK — definierat i
`src/components/offert/OffertConfirmation.tsx`.

## 3. GTM-container – att göra (klickas ihop i tagmanager.google.com)

1. **Variabler** (Data Layer Variables, version 2):
   - `dlv.method` ← `method`, `dlv.services` ← `services`,
     `dlv.value` ← `value`, `dlv.currency` ← `currency`,
     `dlv.user_data` ← `user_data`, `dlv.link_url` ← `link_url`.
2. **Triggers** (Custom Event, exakt namnmatchning):
   - `CE – generate_lead`, `CE – form_start`, `CE – phone_click`,
     `CE – email_click`.
3. **Conversion Linker-tagg** – trigger: All Pages. (Krävs för klick-id-cookies.)
4. **Google Ads Conversion Tracking** (primär konvertering):
   - Conversion ID/Label: från Ads → Mål → Konverteringar → "Ny konverteringsåtgärd → Webbplats" (skapa åtgärden "Lead – offert skickad").
   - Trigger: `CE – generate_lead`.
   - Value: `{{dlv.value}}`, Currency: `{{dlv.currency}}`.
   - **Enhanced conversions:** aktivera i konverteringsåtgärden (Ads) OCH i
     taggen: "Include user-provided data" → New Variable → *User-Provided Data*
     → "Code" → Data Layer Variable `user_data`. Koden pushar redan färdig-
     hashade fält (`sha256_email_address`, `sha256_phone_number`) – accepteras
     rakt av.
5. **Google Ads Conversion Tracking** (sekundära, valfritt men rekommenderat):
   - "Kontakt – telefonklick" på `CE – phone_click` (kategori: Contact,
     räkna: En per klick). Motsvarande för `form_start` som "Sidengagemang"
     (sätt som *sekundär* åtgärd i Ads så den inte stör budgivningen).
6. **Google Ads Remarketing-tagg** – trigger: All Pages. Bygger målgrupper
   (t.ex. besökt `/solcellsbatteri` eller `/kalkylator` utan lead).
7. **Consent:** gör inget extra – Consent Mode v2-defaulten i koden gäller
   före GTM laddar, och Googles taggar respekterar signalerna automatiskt
   (`ads_data_redaction` är aktiv). Verifiera bara i Preview att taggarna
   håller sig i "consent denied"-läge tills man godkänt marknadsföring i
   Cookiebot.
8. **Publicera** containern (Submit → Version) – GTM-ändringar är inte live
   innan dess.

## 4. Google Ads-kontot

1. Skapa konverteringsåtgärden **"Lead – offert skickad"** (kategori:
   Skicka in leadformulär; värde: "Använd olika värden"; räkna: **En** per
   klick; klickfönster 30 d; attributionsmodell: datadriven).
2. Aktivera **Enhanced conversions** på åtgärden (metod: Google Tag Manager).
3. Sätt `phone_click`/`form_start`-åtgärderna som **sekundära** mål.
4. **Länka GA4 ↔ Ads** (Admin → Product links) och **importera** gärna GA4-
   eventet `generate_lead` som backup-konvertering – men ha bara EN av dem
   (GTM-taggen eller GA4-importen) som *primär*, annars dubbelräknas leads.
5. När CRM:et börjar skicka `qualify_lead`/`purchase` via reläet: skapa
   motsvarande importerade konverteringar för värdebaserad budgivning (tROAS).

## 5. Miljövariabler (Vercel)

| Variabel | Roll | Status |
| --- | --- | --- |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Överstyra GA4-id (annars `G-5DY857B8TL`) | valfri |
| `NEXT_PUBLIC_GTM_ID` | Överstyra GTM-id (annars `GTM-5HD9BPW6`) | valfri |
| `NEXT_PUBLIC_COOKIEBOT_CBID` | Cookiebot-banner (utan den laddas ingen banner) | **krävs i prod** |
| `GA4_MP_API_SECRET` | GA4 Measurement Protocol-secret för offline-reläet | krävs för relä |
| `CONVERSION_RELAY_SECRET` | Delad HMAC-hemlighet sajt ↔ CRM | krävs för relä |

## 6. Testprotokoll innan kampanjstart

1. **GTM Preview** (Tag Assistant) mot produktion/preview:
   - Ladda startsidan → neka marknadsföring i Cookiebot → klicka en
     `tel:`-länk → `phone_click` syns som event MEN Ads-taggarna ska visa
     "consent not granted" / inte fyras skarpt.
   - Godkänn alla cookies → gör en testinskickning av offertformuläret →
     verifiera ordningen `form_start` → `user_data_ready` → `generate_lead`
     på `/offert/klar`, och att Ads-konverteringstaggen fyrar med värde+valuta
     och user-provided data.
2. **GA4 DebugView:** samma flöde, verifiera `generate_lead` med params.
3. **Ads:** konverteringsåtgärden går från "Inaktiv" till "Registrerar
   konverteringar" inom ~24 h efter första äkta konverteringen.
4. Ta bort/annotera testleads i CRM så de inte förorenar statistiken.

## 7. Backlog (ej blockerande för kampanjstart)

- `calculator_engaged`-event när någon ändrar sin första inställning i
  3D-kalkylatorn (kräver ingrepp i `CalcConfigurator` – hooken `trackEvent`
  är redo).
- `view_item`-liknande event per tjänstesida för mer granulär remarketing.
- Server-side tagging (GTM Server / sGTM) om iOS-/adblock-bortfall blir
  märkbart – dagens klientupplägg är rätt nivå tills spendet motiverar det.
