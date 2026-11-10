# AI-chatten på sajten

En chattknapp ("Fråga oss") nere till höger på alla publika sidor utom
offertflödet. Besökaren ställer frågor och får svar som bygger på sajtens
eget, faktagranskade innehåll. Under meddelandefältet finns "Bli uppringd",
som skickar namn, telefon och e-post till samma leadflöde som
offertformuläret (`/api/offert`).

## Slå på

1. Skapa en API-nyckel i Anthropic-konsolen och sätt en månatlig
   utgiftsgräns där. Det är det hårda taket för kostnaden.
2. Lägg nyckeln som `ANTHROPIC_API_KEY` i Vercel (Production).
3. Gör en ny deploy. Knappen byggs in i sidorna vid deploy, så den syns
   först efter det.
4. Provkör: `node scripts/chatt-test.mjs` och läs igenom de tio svaren.

Stäng av: sätt `CHAT_ENABLED=false` i Vercel och deploya om, eller ta bort
nyckeln. Utan nyckel renderas ingen knapp och `/api/chatt` svarar 503.

## Vad chatten kan och inte kan

- Den svarar bara utifrån kunskapsunderlaget i `src/lib/chat-knowledge.ts`.
  Underlaget byggs automatiskt av vanliga frågor (`src/lib/faq-content.ts`),
  tjänstesidornas frågor, solcellsfrågor, batteriskolan, guiderna,
  ortsdatat (nätbolag och effektavgift) och återbetalningsspannen.
  Rättas en uppgift på sajten rättas den alltså även i chatten.
- Står svaret inte i underlaget ska den säga det och hänvisa till
  uppringning eller hembesök. Den ska inte gissa priser, återbetalning,
  besparingar eller vad som gäller ett enskilt hus.
- Den har inga verktyg: den kan inte boka, läsa CRM eller skriva något.
- Den presenterar sig som AI-assistent, utan namn och utan porträtt.

Instruktionen står överst i `src/lib/chat-knowledge.ts`. Ändra den där.

## Kostnad

Standardmodellen är `claude-opus-5-5`. Kunskapsunderlaget är drygt 60 000
tecken (ungefär 20 000–25 000 tokens) och cachas hos Anthropic i fem
minuter, så följdfrågor blir billiga.

Uppskattning med Anthropics prislista den 3 november 2026 (4 USD per
miljon tokens in, 20 USD ut, cacheläsning 0,20 USD):

| Fall | Ungefärlig kostnad |
|---|---|
| Första frågan i ett samtal (cachen skrivs) | 0,11–0,13 USD |
| Följdfråga inom fem minuter | 0,01–0,02 USD |
| Ett samtal på fyra frågor | cirka 0,15 USD |

Varje svar loggar förbrukningen (`[chatt]` i Vercels loggar), så den
verkliga kostnaden går att följa. Vill ni ha lägre kostnad: sätt
`CHAT_MODEL=claude-haiku-5-5` i Vercel. Den är väsentligt billigare men
svarar mindre träffsäkert, så kör `scripts/chatt-test.mjs` efter bytet.

## Skydd

- Högst 12 frågor per fem minuter och 60 per dygn och besökare (IP), och
  högst 1 200 tecken per fråga. Spärren är per serverinstans och därmed ett
  grovt skydd. Utgiftsgränsen i Anthropic-konsolen är det hårda taket.
- Rutten tar bara emot anrop från sajten själv.
- Samtal sparas inte på servern. De ligger i besökarens flik
  (sessionStorage) och skickas till Anthropic när en fråga ställs.

## Innan chatten slås på: integritetspolicyn

Policyn (`src/app/integritet/page.tsx`) nämner inte chatten. Lägg till den
innan nyckeln läggs in. Förslag på text, att stämma av mot era avtal med
Anthropic:

> **AI-chatten.** Frågor du skriver i chatten på sajten skickas till vår
> leverantör Anthropic, som genererar svaret. Vi sparar inte samtalen i
> våra egna system. Skriv inga personuppgifter i chatten. Väljer du "Bli
> uppringd" behandlas ditt namn, telefonnummer och din e-postadress på
> samma sätt som i offertformuläret.

Under "Vilka vi delar uppgifterna med" läggs Anthropic till som leverantör
av AI-tjänsten.

## Filer

- `src/app/api/chatt/route.ts` – rutten: validering, spärr, modellanrop, strömmat svar.
- `src/lib/chat-knowledge.ts` – instruktion och kunskapsunderlag.
- `src/lib/chat-config.ts` – modell, gränser, var chatten döljs.
- `src/components/chat/` – knappen (`ChatLauncher`), fönstret (`ChatPanel`) och `ChatMount`.
- `scripts/chatt-test.mjs` – frågebatteri för provkörning.
