"use client";

export const SELECT_TRIP_EVENT = "palmetto:select-trip";

/**
 * Jumps to the booking planner with this trip already chosen, so the visitor
 * does not have to pick it a second time.
 */
export default function BookTripButton({
  tripId,
  label,
  className,
  children,
}: {
  tripId: string;
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href="#contact"
      aria-label={label}
      onClick={() => window.dispatchEvent(new CustomEvent(SELECT_TRIP_EVENT, { detail: tripId }))}
      className={className}
    >
      {children}
    </a>
  );
}
