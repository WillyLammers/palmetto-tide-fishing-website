import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-navy pt-24 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="mb-6">
              <h3 className="font-heading text-xl font-bold text-white tracking-[0.2em] uppercase leading-none">
                Palmetto Tide
              </h3>
              <p className="font-heading text-[10px] text-gold tracking-[0.4em] uppercase mt-1">
                Fishing Charters
              </p>
            </div>
            <p className="font-body text-white/60 text-sm leading-[1.8] max-w-xs">
              Premium inshore fishing charters in Charleston, South Carolina.
              Creating unforgettable experiences on the waters of the
              Lowcountry.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="font-heading text-[11px] text-white/80 tracking-[0.25em] uppercase mb-6">
              Navigate
            </h4>
            <ul className="space-y-3">
              {["Home", "About", "Trips", "Gallery"].map((link) => (
                <li key={link}>
                  <Link
                    href={`#${link.toLowerCase()}`}
                    className="font-body text-white/55 text-sm hover:text-gold transition-colors duration-300"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h4 className="font-heading text-[11px] text-white/80 tracking-[0.25em] uppercase mb-6">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="tel:8434714767"
                  className="font-body text-white/55 text-sm hover:text-gold transition-colors duration-300"
                >
                  (843) 471-4767
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:palmettotidecharters@gmail.com"
                  className="font-body text-white/55 text-sm hover:text-gold transition-colors duration-300 break-all"
                >
                  palmettotidecharters@gmail.com
                </Link>
              </li>
              <li className="font-body text-white/55 text-sm">
                Charleston, South Carolina
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="lg:col-span-3">
            <h4 className="font-heading text-[11px] text-white/80 tracking-[0.25em] uppercase mb-6">
              Follow Along
            </h4>
            <Link
              href="https://www.instagram.com/palmettotidecharters/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 group"
            >
              <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center group-hover:border-gold/60 group-hover:bg-gold/5 transition-all duration-300">
                <svg className="w-4 h-4 text-white/60 group-hover:text-gold transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </div>
              <span className="font-body text-white/55 text-sm group-hover:text-gold transition-colors duration-300">
                @palmettotidecharters
              </span>
            </Link>

            <div className="mt-8">
              <p className="font-heading text-[11px] text-white/80 tracking-[0.25em] uppercase mb-3">
                Availability
              </p>
              <p className="font-body text-white/55 text-sm">7 Days a Week</p>
              <p className="font-body text-white/55 text-sm">Morning &amp; Afternoon Trips</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-body text-white/40 text-xs tracking-wider">
              &copy; {new Date().getFullYear()} Palmetto Tide Charters. All rights reserved.
            </p>
            <p className="font-body text-white/35 text-[11px] tracking-wider uppercase">
              Charleston, South Carolina
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
