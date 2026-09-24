import CarCard from "./CarCard";
import CarCardSkeleton from "./CarCardSkeleton";
import EmptyState from "./EmptyState";

export default function CarGrid({ cars, loading, emptyAction, columns = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" }) {
  if (loading) {
    return (
      <div className={`grid gap-5 sm:gap-6 ${columns}`}>
        {Array.from({ length: 8 }).map((_, i) => (
          <CarCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!cars || cars.length === 0) {
    return (
      <EmptyState
        title="No cars found"
        description="Try changing your filters or search term."
        action={emptyAction}
      />
    );
  }

  return (
    <div className={`grid gap-5 sm:gap-6 ${columns}`}>
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}
