import CopyButton from "./CopyButton";
import { GoogleIcon, InstagramIcon } from "./icons";
import {
  EMAIL,
  FISHINGBOOKER_URL,
  GOOGLE_REVIEWS_URL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  PHONE,
  PHONE_DISPLAY,
} from "@/data/site";

const links = [
  { href: "#trips", label: "Trips & Prices" },
  { href: "#about", label: "Your Captain" },
  { href: "#reviews", label: "Reviews" },
  { href: "#gallery", label: "Gallery" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Book a Trip" },
];

export default function Footer() {
  return (
    // Extra bottom padding on mobile so the fixed call bar never covers the
    // copyright line.
    <footer className="bg-navy pt-16 md:pt-24 pb-28 lg:pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-12 mb-12 md:mb-16">
          <div className="col-span-2 lg:col-span-3">
            <p className="font-heading text-xl font-bold text-white tracking-[0.2em] uppercase leading-none">Palmetto Tide</p>
            <p className="font-heading text-[10px] text-gold tracking-[0.4em] uppercase mt-1.5 mb-6">Fishing Charters</p>
            <p className="font-body text-white/65 text-sm leading-[1.8] max-w-xs">
              Inshore charters out of Charleston, South Carolina. Redfish, trout, flounder and sharks, from the creeks
              behind Mount Pleasant to the barrier-island flats.
            </p>
          </div>

          <nav aria-label="Footer" className="col-span-2 lg:col-span-2 lg:col-start-5">
            <h2 className="font-heading text-[11px] text-white/85 tracking-[0.25em] uppercase mb-5">Explore</h2>
            <ul className="grid grid-cols-2 lg:grid-cols-1 gap-x-8 gap-y-3">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="font-body text-white/65 text-sm hover:text-gold transition-colors duration-300">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 lg:col-span-3">
            <h2 className="font-heading text-[11px] text-white/85 tracking-[0.25em] uppercase mb-5">Contact</h2>
            <ul className="space-y-3">
              <li className="flex items-center gap-1">
                <a href={`tel:${PHONE}`} className="font-body text-white/65 text-sm hover:text-gold transition-colors duration-300">
                  {PHONE_DISPLAY}
                </a>
                <CopyButton value={PHONE_DISPLAY} label="phone number" />
              </li>
              <li className="flex items-center gap-1 min-w-0">
                <a
                  href={`mailto:${EMAIL}`}
                  className="font-body text-white/65 text-sm hover:text-gold transition-colors duration-300 break-all"
                >
                  {EMAIL}
                </a>
                <CopyButton value={EMAIL} label="email address" />
              </li>
              <li className="font-body text-white/65 text-sm">Charleston, South Carolina</li>
              <li className="font-body text-white/65 text-sm">7 days a week · AM &amp; PM trips</li>
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-3">
            <h2 className="font-heading text-[11px] text-white/85 tracking-[0.25em] uppercase mb-5">Follow &amp; Review</h2>
            <ul className="space-y-3">
              <li>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 group">
                  <span className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center group-hover:border-gold/60 transition-colors">
                    <InstagramIcon className="w-4 h-4 text-white/70 group-hover:text-gold transition-colors" />
                  </span>
                  <span className="font-body text-white/65 text-sm group-hover:text-gold transition-colors">{INSTAGRAM_HANDLE}</span>
                </a>
              </li>
              <li>
                <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 group">
                  <span className="w-9 h-9 rounded-full border border-white/20 bg-white flex items-center justify-center">
                    <GoogleIcon className="w-4 h-4" />
                  </span>
                  <span className="font-body text-white/65 text-sm group-hover:text-gold transition-colors">Reviews on Google</span>
                </a>
              </li>
              <li>
                <a href={FISHINGBOOKER_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 group">
                  <span className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center font-heading text-[11px] text-white/70 group-hover:border-gold/60 group-hover:text-gold transition-colors">
                    FB
                  </span>
                  <span className="font-body text-white/65 text-sm group-hover:text-gold transition-colors">FishingBooker listing</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-body text-white/50 text-xs tracking-wider">
            &copy; {new Date().getFullYear()} Palmetto Tide Charters. All rights reserved.
          </p>
          <p className="font-body text-white/50 text-xs tracking-wider">USCG licensed · Charleston, SC</p>
        </div>
      </div>
    </footer>
  );
}
