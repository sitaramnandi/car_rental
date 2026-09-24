import { SearchX } from "lucide-react";

export default function EmptyState({
  icon: Icon = SearchX,
  title = "No cars found",
  description = "Try changing your filters.",
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-navy-950/15 bg-white/60 px-6 py-16 text-center dark:border-white/15 dark:bg-white/5">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-50 text-gold-600 dark:bg-gold-500/10 dark:text-gold-400">
        <Icon className="h-7 w-7" />
      </span>
      <h3 className="mt-4 font-display text-lg font-semibold text-navy-950 dark:text-white">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm text-navy-600 dark:text-white/60">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
