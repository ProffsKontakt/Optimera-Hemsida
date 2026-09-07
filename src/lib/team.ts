import fs from "fs";
import path from "path";

/**
 * Teamet bakom Optimera Energi.
 *
 * Redigeras i /admin/team (namn, roll, mail, telefon, bio, ordning,
 * lägga till/ta bort). Ändringar sparas i data/team.json via en GitHub-
 * commit (samma mönster som press- och media-CMS:en) och är live efter
 * auto-deployen (1–2 min). Foton laddas upp i /admin/media – slots
 * (team:<id>) skapas automatiskt från listan här.
 *
 * DEFAULT_TEAM används bara om data/team.json saknas/är trasig.
 */
export type TeamMember = {
  /** Stabil nyckel för media-slot (team:<id>). Ändra aldrig i efterhand. */
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  /** Gradient som används som avatar tills ett riktigt foto laddats upp. */
  color: string;
  bio: string;
};

/** Gradienter som auto-tilldelas nya medlemmar (cyklar på index). */
export const TEAM_COLORS = [
  "from-[#3648C3] to-[#0E0E0C]",
  "from-[#B86F3C] to-[#2A2A26]",
  "from-[#0a3a4e] to-[#1A1A17]",
  "from-[#4A6B3A] to-[#1A1A17]",
  "from-[#8A5A2B] to-[#2A2A26]",
  "from-[#3E5C7A] to-[#0E0E0C]",
  "from-[#6B4A7A] to-[#1A1A17]",
];

export const DEFAULT_TEAM: TeamMember[] = [
  {
    id: "viktor",
    name: "Viktor Tiberg",
    role: "Grundare och VD",
    email: "viktor@optimeraenergi.se",
    phone: "0763053732",
    color: "from-[#3648C3] to-[#0E0E0C]",
    bio: "Driver bolaget framåt och håller siffrorna ärliga. Tror att det bästa kvittot på en bra installation är när kunden ringer för att tipsa grannen.",
  },
  {
    id: "julian",
    name: "Julian Nordgren",
    role: "Grundare och Operativ Chef",
    email: "julian@optimeraenergi.se",
    phone: "",
    color: "from-[#B86F3C] to-[#2A2A26]",
    bio: "Operativ ryggrad. Plockar upp telefonen, dimensionerar systemet, mejlar din offert och dyker upp vid första installationen.",
  },
  {
    id: "moltas",
    name: "Moltas Roslund",
    role: "Projektansvarig",
    email: "moltas@optimeraenergi.se",
    phone: "0705340154",
    color: "from-[#0a3a4e] to-[#1A1A17]",
    bio: "Bygger säljprocessen så ingen kund glöms bort. Är personen som ringer dig dagen innan installationen och säger exakt vilka som dyker upp.",
  },
  {
    id: "william",
    name: "William Persson",
    role: "Teknisk rådgivare",
    email: "william@optimeraenergi.se",
    phone: "",
    color: "from-[#4A6B3A] to-[#1A1A17]",
    bio: "Räknar hellre än överdriver. Går igenom din förbrukning och visar vad som faktiskt lönar sig innan du bestämmer dig.",
  },
  {
    id: "kalle",
    name: "Kalle Krus",
    role: "Teknisk rådgivare",
    email: "kalle@optimeraenergi.se",
    phone: "",
    color: "from-[#8A5A2B] to-[#2A2A26]",
    bio: "Rak och lätt att nå. Svarar på frågorna du inte visste att du hade och håller kontakten hela vägen till driftsättning.",
  },
  {
    id: "albin",
    name: "Albin Lygdman",
    role: "Teknisk rådgivare & platschef",
    email: "albin@optimeraenergi.se",
    phone: "",
    color: "from-[#3E5C7A] to-[#0E0E0C]",
    bio: "Gillar när kalkylen talar för sig själv. Hjälper dig jämföra alternativ utan säljsnack, med siffrorna på bordet.",
  },
];

const TEAM_PATH = path.join(process.cwd(), "data", "team.json");

function isValidMember(m: unknown): m is TeamMember {
  if (!m || typeof m !== "object") return false;
  const x = m as Record<string, unknown>;
  return (
    typeof x.id === "string" &&
    x.id.length > 0 &&
    typeof x.name === "string" &&
    x.name.length > 0 &&
    typeof x.role === "string"
  );
}

/**
 * Läs teamet från data/team.json (admin-redigerat), annars DEFAULT_TEAM.
 * Saknade fält fylls med tomma strängar + auto-färg så gamla poster
 * aldrig kraschar renderingen.
 */
export function getTeam(): TeamMember[] {
  try {
    if (fs.existsSync(TEAM_PATH)) {
      const raw = JSON.parse(fs.readFileSync(TEAM_PATH, "utf-8"));
      if (Array.isArray(raw)) {
        const valid = raw.filter(isValidMember);
        if (valid.length > 0) {
          return valid.map((m, i) => ({
            id: m.id,
            name: m.name,
            role: m.role ?? "",
            email: typeof m.email === "string" ? m.email : "",
            phone: typeof m.phone === "string" ? m.phone : "",
            bio: typeof m.bio === "string" ? m.bio : "",
            color:
              typeof m.color === "string" && m.color
                ? m.color
                : TEAM_COLORS[i % TEAM_COLORS.length],
          }));
        }
      }
    }
  } catch {
    /* fall through till default */
  }
  return DEFAULT_TEAM;
}

/** @deprecated Använd getTeam() – behålls för bakåtkompatibilitet. */
export const TEAM = DEFAULT_TEAM;
