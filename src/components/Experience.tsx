"use client";

import { useEffect, useRef, useState } from "react";

const features = [
  {
    title: "The Lowcountry Waters",
    subtitle: "Our Fishing Grounds",
    description:
      "From the winding creeks of the ACE Basin to the flats around Bull Island, Charleston offers some of the most diverse inshore fishing on the East Coast. Crystal-clear waters, abundant oyster beds, and miles of pristine marsh create the perfect habitat for redfish, speckled trout, flounder, and more.",
    imageRight: false,
  },
  {
    title: "Species & Seasons",
    subtitle: "Year-Round Action",
    description:
      "Charleston's temperate climate means great fishing all year long. Spring brings bull redfish and sheepshead. Summer heats up with trout, flounder, and tarpon. Fall delivers slot redfish on the flats. Winter offers some of the best sight-fishing opportunities of the year.",
    imageRight: true,
  },
  {
    title: "First-Class Equipment",
    subtitle: "What We Provide",
    description:
      "Step aboard a fully equipped bay boat rigged with top-of-the-line rods, reels, and tackle. Live bait is always on hand, and Captain Joseph brings the expertise to match. All you need to bring is sunscreen, sunglasses, and a sense of adventure.",
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
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl shadow-2xl group">
          <div className="absolute inset-0 bg-gradient-to-br from-ocean/15 to-navy/25 flex items-center justify-center group-hover:from-ocean/20 group-hover:to-navy/30 transition-all duration-700">
            <div className="text-center text-navy/30">
              <svg className="w-14 h-14 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="font-heading text-xs tracking-[0.2em] uppercase">{feature.title}</p>
            </div>
          </div>
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
