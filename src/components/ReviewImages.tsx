"use client";

import { useState } from "react";
import Lightbox from "./Lightbox";

type Props = {
  images: string[];
  alt: string;
  max?: number;
};

export default function ReviewImages({ images, alt, max = 3 }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  // Google review photo URLs are signed and can expire; drop any that fail
  // rather than leave a broken-image icon on the card.
  const [failed, setFailed] = useState<string[]>([]);
  const ok = (images ?? []).filter((src) => !failed.includes(src));
  if (!ok.length) return null;

  const shown = ok.slice(0, max);

  return (
    <>
      <div className="grid grid-cols-3 gap-1.5">
        {shown.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="relative aspect-square overflow-hidden rounded-md bg-navy/5 group"
            aria-label={`Open ${alt} photo ${i + 1} of ${ok.length}`}
          >
            {/* Google-hosted review photo: shown as-is rather than proxied. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              onError={() => setFailed((f) => [...f, src])}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {i === max - 1 && ok.length > max && (
              <span className="absolute inset-0 bg-black/55 flex items-center justify-center font-heading text-white text-sm font-bold">
                +{ok.length - max}
              </span>
            )}
          </button>
        ))}
      </div>

      <Lightbox
        photos={ok.map((src, i) => ({ src, alt: `${alt}, photo ${i + 1}` }))}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onIndexChange={setOpenIndex}
        external
      />
    </>
  );
}
