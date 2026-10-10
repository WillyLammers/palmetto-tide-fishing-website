"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { MAX_GUESTS, kindLabels, tripById, tripTotal, tripsOfKind, type TripKind } from "@/data/trips";
import { mailHref, smsHref } from "@/data/site";
import { SELECT_TRIP_EVENT } from "./BookTripButton";
import { SELECT_OCCASION_EVENT } from "./OccasionChips";
import { MailIcon, TextIcon } from "./icons";
import { btn } from "./ui";

const localToday = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

// Noon, so no timezone can tip the date into the day before.
const atNoon = (iso: string) => new Date(`${iso}T12:00:00`);

const prettyDate = (iso: string) =>
  atNoon(iso).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

// Captain Joseph keeps the Sabbath. A date input cannot grey out one weekday,
// so a Sunday is caught here, before it becomes a text he has to turn down.
const isSunday = (iso: string) => atNoon(iso).getDay() === 0;

/**
 * Builds the booking text for the visitor.
 *
 * Trips are booked by text and phone, and the old section asked people to
 * "have your date, number of anglers and trip type ready" and then left them to
 * type it. This collects exactly those three things and hands them to the
 * phone's own Messages or Mail app, already written. No form backend, nothing
 * stored, nothing sent until the visitor presses send themselves.
 */
