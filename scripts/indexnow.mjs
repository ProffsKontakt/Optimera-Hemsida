// Anmäler ändrade sidor till IndexNow (Bing, Yandex, Seznam, Naver m.fl.).
// Bing är källan för ChatGPT Search och Microsoft Copilot, så en ny eller
// ändrad sida kan synas där inom timmar i stället för veckor.
//
//   node scripts/indexnow.mjs                 # sidor med lastmod de senaste 8 dagarna
//   node scripts/indexnow.mjs --since 2026-10-01
//   node scripts/indexnow.mjs --all           # hela sitemapen (bara vid behov)
//   node scripts/indexnow.mjs --urls /a,/b    # bestämda sidor
//
// Kör efter att ändringen är live (sidan måste svara när Bing hämtar den).
// Nyckeln är publik: den ligger som public/<nyckel>.txt och bevisar bara att
// vi äger domänen.
import fs from "node:fs";
import path from "node:path";

const HOST = "optimeraenergi.se";
const BASE = `https://${HOST}`;
const keyFile = fs.readdirSync(path.resolve("public")).find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (!keyFile) throw new Error("Hittar ingen IndexNow-nyckel (public/<32 hex>.txt)");
const key = keyFile.replace(".txt", "");

const args = process.argv.slice(2);
const arg = (name) => (args.includes(name) ? args[args.indexOf(name) + 1] : null);

let urls;
if (arg("--urls")) {
  urls = arg("--urls").split(",").map((u) => (u.startsWith("http") ? u : `${BASE}${u}`));
} else {
  const xml = await (await fetch(`${BASE}/sitemap.xml`)).text();
  const entries = [...xml.matchAll(/<url>\s*<loc>([^<]+)<\/loc>\s*(?:<lastmod>([^<]+)<\/lastmod>)?/g)].map((m) => ({ loc: m[1], lastmod: m[2] ?? "" }));
  if (args.includes("--all")) urls = entries.map((e) => e.loc);
  else {
    const since = arg("--since") ?? new Date(Date.now() - 8 * 86_400_000).toISOString().slice(0, 10);
    urls = entries.filter((e) => e.lastmod.slice(0, 10) >= since).map((e) => e.loc);
    console.log(`Sidor med lastmod från ${since}: ${urls.length}`);
  }
}
if (!urls.length) {
  console.log("Inget att anmäla.");
  process.exit(0);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key, keyLocation: `${BASE}/${keyFile}`, urlList: urls.slice(0, 10_000) }),
});
console.log(`IndexNow svarade ${res.status} ${res.statusText} för ${urls.length} URL:er`);
// 200 = mottaget, 202 = mottaget men nyckeln valideras fortfarande.
if (![200, 202].includes(res.status)) {
  console.log(await res.text());
  process.exit(1);
}
