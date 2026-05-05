"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const photos = [
  { src: "/images/gallery/fishing-24.jpg", span: "md:col-span-2 md:row-span-2" },
  { src: "/images/gallery/fishing-25.jpg", span: "" },
  { src: "/images/gallery/fishing-26.jpg", span: "" },
  { src: "/images/gallery/fishing-27.jpg", span: "" },
  { src: "/images/gallery/fishing-28.jpg", span: "md:row-span-2" },
  { src: "/images/gallery/fishing-29.jpg", span: "" },
  { src: "/images/gallery/fishing-30.jpg", span: "md:col-span-2" },
  { src: "/images/gallery/fishing-31.jpg", span: "" },
  { src: "/images/gallery/fishing-32.jpg", span: "" },
  { src: "/images/gallery/fishing-33.jpg", span: "md:col-span-2 md:row-span-2" },
  { src: "/images/gallery/fishing-34.jpg", span: "" },
  { src: "/images/gallery/fishing-35.jpg", span: "" },
  { src: "/images/gallery/fishing-36.jpg", span: "md:row-span-2" },
  { src: "/images/gallery/fishing-37.jpg", span: "" },
  { src: "/images/gallery/fishing-38.jpg", span: "md:col-span-2" },
  { src: "/images/gallery/fishing-39.jpg", span: "" },
  { src: "/images/gallery/fishing-40.jpg", span: "" },
  { src: "/images/gallery/fishing-41.jpg", span: "" },
  { src: "/images/gallery/fishing-42.jpg", span: "" },
  { src: "/images/gallery/fishing-43.jpg", span: "" },
  { src: "/images/gallery/fishing-44.jpg", span: "" },
  { src: "/images/gallery/fishing-45.jpg", span: "md:col-span-2" },
  { src: "/images/gallery/fishing-46.jpg", span: "" },
  { src: "/images/gallery/fishing-47.jpg", span: "" },
  { src: "/images/gallery/fishing-48.jpg", span: "" },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

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

  return (
    <section id="gallery" ref={sectionRef} className="py-28 md:py-40 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div
          className={`text-center mb-16 transition-all duration-[1.2s] cubic-bezier(0.16,1,0.3,1) ${
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 auto-rows-[180px] md:auto-rows-[220px]">
          {photos.map((photo, i) => (
            <div
              key={photo.src}
              className={`relative group overflow-hidden rounded-lg ${photo.span} transition-all duration-[1s] ${
                visible ? "opacity-100 scale-100" : "opacity-0 scale-[0.97]"
              }`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <Image
                src={photo.src}
                alt={`Palmetto Tide Charters fishing photo ${i + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/30 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
