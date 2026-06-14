#!/usr/bin/env python3
"""Google Search Console: Search Analytics + sitemap status.

Usage:
  gsc_query.py --property sc-domain:example.com [--days 28] [--json]
  gsc_query.py sitemaps --property sc-domain:example.com [--json]
"""
import argparse
import datetime as dt
import json
import sys

from googleapiclient.discovery import build

from google_auth import get_credentials, load_config

GSC_SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]


def service():
    creds = get_credentials(scopes=GSC_SCOPES)
    return build("searchconsole", "v1", credentials=creds, cache_discovery=False)


def search_analytics(prop, days):
    svc = service()
    end = dt.date.today() - dt.timedelta(days=2)  # 2-3 day data lag
    start = end - dt.timedelta(days=days)
    body = {
        "startDate": start.isoformat(),
        "endDate": end.isoformat(),
        "dimensions": ["query"],
        "rowLimit": 1000,
        "type": "web",
    }
    resp = svc.searchanalytics().query(siteUrl=prop, body=body).execute()
    rows = resp.get("rows", [])
    queries = [
        {
            "query": r["keys"][0],
            "clicks": r.get("clicks", 0),
            "impressions": r.get("impressions", 0),
            "ctr": round(r.get("ctr", 0) * 100, 2),
            "position": round(r.get("position", 0), 1),
        }
        for r in rows
    ]
    # totals
    tot_body = dict(body)
    tot_body["dimensions"] = []
    tot = svc.searchanalytics().query(siteUrl=prop, body=tot_body).execute()
    totals = tot.get("rows", [{}])
    totrow = totals[0] if totals else {}
    # page dimension
    page_body = dict(body)
    page_body["dimensions"] = ["page"]
    pages_resp = svc.searchanalytics().query(siteUrl=prop, body=page_body).execute()
    pages = [
        {
            "page": r["keys"][0],
            "clicks": r.get("clicks", 0),
            "impressions": r.get("impressions", 0),
            "ctr": round(r.get("ctr", 0) * 100, 2),
            "position": round(r.get("position", 0), 1),
        }
        for r in pages_resp.get("rows", [])
    ]
    quick_wins = [
        q for q in queries if 4 <= q["position"] <= 10 and q["impressions"] >= 20
    ]
    quick_wins.sort(key=lambda q: q["impressions"], reverse=True)
    return {
        "property": prop,
        "date_range": {"start": start.isoformat(), "end": end.isoformat(), "days": days},
        "totals": {
            "clicks": totrow.get("clicks", 0),
            "impressions": totrow.get("impressions", 0),
            "ctr": round(totrow.get("ctr", 0) * 100, 2),
            "position": round(totrow.get("position", 0), 1),
        },
        "top_queries": queries[:50],
        "top_pages": pages[:50],
        "quick_wins": quick_wins[:25],
        "query_count": len(queries),
    }


def sitemaps(prop):
    svc = service()
    resp = svc.sitemaps().list(siteUrl=prop).execute()
    out = []
    for s in resp.get("sitemap", []):
        out.append({
            "path": s.get("path"),
            "lastSubmitted": s.get("lastSubmitted"),
            "lastDownloaded": s.get("lastDownloaded"),
            "isPending": s.get("isPending"),
            "errors": s.get("errors"),
            "warnings": s.get("warnings"),
            "contents": s.get("contents"),
        })
    return {"property": prop, "sitemaps": out}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("mode", nargs="?", default="analytics", choices=["analytics", "sitemaps"])
    ap.add_argument("--property")
    ap.add_argument("--days", type=int, default=28)
    ap.add_argument("--json", action="store_true")
    args = ap.parse_args()

    prop = args.property or load_config().get("default_property")
    if not prop:
        print(json.dumps({"error": "no property specified or configured"}))
        sys.exit(1)

    try:
        if args.mode == "sitemaps":
            print(json.dumps(sitemaps(prop), indent=2))
        else:
            print(json.dumps(search_analytics(prop, args.days), indent=2))
    except Exception as e:  # noqa
        print(json.dumps({"error": str(e), "type": type(e).__name__}))
        sys.exit(1)


if __name__ == "__main__":
    main()
