"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Loader2 } from "lucide-react";

export function LoginForm() {
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Kunde inte logga in.");
        return;
      }
      window.location.href = "/admin";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Okänt fel.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-md rounded-3xl border border-ink/10 bg-bone p-10 shadow-sm"
    >
      <Image
        src="/logo.svg"
        alt="Optimera Energi"
        width={166}
        height={57}
        className="h-9 w-auto mb-8"
      />
      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55">
        Internt
      </div>
      <h1 className="mt-3 font-display text-3xl tracking-display-tight">
        Admin-inloggning
      </h1>
      <p className="mt-3 text-[14px] text-ink/65 leading-relaxed">
        Endast för team Optimera Energi. Använd det delade lösenordet ni
        kommit överens om.
      </p>

      <label className="block mt-7">
        <span className="block text-[13px] text-ink/65 mb-2">Lösenord</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoFocus
          className="w-full rounded-2xl border border-ink/15 bg-cream/50 px-4 py-3 text-[15px] outline-none focus:border-ink/50 transition"
        />
      </label>

      {error && (
        <div className="mt-4 rounded-2xl border border-copper/40 bg-copper/10 px-4 py-3 text-[13.5px] text-copper">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={busy || !password}
        className="mt-6 btn-primary w-full justify-center disabled:opacity-50"
      >
        {busy ? (
          <>
            <Loader2 className="animate-spin" size={16} />
            Loggar in…
          </>
        ) : (
          <>
            Logga in <ArrowRight size={16} />
          </>
        )}
      </button>
    </form>
  );
}
