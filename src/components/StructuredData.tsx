import { trips } from "@/data/trips";
import { faqs } from "@/data/faq";
import { galleryPhotos } from "@/data/gallery";
import {
  SITE_URL,
  BUSINESS_NAME,
  EMAIL,
  OG_IMAGE,
  GOOGLE_REVIEWS_URL as GOOGLE_MAPS_CID,
  INSTAGRAM_URL as INSTAGRAM,
  FISHINGBOOKER_URL,
} from "@/data/site";

const PHONE = "+1-843-471-4767";
const LOGO = `${SITE_URL}/logos/palmetto-tide-logo.png`;
const HERO_IMAGE = `${SITE_URL}${OG_IMAGE}`;

// Approximate Charleston Harbor coordinates — the charter departs Charleston.
const GEO = { latitude: 32.7765, longitude: -79.9311 };

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
    image: [HERO_IMAGE, ...galleryPhotos.slice(0, 6).map((p) => `${SITE_URL}${p.src}`)],
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
    sameAs: [INSTAGRAM, GOOGLE_MAPS_CID, FISHINGBOOKER_URL],
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
        name: t.schemaName,
        description: t.schemaDescription,
        price: String(t.price),
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/#trips`,
        itemOffered: {
          "@type": "Service",
          serviceType: "Fishing Charter",
          name: t.schemaName,
          description: t.schemaDescription,
          image: `${SITE_URL}${t.photo}`,
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
      name: t.schemaName,
      price: String(t.price),
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
    width: 1200,
    height: 630,
    caption: "Palmetto Tide Charters, Charleston SC inshore fishing charters with Captain Joseph Christy",
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
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
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
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}
