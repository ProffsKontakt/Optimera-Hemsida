#!/usr/bin/env python3
"""Veckans mest sökta frågor om solceller, batterier, laddbox, värmepump och elpris i Sverige.

Underlag för veckoagenten som varje vecka skriver två nya sidor till kunskapsbanken.
Hämtar Google Trends för Sverige de senaste 7 dagarna: de mest sökta relaterade
sökningarna (topp, index 0–100) och de som ökar mest (procent mot perioden innan)
för ett antal grundord. Varje sökning jämförs med kunskapsbanken, nyheterna och
guiderna och märks som täckt (med närmaste sida) eller obesvarad. Obesvarade
sökningar byggs ut med Googles sökförslag så att de exakta frågeformerna syns.

    python3 scripts/veckans-sokningar.py           # rapport
    python3 scripts/veckans-sokningar.py --json    # maskinläsbart

Svarar inte Google Trends (429 eller tomt) skriver skriptet det tydligt; använd
då scripts/sokfragor.py, som bara bygger på sökförslag.
"""
import http.cookiejar
import json
import re
import subprocess
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from sokfragor import suggest  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent

# Grundord som fångar villaägarnas sökningar om solceller, batterier och elnät. Trends
# jämför högst fem ord per anrop, så varje grupp körs ihop med "solceller" som ankare.
# Då kan grundordens volym vägas mot varandra (Trends sätter annars varje ords
# toppsökning till 100, oavsett hur mycket ordet söks).
ANCHOR = "solceller"
SEED_GROUPS = [
    ["solpaneler", "solcellsbatteri", "elpris", "effektavgift"],
    ["hembatteri", "växelriktare", "kvartspris", "laddbox"],
    # Guiderna tar värmepump, elavtal och avdrag (docs/kunskapsbank.md steg 8).
    ["värmepump", "bergvärme", "elavtal", "grönt avdrag"],
]
SEEDS = [ANCHOR] + [k for g in SEED_GROUPS for k in g]

TOPIC = re.compile(
    r"sol|panel|batteri|växelriktare|elpris|spotpris|kvartspris|effekt|elnät|nätavgift|elavtal|"
    r"stödtjänst|fcr|säkring|laddbox|elbil|värmepump|kwh|kwp|grönt avdrag|skattereduktion|mikroproduc|"
    r"bergvärme|luft-vatten|luft vatten|luftvärmepump|fjärrvärme|villaeffekt|rotavdrag"
)
QUESTION = re.compile(r"^(hur|vad|varför|när|kan|måste|behöver|får|lönar|ska|vilken|vilka|vilket|går|är|"
                      r"fungerar|finns|vem|var|blir|påverkar)\b")
# Söker någon efter dagens pris eller ett företag finns inget kunskapsbanksvar att skriva.
REALTIME = re.compile(r"\b(idag|i dag|imorgon|i morgon|imorn|just nu|nu|dagens|aktuellt|aktuella|timme|"
                      r"timpris|graf|live|historik)\b")
# Nätbolagens regler (effektavgift, säkring, nätavgift) är sakfrågor, inte reklam.
GRID_COMPANIES = re.compile(r"\b(ellevio|vattenfall|e\.?on|mälarenergi|göteborg energi|jämtkraft|"
                            r"skellefteå kraft|öresundskraft|telge|tekniska verken|kraftringen)\b")
