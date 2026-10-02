import type { Metadata, Viewport } from "next";
import { Oswald, Lato } from "next/font/google";
import "./globals.css";
import { SITE_URL, BUSINESS_NAME as SITE_NAME, OG_IMAGE } from "@/data/site";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const DEFAULT_TITLE =
  "Palmetto Tide Charters | Charleston, SC Inshore Fishing Charters";
const DEFAULT_DESCRIPTION =
  "Top-rated Charleston, SC inshore fishing charters with Captain Joseph Christy. Redfish, trout & flounder on the Lowcountry flats, plus shark fishing & shark tooth hunting trips. Book your Charleston fishing trip today.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | Palmetto Tide Charters",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Captain Joseph Christy", url: SITE_URL }],
  creator: "Palmetto Tide Charters",
  publisher: "Palmetto Tide Charters",
  generator: "Next.js",
  keywords: [
    "Charleston fishing charters",
    "Charleston SC fishing charters",
    "inshore fishing Charleston",
    "Charleston inshore fishing",
    "Lowcountry fishing charters",
    "redfish fishing Charleston",
    "speckled trout Charleston",
    "flounder fishing Charleston SC",
    "Charleston fishing guide",
    "Captain Joseph Christy",
    "Palmetto Tide Charters",
    "fishing charters near me Charleston",
    "Charleston Harbor fishing",
    "Mount Pleasant fishing charters",
    "Isle of Palms fishing charters",
    "Sullivan's Island fishing",
    "Folly Beach fishing charters",
    "James Island fishing",
    "shark fishing Charleston",
    "shark tooth hunting Charleston",
    "saltwater fishing Charleston SC",
    "family fishing trips Charleston",
    "private fishing charters Charleston",
    "best fishing guide Charleston",
    "book Charleston fishing trip",
    "Charleston native fishing guide",
    "local Charleston fishing charter",
    "born and raised Charleston fishing captain",
    "lifelong Charleston fisherman",
  ],
  category: "Travel",
  classification: "Fishing Charter",
  referrer: "origin-when-cross-origin",
  alternates: {
    canonical: SITE_URL,
  },
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Palmetto Tide Charters: Charleston SC inshore fishing charters with Captain Joseph Christy",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE],
  },
  other: {
    "geo.region": "US-SC",
    "geo.placename": "Charleston",
    "geo.position": "32.7765;-79.9311",
    ICBM: "32.7765, -79.9311",
  },
};

export const viewport: Viewport = {
  themeColor: "#04111d",
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US" className={`${oswald.variable} ${lato.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
