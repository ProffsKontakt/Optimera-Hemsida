// Kontrollerar "Läget i korthet" i nyhetsartiklarna mot redaktionsregel 6
// (news-content.ts). Körs av nyhetsrutinen före publicering:
//   npm run check:news
import { NEWS, newsImageIssues } from "../src/lib/news.ts";
import { readFileSync } from "node:fs";
import { getNewsContent } from "../src/lib/news-content.ts";
import { newsTldrReport, TLDR_RULE_FROM } from "../src/lib/news-quality.ts";

// Bildspärr: bara eget material (se bildpolicyn i news.ts). Kontrollerar
// även bilder uppladdade via /admin/media (data/media-manifest.json).
const imageIssues = newsImageIssues(NEWS);
const manifest = JSON.parse(readFileSync(new URL("../data/media-manifest.json", import.meta.url), "utf8"));
for (const [slot, entry] of Object.entries(manifest)) {
  if (slot.startsWith("news:"))
    imageIssues.push(`${slot}: uppladdad nyhetsbild via admin – kontrollera att den är eget material, annars ta bort den.`);
  if (/watermark|shutterstock|getty|istock|adobestock|alamy|tt-?bild|svd|dn-|aftonbladet|expressen/i.test(entry.url ?? ""))
    imageIssues.push(`${slot}: filnamnet tyder på bild från byrå/tidning (${entry.url}).`);
}
if (imageIssues.length > 0) {
  for (const i of imageIssues) console.log(`✗ ${i}`);
  console.log("\nBara egna bilder/egen grafik får användas – aldrig byrå-, tidnings- eller pressbilder.");
  process.exit(1);
}
console.log("✓ Alla nyhetsbilder är eget material.");

const report = newsTldrReport(NEWS, getNewsContent);
if (report.length === 0) {
  console.log(`✓ Läget i korthet följer regel 6 i alla artiklar från ${TLDR_RULE_FROM}.`);
} else {
  for (const r of report) console.log(`✗ ${r.slug}\n  ${r.issues.join("\n  ")}`);
  console.log("\nKorta punkterna till högst två korta meningar och upprepa inte ingressen.");
  process.exit(1);
}
