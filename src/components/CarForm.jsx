import { useState } from "react";
import { Plus, X } from "lucide-react";
import ImageUploader from "./ImageUploader";

const FUEL_TYPES = ["Petrol", "Diesel", "Electric", "CNG", "Hybrid"];
const TRANSMISSIONS = ["Manual", "Automatic"];

function toImageItems(urls = []) {
  return urls.filter(Boolean).map((url) => ({ id: url, url }));
}

export default function CarForm({ initialData, submitLabel = "Save Car", onSubmit, submitting }) {
  const [values, setValues] = useState({
    name: initialData?.name || "",
    brand: initialData?.brand || "",
    model: initialData?.model || "",
    price_per_day: initialData?.price_per_day ?? "",
    seats: initialData?.seats ?? "",
    fuel_type: initialData?.fuel_type || FUEL_TYPES[0],
    transmission: initialData?.transmission || TRANSMISSIONS[0],
    available: initialData?.available ?? true,
    description: initialData?.description || "",
  });
  const [features, setFeatures] = useState(initialData?.features || []);
  const [featureInput, setFeatureInput] = useState("");
  const [primaryImage, setPrimaryImage] = useState(toImageItems(initialData?.image_url ? [initialData.image_url] : []));
  const [galleryImages, setGalleryImages] = useState(toImageItems(initialData?.gallery_images));
  const [errors, setErrors] = useState({});

  const set = (key) => (e) => setValues((v) => ({ ...v, [key]: e.target.value }));

  const addFeature = () => {
    const trimmed = featureInput.trim();
    if (trimmed && !features.includes(trimmed)) {
      setFeatures((f) => [...f, trimmed]);
    }
    setFeatureInput("");
  };

  const removeFeature = (f) => setFeatures((list) => list.filter((item) => item !== f));

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = "Car name is required.";
    if (!values.brand.trim()) next.brand = "Brand is required.";
    if (!values.model.trim()) next.model = "Model is required.";
    if (!values.price_per_day || Number(values.price_per_day) <= 0) next.price_per_day = "Enter a valid price.";
    if (!values.seats || Number(values.seats) <= 0) next.seats = "Enter a valid seat count.";
    if (!values.description.trim()) next.description = "Description is required.";
    if (primaryImage.length === 0) next.primaryImage = "A primary image is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      data: {
        name: values.name.trim(),
        brand: values.brand.trim(),
        model: values.model.trim(),
        price_per_day: Number(values.price_per_day),
        seats: Number(values.seats),
        fuel_type: values.fuel_type,
        transmission: values.transmission,
        available: !!values.available,
        description: values.description.trim(),
        features,
      },
      primaryImage: primaryImage[0] || null,
      galleryImages,
      originalPrimaryUrl: initialData?.image_url || null,
      originalGalleryUrls: initialData?.gallery_images || [],
    });
  };

  const inputClass = (hasError) =>
    `mt-1.5 w-full rounded-lg border px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 dark:bg-navy-900 dark:text-white ${
      hasError
        ? "border-red-300 focus:border-red-400 focus:ring-red-100 dark:border-red-500/40"
        : "border-navy-950/12 focus:border-gold-400 focus:ring-gold-100 dark:border-white/12 dark:focus:ring-gold-500/20"
    }`;
  const labelClass = "text-xs font-semibold text-navy-600 dark:text-white/60";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section className="rounded-2xl border border-navy-950/8 bg-white p-6 dark:border-white/8 dark:bg-navy-900">
        <h2 className="font-display text-base font-semibold text-navy-950 dark:text-white">Basic Details</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className={labelClass}>Car Name</span>
            <input value={values.name} onChange={set("name")} className={inputClass(errors.name)} placeholder="Toyota Innova Crysta" />
            {errors.name && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.name}</p>}
          </label>
          <label className="block">
            <span className={labelClass}>Brand</span>
            <input value={values.brand} onChange={set("brand")} className={inputClass(errors.brand)} placeholder="Toyota" />
            {errors.brand && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.brand}</p>}
          </label>
          <label className="block">
            <span className={labelClass}>Model</span>
            <input value={values.model} onChange={set("model")} className={inputClass(errors.model)} placeholder="Innova Crysta" />
            {errors.model && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.model}</p>}
          </label>
          <label className="block">
            <span className={labelClass}>Price Per Day (₹)</span>
            <input
              type="number"
              min="0"
              value={values.price_per_day}
              onChange={set("price_per_day")}
              className={inputClass(errors.price_per_day)}
              placeholder="2500"
            />
            {errors.price_per_day && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.price_per_day}</p>}
          </label>
          <label className="block">
            <span className={labelClass}>Seats</span>
            <input
              type="number"
              min="1"
              value={values.seats}
              onChange={set("seats")}
              className={inputClass(errors.seats)}
              placeholder="7"
            />
            {errors.seats && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.seats}</p>}
          </label>
          <label className="block">
            <span className={labelClass}>Fuel Type</span>
            <select value={values.fuel_type} onChange={set("fuel_type")} className={inputClass(false)}>
              {FUEL_TYPES.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className={labelClass}>Transmission</span>
            <select value={values.transmission} onChange={set("transmission")} className={inputClass(false)}>
              {TRANSMISSIONS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2.5 self-end pb-2.5">
            <input
              type="checkbox"
              checked={values.available}
              onChange={(e) => setValues((v) => ({ ...v, available: e.target.checked }))}
              className="h-4 w-4 rounded border-navy-300 text-gold-500 focus:ring-gold-400 dark:border-white/20 dark:bg-navy-900"
            />
            <span className="text-sm font-medium text-navy-800 dark:text-white/80">Available for rent</span>
          </label>
        </div>

        <label className="mt-4 block">
          <span className={labelClass}>Description</span>
          <textarea
            rows={4}
            value={values.description}
            onChange={set("description")}
            className={inputClass(errors.description) + " resize-none"}
            placeholder="A short description of the car, ideal for family trips..."
          />
          {errors.description && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.description}</p>}
        </label>

        <div className="mt-4">
          <span className={labelClass}>Features</span>
          <div className="mt-1.5 flex gap-2">
            <input
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addFeature();
                }
              }}
              placeholder="e.g. Air Conditioning"
              className="flex-1 rounded-lg border border-navy-950/12 px-3.5 py-2.5 text-sm focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-100 dark:border-white/12 dark:bg-navy-900 dark:text-white dark:focus:ring-gold-500/20"
            />
            <button
              type="button"
              onClick={addFeature}
              className="flex items-center gap-1.5 rounded-lg bg-navy-950 px-4 text-sm font-semibold text-white dark:bg-white dark:text-navy-950"
            >
              <Plus className="h-4 w-4" />
              Add
            </button>
          </div>
          {features.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {features.map((f) => (
                <span key={f} className="flex items-center gap-1.5 rounded-full bg-navy-50 px-3 py-1.5 text-xs font-medium text-navy-700 dark:bg-white/10 dark:text-white/70">
                  {f}
                  <button type="button" onClick={() => removeFeature(f)} aria-label={`Remove ${f}`}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-navy-950/8 bg-white p-6 dark:border-white/8 dark:bg-navy-900">
        <h2 className="font-display text-base font-semibold text-navy-950 dark:text-white">Photos</h2>
        <div className="mt-4">
          <ImageUploader
            label="Primary Image"
            hint="This is the main photo shown on car cards."
            value={primaryImage}
            onChange={setPrimaryImage}
            multiple={false}
          />
          {errors.primaryImage && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.primaryImage}</p>}
        </div>
        <div className="mt-6">
          <ImageUploader
            label="Gallery Images"
            hint="Additional photos shown on the car details page."
            value={galleryImages}
            onChange={setGalleryImages}
            multiple
          />
        </div>
      </section>

      <div className="flex justify-end gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-gold-500 px-7 py-3 text-sm font-semibold text-navy-950 hover:bg-gold-600 disabled:opacity-60"
        >
          {submitting ? "Saving…" : submitLabel}
        </button>
      </div>
    </form>
  );
}
