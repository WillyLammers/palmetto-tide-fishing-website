"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const features = [
  {
    title: "The Lowcountry Waters",
    subtitle: "Our Fishing Grounds",
    description:
      "From the winding creeks of the ACE Basin to the flats around Bull Island, Charleston holds some of the most diverse inshore fishing on the East Coast. Oyster bars, grass edges and miles of tidal marsh give redfish, speckled trout and flounder everywhere to feed — and the tide decides where they will be on any given morning.",
    photo: "/images/gallery/fishing-04.jpg",
    alt: "Redfish landed on the open water off Charleston, South Carolina",
    imageRight: false,
  },
  {
    title: "Species & Seasons",
    subtitle: "Year-Round Action",
    description:
      "Charleston's temperate climate means great fishing all year long. Spring brings bull redfish and sheepshead. Summer heats up with trout, flounder, and tarpon. Fall delivers slot redfish on the flats. Winter offers some of the best sight-fishing opportunities of the year.",
    photo: "/images/gallery/fishing-51.jpg",
    alt: "Angler holding a bull redfish caught with Palmetto Tide Charters",
    imageRight: true,
  },
  {
    title: "The Boat",
    subtitle: "What We Provide",
    description:
      "An 18-foot Sea Hunt bay boat with a wireless trolling motor, GPS and fishfinder, and a live well kept full. Rods, reels, tackle and bait are aboard, and your fishing license is covered. Bring sunscreen and sunglasses — Joseph cleans and bags your catch at the dock.",
    photo: "/images/gallery/fishing-18.jpg",
    alt: "Palmetto Tide Charters bay boat rigged for inshore fishing in Charleston Harbor",
    imageRight: false,
  },
];

function FeatureBlock({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`grid lg:grid-cols-12 gap-10 lg:gap-20 items-center ${
        index > 0 ? "mt-20 md:mt-32" : ""
      }`}
    >
      {/* Image */}
      <div
        className={`lg:col-span-7 transition-all duration-[1.2s] cubic-bezier(0.16,1,0.3,1) ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        } ${feature.imageRight ? "lg:order-2" : ""}`}
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl shadow-2xl group bg-navy/5">
          <Image
            src={feature.photo}
            alt={feature.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </div>

      {/* Content */}
      <div
        className={`lg:col-span-5 transition-all duration-[1.2s] delay-200 cubic-bezier(0.16,1,0.3,1) ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        } ${feature.imageRight ? "lg:order-1" : ""}`}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="section-line" />
          <p className="font-heading text-ocean tracking-[0.3em] uppercase text-xs">
            {feature.subtitle}
          </p>
        </div>
        <h3 className="font-heading text-3xl md:text-4xl font-bold text-navy uppercase tracking-wide leading-tight mb-6">
          {feature.title}
        </h3>
        <p className="font-body text-slate text-base leading-[1.8]">
          {feature.description}
        </p>
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <section className="py-28 md:py-40 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {features.map((feature, i) => (
          <FeatureBlock key={feature.title} feature={feature} index={i} />
        ))}
      </div>
    </section>
  );
}
