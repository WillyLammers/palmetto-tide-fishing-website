"use client";

import { occasions } from "@/data/trips";
import { btn } from "./ui";

export const SELECT_OCCASION_EVENT = "palmetto:select-occasion";

/**
 * "Great for" occasions. Each one jumps to the booking planner and adds a line
 * saying what the group is celebrating, so the text Joseph receives already
 * answers his first question. Nothing is sent until the visitor presses send.
 */
export default function OccasionChips() {
  return (
    <ul className="flex flex-wrap gap-2.5">
      {occasions.map((o) => (
        <li key={o.label}>
          <a
            href="#contact"
            aria-label={`Plan a trip: ${o.label}`}
            onClick={() => window.dispatchEvent(new CustomEvent(SELECT_OCCASION_EVENT, { detail: o.note }))}
            className={btn({ variant: "outlineLight", size: "sm" })}
          >
            {o.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
