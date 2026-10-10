// Rendered in the visible FAQ section AND emitted as FAQPage markup. Google
// requires structured data to describe content a visitor can actually see, so
// the two must never diverge: edit the answer here and both update.

import { MAX_GUESTS, priceTerms, trips } from "./trips";

export type FaqItem = { q: string; a: string };

// Read from the trip data, so a price change cannot leave this answer behind.
const perPersonNote = trips
  .filter((t) => t.perPerson)
  .map((t) => ` Fishing prices are for the whole group, except the ${t.title}: ${priceTerms(t)}`)
  .join("");
const onRequestNote = trips.some((t) => t.price == null) ? " Cruise prices are quoted when you book." : "";

export const faqs: FaqItem[] = [
  {
    q: "Where do Palmetto Tide Charters depart from?",
    a: "All charters depart from Charleston, South Carolina. Captain Joseph will confirm the exact dock location when you book based on the day's tide and target species.",
  },
  {
    q: "What fish will we target on a Charleston inshore charter?",
    a: "Inshore trips primarily target redfish, speckled trout and flounder, with seasonal opportunities for sheepshead, black drum and tarpon. Dedicated 2-hour shark fishing trips target blacktip, sharpnose, bonnethead and other Lowcountry sharks right in Charleston Harbor.",
  },
  {
    q: "How many people can come on a trip?",
    a: `Every trip is private and takes up to ${MAX_GUESTS} people. Kids and beginners are always welcome.${perPersonNote}${onRequestNote}`,
  },
  {
    q: "Can we book a boat for a bachelorette party, birthday or family trip?",
    a: `Yes. Every trip is private, so it's just your group on the boat, up to ${MAX_GUESTS} people. The cruises and outings were made for exactly this: a sunset on the harbor, a sandbar day, dolphins or Fort Sumter. Tell Captain Joseph what you're celebrating when you text and he can help you pick.`,
  },
  {
    q: "What is included in the charter price?",
    a: "All rods, reels, tackle, live bait, and the South Carolina saltwater fishing license are included. Just bring sunscreen, sunglasses, a hat, snacks and drinks.",
  },
  {
    q: "Can we hunt for shark teeth in Charleston?",
    a: "Yes. Palmetto Tide Charters runs 2-hour shark tooth hunting trips scheduled around low tide, when Charleston's sandbars and banks are exposed. You can find fossilized teeth from megalodon, great white, tiger and other sharks, and everything you find is yours to keep. It is one of the best trips for kids and families.",
  },
  {
    q: "What is the best time of year to fish in Charleston, SC?",
    a: "Charleston offers year-round fishing. Spring and fall are peak for redfish and speckled trout, summer brings the most variety including tarpon and sharks, and winter is excellent for big redfish schools and sheepshead.",
  },
  {
    q: "Do you run charters on Sundays?",
    a: "No. Captain Joseph keeps Sunday as the Sabbath, so charters run Monday through Saturday, with morning and afternoon trips.",
  },
  {
    q: "How do I book a fishing charter or cruise with Palmetto Tide Charters?",
    a: "Call or text Captain Joseph directly at (843) 471-4767, or email palmettotidecharters@gmail.com to check availability and reserve your date.",
  },
];
