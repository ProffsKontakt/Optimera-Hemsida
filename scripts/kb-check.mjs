// Kvalitetsgrind för kunskapsbanken (Solcellsfrågor, Batteriskolan och
// guider i AI-sökformatet, dvs. med kort svar).
//
//   node scripts/kb-check.mjs              # struktur, länkar, sökfraser och typografi
//   node scripts/kb-check.mjs --only a,b   # varningar och URL-koll bara för dessa slugs
//   node scripts/kb-check.mjs --urls       # kontrollera även att käll-URL:erna svarar
//
// Avslutar med kod 1 om något PROBLEM hittas. Varningar stoppar inte bygget, men
// nya sidor ska inte ha några varningar när de publiceras.
import fs from "node:fs";
import path from "node:path";
import { execFile } from "node:child_process";
import { ROOT, loadKb } from "./kb-data.mjs";

const args = process.argv.slice(2);
const only = args.includes("--only") ? new Set(args[args.indexOf("--only") + 1].split(",")) : null;
const checkUrls = args.includes("--urls");

const { questions, concepts, news, guides, guideContent } = loadKb();
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), "utf8");
const typeUnion = (name) =>
  [...read("src/lib/kb-types.ts").match(new RegExp(`type ${name}\\s*=([^;]+);`))[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);
const CATEGORIES = typeUnion("SolarCategorySlug");
const GROUPS = typeUnion("BatteryGroup");

// --- Giltiga interna länkar: statiska sidor i src/app plus sidor som byggs från data.
const routes = new Set();
(function walk(dir, route) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isFile() && e.name === "page.tsx") routes.add(route || "/");
    if (e.isDirectory() && !/^[[(]/.test(e.name) && !["admin", "api", "studio"].includes(e.name))
      walk(path.join(dir, e.name), `${route}/${e.name}`);
  }
})(path.join(ROOT, "src/app"), "");
const slugsIn = (rel) => [...read(rel).matchAll(/slug: "([^"]+)"/g)].map((m) => m[1]);
const add = (prefix, slugs) => slugs.forEach((s) => routes.add(`${prefix}/${s}`));
add("/solcellsfragor", questions.map((q) => q.slug));
add("/batteriskolan", concepts.map((c) => c.slug));
add("/nyheter", news.filter((n) => n.status === "published").map((n) => n.slug));
add("/guider", guides.filter((g) => g.status === "published").map((g) => g.slug));
add("/solceller", slugsIn("src/lib/cities.ts"));
add("/batteri", slugsIn("src/lib/battery-cities.ts"));
add("/tjanster", slugsIn("src/lib/services.ts"));
const validHref = (h) => routes.has(h.split("#")[0]);

// --- Textnormalisering för sökfraskollen (samma ord, böjningar och synonymer).
const SYN = {
  solpaneler: "solceller", solpanel: "solcell", solcellspaneler: "solceller", solcellsanlaggning: "solceller",
  lont: "lonar", lonsamt: "lonar", lonsam: "lonar", lonsamhet: "lonar", lonsamma: "lonar", tjanar: "sparar",
  tjana: "sparar", kostnad: "kostar", kostnader: "kostar", pris: "kostar", priser: "kostar", m2: "kvadratmeter",
  kvm: "kvadratmeter", funkar: "fungerar", hembatteri: "batteri", solcellsbatteri: "batteri",
  batterilager: "batteri", batterilagring: "batteri", batterier: "batteri", tvatta: "rengora",
  tvattar: "rengora", rengor: "rengora",
};
const STOP = new Set(("hur mycket man ar det en ett pa for med och vad ska idag bra i till av om som att kan far " +
  "den de sig nar var vilken vilka vilket 2025 2026 2027 nu mest mer bast basta finns ni jag du vi behover " +
  "maste egentligen").split(" "));
const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
  .replace(/[^a-z0-9]+/g, " ").split(" ").map((w) => SYN[w] ?? w).join(" ");
const contentWords = (p) => norm(p).split(" ").filter((w) => w && !STOP.has(w));
const words = (s) => s.split(/\s+/).filter(Boolean).length;

const problems = [];
const warnings = [];
const problem = (slug, msg) => problems.push(`[${slug}] ${msg}`);
const warn = (slug, msg) => { if (!only || only.has(slug)) warnings.push(`[${slug}] ${msg}`); };

