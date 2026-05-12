"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#trips", label: "Trips" },
    { href: "#gallery", label: "Gallery" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
        scrolled
          ? "py-2 bg-navy/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.3)] border-b border-white/5"
          : "py-3 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between">
        {/* Logo */}
        <Link href="#home" className="flex items-center group">
          <Image
            src="/logos/palmetto-tide-logo.png"
            alt="Palmetto Tide Charters"
            width={140}
            height={140}
            className="h-20 w-20 md:h-[110px] md:w-[110px] lg:h-[140px] lg:w-[140px] object-contain drop-shadow-[0_2px_12px_rgba(255,255,255,0.3)]"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative font-heading text-[13px] text-white/70 hover:text-white tracking-[0.2em] uppercase transition-colors duration-300 after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-gold after:transition-all after:duration-500 hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#contact"
            className="ml-6 px-7 py-2.5 border border-white/30 text-white font-heading text-[13px] tracking-[0.2em] uppercase hover:border-gold hover:text-gold transition-all duration-400 rounded"
          >
            Book Now
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-white p-2 relative w-10 h-10 flex items-center justify-center"
          aria-label="Toggle menu"
        >
          <div className="w-6 flex flex-col items-end gap-[6px]">
            <span
              className={`block h-[1.5px] bg-white transition-all duration-500 ease-out origin-center ${
                mobileOpen ? "w-6 rotate-45 translate-y-[7.5px]" : "w-6"
              }`}
            />
            <span
              className={`block h-[1.5px] bg-white transition-all duration-300 ${
                mobileOpen ? "opacity-0 w-0" : "opacity-100 w-4"
              }`}
            />
            <span
              className={`block h-[1.5px] bg-white transition-all duration-500 ease-out origin-center ${
                mobileOpen ? "w-6 -rotate-45 -translate-y-[7.5px]" : "w-6"
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-700 ease-out overflow-hidden ${
          mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="bg-navy/95 backdrop-blur-xl border-t border-white/5 px-6 py-8 flex flex-col gap-5">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-heading text-[15px] text-white/70 hover:text-gold tracking-[0.2em] uppercase transition-all duration-300"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="mt-4 px-7 py-3 border border-white/30 text-white font-heading text-[13px] tracking-[0.2em] uppercase transition-all duration-400 rounded text-center hover:border-gold hover:text-gold"
          >
            Book Now
          </Link>
        </nav>
      </div>
    </header>
  );
}
