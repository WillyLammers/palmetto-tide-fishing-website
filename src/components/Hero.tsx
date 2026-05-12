"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Background — image sits behind video as fallback */}
      <div className="absolute inset-0 animate-slow-zoom">
        <Image
          src="/images/hero/hero.png"
          alt="Charleston, SC inshore fishing charter at sunset with Palmetto Tide Charters"
          fill
          priority
          className="object-cover"
        />
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Overlay — heavier on left where text lives, lighter right so sky breathes */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/40 to-navy/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-navy/20" />

      {/* Content — lower-left anchored */}
      <div className="relative z-10 h-full flex flex-col justify-end px-8 md:px-16 lg:px-24 pb-28 md:pb-36">
        {/* Location label */}
        <p className="font-heading text-white/40 text-xs tracking-[0.4em] uppercase mb-5 animate-fade-in-up">
          Charleston, SC
        </p>

        {/* Headline */}
        <h1 className="font-heading font-bold text-white uppercase leading-[0.92] mb-4 animate-fade-in-up [animation-delay:0.1s]"
          style={{ fontSize: "clamp(3.5rem, 9vw, 7rem)" }}
        >
          Palmetto Tide
        </h1>

        {/* Subline */}
        <p className="font-heading text-shimmer uppercase tracking-[0.35em] mb-6 animate-fade-in-up [animation-delay:0.2s]"
          style={{ fontSize: "clamp(1rem, 2.5vw, 1.75rem)" }}
        >
          Charters
        </p>

        {/* Tagline */}
        <p className="font-body text-white/55 text-base md:text-lg mb-10 animate-fade-in-up [animation-delay:0.3s] leading-relaxed max-w-xs md:max-w-sm">
          Inshore. Every tide.
        </p>

        {/* Single CTA */}
        <div className="animate-fade-in-up [animation-delay:0.45s]">
          <Link
            href="#contact"
            className="inline-block px-10 py-4 bg-white text-navy font-heading text-[13px] tracking-[0.2em] uppercase hover:bg-gold transition-all duration-500 rounded shadow-2xl"
          >
            Book a Charter
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in-up [animation-delay:1s]">
          <p className="font-heading text-[10px] text-white/25 tracking-[0.3em] uppercase">
            Scroll
          </p>
          <div className="w-[1px] h-8 bg-gradient-to-b from-white/30 to-transparent animate-bounce" />
        </div>
      </div>
    </section>
  );
}
