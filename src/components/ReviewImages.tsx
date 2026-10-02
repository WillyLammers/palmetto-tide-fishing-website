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
  if (!images?.length) return null;

  const shown = images.slice(0, max);

  return (
    <>
      <div className={`grid gap-1.5 ${shown.length === 1 ? "grid-cols-1" : "grid-cols-3"}`}>
        {shown.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="relative aspect-square overflow-hidden rounded-md bg-navy/5 group"
            aria-label={`Open ${alt} photo ${i + 1} of ${images.length}`}
          >
            {/* Google-hosted review photo: shown as-is rather than proxied. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {i === max - 1 && images.length > max && (
              <span className="absolute inset-0 bg-black/55 flex items-center justify-center font-heading text-white text-sm font-bold">
                +{images.length - max}
              </span>
            )}
          </button>
        ))}
      </div>

      <Lightbox
        photos={images.map((src, i) => ({ src, alt: `${alt}, photo ${i + 1}` }))}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onIndexChange={setOpenIndex}
        external
      />
    </>
  );
}
