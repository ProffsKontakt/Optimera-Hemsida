#!/usr/bin/env python3
"""PageSpeed Insights v5 (Lighthouse lab) + CrUX field data.

Usage:
  pagespeed_check.py <url> [--crux-only] [--strategy mobile|desktop|both] --json
"""
import argparse
import json
import sys

import requests

from google_auth import load_config

PSI_URL = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed"
CRUX_URL = "https://chromeuxreport.googleapis.com/v1/records:queryRecord"

CWV_KEYS = {
    "largest_contentful_paint": "LCP",
    "interaction_to_next_paint": "INP",
    "cumulative_layout_shift": "CLS",
    "first_contentful_paint": "FCP",
    "experimental_time_to_first_byte": "TTFB",
}


def rate(metric, p75):
    t = {
        "LCP": (2500, 4000),
        "INP": (200, 500),
        "CLS": (0.1, 0.25),
        "FCP": (1800, 3000),
        "TTFB": (800, 1800),
    }.get(metric)
    if not t or p75 is None:
        return "n/a"
    good, poor = t
    if p75 <= good:
        return "Good"
    if p75 <= poor:
        return "Needs Improvement"
    return "Poor"


def fetch_crux(api_key, url):
    out = {}
    for form_factor in ("PHONE", "DESKTOP"):
        for key in ("url", "origin"):
            payload = {"formFactor": form_factor}
            payload[key] = url
            r = requests.post(
                CRUX_URL, params={"key": api_key}, json=payload, timeout=30
            )
            if r.status_code == 200:
                rec = r.json().get("record", {})
                metrics = {}
                for mk, label in CWV_KEYS.items():
                    m = rec.get("metrics", {}).get(mk)
                    if not m:
                        continue
                    p75 = m.get("percentiles", {}).get("p75")
                    try:
                        p75v = float(p75)
                    except (TypeError, ValueError):
                        p75v = None
                    metrics[label] = {
                        "p75": p75v,
                        "rating": rate(label, p75v),
                    }
                out[form_factor.lower()] = {
                    "scope": key,
                    "collectionPeriod": rec.get("collectionPeriod"),
                    "metrics": metrics,
                }
                break  # got url-level or origin-level; stop trying scopes
            elif r.status_code == 404:
                continue
            else:
                out.setdefault("errors", []).append(
                    {"formFactor": form_factor, "status": r.status_code, "body": r.text[:300]}
                )
                break
    return out


def fetch_psi(api_key, url, strategy):
    params = {
        "url": url,
        "strategy": strategy,
        "key": api_key,
        "category": ["performance", "accessibility", "best-practices", "seo"],
    }
    r = requests.get(PSI_URL, params=params, timeout=120)
    if r.status_code != 200:
        return {"error": r.status_code, "body": r.text[:400]}
    data = r.json()
    cats = data.get("lighthouseResult", {}).get("categories", {})
    audits = data.get("lighthouseResult", {}).get("audits", {})
    def score(c):
        s = cats.get(c, {}).get("score")
        return round(s * 100) if isinstance(s, (int, float)) else None
    def metric(a):
        return audits.get(a, {}).get("displayValue")
    return {
        "scores": {
            "performance": score("performance"),
            "accessibility": score("accessibility"),
            "best_practices": score("best-practices"),
            "seo": score("seo"),
        },
        "lab_metrics": {
            "FCP": metric("first-contentful-paint"),
            "LCP": metric("largest-contentful-paint"),
            "TBT": metric("total-blocking-time"),
            "CLS": metric("cumulative-layout-shift"),
            "Speed Index": metric("speed-index"),
        },
    }


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("url")
    ap.add_argument("--crux-only", action="store_true")
    ap.add_argument("--strategy", default="both", choices=["mobile", "desktop", "both"])
    ap.add_argument("--json", action="store_true")
    args = ap.parse_args()

    cfg = load_config()
    api_key = cfg.get("api_key")
    if not api_key:
        print(json.dumps({"error": "no api_key configured"}))
        sys.exit(1)

    result = {"url": args.url, "crux": fetch_crux(api_key, args.url)}
    if not args.crux_only:
        strategies = ["mobile", "desktop"] if args.strategy == "both" else [args.strategy]
        result["lighthouse"] = {s: fetch_psi(api_key, args.url, s) for s in strategies}

    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()
