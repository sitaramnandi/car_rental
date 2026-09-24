import { useEffect, useState } from "react";

const WISHLIST_KEY = "cargo_wishlist";

export function useWishlist(carId) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const list = JSON.parse(localStorage.getItem(WISHLIST_KEY) || "[]");
      setSaved(list.includes(carId));
    } catch {
      setSaved(false);
    }
  }, [carId]);

  const toggle = () => {
    try {
      const list = JSON.parse(localStorage.getItem(WISHLIST_KEY) || "[]");
      const next = list.includes(carId) ? list.filter((id) => id !== carId) : [...list, carId];
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(next));
      setSaved(next.includes(carId));
    } catch {
      /* localStorage unavailable — ignore */
    }
  };

  return [saved, toggle];
}
