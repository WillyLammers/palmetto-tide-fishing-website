const SITE_URL = "https://www.palmettotidecharters.com";
const BUSINESS_NAME = "Palmetto Tide Charters";
const PHONE = "+1-843-471-4767";
const EMAIL = "palmettotidecharters@gmail.com";
const LOGO = `${SITE_URL}/logos/palmetto-tide-logo.png`;
const HERO_IMAGE = `${SITE_URL}/images/hero/og-image.png`;
const GOOGLE_MAPS_CID = "https://www.google.com/maps?cid=11335332628536409892";
const INSTAGRAM = "https://www.instagram.com/palmettotidecharters/";

// Approximate Charleston Harbor coordinates — the charter departs Charleston.
const GEO = { latitude: 32.7765, longitude: -79.9311 };

const trips = [
  {
    id: "half-day-inshore",
    name: "Half Day Inshore Fishing Charter",
    description:
      "4-hour inshore fishing trip targeting redfish, speckled trout and flounder on the Charleston Lowcountry flats. Up to 6 anglers. All tackle, live bait and license included.",
    duration: "PT4H",
    price: "450",
    image: `${SITE_URL}/images/gallery/fishing-21.jpg`,
  },
  {
    id: "full-day-inshore",
    name: "Full Day Inshore Fishing Charter",
    description:
      "8-hour all-day inshore charter running Charleston Harbor and the surrounding barrier-island creeks. Up to 6 anglers. All tackle, live bait, cooler with water and ice included.",
    duration: "PT8H",
    price: "950",
    image: `${SITE_URL}/images/gallery/fishing-22.jpg`,
  },
  {
    id: "shark-fishing",
    name: "Charleston Shark Fishing Trip",
    description:
      "2-hour shark fishing trip on Charleston Harbor targeting blacktip, sharpnose, bonnethead and more. Scheduled around the tides. Up to 6 anglers. All tackle and bait included.",
    duration: "PT2H",
    price: "400",
    image: `${SITE_URL}/images/gallery/fishing-17.jpg`,
  },
  {
    id: "shark-tooth-hunting",
    name: "Charleston Shark Tooth Hunting Trip",
    description:
      "2-hour shark tooth hunting trip scheduled around low tide. Hunt fossilized shark teeth — including megalodon — on Charleston's tide-bared sandbars and banks. Perfect for kids and families. Up to 6 guests. Everything you find, you keep.",
    duration: "PT2H",
    price: "350",
    image: `${SITE_URL}/images/gallery/fishing-11.jpg`,
  },
];

/**
 * No aggregateRating or review markup here, deliberately.
 *
 * Google: "If the entity that's being reviewed controls the reviews about
 * itself, their pages that use LocalBusiness or any other type of Organization
 * structured data are ineligible for star review feature." Our own reviews on
 * our own site are exactly that case, so rating markup could never produce
 * stars and only leaves invalid structured data on the page.
 *
 * https://developers.google.com/search/docs/appearance/structured-data/review-snippet
 *
 * The reviews still render for humans in the Testimonials section.
 */
