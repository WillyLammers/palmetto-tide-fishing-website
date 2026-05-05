"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="relative py-32 md:py-44 overflow-hidden">
      {/* Real photo background */}
      <div className="absolute inset-0">
        <Image
          src="/images/gallery/fishing-14.jpg"
          alt="Inshore fishing Charleston"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
      {/* Strong overlay so text is always legible */}
      <div className="absolute inset-0 bg-navy/82" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy/50 via-navy/20 to-navy/60" />

      {/* Content */}
      <div
        className={`relative z-10 max-w-3xl mx-auto px-6 text-center transition-all duration-[1.2s] cubic-bezier(0.16,1,0.3,1) ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-8 h-[1px] bg-gold/60" />
          <p className="font-heading text-gold tracking-[0.4em] uppercase text-xs">
            Ready to Fish?
          </p>
          <div className="w-8 h-[1px] bg-gold/60" />
        </div>

        <h2 className="font-heading text-5xl md:text-7xl font-bold uppercase tracking-wide leading-[0.95] mb-8">
          <span className="text-white">Let&apos;s Go </span>
          <span className="text-shimmer">Fishing</span>
        </h2>

        <p className="font-body text-white/85 text-base md:text-lg max-w-lg mx-auto mb-4 leading-relaxed">
          Call or text Captain Joseph to check availability and book your trip.
        </p>
        <p className="font-body text-white/55 text-sm max-w-md mx-auto mb-12 leading-relaxed">
          Have your preferred date, number of anglers, and trip type ready.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="tel:8434714767"
            className="px-10 py-4 bg-white text-navy font-heading text-[13px] tracking-[0.2em] uppercase hover:bg-gold transition-all duration-500 rounded shadow-2xl"
          >
            Call / Text (843) 471-4767
          </Link>
          <Link
            href="mailto:palmettotidecharters@gmail.com"
            className="px-10 py-4 border border-white/30 text-white font-heading text-[13px] tracking-[0.2em] uppercase hover:border-gold hover:text-gold transition-all duration-500 rounded backdrop-blur-sm"
          >
            Send an Email
          </Link>
        </div>

        <div className="flex items-center justify-center gap-6 text-white/55 font-body text-xs tracking-wider uppercase">
          <span>7 Days a Week</span>
          <span className="w-1 h-1 bg-gold/50 rounded-full" />
          <span>Morning &amp; Afternoon</span>
          <span className="w-1 h-1 bg-gold/50 rounded-full" />
          <span>Charleston, SC</span>
        </div>
      </div>
    </section>
  );
}
