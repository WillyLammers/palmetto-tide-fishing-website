import Image from "next/image";
import HeroVideo from "./HeroVideo";
import { Stars } from "./icons";
import { btn } from "./ui";

export default function Hero({
  aggregateRating = null,
  totalReviewCount = null,
}: {
  aggregateRating?: number | null;
  totalReviewCount?: number | null;
}) {
  return (
    // svh, not vh: on iPhone 100vh is the height with Safari's toolbar hidden,
    // which pushed the buttons under the toolbar on first load.
    <section id="home" className="relative min-h-[100svh] w-full overflow-hidden bg-navy">
      <div className="absolute inset-0 animate-slow-zoom">
        <Image
          src="/images/hero/hero.png"
          alt="Redfish held over the water on a Charleston inshore fishing charter"
          fill
          preload
          sizes="100vw"
          className="object-cover"
        />
        <HeroVideo />
      </div>

      {/* Heavier on the left and bottom where the text sits. */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/45 to-navy/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/10 to-navy/30" />

      <div className="relative z-10 min-h-[100svh] w-full max-w-7xl mx-auto flex flex-col justify-end px-6 sm:px-10 pt-32 pb-12 sm:pb-20 md:pb-28">
        <p className="font-heading text-white/80 text-[11px] sm:text-xs tracking-[0.25em] uppercase mb-4 animate-fade-in-up">
          Charleston, SC<span className="text-gold mx-2.5" aria-hidden="true">·</span>Born &amp; Raised
        </p>

        <h1
          className="font-heading font-bold text-white uppercase leading-[0.92] mb-3 animate-rise"
          style={{ fontSize: "clamp(3.25rem, 9vw, 7rem)" }}
        >
          Palmetto Tide
          <span
            className="block font-heading font-medium text-gold tracking-[0.35em] mt-3"
            style={{ fontSize: "clamp(1rem, 2.5vw, 1.75rem)" }}
          >
            Charters
          </span>
        </h1>

        <p className="font-body text-white/85 text-base sm:text-lg md:text-xl mt-3 mb-8 animate-fade-in-up [animation-delay:0.2s] leading-relaxed max-w-md">
          Private inshore fishing charters with Captain Joseph Christy. Redfish, trout, flounder and sharks. Inshore, every tide.
        </p>

        <div className="flex flex-col min-[420px]:flex-row gap-3 animate-fade-in-up [animation-delay:0.3s]">
          <a
            href="#contact"
            className={btn({ size: "lg" })}
          >
            Book a Trip
          </a>
          <a
            href="#trips"
            className={btn({ variant: "outlineLight", size: "lg", className: "backdrop-blur-sm" })}
          >
            Trips &amp; Prices
          </a>
        </div>

        <ul className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 font-body text-[13px] text-white/80 animate-fade-in-up [animation-delay:0.4s]">
          <li className="flex items-center gap-2">
            <Stars className="w-3.5 h-3.5" />
            <span>
              {aggregateRating && totalReviewCount
                ? `${aggregateRating.toFixed(1)} on Google · ${totalReviewCount} reviews`
                : "5-star rated on Google"}
            </span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-gold" aria-hidden="true" />
            USCG licensed captain
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-gold" aria-hidden="true" />
            Up to 6 guests, all gear included
          </li>
        </ul>
      </div>

      <a
        href="#trips"
        aria-label="Scroll to trips"
        className="hidden md:flex absolute bottom-8 right-10 lg:right-16 z-10 flex-col items-center gap-2 text-white/50 hover:text-white transition-colors animate-fade-in-up [animation-delay:1s]"
      >
        <span className="font-heading text-[10px] tracking-[0.3em] uppercase [writing-mode:vertical-rl]">Scroll</span>
        <span className="w-px h-10 bg-gradient-to-b from-white/50 to-transparent animate-bounce" />
      </a>
    </section>
  );
}
