# Closed-loop attribution: webbplats → Sentinel HQ → Google Ads/GA4

Syftet är att Google Ads ska kunna optimera mot leads som faktiskt **köper**,
inte bara fyller i formuläret. För det måste annonsklicket (gclid) och GA4:s
client_id fångas vid lead-tillfället, följa med leadet in i CRM:et, och CRM:et
rapporterar sedan tillbaka när leadet kvalificeras/stängs/köper.

## 1. Vad webbplatsen redan gör (klart)

Vid varje offertinskickning skickar `/api/offert` med ett `attribution`-objekt
i lead-payloaden (både till `KT_CENTRAL_WEBHOOK_URL` och i den interna mejlet):

```jsonc
{
  "namn": "...", "telefon": "...", "epost": "...",
  "services": ["solpaneler"],
  "attribution": {
    "gclid": "Cj0KCQ...",          // Google Ads klick-id (om från annons)
    "gbraid": "...", "wbraid": "...", // iOS/app-klick-id
    "utmSource": "google", "utmMedium": "cpc", "utmCampaign": "...",
    "gaClientId": "1234567890.1234567890", // GA4 client_id ur _ga-cookien
    "landingPage": "/solceller/stockholm?gclid=...",
    "referrer": "https://www.google.com/",
    "firstSeen": "2026-06-14T22:00:00.000Z"
  }
}
```

Online-konverteringen `generate_lead` skickas dessutom från `/offert/klar`
med ett uppskattat `value` (per tjänst) + Enhanced Conversions (hashad
e-post/telefon, endast vid marknadsföringssamtycke).

**Sentinel HQ måste lagra hela `attribution`-objektet på leadet.** Resten av
loopen bygger på `gclid` och `gaClientId`.

## 2. Funnel-events (finns redan som Key events i GA4)

| Steg | Event | Var det skickas ifrån |
|------|-------|------------------------|
| Lead skapad | `generate_lead` | Webbplatsen (`/offert/klar`) — klart |
| Lead kvalificerad | `qualify_lead` | Sentinel HQ när säljare kvalificerar |
| Affär stängd | `close_convert_lead` | Sentinel HQ vid signerat avtal |
| Betalt/installerat | `purchase` | Sentinel HQ med verkligt ordervärde |

## 3. Hur CRM:et stänger loopen

Två vägar, använd gärna båda:

### A. Google Ads offline conversion import (kräver gclid)
När ett lead byter status, ladda upp en offline-konvertering till Ads
(Ads API `ConversionUploadService.uploadClickConversions`):

```jsonc
{
  "gclid": "<lead.attribution.gclid>",
  "conversionAction": "customers/<id>/conversionActions/<qualify|close|purchase>",
  "conversionDateTime": "2026-06-20 14:05:00+02:00",
  "conversionValue": 185000,        // verkligt ordervärde vid purchase
  "currencyCode": "SEK"
}
```

Skapa matchande conversion actions i Ads (Goals → Conversions → Import/Manual)
för `qualify_lead`, `close_convert_lead`, `purchase`. Sätt `purchase` som primär
konvertering för värdebaserad budgivning, övriga som sekundära.

### B. GA4 Measurement Protocol (kräver client_id)
Skicka funnel-events server-side till GA4, som sedan delar dem med Ads via
GA4↔Ads-länken:

```
POST https://www.google-analytics.com/mp/collect
      ?measurement_id=G-5DY857B8TL
      &api_secret=<MP_API_SECRET>     # se Sentinel HQ env, INTE i repo
```
```jsonc
{
  "client_id": "<lead.attribution.gaClientId>",
  "events": [{
    "name": "purchase",
    "params": {
      "value": 185000, "currency": "SEK",
      "transaction_id": "<crm_order_id>",
      "lead_source": "offert"
    }
  }]
}
```

`gclid` kan även skickas med i GA4-eventet (`params.gclid`) för bättre Ads-match.

## 4. Env i Sentinel HQ (inte i detta repo)

```
GA4_MEASUREMENT_ID=G-5DY857B8TL
GA4_MP_API_SECRET=<hemlig – fås separat, lagra som secret>
GOOGLE_ADS_CUSTOMER_ID=498-513-9656
# + Ads API developer token + OAuth refresh token för offline upload
```

GA4 property: `properties/538264209`, data stream: `14905571591`.

## 5. Rekommenderad budstrategi när loopen rullar

1. Börja på `generate_lead` (Maximize conversions) tills ~15–30 konv/månad.
2. Slå på offline `purchase` med värde → byt till **Maximize conversion value /
   target ROAS** så Ads jagar köpstarka leads, inte bara formulärfyllnader.
3. Mata in "dåliga" leads som låga/noll-värden (eller skippa uppladdning) så
   algoritmen lär sig vilka klick som inte blir affär.
