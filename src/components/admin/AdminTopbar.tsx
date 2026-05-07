"use client";

import Link from "next/link";

export function AdminTopbar() {
  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    window.location.href = "/admin/login";
  }
  return (
    <div className="border-b border-ink/10 bg-bone/85 backdrop-blur-md sticky top-0 z-40">
      <div className="container-edge h-14 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <Link
            href="/admin"
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/65 hover:text-ink"
          >
            Admin
          </Link>
          <span className="text-ink/20">·</span>
          <Link
            href="/admin/ideer"
            className="text-[13.5px] text-ink/75 hover:text-ink"
          >
            Idé-hörnan
          </Link>
          <Link href="/" className="text-[13.5px] text-ink/55 hover:text-ink">
            ↗ Hemsidan
          </Link>
        </div>
        <button
          onClick={logout}
          className="text-[12px] font-mono uppercase tracking-[0.18em] text-ink/55 hover:text-ink"
        >
          Logga ut
        </button>
      </div>
    </div>
  );
}
