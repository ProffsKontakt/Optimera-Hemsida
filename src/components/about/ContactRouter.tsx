import { Building2, Mail, Phone } from "lucide-react";
import { COMPANY_CONTACT } from "@/lib/contact-routes";
import {
  Avatar,
  AvatarStack,
  displayPhone,
  telHref,
  type PersonLite,
} from "./people";

export type RoutePerson = PersonLite & {
  role: string;
  phone: string;
  email: string;
};

export type ResolvedRoute = {
  id: string;
  question: string;
  groupTitle: string;
  groupNote: string;
  people: RoutePerson[];
};

/**
 * "Vem ska du höra av dig till?" – högst upp på /om-oss, så att besökaren
 * direkt ser vem som är rätt person för just hennes situation.
 *
 * Styrs av kryssrutorna "Kontaktperson för" i /admin/team:
 *  - en person markerad  → den personen, med eget nummer och mejl
 *  - flera markerade     → gruppen (t.ex. rådgivarna) + bolagets nummer
 *  - ingen synlig        → bolagets nummer och mejl
 */
export function ContactRouter({ routes }: { routes: ResolvedRoute[] }) {
  return (
    <div className="rounded-[28px] border border-ink/10 bg-bone p-5 md:p-8 shadow-[0_24px_60px_-36px_rgba(14,14,12,0.35)]">
      <h2 className="font-display text-2xl md:text-[28px] tracking-display-tight leading-[1.15]">
        Vem ska du höra av dig till?
      </h2>
      <p className="mt-1.5 text-[14px] text-ink/60">
        Välj det som stämmer – du når personen direkt, utan växel.
      </p>
      <ul className="mt-5 divide-y divide-ink/10 border-t border-ink/10">
        {routes.map((r) => (
          <RouteRow key={r.id} route={r} />
        ))}
      </ul>
    </div>
  );
}

function RouteRow({ route }: { route: ResolvedRoute }) {
  const single = route.people.length === 1 ? route.people[0] : null;
  const group = route.people.length > 1 ? route.people : null;
  // En person utan eget nummer/mejl i admin: bolagets i stället.
  const phone = single?.phone || COMPANY_CONTACT.phone;
  const phoneLabel = single?.phone
    ? displayPhone(single.phone)
    : COMPANY_CONTACT.phoneDisplay;
  const email = single?.email || COMPANY_CONTACT.email;
  const who = single?.name ?? (group ? route.groupTitle : "Ring eller mejla oss");

  return (
    <li className="grid grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr_auto] items-center gap-x-4 gap-y-3 py-4 md:py-5">
      <div>
        {single ? (
          <Avatar person={single} size={52} />
        ) : group ? (
          <>
            {/* Mobil: två ansikten utan "+N" = 50px, lika brett som en
                ensam avatar – annars får raden smalare textkolumn och
                knapparna trycks ut över kortets kant. */}
            <span className="sm:hidden">
              <AvatarStack people={group} max={2} size={30} showRest={false} />
            </span>
            <span className="hidden sm:block">
              <AvatarStack people={group} max={3} size={38} />
            </span>
          </>
        ) : (
          <span className="grid h-[52px] w-[52px] place-items-center rounded-full bg-ink text-bone">
            <Building2 size={20} />
          </span>
        )}
      </div>

      <div className="min-w-0">
        <div className="text-[13px] text-ink/55 leading-snug">{route.question}</div>
        <div className="mt-0.5 font-display text-[17px] md:text-lg tracking-display-tight leading-tight">
          {single ? (
            <a
              href={`#person-${single.id}`}
              className="hover:text-indigo transition-colors"
            >
              {who}
            </a>
          ) : (
            who
          )}
        </div>
        <div className="mt-0.5 text-[12.5px] text-ink/55 leading-snug">
          {single ? single.role : route.groupNote}
        </div>
      </div>

      <div className="col-start-2 sm:col-start-auto flex items-center gap-2">
        <a
          href={`tel:${telHref(phone)}`}
          aria-label={`Ring ${who}, ${phoneLabel}`}
          className="inline-flex h-10 items-center gap-2 rounded-full border border-ink/15 px-3.5 text-[13.5px] text-ink/80 hover:border-indigo hover:text-indigo transition whitespace-nowrap"
        >
          <Phone size={14} />
          {phoneLabel}
        </a>
        <a
          href={`mailto:${email}`}
          aria-label={`Mejla ${who}, ${email}`}
          title={email}
          className="grid h-10 w-10 place-items-center rounded-full border border-ink/15 text-ink/70 hover:border-indigo hover:text-indigo transition"
        >
          <Mail size={14} />
        </a>
      </div>
    </li>
  );
}