function phraseCheck(slug, phrases, text) {
  const tokens = norm(text).split(" ");
  for (const p of phrases) {
    const missing = contentWords(p).filter((w) => !tokens.some((t) => t.startsWith(w)));
    if (missing.length) warn(slug, `sökfrasen "${p}" besvaras inte ordagrant – saknar: ${missing.join(", ")}`);
  }
}
function typography(slug, text) {
  if (/\b\d+-\d+\s?(år|kr|kWh|kW|%|öre|procent|dagar|timmar|minuter|grader|cykler|mil)/.test(text))
    warn(slug, "bindestreck i intervall – använd tankstreck (8–11 år)");
  if (/\b\d+\.\d+\s?(%|kr|kWh|kW|öre)/.test(text)) warn(slug, "decimalpunkt – använd decimalkomma (14,55 %)");
  const big = text.match(/\b\d{4,}\s?(kr|kWh)\b/);
  if (big && !/^(19|20)\d\d\b/.test(big[0])) warn(slug, `tusental utan mellanslag: "${big[0]}" (50 000 kr)`);
}
const dupes = (arr) => [...new Set(arr.filter((s, i) => arr.indexOf(s) !== i))];
for (const d of dupes([...questions, ...concepts].map((x) => x.slug))) problem(d, "slugen finns flera gånger");

const qSlugs = new Set(questions.map((q) => q.slug));
const cSlugs = new Set(concepts.map((c) => c.slug));

for (const q of questions) {
  const s = q.slug;
  if (!CATEGORIES.includes(q.category)) problem(s, `okänd kategori "${q.category}"`);
  for (const r of q.related) if (!qSlugs.has(r)) problem(s, `related pekar på saknad fråga "${r}"`);
  for (const c of q.concepts ?? []) if (!cSlugs.has(c)) problem(s, `concepts pekar på saknat koncept "${c}"`);
  for (const l of q.links ?? []) if (!validHref(l.href)) problem(s, `länken ${l.href} leder inte till någon sida`);
  if (!q.sources.length) problem(s, "inga källor");
  if (!q.question.endsWith("?")) warn(s, "frågan slutar inte med frågetecken");
  const sa = words(q.shortAnswer);
  if (sa > 60) warn(s, `kortsvaret är ${sa} ord (högst ca 45)`);
  const body = q.body.flatMap((b) => [...b.paragraphs, ...(b.bullets ?? [])]);
  const total = sa + body.reduce((n, t) => n + words(t), 0);
  if (total < 130 || total > 380) warn(s, `${total} ord totalt (sikta på 150–300)`);
  if (q.description.length < 90 || q.description.length > 165) warn(s, `description är ${q.description.length} tecken (90–165)`);
  phraseCheck(s, q.searchPhrases, [q.question, q.shortAnswer, ...q.body.map((b) => b.h2 ?? ""), ...body].join(" "));
  typography(s, [q.shortAnswer, ...body].join(" "));
}
for (const c of concepts) {
  const s = c.slug;
  if (!GROUPS.includes(c.group)) problem(s, `okänd grupp "${c.group}"`);
  for (const r of c.related) if (!cSlugs.has(r)) problem(s, `related pekar på saknat koncept "${r}"`);
  for (const q of c.questions ?? []) if (!qSlugs.has(q)) problem(s, `questions pekar på saknad fråga "${q}"`);
  for (const l of c.links ?? []) if (!validHref(l.href)) problem(s, `länken ${l.href} leder inte till någon sida`);
  if (c.sources.length < 2) problem(s, `för få källor (${c.sources.length}, minst 2)`);
  const all = [c.shortAnswer, ...c.sections.flatMap((x) => [...x.paragraphs, ...(x.bullets ?? [])]),
    ...(c.example?.lines ?? []), c.example?.note ?? "", ...(c.misconceptions ?? []).flatMap((m) => [m.myth, m.fact]),
    ...c.faq.flatMap((f) => [f.q, f.a])];
  const total = all.reduce((n, t) => n + words(t), 0);
  if (total < 400 || total > 1100) warn(s, `${total} ord totalt (sikta på 450–800)`);
  if (c.description.length < 90 || c.description.length > 165) warn(s, `description är ${c.description.length} tecken (90–165)`);
  phraseCheck(s, c.searchPhrases, [c.title, c.term, ...c.sections.map((x) => x.h2), ...all].join(" "));
  typography(s, all.join(" "));
}

