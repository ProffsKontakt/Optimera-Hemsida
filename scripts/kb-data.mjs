// Läser kunskapsbankens och nyheternas datafiler direkt, utan att bygga sajten.
// Används av scripts/kb-check.mjs och scripts/veckans-sokningar.py.
//
//   node scripts/kb-data.mjs    # JSON-index över allt publicerat innehåll
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(path.join(ROOT, "package.json"));
const ts = require("typescript");

// Datafilerna importerar bara typer, så det räcker att transpilera och köra dem.
export function loadModule(rel) {
  const src = fs.readFileSync(path.join(ROOT, rel), "utf8");
  const js = ts.transpileModule(src, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const mod = { exports: {} };
  vm.runInNewContext(js, { module: mod, exports: mod.exports, require: () => ({}) });
  return mod.exports;
}

export function loadKb() {
  return {
    questions: loadModule("src/lib/solcellsfragor-content.ts").QUESTIONS,
    concepts: loadModule("src/lib/batteriskolan-content.ts").CONCEPTS,
    news: loadModule("src/lib/news.ts").NEWS,
    guides: loadModule("src/lib/guides.ts").GUIDES,
  };
}

// Allt publicerat innehåll med de fraser det svarar på – underlag för att
// avgöra om en sökning redan är täckt.
export function contentIndex(kb = loadKb()) {
  return [
    ...kb.questions.map((q) => ({
      kind: "fråga", href: `/solcellsfragor/${q.slug}`, title: q.question,
      phrases: [q.question, ...q.searchPhrases],
    })),
    ...kb.concepts.map((c) => ({
      kind: "koncept", href: `/batteriskolan/${c.slug}`, title: c.title,
      phrases: [c.term, c.title, ...c.searchPhrases],
    })),
    ...kb.news.filter((n) => n.status === "published").map((n) => ({
      kind: "nyhet", href: `/nyheter/${n.slug}`, title: n.title,
      phrases: [n.title, ...(n.searchPhrases ?? [])],
    })),
    ...kb.guides.filter((g) => g.status === "published").map((g) => ({
      kind: "guide", href: `/guider/${g.slug}`, title: g.title, phrases: [g.title],
    })),
  ];
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  process.stdout.write(JSON.stringify(contentIndex()));
}
