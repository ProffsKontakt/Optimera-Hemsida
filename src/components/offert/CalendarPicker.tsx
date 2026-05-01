"use client";

import { useEffect, useMemo, useState } from "react";
import { Calendar, Clock } from "lucide-react";

export type SlotSelection = {
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  dateLabel: string;
  weekday: string;
};

const WEEKDAYS_SHORT = ["sön", "mån", "tis", "ons", "tor", "fre", "lör"];
const WEEKDAYS_LONG = [
  "söndag",
  "måndag",
  "tisdag",
  "onsdag",
  "torsdag",
  "fredag",
  "lördag",
];
const MONTHS = [
  "januari",
  "februari",
  "mars",
  "april",
  "maj",
  "juni",
  "juli",
  "augusti",
  "september",
  "oktober",
  "november",
  "december",
];

// Tider som visas. Lördag/söndag visas inte – jobbet sker mån–fre.
const WEEKDAY_SLOTS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

function buildDays(weeks = 3) {
  const days: { iso: string; date: Date; weekday: number }[] = [];
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  for (let i = 1; i <= weeks * 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    days.push({
      iso: d.toISOString().slice(0, 10),
      date: d,
      weekday: d.getDay(),
    });
  }
  return days;
}

function formatDayLabel(d: Date) {
  return `${d.getDate()} ${MONTHS[d.getMonth()]}`;
}

export function CalendarPicker({
  value,
  onChange,
}: {
  value: SlotSelection | null;
  onChange: (s: SlotSelection | null) => void;
}) {
  const days = useMemo(() => buildDays(3), []);
  const [selectedDay, setSelectedDay] = useState<string | null>(
    value?.date ?? null,
  );

  useEffect(() => {
    if (!value) setSelectedDay(null);
  }, [value]);

  const selectedDayObj = days.find((d) => d.iso === selectedDay);
  const isWeekend =
    selectedDayObj && (selectedDayObj.weekday === 0 || selectedDayObj.weekday === 6);
  const slots = selectedDayObj && !isWeekend ? WEEKDAY_SLOTS : [];

  function pickDay(iso: string) {
    setSelectedDay(iso);
    if (value && value.date !== iso) {
      onChange(null);
    }
  }

  function pickTime(time: string) {
    if (!selectedDayObj) return;
    onChange({
      date: selectedDayObj.iso,
      time,
      dateLabel: formatDayLabel(selectedDayObj.date),
      weekday: WEEKDAYS_LONG[selectedDayObj.weekday],
    });
  }

  return (
    <div className="rounded-2xl border border-ink/12 bg-cream/40 p-5">
      <div className="flex items-center gap-2 text-[12px] font-mono uppercase tracking-[0.18em] text-ink/55">
        <Calendar size={13} />
        Välj en dag de kommande tre veckorna
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1.5">
        {days.map((d) => {
          const weekend = d.weekday === 0 || d.weekday === 6;
          const active = selectedDay === d.iso;
          return (
            <button
              type="button"
              key={d.iso}
              disabled={weekend}
              onClick={() => pickDay(d.iso)}
              className={[
                "rounded-xl py-2.5 text-center transition-all",
                weekend
                  ? "opacity-30 cursor-not-allowed bg-bone/40"
                  : active
                  ? "bg-ink text-bone shadow-sm"
                  : "bg-bone hover:bg-ink/5 border border-ink/10",
              ].join(" ")}
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] opacity-60">
                {WEEKDAYS_SHORT[d.weekday]}
              </div>
              <div className="font-display text-lg leading-tight tracking-display-tight">
                {d.date.getDate()}
              </div>
            </button>
          );
        })}
      </div>

      {selectedDayObj && !isWeekend && (
        <div className="mt-6">
          <div className="flex items-center gap-2 text-[12px] font-mono uppercase tracking-[0.18em] text-ink/55">
            <Clock size={13} />
            Tider · {WEEKDAYS_LONG[selectedDayObj.weekday]}{" "}
            {formatDayLabel(selectedDayObj.date)}
          </div>
          <div className="mt-3 grid grid-cols-3 sm:grid-cols-5 gap-1.5">
            {slots.map((t) => {
              const active =
                value?.date === selectedDayObj.iso && value?.time === t;
              return (
                <button
                  type="button"
                  key={t}
                  onClick={() => pickTime(t)}
                  className={[
                    "rounded-xl py-2.5 text-center transition-all border",
                    active
                      ? "bg-ink text-bone border-ink"
                      : "bg-bone border-ink/10 hover:border-ink/40",
                  ].join(" ")}
                >
                  <span className="font-mono text-[13.5px] tracking-tight">
                    {t}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {!selectedDayObj && (
        <p className="mt-5 text-[12.5px] text-ink/50 leading-relaxed">
          Välj en dag ovan för att se lediga tider. Hembesöket tar 60–90 minuter
          och är helt kostnadsfritt – vi tar med oss kanelbullar och en
          inmätningsutrustning.
        </p>
      )}

      {value && (
        <div className="mt-5 rounded-2xl border border-moss/30 bg-moss/8 px-4 py-3 text-[13.5px]">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-moss/80">
            Valt
          </span>
          <div className="mt-1 font-display text-xl tracking-display-tight text-moss-deep">
            {value.weekday} {value.dateLabel} · kl {value.time}
          </div>
        </div>
      )}
    </div>
  );
}
