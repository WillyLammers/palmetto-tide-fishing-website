import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first: roughly 20-30% smaller than WebP for these catch photos,
    // which matters with 100+ thumbnails in the gallery.
    formats: ["image/avif", "image/webp"],
    // Optimized variants are keyed by URL, and a photo is never edited in
    // place (new photos get new filenames), so cache them for a month.
    minimumCacheTTL: 2678400,
  },
};

export default nextConfig;
