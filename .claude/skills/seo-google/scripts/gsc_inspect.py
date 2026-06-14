#!/usr/bin/env python3
"""GSC URL Inspection API -- real indexation status.

Usage:
  gsc_inspect.py <url> [--property sc-domain:example.com] [--json]
  gsc_inspect.py --batch urls.txt [--property ...] [--json]
"""
import argparse
import json
import sys

from googleapiclient.discovery import build

from google_auth import get_credentials, load_config

SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]


def service():
    creds = get_credentials(scopes=SCOPES)
    return build("searchconsole", "v1", credentials=creds, cache_discovery=False)


def inspect(svc, url, prop):
    body = {"inspectionUrl": url, "siteUrl": prop, "languageCode": "sv"}
    resp = svc.urlInspection().index().inspect(body=body).execute()
    r = resp.get("inspectionResult", {})
    idx = r.get("indexStatusResult", {})
    return {
        "url": url,
        "verdict": idx.get("verdict"),
        "coverageState": idx.get("coverageState"),
        "robotsTxtState": idx.get("robotsTxtState"),
        "indexingState": idx.get("indexingState"),
        "pageFetchState": idx.get("pageFetchState"),
        "lastCrawlTime": idx.get("lastCrawlTime"),
        "googleCanonical": idx.get("googleCanonical"),
        "userCanonical": idx.get("userCanonical"),
        "crawledAs": idx.get("crawledAs"),
        "mobileUsability": r.get("mobileUsabilityResult", {}).get("verdict"),
        "richResults": r.get("richResultsResult", {}).get("verdict"),
    }


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("url", nargs="?")
    ap.add_argument("--batch")
    ap.add_argument("--property")
    ap.add_argument("--json", action="store_true")
    args = ap.parse_args()

    prop = args.property or load_config().get("default_property")
    if not prop:
        print(json.dumps({"error": "no property specified or configured"}))
        sys.exit(1)

    svc = service()
    try:
        if args.batch:
            with open(args.batch) as fh:
                urls = [ln.strip() for ln in fh if ln.strip()]
            results = []
            for u in urls:
                try:
                    results.append(inspect(svc, u, prop))
                except Exception as e:  # noqa
                    results.append({"url": u, "error": str(e)})
            print(json.dumps({"property": prop, "results": results}, indent=2))
        elif args.url:
            print(json.dumps(inspect(svc, args.url, prop), indent=2))
        else:
            print(json.dumps({"error": "provide <url> or --batch <file>"}))
            sys.exit(1)
    except Exception as e:  # noqa
        print(json.dumps({"error": str(e), "type": type(e).__name__}))
        sys.exit(1)


if __name__ == "__main__":
    main()
