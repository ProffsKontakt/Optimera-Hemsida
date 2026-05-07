# Optimera

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
   tonsatta för Optimeras visuella språk)
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

## 3D-batterier – byta procedurmodellerna mot riktiga GLB/GLTF

Just nu tecknar vi varje batterimärke procedurellt i three.js (se
`src/components/3d/BatteryModels.tsx`). Vill ni ha pixelriktiga 3D-modeller
av riktiga produkter – så här gör ni:

### Steg 1: Skaffa modellerna

Lättast i fallande ordning:

1. **Be tillverkaren direkt.** Pylontech, SAJ, Emaldo m.fl. har ofta
   STEP/STP- eller IFC-filer för installatörer (för CAD-ritning).
   Mejla `partners@<varumärke>` och fråga efter "3D model for
   installer planning – STEP, FBX or glTF preferred".
2. **Sök på Sketchfab och GrabCAD** – ofta finns färdiga modeller där.
   Filtrera på "downloadable" + CC-licens.
3. **Bygg själva i Blender.** Importera produktbilder (front + sida) som
   referens, modellera i ~30 min per produkt med raka primitiver +
   bevels. Det är vad procedurmodellerna i koden hade kunnat varit om
   vi tog 4 timmar i Blender per pjäs.

### Steg 2: Konvertera till GLB

three.js läser bäst **GLB** (binärt glTF 2.0). Verktyg:

- Blender (gratis): `File → Export → glTF 2.0 (.glb/.gltf)`. Välj `glb`
  med "Compression" → "Draco" på, "Apply Modifiers" på, och under
  "Materials" välj "Export Original PBR".
- Online: <https://anyconv.com/step-to-glb-converter/> för en STEP-fil
- CLI: `gltf-pipeline -i input.gltf -o output.glb -d` (Draco
  compressed)

Mål-storlek per fil: **< 500 kB**. Större och vi får tunga
laddningstider på `/kalkylator`. Använd `gltf-pipeline -d` för Draco
om någon fil är stor; lägg till `<DracoLoader>` i three.js i så fall.

### Steg 3: Lägg in dem i projektet

```bash
mkdir -p public/models/batteries
cp pylontech-h3.glb public/models/batteries/
cp easyway-univ7600.glb public/models/batteries/
cp saj-hs3.glb public/models/batteries/
cp enershare-core.glb public/models/batteries/
cp emaldo-store.glb public/models/batteries/
```

### Steg 4: Byt procedurkomponenten mot `<Gltf>`

I `src/components/3d/BatteryModels.tsx`, ersätt en
procedurkomponent med:

```tsx
import { Gltf } from "@react-three/drei";

export function PylontechH3({ capacityKWh }: { capacityKWh: number }) {
  // Pylontech har 5 kWh per modul – stapla flera modeller på höjden
  const modules = Math.max(2, Math.round(capacityKWh / 5));
  return (
    <group>
      {Array.from({ length: modules }).map((_, i) => (
        <Gltf
          key={i}
          src="/models/batteries/pylontech-h3.glb"
          position={[0, i * 0.13, 0]}
          scale={1}
        />
      ))}
    </group>
  );
}
```

För SAJ HS3 och Emaldo (fasta storlekar med inbyggd växelriktare)
behöver ni bara byta hela kroppen mot `<Gltf src="..." />` och
eventuellt skala beroende på vald kapacitet.

### Steg 5: Testa lokalt

```bash
npm run dev
# Gå till /kalkylator, kryssa i "Batteri", växla mellan märkena.
# Modellerna ska bytas direkt utan reload.
```

> Tips: använd `useGLTF.preload("/models/batteries/pylontech-h3.glb")`
> i moduletop för snabbare första render.

## Admin-sektionen (`/admin`)

Internt verktyg för teamet, skyddat med ett delat lösenord.

```bash
# .env.local
ADMIN_PASSWORD=valj-ett-langt-losenord
IDEAS_WEBHOOK_URL=https://kt-central.../webhooks/ideas   # valfritt
IDEAS_WEBHOOK_TOKEN=                                      # valfritt
```

- `/admin/login` – password-gate (cookie-baserad, `oe_admin`)
- `/admin` – översikt över interna verktyg
- `/admin/ideer` – Idé-hörnan, en samlingsplats för förslag om sälj,
  CRM-utbyggnad, drift och marknad. Idéerna persisteras i din browser
  (localStorage). Om `IDEAS_WEBHOOK_URL` är satt POST:as varje ny idé
  också till KT Central / Slack / Notion så hela teamet kan se dem
  centralt
- `/studio` – Higgsfield-verkstaden (öppen även utan login men inte
  länkad publikt)

## Vidare arbete

- [ ] Riktig fotografering, ersätta gradient-tiles
- [ ] Higgsfield-genererad bakgrundsfilm i hero
- [ ] Koppla upp Nord Pool-spotpris i realtid (för än mer trovärdiga kalkyler)
- [ ] Översätt till engelska (`/en/`) när vi gör vår första installation åt
  expat-familjer
- [ ] Lägg in CMS (Sanity eller Contentlayer) för "Tankar"-bloggen
- [ ] Översätt produktkatalogen till en delad källa med ert ERP/lager
