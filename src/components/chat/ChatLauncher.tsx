"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { CHAT_HIDDEN_PREFIXES } from "@/lib/chat-config";
import { trackEvent } from "@/lib/analytics";

// Själva chattfönstret laddas först när besökaren öppnar det, så att det
// inte belastar sidans första laddning.
const ChatPanel = dynamic(() => import("./ChatPanel"), { ssr: false });

export function ChatLauncher() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (CHAT_HIDDEN_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`) || pathname.startsWith(`${p}-`))) {
    return null;
  }

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => {
            setLoaded(true);
            setOpen(true);
            trackEvent("chat_open");
          }}
          aria-label="Öppna chatten med vår AI-assistent"
          // På mobil ligger knappen en bit upp så att den inte krockar med
          // offertknappen som sitter nere till höger på tjänstesidorna.
          className="fixed right-4 bottom-[4.75rem] md:bottom-5 md:right-5 z-40 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-3 text-[14px] font-medium text-bone shadow-lg shadow-ink/20 transition hover:bg-ink/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo focus-visible:ring-offset-2"
        >
          <MessageCircle size={17} aria-hidden="true" />
          <span>Fråga oss</span>
          <span className="rounded-full bg-bone/15 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em]">
            AI
          </span>
        </button>
      )}
      {loaded && <ChatPanel open={open} onClose={() => setOpen(false)} />}
    </>
  );
}
