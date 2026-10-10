import { tripsOfKind } from "@/data/trips";
import HowItWorks from "./HowItWorks";
import OccasionChips from "./OccasionChips";
import TripCard from "./TripCard";
import { eyebrow } from "./ui";

/**
 * Cruises & outings: the trips for people who came for the water, not the
 * fish. A navy band, so it reads at a glance as a different kind of trip from
 * the fishing charters above it, with the same cards and the same booking.
 */
export default function Cruises() {
  return (
    <section id="cruises" className="relative bg-navy py-20 md:py-32 overflow-hidden">
      {/* A low sunset glow behind the heading. Decoration only. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(ellipse_at_top_right,rgba(201,168,76,0.16),transparent_60%)]"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
        <div className="mb-10 md:mb-14 reveal">
          <p className={`${eyebrow} text-gold mb-4`}>Not here to fish?</p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className="font-heading text-[2.75rem] sm:text-5xl md:text-6xl font-bold text-white uppercase tracking-wide leading-none">
              Cruises &amp; Outings
            </h2>
            <p className="font-body text-white/75 text-[15px] leading-relaxed max-w-md lg:max-w-sm lg:text-right">
              Private trips on Charleston Harbor for whatever you&apos;re celebrating. Just your group on the boat, up to 6
              people, Monday through Saturday.
            </p>
          </div>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {tripsOfKind("cruise").map((trip, i) => (
            <TripCard key={trip.id} trip={trip} index={i} />
          ))}
        </ul>

        <div className="mt-10 md:mt-14 reveal rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12">
          <div className="lg:w-64 shrink-0">
            <p className={`${eyebrow} text-gold mb-2`}>Great for</p>
            <h3 className="font-heading text-3xl font-bold text-white uppercase tracking-wide leading-none">Any occasion</h3>
            <p className="font-body text-white/65 text-sm leading-relaxed mt-3">
              Tap yours and we&apos;ll add it to your text to Joseph.
            </p>
          </div>
          <OccasionChips />
        </div>

        <HowItWorks />
      </div>
    </section>
  );
}
