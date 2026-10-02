import type { MetadataRoute } from "next";
import { SITE_URL, OG_IMAGE } from "@/data/site";
import { galleryPhotos } from "@/data/gallery";
import { trips } from "@/data/trips";

export default function sitemap(): MetadataRoute.Sitemap {
  // An image sitemap lets Google Images index the catch photos, which is
  // where a lot of "Charleston fishing charter" browsing actually starts.
  const images = [OG_IMAGE, ...trips.map((t) => t.photo), ...galleryPhotos.map((p) => p.src)];
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
      images: [...new Set(images)].map((src) => `${SITE_URL}${src}`),
    },
  ];
}
