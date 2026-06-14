#!/usr/bin/env python3
"""GA4 Data API -- organic traffic + top organic landing pages.

Usage:
  ga4_report.py [--property properties/123] [--days 28] [--report traffic|top-pages] --json
"""
import argparse
import json
import sys

from googleapiclient.discovery import build

from google_auth import get_credentials, load_config

SCOPES = ["https://www.googleapis.com/auth/analytics.readonly"]


def service():
    creds = get_credentials(scopes=SCOPES)
    return build("analyticsdata", "v1beta", credentials=creds, cache_discovery=False)


def run_report(svc, prop, body):
    return svc.properties().runReport(property=prop, body=body).execute()


def organic_filter():
    return {
        "filter": {
            "fieldName": "sessionDefaultChannelGroup",
            "stringFilter": {"matchType": "EXACT", "value": "Organic Search"},
        }
    }


def traffic(svc, prop, days):
    body = {
        "dateRanges": [{"startDate": f"{days}daysAgo", "endDate": "today"}],
        "dimensions": [{"name": "date"}],
        "metrics": [
            {"name": "sessions"},
            {"name": "totalUsers"},
            {"name": "screenPageViews"},
            {"name": "bounceRate"},
            {"name": "averageSessionDuration"},
        ],
        "dimensionFilter": organic_filter(),
        "orderBys": [{"dimension": {"dimensionName": "date"}}],
    }
    resp = run_report(svc, prop, body)
    rows = []
    tot_sessions = tot_users = tot_views = 0
    for r in resp.get("rows", []):
        d = r["dimensionValues"][0]["value"]
        m = [mv["value"] for mv in r["metricValues"]]
        sess = int(float(m[0])); users = int(float(m[1])); views = int(float(m[2]))
        tot_sessions += sess; tot_users += users; tot_views += views
        rows.append({
            "date": d, "sessions": sess, "users": users, "pageviews": views,
            "bounceRate": round(float(m[3]) * 100, 1),
            "avgSessionDuration": round(float(m[4]), 1),
        })
    return {
        "property": prop, "channel": "Organic Search", "days": days,
        "totals": {"sessions": tot_sessions, "users": tot_users, "pageviews": tot_views},
        "daily": rows,
    }


def top_pages(svc, prop, days):
    body = {
        "dateRanges": [{"startDate": f"{days}daysAgo", "endDate": "today"}],
        "dimensions": [{"name": "landingPagePlusQueryString"}],
        "metrics": [
            {"name": "sessions"},
            {"name": "totalUsers"},
            {"name": "screenPageViews"},
            {"name": "bounceRate"},
        ],
        "dimensionFilter": organic_filter(),
        "orderBys": [{"metric": {"metricName": "sessions"}, "desc": True}],
        "limit": 50,
    }
    resp = run_report(svc, prop, body)
    rows = []
    for r in resp.get("rows", []):
        m = [mv["value"] for mv in r["metricValues"]]
        rows.append({
            "landing_page": r["dimensionValues"][0]["value"],
            "sessions": int(float(m[0])), "users": int(float(m[1])),
            "pageviews": int(float(m[2])), "bounceRate": round(float(m[3]) * 100, 1),
        })
    return {"property": prop, "days": days, "top_organic_pages": rows}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--property")
    ap.add_argument("--days", type=int, default=28)
    ap.add_argument("--report", default="traffic", choices=["traffic", "top-pages"])
    ap.add_argument("--json", action="store_true")
    args = ap.parse_args()

    prop = args.property or load_config().get("ga4_property_id")
    if not prop:
        print(json.dumps({"error": "no ga4 property specified or configured"}))
        sys.exit(1)
    if not prop.startswith("properties/"):
        prop = f"properties/{prop}"

    svc = service()
    try:
        if args.report == "top-pages":
            print(json.dumps(top_pages(svc, prop, args.days), indent=2))
        else:
            print(json.dumps(traffic(svc, prop, args.days), indent=2))
    except Exception as e:  # noqa
        print(json.dumps({"error": str(e), "type": type(e).__name__}))
        sys.exit(1)


if __name__ == "__main__":
    main()
