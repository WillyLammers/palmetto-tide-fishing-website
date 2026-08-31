"use client";

import Image from "next/image";

const trips = [
  {
    id: "half-day",
    title: "Half Day Inshore",
    duration: "4 Hours",
    price: "450",
    tagline: "Redfish, trout & flounder on the Lowcountry flats.",
    includes: ["Up to 6 anglers", "All tackle & live bait", "License covered"],
    photo: "/images/gallery/fishing-21.jpg",
    photoPosition: "object-top",
  },
  {
    id: "full-day",
    title: "Full Day Inshore",
    duration: "8 Hours",
    price: "950",
    tagline: "All-day run through Charleston's best inshore spots.",
    includes: ["Up to 6 anglers", "All tackle & live bait", "Cooler with water & ice"],
    photo: "/images/gallery/fishing-22.jpg",
    featured: true,
    photoPosition: "object-center",
  },
  {
    id: "shark-fishing",
    title: "Shark Fishing",
    duration: "2 Hours",
    price: "400",
    tagline: "Hook into hard-fighting sharks right in Charleston Harbor.",
    includes: ["Up to 6 anglers", "All tackle & bait", "Scheduled around the tides"],
    photo: "/images/gallery/fishing-17.jpg",
    photoPosition: "object-center",
  },
  {
    id: "shark-tooth-hunting",
    title: "Shark Tooth Hunting",
    duration: "2 Hours",
    price: "350",
    tagline: "Dig fossil shark teeth on tide-bared sandbars — everything you find, you keep.",
    includes: ["Up to 6 guests", "Perfect for kids", "Scheduled around the tides"],
    photo: "/images/gallery/fishing-11.jpg",
    photoPosition: "object-center",
  },
];

export default function Trips() {
  const book = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="trips" className="relative bg-[#f8f7f4] py-28 md:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-[1px] bg-ocean/40" />
            <p className="font-heading text-ocean tracking-[0.35em] uppercase text-xs">Our Charters</p>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="font-heading text-5xl md:text-6xl font-bold text-navy uppercase tracking-wide leading-none">
              Fishing Trips
            </h2>
            <p className="font-body text-slate text-sm leading-relaxed max-w-xs md:text-right">
              All charters depart Charleston.<br />Everything included — just show up.
            </p>
          </div>
        </div>

        {/* Cards */}
        {/* Two-up from the smallest screen: four stacked cards made this the
            tallest section on the page by a wide margin. */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {trips.map((trip) => (
            <div
              key={trip.id}
              className={`group flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                trip.featured
                  ? "ring-2 ring-gold/50 shadow-lg shadow-gold/10"
                  : "ring-1 ring-black/[0.06] shadow-md shadow-black/5"
              }`}
            >
              {/* Photo */}
              <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <Image
                  src={trip.photo}
                  alt={trip.title}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className={`object-cover transition-transform duration-700 group-hover:scale-105 ${trip.photoPosition ?? "object-center"}`}
                />
                {/* Duration pill — sits bottom-right on narrow screens so it
                    cannot collide with the "Most Popular" badge on the
                    featured card, which shares the top row. */}
                <div className="absolute bottom-2 right-2 sm:bottom-auto sm:top-4 sm:right-4">
                  <span className="font-heading text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] uppercase bg-black/55 backdrop-blur-sm text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded-full">
                    {trip.duration}
                  </span>
                </div>
                {/* Featured badge */}
                {trip.featured && (
                  <div className="absolute top-2 left-2 sm:top-4 sm:left-4">
                    <span className="font-heading text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] uppercase bg-gold text-navy px-2 py-1 sm:px-3 sm:py-1.5 rounded-full font-bold">
                      Most Popular
                    </span>
                  </div>
                )}
              </div>

              {/* Content panel */}
              <div className="flex flex-col flex-1 bg-white p-4 sm:p-6">
                <h3 className="font-heading text-base sm:text-xl font-bold text-navy uppercase tracking-wide mb-1.5 sm:mb-2">
                  {trip.title}
                </h3>
                <p className="font-body text-slate text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5">
                  {trip.tagline}
                </p>

                {/* Includes */}
                <ul className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6 flex-1">
                  {trip.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 sm:gap-2.5 font-body text-[11px] sm:text-sm text-slate">
                      <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 mt-0.5 text-ocean flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Price + CTA */}
                <div className="pt-4 sm:pt-5 border-t border-black/[0.06] flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-baseline gap-0.5">
                      <span className="font-body text-slate text-xs sm:text-sm">$</span>
                      <span className="font-heading text-2xl sm:text-3xl font-bold text-navy">{trip.price}</span>
                    </div>
                    <p className="font-body text-[10px] sm:text-[11px] text-slate-light tracking-wider uppercase">per trip</p>
                  </div>
                  <button
                    onClick={book}
                    className={`font-heading text-[10px] sm:text-[11px] tracking-[0.15em] sm:tracking-[0.2em] uppercase px-3 py-2.5 sm:px-5 sm:py-3 rounded-xl transition-all duration-300 flex-shrink-0 ${
                      trip.featured
                        ? "bg-gold text-navy hover:bg-gold/90 shadow-md shadow-gold/20"
                        : "border border-navy/20 text-navy hover:bg-navy hover:text-white"
                    }`}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="font-body text-slate-light text-xs text-center mt-8 tracking-wide">
          Private charters only — your group, your pace.{" "}
          <button onClick={book} className="text-slate hover:text-ocean underline underline-offset-2 transition-colors duration-200">
            Questions? Get in touch.
          </button>
        </p>
      </div>
    </section>
  );
}
