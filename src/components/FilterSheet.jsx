import { useEffect, useState } from "react";
import { X } from "lucide-react";
import FilterSelect from "./FilterSelect";
import { PRICE_RANGES } from "../data/filterOptions";

const DEFAULT_FILTERS = {
  brand: "",
  fuelType: "",
  seats: "",
  transmission: "",
  minPrice: null,
  maxPrice: null,
  availableOnly: false,
};

export default function FilterSheet({ open, onClose, filters, onApply, options }) {
  const [draft, setDraft] = useState(filters);

  useEffect(() => {
    if (open) setDraft(filters);
  }, [open, filters]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const priceIndex = PRICE_RANGES.findIndex((r) => r.min === draft.minPrice && r.max === draft.maxPrice);
  const setPrice = (idx) => {
    const range = PRICE_RANGES[Number(idx)] || PRICE_RANGES[0];
    setDraft((d) => ({ ...d, minPrice: range.min, maxPrice: range.max }));
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-navy-950/50" onClick={onClose} />
      <div className="absolute inset-x-0 bottom-0 flex max-h-[88vh] flex-col rounded-t-3xl bg-white animate-fade-up dark:bg-navy-900">
        <div className="flex items-center justify-between border-b border-navy-950/8 px-5 py-4 dark:border-white/8">
          <h2 className="font-display text-lg font-semibold text-navy-950 dark:text-white">Filters</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-950/5 text-navy-700 dark:bg-white/10 dark:text-white/70"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
          <FilterSelect
            label="Brand"
            value={draft.brand}
            onChange={(v) => setDraft((d) => ({ ...d, brand: v }))}
            options={[{ value: "", label: "All Brands" }, ...options.brands.map((b) => ({ value: b, label: b }))]}
          />
          <div className="grid grid-cols-2 gap-4">
            <FilterSelect
              label="Fuel Type"
              value={draft.fuelType}
              onChange={(v) => setDraft((d) => ({ ...d, fuelType: v }))}
              options={[{ value: "", label: "All" }, ...options.fuelTypes.map((f) => ({ value: f, label: f }))]}
            />
            <FilterSelect
              label="Seats"
              value={draft.seats}
              onChange={(v) => setDraft((d) => ({ ...d, seats: v }))}
              options={[{ value: "", label: "All" }, ...options.seatOptions.map((s) => ({ value: String(s), label: `${s} Seats` }))]}
            />
          </div>
          <FilterSelect
            label="Transmission"
            value={draft.transmission}
            onChange={(v) => setDraft((d) => ({ ...d, transmission: v }))}
            options={[{ value: "", label: "All" }, ...options.transmissions.map((t) => ({ value: t, label: t }))]}
          />
          <FilterSelect
            label="Price Range"
            value={priceIndex === -1 ? 0 : priceIndex}
            onChange={setPrice}
            options={PRICE_RANGES.map((r, i) => ({ value: i, label: r.label }))}
          />

          <div>
            <span className="text-xs font-semibold text-navy-600 dark:text-white/60">Availability</span>
            <div className="mt-2 flex gap-3">
              {[
                { label: "Available Now", value: true },
                { label: "Show All", value: false },
              ].map((opt) => (
                <label
                  key={opt.label}
                  className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-medium ${
                    draft.availableOnly === opt.value
                      ? "border-gold-400 bg-gold-50 text-gold-700 dark:bg-gold-500/10 dark:text-gold-400"
                      : "border-navy-950/12 text-navy-600 dark:border-white/12 dark:text-white/60"
                  }`}
                >
                  <input
                    type="radio"
                    name="availability"
                    className="sr-only"
                    checked={draft.availableOnly === opt.value}
                    onChange={() => setDraft((d) => ({ ...d, availableOnly: opt.value }))}
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 border-t border-navy-950/8 px-5 py-4 dark:border-white/8" style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}>
          <button
            type="button"
            onClick={() => setDraft(DEFAULT_FILTERS)}
            className="flex-1 rounded-full bg-navy-950/5 py-3 text-sm font-semibold text-navy-800 dark:bg-white/10 dark:text-white/80"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={() => onApply(draft)}
            className="flex-[1.4] rounded-full bg-gold-500 py-3 text-sm font-semibold text-navy-950"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
