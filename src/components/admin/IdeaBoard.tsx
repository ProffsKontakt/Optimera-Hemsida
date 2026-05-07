"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, Send, Trash2, Pencil, X, Check } from "lucide-react";
import {
  CATEGORIES,
  STATUSES,
  loadIdeas,
  saveIdeas,
  newIdea,
  type Idea,
  type IdeaCategory,
  type IdeaStatus,
} from "@/lib/ideas";

export function IdeaBoard() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [filter, setFilter] = useState<IdeaCategory | "alla">("alla");
  const [statusFilter, setStatusFilter] = useState<IdeaStatus | "alla">("alla");
  const [composing, setComposing] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);

  // Hydration: läs in från localStorage först efter mount.
  useEffect(() => {
    setIdeas(loadIdeas());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveIdeas(ideas);
  }, [ideas, hydrated]);

  const filtered = useMemo(() => {
    return ideas
      .filter((i) => filter === "alla" || i.category === filter)
      .filter((i) => statusFilter === "alla" || i.status === statusFilter)
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      );
  }, [ideas, filter, statusFilter]);

  function addIdea(input: {
    title: string;
    body: string;
    category: IdeaCategory;
    author: string;
  }) {
    const idea = newIdea(input);
    setIdeas((cur) => [idea, ...cur]);
    setComposing(false);
    // Skicka vidare till webhook (fire-and-forget)
    fetch("/api/admin/ideas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(idea),
    }).catch(() => {});
  }

  function updateIdea(id: string, patch: Partial<Idea>) {
    setIdeas((cur) =>
      cur.map((i) =>
        i.id === id
          ? { ...i, ...patch, updatedAt: new Date().toISOString() }
          : i,
      ),
    );
  }

  function deleteIdea(id: string) {
    if (!confirm("Ta bort idén?")) return;
    setIdeas((cur) => cur.filter((i) => i.id !== id));
  }

  return (
    <div className="space-y-5">
      {/* Filterrad */}
      <div className="flex flex-wrap items-center gap-3">
        <FilterPills
          options={[
            { key: "alla", label: "Alla kategorier" },
            ...CATEGORIES.map((c) => ({ key: c.key, label: c.label })),
          ]}
          value={filter}
          onChange={(v) => setFilter(v as IdeaCategory | "alla")}
        />
        <span className="h-5 w-px bg-ink/15" />
        <FilterPills
          options={[
            { key: "alla", label: "Alla status" },
            ...STATUSES.map((s) => ({ key: s.key, label: s.label })),
          ]}
          value={statusFilter}
          onChange={(v) => setStatusFilter(v as IdeaStatus | "alla")}
        />
        <button
          onClick={() => setComposing(true)}
          className="ml-auto inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-bone text-[13.5px] hover:bg-graphite transition"
        >
          <Plus size={14} /> Ny idé
        </button>
      </div>

      {composing && (
        <ComposeCard
          onCancel={() => setComposing(false)}
          onSubmit={addIdea}
        />
      )}

      {hydrated && filtered.length === 0 && !composing && (
        <div className="rounded-3xl border border-dashed border-ink/15 bg-cream/40 p-12 text-center">
          <h3 className="font-display text-2xl tracking-display-tight">
            Inga idéer ännu.
          </h3>
          <p className="mt-2 text-ink/55 text-[14px]">
            Klicka på <em>Ny idé</em> för att starta tankesmedjan.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((idea) =>
          editing === idea.id ? (
            <EditCard
              key={idea.id}
              idea={idea}
              onCancel={() => setEditing(null)}
              onSave={(patch) => {
                updateIdea(idea.id, patch);
                setEditing(null);
              }}
            />
          ) : (
            <IdeaCard
              key={idea.id}
              idea={idea}
              onStatusChange={(status) => updateIdea(idea.id, { status })}
              onEdit={() => setEditing(idea.id)}
              onDelete={() => deleteIdea(idea.id)}
            />
          ),
        )}
      </div>

      {hydrated && (
        <p className="text-[12px] text-ink/45 leading-relaxed max-w-2xl">
          Idéerna sparas just nu lokalt i din browser. Sätt
          {" "}<code className="font-mono">IDEAS_WEBHOOK_URL</code> i miljön så
          POST:as varje ny idé också till KT Central, Slack eller Notion.
        </p>
      )}
    </div>
  );
}

// =================== KORT ===================

