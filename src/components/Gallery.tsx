"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getImageProps } from "next/image";
import { galleryPhotos } from "@/data/gallery";
import Lightbox from "./Lightbox";
import { ChevronIcon, InstagramIcon } from "./icons";
import { INSTAGRAM_URL } from "@/data/site";

// Thumbnails are mounted in batches as the rail is scrolled. Rendering all 100+
// up front tripled the page's DOM and made hydration the slowest thing on a
// phone, for photos most visitors never scroll to. The viewer still pages
// through every photo, because it reads the list, not the DOM.
const BATCH = 24;

// Plain <img> props computed once at module load: identical output to
// next/image, without a stateful component per thumbnail to hydrate.
const thumbs = galleryPhotos.map((p, i) => {
  const { props } = getImageProps({
    src: p.src,
    alt: p.alt,
    width: p.width,
    height: p.height,
    sizes: "(min-width: 1024px) 220px, (min-width: 640px) 190px, 160px",
  });
  return { ...p, i, props };
});

export default function Gallery() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(BATCH);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setCanLeft(el.scrollLeft > 4);
        setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
      });
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Mount the next batch when the end of the rail comes within ~1.5 screens.
  useEffect(() => {
    const root = scrollerRef.current;
    const sentinel = sentinelRef.current;
    if (!root || !sentinel || count >= thumbs.length) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setCount((c) => Math.min(c + BATCH, thumbs.length)),
      { root, rootMargin: "0px 1200px 0px 0px" }
    );
    io.observe(sentinel);
    return () => io.disconnect();
  }, [count]);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const close = useCallback(() => setOpen(null), []);

  const shown = thumbs.slice(0, count);
  const rows = [shown.filter((_, i) => i % 2 === 0), shown.filter((_, i) => i % 2 === 1)];

  return (
    <section id="gallery" className="py-20 md:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-10 md:mb-12 reveal">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="section-line" />
              <p className="font-heading text-ocean tracking-[0.3em] uppercase text-xs">Fresh off the boat</p>
            </div>
            <h2 className="font-heading text-[2.75rem] sm:text-5xl md:text-6xl font-bold text-navy uppercase tracking-wide leading-none">
              Photo Gallery
            </h2>
          </div>
          <p className="font-body text-slate text-[15px] leading-relaxed max-w-md lg:max-w-sm lg:text-right">
            {galleryPhotos.length} real guests, real catches, newest first. Tap any photo to see it full size.
          </p>
        </div>
      </div>

      <div className="relative">
        <div
          ref={scrollerRef}
          className="rail-pad no-scrollbar overflow-x-auto overflow-y-hidden overscroll-x-contain snap-x snap-proximity pb-2"
          tabIndex={0}
          role="region"
          aria-label="Photo gallery, scrolls sideways"
        >
          <div className="flex items-stretch w-max">
            <div className="flex flex-col gap-3 md:gap-4">
              {rows.map((row, r) => (
                <ul key={r} className={`flex gap-3 md:gap-4 h-[210px] sm:h-[250px] lg:h-[290px] ${r === 1 ? "ml-14 md:ml-20" : ""}`}>
                  {row.map((p) => (
                    <li key={p.src} className="h-full shrink-0 snap-start" style={{ aspectRatio: `${p.width} / ${p.height}` }}>
                      <button
                        type="button"
                        onClick={() => setOpen(p.i)}
                        className="group relative block h-full w-full overflow-hidden rounded-lg bg-navy/10 shadow-md"
                        aria-label={`Open photo ${p.i + 1} of ${galleryPhotos.length}`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text -- getImageProps supplies src, srcSet and alt */}
                        <img
                          {...p.props}
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
            <div ref={sentinelRef} className="w-px shrink-0" aria-hidden="true" />
          </div>
        </div>

        <button
          type="button"
          aria-label="Scroll gallery left"
          onClick={() => scrollBy(-1)}
          className={`hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/95 backdrop-blur shadow-xl items-center justify-center text-navy hover:bg-gold transition-all duration-300 ${
            canLeft ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          tabIndex={canLeft ? 0 : -1}
        >
          <ChevronIcon dir="left" className="w-5 h-5" />
        </button>
        <button
          type="button"
          aria-label="Scroll gallery right"
          onClick={() => scrollBy(1)}
          className={`hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/95 backdrop-blur shadow-xl items-center justify-center text-navy hover:bg-gold transition-all duration-300 ${
            canRight ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          tabIndex={canRight ? 0 : -1}
        >
          <ChevronIcon className="w-5 h-5" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 mt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-heading text-[11px] tracking-[0.3em] uppercase text-slate">
          <span className="md:hidden">Swipe for more</span>
          <span className="hidden md:inline">Scroll or use the arrows</span>
        </p>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 rounded-full border border-navy/15 px-5 py-2.5 text-navy hover:border-ocean hover:text-ocean transition-colors"
        >
          <InstagramIcon className="w-4 h-4 shrink-0" />
          <span className="font-body text-sm whitespace-nowrap">More catches on Instagram</span>
        </a>
      </div>

      <Lightbox photos={galleryPhotos} index={open} onClose={close} onIndexChange={setOpen} />
    </section>
  );
}
