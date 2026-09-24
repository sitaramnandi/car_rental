/**
 * variant: "dark" (icon + label on a dark background, used in the hero strip)
 *          "card" (white bordered card, used on lighter sections)
 */
export default function FeatureCard({ icon: Icon, title, description, variant = "card" }) {
  if (variant === "dark") {
    return (
      <div className="flex flex-col items-center gap-2.5 text-center sm:flex-row sm:items-center sm:gap-3 sm:text-left">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 text-gold-400">
          <Icon className="h-5.5 w-5.5" strokeWidth={2} />
        </span>
        <span className="text-xs font-semibold leading-tight text-white sm:text-sm">{title}</span>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-navy-950/8 bg-white p-6 shadow-soft transition-shadow hover:shadow-card dark:border-white/8 dark:bg-navy-900">
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-50 text-gold-600 dark:bg-gold-500/10 dark:text-gold-400">
        <Icon className="h-6 w-6" strokeWidth={2} />
      </span>
      <h3 className="mt-4 font-display text-base font-semibold text-navy-950 dark:text-white">{title}</h3>
      {description && <p className="mt-1.5 text-sm leading-relaxed text-navy-600 dark:text-white/60">{description}</p>}
    </div>
  );
}
