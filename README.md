# Kloka Tankar El

Den första kundcentrerade men framåtdrivande elfirman som installerar
**solpaneler, batterier, värmepumpar, laddboxar och vindsnurror** under en
och samma flagg. Den här hemsidan är skriven så att premium-känslan ska
genomsyra allt — typografi, ljus, 3D, mikro­interaktioner — utan att tappa
det familjära.

## Stack

- **Next.js 14** (App Router, server components där det går)
- **TypeScript** + **Tailwind CSS** + ett dedikerat designsystem (`globals.css`,
  `tailwind.config.ts`)
- **React Three Fiber + drei + three** — alla 3D-vyer och CAD-flöden
- **framer-motion** — premium mikro­interaktioner
- **Zod** — validering av API-payloads

## Sidor

| Path | Beskrivning |
| --- | --- |
| `/` | Premium-hero med live-3D, manifest, processflöde, video, vittnesmål |
| `/tjanster/[slug]` | Tjänstesida (sol, batteri, värme, laddning, vind) |
| `/kalkylator` | 3D-tvilling — byter sol-/batteri-/värmepumps-/EMS-märke i realtid |
| `/om-oss` | Familjär presentation av teamet och företaget |
| `/offert` | Offertformulär som postar till `/api/offert` |
| `/studio` | Internt verktyg för att generera Higgsfield-videos |

## Kalkylatorn

Kalkylatorn (`src/components/calc/CalcStudio.tsx` +
`src/components/3d/CalcScene.tsx`) räknar i realtid på:

- Solpaneler — märke, antal, effekt
- Växelriktare — verkningsgrad, hybrid/string/mikro
- Batteri — kapacitet (kWh), kemi, påverkar självförbrukningsgrad
- Värmepump — märke + modell (NIBE, IVT, Bosch, Panasonic, Mitsubishi, Daikin,
  Thermia, CTC), SCOP, effekt, dimensionerad mot bostadsyta
- Laddbox — märke, kWh för EV-körsträcka
- Vindsnurra — märkeffekt
- **EMS** (energihantering) — Enequi Core, Tibber Bridge, Evolta IQ, Markedroid,
  HomeAssistant — påverkar både besparingsgrad och stödtjänstintäkt

Resultaten beräknas i `src/lib/calc.ts` och visas både som siffer-tiles och som
en levande 3D-tvilling där varje förändring av input visualiseras direkt
(antal paneler ritar om panelfältet, batteriet pulserar, värmepumpens fläkt
roterar, energiflöden animeras mellan komponenterna).

> Värdena i `src/lib/catalog.ts` är realistiska men förenklade. Innan du
> publicerar bindande siffror — uppdatera priser, SCOP och stödtjänstintäkter
> mot senaste datablad och Svenska Kraftnäts statistik.

## Higgsfield-integration

Vi pratar med Higgsfield från servern (aldrig från klienten). Sätt:

```bash
HIGGSFIELD_API_KEY=...      # från ditt Higgsfield-konto
HIGGSFIELD_API_URL=https://api.higgsfield.ai/v1
```

Gå till `/studio` när du är inloggad i utvecklingsmiljön. Där kan du:

1. Välja en förinställd prompt (Hembesök, Tak/drönare, Värmepump-detalj, etc.)
2. Justera prompt, modell (`soul` / `turbo` / `lite`), aspekt och längd
3. Klicka **Generera video** — vi POST:ar till `/api/higgsfield/generate`,
   pollar `/api/higgsfield/status/[id]` och visar resultatet i förhandsvisaren
   så snart det är klart

Filerna att känna till:

- `src/lib/higgsfield.ts` — typad klient + auth-headers
- `src/app/api/higgsfield/generate/route.ts` — POST endpoint
- `src/app/api/higgsfield/status/[id]/route.ts` — GET status
- `src/app/studio/page.tsx` + `src/components/studio/StudioClient.tsx` — UI

> När den färdiga filmen kommer ner kan du ladda upp den till `public/hero.mp4`
> (eller en CDN) och peka `src/components/home/VideoStage.tsx` mot den för att
> driva hero-stagen på startsidan.

## Offertformulär

`/offert` accepterar query-parametrar från kalkylatorn så att vi alltid har
kundens senaste konfiguration som utgångspunkt vid hembesöket.

`/api/offert` validerar med zod och loggar (eller skickar mail om
`RESEND_API_KEY` är satt). Byt gärna ut mot Postmark, SendGrid eller
direktintegration mot ert CRM (Pipedrive, HubSpot, Hubmore).

## Bilder & video

Just nu använder vi:

- 3D-modellerade scener (allt CAD-tema är riktig three.js)
- Färgade gradient-tiles + grain-textur som platshållare för foton i `HousecallStrip`
- En SVG-poster för hero-videon

Plan:

1. Boka in en fotograferingsdag — teamet, hembesök, fika, taket, säkringsskåp
2. Generera komplementmaterial via Higgsfield (`/studio`-presets är redan
   tonsatta för Kloka Tankar Els visuella språk)
3. Lägg in på en CDN och uppdatera `HousecallStrip` + `VideoStage` med riktiga
   `<Image>` / `<video>` källor

## Komma igång

```bash
npm install
cp .env.example .env.local
# fyll i HIGGSFIELD_API_KEY när du har den
npm run dev
```

Open <http://localhost:3000>.

### Bygga produktionsbygge

```bash
npm run build
npm start
```

### Deploy

Hela sidan är ren Next.js — passar Vercel eller en valfri Node-host. Sätt
miljövariabler enligt `.env.example`. För `/api/offert` rekommenderas att du
samtidigt kopplar in Resend (eller motsvarande) för riktiga mail.

## Filstruktur

```
src/
  app/
    layout.tsx         # global shell + fonts + Navbar/Footer
    page.tsx           # startsida
    tjanster/[slug]/   # tjänstesidor
    kalkylator/        # 3D-kalkylator
    om-oss/
    offert/
    studio/            # Higgsfield-verkstaden (intern)
    api/
      offert/route.ts
      higgsfield/generate/route.ts
      higgsfield/status/[id]/route.ts
  components/
    site/              # Navbar, Footer, Section, Hero
    home/              # ServicesGrid, Manifesto, HousecallStrip, Process, Testimonials, VideoStage, CtaPanel
    calc/              # CalcStudio (3D-kalkylator)
    3d/                # HeroLab, ServiceVignette, CalcScene
    offert/            # OffertForm
    studio/            # StudioClient
  lib/
    services.ts        # tjänsteinformation (ledtexter, FAQ, processteg)
    catalog.ts         # hårdvarukatalog (paneler, batterier, värmepumpar, EMS, etc.)
    calc.ts            # beräkningsmotor
    higgsfield.ts      # API-klient
```

## Vidare arbete

- [ ] Riktig fotografering, ersätta gradient-tiles
- [ ] Higgsfield-genererad bakgrundsfilm i hero
- [ ] Koppla upp Nord Pool-spotpris i realtid (för än mer trovärdiga kalkyler)
- [ ] Översätt till engelska (`/en/`) när vi gör vår första installation åt
  expat-familjer
- [ ] Lägg in CMS (Sanity eller Contentlayer) för "Tankar"-bloggen
- [ ] Översätt produktkatalogen till en delad källa med ert ERP/lager
