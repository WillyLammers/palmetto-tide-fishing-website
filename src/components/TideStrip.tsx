"use client";

import { useEffect, useState } from "react";
import type { Tide } from "@/lib/tides";

/** Current Eastern wall-clock time as "YYYY-MM-DD HH:mm", comparable to NOAA's strings. */
const easternNow = () => {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/New_York",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    })
      .formatToParts(new Date())
      .map((x) => [x.type, x.value])
  );
  return `${p.year}-${p.month}-${p.day} ${p.hour}:${p.minute}`;
};

const formatTime = (t: string) => {
  const [h, m] = t.slice(11).split(":").map(Number);
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
};

// "Today", otherwise the short weekday: "Tomorrow" does not fit a phone tile.
const dayLabel = (t: string, today: string) => {
  const date = t.slice(0, 10);
  if (date === today) return "Today";
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-US", { weekday: "short" });
};

/**
 * The next four Charleston Harbor tides. The shark trips are scheduled around
 * the tides and shark tooth hunting only happens around low water, so this
 * answers a real planning question rather than decorating the page.
 *
 * Rendered only after mount: "next tide" depends on the visitor's clock, and
 * the server-rendered page can be hours old.
 */
export default function TideStrip({ tides }: { tides: Tide[] }) {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    // Deferred to after mount on purpose: the server cannot know the visitor's time.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(easternNow());
    const id = setInterval(() => setNow(easternNow()), 60_000);
    return () => clearInterval(id);
  }, []);

  if (!tides.length) return null;
  const upcoming = now ? tides.filter((t) => t.t > now).slice(0, 4) : [];
  const today = now?.slice(0, 10) ?? "";

  return (
    <div className="mt-10 rounded-2xl bg-navy text-white px-5 py-5 sm:px-7 sm:py-6 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
      <div className="flex items-center gap-3 lg:w-52 shrink-0">
        <svg className="w-8 h-8 text-gold shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
          <path strokeLinecap="round" d="M2 15c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2M2 19c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2M12 3v7m0 0l-3-3m3 3l3-3" />
        </svg>
        <div>
          <p className="font-heading text-sm tracking-[0.2em] uppercase">Charleston Tides</p>
          <p className="font-body text-xs text-white/60">Next tides at the harbor</p>
        </div>
      </div>

      <ul className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 flex-1 min-h-[60px]">
        {upcoming.map((t) => (
          <li key={t.t} className="rounded-xl bg-white/[0.06] border border-white/10 px-3.5 py-2.5">
            <p className="font-body text-[11px] uppercase tracking-[0.12em] text-white/60 whitespace-nowrap">
              <span className={t.type === "L" ? "text-gold" : "text-white/85"}>{t.type === "H" ? "High" : "Low"}</span>
              {" · "}
              {dayLabel(t.t, today)}
            </p>
            <p className="font-heading text-lg leading-tight mt-0.5">
              {formatTime(t.t)}
              <span className="ml-2 text-xs font-body text-white/50">
                {t.ft.toFixed(1)} ft
              </span>
            </p>
          </li>
        ))}
      </ul>

      <p className="font-body text-[11px] text-white/45 lg:w-24 lg:text-right shrink-0">
        Predictions from{" "}
        <a
          href="https://tidesandcurrents.noaa.gov/stationhome.html?id=8665530"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-gold"
        >
          NOAA
        </a>
      </p>
    </div>
  );
}
