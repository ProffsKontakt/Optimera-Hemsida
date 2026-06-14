#!/usr/bin/env python3
"""Shared credential loading + tier detection for the seo-google skill.

Reads ~/.config/claude-seo/google-api.json (or env var overrides) and exposes
helpers the other scripts use. Run directly with --check to print the detected
credential tier.
"""
import json
import os
import sys

CONFIG_PATH = os.path.expanduser("~/.config/claude-seo/google-api.json")

SCOPES = [
    "https://www.googleapis.com/auth/webmasters",
    "https://www.googleapis.com/auth/indexing",
    "https://www.googleapis.com/auth/analytics.readonly",
]


def _expand(p):
    return os.path.expanduser(p) if p else p


def load_config():
    cfg = {}
    if os.path.exists(CONFIG_PATH):
        with open(CONFIG_PATH) as fh:
            cfg = json.load(fh)
    # Environment overrides
    cfg["api_key"] = os.environ.get("GOOGLE_API_KEY", cfg.get("api_key"))
    cfg["service_account_path"] = _expand(
        os.environ.get("GOOGLE_APPLICATION_CREDENTIALS")
        or cfg.get("service_account_path")
    )
    cfg["default_property"] = os.environ.get(
        "GSC_PROPERTY", cfg.get("default_property")
    )
    cfg["ga4_property_id"] = os.environ.get(
        "GA4_PROPERTY_ID", cfg.get("ga4_property_id")
    )
    return cfg


def get_credentials(scopes=None):
    """Return google service-account Credentials, or raise."""
    from google.oauth2 import service_account

    cfg = load_config()
    sa = cfg.get("service_account_path")
    if not sa or not os.path.exists(sa):
        raise RuntimeError("service_account_path missing or file not found")
    return service_account.Credentials.from_service_account_file(
        sa, scopes=scopes or SCOPES
    )


def service_account_email():
    cfg = load_config()
    sa = cfg.get("service_account_path")
    if sa and os.path.exists(sa):
        with open(sa) as fh:
            return json.load(fh).get("client_email")
    return None


def detect_tier(cfg):
    tier = -1
    if cfg.get("api_key"):
        tier = 0
    sa = cfg.get("service_account_path")
    if sa and os.path.exists(sa):
        tier = max(tier, 1)
        if cfg.get("ga4_property_id"):
            tier = 2
    return tier


def main():
    want_json = "--json" in sys.argv
    cfg = load_config()
    tier = detect_tier(cfg)
    sa_email = service_account_email()
    result = {
        "config_path": CONFIG_PATH,
        "config_exists": os.path.exists(CONFIG_PATH),
        "tier": tier,
        "api_key_present": bool(cfg.get("api_key")),
        "service_account_path": cfg.get("service_account_path"),
        "service_account_email": sa_email,
        "default_property": cfg.get("default_property"),
        "ga4_property_id": cfg.get("ga4_property_id"),
    }
    if want_json:
        print(json.dumps(result, indent=2))
        return
    names = {
        -1: "None (no credentials)",
        0: "0 -- API Key",
        1: "1 -- API Key + Service Account",
        2: "2 -- Full (API key + Service Account + GA4)",
    }
    print(f"Credential Tier: {names.get(tier, tier)}")
    print(f"  config: {CONFIG_PATH} ({'found' if result['config_exists'] else 'MISSING'})")
    print(f"  [{'OK' if cfg.get('api_key') else '--'}] API key (PSI / CrUX / KG)")
    print(f"  [{'OK' if tier >= 1 else '--'}] Service account (GSC / Indexing / GA4)")
    if sa_email:
        print(f"       {sa_email}")
    print(f"  [{'OK' if tier >= 2 else '--'}] GA4 property: {cfg.get('ga4_property_id') or '(not set)'}")
    print(f"  GSC property: {cfg.get('default_property') or '(not set)'}")


if __name__ == "__main__":
    main()
