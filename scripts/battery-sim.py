"""
Simulerar ett års elkostnad för en villa med och utan solceller/batteri,
kvart för kvart, med verkliga spotpriser per elområde (elprisetjustnu.se,
27 okt 2025 – 26 okt 2026) och 2026 års regler.

Batteriet styrs optimalt med kännedom om priserna (dynamisk programmering
över hela året) – det motsvarar en bra prisstyrning med prognos och är en
övre gräns. Kalkylatorn räknar därför med ett intervall nedåt.

Utdata: src/lib/battery-sim-data.ts med årlig elkostnad för varje
kombination av elområde, årsförbrukning, solcellseffekt (kWp) och
batteristorlek (kWh).

  python3 scripts/battery-sim.py [prisdir] [utfil.ts]

Priserna hämtas från elprisetjustnu.se till prisdir (standard
.cache/elpriser) om de saknas. Kräver numpy.
"""
import json, os, sys, glob, math, datetime
import numpy as np
from multiprocessing import Pool

PRICES = sys.argv[1] if len(sys.argv) > 1 else ".cache/elpriser"
OUT = sys.argv[2] if len(sys.argv) > 2 else "src/lib/battery-sim-data.ts"
PERIOD = (datetime.date(2025, 10, 27), datetime.date(2026, 10, 26))

# --- Antaganden (2026) ---------------------------------------------------
ENERGY_TAX = 0.360      # kr/kWh exkl. moms, 2026
TRANSFER = 0.208        # kr/kWh exkl. moms, Ellevios överföringsavgift (används i alla elområden)
MARKUP = 0.05           # kr/kWh exkl. moms, elhandlarens påslag
VAT = 1.25
NATNYTTA = 0.04         # kr/kWh, ersättning från nätbolaget för såld el
LOADS = [7500, 15000, 22500, 30000]  # kWh/år som simuleras
ETA = 0.95              # verkningsgrad per riktning (≈ 90 % tur och retur)
LEVELS = 40             # batteriets laddnivåer i DP:n

# Månadsfördelning av förbrukning (villa med värmepump) och solproduktion
# (kWh per kWp, söderläge Stockholm, ≈ 930 kWh/kWp och år).
LOAD_MONTH = [12, 11, 10, 8, 6, 4.5, 4.5, 5, 6, 8, 10, 12]
SOLAR_MONTH = [15, 35, 75, 110, 135, 140, 140, 115, 85, 50, 20, 10]
DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
# Förbrukning över dygnet (timme 0–23)
LOAD_HOUR = [0.7, 0.65, 0.6, 0.6, 0.65, 0.8, 1.2, 1.5, 1.3, 1.0, 0.9, 0.9,
             0.95, 0.9, 0.9, 1.0, 1.2, 1.5, 1.7, 1.6, 1.4, 1.2, 1.0, 0.8]


def load_zone(zone):
    files = sorted(glob.glob(os.path.join(PRICES, zone.lower(), "*.json")))
    times, price = [], []
    for f in files:
        for q in json.load(open(f)):
            t = datetime.datetime.fromisoformat(q["time_start"])
            times.append(t)
            price.append(q["SEK_per_kWh"])
    return times, np.array(price)


def fetch_prices():
    import urllib.request
    days = [PERIOD[0] + datetime.timedelta(d) for d in range((PERIOD[1] - PERIOD[0]).days + 1)]
    for zone in ["SE1", "SE2", "SE3", "SE4"]:
        os.makedirs(os.path.join(PRICES, zone.lower()), exist_ok=True)
        for d in days:
            f = os.path.join(PRICES, zone.lower(), f"{d.isoformat()}.json")
            if os.path.exists(f) and os.path.getsize(f) > 100:
                continue
            url = f"https://www.elprisetjustnu.se/api/v1/prices/{d.year}/{d.month:02d}-{d.day:02d}_{zone}.json"
            data = urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": "optimera-kalkyl"}), timeout=30).read()
            open(f, "wb").write(data)


def profiles(times, annual_load):
    rng = np.random.default_rng(42)
    n = len(times)
    load = np.zeros(n)
    solar = np.zeros(n)  # per kWp
    by_day = {}
    for i, t in enumerate(times):
        by_day.setdefault(t.date(), []).append(i)
    lh = np.array(LOAD_HOUR) / np.mean(LOAD_HOUR)
    for day, idx in by_day.items():
        m = day.month - 1
        day_load = annual_load * LOAD_MONTH[m] / sum(LOAD_MONTH) / DAYS_IN_MONTH[m]
        w = np.array([lh[times[i].hour] for i in idx])
        load[idx] = day_load * w / w.sum()
        # Sol: dagslängd vid 59,3° N, sinusform kring soltid 12 (13 sommartid).
        doy = day.timetuple().tm_yday
        decl = math.radians(23.44) * math.sin(2 * math.pi * (284 + doy) / 365)
        lat = math.radians(59.3)
        ha = math.acos(max(-1, min(1, -math.tan(lat) * math.tan(decl))))
        half = math.degrees(ha) / 15  # timmar från solmitt till solnedgång
        noon = 12 + (times[idx[0]].utcoffset().total_seconds() / 3600 - 1)
        weather = min(1.6, rng.beta(2.2, 1.4) / (2.2 / 3.6))  # medel 1
        day_solar = SOLAR_MONTH[m] / DAYS_IN_MONTH[m] * weather
        hours = np.array([times[i].hour + times[i].minute / 60 + 0.125 for i in idx])
        x = (hours - noon) / half
        shape = np.where(np.abs(x) < 1, np.clip(np.cos(x * math.pi / 2), 0, None) ** 1.6, 0)
        if shape.sum() > 0:
            solar[idx] = day_solar * shape / shape.sum()
    return load, solar


