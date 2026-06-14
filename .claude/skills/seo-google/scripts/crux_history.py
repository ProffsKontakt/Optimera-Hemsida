#!/usr/bin/env python3
"""CrUX History API -- up to 25 weeks of p75 CWV trend data.

Usage: crux_history.py <url> [--form-factor PHONE|DESKTOP] --json
"""
import argparse
import json
import sys

import requests

from google_auth import load_config

URL = "https://chromeuxreport.googleapis.com/v1/records:queryHistoryRecord"

KEYS = {
    "largest_contentful_paint": "LCP",
    "interaction_to_next_paint": "INP",
    "cumulative_layout_shift": "CLS",
    "first_contentful_paint": "FCP",
    "experimental_time_to_first_byte": "TTFB",
}


def trend(series):
    vals = [v for v in series if v is not None]
    if len(vals) < 2:
        return {"direction": "n/a", "pct_change": None}
    first, last = vals[0], vals[-1]
    if first == 0:
        return {"direction": "n/a", "pct_change": None}
    pct = (last - first) / first * 100
    # lower is better for all CWV metrics
    direction = "improving" if last < first else "degrading" if last > first else "stable"
    return {"direction": direction, "pct_change": round(pct, 1), "first": first, "last": last}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("url")
    ap.add_argument("--form-factor", default="PHONE")
    ap.add_argument("--json", action="store_true")
    args = ap.parse_args()

    cfg = load_config()
    api_key = cfg.get("api_key")
    if not api_key:
        print(json.dumps({"error": "no api_key configured"}))
        sys.exit(1)

    out = {}
    for scope_key in ("url", "origin"):
        payload = {"formFactor": args.form_factor, scope_key: args.url}
        r = requests.post(URL, params={"key": api_key}, json=payload, timeout=30)
        if r.status_code == 200:
            rec = r.json().get("record", {})
            metrics = rec.get("metrics", {})
            result = {"scope": scope_key, "form_factor": args.form_factor, "metrics": {}}
            for mk, label in KEYS.items():
                m = metrics.get(mk)
                if not m:
                    continue
                series = []
                for p in m.get("percentilesTimeseries", {}).get("p75s", []):
                    try:
                        series.append(float(p))
                    except (TypeError, ValueError):
                        series.append(None)
                result["metrics"][label] = {
                    "weekly_p75": series,
                    "trend": trend(series),
                }
            print(json.dumps(result, indent=2))
            return
        elif r.status_code == 404:
            continue
        else:
            print(json.dumps({"error": r.status_code, "body": r.text[:300]}))
            return
    print(json.dumps({"error": "no CrUX history (insufficient traffic)", "url": args.url}))


if __name__ == "__main__":
    main()
