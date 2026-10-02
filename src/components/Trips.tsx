import Image from "next/image";
import { trips } from "@/data/trips";
import type { Tide } from "@/lib/tides";
import BookTripButton from "./BookTripButton";
import TideStrip from "./TideStrip";
import { CheckIcon } from "./icons";

export default function Trips({ tides = [] }: { tides?: Tide[] }) {
  return (
    <section id="trips" className="relative bg-[#f8f7f4] py-20 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
        <div className="mb-10 md:mb-14 reveal">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-ocean/50" />
            <p className="font-heading text-ocean tracking-[0.35em] uppercase text-xs">Our Charters</p>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className="font-heading text-[2.75rem] sm:text-5xl md:text-6xl font-bold text-navy uppercase tracking-wide leading-none">
              Trips &amp; Prices
            </h2>
            <p className="font-body text-slate text-[15px] leading-relaxed max-w-md lg:max-w-sm lg:text-right">
              Private charters out of Charleston. One price for your whole group, with rods, tackle and bait included.
            </p>
          </div>
        </div>

        {/* Phones: one row per trip, photo beside the details, so all four can be
            compared at a glance without a carousel hiding half of them.
            Tablet: 2 up. Desktop: 4 up. */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {trips.map((trip, i) => (
            <li
              key={trip.id}
              id={`trip-${trip.id}`}
              className={`reveal group flex flex-row sm:flex-col rounded-2xl overflow-hidden bg-white transition-shadow duration-300 hover:shadow-xl ${
                trip.featured ? "ring-2 ring-gold/70 shadow-lg shadow-gold/10" : "ring-1 ring-black/[0.07] shadow-md shadow-black/5"
              }`}
              style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
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
                  {trip.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 font-body text-sm text-slate">
                      <CheckIcon className="w-3.5 h-3.5 mt-[3px] text-ocean shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="sm:hidden font-body text-[12.5px] text-slate-light leading-snug mb-3 flex-1">
                  {trip.includes.join(" · ")}
                </p>

                <div className="flex items-center justify-between gap-3 pt-3 sm:pt-5 border-t border-black/[0.07]">
                  <p className="leading-none">
                    <span className="font-body text-slate text-sm align-top">$</span>
                    <span className="font-heading text-[1.75rem] sm:text-3xl font-bold text-navy">{trip.price}</span>
                    <span className="block font-body text-[10.5px] text-slate-light tracking-wider uppercase mt-1">per trip</span>
                  </p>
                  <BookTripButton
                    tripId={trip.id}
                    label={`Book the ${trip.title} trip`}
                    className={`inline-flex items-center justify-center min-h-11 font-heading text-[12px] tracking-[0.18em] uppercase px-4 sm:px-5 rounded-xl transition-colors duration-300 shrink-0 ${
                      trip.featured
                        ? "bg-gold text-navy hover:bg-gold-light shadow-md shadow-gold/20"
                        : "border border-navy/25 text-navy hover:bg-navy hover:text-white"
                    }`}
                  >
                    Book
                  </BookTripButton>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <TideStrip tides={tides} />

        <p className="font-body text-slate-light text-[13px] text-center mt-8 tracking-wide">
          Private charters only: your group, your pace.{" "}
          <a href="#faq" className="text-slate hover:text-ocean underline underline-offset-2 transition-colors">
            Questions? See the FAQ.
          </a>
        </p>
      </div>
    </section>
  );
}
