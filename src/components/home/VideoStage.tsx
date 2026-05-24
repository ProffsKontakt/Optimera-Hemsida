"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useState } from "react";

export function VideoStage() {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="relative aspect-[16/9] rounded-[28px] overflow-hidden border border-ink/10 bg-ink">
      {/* Higgsfield-genererad eller infångad film. När HIGGSFIELD_API_KEY
          är konfigurerad kommer /api/higgsfield/generate ge oss en URL.
          preload="none" + sätt src först vid play-klick: ingen onödig MB
          laddas innan användaren faktiskt vill se filmen. Poster räcker
          för "video är här"-signal innan dess. */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        muted
        loop
        playsInline
        preload="none"
        poster="/poster.svg"
        src={playing ? "/hero.mp4" : undefined}
        autoPlay={playing}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent pointer-events-none" />
      {!playing && (
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onClick={() => setPlaying(true)}
          className="absolute inset-0 grid place-items-center text-bone group"
          aria-label="Spela film"
        >
          <span className="flex flex-col items-center gap-3">
            <span className="grid h-20 w-20 place-items-center rounded-full bg-bone/15 backdrop-blur-md border border-bone/30 group-hover:bg-bone/25 transition">
              <Play size={28} className="ml-1" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone/85">
              Filmen om Optimera · 2:14
            </span>
          </span>
        </motion.button>
      )}
      <div className="absolute bottom-5 left-5 rounded-full bg-bone/90 backdrop-blur px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/70 border border-ink/10">
        Premiere · 2026
      </div>
    </div>
  );
}
