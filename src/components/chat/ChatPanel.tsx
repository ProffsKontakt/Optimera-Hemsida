"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUp, Phone, X } from "lucide-react";
import { CHAT_MAX_HISTORY, CHAT_MAX_MESSAGE_CHARS } from "@/lib/chat-config";
import { trackEvent } from "@/lib/analytics";
import { collectAttribution } from "@/lib/attribution";

type Msg = { role: "user" | "assistant"; content: string };

const STORAGE_KEY = "oe_chat_v1";
const GREETING =
  "Hej! Jag är Optimera Energis AI-assistent. Jag svarar utifrån det som står på sajten, till exempel om priser, batterier, grönt avdrag och hur ett hembesök går till. Vad undrar du?";
const SUGGESTIONS = [
  "Vad kostar solceller till en villa?",
  "Lönar sig ett batteri om jag redan har solceller?",
  "Hur går ett hembesök till?",
];
const GENERIC_ERROR = "Något gick fel. Försök igen, eller ring oss på 076 305 37 32.";

/** Svarstexten med interna markdown-länkar som riktiga länkar. Ingen HTML tolkas. */
function RichText({ text, onNavigate }: { text: string; onNavigate: () => void }) {
  const parts: React.ReactNode[] = [];
  const clean = text.replace(/\*\*/g, "");
  const re = /\[([^\]\n]{1,80})\]\((\/[^)\s]*)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(clean))) {
    if (m.index > last) parts.push(clean.slice(last, m.index));
    parts.push(
      <Link
        key={`${m.index}-${m[2]}`}
        href={m[2]}
        onClick={onNavigate}
        className="font-medium text-indigo underline decoration-indigo/30 underline-offset-2 hover:decoration-indigo"
      >
        {m[1]}
      </Link>,
    );
    last = m.index + m[0].length;
  }
  if (last < clean.length) parts.push(clean.slice(last));
  return <>{parts}</>;
}

