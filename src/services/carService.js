import { apiFetch } from "../lib/api";
import { slugify } from "../utils/format";

function applyFilters(cars, filters = {}) {
  let result = [...cars];
  const { search, brand, fuelType, seats, transmission, minPrice, maxPrice, availableOnly } = filters;

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      (c) => c.name.toLowerCase().includes(q) || c.brand.toLowerCase().includes(q) || c.model.toLowerCase().includes(q)
    );
  }
  if (brand) result = result.filter((c) => c.brand === brand);
  if (fuelType) result = result.filter((c) => c.fuel_type === fuelType);
  if (seats) result = result.filter((c) => String(c.seats) === String(seats));
  if (transmission) result = result.filter((c) => c.transmission === transmission);
  if (minPrice != null) result = result.filter((c) => c.price_per_day >= minPrice);
  if (maxPrice != null) result = result.filter((c) => c.price_per_day <= maxPrice);
  if (availableOnly) result = result.filter((c) => c.available);

  return result;
}

function applySort(cars, sortBy) {
  const result = [...cars];
  switch (sortBy) {
    case "price_asc":
      return result.sort((a, b) => a.price_per_day - b.price_per_day);
    case "price_desc":
      return result.sort((a, b) => b.price_per_day - a.price_per_day);
    case "popular":
    default:
      return result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }
}

let cache = null;

async function getAllCars({ fresh = false } = {}) {
  if (cache && !fresh) return cache;
  cache = await apiFetch("/cars");
  return cache;
}

function invalidateCache() {
  cache = null;
}

/**
 * Fetch cars with optional filters + sorting. Filtering/sorting happens
 * client-side since the whole catalogue is small (a JSON file, not a DB).
 */
export async function getCars(filters = {}, sortBy = "popular") {
  const cars = await getAllCars();
  return applySort(applyFilters(cars, filters), sortBy);
}

export async function getCarById(id) {
  const cars = await getAllCars();
  return cars.find((c) => String(c.id) === String(id)) || null;
}

/**
 * Resolves a car from its public URL slugs, e.g. /cars/skoda/skoda-slavia.
 */
export async function getCarBySlug(brandSlug, nameSlug) {
  const cars = await getAllCars();
  return cars.find((c) => slugify(c.brand) === brandSlug && slugify(c.name) === nameSlug) || null;
}

export async function getFeaturedCars(limit = 6) {
  const cars = await getCars({}, "popular");
  return cars.slice(0, limit);
}

export async function getFilterOptions() {
  const cars = await getAllCars();
  const brands = [...new Set(cars.map((c) => c.brand))].sort();
  const fuelTypes = [...new Set(cars.map((c) => c.fuel_type))].sort();
  const seatOptions = [...new Set(cars.map((c) => c.seats))].sort((a, b) => a - b);
  const transmissions = [...new Set(cars.map((c) => c.transmission))].sort();
  const prices = cars.map((c) => c.price_per_day);
  return {
    brands,
    fuelTypes,
    seatOptions,
    transmissions,
    minPrice: prices.length ? Math.min(...prices) : 0,
    maxPrice: prices.length ? Math.max(...prices) : 10000,
  };
}

export async function createCar(carData) {
  const car = await apiFetch("/cars", { method: "POST", body: carData });
  invalidateCache();
  return car;
}

export async function updateCar(id, carData) {
  const car = await apiFetch(`/cars/${id}`, { method: "PUT", body: carData });
  invalidateCache();
  return car;
}

export async function deleteCar(id) {
  await apiFetch(`/cars/${id}`, { method: "DELETE" });
  invalidateCache();
  return true;
}

/**
 * Uploads a single image file and returns its public URL (relative, e.g. "/uploads/xyz.jpg").
 */
export async function uploadCarImage(file) {
  const form = new FormData();
  form.append("file", file);
  const { url } = await apiFetch("/upload", { method: "POST", body: form });
  return { url };
}

export async function uploadCarImages(files) {
  const uploads = await Promise.all(files.map((file) => uploadCarImage(file)));
  return uploads;
}

/**
 * Removes an uploaded image from the server given its relative /uploads/ url.
 * Silently ignores external URLs (e.g. Unsplash placeholders) since those
 * aren't ours to delete.
 */
export async function deleteCarImageByUrl(url) {
  if (typeof url !== "string" || !url.startsWith("/uploads/")) return;
  await apiFetch("/upload", { method: "DELETE", body: { url } });
}

export async function getDashboardStats() {
  const cars = await getAllCars();
  return {
    total: cars.length,
    available: cars.filter((c) => c.available).length,
    unavailable: cars.filter((c) => !c.available).length,
  };
}
