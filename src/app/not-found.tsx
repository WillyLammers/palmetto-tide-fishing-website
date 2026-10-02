import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { PHONE, PHONE_DISPLAY } from "@/data/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main id="main" className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-navy px-6 py-24">
      <Image src="/images/gallery/fishing-10.jpg" alt="" fill sizes="100vw" className="object-cover opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/40 to-navy" />
      <div className="relative text-center max-w-md">
        <Image src="/logos/palmetto-tide-logo.png" alt="Palmetto Tide Charters" width={96} height={96} className="mx-auto mb-8 w-24 h-24" />
        <p className="font-heading text-gold tracking-[0.4em] uppercase text-xs mb-4">404</p>
        <h1 className="font-heading text-5xl font-bold text-white uppercase tracking-wide leading-none mb-5">This one got away</h1>
        <p className="font-body text-white/75 text-base leading-relaxed mb-10">
          The page you were looking for isn&apos;t here. The fishing still is.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 bg-gold text-navy font-heading text-[13px] tracking-[0.2em] uppercase rounded hover:bg-gold-light transition-colors"
          >
            Back to the site
          </Link>
          <a
            href={`tel:${PHONE}`}
            className="inline-flex items-center justify-center px-8 py-4 border border-white/35 text-white font-heading text-[13px] tracking-[0.2em] uppercase rounded hover:border-white transition-colors"
          >
            Call {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </main>
  );
}
