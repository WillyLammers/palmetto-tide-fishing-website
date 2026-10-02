"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { PHONE, PHONE_DISPLAY, INSTAGRAM_URL, INSTAGRAM_HANDLE, smsHref } from "@/data/site";
import { PhoneIcon, TextIcon } from "@/components/icons";
import { lockScroll } from "@/lib/scrollLock";
import { btn } from "./ui";

const navLinks = [
  { href: "#trips", label: "Trips" },
  { href: "#about", label: "Captain" },
  { href: "#reviews", label: "Reviews" },
  { href: "#gallery", label: "Gallery" },
  { href: "#faq", label: "FAQ" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scrollspy: underline the section currently in the middle of the screen.
  useEffect(() => {
    const ids = [...navLinks.map((l) => l.href.slice(1)), "contact"];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const close = useCallback(() => setOpen(false), []);

  // While the menu is open: lock scroll, make the page behind it inert so Tab
  // cannot wander into content hidden under the overlay, close on Escape, and
  // return focus to the toggle afterwards.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const behind = [...document.querySelectorAll<HTMLElement>("main, body > footer")];
    const unlock = lockScroll();
    root.setAttribute("data-menu", "open");
    behind.forEach((el) => el.setAttribute("inert", ""));
    // Next frame: the menu's visibility has to have taken effect before it can
    // take focus, and in the same task as the click it has not.
    const frame = requestAnimationFrame(() => menuRef.current?.querySelector<HTMLElement>("a")?.focus());
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      unlock();
      root.removeAttribute("data-menu");
      behind.forEach((el) => el.removeAttribute("inert"));
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:bg-white focus:text-navy focus:px-4 focus:py-2 focus:rounded font-heading text-sm tracking-widest uppercase"
      >
        Skip to content
      </a>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-[background-color,box-shadow,padding] duration-500 ease-out ${
          solid
            ? "bg-navy/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.3)] py-2"
            : "bg-gradient-to-b from-navy/60 to-transparent py-3 lg:py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-4">
          <a href="#home" onClick={close} className="flex items-center shrink-0" aria-label="Palmetto Tide Charters, back to top">
            <Image
              src="/logos/palmetto-tide-logo.png"
              alt=""
              width={140}
              height={140}
              loading="eager"
              sizes="(min-width: 1024px) 120px, 80px"
              className={`object-contain transition-[width,height] duration-500 ease-out ${
                solid ? "h-12 w-12 lg:h-14 lg:w-14" : "h-16 w-16 md:h-20 md:w-20 lg:h-[112px] lg:w-[112px]"
              }`}
            />
          </a>

          {/* Desktop nav */}
          <nav aria-label="Main" className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navLinks.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "location" : undefined}
                  className={`relative font-heading text-[13px] tracking-[0.2em] uppercase transition-colors duration-300 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-gold after:transition-all after:duration-500 ${
                    isActive ? "text-white after:w-full" : "text-white/75 hover:text-white after:w-0 hover:after:w-full"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
            <a
              href={`tel:${PHONE}`}
              className="hidden xl:inline-flex items-center gap-2 font-heading text-[13px] tracking-[0.15em] text-white/85 hover:text-gold transition-colors"
            >
              <PhoneIcon className="w-3.5 h-3.5" />
              {PHONE_DISPLAY}
            </a>
            <a
              href="#contact"
              className={btn({ size: "sm", className: "px-5" })}
            >
              Book a Trip
            </a>
          </nav>

          <div className="lg:hidden flex items-center">
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="text-white w-11 h-11 -mr-1.5 flex items-center justify-center rounded"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <span className="w-6 flex flex-col items-end gap-[6px]" aria-hidden="true">
                <span className={`block h-[2px] bg-white rounded transition-all duration-500 ${open ? "w-6 rotate-45 translate-y-[8px]" : "w-6"}`} />
                <span className={`block h-[2px] bg-white rounded transition-all duration-300 ${open ? "opacity-0 w-0" : "opacity-100 w-4"}`} />
                <span className={`block h-[2px] bg-white rounded transition-all duration-500 ${open ? "w-6 -rotate-45 -translate-y-[8px]" : "w-6"}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu: full screen, so every target is large and nothing behind
          it competes for a tap. `inert` keeps it out of the tab order while closed. */}
      <div
        id="mobile-menu"
        ref={menuRef}
        inert={!open}
        // Visibility flips instantly on open, so focus() can land in the menu
        // in the same frame; it only transitions on close, to let the fade run.
        className={`lg:hidden fixed inset-0 z-40 bg-navy flex flex-col pt-24 pb-[calc(1.5rem+env(safe-area-inset-bottom))] px-6 duration-300 ${
          open ? "opacity-100 visible transition-opacity" : "opacity-0 invisible transition-[opacity,visibility]"
        }`}
      >
        <nav aria-label="Mobile" className="flex-1 flex flex-col justify-center gap-1 overflow-y-auto">
          {[{ href: "#home", label: "Home" }, ...navLinks].map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={close}
              className={`font-heading text-[32px] leading-tight text-white uppercase tracking-[0.08em] py-2 transition-[opacity,transform] duration-500 ${
                open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
              }`}
              style={{ transitionDelay: open ? `${80 + i * 45}ms` : "0ms" }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="space-y-3">
          <a
            href="#contact"
            onClick={close}
            className={btn({ variant: "light", size: "lg", className: "w-full" })}
          >
            Plan Your Trip
          </a>
          <div className="grid grid-cols-2 gap-3">
            <a
              href={`tel:${PHONE}`}
              className={btn({ size: "lg" })}
            >
              <PhoneIcon className="w-4 h-4" /> Call
            </a>
            <a
              href={smsHref("Hi Captain Joseph, I'd like to book a fishing trip.")}
              className={btn({ variant: "outlineLight", size: "lg" })}
            >
              <TextIcon className="w-4 h-4" /> Text
            </a>
          </div>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center pt-3 font-body text-sm text-white/60 hover:text-gold"
          >
            {INSTAGRAM_HANDLE} on Instagram
          </a>
        </div>
      </div>
    </>
  );
}
