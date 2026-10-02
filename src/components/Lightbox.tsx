"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronIcon } from "./icons";
import { lockScroll } from "@/lib/scrollLock";

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
    restoreRef.current = document.activeElement as HTMLElement | null;
    const unlock = lockScroll();
    closeRef.current?.focus();
    return () => {
      unlock();
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
        // Keep focus inside the dialog, including when a click on the photo
        // has dropped focus back to <body>.
        const f = document.querySelectorAll<HTMLElement>("[data-lightbox] button");
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (!document.activeElement?.closest("[data-lightbox]")) {
          e.preventDefault();
          (e.shiftKey ? last : first).focus();
        } else if (e.shiftKey && document.activeElement === first) {
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

  // A Set, because with exactly two photos "previous" and "next" are the same one.
  const neighbours = count > 1 ? [...new Set([(index - 1 + count) % count, (index + 1) % count])] : [];

  // The <img> fills the whole stage (object-contain), so a tap in the black
  // letterbox beside the photo still lands on it. Only swallow taps that hit
  // the picture itself; anything else falls through to the backdrop and closes.
  const onPhotoClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (!img.naturalWidth) return e.stopPropagation();
    const r = img.getBoundingClientRect();
    const scale = Math.min(r.width / img.naturalWidth, r.height / img.naturalHeight);
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    const left = r.left + (r.width - w) / 2;
    const top = r.top + (r.height - h) / 2;
    if (e.clientX >= left && e.clientX <= left + w && e.clientY >= top && e.clientY <= top + h) e.stopPropagation();
  };

  return (
    <div
      data-lightbox
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} of ${count}`}
      className="fixed inset-0 z-[100] bg-black animate-fade-in select-none"
      onClick={onClose}
      // Single-finger gestures only: a second finger means pinch-zoom, which
      // must never be read as a swipe to the next photo.
      onTouchStart={(e) => {
        if (e.touches.length > 1) {
          touch.current = null;
          setDrag(0);
          return;
        }
        touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }}
      onTouchMove={(e) => {
        if (!touch.current || e.touches.length > 1) return;
        const dx = e.touches[0].clientX - touch.current.x;
        const dy = e.touches[0].clientY - touch.current.y;
        if (Math.abs(dx) > Math.abs(dy)) setDrag(dx);
      }}
      onTouchEnd={(e) => {
        if (!touch.current || e.touches.length > 0) return;
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
          onClick={onPhotoClick}
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
