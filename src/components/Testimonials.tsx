"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { fallbackReviews, type Review } from "@/data/fallbackReviews";
import ReviewImages from "@/components/ReviewImages";

const GOOGLE_REVIEWS_URL = "https://www.google.com/maps?cid=11335332628536409892";
const AUTO_ADVANCE_MS = 6000;
const CARDS_VISIBLE = 3;

function StarRow({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-white border border-black/[0.06] shadow-sm rounded-xl p-7 flex flex-col gap-4 h-full">
      <div className="flex items-start justify-between">
        <StarRow count={review.rating} />
        {review.date && (
          <span className="font-body text-slate-light text-xs flex-shrink-0 ml-2">{review.date}</span>
        )}
      </div>

      <p className="font-body text-slate leading-[1.75] text-sm flex-1">
        &ldquo;{review.review}&rdquo;
      </p>

      {review.images && review.images.length > 0 && (
        <ReviewImages images={review.images} alt={`${review.name}'s fishing trip`} />
      )}

      <div className="flex items-center gap-3 pt-4 border-t border-black/[0.06]">
        {review.avatarUrl ? (
          <img
            src={review.avatarUrl}
            alt=""
            referrerPolicy="no-referrer"
            className="w-9 h-9 rounded-full object-cover flex-shrink-0"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-ocean to-ocean-dark flex items-center justify-center flex-shrink-0">
            <span className="font-heading text-white text-sm font-bold">
              {review.name[0].toUpperCase()}
            </span>
          </div>
        )}
        <div>
          <p className="font-heading text-navy text-sm tracking-wide">{review.name}</p>
          <p className="font-body text-slate-light text-xs">Google Review</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const [reviews, setReviews] = useState<Review[]>(fallbackReviews);
  const [aggregateRating, setAggregateRating] = useState<number>(5.0);
  const [totalReviewCount, setTotalReviewCount] = useState<number | null>(null);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  // fading: cross-fade when changing slides
  const [fading, setFading] = useState(false);
  const pendingIndex = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    fetch("/api/reviews")
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (data?.reviews?.length) setReviews(data.reviews);
        if (data?.aggregateRating) setAggregateRating(data.aggregateRating);
        if (data?.totalReviewCount) setTotalReviewCount(data.totalReviewCount);
      })
      .catch(() => {});
  }, []);

  // Smooth fade transition
  const goTo = useCallback((idx: number) => {
    setFading(true);
    pendingIndex.current = idx;
  }, []);

  useEffect(() => {
    if (!fading) return;
    const t = setTimeout(() => {
      if (pendingIndex.current !== null) {
        setCurrent(pendingIndex.current);
        pendingIndex.current = null;
      }
      setFading(false);
    }, 250);
    return () => clearTimeout(t);
  }, [fading]);

  const prev = useCallback(() => {
    setPaused(true);
    goTo((current - 1 + reviews.length) % reviews.length);
  }, [current, reviews.length, goTo]);

  const next = useCallback(() => {
    setPaused(true);
    goTo((current + 1) % reviews.length);
  }, [current, reviews.length, goTo]);

  // Auto-advance
  useEffect(() => {
    if (paused || reviews.length <= CARDS_VISIBLE) return;
    const timer = setInterval(() => {
      goTo((current + 1) % reviews.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [paused, current, reviews.length, goTo]);

  const visibleIndices = Array.from(
    { length: Math.min(CARDS_VISIBLE, reviews.length) },
    (_, i) => (current + i) % reviews.length
  );

  return (
    <section ref={sectionRef} className="relative py-28 md:py-40 bg-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-ocean/40" />
            <p className="font-heading text-ocean tracking-[0.3em] uppercase text-xs">Google Reviews</p>
            <div className="w-8 h-[1px] bg-ocean/40" />
          </div>
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-navy uppercase tracking-wide mb-8">
            What Guests Say
          </h2>

          <Link
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 bg-navy/5 hover:bg-navy/10 border border-navy/10 hover:border-gold/50 rounded-2xl px-8 py-4 transition-all duration-300"
          >
            <span className="font-heading text-4xl font-bold text-navy">{aggregateRating.toFixed(1)}</span>
            <div className="flex flex-col items-start gap-1">
              <StarRow />
              <span className="font-body text-slate text-xs tracking-wider">
                {totalReviewCount ? `${totalReviewCount} reviews on Google` : "5-star rated on Google"}
              </span>
            </div>
            <svg className="w-5 h-5 ml-2 flex-shrink-0" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          </Link>
        </div>

        {/* Slideshow */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const diff = touchStartX.current - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
            touchStartX.current = null;
          }}
        >
          {/* Cards — fade on transition */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-[250ms]"
            style={{ opacity: fading ? 0 : 1, height: "420px" }}
          >
            {visibleIndices.map((idx, slot) => (
              <div key={`slot-${slot}`} className="h-full overflow-hidden">
                <ReviewCard review={reviews[idx]} />
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-10">
            <div className="flex gap-3">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-black/15 text-slate hover:border-gold hover:text-gold flex items-center justify-center transition-all duration-300"
                aria-label="Previous"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full border border-black/15 text-slate hover:border-gold hover:text-gold flex items-center justify-center transition-all duration-300"
                aria-label="Next"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="flex gap-2 items-center">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setPaused(true); goTo(i); }}
                  aria-label={`Review ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-6 h-1.5 bg-gold"
                      : "w-1.5 h-1.5 bg-black/15 hover:bg-black/30"
                  }`}
                />
              ))}
            </div>

            <Link
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-heading text-[11px] tracking-[0.2em] uppercase text-slate-light hover:text-ocean transition-colors duration-300"
            >
              All reviews
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
