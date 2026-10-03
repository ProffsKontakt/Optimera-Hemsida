// Kontrollerar "Läget i korthet" i nyhetsartiklarna mot redaktionsregel 6
// (news-content.ts). Körs av nyhetsrutinen före publicering:
//   npm run check:news
import { NEWS } from "../src/lib/news.ts";
import { getNewsContent } from "../src/lib/news-content.ts";
import { newsTldrReport, TLDR_RULE_FROM } from "../src/lib/news-quality.ts";

const report = newsTldrReport(NEWS, getNewsContent);
if (report.length === 0) {
  console.log(`✓ Läget i korthet följer regel 6 i alla artiklar från ${TLDR_RULE_FROM}.`);
} else {
  for (const r of report) console.log(`✗ ${r.slug}\n  ${r.issues.join("\n  ")}`);
  console.log("\nKorta punkterna till högst två korta meningar och upprepa inte ingressen.");
  process.exit(1);
}
