import { useEffect, useState } from "react";
import { SlidersHorizontal, X as XIcon } from "lucide-react";
import CarGrid from "../components/CarGrid";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import FilterSheet from "../components/FilterSheet";
import { getCars, getFilterOptions } from "../services/carService";
import { useDebounce } from "../hooks/useDebounce";
import { SORT_OPTIONS } from "../data/filterOptions";

const DEFAULT_FILTERS = {
  brand: "",
  fuelType: "",
  seats: "",
  transmission: "",
  minPrice: null,
  maxPrice: null,
  availableOnly: false,
};

const DEFAULT_OPTIONS = { brands: [], fuelTypes: [], seatOptions: [], transmissions: [] };

function countActive(filters) {
  return Object.entries(filters).filter(([key, value]) => {
    if (key === "availableOnly") return value === true;
    return value !== "" && value !== null;
  }).length;
}

export default function Cars() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [sortBy, setSortBy] = useState("popular");
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const [sheetOpen, setSheetOpen] = useState(false);

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    document.title = "Find Your Perfect Car | CarGo";
    getFilterOptions().then(setOptions).catch(() => {});
  }, []);

  useEffect(() => {
    let active = true;
    setLoading(true);
    getCars({ ...filters, search: debouncedSearch }, sortBy)
      .then((data) => {
        if (active) setCars(data);
      })
      .catch(() => {
        if (active) setCars([]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [filters, debouncedSearch, sortBy]);

  const activeCount = countActive(filters) + (search ? 1 : 0);

  const patchFilters = (patch) => setFilters((f) => ({ ...f, ...patch }));

  const clearAll = () => {
    setFilters(DEFAULT_FILTERS);
    setSearch("");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      <div className="text-center sm:text-left">
        <h1 className="font-display text-3xl font-bold text-navy-950 dark:text-white sm:text-4xl">Find Your Perfect Car</h1>
        <p className="mt-2 text-navy-600 dark:text-white/60">Choose from our range of clean and well-maintained vehicles.</p>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:mt-8">
        <div className="flex items-center gap-3">
          <SearchBar value={search} onChange={setSearch} className="flex-1" />
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            className="relative flex h-[46px] shrink-0 items-center gap-2 rounded-full border border-navy-950/10 bg-white px-4 text-sm font-semibold text-navy-800 dark:border-white/10 dark:bg-navy-900 dark:text-white/80 lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gold-500 text-[11px] font-bold text-navy-950">
                {activeCount}
              </span>
            )}
          </button>
        </div>

        <div className="hidden items-center justify-between gap-4 lg:flex">
          <FilterBar filters={filters} onChange={patchFilters} options={options} className="flex-1" />
          {activeCount > 0 && (
            <button
              type="button"
              onClick={clearAll}
              className="flex shrink-0 items-center gap-1.5 pb-2.5 text-sm font-semibold text-gold-700 hover:text-gold-800 dark:text-gold-400 dark:hover:text-gold-300"
            >
              <XIcon className="h-4 w-4" />
              Clear Filters
            </button>
          )}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-navy-950/8 pt-5 dark:border-white/8">
        <p className="text-sm font-medium text-navy-700 dark:text-white/70">
          {loading ? "Loading cars…" : `${cars.length} Car${cars.length === 1 ? "" : "s"} Available`}
        </p>
        <label className="flex items-center gap-2 text-sm">
          <span className="hidden text-navy-500 dark:text-white/50 sm:inline">Sort by</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-lg border border-navy-950/12 bg-white py-2 pl-3 pr-8 text-sm font-medium text-navy-900 focus:border-gold-400 focus:outline-none dark:border-white/12 dark:bg-navy-900 dark:text-white"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-6">
        <CarGrid
          cars={cars}
          loading={loading}
          emptyAction={
            activeCount > 0 && (
              <button
                type="button"
                onClick={clearAll}
                className="rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-navy-950"
              >
                Clear Filters
              </button>
            )
          }
        />
      </div>

      <FilterSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        filters={filters}
        options={options}
        onApply={(draft) => {
          setFilters(draft);
          setSheetOpen(false);
        }}
      />
    </div>
  );
}
