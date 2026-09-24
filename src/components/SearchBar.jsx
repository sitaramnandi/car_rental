import { Search, X } from "lucide-react";

export default function SearchBar({ value, onChange, placeholder = "Search by car name (e.g. Innova)", className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-navy-400 dark:text-white/40" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search cars"
        className="w-full rounded-full border border-navy-950/10 bg-white py-3 pl-11 pr-10 text-sm text-navy-900 placeholder:text-navy-400 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-100 dark:border-white/10 dark:bg-navy-900 dark:text-white dark:placeholder:text-white/35 dark:focus:ring-gold-500/20"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-3.5 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full text-navy-400 hover:text-navy-700 dark:text-white/40 dark:hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