export default function ChatPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  // Samtalet sparas i flikens sessionStorage så att det följer med mellan
  // sidor. Det lämnar aldrig webbläsaren förrän besökaren skickar en fråga.
  // (Panelen renderas bara i webbläsaren, så lagringen går att läsa direkt.)
  const [messages, setMessages] = useState<Msg[]>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      const parsed: unknown = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed)
        ? parsed.filter(
            (m): m is Msg =>
              !!m &&
              (m.role === "user" || m.role === "assistant") &&
              typeof m.content === "string" &&
              m.content.length > 0,
          )
        : [];
    } catch {
      return [];
    }
  });
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<"chat" | "callback" | "sent">("chat");
  const [cbBusy, setCbBusy] = useState(false);
  const [cbError, setCbError] = useState<string | null>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    // Spara inte medan ett svar strömmas in (då finns ett tomt eller halvt svar).
    if (busy) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-CHAT_MAX_HISTORY)));
    } catch {
      // ignorera
    }
  }, [messages, busy]);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight });
  }, [messages, view, open]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const send = useCallback(
    async (text: string) => {
      const question = text.trim();
      if (!question || busy) return;
      setError(null);
      setInput("");
      const history: Msg[] = [...messages, { role: "user", content: question }];
      setMessages([...history, { role: "assistant", content: "" }]);
      setBusy(true);
      trackEvent("chat_message");
      const controller = new AbortController();
      abortRef.current = controller;
      try {
        const res = await fetch("/api/chatt", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history.slice(-CHAT_MAX_HISTORY) }),
          signal: controller.signal,
        });
        if (!res.ok || !res.body) {
          const data = (await res.json().catch(() => null)) as { message?: string } | null;
          throw new Error(data?.message || GENERIC_ERROR);
        }
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let answer = "";
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          answer += decoder.decode(value, { stream: true });
          setMessages([...history, { role: "assistant", content: answer }]);
        }
        answer += decoder.decode();
        setMessages([...history, { role: "assistant", content: answer.trim() || GENERIC_ERROR }]);
      } catch (err) {
        // Ta bort det tomma svaret och låt frågan ligga kvar i fältet.
        setMessages(messages);
        setInput(question);
        if (!(err instanceof DOMException && err.name === "AbortError")) {
          setError(err instanceof Error && err.message ? err.message : GENERIC_ERROR);
        }
      } finally {
        setBusy(false);
        abortRef.current = null;
      }
    },
    [busy, messages],
  );

  async function submitCallback(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (cbBusy) return;
    setCbBusy(true);
    setCbError(null);
    const fd = new FormData(e.currentTarget);
    const asked = messages
      .filter((m) => m.role === "user")
      .slice(-3)
      .map((m) => m.content)
      .join(" | ");
    try {
      const res = await fetch("/api/offert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          namn: String(fd.get("namn") ?? ""),
          telefon: String(fd.get("telefon") ?? ""),
          epost: String(fd.get("epost") ?? ""),
          contactMethod: "telefon",
          services: [],
          meddelande: `Vill bli uppringd. Skickat från AI-chatten på sajten.${asked ? ` Senaste frågor: ${asked}` : ""}`.slice(0, 1500),
          config: { källa: "ai-chatt" },
          attribution: collectAttribution(),
        }),
      });
      if (!res.ok) throw new Error("fel");
      trackEvent("generate_lead", { method: "chat_callback", services: "", currency: "SEK" });
      setView("sent");
    } catch {
      setCbError("Det gick inte att skicka. Kontrollera uppgifterna, eller ring oss på 076 305 37 32.");
    } finally {
      setCbBusy(false);
    }
  }

  if (!open) return null;

  const field =
    "w-full rounded-xl border border-ink/15 bg-white px-3 py-2.5 text-[14px] text-ink placeholder:text-ink/40 focus:border-indigo focus:outline-none";

  return (
    <div
      role="dialog"
      aria-label="Chatt med Optimera Energis AI-assistent"
      className="fixed inset-x-2 bottom-2 z-50 flex max-h-[82dvh] flex-col overflow-hidden rounded-3xl border border-ink/10 bg-bone shadow-2xl shadow-ink/25 md:inset-x-auto md:right-5 md:bottom-5 md:w-[392px] md:max-h-[min(640px,80dvh)]"
    >
      <header className="flex items-center justify-between gap-3 border-b border-ink/10 bg-cream/60 px-4 py-3">
        <div>
          <div className="font-display text-[17px] leading-tight tracking-display-tight">Fråga Optimera</div>
          <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/55">
            AI-assistent · svarar utifrån sajten
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            abortRef.current?.abort();
            onClose();
          }}
          aria-label="Stäng chatten"
          className="grid h-9 w-9 place-items-center rounded-full text-ink/60 transition hover:bg-ink/5 hover:text-ink"
        >
          <X size={18} aria-hidden="true" />
        </button>
      </header>

      <div ref={scroller} className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
        <div className="max-w-[88%] rounded-2xl rounded-tl-md bg-cream px-3.5 py-2.5 text-[14px] leading-relaxed text-ink/85">
          {GREETING}
        </div>

        {messages.length === 0 && (
          <div className="flex flex-col items-start gap-2 pt-1">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => send(s)}
                className="rounded-full border border-ink/15 bg-white/60 px-3.5 py-2 text-left text-[13.5px] text-ink/80 transition hover:border-ink/40"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {messages.map((m, i) =>
          m.role === "user" ? (
            <div
              key={i}
              className="ml-auto max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-md bg-ink px-3.5 py-2.5 text-[14px] leading-relaxed text-bone"
            >
              {m.content}
            </div>
          ) : (
            <div
              key={i}
              className="max-w-[88%] whitespace-pre-wrap rounded-2xl rounded-tl-md bg-cream px-3.5 py-2.5 text-[14px] leading-relaxed text-ink/85"
            >
              {m.content ? (
                <RichText text={m.content} onNavigate={onClose} />
              ) : (
                <span className="inline-flex gap-1" aria-label="Skriver">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink/40" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink/40 [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink/40 [animation-delay:300ms]" />
                </span>
              )}
            </div>
          ),
        )}

        {error && (
          <div role="alert" className="rounded-2xl border border-ink/15 bg-white/70 px-3.5 py-2.5 text-[13.5px] text-ink/80">
            {error}
          </div>
        )}
      </div>

      <div className="border-t border-ink/10 px-4 pb-3 pt-3">
        {view === "chat" && (
          <>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-end gap-2"
            >
              <label htmlFor="oe-chat-input" className="sr-only">
                Skriv din fråga
              </label>
              <textarea
                id="oe-chat-input"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send(input);
                  }
                }}
                rows={1}
                maxLength={CHAT_MAX_MESSAGE_CHARS}
                placeholder="Skriv din fråga…"
                className={`${field} max-h-28 min-h-[44px] resize-none`}
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                aria-label="Skicka"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-indigo text-bone transition hover:bg-indigo/90 disabled:opacity-40"
              >
                <ArrowUp size={18} aria-hidden="true" />
              </button>
            </form>
            <div className="mt-2.5 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setView("callback")}
                className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-ink/15 px-3 py-1.5 text-[12.5px] font-medium text-ink/80 transition hover:border-ink/40"
              >
                <Phone size={13} aria-hidden="true" /> Bli uppringd
              </button>
              <p className="text-right text-[11px] leading-snug text-ink/50">
                AI-svar kan innehålla fel. Skriv inga personuppgifter här.{" "}
                <Link href="/integritet" onClick={onClose} className="underline underline-offset-2">
                  Integritet
                </Link>
              </p>
            </div>
          </>
        )}

        {view === "callback" && (
          <form onSubmit={submitCallback} className="space-y-2">
            <p className="text-[13.5px] leading-relaxed text-ink/75">
              Lämna dina uppgifter så ringer en kollega upp dig. Vi svarar vardagar 08–20.
            </p>
            <input name="namn" required minLength={2} autoComplete="name" placeholder="Namn" aria-label="Namn" className={field} />
            <input
              name="telefon"
              required
              type="tel"
              autoComplete="tel"
              pattern="\+?(?:[\s\(\)\.\-]*\d){7,15}[\s\(\)\.\-]*"
              placeholder="Telefon"
              aria-label="Telefon"
              className={field}
            />
            <input name="epost" required type="email" autoComplete="email" placeholder="E-post" aria-label="E-post" className={field} />
            {cbError && (
              <p role="alert" className="text-[12.5px] text-ink/80">
                {cbError}
              </p>
            )}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="submit"
                disabled={cbBusy}
                className="rounded-full bg-indigo px-4 py-2.5 text-[13.5px] font-medium text-bone transition hover:bg-indigo/90 disabled:opacity-50"
              >
                {cbBusy ? "Skickar…" : "Ring upp mig"}
              </button>
              <button
                type="button"
                onClick={() => setView("chat")}
                className="rounded-full px-3 py-2.5 text-[13px] text-ink/65 hover:text-ink"
              >
                Tillbaka till chatten
              </button>
            </div>
            <p className="text-[11px] leading-snug text-ink/50">
              Vi använder uppgifterna för att kontakta dig om din förfrågan.{" "}
              <Link href="/integritet" onClick={onClose} className="underline underline-offset-2">
                Integritetspolicy
              </Link>
            </p>
          </form>
        )}

        {view === "sent" && (
          <div className="space-y-2">
            <p className="text-[14px] leading-relaxed text-ink/85">
              Tack! Vi ringer upp dig under våra öppettider, vardagar 08–20.
            </p>
            <button
              type="button"
              onClick={() => setView("chat")}
              className="rounded-full border border-ink/15 px-3 py-1.5 text-[12.5px] font-medium text-ink/80 hover:border-ink/40"
            >
              Tillbaka till chatten
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
