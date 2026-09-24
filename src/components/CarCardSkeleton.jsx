export default function CarCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-navy-950/8 bg-white shadow-soft dark:border-white/8 dark:bg-navy-900">
      <div className="aspect-4/3 animate-pulse bg-navy-950/10 dark:bg-white/8" />
      <div className="space-y-3 p-4 sm:p-5">
        <div className="h-5 w-3/4 animate-pulse rounded bg-navy-950/10 dark:bg-white/8" />
        <div className="h-3.5 w-full animate-pulse rounded bg-navy-950/8 dark:bg-white/6" />
        <div className="h-6 w-1/3 animate-pulse rounded bg-navy-950/10 dark:bg-white/8" />
        <div className="h-10 w-full animate-pulse rounded-full bg-navy-950/8 dark:bg-white/6" />
      </div>
    </div>
  );
}
