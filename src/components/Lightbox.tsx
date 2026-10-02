"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronIcon } from "./icons";

export type LightboxPhoto = { src: string; alt: string };

/**
 * Full-screen photo viewer shared by the gallery and review photos.
 *
 * Swipe, arrow keys and on-screen buttons all navigate; Escape, the close
 * button or a tap on the backdrop closes it. Focus moves into the dialog on
 * open and back to whatever opened it on close. The two neighbouring photos
 * are rendered invisibly so the next swipe shows an image that is already
 * downloaded instead of a blank frame.
 *
 * `external` photos (Google review uploads) skip Next's optimizer, which would
 * otherwise need every googleusercontent host allow-listed.
 */
export default function Lightbox({
  photos,
  index,
  onClose,
  onIndexChange,
  external = false,
}: {
  photos: LightboxPhoto[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
  external?: boolean;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const [drag, setDrag] = useState(0);
  const count = photos.length;
  const open = index !== null && index >= 0 && index < count;

  const go = useCallback(
    (delta: number) => {
      if (index === null) return;
      onIndexChange((index + delta + count) % count);
    },
    [index, count, onIndexChange]
  );

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    restoreRef.current = document.activeElement as HTMLElement | null;
    root.setAttribute("data-lock", "");
    closeRef.current?.focus();
    return () => {
      root.removeAttribute("data-lock");
      restoreRef.current?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "Tab") {
        // Keep focus inside the dialog.
        const f = document.querySelectorAll<HTMLElement>("[data-lightbox] button");
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, go]);

  if (!open || index === null) return null;

  const neighbours = count > 1 ? [(index - 1 + count) % count, (index + 1) % count] : [];

  return (
    <div
      data-lightbox
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} of ${count}`}
      className="fixed inset-0 z-[100] bg-black animate-fade-in select-none"
      onClick={onClose}
      onTouchStart={(e) => {
        touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }}
      onTouchMove={(e) => {
        if (!touch.current) return;
        const dx = e.touches[0].clientX - touch.current.x;
        const dy = e.touches[0].clientY - touch.current.y;
        if (Math.abs(dx) > Math.abs(dy)) setDrag(dx);
      }}
      onTouchEnd={(e) => {
        if (!touch.current) return;
        const dx = e.changedTouches[0].clientX - touch.current.x;
        const dy = e.changedTouches[0].clientY - touch.current.y;
        touch.current = null;
        setDrag(0);
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
        else if (dy > 110 && Math.abs(dy) > Math.abs(dx)) onClose();
      }}
    >
      <div
        className="absolute inset-0 top-14 bottom-16 sm:inset-x-16 sm:top-16 sm:bottom-16"
        style={{ transform: drag ? `translateX(${drag}px)` : undefined, transition: drag ? "none" : "transform 200ms ease-out" }}
      >
        <Image
          key={photos[index].src}
          src={photos[index].src}
          alt={photos[index].alt}
          fill
          sizes="100vw"
          unoptimized={external}
          referrerPolicy={external ? "no-referrer" : undefined}
          loading="eager"
          className="object-contain animate-fade-in"
          onClick={(e) => e.stopPropagation()}
        />
        {neighbours.map((n) => (
          <Image
            key={`pre-${photos[n].src}`}
            src={photos[n].src}
            alt=""
            fill
            sizes="100vw"
            unoptimized={external}
            referrerPolicy={external ? "no-referrer" : undefined}
            loading="eager"
            className="object-contain opacity-0 pointer-events-none"
            aria-hidden="true"
          />
        ))}
      </div>

      <div className="absolute top-0 inset-x-0 h-14 flex items-center justify-between px-4 sm:px-6 text-white/80" onClick={(e) => e.stopPropagation()}>
        <p className="font-heading text-sm tracking-[0.2em]" aria-live="polite">
          {index + 1} <span className="text-white/40">/ {count}</span>
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="w-11 h-11 -mr-2 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
          aria-label="Close photo viewer"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {count > 1 && (
        <div className="absolute bottom-0 inset-x-0 h-16 flex items-center justify-center gap-6 sm:contents" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            onClick={() => go(-1)}
            className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors sm:absolute sm:left-4 sm:top-1/2 sm:-translate-y-1/2"
            aria-label="Previous photo"
          >
            <ChevronIcon dir="left" className="w-5 h-5" />
          </button>
          <p className="sm:hidden font-body text-xs text-white/50">Swipe to browse</p>
          <button
            type="button"
            onClick={() => go(1)}
            className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors sm:absolute sm:right-4 sm:top-1/2 sm:-translate-y-1/2"
            aria-label="Next photo"
          >
            <ChevronIcon className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
