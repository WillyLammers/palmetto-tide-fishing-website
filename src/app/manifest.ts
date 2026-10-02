import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Palmetto Tide Charters",
    short_name: "Palmetto Tide",
    description:
      "Charleston, SC inshore fishing charters with Captain Joseph Christy.",
    start_url: "/",
    display: "standalone",
    background_color: "#04111d",
    theme_color: "#04111d",
    orientation: "portrait",
    icons: [
      {
        src: "/logos/palmetto-tide-logo.png",
        sizes: "500x500",
        type: "image/png",
        purpose: "any",
      },
    ],
    categories: ["travel", "sports", "lifestyle"],
    lang: "en-US",
  };
}
