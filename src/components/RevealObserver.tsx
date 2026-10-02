"use client";

import { useEffect } from "react";

/**
 * One observer for the whole page instead of one per section.
 *
 * Sections stay server components and simply carry `className="reveal"`; this
 * adds `.is-visible` as each scrolls into view. The hidden starting state lives
 * in globals.css behind `@media (scripting: enabled)`, so nothing is ever
 * invisible on a browser that will not run this.
 */
export default function RevealObserver() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
