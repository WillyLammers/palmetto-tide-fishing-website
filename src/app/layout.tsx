import type { Metadata } from "next";
import { Oswald, Lato } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.palmettotidecharters.com"),
  title: "Palmetto Tide Charters | Charleston Inshore Fishing",
  description:
    "Premium inshore fishing charters in Charleston, SC with Captain Joseph Christy. Book your unforgettable fishing experience on the waters of the Lowcountry.",
  keywords: [
    "Charleston fishing charters",
    "inshore fishing Charleston SC",
    "Palmetto Tide Charters",
    "Captain Joseph Christy",
    "Lowcountry fishing",
  ],
  openGraph: {
    title: "Palmetto Tide Charters | Charleston Inshore Fishing",
    description:
      "Premium inshore fishing charters in Charleston, SC with Captain Joseph Christy.",
    images: [{ url: "/images/hero/og-image.png", width: 1500, height: 843 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/hero/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${oswald.variable} ${lato.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
