// Single source for every trip: the cards, the booking form and the schema.org
// offers all read from here, so a price change is one edit, not three.
//
// Trips come in two kinds, and each gets its own section of the page: fishing
// charters, and cruises & outings for people who came for the water rather than
// the fish. A cruise with no price set shows "Call for pricing" everywhere,
// never an invented number.

/** Most guests on any one private charter. */
export const MAX_GUESTS = 6;

export type TripKind = "fishing" | "cruise";

export type Trip = {
  id: string;
  kind: TripKind;
  title: string;
  /** The short label on the photo: a length for fishing, the when or where for a cruise. */
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
  schemaName: string;
  schemaDescription: string;
};

export const trips: Trip[] = [
  {
    id: "half-day",
    kind: "fishing",
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
    kind: "fishing",
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
    kind: "fishing",
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
    kind: "fishing",
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
    kind: "cruise",
    title: "Harbor Cruise",
    duration: "Day or Sunset",
    tagline: "Spend the day or evening getting sunburnt and chasing the sunset falling behind the Charleston steeples.",
    includes: ["Up to 6 guests", "Just your group on the boat", "Bridge & steeple views"],
    photo: "/images/gallery/fishing-10.jpg",
    // x only matters in the narrow phone strip: it keeps the sun and a bridge tower in frame.
    photoPosition: "85% 72%",
    alt: "Friends wrapped in blankets on the bow at sunset, with the Ravenel Bridge behind them in Charleston Harbor",
    schemaName: "Charleston Harbor & Sunset Cruise",
    schemaDescription:
      "Private cruise around Charleston Harbor by day or at sunset, with views of the Ravenel Bridge and the downtown steeples. Up to 6 guests.",
  },
  {
    id: "sandbar-day",
    kind: "cruise",
    title: "Sandbar Day",
    duration: "Low Tide",
    tagline: "Anchor up on a sandbar when the tide drops, then swim, wade and soak up the sun with your crew.",
    includes: ["Up to 6 guests", "Made for groups & celebrations", "Scheduled around the tides"],
    // Licensed, and from Florida rather than one of Joseph's trips, so the alt
    // text names no place. Swap in his own sandbar photo when he has one.
    photo: "/images/trips/sandbar-low-tide.jpg",
    photoPosition: "50% 50%",
    alt: "Two friends with paddleboards on a sandbar at low tide, with the salt marsh behind them",
    photoCredit: {
      author: "pburka",
      source: "https://www.flickr.com/photos/30047235@N03/54419502447",
      license: "CC BY-SA 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
    },
    schemaName: "Charleston Sandbar Boat Trip",
    schemaDescription:
      "Private boat trip to a Lowcountry sandbar near Charleston, timed for low tide, for swimming, wading and time in the sun. Up to 6 guests.",
  },
  {
    id: "dolphin-eco-tour",
    kind: "cruise",
    title: "Dolphin & Eco Tour",
    duration: "Marsh & Creeks",
    tagline: "Bottlenose dolphins, pelicans and the salt marsh up close, in the tidal creeks around Charleston.",
    includes: ["Up to 6 guests", "Great for kids & families", "Wildlife of the Lowcountry"],
    photo: "/images/trips/dolphins-morris-island-light.jpg",
    // y keeps the lighthouse and both fins in the 4:3 crop; x keeps both fins
    // in the narrow phone strip.
    photoPosition: "40% 30%",
    alt: "Two dolphin fins breaking the water in front of the Morris Island Lighthouse near Charleston",
    photoCredit: {
      author: "harryalverson",
      source: "https://www.flickr.com/photos/72918555@N00/7377454516",
      license: "CC BY-SA 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
    },
    schemaName: "Charleston Dolphin & Eco Tour",
    schemaDescription:
      "Private dolphin watching and eco tour through the tidal creeks and salt marsh around Charleston. Bottlenose dolphins, shorebirds and Lowcountry wildlife. Up to 6 guests.",
  },
  {
    id: "history-cruise",
    kind: "cruise",
    title: "History Cruise",
    duration: "Fort Sumter",
    tagline: "Fort Sumter, the Battery and three and a half centuries of Charleston, seen from the water with a captain born and raised here.",
    includes: ["Up to 6 guests", "Fort Sumter & the Battery", "Charleston stories from a local"],
    photo: "/images/trips/fort-sumter-aerial.jpg",
    // Wide photo: 60% keeps the fort and its pier in the card and centres the
    // fort in the narrow phone strip.
    photoPosition: "60% 50%",
    alt: "Fort Sumter from the air, on its island at the mouth of Charleston Harbor",
    photoCredit: {
      author: "Methaz",
      source: "https://commons.wikimedia.org/w/index.php?curid=27848330",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    },
    schemaName: "Charleston Harbor History Cruise",
    schemaDescription:
      "Private history cruise of Charleston Harbor past Fort Sumter, the Battery and the historic waterfront, with a Charleston-born captain. Up to 6 guests.",
  },
];

export const tripById = (id: string) => trips.find((t) => t.id === id);

export const tripsOfKind = (kind: TripKind) => trips.filter((t) => t.kind === kind);

export const kindLabels: Record<TripKind, string> = {
  fishing: "Fishing Charters",
  cruise: "Cruises & Outings",
};

/**
 * What people book a cruise for. Tapping one adds its note to the booking
 * text, so Joseph knows what the group is celebrating before he replies.
 */
export const occasions = [
  { label: "Bachelorette parties", note: "We're planning a bachelorette party." },
  { label: "Birthdays", note: "We're celebrating a birthday." },
  { label: "Family trips", note: "It's a family trip." },
  { label: "Anniversaries", note: "We're celebrating an anniversary." },
  { label: "Proposals", note: "I'm planning a proposal." },
  { label: "Friends in town", note: "We have friends visiting from out of town." },
];

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