export default function StructuredData() {
  const localBusiness = {
    "@type": ["LocalBusiness", "TravelAgency"],
    "@id": `${SITE_URL}/#business`,
    name: BUSINESS_NAME,
    alternateName: "Palmetto Tide Fishing Charters",
    description:
      "Inshore fishing charters, shark fishing and shark tooth hunting trips in Charleston, South Carolina with Captain Joseph Christy, a Charleston native targeting redfish, speckled trout and flounder on the Lowcountry flats.",
    url: SITE_URL,
    telephone: PHONE,
    email: EMAIL,
    image: [HERO_IMAGE],
    logo: LOGO,
    priceRange: "$$",
    currenciesAccepted: "USD",
    paymentAccepted: "Cash, Credit Card, Venmo",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Charleston",
      addressRegion: "SC",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: GEO.latitude,
      longitude: GEO.longitude,
    },
    areaServed: [
      {
        "@type": "City",
        name: "Charleston",
        containedInPlace: {
          "@type": "State",
          name: "South Carolina",
        },
      },
      { "@type": "Place", name: "Mount Pleasant, SC" },
      { "@type": "Place", name: "Isle of Palms, SC" },
      { "@type": "Place", name: "Sullivan's Island, SC" },
      { "@type": "Place", name: "Folly Beach, SC" },
      { "@type": "Place", name: "James Island, SC" },
      { "@type": "Place", name: "Daniel Island, SC" },
      { "@type": "Place", name: "Charleston Harbor" },
      { "@type": "Place", name: "Lowcountry" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "05:00",
        closes: "20:00",
      },
    ],
    sameAs: [INSTAGRAM, GOOGLE_MAPS_CID],
    founder: { "@id": `${SITE_URL}/#captain` },
    employee: { "@id": `${SITE_URL}/#captain` },
    knowsAbout: [
      "Inshore fishing",
      "Shark tooth hunting",
      "Fossil shark teeth",
      "Saltwater fishing",
      "Light-tackle fishing",
      "Fly fishing",
      "Redfish",
      "Speckled trout",
      "Flounder",
      "Sheepshead",
      "Cobia",
      "Shark fishing",
      "Charleston Harbor",
      "Lowcountry tides",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Fishing Charter Trips",
      itemListElement: trips.map((t) => ({
        "@type": "Offer",
        "@id": `${SITE_URL}/#${t.id}`,
        name: t.name,
        description: t.description,
        price: t.price,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/#trips`,
        itemOffered: {
          "@type": "Service",
          serviceType: "Fishing Charter",
          name: t.name,
          description: t.description,
          image: t.image,
          provider: { "@id": `${SITE_URL}/#business` },
          areaServed: {
            "@type": "City",
            name: "Charleston, SC",
          },
        },
      })),
    },
    makesOffer: trips.map((t) => ({
      "@type": "Offer",
      name: t.name,
      price: t.price,
      priceCurrency: "USD",
    })),
    slogan: "Inshore. Every tide.",
  };

  const captain = {
    "@type": "Person",
    "@id": `${SITE_URL}/#captain`,
    name: "Captain Joseph Christy",
    givenName: "Joseph",
    familyName: "Christy",
    honorificPrefix: "Captain",
    jobTitle: "USCG-Licensed Fishing Charter Captain",
    description:
      "Charleston native and USCG-licensed charter captain. Joseph Christy has fished the creeks behind Mount Pleasant, Charleston Harbor and the barrier-island flats since he was ten years old.",
    image: `${SITE_URL}/images/about/about-me.jpeg`,
    worksFor: { "@id": `${SITE_URL}/#business` },
    nationality: { "@type": "Country", name: "United States" },
    birthPlace: {
      "@type": "Place",
      name: "Charleston, South Carolina",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Charleston",
        addressRegion: "SC",
        addressCountry: "US",
      },
    },
    homeLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Charleston",
        addressRegion: "SC",
        addressCountry: "US",
      },
    },
    knowsLanguage: "en",
    knowsAbout: [
      "Charleston inshore fishing",
      "Lowcountry tides",
      "Lowcountry back creeks",
      "Charleston Harbor fishing",
      "Charleston barrier-island flats",
      "Local Charleston fishing spots",
      "Redfish fishing",
      "Speckled trout fishing",
      "Flounder fishing",
      "Sheepshead fishing",
      "Inshore saltwater fishing",
    ],
  };

  const website = {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: BUSINESS_NAME,
    description:
      "Charleston, SC inshore fishing charters with Captain Joseph Christy.",
    publisher: { "@id": `${SITE_URL}/#business` },
    inLanguage: "en-US",
  };

  const webpage = {
    "@type": "WebPage",
    "@id": `${SITE_URL}/#webpage`,
    url: SITE_URL,
    name: "Palmetto Tide Charters | Charleston, SC Inshore Fishing Charters",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#business` },
    primaryImageOfPage: { "@id": `${SITE_URL}/#heroimage` },
    inLanguage: "en-US",
    breadcrumb: { "@id": `${SITE_URL}/#breadcrumb` },
  };

  const heroImage = {
    "@type": "ImageObject",
    "@id": `${SITE_URL}/#heroimage`,
    url: HERO_IMAGE,
    contentUrl: HERO_IMAGE,
    width: 1500,
    height: 843,
    caption: "Charleston inshore fishing at sunset with Palmetto Tide Charters",
  };

  const breadcrumb = {
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}/#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
    ],
  };

  const faq = {
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: [
      {
        "@type": "Question",
        name: "Where do Palmetto Tide Charters depart from?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "All charters depart from Charleston, South Carolina. Captain Joseph will confirm the exact dock location when you book based on the day's tide and target species.",
        },
      },
      {
        "@type": "Question",
        name: "What fish will we target on a Charleston inshore charter?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Inshore trips primarily target redfish, speckled trout and flounder, with seasonal opportunities for sheepshead, black drum and tarpon. Dedicated 2-hour shark fishing trips target blacktip, sharpnose, bonnethead and other Lowcountry sharks right in Charleston Harbor.",
        },
      },
      {
        "@type": "Question",
        name: "How many anglers can come on a trip?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Each charter is private and accommodates up to 6 anglers. Kids and beginners are always welcome.",
        },
      },
      {
        "@type": "Question",
        name: "What is included in the charter price?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "All rods, reels, tackle, live bait, and the South Carolina saltwater fishing license are included. Just bring sunscreen, sunglasses, a hat, snacks and drinks.",
        },
      },
      {
        "@type": "Question",
        name: "How do I book a Charleston fishing trip with Palmetto Tide Charters?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Call or text Captain Joseph directly at (843) 471-4767, or email palmettotidecharters@gmail.com to check availability and reserve your date.",
        },
      },
      {
        "@type": "Question",
        name: "Can we hunt for shark teeth in Charleston?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — Palmetto Tide Charters runs 2-hour shark tooth hunting trips scheduled around low tide, when Charleston's sandbars and banks are exposed. You can find fossilized teeth from megalodon, great white, tiger and other sharks, and everything you find is yours to keep. It is one of the best trips for kids and families.",
        },
      },
      {
        "@type": "Question",
        name: "What is the best time of year to fish in Charleston, SC?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Charleston offers year-round fishing. Spring and fall are peak for redfish and speckled trout, summer brings the most variety including tarpon and sharks, and winter is excellent for big redfish schools and sheepshead.",
        },
      },
    ],
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      localBusiness,
      captain,
      website,
      webpage,
      heroImage,
      breadcrumb,
      faq,
    ],
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
