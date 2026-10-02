// Single source for every trip: the cards, the booking form and the schema.org
// offers all read from here, so a price change is one edit, not three.

export type Trip = {
  id: string;
  title: string;
  duration: string;
  /** ISO 8601 duration for schema.org. */
  isoDuration: string;
  price: number;
  tagline: string;
  includes: string[];
  photo: string;
  /** object-position for the 4:3 card crop of a portrait photo. */
  photoPosition: string;
  alt: string;
  /** Required for any photo that is not Joseph's own; shown in the footer. */
  photoCredit?: { author: string; source: string; license: string; licenseUrl: string };
  featured?: boolean;
  schemaName: string;
  schemaDescription: string;
};

export const trips: Trip[] = [
  {
    id: "half-day",
    title: "Half Day Inshore",
    duration: "4 Hours",
    isoDuration: "PT4H",
    price: 450,
    tagline: "Redfish, trout & flounder on the Lowcountry flats.",
    includes: ["Up to 6 anglers", "All tackle & live bait", "License covered"],
    photo: "/images/gallery/fishing-92.jpg",
    photoPosition: "50% 62%",
    alt: "Two guests laughing as they hold up a redfish on a Charleston half-day inshore charter",
    schemaName: "Half Day Inshore Fishing Charter",
    schemaDescription:
      "4-hour inshore fishing trip targeting redfish, speckled trout and flounder on the Charleston Lowcountry flats. Up to 6 anglers. All tackle, live bait and license included.",
  },
  {
    id: "full-day",
    title: "Full Day Inshore",
    duration: "8 Hours",
    isoDuration: "PT8H",
    price: 950,
    tagline: "All-day run through Charleston's best inshore spots.",
    includes: ["Up to 6 anglers", "All tackle & live bait", "Cooler with water & ice"],
    photo: "/images/gallery/fishing-93.jpg",
    photoPosition: "50% 60%",
    alt: "Angler holding a redfish at golden hour on a full-day Charleston inshore charter",
    featured: true,
    schemaName: "Full Day Inshore Fishing Charter",
    schemaDescription:
      "8-hour all-day inshore charter running Charleston Harbor and the surrounding barrier-island creeks. Up to 6 anglers. All tackle, live bait, cooler with water and ice included.",
  },
  {
    id: "shark-fishing",
    title: "Shark Fishing",
    duration: "2 Hours",
    isoDuration: "PT2H",
    price: 400,
    tagline: "Hook into hard-fighting sharks right in Charleston Harbor.",
    includes: ["Up to 6 anglers", "All tackle & bait", "Scheduled around the tides"],
    photo: "/images/gallery/fishing-91.jpg",
    photoPosition: "50% 42%",
    alt: "Angler holding up a shark caught beneath the Ravenel Bridge in Charleston Harbor",
    schemaName: "Charleston Shark Fishing Trip",
    schemaDescription:
      "2-hour shark fishing trip on Charleston Harbor targeting blacktip, sharpnose, bonnethead and more. Scheduled around the tides. Up to 6 anglers. All tackle and bait included.",
  },
  {
    id: "shark-tooth-hunting",
    title: "Shark Tooth Hunting",
    duration: "2 Hours",
    isoDuration: "PT2H",
    price: 350,
    tagline: "Dig fossil shark teeth on tide-bared sandbars. Everything you find, you keep.",
    includes: ["Up to 6 guests", "Perfect for kids", "Scheduled around the tides"],
    // A real fossil tooth from the Chandler Bridge Formation outside
    // Charleston, licensed from Wikimedia Commons. Not from one of Joseph's
    // trips, so the alt text does not claim it is; swap in his own photo of a
    // day's finds when he has one, and drop photoCredit.
    photo: "/images/trips/shark-tooth-chandler-bridge-sc.jpg",
    photoPosition: "56% 50%",
    alt: "Fossil shark tooth from South Carolina's Chandler Bridge Formation, held between two fingers",
    photoCredit: {
      author: "Mason Hintermeister",
      source: "https://commons.wikimedia.org/wiki/File:Trigonotodus_alteri_lateral_tooth_(Oligocene,_Chandler_Bridge_FM,_SC).jpg",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    },
    schemaName: "Charleston Shark Tooth Hunting Trip",
    schemaDescription:
      "2-hour shark tooth hunting trip scheduled around low tide. Hunt fossilized shark teeth, including megalodon, on Charleston's tide-bared sandbars and banks. Perfect for kids and families. Up to 6 guests. Everything you find, you keep.",
  },
];

export const tripById = (id: string) => trips.find((t) => t.id === id);