export default function BookingPlanner() {
  const uid = useId();
  const [tripId, setTripId] = useState<string>("");
  const [date, setDate] = useState("");
  const [flexible, setFlexible] = useState(false);
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [minDate, setMinDate] = useState<string | undefined>(undefined);
  // The line an occasion chip last added to the notes, so tapping a second one
  // swaps it rather than stacking both. Anything typed by hand is kept.
  const occasionNote = useRef("");

  useEffect(() => {
    // "Today" is the visitor's, not the server's.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMinDate(localToday());
    const onSelect = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (tripById(id)) setTripId(id);
    };
    const onOccasion = (e: Event) => {
      const note = (e as CustomEvent<string>).detail;
      setNotes((prev) => {
        const typed =
          occasionNote.current && prev.startsWith(occasionNote.current) ? prev.slice(occasionNote.current.length).trimStart() : prev;
        occasionNote.current = note;
        return typed ? `${note} ${typed}` : note;
      });
    };
    window.addEventListener(SELECT_TRIP_EVENT, onSelect);
    window.addEventListener(SELECT_OCCASION_EVENT, onOccasion);
    return () => {
      window.removeEventListener(SELECT_TRIP_EVENT, onSelect);
      window.removeEventListener(SELECT_OCCASION_EVENT, onOccasion);
    };
  }, []);

  const trip = tripById(tripId);
  const sunday = date !== "" && isSunday(date);

  const message = useMemo(() => {
    const lines = ["Hi Captain Joseph, I'd like to book a trip with Palmetto Tide Charters.", ""];
    // A fishing trip's label is its length; a cruise's is a place or a time of
    // day, which reads oddly in brackets, so only fishing trips carry it.
    const total = trip ? tripTotal(trip, guests) : null;
    const details = trip ? [trip.kind === "fishing" ? trip.duration.toLowerCase() : null, total == null ? null : `$${total}`].filter(Boolean) : [];
    lines.push(
      `Trip: ${trip ? `${trip.title}${details.length ? ` (${details.join(", ")})` : ""}` : "Not sure yet, would love a recommendation"}`,
    );
    if (date) lines.push(`Date: ${prettyDate(date)}${flexible ? " (flexible)" : ""}`);
    else if (flexible) lines.push("Date: Flexible");
    lines.push(`Group: ${guests} ${guests === 1 ? "person" : "people"}`);
    if (name.trim()) lines.push(`Name: ${name.trim()}`);
    if (notes.trim()) lines.push("", notes.trim());
    return lines.join("\n");
  }, [trip, date, flexible, guests, name, notes]);

  const subject = `Trip request${trip ? `: ${trip.title}` : ""}${date ? `, ${prettyDate(date)}` : ""}`;

  const label = "block font-heading text-[11px] tracking-[0.22em] uppercase text-navy/70 mb-2";
  const field =
    "w-full rounded-lg border border-navy/15 bg-white px-3.5 py-3 font-body text-[16px] text-navy placeholder:text-slate-light/70 focus:border-ocean focus:outline-none focus:ring-2 focus:ring-ocean/20 transition";

  return (
    <div className="bg-white rounded-2xl shadow-2xl ring-1 ring-black/5 p-5 sm:p-8 text-left">
      <h3 className="font-heading text-2xl sm:text-[1.75rem] font-bold text-navy uppercase tracking-wide">Plan your trip</h3>
      <p className="font-body text-slate text-sm mt-1 mb-6">
        Pick the details and we&apos;ll write the text for you. Nothing sends until you press send.
      </p>

      <fieldset className="mb-6">
        <legend className={label}>Trip</legend>
        {(["fishing", "cruise"] as TripKind[]).map((kind) => {
          const group = tripsOfKind(kind);
          return (
            <div key={kind} className="mb-3">
              <p className="font-body text-xs text-slate-light mb-1.5">{kindLabels[kind]}</p>
              <div className="grid grid-cols-2 gap-2.5">
                {group.map((t, i) => {
                  const selected = tripId === t.id;
                  const total = tripTotal(t, guests);
                  // An odd last tile takes the whole row rather than sitting beside a gap.
                  const lone = i === group.length - 1 && group.length % 2 === 1;
                  return (
                    <label
                      key={t.id}
                      className={`relative cursor-pointer rounded-xl ${lone ? "col-span-2" : ""} border px-3.5 py-3 transition-all has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-gold ${
                        selected ? "border-navy bg-navy text-white shadow-md" : "border-navy/15 hover:border-navy/40 text-navy"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`${uid}-trip`}
                        value={t.id}
                        checked={selected}
                        onChange={() => setTripId(t.id)}
                        className="sr-only"
                      />
                      <span className="block font-heading text-[14px] sm:text-[15px] uppercase tracking-wide leading-tight">{t.title}</span>
                      <span className={`block font-body text-xs mt-1 ${selected ? "text-white/70" : "text-slate-light"}`}>
                        {total == null ? "Price on request" : `${t.duration} · $${total}`}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          );
        })}
        <div className="grid grid-cols-2 gap-2.5">
          <label
            className={`col-span-2 cursor-pointer rounded-xl border px-3.5 py-2.5 text-center transition-all has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-gold ${
              tripId === "" ? "border-navy bg-navy/[0.04] text-navy" : "border-navy/15 hover:border-navy/40 text-slate"
            }`}
          >
            <input
              type="radio"
              name={`${uid}-trip`}
              value=""
              checked={tripId === ""}
              onChange={() => setTripId("")}
              className="sr-only"
            />
            <span className="font-body text-sm">Not sure yet. Help me choose.</span>
          </label>
        </div>
      </fieldset>

      <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-4 mb-5">
        <div>
          <label htmlFor={`${uid}-date`} className={label}>
            Preferred date
          </label>
          <input
            id={`${uid}-date`}
            type="date"
            value={date}
            min={minDate}
            onChange={(e) => setDate(e.target.value)}
            aria-describedby={sunday ? `${uid}-sunday` : undefined}
            className={`${field} min-h-[50px] appearance-none ${sunday ? "border-gold focus:border-gold" : ""}`}
          />
          <p id={`${uid}-sunday`} className="font-body text-[13px] text-navy leading-snug" aria-live="polite">
            {sunday && <span className="block mt-2">No trips on Sundays. Captain Joseph keeps the Sabbath, so please pick Monday to Saturday.</span>}
          </p>
          <label className="mt-2.5 inline-flex items-center gap-2 font-body text-sm text-slate cursor-pointer">
            <input
              type="checkbox"
              checked={flexible}
              onChange={(e) => setFlexible(e.target.checked)}
              className="w-[18px] h-[18px] accent-navy"
            />
            My dates are flexible
          </label>
        </div>

        <div>
          <span id={`${uid}-guests-label`} className={label}>
            Guests
          </span>
          <div className="flex items-center justify-between rounded-lg border border-navy/15 min-h-[50px] px-1.5" role="group" aria-labelledby={`${uid}-guests-label`}>
            <button
              type="button"
              onClick={() => setGuests((g) => Math.max(1, g - 1))}
              disabled={guests <= 1}
              className="w-11 h-11 rounded-md text-navy text-2xl leading-none hover:bg-navy/5 disabled:opacity-25"
              aria-label="One fewer guest"
            >
              −
            </button>
            <output className="font-heading text-xl text-navy tabular-nums" aria-live="polite">
              {guests}
            </output>
            <button
              type="button"
              onClick={() => setGuests((g) => Math.min(MAX_GUESTS, g + 1))}
              disabled={guests >= MAX_GUESTS}
              className="w-11 h-11 rounded-md text-navy text-2xl leading-none hover:bg-navy/5 disabled:opacity-25"
              aria-label="One more guest"
            >
              +
            </button>
          </div>
          <p className="mt-2.5 font-body text-xs text-slate-light">
            {trip?.perPerson
              ? `$${trip.price} for ${trip.perPerson.included}, +$${trip.perPerson.extra} each extra, up to ${MAX_GUESTS}`
              : `Up to ${MAX_GUESTS} per private charter`}
          </p>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor={`${uid}-name`} className={label}>
          Your name <span className="normal-case tracking-normal font-body text-slate-light">(optional)</span>
        </label>
        <input
          id={`${uid}-name`}
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={field}
        />
      </div>

      <div className="mb-6">
        <label htmlFor={`${uid}-notes`} className={label}>
          Anything else? <span className="normal-case tracking-normal font-body text-slate-light">(optional)</span>
        </label>
        <textarea
          id={`${uid}-notes`}
          rows={2}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Kids coming along, first time fishing, a fish you're after…"
          className={`${field} resize-none`}
        />
      </div>

      <div className="rounded-xl bg-[#f2f4f6] p-3.5 mb-5" aria-label="Message preview">
        <p className="font-heading text-[10px] tracking-[0.25em] uppercase text-slate-light mb-2">Your message</p>
        <p className="ml-auto max-w-[92%] w-fit rounded-2xl rounded-br-md bg-[#0b84fe] text-white font-body text-[13px] leading-snug px-3.5 py-2.5 whitespace-pre-line">
          {message}
        </p>
      </div>

      <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-3">
        <a
          href={smsHref(message)}
          className={btn({ className: "w-full" })}
        >
          <TextIcon className="w-4 h-4" />
          Text Captain Joseph
        </a>
        <a
          href={mailHref(subject, message)}
          className={btn({ variant: "outline", className: "w-full" })}
        >
          <MailIcon className="w-4 h-4" />
          Email instead
        </a>
      </div>
    </div>
  );
}
