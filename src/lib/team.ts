/**
 * Teamet bakom Optimera Energi. Delas mellan om-oss-sidan och media-CMS:en
 * (admin) så att team-foto-slots och visningen pekar på samma personer.
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

export const TEAM: TeamMember[] = [
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
    role: "Sales Operations",
    email: "moltas@optimeraenergi.se",
    phone: "0705340154",
    color: "from-[#0a3a4e] to-[#1A1A17]",
    bio: "Bygger säljprocessen så ingen kund glöms bort. Är personen som ringer dig dagen innan installationen och säger exakt vilka som dyker upp.",
  },
];
