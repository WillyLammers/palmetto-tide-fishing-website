"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { fallbackReviews, type Review } from "@/data/fallbackReviews";
import { GOOGLE_REVIEWS_URL, FISHINGBOOKER_URL } from "@/data/site";
import ReviewImages from "./ReviewImages";
import { ChevronIcon, GoogleIcon, Stars } from "./icons";
import { eyebrow } from "./ui";

// FishingBooker's own computed stats for this listing, quoted with attribution
// rather than restated as our own claim. Verified August 2026; they drift as
// trips are logged, so re-check the listing when updating this section.
const FB_CAUGHT_FISH = "94%";
const FB_RECOMMEND = "95%";
const FB_REVIEW_COUNT = 57;

const CLAMP_AT = 260; // characters before "Read more"

function ReviewCard({ review }: { review: Review }) {
  const [expanded, setExpanded] = useState(false);
  const [avatarFailed, setAvatarFailed] = useState(false);
  const long = review.review.length > CLAMP_AT;

  return (
    <article className="bg-white border border-black/[0.07] shadow-sm rounded-2xl p-6 sm:p-7 flex flex-col gap-4 h-full">
      <div className="flex items-center justify-between gap-3">
        <Stars count={review.rating} />
        {review.date && <span className="font-body text-slate-light text-xs">{review.date}</span>}
      </div>

      <blockquote className="font-body text-slate leading-[1.75] text-[15px]">
        <p className={long && !expanded ? "line-clamp-6" : undefined}>&ldquo;{review.review}&rdquo;</p>
        {long && (
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="mt-2 font-heading text-[11px] tracking-[0.2em] uppercase text-ocean hover:text-navy"
            aria-expanded={expanded}
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </blockquote>

      {review.images && review.images.length > 0 && (
        <ReviewImages images={review.images} alt={`${review.name}'s trip`} />
      )}

      <footer className="mt-auto flex items-center gap-3 pt-4 border-t border-black/[0.07]">
        {review.avatarUrl && !avatarFailed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={review.avatarUrl}
            alt=""
            referrerPolicy="no-referrer"
            loading="lazy"
            onError={() => setAvatarFailed(true)}
            className="w-10 h-10 rounded-full object-cover shrink-0"
          />
        ) : (
          <span className="w-10 h-10 rounded-full bg-gradient-to-br from-ocean to-ocean-dark flex items-center justify-center shrink-0 font-heading text-white text-sm font-bold" aria-hidden="true">
            {review.name[0]?.toUpperCase()}
          </span>
        )}
        <div className="min-w-0">
          <p className="font-heading text-navy text-[15px] tracking-wide truncate">{review.name}</p>
          <p className="font-body text-slate-light text-xs flex items-center gap-1.5">
            <GoogleIcon className="w-3 h-3" /> Google review
          </p>
        </div>
      </footer>
    </article>
  );
}

export default function Testimonials({
  reviews = fallbackReviews,
  aggregateRating = null,
  totalReviewCount = null,
}: {
  reviews?: Review[];
  /** Live Google average, or null when the scrape could not confirm one. */
  aggregateRating?: number | null;
  /** Live Google review count, or null when the scrape could not confirm one. */
  totalReviewCount?: number | null;
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [edges, setEdges] = useState({ start: true, end: false });

  // A native scroll-snap rail: swipe on phones, arrows or trackpad on desktop.
  // Position is read back from the scroll, so the dots never disagree with
  // what is on screen. No auto-advance: moving text out from under a reader is
  // an accessibility failure, and nobody needs it to move on its own.
  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0") : el.clientWidth;
    const atEnd = el.scrollLeft + el.clientWidth > el.scrollWidth - 8;
    // On wide screens the last cards can never snap to the start, so the end
    // of the rail counts as the last review.
    setActive(atEnd ? el.children.length - 1 : Math.round(el.scrollLeft / step));
    setEdges({ start: el.scrollLeft < 8, end: atEnd });
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    // Layout reads batched into the next frame, never inside the scroll event.
    let frame = requestAnimationFrame(sync);
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(sync);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sync]);

  const scrollToCard = (i: number) => {
    const el = trackRef.current;
    const card = el?.children[i] as HTMLElement | undefined;
    if (el && card) el.scrollTo({ left: card.offsetLeft - el.offsetLeft - parseFloat(getComputedStyle(el).paddingLeft), behavior: "smooth" });
  };

  const page = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: "smooth" });
  };

  return (
    <section id="reviews" className="relative py-20 md:py-32 bg-sand/40 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
        <div className="text-center mb-10 md:mb-14 reveal">
          <p className={`${eyebrow} text-ocean mb-4`}>Reviews</p>
          <h2 className="font-heading text-[2.75rem] sm:text-5xl md:text-6xl font-bold text-navy uppercase tracking-wide leading-none mb-8">
            What Guests Say
          </h2>

          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 bg-white hover:bg-white/80 border border-navy/10 hover:border-gold/60 rounded-2xl px-6 sm:px-8 py-4 shadow-sm transition-all duration-300"
          >
            <span className="font-heading text-4xl font-bold text-navy">{(aggregateRating ?? 5).toFixed(1)}</span>
            <span className="flex flex-col items-start gap-1">
              <Stars />
              <span className="font-body text-slate text-xs tracking-wider">
                {totalReviewCount ? `${totalReviewCount} reviews on Google` : "5-star rated on Google"}
              </span>
            </span>
            <GoogleIcon className="w-6 h-6 ml-1 shrink-0" />
          </a>

          {/* Corroboration from an independent booking platform. The catch rate
              answers the question people actually have before booking, which a
              star rating does not. */}
          <p className="mt-6 font-body text-slate text-sm leading-relaxed max-w-md mx-auto">
            <span className="font-heading text-navy font-bold">{FB_CAUGHT_FISH}</span> of anglers caught fish and{" "}
            <span className="font-heading text-navy font-bold">{FB_RECOMMEND}</span> recommend the trip, across{" "}
            {FB_REVIEW_COUNT} reviews on{" "}
            <a
              href={FISHINGBOOKER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ocean underline underline-offset-2 hover:text-navy transition-colors duration-300"
            >
              FishingBooker
            </a>
            .
          </p>
        </div>
      </div>

      <ul
        ref={trackRef}
        className="rail-pad no-scrollbar flex gap-4 md:gap-6 overflow-x-auto overscroll-x-contain snap-x snap-mandatory pb-2"
        aria-label="Guest reviews"
      >
        {reviews.map((r, i) => (
          <li
            key={`${r.name}-${i}`}
            className="snap-start shrink-0 w-[86%] sm:w-[calc((100%-1rem)/1.6)] md:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
          >
            <ReviewCard review={r} />
          </li>
        ))}
      </ul>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 mt-8 flex items-center justify-between gap-4">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => page(-1)}
            disabled={edges.start}
            className="w-11 h-11 rounded-full border border-navy/20 text-navy hover:border-gold hover:text-gold disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center transition-all"
            aria-label="Previous reviews"
          >
            <ChevronIcon dir="left" className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => page(1)}
            disabled={edges.end}
            className="w-11 h-11 rounded-full border border-navy/20 text-navy hover:border-gold hover:text-gold disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center transition-all"
            aria-label="Next reviews"
          >
            <ChevronIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Dots stop being readable past a handful; the live feed carries up to 20. */}
        <div className={`${reviews.length <= 8 ? "hidden sm:flex" : "hidden"} gap-1 items-center`} aria-hidden="true">
          {reviews.map((_, i) => (
            <button
              key={i}
              type="button"
              tabIndex={-1}
              onClick={() => scrollToCard(i)}
              className="p-1.5 group"
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  i === active ? "w-6 h-1.5 bg-gold" : "w-1.5 h-1.5 bg-navy/20 group-hover:bg-navy/40"
                }`}
              />
            </button>
          ))}
        </div>
        <p className={`${reviews.length <= 8 ? "sm:hidden" : ""} font-heading text-xs tracking-[0.2em] text-slate`} aria-hidden="true">
          {Math.min(active + 1, reviews.length)} / {reviews.length}
        </p>

        <a
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-heading text-[11px] tracking-[0.2em] uppercase text-slate hover:text-ocean transition-colors duration-300"
        >
          All reviews
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </section>
  );
}
