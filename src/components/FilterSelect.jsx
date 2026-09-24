import { ChevronDown } from "lucide-react";

export default function FilterSelect({ label, value, onChange, options, className = "" }) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      {label && <span className="text-xs font-semibold text-navy-600 dark:text-white/60">{label}</span>}
      <span className="relative">
        <select
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full cursor-pointer appearance-none rounded-lg border border-navy-950/12 bg-white py-2.5 pl-3 pr-9 text-sm font-medium text-navy-900 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-100 dark:border-white/12 dark:bg-navy-900 dark:text-white dark:focus:ring-gold-500/20"
        >
          {options.map((opt) => (
            <option key={opt.value ?? "all"} value={opt.value ?? ""}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400 dark:text-white/40" />
      </span>
    </label>
  );
}
