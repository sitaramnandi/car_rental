import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Car, CheckCircle2, XCircle, ArrowRight, Plus } from "lucide-react";
import { getDashboardStats, getCars } from "../../services/carService";
import { formatPrice } from "../../utils/format";
import LoadingSpinner from "../../components/LoadingSpinner";

const STAT_CONFIG = [
  { key: "total", label: "Total Cars", icon: Car, tone: "bg-navy-50 text-navy-700 dark:bg-white/10 dark:text-white/80" },
  { key: "available", label: "Available Cars", icon: CheckCircle2, tone: "bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400" },
  { key: "unavailable", label: "Unavailable Cars", icon: XCircle, tone: "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400" },
];

export default function Dashboard() {
  const [stats, setStats] = useState({ total: 0, available: 0, unavailable: 0 });
  const [recentCars, setRecentCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Dashboard | CarGo Admin";
    Promise.all([getDashboardStats(), getCars({}, "popular")])
      .then(([s, cars]) => {
        setStats(s);
        setRecentCars(cars.slice(0, 5));
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-navy-950 dark:text-white">Dashboard</h1>
          <p className="mt-1 text-sm text-navy-500 dark:text-white/50">A quick overview of your car listings.</p>
        </div>
        <Link
          to="/admin/cars/new"
          className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-navy-950 hover:bg-gold-600"
        >
          <Plus className="h-4 w-4" />
          Add New Car
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {STAT_CONFIG.map(({ key, label, icon: Icon, tone }) => (
          <div key={key} className="rounded-2xl border border-navy-950/8 bg-white p-5 dark:border-white/8 dark:bg-navy-900">
            <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${tone}`}>
              <Icon className="h-5 w-5" />
            </span>
            <p className="mt-4 font-display text-3xl font-bold text-navy-950 dark:text-white">{stats[key]}</p>
            <p className="mt-1 text-sm text-navy-500 dark:text-white/50">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-navy-950/8 bg-white dark:border-white/8 dark:bg-navy-900">
        <div className="flex items-center justify-between border-b border-navy-950/8 px-5 py-4 dark:border-white/8">
          <h2 className="font-display text-base font-semibold text-navy-950 dark:text-white">Recent Cars</h2>
          <Link to="/admin/cars" className="flex items-center gap-1 text-sm font-semibold text-gold-700 hover:text-gold-800 dark:text-gold-400 dark:hover:text-gold-300">
            View All
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {recentCars.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-navy-500 dark:text-white/50">No cars added yet.</p>
        ) : (
          <ul className="divide-y divide-navy-950/6 dark:divide-white/6">
            {recentCars.map((car) => (
              <li key={car.id} className="flex items-center gap-4 px-5 py-3.5">
                <img
                  src={car.image_url || "/placeholder-car.svg"}
                  alt={car.name}
                  className="h-12 w-16 shrink-0 rounded-lg object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/placeholder-car.svg";
                  }}
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-navy-900 dark:text-white">{car.name}</p>
                  <p className="text-xs text-navy-500 dark:text-white/50">{car.brand}</p>
                </div>
                <p className="shrink-0 text-sm font-semibold text-gold-600 dark:text-gold-400">{formatPrice(car.price_per_day)}</p>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                    car.available ? "bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400" : "bg-navy-950/8 text-navy-600 dark:bg-white/10 dark:text-white/60"
                  }`}
                >
                  {car.available ? "Active" : "Inactive"}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