function IdeaCard({
  idea,
  onStatusChange,
  onEdit,
  onDelete,
}: {
  idea: Idea;
  onStatusChange: (s: IdeaStatus) => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const cat = CATEGORIES.find((c) => c.key === idea.category)!;
  return (
    <article className="rounded-2xl border border-ink/10 bg-bone p-6 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-4">
        <span
          className={`rounded-full border px-2.5 py-1 text-[10.5px] font-mono uppercase tracking-[0.18em] ${cat.tone}`}
        >
          {cat.label}
        </span>
        <span className="font-mono text-[10.5px] text-ink/45">
          {new Date(idea.createdAt).toLocaleDateString("sv-SE")}
        </span>
      </div>
      <h3 className="font-display text-xl tracking-display-tight leading-tight">
        {idea.title}
      </h3>
      <p className="text-[14px] text-ink/70 leading-relaxed whitespace-pre-line">
        {idea.body}
      </p>

      <div className="mt-auto pt-4 border-t border-ink/8 flex items-center justify-between gap-2">
        <select
          value={idea.status}
          onChange={(e) => onStatusChange(e.target.value as IdeaStatus)}
          className="rounded-full border border-ink/15 bg-cream/40 px-3 py-1.5 text-[12.5px] font-mono uppercase tracking-[0.14em] outline-none"
        >
          {STATUSES.map((s) => (
            <option key={s.key} value={s.key}>
              {s.label}
            </option>
          ))}
        </select>
        <div className="flex items-center gap-1.5">
          <span className="text-[11.5px] text-ink/45 mr-2">
            av {idea.author || "anonym"}
          </span>
          <button
            onClick={onEdit}
            aria-label="Redigera"
            className="grid h-8 w-8 place-items-center rounded-full hover:bg-ink/5 text-ink/60"
          >
            <Pencil size={13} />
          </button>
          <button
            onClick={onDelete}
            aria-label="Ta bort"
            className="grid h-8 w-8 place-items-center rounded-full hover:bg-copper/10 text-ink/60 hover:text-copper"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>
    </article>
  );
}

// =================== KOMPONERING ===================

function ComposeCard({
  onCancel,
  onSubmit,
}: {
  onCancel: () => void;
  onSubmit: (input: {
    title: string;
    body: string;
    category: IdeaCategory;
    author: string;
  }) => void;
}) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState<IdeaCategory>("salj");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!title.trim()) return;
        onSubmit({ title, body, category, author });
      }}
      className="rounded-2xl border-2 border-ink/15 bg-bone p-6 space-y-4"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl tracking-display-tight">
          Ny idé
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="grid h-8 w-8 place-items-center rounded-full hover:bg-ink/5 text-ink/60"
        >
          <X size={14} />
        </button>
      </div>

      <FilterPills
        options={CATEGORIES.map((c) => ({ key: c.key, label: c.label }))}
        value={category}
        onChange={(v) => setCategory(v as IdeaCategory)}
      />

      <input
        autoFocus
        placeholder="Rubrik"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full rounded-xl border border-ink/15 bg-cream/40 px-4 py-3 text-[16px] font-display tracking-display-tight outline-none focus:border-ink/50"
      />

      <textarea
        placeholder="Beskriv idén – så detaljerat eller löst som du vill."
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={5}
        className="w-full rounded-xl border border-ink/15 bg-cream/40 px-4 py-3 text-[14.5px] outline-none focus:border-ink/50"
      />

      <div className="flex items-center gap-3">
        <input
          placeholder="Vem skriver? (för- eller smeknamn)"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="flex-1 rounded-xl border border-ink/15 bg-cream/40 px-4 py-2.5 text-[13.5px] outline-none focus:border-ink/50"
        />
        <button
          type="submit"
          disabled={!title.trim()}
          className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-bone text-[13.5px] hover:bg-graphite transition disabled:opacity-50"
        >
          <Send size={13} /> Spara
        </button>
      </div>
    </form>
  );
}

function EditCard({
  idea,
  onCancel,
  onSave,
}: {
  idea: Idea;
  onCancel: () => void;
  onSave: (patch: Partial<Idea>) => void;
}) {
  const [title, setTitle] = useState(idea.title);
  const [body, setBody] = useState(idea.body);
  const [category, setCategory] = useState<IdeaCategory>(idea.category);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave({ title, body, category });
      }}
      className="rounded-2xl border-2 border-ink/15 bg-bone p-6 space-y-4"
    >
      <FilterPills
        options={CATEGORIES.map((c) => ({ key: c.key, label: c.label }))}
        value={category}
        onChange={(v) => setCategory(v as IdeaCategory)}
      />
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full rounded-xl border border-ink/15 bg-cream/40 px-4 py-3 text-[16px] font-display tracking-display-tight outline-none focus:border-ink/50"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={5}
        className="w-full rounded-xl border border-ink/15 bg-cream/40 px-4 py-3 text-[14.5px] outline-none focus:border-ink/50"
      />
      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full px-4 py-2 text-[13px] text-ink/60 hover:text-ink"
        >
          Avbryt
        </button>
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-bone text-[13.5px] hover:bg-graphite transition"
        >
          <Check size={13} /> Spara
        </button>
      </div>
    </form>
  );
}

// =================== HJÄLPARE ===================

function FilterPills({
  options,
  value,
  onChange,
}: {
  options: { key: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((o) => {
        const active = o.key === value;
        return (
          <button
            key={o.key}
            type="button"
            onClick={() => onChange(o.key)}
            className={[
              "rounded-full px-3 py-1.5 text-[12px] border transition",
              active
                ? "bg-ink text-bone border-ink"
                : "bg-bone text-ink/70 border-ink/15 hover:border-ink/40",
            ].join(" ")}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
