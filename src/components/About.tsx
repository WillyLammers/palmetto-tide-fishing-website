import Image from "next/image";

export default function About({
  aggregateRating = null,
}: {
  /** Live Google average, or null when the scrape could not confirm one. */
  aggregateRating?: number | null;
}) {
  return (
    <section id="about" className="relative py-20 md:py-32 bg-white overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, var(--navy) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-5 reveal">
            <div className="relative max-w-md mx-auto lg:max-w-none">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl shadow-2xl">
                <Image
                  src="/images/about/about-me.jpeg"
                  alt="Captain Joseph Christy holding a redfish"
                  fill
                  className="object-cover"
                  style={{ objectPosition: "62% 30%" }}
                  sizes="(min-width: 1024px) 40vw, (min-width: 448px) 448px, 100vw"
                />
              </div>

              <div className="absolute -bottom-5 -right-3 sm:-right-8 glass-light rounded-xl px-5 py-4 shadow-xl">
                <p className="font-heading text-4xl font-bold text-ocean leading-none">15+</p>
                <p className="font-body text-[11px] text-slate tracking-[0.15em] uppercase mt-1">Years on the water</p>
              </div>

              <div className="absolute -top-4 -left-4 w-24 h-24 border-l-2 border-t-2 border-gold/30 rounded-tl-xl" aria-hidden="true" />
            </div>
          </div>

          <div className="lg:col-span-7 reveal" style={{ ["--reveal-delay" as string]: "150ms" }}>
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="inline-flex items-center gap-1.5 font-heading text-[10px] tracking-[0.25em] uppercase text-navy bg-gold px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-navy" />
                Charleston Native
              </span>
              <div className="section-line" />
              <p className="font-heading text-ocean tracking-[0.3em] uppercase text-xs">Meet Your Captain</p>
            </div>

            <h2 className="font-heading text-[2.75rem] md:text-5xl lg:text-6xl font-bold text-navy uppercase tracking-wide leading-[1.02] mb-7">
              Joseph
              <br />
              Christy
            </h2>

            <p className="font-body text-slate text-[17px] md:text-lg leading-[1.8] mb-5 max-w-xl">
              Captain Joseph Christy has fished these waters for more than fifteen years, since he was ten years old. He
              grew up in the creeks behind Mount Pleasant and still runs that water today, along with Charleston Harbor
              and the flats out past the barrier islands.
            </p>

            <p className="font-body text-slate-light text-base leading-[1.8] mb-10 max-w-xl">
              He runs a shallow-draft bay boat, which keeps the shallowest water in reach. The part he cares about most
              is watching someone land their first saltwater fish. It puts him right back to being ten years old.
            </p>

            <dl className="grid grid-cols-3 gap-4 max-w-md pt-8 border-t border-sand-dark items-end">
              {[
                { value: "USCG", label: "Licensed" },
                { value: aggregateRating ? aggregateRating.toFixed(1) : "5.0", label: "Star rating" },
                { value: "6", label: "Max anglers" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse">
                  <dt className="font-body text-[11px] text-slate-light tracking-[0.18em] uppercase mt-1 whitespace-nowrap">{stat.label}</dt>
                  <dd className="font-heading text-3xl md:text-4xl font-bold text-navy">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
