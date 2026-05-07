export type IdeaCategory = "salj" | "crm" | "drift" | "marknad" | "ovrigt";
export type IdeaStatus = "ide" | "bearbetas" | "klar" | "skrotad";

export type Idea = {
  id: string;
  title: string;
  body: string;
  category: IdeaCategory;
  status: IdeaStatus;
  author: string;
  createdAt: string; // ISO
  updatedAt: string; // ISO
};

export const CATEGORIES: { key: IdeaCategory; label: string; tone: string }[] = [
  { key: "salj", label: "Sälj", tone: "bg-amber/15 text-sun-deep-deep border-amber/30" },
  { key: "crm", label: "CRM", tone: "bg-moss/10 text-moss border-moss/30" },
  { key: "drift", label: "Drift", tone: "bg-copper/10 text-copper border-copper/30" },
  { key: "marknad", label: "Marknad", tone: "bg-ink/8 text-ink border-ink/15" },
  { key: "ovrigt", label: "Övrigt", tone: "bg-bone text-ink/70 border-ink/15" },
];

export const STATUSES: { key: IdeaStatus; label: string }[] = [
  { key: "ide", label: "Idé" },
  { key: "bearbetas", label: "Bearbetas" },
  { key: "klar", label: "Klar" },
  { key: "skrotad", label: "Skrotad" },
];

const KEY = "optimera_ideas_v1";

export function loadIdeas(): Idea[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Idea[];
  } catch {
    return [];
  }
}

export function saveIdeas(ideas: Idea[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(ideas));
}

export function newIdea(input: Omit<Idea, "id" | "createdAt" | "updatedAt" | "status">): Idea {
  const now = new Date().toISOString();
  return {
    ...input,
    id: crypto.randomUUID(),
    status: "ide",
    createdAt: now,
    updatedAt: now,
  };
}
