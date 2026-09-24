import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ChevronRight, Users, Fuel, Settings2, Heart, Check, CalendarDays } from "lucide-react";
import ImageGallery from "../components/ImageGallery";
import WhatsAppButton from "../components/WhatsAppButton";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import { getCarBySlug } from "../services/carService";
import { formatPrice, carUrl } from "../utils/format";
import { carEnquiryMessage } from "../utils/whatsapp";
import { useWishlist } from "../hooks/useWishlist";

function formatDate(value) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-GB", { day: "numeric", month: "long" });
}

export default function CarDetails() {
  const { brand, slug } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [showDates, setShowDates] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [saved, toggleSaved] = useWishlist(car?.id);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setNotFound(false);
    getCarBySlug(brand, slug)
      .then((data) => {
        if (!active) return;
        if (!data) setNotFound(true);
        else setCar(data);
      })
      .catch(() => active && setNotFound(true))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [brand, slug]);

  useEffect(() => {
    if (car) document.title = `${car.name} | CarGo`;
  }, [car]);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (notFound || !car) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <EmptyState
          title="Car not found"
          description="This car may have been removed or is no longer available."
          action={
            <button
              type="button"
              onClick={() => navigate("/cars")}
              className="rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-navy-950"
            >
              Browse All Cars
            </button>
          }
        />
      </div>
    );
  }

  const gallery = car.gallery_images?.length ? car.gallery_images : [car.image_url].filter(Boolean);
  const features = Array.isArray(car.features) ? car.features : [];
  const amenityPills = features.slice(0, 3);
  const message = carEnquiryMessage(car, { fromDate: formatDate(fromDate), toDate: formatDate(toDate) });

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-navy-500 dark:text-white/50">
        <Link to="/" className="hover:text-gold-600 dark:hover:text-gold-400">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link to="/cars" className="hover:text-gold-600 dark:hover:text-gold-400">Cars</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="font-medium text-navy-800 dark:text-white/80">{car.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <ImageGallery images={gallery} alt={car.name} />

        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="font-display text-2xl font-bold text-navy-950 dark:text-white sm:text-3xl">{car.name}</h1>
              <p className="mt-1 text-sm text-navy-500 dark:text-white/50">{car.brand} · {car.model}</p>
            </div>
            <button
              type="button"
              onClick={toggleSaved}
              aria-label={saved ? "Remove from saved cars" : "Save this car"}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-navy-950/10 text-navy-700 hover:text-red-500 dark:border-white/10 dark:text-white/70"
            >
              <Heart className="h-5 w-5" fill={saved ? "currentColor" : "none"} color={saved ? "#ef4444" : "currentColor"} />
            </button>
          </div>

          <div className="mt-4 flex items-baseline gap-1.5">
            <span className="font-display text-3xl font-bold text-gold-600 dark:text-gold-400">{formatPrice(car.price_per_day)}</span>
            <span className="text-navy-500 dark:text-white/50">/ day</span>
            {!car.available && (
              <span className="ml-3 rounded-full bg-navy-950/8 px-3 py-1 text-xs font-semibold text-navy-600 dark:bg-white/10 dark:text-white/70">
                Currently Unavailable
              </span>
            )}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {[
              { icon: Users, label: `${car.seats} Seats` },
              { icon: Fuel, label: car.fuel_type },
              { icon: Settings2, label: car.transmission },
            ].map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="flex items-center gap-1.5 rounded-full bg-navy-50 px-3.5 py-1.5 text-sm font-medium text-navy-700 dark:bg-white/10 dark:text-white/70"
              >
                <Icon className="h-4 w-4 text-gold-600 dark:text-gold-400" />
                {label}
              </span>
            ))}
          </div>

          {amenityPills.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {amenityPills.map((f) => (
                <span
                  key={f}
                  className="flex items-center gap-1.5 rounded-full border border-navy-950/8 px-3.5 py-1.5 text-sm font-medium text-navy-600 dark:border-white/10 dark:text-white/60"
                >
                  <Check className="h-3.5 w-3.5 text-gold-600 dark:text-gold-400" />
                  {f}
                </span>
              ))}
            </div>
          )}

          <div className="mt-6">
            <h2 className="font-display text-base font-semibold text-navy-950 dark:text-white">Description</h2>
            <p className="mt-2 text-sm leading-relaxed text-navy-600 dark:text-white/60">{car.description}</p>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <WhatsAppButton message={message} size="lg" fullWidth className="sm:flex-1" />
            <button
              type="button"
              onClick={() => setShowDates((s) => !s)}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-gold-400 px-6 py-3.5 text-sm font-semibold text-gold-700 transition-colors hover:bg-gold-50 dark:text-gold-400 dark:hover:bg-gold-500/10"
            >
              <CalendarDays className="h-4.5 w-4.5" />
              Check Availability
            </button>
          </div>

          {showDates && (
            <div className="mt-4 rounded-2xl border border-navy-950/8 bg-navy-50/60 p-4 animate-fade-in dark:border-white/8 dark:bg-white/5">
              <p className="text-xs font-medium text-navy-600 dark:text-white/60">
                Select your dates to include them in your WhatsApp message.
              </p>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <label className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-navy-600 dark:text-white/60">From</span>
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="rounded-lg border border-navy-950/12 bg-white px-3 py-2 text-sm focus:border-gold-400 focus:outline-none dark:border-white/12 dark:bg-navy-900 dark:text-white"
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-navy-600 dark:text-white/60">To</span>
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    min={fromDate || undefined}
                    className="rounded-lg border border-navy-950/12 bg-white px-3 py-2 text-sm focus:border-gold-400 focus:outline-none dark:border-white/12 dark:bg-navy-900 dark:text-white"
                  />
                </label>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-2xl border border-navy-950/8 bg-white p-6 dark:border-white/8 dark:bg-navy-900">
          <h2 className="font-display text-lg font-semibold text-navy-950 dark:text-white">Features</h2>
          {features.length ? (
            <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-navy-700 dark:text-white/70">
                  <Check className="h-4 w-4 shrink-0 text-gold-600 dark:text-gold-400" />
                  {f}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-navy-500 dark:text-white/50">No additional features listed for this car.</p>
          )}
        </div>

        <div className="rounded-2xl border border-navy-950/8 bg-white p-6 dark:border-white/8 dark:bg-navy-900">
          <h2 className="font-display text-lg font-semibold text-navy-950 dark:text-white">Rental Information</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between border-b border-navy-950/6 pb-3 dark:border-white/6">
              <dt className="text-navy-500 dark:text-white/50">Minimum Rental Period</dt>
              <dd className="font-semibold text-navy-900 dark:text-white">1 Day</dd>
            </div>
            <div className="flex items-center justify-between border-b border-navy-950/6 pb-3 dark:border-white/6">
              <dt className="text-navy-500 dark:text-white/50">Free Cancellation</dt>
              <dd className="font-semibold text-navy-900 dark:text-white">Yes</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-navy-500 dark:text-white/50">Delivery</dt>
              <dd className="font-semibold text-navy-900 dark:text-white">Available on request</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
