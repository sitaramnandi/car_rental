export function formatPrice(value) {
  const amount = Number(value) || 0;
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

/**
 * Builds the public, SEO-friendly URL for a car, e.g. /cars/skoda/skoda-slavia.
 */
export function carUrl(car) {
  return `/cars/${slugify(car.brand)}/${slugify(car.name)}`;
}
