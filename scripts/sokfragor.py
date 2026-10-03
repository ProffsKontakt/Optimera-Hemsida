#!/usr/bin/env python3
"""Hitta sökfrågor som kunskapsbanken ännu inte besvarar.

Hämtar Google-autocomplete (sv/SE) för solcells- och batterifrågor, rangordnar
förslagen efter hur högt och hur ofta de dyker upp och filtrerar bort det som
redan täcks av en fråga eller en sökfras i Solcellsfrågor, Batteriskolan eller
nyheterna. Reserv för veckorutinen när Google Trends inte svarar (se
veckans-sokningar.py).

    python3 scripts/sokfragor.py sol      # nya solcellsfrågor
    python3 scripts/sokfragor.py bat      # nya batterikoncept/frågor
    python3 scripts/sokfragor.py sol 40   # visa 40 kandidater
"""
import json
import re
import sys
import time
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONTENT_FILES = [
    ROOT / "src/lib/solcellsfragor-content.ts",
    ROOT / "src/lib/batteriskolan-content.ts",
    ROOT / "src/lib/news.ts",
]
LETTERS = list("abcdefghijklmnopqrstuvwxyzåäö")

SEEDS = {
    "sol": {
        "terms": ["solceller", "solpaneler"],
        "prefixes": [
            "hur mycket kostar", "hur mycket producerar", "hur fungerar", "hur länge håller",
            "lönar sig", "vad kostar", "vad är", "när lönar sig", "kan man ha",
            "kan man sälja el från", "behöver man bygglov för", "måste man", "får man",
            "går det att", "vilka", "hur mycket sparar man på", "hur rengör man",
            "är det lönt med", "vad händer med", "hur påverkar",
        ],
        "suffixes": [
            "hur", "vad", "när", "varför", "kan", "pris", "vinter", "tak", "bygglov", "skatt",
            "sälja el", "avdrag", "batteri", "livslängd", "garanti", "växelriktare",
            "försäkring", "brand", "elbil", "värmepump", "elavtal", "nätägare", "säkring",
            "2026", "2027", "nackdelar", "underhåll",
        ],
        "alpha": ["solceller", "solpaneler"],
        "topic": r"sol|panel",
    },
    "bat": {
        "terms": ["batteri solceller", "solcellsbatteri", "hembatteri"],
        "prefixes": ["vad är", "hur fungerar", "lönar sig", "hur stort", "hur länge håller", "kan man ha"],
        "suffixes": ["hur", "vad", "pris", "lönar", "livslängd", "brand", "grönt avdrag",
                     "utan solceller", "fcr-d", "2026", "storlek", "strömavbrott"],
        "alpha": ["solcellsbatteri", "fcr-d", "effektavgift", "kvartspris"],
        "topic": r"batteri|lager|fcr|afrr|mfrr|stödtjänst|effekt|kvartspris|spotpris|ö-?drift|växelriktare|aggregator|säkring",
    },
}

QUESTION = re.compile(
    r"^(hur|vad|varför|när|kan|måste|behöver|får|lönar|ska|vilken|vilka|vilket|går|är|"
    r"fungerar|finns|vem|var|blir|påverkar|säljer)\b"
)
NOISE = re.compile(
    r"\b(ikea|biltema|clas|jula|bauhaus|kjell|amazon|flashback|reddit|bil|bilbatteri|mobil|"
    r"laptop|camping|husbil|båt|lampa|powerbank|aktie|aktier|jobb|lön|engelska)\b"
)


def suggest(q):
    url = ("https://suggestqueries.google.com/complete/search?client=firefox&hl=sv&gl=se&q="
           + urllib.parse.quote(q))
    for attempt in range(3):
        try:
            with urllib.request.urlopen(url, timeout=12) as r:
                data = json.loads(r.read().decode("utf-8", "replace"))
                time.sleep(0.15)
                return data[1]
        except Exception:
            time.sleep(1.5 * (attempt + 1))
    return []


SYNONYMS = {
    "solpaneler": "solceller", "solpanel": "solcell", "solcellspaneler": "solceller",
    "solcellsbatteri": "batteri", "hembatteri": "batteri", "batterilager": "batteri",
    "batterilagring": "batteri", "funkar": "fungerar", "lönt": "lönar",
}


def normalize(s):
    words = re.sub(r"[^a-zåäö0-9]+", " ", s.lower()).split()
    return " ".join(SYNONYMS.get(w, w) for w in words)


def covered_phrases():
    phrases = []
    for f in CONTENT_FILES:
        if not f.exists():
            continue
        text = f.read_text(encoding="utf-8")
        for m in re.finditer(r"(searchPhrases|question|term|title):\s*(\[[^\]]*\]|\"[^\"]*\")", text):
            phrases += re.findall(r"\"([^\"]+)\"", m.group(2))
    return [set(normalize(p).split()) for p in phrases if p.strip()]


def is_covered(words, existing):
    for e in existing:
        if not e:
            continue
        overlap = len(words & e) / len(words | e)
        if overlap >= 0.7:
            return True
    return False


def main():
    mode = sys.argv[1] if len(sys.argv) > 1 else "sol"
    limit = int(sys.argv[2]) if len(sys.argv) > 2 else 25
    cfg = SEEDS[mode]
    seeds = []
    for t in cfg["terms"]:
        seeds += [f"{p} {t}" for p in cfg["prefixes"]] + [f"{t} {s}" for s in cfg["suffixes"]]
    for t in cfg["alpha"]:
        seeds += [f"{t} {l}" for l in LETTERS]
    seeds = list(dict.fromkeys(seeds))

    with ThreadPoolExecutor(max_workers=4) as ex:
        results = list(ex.map(suggest, seeds))

    score = {}
    for sugs in results:
        for i, s in enumerate(sugs):
            score[s] = score.get(s, 0) + (10 - i)

    topic = re.compile(cfg["topic"])
    existing = covered_phrases()
    candidates = []
    for s, sc in sorted(score.items(), key=lambda x: -x[1]):
        if not topic.search(s) or NOISE.search(s):
            continue
        words = set(normalize(s).split())
        if is_covered(words, existing):
            continue
        candidates.append((s, sc, bool(QUESTION.search(s))))

    print(f"{len(seeds)} sökningar, {len(score)} förslag, {len(candidates)} obesvarade kandidater")
    print("Frågeformade först (poäng = hur högt och ofta förslaget visas):")
    for s, sc, isq in sorted(candidates, key=lambda x: (not x[2], -x[1]))[:limit]:
        print(f"  [{sc:>3}] {'?' if isq else ' '} {s}")


if __name__ == "__main__":
    main()
