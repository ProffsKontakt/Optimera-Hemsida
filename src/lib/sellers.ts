// Säljarroutning. Den här filen är medvetet enkel – den slutgiltiga
// fördelningen (per region, intresseområde, säljarschema) sker i KT Central.
// När KT Central exponerar ett `/api/assign-seller`-endpoint kan vi byta
// implementationen mot ett HTTP-anrop. Tills dess har vi en pragmatisk
// fallback här som matchar på tjänst och postnummer.

export type Seller = {
  id: string;
  name: string;
  email?: string;
  region: string[];
  specialties: string[];
};

export const SELLERS: Seller[] = [
  {
    id: "dexter",
    name: "Dexter Sundberg",
    email: "dexter@optimeraenergi.se",
    region: ["Stockholm", "Uppsala", "Södertälje"],
    specialties: ["solpaneler", "batterier", "laddboxar"],
  },
  {
    id: "ronja",
    name: "Ronja Eklund",
    email: "ronja@optimeraenergi.se",
    region: ["Stockholm", "Hammarby Sjöstad", "Nacka", "Lidingö"],
    specialties: ["vaermepumpar", "batterier", "ems"],
  },
  {
    id: "albin",
    name: "Albin Norén",
    email: "albin@optimeraenergi.se",
    region: ["Stockholm", "Bromma", "Sundbyberg", "Solna"],
    specialties: ["solpaneler", "laddboxar"],
  },
];

const FALLBACK: Seller = {
  id: "central",
  name: "Optimera Central",
  email: "hej@optimeraenergi.se",
  region: [],
  specialties: [],
};

export function assignSeller(input: {
  services: string[];
  address?: string;
  slot?: { date: string; time: string } | null;
}): Seller {
  const lowerAddress = (input.address ?? "").toLowerCase();
  const scored = SELLERS.map((s) => {
    let score = 0;
    for (const spec of s.specialties) {
      if (input.services.includes(spec)) score += 2;
    }
    for (const region of s.region) {
      if (lowerAddress.includes(region.toLowerCase())) score += 3;
    }
    return { seller: s, score };
  }).sort((a, b) => b.score - a.score);

  return scored[0]?.score > 0 ? scored[0].seller : FALLBACK;
}
