# Project-level Claude Code-konfiguration

Den här mappen innehåller projekt-specifika sub-agents och skills som följer
med repo:t. När du eller en kollega kör Claude Code från projektmappen
plockas dessa upp automatiskt.

## claude-seo (v1.9.9)

Komplett SEO-verktygslåda från [AgriciDaniel/claude-seo](https://github.com/AgriciDaniel/claude-seo)
injicerad direkt i repo:t. 18 sub-agents + 25 skills som täcker teknisk SEO,
content quality, schema, GEO/AI-search, local SEO m.m.

### Struktur

```
.claude/
  agents/       18 sub-agent .md-filer (seo-technical.md, seo-geo.md, etc)
  skills/       25 skill-mappar med SKILL.md, references/ och schema/
.claude-plugin/
  plugin.json   Plugin-manifest som registrerar paketet
  marketplace.json
```

### Slash-kommandon

När Claude Code-CLI:n startas i repo:t läses skill-manifesten och följande
kommandon blir tillgängliga:

| Kommando | Funktion |
|---|---|
| `/seo` | Huvud-audit (orchestrator – kallar relevanta sub-skills) |
| `/seo-audit` | Komplett site-audit med parallella agents |
| `/seo-technical` | Crawlability, indexability, Core Web Vitals (INP) |
| `/seo-geo` | AI-search-optimering (ChatGPT, Gemini, Perplexity, AI Overviews) |
| `/seo-schema` | Schema.org-detektion, validering, generering |
| `/seo-sitemap` | Sitemap-validering + generering med quality gates |
| `/seo-google` | Google-specifika ranking-faktorer (E-E-A-T, helpful content) |
| `/seo-local` | Local SEO (GBP, citations, reviews, map pack) |
| `/seo-maps` | Maps intelligence |
| `/seo-content` | Content quality + brief-generering |
| `/seo-content-brief` | Detaljerade content-briefs för enskilda artiklar |
| `/seo-cluster` | Semantic topic clustering |
| `/seo-page` | Single-page-djupanalys |
| `/seo-sxo` | Search experience optimization |
| `/seo-drift` | Bevaka SEO-rankning över tid |
| `/seo-images` | Bild-SEO (alt-text, kompression, format) |
| `/seo-image-gen` | Generera optimerade bilder med korrekt metadata |
| `/seo-hreflang` | Internationell SEO + språk-targeting |
| `/seo-ecommerce` | E-commerce-specifik SEO |
| `/seo-backlinks` | Backlink-analys |
| `/seo-flow` | FLOW-framework-integration |
| `/seo-plan` | Strategisk SEO-planering |
| `/seo-programmatic` | Programmatic SEO (location-pages, etc) |
| `/seo-competitor-pages` | Konkurrent-sidanalys |
| `/seo-dataforseo` | DataForSEO API-integration |

### Använd kommandona

I Claude Code, skriv ett kommando följt av URL eller fråga:

```
/seo https://optimeraenergi.se
/seo-geo /home/user/klokatankar/src/app/page.tsx
/seo-content-brief "solceller pris 2026 stockholm"
/seo-technical /
```

### Uppdatering

För att uppdatera till en nyare version av claude-seo:

```bash
cd /tmp && rm -rf claude-seo-fresh
git clone --depth 1 https://github.com/AgriciDaniel/claude-seo.git claude-seo-fresh
cd /path/to/klokatankar
rm -rf .claude/agents .claude/skills .claude-plugin/plugin.json .claude-plugin/marketplace.json
mkdir -p .claude/agents .claude/skills
cp /tmp/claude-seo-fresh/agents/*.md .claude/agents/
cp -r /tmp/claude-seo-fresh/skills/* .claude/skills/
cp /tmp/claude-seo-fresh/.claude-plugin/* .claude-plugin/
mkdir -p .claude/skills/seo/schema
cp -r /tmp/claude-seo-fresh/schema/* .claude/skills/seo/schema/
```

### Licens

claude-seo är MIT-licensierat. Licens-text bevarad i
`.claude/skills/seo/LICENSE.txt`.
