export const PRICE_RANGES = [
  { label: "Any Price", min: null, max: null },
  { label: "Under ₹1,500", min: null, max: 1500 },
  { label: "₹1,500 - ₹3,000", min: 1500, max: 3000 },
  { label: "₹3,000 - ₹5,000", min: 3000, max: 5000 },
  { label: "Above ₹5,000", min: 5000, max: null },
];

export const SORT_OPTIONS = [
  { value: "popular", label: "Popular" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
];