GRID_TOPIC = re.compile(r"effekt|nät|avgift|tariff|säkring|anslut|mikroproduc")
BRANDS = re.compile(
    r"\b(tibber|greenely|vattenfall|e\.?on|ellevio|fortum|göteborg energi|mälarenergi|jämtkraft|skellefteå kraft|"
    r"telge|öresundskraft|freebo|svea solar|otovo|soltech|solcellskollen|sungrow|huawei|tesla|powerwall|emaldo|"
    r"ferroamp|checkwatt|cornex|catl|byd|nibe|jinko|longi|ja solar|trina|solaredge|enphase|fronius|growatt|"
    r"saj|easyway|polarium|ivt|thermia|mitsubishi|daikin|panasonic|bosch|toshiba|solis|solax|goodwe|deye|sma|kostal|victron|sonnen|pixii|sigenergy|easee|zaptec|"
    r"wallbox|charge amps|ctek|garo|defa|monta|ngenic|bauhaus|biltema|jula|clas ohlson|ikea|kjell|elgiganten|hornbach|byggmax|"
    r"blocket|flashback|reddit|avanza|nordnet|handelsbanken|swedbank|seb|nordea|ica banken)\b"
)
PLACES = re.compile(
    r"\b(stockholm|göteborg|malmö|uppsala|västerås|örebro|linköping|helsingborg|jönköping|norrköping|lund|umeå|"
    r"gävle|borås|södertälje|eskilstuna|halmstad|växjö|karlstad|sundsvall|östersund|trollhättan|luleå|kalmar|"
    r"kristianstad|skövde|falun|borlänge|varberg|kungsbacka|uddevalla|nyköping|motala|karlskrona|visby|gotland|"
    r"skåne|halland|småland|dalarna|norrland|solna|sundbyberg|täby|lidingö|sollentuna|nacka|danderyd|huddinge|"
    r"botkyrka|haninge|järfälla|upplands väsby|vallentuna|österåker|värmdö|tyresö|ekerö|norrtälje|sigtuna|"
    r"enköping|strängnäs|katrineholm|lidköping|alingsås|kungälv|mölndal|partille|lerum|ängelholm|landskrona|"
    r"trelleborg|ystad|hässleholm|vänersborg|piteå|skellefteå|örnsköldsvik|kiruna|mora|ludvika|sandviken|"
    r"hudiksvall|köping|arboga|sala|tierp|norrtälje|åre|danmark|norge|finland|tyskland|spanien)\b"
)

SYN = {
    "solpaneler": "solceller", "solpanel": "solcell", "solcellspaneler": "solceller",
    "solcellsanlaggning": "solceller", "lont": "lonar", "lonsamt": "lonar", "lonsam": "lonar",
    "lonsamhet": "lonar", "kostnad": "kostar", "pris": "kostar", "priser": "kostar", "funkar": "fungerar",
    "hembatteri": "batteri", "solcellsbatteri": "batteri", "batterilager": "batteri",
    "batterier": "batteri", "kvm": "kvadratmeter", "m2": "kvadratmeter",
}
STOP = set(
    "hur mycket man ar det en ett pa for med och vad ska bra i till av om som att kan far den de sig nar var "
    "vilken vilka vilket 2025 2026 2027 mest mer bast basta finns jag du vi behover maste".split()
)


def norm_words(s):
    import unicodedata

    s = unicodedata.normalize("NFD", s.lower())
    s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    return {SYN.get(w, w) for w in re.sub(r"[^a-z0-9]+", " ", s).split() if w not in STOP}


class Trends:
    """Minimal klient för Google Trends 'relaterade sökningar' (samma anrop som webbsidan gör)."""

    def __init__(self):
        jar = http.cookiejar.CookieJar()
        self.op = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(jar))
        self.op.addheaders = [
            ("User-Agent", "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/124 Safari/537.36"),
            ("Accept-Language", "sv-SE,sv;q=0.9"),
        ]
        self.errors = []

    def get(self, url, tries=5):
        for i in range(tries):
            try:
                with self.op.open(url, timeout=25) as r:
                    return r.read().decode("utf-8", "replace")
            except urllib.error.HTTPError as e:
                if e.code != 429:
                    self.errors.append(f"HTTP {e.code}")
                    return None
                time.sleep(8 * (i + 1))
            except Exception as e:  # nätverksfel
                self.errors.append(type(e).__name__)
                time.sleep(4)
        self.errors.append("429 (för många anrop)")
        return None

    @staticmethod
    def parse(body):
        return json.loads(body[body.index("{"):])

    def explore(self, keywords, timeframe="now 7-d"):
        req = {
            "comparisonItem": [{"keyword": k, "geo": "SE", "time": timeframe} for k in keywords],
            "category": 0,
            "property": "",
        }
        body = self.get("https://trends.google.com/trends/api/explore?hl=sv&tz=-120&req="
                        + urllib.parse.quote(json.dumps(req)))
        return self.parse(body)["widgets"] if body else []

    def widget(self, kind, w):
        time.sleep(4)
        data = self.get(f"https://trends.google.com/trends/api/widgetdata/{kind}?hl=sv&tz=-120&req="
                        + urllib.parse.quote(json.dumps(w["request"])) + "&token=" + w["token"])
        return self.parse(data)["default"] if data else None

    def volumes(self, widgets, keywords):
        """Grundordens genomsnittliga sökintresse i perioden, relativt det första ordet."""
        ts = next((w for w in widgets if w["id"] == "TIMESERIES"), None)
        data = self.widget("multiline", ts) if ts else None
        points = [p["value"] for p in (data or {}).get("timelineData", [])]
        if not points:
            return {}
        avgs = [sum(col) / len(col) for col in zip(*points)]
        return {k: a / avgs[0] for k, a in zip(keywords, avgs)} if avgs[0] else {}

    def related(self, widgets, skip=()):
        """{grundord: {"top": [(fras, index)], "rising": [(fras, procent)]}}"""
        out = {}
        for w in widgets:
            # Med flera grundord heter widgetarna RELATED_QUERIES_0, _1 osv.
            if not w["id"].startswith("RELATED_QUERIES"):
                continue
            keyword = w["request"]["restriction"]["complexKeywordsRestriction"]["keyword"][0]["value"]
            if keyword in skip:
                continue
            data = self.widget("relatedsearches", w)
            if not data:
                continue
            lists = data["rankedList"]
            top = [(k["query"], int(k["value"])) for k in lists[0]["rankedKeyword"]] if lists else []
            rising = [(k["query"], int(k["value"])) for k in lists[1]["rankedKeyword"]] if len(lists) > 1 else []
            out[keyword] = {"top": top, "rising": rising}
        return out


