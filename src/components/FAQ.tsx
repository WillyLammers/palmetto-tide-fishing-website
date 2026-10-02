import { faqs } from "@/data/faq";
import { PHONE, PHONE_DISPLAY, EMAIL } from "@/data/site";
import { eyebrow } from "./ui";

/** Turns the phone number and email in an answer into tappable links. */
function linkify(text: string) {
  const parts = text.split(new RegExp(`(${PHONE_DISPLAY.replace(/[()]/g, "\\$&")}|${EMAIL})`));
  return parts.map((part, i) =>
    part === PHONE_DISPLAY ? (
      <a key={i} href={`tel:${PHONE}`} className="text-ocean underline underline-offset-2 hover:text-navy">
        {part}
      </a>
    ) : part === EMAIL ? (
      <a key={i} href={`mailto:${EMAIL}`} className="text-ocean underline underline-offset-2 hover:text-navy break-all">
        {part}
      </a>
    ) : (
      part
    )
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="relative py-20 md:py-32 bg-[#f8f7f4]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 grid lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-4 reveal">
          <p className={`${eyebrow} text-ocean mb-4`}>Good to know</p>
          <h2 className="font-heading text-[2.75rem] sm:text-5xl md:text-6xl font-bold text-navy uppercase tracking-wide leading-none mb-6">
            FAQ
          </h2>
          <p className="font-body text-slate text-[15px] leading-relaxed max-w-sm">
            Still wondering about something? Call or text Captain Joseph directly at{" "}
            <a href={`tel:${PHONE}`} className="text-ocean underline underline-offset-2 hover:text-navy whitespace-nowrap">
              {PHONE_DISPLAY}
            </a>
            .
          </p>
        </div>

        <div className="lg:col-span-8 divide-y divide-navy/10 border-y border-navy/10 reveal" style={{ ["--reveal-delay" as string]: "120ms" }}>
          {faqs.map((f) => (
            <details key={f.q} className="group">
              <summary className="flex items-start justify-between gap-6 py-5 sm:py-6 cursor-pointer select-none">
                <h3 className="font-heading text-[17px] sm:text-lg text-navy tracking-wide leading-snug">{f.q}</h3>
                <span
                  className="relative mt-1 w-6 h-6 shrink-0 rounded-full border border-navy/20 group-open:bg-navy group-open:border-navy transition-colors"
                  aria-hidden="true"
                >
                  <span className="absolute left-1/2 top-1/2 w-2.5 h-px -translate-x-1/2 -translate-y-1/2 bg-navy group-open:bg-white" />
                  <span className="absolute left-1/2 top-1/2 w-px h-2.5 -translate-x-1/2 -translate-y-1/2 bg-navy transition-transform duration-300 group-open:scale-y-0" />
                </span>
              </summary>
              <p className="font-body text-slate text-[15px] leading-[1.8] pb-6 pr-10 -mt-1">{linkify(f.a)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
