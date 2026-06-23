"use client";

import { useEffect, useRef, useState } from "react";

const allPhotos = Array.from(
  { length: 43 },
  (_, i) => `/images/gallery/fishing-${24 + i}.jpg`
);
const topRow = allPhotos.filter((_, i) => i % 2 === 0);
const bottomRow = allPhotos.filter((_, i) => i % 2 === 1);

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const update = () => {
      setCanScrollLeft(el.scrollLeft > 4);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  return (
    <section id="gallery" ref={sectionRef} className="py-28 md:py-40 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div
          className={`text-center mb-16 transition-all duration-[1.2s] ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="section-line" />
            <p className="font-heading text-ocean tracking-[0.3em] uppercase text-xs">
              On the Water
            </p>
            <div className="section-line" />
          </div>
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-navy uppercase tracking-wide">
            Photo Gallery
          </h2>
        </div>
      </div>

      <div className="relative">
        <div
          ref={scrollerRef}
          className="overflow-x-auto overflow-y-hidden snap-x scroll-smooth px-6 md:px-12 lg:px-20 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex flex-col gap-3 md:gap-4">
            {[topRow, bottomRow].map((row, rowIdx) => (
              <div
                key={rowIdx}
                className="flex gap-3 md:gap-4 h-[34vh] max-h-[330px] min-h-[220px]"
                style={{ marginLeft: rowIdx === 1 ? "60px" : 0 }}
              >
                {row.map((src, i) => (
                  <div
                    key={src}
                    className={`relative shrink-0 snap-start rounded-lg overflow-hidden bg-navy/5 shadow-md transition-all duration-[900ms] ${
                      visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                    style={{ transitionDelay: `${Math.min((rowIdx * row.length + i) * 30, 600)}ms` }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={`Charleston SC inshore fishing trip with Palmetto Tide Charters — photo ${rowIdx * row.length + i + 1}`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-auto object-cover block"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          aria-label="Scroll gallery left"
          onClick={() => scrollBy(-1)}
          className={`hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/95 backdrop-blur shadow-xl items-center justify-center text-navy hover:bg-gold transition-all duration-300 ${
            canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Scroll gallery right"
          onClick={() => scrollBy(1)}
          className={`hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/95 backdrop-blur shadow-xl items-center justify-center text-navy hover:bg-gold transition-all duration-300 ${
            canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <p className="text-center mt-6 font-heading text-xs tracking-[0.3em] uppercase text-navy/40">
        Swipe to explore
      </p>
    </section>
  );
}
