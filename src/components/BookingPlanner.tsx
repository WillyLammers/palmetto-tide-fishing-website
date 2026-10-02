"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { trips, tripById } from "@/data/trips";
import { mailHref, smsHref } from "@/data/site";
import { SELECT_TRIP_EVENT } from "./BookTripButton";
import { MailIcon, TextIcon } from "./icons";

const MAX_GUESTS = 6;

const localToday = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

const prettyDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

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

  useEffect(() => {
    // "Today" is the visitor's, not the server's.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMinDate(localToday());
    const onSelect = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (tripById(id)) setTripId(id);
    };
    window.addEventListener(SELECT_TRIP_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_TRIP_EVENT, onSelect);
  }, []);

  const trip = tripById(tripId);

  const message = useMemo(() => {
    const lines = ["Hi Captain Joseph, I'd like to book a trip with Palmetto Tide Charters.", ""];
    lines.push(`Trip: ${trip ? `${trip.title} (${trip.duration.toLowerCase()}, $${trip.price})` : "Not sure yet, would love a recommendation"}`);
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
        <div className="grid grid-cols-2 gap-2.5">
          {trips.map((t) => {
            const selected = tripId === t.id;
            return (
              <label
                key={t.id}
                className={`relative cursor-pointer rounded-xl border px-3.5 py-3 transition-all has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-gold ${
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
                  {t.duration} · ${t.price}
                </span>
              </label>
            );
          })}
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
            className={`${field} min-h-[50px] appearance-none`}
          />
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
          <p className="mt-2.5 font-body text-xs text-slate-light">Up to {MAX_GUESTS} per private charter</p>
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
          className="flex items-center justify-center gap-2.5 min-h-[52px] rounded-lg bg-gold text-navy font-heading text-[13px] tracking-[0.18em] uppercase hover:bg-gold-light transition-colors shadow-md shadow-gold/20"
        >
          <TextIcon className="w-4 h-4" />
          Text Captain Joseph
        </a>
        <a
          href={mailHref(subject, message)}
          className="flex items-center justify-center gap-2.5 min-h-[52px] rounded-lg border border-navy/25 text-navy font-heading text-[13px] tracking-[0.18em] uppercase hover:bg-navy hover:text-white transition-colors"
        >
          <MailIcon className="w-4 h-4" />
          Email instead
        </a>
      </div>
    </div>
  );
}
