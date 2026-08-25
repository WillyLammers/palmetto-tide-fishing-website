"use client";

import { useEffect, useState } from "react";

const PHONE = "8434714767";
const PHONE_DISPLAY = "(843) 471-4767";

/**
 * Persistent call/text bar for mobile.
 *
 * Trips are booked by phone and text, but the header's "Book Now" is
 * desktop-only and the number otherwise appears for the first time about 80%
 * of the way down the page. This keeps booking one tap away from the moment a
 * visitor scrolls past the hero.
 *
 * Hidden on the hero (which has its own call to action) and while the contact
 * section is on screen, so it never doubles up on a CTA already in view.
 */
export default function MobileCallBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let contactVisible = false;

    const update = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.6;
      setShow(pastHero && !contactVisible);
    };

    const contact = document.getElementById("contact");
    const observer = new IntersectionObserver(
      ([entry]) => {
        contactVisible = entry.isIntersecting;
        update();
      },
      { threshold: 0.25 }
    );
    if (contact) observer.observe(contact);

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      aria-hidden={!show}
      // `invisible` (not just pointer-events-none) is what actually takes the
      // links out of the tab order while the bar is off screen. Without it a
      // keyboard user could focus buttons they cannot see, and aria-hidden
      // wrapping focusable elements is an ARIA violation.
      className={`lg:hidden fixed inset-x-0 bottom-0 z-50 transition-[transform,visibility] duration-500 ease-out ${
        show ? "translate-y-0 visible" : "translate-y-full invisible pointer-events-none"
      }`}
    >
      <div
        className="flex gap-2.5 px-4 pt-3 bg-navy/95 backdrop-blur-md border-t border-white/10 shadow-[0_-4px_24px_rgba(0,0,0,0.35)]"
        style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
      >
        <a
          href={`tel:${PHONE}`}
          aria-label={`Call Palmetto Tide Charters at ${PHONE_DISPLAY}`}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-lg bg-gold text-navy font-heading text-[12px] tracking-[0.2em] uppercase active:brightness-95 transition"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.24.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z" />
          </svg>
          Call
        </a>
        <a
          href={`sms:${PHONE}`}
          aria-label={`Text Palmetto Tide Charters at ${PHONE_DISPLAY}`}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-lg border border-white/30 text-white font-heading text-[12px] tracking-[0.2em] uppercase active:bg-white/10 transition"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20 2H4a2 2 0 00-2 2v18l4-4h14a2 2 0 002-2V4a2 2 0 00-2-2z" />
          </svg>
          Text
        </a>
      </div>
    </div>
  );
}
