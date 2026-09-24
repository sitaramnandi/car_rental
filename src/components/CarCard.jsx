import { Link } from "react-router-dom";
import { Users, Fuel, Settings2, Heart } from "lucide-react";
import WhatsAppButton from "./WhatsAppButton";
import { formatPrice, carUrl } from "../utils/format";
import { carEnquiryMessage } from "../utils/whatsapp";
import { useWishlist } from "../hooks/useWishlist";

export default function CarCard({ car }) {
  const [saved, toggle] = useWishlist(car.id);
  const toggleSaved = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggle();
  };

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-navy-950/8 bg-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-card dark:border-white/8 dark:bg-navy-900">
      <Link to={carUrl(car)} className="relative block aspect-4/3 overflow-hidden bg-navy-100 dark:bg-navy-800">
        <img
          src={car.image_url || "/placeholder-car.svg"}
          alt={car.name}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/placeholder-car.svg";
          }}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <button
          type="button"
          onClick={toggleSaved}
          aria-label={saved ? "Remove from saved cars" : "Save this car"}
          aria-pressed={saved}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-navy-800 shadow-soft backdrop-blur transition-colors hover:text-red-500 dark:bg-navy-950/80 dark:text-white/80"
        >
          <Heart className="h-4.5 w-4.5" fill={saved ? "currentColor" : "none"} color={saved ? "#ef4444" : "currentColor"} />
        </button>
        {!car.available && (
          <span className="absolute left-3 top-3 rounded-full bg-navy-950/85 px-3 py-1 text-xs font-semibold text-white">
            Unavailable
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <Link to={carUrl(car)}>
          <h3 className="font-display text-base font-semibold text-navy-950 dark:text-white sm:text-lg">{car.name}</h3>
        </Link>

        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-navy-600 dark:text-white/60 sm:text-sm">
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5 text-gold-600 dark:text-gold-400" />
            {car.seats} Seats
          </span>
          <span className="text-navy-300 dark:text-white/20">•</span>
          <span className="flex items-center gap-1">
            <Fuel className="h-3.5 w-3.5 text-gold-600 dark:text-gold-400" />
            {car.fuel_type}
          </span>
          <span className="text-navy-300 dark:text-white/20">•</span>
          <span className="flex items-center gap-1">
            <Settings2 className="h-3.5 w-3.5 text-gold-600 dark:text-gold-400" />
            {car.transmission}
          </span>
        </div>

        <div className="mt-4 flex items-baseline gap-1">
          <span className="font-display text-xl font-bold text-gold-600 dark:text-gold-400 sm:text-2xl">
            {formatPrice(car.price_per_day)}
          </span>
          <span className="text-sm text-navy-500 dark:text-white/50">/ day</span>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <Link
            to={carUrl(car)}
            className="flex-1 rounded-full bg-gold-500 px-4 py-2.5 text-center text-sm font-semibold text-navy-950 transition-colors hover:bg-gold-600"
          >
            View Details
          </Link>
          <WhatsAppButton variant="icon" size="md" message={carEnquiryMessage(car)} />
        </div>
      </div>
    </div>
  );
}
