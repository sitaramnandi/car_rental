import FilterSelect from "./FilterSelect";
import { PRICE_RANGES } from "../data/filterOptions";

export default function FilterBar({ filters, onChange, options, className = "" }) {
  const priceIndex = PRICE_RANGES.findIndex((r) => r.min === filters.minPrice && r.max === filters.maxPrice);

  const setPrice = (idx) => {
    const range = PRICE_RANGES[Number(idx)] || PRICE_RANGES[0];
    onChange({ minPrice: range.min, maxPrice: range.max });
  };

  return (
    <div className={`flex flex-wrap items-end gap-3 ${className}`}>
      <FilterSelect
        label="Brand"
        value={filters.brand}
        onChange={(v) => onChange({ brand: v })}
        options={[{ value: "", label: "All Brands" }, ...options.brands.map((b) => ({ value: b, label: b }))]}
        className="min-w-[9.5rem] flex-1"
      />
      <FilterSelect
        label="Fuel Type"
        value={filters.fuelType}
        onChange={(v) => onChange({ fuelType: v })}
        options={[{ value: "", label: "All" }, ...options.fuelTypes.map((f) => ({ value: f, label: f }))]}
        className="min-w-[8rem] flex-1"
      />
      <FilterSelect
        label="Seats"
        value={filters.seats}
        onChange={(v) => onChange({ seats: v })}
        options={[{ value: "", label: "All" }, ...options.seatOptions.map((s) => ({ value: String(s), label: `${s} Seats` }))]}
        className="min-w-[7rem] flex-1"
      />
      <FilterSelect
        label="Transmission"
        value={filters.transmission}
        onChange={(v) => onChange({ transmission: v })}
        options={[{ value: "", label: "All" }, ...options.transmissions.map((t) => ({ value: t, label: t }))]}
        className="min-w-[9rem] flex-1"
      />
      <FilterSelect
        label="Price Range"
        value={priceIndex === -1 ? 0 : priceIndex}
        onChange={setPrice}
        options={PRICE_RANGES.map((r, i) => ({ value: i, label: r.label }))}
        className="min-w-[9.5rem] flex-1"
      />
      <label className="flex items-center gap-2 pb-2.5 text-sm font-medium text-navy-700 dark:text-white/70">
        <input
          type="checkbox"
          checked={!!filters.availableOnly}
          onChange={(e) => onChange({ availableOnly: e.target.checked })}
          className="h-4 w-4 rounded border-navy-300 text-gold-500 focus:ring-gold-400 dark:border-white/20 dark:bg-navy-900"
        />
        Available Now
      </label>
    </div>
  );
}
