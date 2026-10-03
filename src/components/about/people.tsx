/**
 * Små byggstenar för personer på /om-oss: avatar, avatar-stack och
 * telefonformat. Server-komponenter (ingen klient-JS).
 */

/** tel:-href som tål både "07x…" och redan internationellt "+46 …". */
export function telHref(p: string): string {
  const digits = p.replace(/[^\d+]/g, "");
  return digits.startsWith("+") ? digits : `+46${digits.replace(/^0/, "")}`;
}

/**
 * Visningsformat i samma stil som footern ("076 305 37 32"), oavsett om
 * numret sparats som "+46 70 …" eller "070…" i /admin/team.
 */
export function displayPhone(p: string): string {
  const digits = p.replace(/\D/g, "");
  const national = digits.startsWith("46") ? `0${digits.slice(2)}` : digits;
  if (/^07\d{8}$/.test(national)) {
    return `${national.slice(0, 3)} ${national.slice(3, 6)} ${national.slice(6, 8)} ${national.slice(8)}`;
  }
  return p.trim();
}

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export type PersonLite = {
  id: string;
  name: string;
  color: string;
  photo?: string;
};

export function Avatar({
  person,
  size = 48,
  ring = false,
}: {
  person: PersonLite;
  size?: number;
  ring?: boolean;
}) {
  return (
    <span
      className={`relative inline-grid shrink-0 place-items-center overflow-hidden rounded-full bg-gradient-to-br ${person.color} ${
        ring ? "ring-[3px] ring-bone" : ""
      }`}
      style={{ width: size, height: size }}
    >
      {person.photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={person.photo}
          alt=""
          width={size}
          height={size}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
      ) : (
        <span
          className="font-display text-bone"
          style={{ fontSize: Math.round(size * 0.36) }}
          aria-hidden
        >
          {initials(person.name)}
        </span>
      )}
    </span>
  );
}

/** Överlappande ansikten, t.ex. "alla rådgivare". */
export function AvatarStack({
  people,
  max = 5,
  size = 36,
  showRest = true,
}: {
  people: PersonLite[];
  max?: number;
  size?: number;
  /** Visa "+N"-bubblan för de som inte får plats. */
  showRest?: boolean;
}) {
  const shown = people.slice(0, max);
  const rest = showRest ? people.length - shown.length : 0;
  return (
    <span className="flex items-center">
      {shown.map((p, i) => (
        <span key={p.id} className={i === 0 ? "" : "-ml-2.5"}>
          <Avatar person={p} size={size} ring />
        </span>
      ))}
      {rest > 0 && (
        <span
          className="-ml-2.5 inline-grid place-items-center rounded-full bg-ink text-bone ring-[3px] ring-bone font-mono text-[11px]"
          style={{ width: size, height: size }}
        >
          +{rest}
        </span>
      )}
    </span>
  );
}
