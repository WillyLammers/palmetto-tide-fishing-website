import Image from "next/image";
import { priceBasis, tripIncludes, type Trip } from "@/data/trips";
import BookTripButton from "./BookTripButton";
import { CheckIcon } from "./icons";
import { btn } from "./ui";

/**
 * One trip, as a card. Fishing and cruises share it so the two sections can
 * never drift into two different designs.
 *
 * Phones: a row, photo beside the details, so a whole section can be compared
 * at a glance without a carousel hiding half of it. Tablet and up: a column.
 */
export default function TripCard({ trip, index }: { trip: Trip; index: number }) {
  return (
    <li
      id={`trip-${trip.id}`}
      className={`reveal group flex flex-row sm:flex-col rounded-2xl overflow-hidden bg-white transition-shadow duration-300 hover:shadow-xl ${
        trip.featured ? "ring-2 ring-gold/70 shadow-lg shadow-gold/10" : "ring-1 ring-black/[0.07] shadow-md shadow-black/5"
      }`}
      style={{ ["--reveal-delay" as string]: `${index * 90}ms` }}
    >
      <div className="relative w-[36%] shrink-0 sm:w-full sm:aspect-[4/3] overflow-hidden bg-navy/10">
        <Image
          src={trip.photo}
          alt={trip.alt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 36vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ objectPosition: trip.photoPosition }}
        />
        {trip.featured && (
          <span className="absolute top-2 left-2 sm:top-3 sm:left-3 font-heading text-[10px] tracking-[0.15em] uppercase bg-gold text-navy px-2 py-1 sm:px-3 sm:py-1.5 rounded-full font-bold shadow">
            Most Popular
          </span>
        )}
        <span className="hidden sm:block absolute top-3 right-3 font-heading text-[11px] tracking-[0.18em] uppercase bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full">
          {trip.duration}
        </span>
      </div>

      <div className="flex flex-col flex-1 min-w-0 p-4 sm:p-6">
        <p className="sm:hidden font-heading text-[11px] tracking-[0.2em] uppercase text-ocean mb-1">{trip.duration}</p>
        <h3 className="font-heading text-lg sm:text-xl font-bold text-navy uppercase tracking-wide leading-tight mb-1.5 sm:mb-2">
          {trip.title}
        </h3>
        <p className="font-body text-slate text-[13.5px] sm:text-sm leading-relaxed mb-3 sm:mb-5">{trip.tagline}</p>

        <ul className="hidden sm:block space-y-2 mb-6 flex-1">
          {tripIncludes(trip).map((item) => (
            <li key={item} className="flex items-start gap-2.5 font-body text-sm text-slate">
              <CheckIcon className="w-3.5 h-3.5 mt-[3px] text-ocean shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p className="sm:hidden font-body text-[12.5px] text-slate-light leading-snug mb-3 flex-1">
          {tripIncludes(trip).join(" · ")}
        </p>

        <div className="flex items-center justify-between gap-3 pt-3 sm:pt-5 border-t border-black/[0.07]">
          <p className="leading-none">
            {/* Priced on request: a word in the price's place, never an invented number. */}
            {trip.price == null ? (
              <span className="font-heading text-[1.75rem] sm:text-3xl font-bold text-navy uppercase">Call</span>
            ) : (
              <>
                <span className="font-body text-slate text-sm align-top">$</span>
                <span className="font-heading text-[1.75rem] sm:text-3xl font-bold text-navy">{trip.price}</span>
              </>
            )}
            <span className="block font-body text-[10.5px] text-slate-light tracking-wider uppercase mt-1 whitespace-nowrap">
              {priceBasis(trip)}
            </span>
          </p>
          <BookTripButton
            tripId={trip.id}
            label={`Book the ${trip.title} trip`}
            className={btn({ variant: trip.featured ? "primary" : "outline", size: "sm", className: "shrink-0" })}
          >
            Book
          </BookTripButton>
        </div>
      </div>
    </li>
  );
}