def cost_no_battery(net, buy, sell):
    return float(np.where(net > 0, net * buy, net * sell).sum())


def cost_with_battery(net, buy, sell, cap, power):
    """Minsta årskostnad med optimal styrning (DP baklänges)."""
    step = cap / LEVELS
    lv = np.arange(LEVELS + 1)
    d = lv[None, :] - lv[:, None]  # (i -> j) i nivåsteg
    stored = d * step
    ac = np.where(stored > 0, stored / ETA, stored * ETA)  # + laddning, − urladdning (AC-sidan)
    allowed = np.abs(ac) <= power / 4 + 1e-9
    V = np.zeros(LEVELS + 1)
    T = len(net)
    for t in range(T - 1, -1, -1):
        grid = net[t] + ac
        c = np.where(grid > 0, grid * buy[t], grid * sell[t])
        c = np.where(allowed, c, np.inf)
        V = (c + V[None, :]).min(axis=1)
    return float(V[0])


def run(job):
    zone, annual, kwp, kwh = job
    times, spot = load_zone(zone)
    load, solar1 = profiles(times, annual)
    net = load - solar1 * kwp
    buy = (spot + MARKUP + ENERGY_TAX + TRANSFER) * VAT
    sell = spot + NATNYTTA
    if kwh == 0:
        cost = cost_no_battery(net, buy, sell)
    else:
        power = min(0.5 * kwh, 10 if kwh <= 23.04 else 15)
        cost = cost_with_battery(net, buy, sell, kwh, power)
    return {"zone": zone, "load_kwh": annual, "kwp": kwp, "kwh": kwh, "cost": round(cost),
            "load": round(float(load.sum())), "solar": round(float((solar1 * kwp).sum()))}


def write_ts(res, kwps, kwhs):
    zones = ["SE1", "SE2", "SE3", "SE4"]
    c = {(x["zone"], x["load_kwh"], x["kwp"], x["kwh"]): x["cost"] for x in res}
    out = ["""// GENERERAD FIL – skapad av scripts/battery-sim.py. Ändra inte för hand;
// kör om simuleringen när priserna eller antagandena ändras.
//
// Årlig elkostnad (kr inkl. moms, energiskatt och nätavgift) för en villa,
// simulerad kvart för kvart med verkliga spotpriser och 2026 års regler,
// för varje elområde, årsförbrukning, solcellseffekt (kWp) och batteri-
// storlek (kWh). Batteriet styrs optimalt mot priserna (prisstyrning och
// egenanvändning av solel), utan stödtjänster.
"""]
    out.append(f"export const SIM_LOAD = {json.dumps(LOADS)} as const;")
    out.append(f"export const SIM_KWP = {json.dumps(kwps)} as const;")
    out.append(f"export const SIM_KWH = {json.dumps(kwhs)} as const;")
    out.append(f'export const SIM_PERIOD = {{ from: "{PERIOD[0]}", to: "{PERIOD[1]}" }} as const;')
    out.append("/** SIM_COST[elområde][förbrukning-index][kWp-index][kWh-index] = årlig elkostnad i kr. */")
    out.append("export const SIM_COST: Record<1 | 2 | 3 | 4, number[][][]> = {")
    for zi, z in enumerate(zones, start=1):
        out.append(f"  {zi}: [")
        for l in LOADS:
            rows = ", ".join(json.dumps([c[(z, l, p, b)] for b in kwhs]) for p in kwps)
            out.append(f"    [{rows}],")
        out.append("  ],")
    out.append("};")
    open(OUT, "w", encoding="utf-8").write("\n".join(out) + "\n")


if __name__ == "__main__":
    fetch_prices()
    zones = ["SE1", "SE2", "SE3", "SE4"]
    kwps = [0, 5, 8, 10, 12, 15, 20]
    kwhs = [0, 5, 10, 15, 20, 30, 40, 60]
    jobs = [(z, l, p, b) for z in zones for l in LOADS for p in kwps for b in kwhs]
    with Pool(os.cpu_count() or 4) as pool:
        res = pool.map(run, jobs)
    write_ts(res, kwps, kwhs)
    print(f"{len(res)} simuleringar -> {OUT}")
