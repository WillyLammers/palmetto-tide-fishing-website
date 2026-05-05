"use client";

import { useState, useEffect, useCallback } from "react";

type Props = {
  images: string[];
  alt: string;
  max?: number;
};

export default function ReviewImages({ images, alt, max = 3 }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  if (!images?.length) return null;

  const shown = images.slice(0, max);
  const isOpen = openIndex !== null;

  const prev = useCallback(() =>
    setOpenIndex((i) => (i == null ? i : (i - 1 + images.length) % images.length)), [images.length]);
  const next = useCallback(() =>
    setOpenIndex((i) => (i == null ? i : (i + 1) % images.length)), [images.length]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, prev, next]);

  return (
    <>
      <div className={`grid gap-1.5 ${shown.length === 1 ? "grid-cols-1" : "grid-cols-3"}`}>
        {shown.map((src, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="relative aspect-square overflow-hidden rounded-md bg-white/5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            aria-label={`Open photo ${i + 1}`}
          >
            <img
              src={src}
              alt={`${alt} photo ${i + 1}`}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
              <svg className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </div>
            {/* +N overlay on last shown image */}
            {i === max - 1 && images.length > max && (
              <div className="absolute inset-0 bg-black/55 flex items-center justify-center pointer-events-none">
                <span className="font-heading text-white text-sm font-bold">+{images.length - max}</span>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setOpenIndex(null)}
        >
          <div
            className="relative max-w-4xl w-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[openIndex!]}
              alt={alt}
              referrerPolicy="no-referrer"
              className="max-h-[85vh] w-auto rounded-lg shadow-2xl object-contain"
            />

            {/* Close */}
            <button
              onClick={() => setOpenIndex(null)}
              className="absolute top-2 right-2 w-10 h-10 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black transition-colors"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                  aria-label="Previous"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={next}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                  aria-label="Next"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white/80 text-sm bg-black/50 rounded-full px-3 py-1 font-body">
                  {openIndex! + 1} / {images.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
