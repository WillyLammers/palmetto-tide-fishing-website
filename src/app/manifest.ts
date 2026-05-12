import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Palmetto Tide Charters",
    short_name: "Palmetto Tide",
    description:
      "Charleston, SC inshore fishing charters with Captain Joseph Christy.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a2540",
    theme_color: "#0a2540",
    orientation: "portrait",
    icons: [
      {
        src: "/app/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    categories: ["travel", "sports", "lifestyle"],
    lang: "en-US",
  };
}
