import { tripsOfKind } from "@/data/trips";
import TripCard from "./TripCard";
import { eyebrow } from "./ui";

/** The fishing charters. Cruises & outings follow in their own section. */
export default function Trips() {
  return (
    <section id="trips" className="relative bg-[#f8f7f4] py-20 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
        <div className="mb-10 md:mb-14 reveal">
          <p className={`${eyebrow} text-ocean mb-4`}>Trips &amp; Prices</p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className="font-heading text-[2.75rem] sm:text-5xl md:text-6xl font-bold text-navy uppercase tracking-wide leading-none">
              Fishing Charters
            </h2>
            <p className="font-body text-slate text-[15px] leading-relaxed max-w-md lg:max-w-sm lg:text-right">
              Private charters out of Charleston, Monday through Saturday. Rods, tackle and bait included on every fishing trip.{" "}
              <a href="#cruises" className="text-ocean underline underline-offset-2 hover:text-navy transition-colors duration-300 whitespace-nowrap">
                Not here to fish? See the cruises
              </a>
            </p>
          </div>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {tripsOfKind("fishing").map((trip, i) => (
            <TripCard key={trip.id} trip={trip} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
