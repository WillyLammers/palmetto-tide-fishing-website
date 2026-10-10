// Single source for every trip: the cards, the booking form and the schema.org
// offers all read from here, so a price change is one edit, not three.

/** Most guests on any one private charter. */
export const MAX_GUESTS = 6;

export type Trip = {
  id: string;
  title: string;
  duration: string;
  /** ISO 8601 duration for schema.org. */
  isoDuration?: string;
  /** Flat price for the whole group, unless perPerson is set. Omitted when Joseph quotes it on request. */
  price?: number;
  /** When the price covers only the first few people, and each one after that is extra. */
  perPerson?: { included: number; extra: number };
  tagline: string;
  includes: string[];
  photo: string;
  /** object-position for the 4:3 card crop of a portrait photo. */
  photoPosition: string;
  alt: string;
  /** Required for any photo that is not Joseph's own; shown in the footer. */
  photoCredit?: { author: string; source: string; license: string; licenseUrl: string };
  featured?: boolean;
  /** Spans the whole row under the fishing trips instead of taking one column. */
  wide?: boolean;
  /** schema.org serviceType; every trip but the cruise is a fishing charter. */
  serviceType?: string;
  schemaName: string;
  schemaDescription: string;
};

export const trips: Trip[] = [
  {
    id: "half-day",
    title: "Half Day Inshore",
    duration: "4 Hours",
    isoDuration: "PT4H",
    price: 500,
    perPerson: { included: 2, extra: 50 },
    tagline: "Redfish, trout & flounder on the Lowcountry flats.",
    includes: ["All tackle & live bait", "License covered"],
    photo: "/images/gallery/fishing-92.jpg",
    photoPosition: "50% 62%",
    alt: "Two guests laughing as they hold up a redfish on a Charleston half-day inshore charter",
    schemaName: "Half Day Inshore Fishing Charter",
    schemaDescription:
      "4-hour inshore fishing trip targeting redfish, speckled trout and flounder on the Charleston Lowcountry flats. All tackle, live bait and license included.",
  },
  {
    id: "full-day",
    title: "Full Day Inshore",
    duration: "6 Hours",
    isoDuration: "PT6H",
    price: 800,
    tagline: "All-day run through Charleston's best inshore spots.",
    includes: ["Up to 6 anglers", "All tackle & live bait", "Cooler with water & ice"],
    photo: "/images/gallery/fishing-93.jpg",
    photoPosition: "50% 60%",
    alt: "Angler holding a redfish at golden hour on a full-day Charleston inshore charter",
    featured: true,
    schemaName: "Full Day Inshore Fishing Charter",
    schemaDescription:
      "6-hour full-day inshore charter running Charleston Harbor and the surrounding barrier-island creeks. Up to 6 anglers. All tackle, live bait, cooler with water and ice included.",
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
    // A real beach haul of fossil shark teeth (a megalodon tooth plus a
    // handful of smaller ones) over the sand, licensed from Flickr. It is not
    // from one of Joseph's trips, so the alt text does not claim it is; swap in
    // his own photo of a day's finds when he has one, and drop photoCredit.
    photo: "/images/trips/shark-teeth-beach-haul.jpg",
    photoPosition: "15% 40%",
    alt: "A handful of fossil shark teeth, including a large megalodon tooth, held over the sand where they were found",
    photoCredit: {
      author: "Virginia State Parks staff",
      source: "https://www.flickr.com/photos/37922399@N05/36909053740",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    },
    schemaName: "Charleston Shark Tooth Hunting Trip",
    schemaDescription:
      "2-hour shark tooth hunting trip scheduled around low tide. Hunt fossilized shark teeth, including megalodon, on Charleston's tide-bared sandbars and banks. Perfect for kids and families. Up to 6 guests. Everything you find, you keep.",
  },
  {
    id: "harbor-cruise",
    title: "Harbor Cruise",
    duration: "Day or Sunset",
    // No price yet: the card says "Call for pricing" until Joseph sets one.
    tagline: "Spend the day or evening getting sunburnt and chasing the sunset falling behind the Charleston steeples.",
    includes: ["Up to 6 guests", "Just your group on the boat", "Bridge & steeple views"],
    photo: "/images/gallery/fishing-10.jpg",
    // x only matters in the narrow phone strip: it keeps the sun and a bridge tower in frame.
    photoPosition: "85% 72%",
    alt: "Friends wrapped in blankets on the bow at sunset, with the Ravenel Bridge behind them in Charleston Harbor",
    wide: true,
    serviceType: "Harbor Cruise",
    schemaName: "Charleston Harbor Cruise",
    schemaDescription:
      "Private cruise around Charleston Harbor by day or at sunset, with views of the Ravenel Bridge and the downtown steeples. Up to 6 guests.",
  },
];

export const tripById = (id: string) => trips.find((t) => t.id === id);

/** What the group pays for this many people, or null when the price is on request. */
export const tripTotal = (t: Trip, guests: number) =>
  t.price == null ? null : t.price + (t.perPerson ? Math.max(0, guests - t.perPerson.included) * t.perPerson.extra : 0);

/** The few words under the headline price on a trip card. */
export const priceBasis = (t: Trip) =>
  t.price == null ? "for pricing" : t.perPerson ? `for ${t.perPerson.included} people` : "for your group";

/** The card checklist, led by the extra-person terms when a trip has them. */
export const tripIncludes = (t: Trip) =>
  t.perPerson ? [`Up to ${MAX_GUESTS} anglers, $${t.perPerson.extra} each extra`, ...t.includes] : t.includes;

/** The full price terms in one sentence, or null for a flat-rate trip. */
export const priceTerms = (t: Trip) =>
  t.perPerson && t.price != null
    ? `$${t.price} for up to ${t.perPerson.included} people, plus $${t.perPerson.extra} for each additional person, up to ${MAX_GUESTS}.`
    : null;