def daily_trending():
    """Dagens trendande sökningar i Sverige som rör energi (Trends RSS)."""
    try:
        with urllib.request.urlopen("https://trends.google.com/trending/rss?geo=SE", timeout=20) as r:
            root = ET.fromstring(r.read())
    except Exception:
        return []
    ns = {"ht": "https://trends.google.com/trending/rss"}
    items = []
    for it in root.iter("item"):
        title = it.findtext("title") or ""
        if TOPIC.search(title.lower()):
            items.append((title, it.findtext("ht:approx_traffic", default="", namespaces=ns)))
    return items


def content_index():
    raw = subprocess.run(["node", str(ROOT / "scripts/kb-data.mjs")], capture_output=True, text=True, check=True)
    index = json.loads(raw.stdout)
    for entry in index:
        entry["word_sets"] = [norm_words(p) for p in entry["phrases"]]
    return index


def best_match(query, index, kinds):
    """Närmaste sida av given sort, mätt som ordöverlapp (Jaccard) mot sidans fraser.
    Vid lika överlapp vinner sidan där flest fraser ligger nära sökningen."""
    q = norm_words(query)
    best = (0.0, 0, None)
    for entry in index:
        if entry["kind"] not in kinds or not q:
            continue
        # En fras som krymper till ett ord ("bästa solpaneler" → solceller) säger inget
        # om en sökning med flera ord.
        sims = [len(q & ws) / len(q | ws) for ws in entry["word_sets"] if ws and (len(ws) > 1 or len(q) == 1)]
        if not sims:
            continue
        top, near = max(sims), sum(x >= 0.6 for x in sims)
        if (top, near) > best[:2]:
            best = (top, near, entry)
    return best[0], best[2]


def relevant(query, suggestions):
    """Sökförslag som faktiskt bygger vidare på sökningen (Google blandar in utländska förslag)."""
    q = [w for w in re.sub(r"[^a-zåäö0-9]+", " ", query.lower()).split()]
    out = []
    for sug in suggestions:
        words = re.sub(r"[^a-zåäö0-9]+", " ", sug.lower()).split()
        if all(any(w.startswith(qw) for w in words) for qw in q):
            out.append(sug)
    return out


def classify(query):
    q = query.lower()
    if len(q.split()) == 1:
        return "för brett (ett ord)"
    if re.search(r"\b(husbil|husvagn|båt|camping|12v|12 v)\b", q):
        return "fordon/fritid"
    if re.search(r"\b(företag|firma|installatör|installatörer)\b", q) and not QUESTION.search(q):
        return "företagssökning"
    if re.search(r"\belpris", q) and not QUESTION.search(q):
        return "prisuppslag"
    if GRID_COMPANIES.search(q):
        return None if GRID_TOPIC.search(q) else "varumärke"
    if BRANDS.search(q):
        return "varumärke"
    if PLACES.search(q):
        return "ort"
    if REALTIME.search(q):
        return "prisuppslag"
    if not TOPIC.search(q):
        return "utanför ämnet"
    return None


