// The site's one button system. Every button and button-styled link uses
// btn(), so they share one radius, one type treatment, three heights and a
// small set of colourways. Add a variant here rather than hand-rolling classes
// in a component; that is how the site drifted into five heights and three
// corner radii before.

type Variant = "primary" | "dark" | "outline" | "outlineLight" | "light";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-heading uppercase tracking-[0.16em] whitespace-nowrap " +
  "transition-[background-color,border-color,color] duration-200 active:translate-y-px " +
  "disabled:opacity-40 disabled:pointer-events-none";

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-[12px]",
  md: "h-12 px-6 text-[13px]",
  lg: "h-14 px-8 text-[13px]",
};

const variants: Record<Variant, string> = {
  // Gold is reserved for the main action: booking or calling.
  primary: "bg-gold text-navy hover:bg-gold-light",
  dark: "bg-navy text-white hover:bg-navy-light",
  outline: "border border-navy/20 text-navy hover:border-navy/50 hover:bg-navy/[0.03]",
  outlineLight: "border border-white/35 text-white hover:border-white/70 hover:bg-white/[0.06]",
  light: "bg-white text-navy hover:bg-white/90",
};

export function btn({
  variant = "primary",
  size = "md",
  className = "",
}: { variant?: Variant; size?: Size; className?: string } = {}) {
  return `${base} ${sizes[size]} ${variants[variant]} ${className}`.trim();
}

/** Small uppercase label above a section heading. */
export const eyebrow = "font-heading text-xs tracking-[0.25em] uppercase";
