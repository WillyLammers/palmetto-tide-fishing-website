import { btn, eyebrow } from "./ui";

// Answers "OK, how do I actually book this?" right where the question comes up,
// under the prices. Every line restates something the FAQ already commits to;
// nothing here is a new promise.

const steps = [
  {
    title: "Pick a trip",
    body: "Every trip is private: just your group on the boat, up to 6 people.",
  },
  {
    title: "Text or call Joseph",
    body: "Send your date and group size, and he'll confirm availability.",
  },
  {
    title: "Meet him at the dock",
    body: "He confirms the dock when you book, based on the day's tide. Bring sunscreen, sunglasses, a hat, snacks and drinks.",
  },
];

export default function HowItWorks() {
  return (
    <div className="mt-10 md:mt-14 rounded-2xl bg-white ring-1 ring-black/[0.07] shadow-sm p-6 sm:p-8 lg:p-10 reveal">
      <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
        <div className="lg:w-56 shrink-0">
          <p className={`${eyebrow} text-ocean mb-2`}>How it works</p>
          <h3 className="font-heading text-3xl font-bold text-navy uppercase tracking-wide leading-none">Booking is simple</h3>
        </div>

        <ol className="grid sm:grid-cols-3 gap-6 sm:gap-8 flex-1">
          {steps.map((s, i) => (
            <li key={s.title} className="flex sm:flex-col gap-4 sm:gap-3">
              <span
                className="w-9 h-9 shrink-0 rounded-full bg-navy text-gold font-heading text-base flex items-center justify-center"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <div>
                <p className="font-heading text-lg text-navy uppercase tracking-wide leading-tight">{s.title}</p>
                <p className="font-body text-slate text-[14.5px] leading-relaxed mt-1">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="flex flex-col items-stretch sm:items-start lg:items-center gap-3 lg:w-44 shrink-0">
          <a
            href="#contact"
            className={btn({ variant: "dark" })}
          >
            Plan your trip
          </a>
          <a href="#faq" className="text-center font-body text-sm text-slate hover:text-ocean underline underline-offset-2">
            More questions? FAQ
          </a>
        </div>
      </div>
    </div>
  );
}
