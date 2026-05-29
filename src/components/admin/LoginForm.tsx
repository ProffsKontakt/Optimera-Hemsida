"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Loader2, Mail } from "lucide-react";

type Step = "request" | "verify";

export function LoginForm() {
  const [step, setStep] = useState<Step>("request");
  const [recipient, setRecipient] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onRequest(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/auth/request", { method: "POST" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Kunde inte skicka kod.");
        return;
      }
      setRecipient(data.recipient ?? null);
      setStep("verify");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Okänt fel.");
    } finally {
      setBusy(false);
    }
  }

  async function onVerify(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Kunde inte verifiera kod.");
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
      onSubmit={step === "request" ? onRequest : onVerify}
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

      {step === "request" ? (
        <>
          <p className="mt-3 text-[14px] text-ink/65 leading-relaxed">
            Tryck på knappen så skickas en 6-siffrig engångskod till
            info@optimeraenergi.se. Logga in i mejlen för att läsa koden,
            sen kommer du tillbaka hit och matar in den.
          </p>

          {error && (
            <div className="mt-4 rounded-2xl border border-copper/40 bg-copper/10 px-4 py-3 text-[13.5px] text-copper">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={busy}
            className="mt-6 btn-primary w-full justify-center disabled:opacity-50"
          >
            {busy ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                Skickar kod…
              </>
            ) : (
              <>
                <Mail size={16} /> Skicka engångskod
              </>
            )}
          </button>
        </>
      ) : (
        <>
          <p className="mt-3 text-[14px] text-ink/65 leading-relaxed">
            En 6-siffrig kod är skickad till{" "}
            <strong className="text-ink">
              {recipient ?? "info@optimeraenergi.se"}
            </strong>
            . Koden går ut om 10 minuter.
          </p>

          <label className="block mt-7">
            <span className="block text-[13px] text-ink/65 mb-2">
              Engångskod
            </span>
            <input
              type="text"
              inputMode="numeric"
              pattern="\d{6}"
              maxLength={6}
              autoComplete="one-time-code"
              value={code}
              onChange={(e) =>
                setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              required
              autoFocus
              placeholder="000000"
              className="w-full rounded-2xl border border-ink/15 bg-cream/50 px-4 py-3 text-[20px] font-mono tracking-[0.4em] text-center outline-none focus:border-ink/50 transition"
            />
          </label>

          {error && (
            <div className="mt-4 rounded-2xl border border-copper/40 bg-copper/10 px-4 py-3 text-[13.5px] text-copper">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={busy || code.length !== 6}
            className="mt-6 btn-primary w-full justify-center disabled:opacity-50"
          >
            {busy ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                Verifierar…
              </>
            ) : (
              <>
                Verifiera och logga in <ArrowRight size={16} />
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              setStep("request");
              setCode("");
              setError(null);
            }}
            className="mt-3 w-full text-center text-[12.5px] text-ink/55 hover:text-ink transition"
          >
            Skicka ny kod
          </button>
        </>
      )}
    </form>
  );
}