// Guider i AI-sökformatet (har answer). Äldre guider med tldr granskas av
// kunskapsbankens rutin och skrivs om till formatet efter hand.
const newGuides = guides.filter((g) => g.status === "published" && guideContent[g.slug]?.answer);
for (const g of newGuides) {
  const s = g.slug;
  const c = guideContent[s];
  if ((g.sources ?? []).length < 2) problem(s, `för få källor (${(g.sources ?? []).length}, minst 2)`);
  const sa = words(c.answer);
  if (sa < 30 || sa > 85) warn(s, `kortsvaret är ${sa} ord (sikta på 40–80)`);
  if ((c.keyFacts ?? []).length < 3) warn(s, "faktarutan har färre än 3 rader");
  const notQ = c.sections.filter((x) => !x.h2.trim().endsWith("?"));
  if (notQ.length) warn(s, `H2 som inte är frågor: ${notQ.map((x) => `"${x.h2}"`).join(", ")}`);
  if (c.faq.length < 3) warn(s, `${c.faq.length} FAQ-frågor (minst 3)`);
  if (g.excerpt.length < 90 || g.excerpt.length > 170) warn(s, `excerpt är ${g.excerpt.length} tecken (90–170)`);
  const all = [c.answer, ...(c.keyFacts ?? []).map((f) => `${f.label} ${f.value}`),
    ...c.sections.flatMap((x) => [...x.body, ...(x.bullets ?? [])]), ...c.faq.flatMap((f) => [f.q, f.a])];
  phraseCheck(s, g.searchPhrases ?? [], [g.title, ...c.sections.map((x) => x.h2), ...all].join(" "));
  typography(s, all.join(" "));
}

// Samma sökfras på två sidor gör att de konkurrerar om samma sökning.
const owner = new Map();
for (const x of [...questions, ...concepts, ...newGuides.map((g) => ({ slug: g.slug, searchPhrases: g.searchPhrases ?? [] }))])
  for (const p of x.searchPhrases) {
    const key = norm(p);
    if (owner.has(key) && owner.get(key) !== x.slug) warn(x.slug, `sökfrasen "${p}" finns även på ${owner.get(key)}`);
    else owner.set(key, x.slug);
  }

// Sidor utanför databaserna som länkar in (Term.tsx) måste ha sina mål.
for (const h of [...read("src/components/site/Term.tsx").matchAll(/href: "(\/(?:solcellsfragor|batteriskolan)\/[^"]+)"/g)].map((m) => m[1]))
  if (!validHref(h)) problem("Term.tsx", `länkar till saknad sida ${h}`);

if (checkUrls) {
  const entries = [...questions, ...concepts, ...newGuides.map((g) => ({ slug: g.slug, sources: g.sources ?? [] }))]
    .filter((x) => !only || only.has(x.slug));
  const bySlug = new Map();
  for (const x of entries) for (const src of x.sources) bySlug.set(src.url, [...(bySlug.get(src.url) ?? []), x.slug]);
  const urls = [...bySlug.keys()];
  const status = (url) => new Promise((resolve) =>
    execFile("curl", ["-sL", "-o", "/dev/null", "-w", "%{http_code}", "--max-time", "25", "-A",
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/124 Safari/537.36", url],
    (_err, out) => resolve(String(out).trim() || "000")));
  const results = [];
  for (let i = 0; i < urls.length; i += 8)
    results.push(...(await Promise.all(urls.slice(i, i + 8).map(async (u) => [u, await status(u)]))));
  for (const [u, code] of results) {
    const slugs = bySlug.get(u).join(", ");
    if (code === "404" || code === "410") problem(slugs, `källan finns inte längre (HTTP ${code}): ${u}`);
    else if (!/^[23]/.test(code)) warn(bySlug.get(u)[0], `källan kunde inte verifieras härifrån (HTTP ${code}): ${u}`);
  }
  console.log(`Kontrollerade ${urls.length} käll-URL:er.`);
}

console.log(`Solcellsfrågor: ${questions.length}  Batteriskolan: ${concepts.length}  Guider (nytt format): ${newGuides.length}`);
console.log(`\nPROBLEM (${problems.length})${problems.map((p) => `\n  - ${p}`).join("")}`);
console.log(`\nVARNINGAR (${warnings.length})${warnings.map((w) => `\n  - ${w}`).join("")}`);
process.exit(problems.length ? 1 : 0);
