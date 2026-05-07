"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";

type Preset = {
  label: string;
  prompt: string;
  aspectRatio: "16:9" | "9:16" | "1:1";
};

type Job = {
  id: string;
  status: "queued" | "processing" | "succeeded" | "failed";
  videoUrl?: string;
  posterUrl?: string;
  errorMessage?: string;
};

export function StudioClient({ presets }: { presets: Preset[] }) {
  const [prompt, setPrompt] = useState(presets[0].prompt);
  const [aspect, setAspect] = useState<Preset["aspectRatio"]>(presets[0].aspectRatio);
  const [model, setModel] = useState<"soul" | "lite" | "turbo">("soul");
  const [duration, setDuration] = useState<5 | 10>(5);
  const [job, setJob] = useState<Job | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!job?.id || job.status === "succeeded" || job.status === "failed")
      return;
    const t = setInterval(async () => {
      try {
        const res = await fetch(`/api/higgsfield/status/${job.id}`);
        const data = (await res.json()) as Job & { error?: string };
        if (!res.ok) {
          setError(data.error ?? "Statusfel");
          return;
        }
        setJob(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : "okänt fel");
      }
    }, 4000);
    return () => clearInterval(t);
  }, [job?.id, job?.status]);

  async function generate() {
    setBusy(true);
    setError(null);
    setJob(null);
    try {
      const res = await fetch("/api/higgsfield/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          model,
          duration,
          aspectRatio: aspect,
          reference: "optimera-studio",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? `HTTP ${res.status}`);
      setJob(data as Job);
    } catch (e) {
      setError(e instanceof Error ? e.message : "okänt fel");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
      <div className="xl:col-span-7 space-y-6">
        <Card>
          <Eyebrow>Förinställda promptar</Eyebrow>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
            {presets.map((p) => (
              <button
                key={p.label}
                onClick={() => {
                  setPrompt(p.prompt);
                  setAspect(p.aspectRatio);
                }}
                className="text-left rounded-2xl border border-ink/15 bg-cream/50 p-4 hover:border-ink/40 transition"
              >
                <div className="font-display text-lg tracking-display-tight">
                  {p.label}
                </div>
                <div className="mt-2 text-[12.5px] text-ink/60 line-clamp-3 leading-snug">
                  {p.prompt}
                </div>
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <Eyebrow>Prompt</Eyebrow>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={6}
            className="mt-4 w-full rounded-2xl border border-ink/15 bg-cream/50 px-4 py-3 text-[14.5px] outline-none focus:border-ink/50 transition font-mono"
          />
        </Card>

        <Card>
          <Eyebrow>Tekniska val</Eyebrow>
          <div className="mt-4 grid grid-cols-3 gap-2">
            <Pill on={model === "soul"} onClick={() => setModel("soul")}>
              Soul (estetisk)
            </Pill>
            <Pill on={model === "turbo"} onClick={() => setModel("turbo")}>
              Turbo (snabb)
            </Pill>
            <Pill on={model === "lite"} onClick={() => setModel("lite")}>
              Lite (utforska)
            </Pill>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {(["16:9", "9:16", "1:1"] as const).map((a) => (
              <Pill key={a} on={aspect === a} onClick={() => setAspect(a)}>
                {a}
              </Pill>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Pill on={duration === 5} onClick={() => setDuration(5)}>
              5 sekunder
            </Pill>
            <Pill on={duration === 10} onClick={() => setDuration(10)}>
              10 sekunder
            </Pill>
          </div>
        </Card>

        <button
          onClick={generate}
          disabled={busy}
          className="btn-primary disabled:opacity-50"
        >
          {busy ? (
            <>
              <Loader2 className="animate-spin" size={16} /> Skickar till
              Higgsfield…
            </>
          ) : (
            <>
              Generera video <ArrowRight size={16} />
            </>
          )}
        </button>

        {error && (
          <div className="rounded-2xl border border-copper/40 bg-copper/10 px-4 py-3 text-[13.5px] text-copper">
            {error}
          </div>
        )}
      </div>

      <div className="xl:col-span-5 xl:sticky xl:top-24 self-start">
        <div className="rounded-[28px] border border-ink/10 bg-bone overflow-hidden">
          <div className="aspect-video bg-ink relative grid place-items-center">
            {job?.videoUrl ? (
              <video
                className="h-full w-full object-cover"
                controls
                autoPlay
                muted
                loop
                src={job.videoUrl}
                poster={job.posterUrl}
              />
            ) : (
              <div className="text-bone/65 text-center px-6">
                {job
                  ? renderStatus(job)
                  : "Förhandsvisning visas här när jobbet är klart."}
              </div>
            )}
          </div>
          <div className="p-6 text-[13px] font-mono text-ink/65 space-y-2">
            <Row k="Modell" v={model} />
            <Row k="Aspekt" v={aspect} />
            <Row k="Längd" v={`${duration}s`} />
            {job && <Row k="Job" v={job.id} />}
            {job && <Row k="Status" v={job.status} />}
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-ink/10 bg-bone p-7">
      {children}
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55">
      {children}
    </div>
  );
}

function Pill({
  children,
  on,
  onClick,
}: {
  children: React.ReactNode;
  on: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "rounded-full px-3 py-2 text-[12.5px] border transition",
        on
          ? "bg-ink text-bone border-ink"
          : "bg-cream/50 text-ink/75 border-ink/15 hover:border-ink/40",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-ink/45">{k}</span>
      <span className="text-right truncate">{v}</span>
    </div>
  );
}

function renderStatus(job: Job) {
  if (job.status === "queued") return "I kö hos Higgsfield…";
  if (job.status === "processing") return "Renderar…";
  if (job.status === "failed")
    return job.errorMessage ?? "Genereringen misslyckades.";
  return "Klart.";
}
