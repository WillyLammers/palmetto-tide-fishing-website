import Image from "next/image";
import BookingPlanner from "./BookingPlanner";
import CopyButton from "./CopyButton";
import { MailIcon, PhoneIcon } from "./icons";
import { EMAIL, PHONE, PHONE_DISPLAY } from "@/data/site";

export default function CTA() {
  return (
    <section id="contact" className="relative py-20 md:py-32 overflow-hidden bg-navy">
      <div className="absolute inset-0">
        <Image
          src="/images/gallery/fishing-10.jpg"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-navy/80" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/20 to-navy/80" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <div className="min-w-0 lg:col-span-5 text-center lg:text-left lg:sticky lg:top-28 reveal">
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
            <div className="w-8 h-px bg-gold/60" />
            <p className="font-heading text-gold tracking-[0.4em] uppercase text-xs">Ready to fish?</p>
            <div className="w-8 h-px bg-gold/60 lg:hidden" />
          </div>

          <h2 className="font-heading text-5xl md:text-7xl font-bold uppercase tracking-wide leading-[0.95] mb-6">
            <span className="text-white">Let&apos;s Go </span>
            <span className="text-shimmer">Fishing</span>
          </h2>

          <p className="font-body text-white/85 text-base md:text-lg max-w-md mx-auto lg:mx-0 mb-8 leading-relaxed">
            Call or text Captain Joseph to check availability and book your trip, or fill in the planner and send it in one tap.
          </p>

          <ul className="space-y-3 max-w-sm mx-auto lg:mx-0 text-left">
            <li className="flex items-center gap-2">
              <a
                href={`tel:${PHONE}`}
                className="flex-1 flex items-center gap-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 px-4 py-3.5 transition-colors"
              >
                <span className="w-10 h-10 rounded-full bg-gold text-navy flex items-center justify-center shrink-0">
                  <PhoneIcon className="w-4 h-4" />
                </span>
                <span>
                  <span className="block font-body text-xs text-white/60">Call or text</span>
                  <span className="block font-heading text-lg text-white tracking-wider">{PHONE_DISPLAY}</span>
                </span>
              </a>
              <CopyButton value={PHONE_DISPLAY} label="phone number" />
            </li>
            <li className="flex items-center gap-2">
              <a
                href={`mailto:${EMAIL}`}
                className="flex-1 min-w-0 flex items-center gap-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 px-4 py-3.5 transition-colors"
              >
                <span className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center shrink-0">
                  <MailIcon className="w-4 h-4" />
                </span>
                <span className="min-w-0">
                  <span className="block font-body text-xs text-white/60">Email</span>
                  <span className="block font-body text-[15px] text-white truncate">{EMAIL}</span>
                </span>
              </a>
              <CopyButton value={EMAIL} label="email address" />
            </li>
          </ul>

          <dl className="mt-8 grid grid-cols-3 gap-3 max-w-sm mx-auto lg:mx-0 text-center lg:text-left">
            {[
              ["Days", "7 a week"],
              ["Trips", "AM & PM"],
              ["Departs", "Charleston"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="font-heading text-[10px] tracking-[0.25em] uppercase text-gold/90">{k}</dt>
                <dd className="font-body text-sm text-white/80 mt-1">{v}</dd>
              </div>
            ))}
          </dl>

        </div>

        <div className="min-w-0 lg:col-span-7 reveal" style={{ ["--reveal-delay" as string]: "150ms" }}>
          <BookingPlanner />
        </div>
      </div>
    </section>
  );
}
