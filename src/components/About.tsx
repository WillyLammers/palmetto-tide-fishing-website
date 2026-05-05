"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-28 md:py-40 bg-white overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, var(--navy) 1px, transparent 0)",
        backgroundSize: "40px 40px"
      }} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Image column */}
          <div
            className={`lg:col-span-5 transition-all duration-[1.2s] cubic-bezier(0.16,1,0.3,1) ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <div className="relative">
              {/* Main image */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-2xl">
                <Image
                  src="/images/about/about-me.jpeg"
                  alt="Captain Joseph Christy – Palmetto Tide Charters"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>

              {/* Floating accent card */}
              <div className="absolute -bottom-6 -right-6 md:-right-10 glass-light rounded-lg p-5 shadow-xl">
                <p className="font-heading text-4xl font-bold text-ocean leading-none">15+</p>
                <p className="font-body text-[11px] text-slate tracking-[0.15em] uppercase mt-1">Years on the Water</p>
              </div>

              {/* Decorative line */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-l-2 border-t-2 border-gold/20 rounded-tl-lg" />
            </div>
          </div>

          {/* Content column */}
          <div
            className={`lg:col-span-7 transition-all duration-[1.2s] delay-200 cubic-bezier(0.16,1,0.3,1) ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="section-line" />
              <p className="font-heading text-ocean tracking-[0.3em] uppercase text-xs">
                Meet Your Captain
              </p>
            </div>

            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-navy uppercase tracking-wide leading-[1.05] mb-8">
              Joseph<br />Christy
            </h2>

            <p className="font-body text-slate text-lg leading-[1.8] mb-6 max-w-xl">
              Born and raised in Charleston, South Carolina, Captain Joseph
              Christy has spent his entire life on the waters of the Lowcountry.
              What started as a childhood passion for fishing has grown into a
              lifelong dedication to sharing the beauty and excitement of
              Charleston&apos;s inshore waters.
            </p>

            <p className="font-body text-slate-light text-base leading-[1.8] mb-10 max-w-xl">
              With an intimate knowledge of local tides, seasonal patterns, and
              the best-kept fishing spots from the Charleston Harbor to the
              barrier islands, Captain Joseph ensures every trip is an
              unforgettable experience. Whether you&apos;re a seasoned angler or
              casting a line for the first time, you&apos;re in expert hands.
            </p>

            {/* Stats row */}
            <div className="flex gap-10 md:gap-14 pt-8 border-t border-sand-dark">
              {[
                { value: "500+", label: "Charters" },
                { value: "5.0", label: "Star Rating" },
                { value: "4", label: "Max Anglers" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-heading text-3xl md:text-4xl font-bold text-navy">{stat.value}</p>
                  <p className="font-body text-[11px] text-slate-light tracking-[0.2em] uppercase mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
