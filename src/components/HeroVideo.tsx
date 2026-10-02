"use client";

import { useEffect, useState } from "react";

const MOBILE_SRC = "/videos/hero-mobile-v1.mp4";
const DESKTOP_SRC = "/videos/hero-720.mp4";

/**
 * Background video, attached only once the page has finished loading.
 *
 * The photo underneath paints first and the video fades in over it once it can
 * play, so the 1-3MB download never competes with the text, fonts and images a
 * visitor is actually waiting for. Skipped entirely for visitors who ask for
 * reduced motion or have Data Saver on, so they never download it.
 *
 * Exactly one file is chosen here rather than with <source media>: in testing
 * Chrome fetched both the phone and desktop files that way, which cost a phone
 * visitor 2.9MB instead of 1.3MB.
 *
 * Phones in portrait get a 9:16 centre crop (1.3MB) instead of the 16:9 file
 * (3.1MB): a portrait screen only ever showed the middle third of it anyway.
 * Filenames are versioned because /videos/* is served immutable for a year.
 */
export default function HeroVideo() {
  const [src, setSrc] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reduce || saveData) return;

    const pick = () =>
      setSrc(window.matchMedia("(max-width: 767px) and (orientation: portrait)").matches ? MOBILE_SRC : DESKTOP_SRC);

    // Safari has no requestIdleCallback; a short timeout after load is close enough.
    const hasIdle = typeof window.requestIdleCallback === "function";
    let handle: number | undefined;
    const start = () => {
      handle = hasIdle ? window.requestIdleCallback(pick, { timeout: 2000 }) : window.setTimeout(pick, 300);
    };

    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      window.removeEventListener("load", start);
      if (handle !== undefined) {
        if (hasIdle) window.cancelIdleCallback(handle);
        else window.clearTimeout(handle);
      }
    };
  }, []);

  if (!src) return null;

  return (
    <video
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      tabIndex={-1}
      onPlaying={() => setPlaying(true)}
      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${playing ? "opacity-100" : "opacity-0"}`}
    />
  );
}
