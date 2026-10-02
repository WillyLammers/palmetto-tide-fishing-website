"use client";

import { useEffect, useState } from "react";
import { PHONE, PHONE_DISPLAY, smsHref } from "@/data/site";
import { PhoneIcon, TextIcon } from "./icons";

/**
 * Persistent call/text bar for mobile.
 *
 * Trips are booked by phone and text, so booking stays one tap away from the
 * moment a visitor scrolls past the hero.
 *
 * Hidden on the hero (which has its own call to action) and while the booking
 * section is on screen, so it never doubles up on a CTA already in view, and
 * hidden by CSS while the mobile menu is open (the menu has its own buttons).
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
      { threshold: 0.05 }
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
      className={`call-bar lg:hidden fixed inset-x-0 bottom-0 z-50 transition-[transform,visibility] duration-500 ease-out ${
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
          className="flex-1 flex items-center justify-center gap-2 min-h-[50px] rounded-lg bg-gold text-navy font-heading text-[13px] tracking-[0.2em] uppercase active:brightness-95 transition"
        >
          <PhoneIcon className="w-4 h-4" />
          Call
        </a>
        <a
          href={smsHref("Hi Captain Joseph, I'd like to book a fishing trip.")}
          aria-label={`Text Palmetto Tide Charters at ${PHONE_DISPLAY}`}
          className="flex-1 flex items-center justify-center gap-2 min-h-[50px] rounded-lg border border-white/30 text-white font-heading text-[13px] tracking-[0.2em] uppercase active:bg-white/10 transition"
        >
          <TextIcon className="w-4 h-4" />
          Text
        </a>
        <a
          href="#contact"
          className="flex-1 flex items-center justify-center min-h-[50px] rounded-lg bg-white text-navy font-heading text-[13px] tracking-[0.2em] uppercase active:brightness-95 transition"
        >
          Book
        </a>
      </div>
    </div>
  );
}
