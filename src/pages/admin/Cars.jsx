import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { getCars, deleteCar, deleteCarImageByUrl } from "../../services/carService";
import { formatPrice } from "../../utils/format";
import LoadingSpinner from "../../components/LoadingSpinner";
import EmptyState from "../../components/EmptyState";
import ConfirmDialog from "../../components/ConfirmDialog";
import { useToast } from "../../hooks/useToast";

export default function Cars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [target, setTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const toast = useToast();

  useEffect(() => {
    document.title = "Manage Cars | CarGo Admin";
    load();
  }, []);

  const load = () => {
    setLoading(true);
    getCars({}, "popular")
      .then(setCars)
      .catch(() => toast.error("Failed to load cars."))
      .finally(() => setLoading(false));
  };

  const handleDelete = async () => {
    if (!target) return;
    setDeleting(true);
    try {
      const images = [target.image_url, ...(target.gallery_images || [])].filter(Boolean);
      await Promise.all(images.map((url) => deleteCarImageByUrl(url).catch(() => {})));
      await deleteCar(target.id);
      setCars((prev) => prev.filter((c) => c.id !== target.id));
      toast.success(`${target.name} was deleted.`);
      setTarget(null);
    } catch (err) {
      toast.error(err.message || "Failed to delete car.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-navy-950 dark:text-white">Cars</h1>
          <p className="mt-1 text-sm text-navy-500 dark:text-white/50">Manage your car listings.</p>
        </div>
        <Link
          to="/admin/cars/new"
          className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-navy-950 hover:bg-gold-600"
        >
          <Plus className="h-4 w-4" />
          Add New Car
        </Link>
      </div>

      {loading ? (
        <div className="flex min-h-[30vh] items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      ) : cars.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            title="No cars yet"
            description="Add your first car to start building your fleet listing."
            action={
              <Link to="/admin/cars/new" className="rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-navy-950">
                Add New Car
              </Link>
            }
          />
        </div>
      ) : (
        <>
          <div className="mt-6 hidden overflow-hidden rounded-2xl border border-navy-950/8 bg-white dark:border-white/8 dark:bg-navy-900 sm:block">
            <table className="w-full text-left text-sm">
              <thead className="bg-navy-50/60 text-xs font-semibold uppercase tracking-wide text-navy-500 dark:bg-white/5 dark:text-white/50">
                <tr>
                  <th className="px-5 py-3">Image</th>
                  <th className="px-5 py-3">Car Name</th>
                  <th className="px-5 py-3">Brand</th>
                  <th className="px-5 py-3">Price / Day</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-950/6 dark:divide-white/6">
                {cars.map((car) => (
                  <tr key={car.id}>
                    <td className="px-5 py-3">
                      <img
                        src={car.image_url || "/placeholder-car.svg"}
                        alt={car.name}
                        className="h-12 w-16 rounded-lg object-cover"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "/placeholder-car.svg";
                        }}
                      />
                    </td>
                    <td className="px-5 py-3 font-semibold text-navy-900 dark:text-white">{car.name}</td>
                    <td className="px-5 py-3 text-navy-600 dark:text-white/60">{car.brand}</td>
                    <td className="px-5 py-3 font-semibold text-gold-600 dark:text-gold-400">{formatPrice(car.price_per_day)}</td>
                    <td className="px-5 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          car.available ? "bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400" : "bg-navy-950/8 text-navy-600 dark:bg-white/10 dark:text-white/60"
                        }`}
                      >
                        {car.available ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/cars/${car.id}/edit`}
                          aria-label={`Edit ${car.name}`}
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-navy-950/10 text-navy-700 hover:bg-navy-950/5 dark:border-white/10 dark:text-white/70 dark:hover:bg-white/10"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => setTarget(car)}
                          aria-label={`Delete ${car.name}`}
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-100 text-red-600 hover:bg-red-50 dark:border-red-500/20 dark:text-red-400 dark:hover:bg-red-500/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 space-y-3 sm:hidden">
            {cars.map((car) => (
              <div key={car.id} className="flex items-center gap-3 rounded-2xl border border-navy-950/8 bg-white p-3 dark:border-white/8 dark:bg-navy-900">
                <img
                  src={car.image_url || "/placeholder-car.svg"}
                  alt={car.name}
                  className="h-14 w-20 shrink-0 rounded-lg object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/placeholder-car.svg";
                  }}
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-navy-900 dark:text-white">{car.name}</p>
                  <p className="text-xs text-navy-500 dark:text-white/50">{car.brand}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-sm font-semibold text-gold-600 dark:text-gold-400">{formatPrice(car.price_per_day)}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                        car.available ? "bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400" : "bg-navy-950/8 text-navy-600 dark:bg-white/10 dark:text-white/60"
                      }`}
                    >
                      {car.available ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
                <div className="flex shrink-0 flex-col gap-2">
                  <Link
                    to={`/admin/cars/${car.id}/edit`}
                    aria-label={`Edit ${car.name}`}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-navy-950/10 text-navy-700 dark:border-white/10 dark:text-white/70"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => setTarget(car)}
                    aria-label={`Delete ${car.name}`}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-100 text-red-600 dark:border-red-500/20 dark:text-red-400"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <ConfirmDialog
        open={!!target}
        title="Delete this car?"
        description={target ? `Are you sure you want to delete "${target.name}"? This cannot be undone.` : ""}
        confirmLabel="Delete"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setTarget(null)}
      />
    </div>
  );
}