def main():
    as_json = "--json" in sys.argv
    trends = Trends()
    related, volume = {}, {ANCHOR: 1.0}
    for group in SEED_GROUPS:
        keywords = [ANCHOR] + group
        widgets = trends.explore(keywords)
        volume.update({k: v for k, v in trends.volumes(widgets, keywords).items() if k != ANCHOR})
        related.update(trends.related(widgets, skip=related.keys()))
        time.sleep(5)
    index = content_index()

    rows = {}
    for seed, lists in related.items():
        for kind in ("top", "rising"):
            for query, value in lists[kind]:
                row = rows.setdefault(query, {"query": query, "seeds": set(), "top": 0, "rising": 0})
                row["seeds"].add(seed)
                row[kind] = max(row[kind], value)
    # Ett grundord som söks mindre än "solceller" väger mindre; större ord kapas vid 1.
    weight = lambda seeds: max(min(1.0, volume.get(s, 1.0)) for s in seeds)

    candidates = []
    for row in rows.values():
        # Bara kunskapsbanken och guiderna räknas som bestående svar; en nyhet visas som notering.
        sim, entry = best_match(row["query"], index, {"fråga", "koncept", "guide"})
        news_sim, news = best_match(row["query"], index, {"nyhet"})
        row["news"] = news["href"] if news and news_sim >= 0.6 else None
        # Topp-index mäter volym, ökningen mäter trend; 500 % och "tydlig ökning" ger maxbonus.
        row["score"] = round(weight(row["seeds"]) * (row["top"] + min(50, row["rising"] / 10)), 1)
        row["seeds"] = sorted(row["seeds"])
        row["skip"] = classify(row["query"])
        row["covered_by"] = entry["href"] if entry and sim >= 0.6 else None
        row["closest"] = {"href": entry["href"], "title": entry["title"], "similarity": round(sim, 2)} if entry else None
        candidates.append(row)
    candidates.sort(key=lambda r: -r["score"])

    open_rows = [r for r in candidates if not r["covered_by"] and not r["skip"]]
    for r in open_rows[:12]:
        r["suggestions"] = relevant(r["query"], dict.fromkeys(suggest(r["query"]) + suggest(r["query"] + " ")))[:12]

    result = {
        "period": "Google Trends, Sverige, senaste 7 dagarna",
        "trends_ok": bool(related),
        "trends_errors": sorted(set(trends.errors)),
        "seeds": SEEDS,
        "seed_volume_vs_solceller": {k: round(v, 2) for k, v in volume.items()},
        "uncovered": open_rows,
        "covered": [r for r in candidates if r["covered_by"]],
        "skipped": [r for r in candidates if r["skip"] and not r["covered_by"]],
        "daily_trending": daily_trending(),
    }
    if as_json:
        print(json.dumps(result, ensure_ascii=False, indent=1))
        return

    print(f"{result['period']}")
    print("Grundordens sökvolym (solceller = 100): "
          + ", ".join(f"{k} {round(v * 100)}" for k, v in sorted(volume.items(), key=lambda x: -x[1])))
    if not related:
        print(f"\nGOOGLE TRENDS SVARADE INTE ({', '.join(result['trends_errors']) or 'tomt svar'}).")
        print("Använd scripts/sokfragor.py sol|bat (bara sökförslag) som underlag den här veckan.")
    fmt = lambda r: (f"topp {r['top']:>3}" if r["top"] else "        ") + (
        f"  ökning {'TYDLIG' if r['rising'] >= 5000 else str(r['rising']) + ' %':>7}" if r["rising"] else "")
    print("\nOBESVARADE – kandidater till veckans sidor (högst poäng först):")
    for r in open_rows[:15]:
        closest = r["closest"]
        near = (f"  (närmast: {closest['href']}, likhet {closest['similarity']})"
                if closest and closest["similarity"] >= 0.4 else "")
        if r["news"]:
            near += f"  [nyhet finns: {r['news']}]"
        print(f"  [{r['score']:>5.1f}] {r['query']:<42} {fmt(r)}{near}")
        if r.get("suggestions"):
            print(f"          sökförslag: {' | '.join(r['suggestions'][:8])}")
    print("\nREDAN TÄCKTA (kan uppdateras om sidan är tunn eller inaktuell):")
    for r in result["covered"][:15]:
        print(f"  [{r['score']:>5.1f}] {r['query']:<42} {fmt(r)}  → {r['covered_by']}")
    print("\nÖVERHOPPADE (varumärke, ort, prisuppslag, för brett, utanför ämnet):")
    for r in result["skipped"][:20]:
        print(f"  [{r['score']:>5.1f}] {r['query']:<42} {r['skip']}")
    if result["daily_trending"]:
        print("\nTRENDAR I SVERIGE IDAG (energirelaterat):")
        for title, traffic in result["daily_trending"]:
            print(f"  {title} ({traffic})")


if __name__ == "__main__":
    main()
