import { Link } from "react-router-dom";
import { Car } from "lucide-react";
import { BUSINESS_NAME, BUSINESS_SUBTITLE } from "../utils/config";

export default function Logo({ variant = "light", showSubtitle = true, to = "/" }) {
  const isLight = variant === "light";
  return (
    <Link to={to} className="flex items-center gap-2.5 shrink-0">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold-500 text-navy-950 shadow-soft">
        <Car className="h-5 w-5" strokeWidth={2.5} />
      </span>
      <span className="flex flex-col leading-tight">
        <span className={`font-display text-lg font-bold ${isLight ? "text-navy-950 dark:text-white" : "text-white"}`}>
          {BUSINESS_NAME}
        </span>
        {showSubtitle && (
          <span className={`text-[11px] font-medium ${isLight ? "text-navy-600 dark:text-white/60" : "text-white/60"}`}>
            {BUSINESS_SUBTITLE}
          </span>
        )}
      </span>
    </Link>
  );
}
