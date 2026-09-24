import { Router } from "express";
import { randomUUID } from "crypto";
import { readCars, updateCars } from "../utils/db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

const REQUIRED_FIELDS = ["name", "brand", "model", "price_per_day", "seats", "fuel_type", "transmission", "description"];

function validate(body) {
  for (const field of REQUIRED_FIELDS) {
    if (body[field] === undefined || body[field] === null || body[field] === "") {
      return `"${field}" is required.`;
    }
  }
  if (Number(body.price_per_day) <= 0) return "price_per_day must be greater than 0.";
  if (Number(body.seats) <= 0) return "seats must be greater than 0.";
  return null;
}

router.get("/", async (_req, res) => {
  const cars = await readCars();
  res.json(cars);
});

router.get("/:id", async (req, res) => {
  const cars = await readCars();
  const car = cars.find((c) => c.id === req.params.id);
  if (!car) return res.status(404).json({ error: "Car not found." });
  res.json(car);
});

router.post("/", requireAuth, async (req, res) => {
  const error = validate(req.body);
  if (error) return res.status(400).json({ error });

  const now = new Date().toISOString();
  const car = {
    id: randomUUID(),
    name: req.body.name,
    brand: req.body.brand,
    model: req.body.model,
    price_per_day: Number(req.body.price_per_day),
    seats: Number(req.body.seats),
    fuel_type: req.body.fuel_type,
    transmission: req.body.transmission,
    description: req.body.description,
    features: Array.isArray(req.body.features) ? req.body.features : [],
    image_url: req.body.image_url || null,
    gallery_images: Array.isArray(req.body.gallery_images) ? req.body.gallery_images : [],
    available: req.body.available !== false,
    created_at: now,
    updated_at: now,
  };

  await updateCars((cars) => [...cars, car]);
  res.status(201).json(car);
});

router.put("/:id", requireAuth, async (req, res) => {
  const error = validate(req.body);
  if (error) return res.status(400).json({ error });

  let updated = null;
  const cars = await updateCars((cars) =>
    cars.map((c) => {
      if (c.id !== req.params.id) return c;
      updated = {
        ...c,
        name: req.body.name,
        brand: req.body.brand,
        model: req.body.model,
        price_per_day: Number(req.body.price_per_day),
        seats: Number(req.body.seats),
        fuel_type: req.body.fuel_type,
        transmission: req.body.transmission,
        description: req.body.description,
        features: Array.isArray(req.body.features) ? req.body.features : [],
        image_url: req.body.image_url ?? c.image_url,
        gallery_images: Array.isArray(req.body.gallery_images) ? req.body.gallery_images : c.gallery_images,
        available: req.body.available !== false,
        updated_at: new Date().toISOString(),
      };
      return updated;
    })
  );

  if (!updated) return res.status(404).json({ error: "Car not found." });
  res.json(updated);
});

router.delete("/:id", requireAuth, async (req, res) => {
  let existed = false;
  await updateCars((cars) => {
    const next = cars.filter((c) => c.id !== req.params.id);
    existed = next.length !== cars.length;
    return next;
  });

  if (!existed) return res.status(404).json({ error: "Car not found." });
  res.json({ success: true });
});

export default router;
