import { readFile, writeFile, access, copyFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, "..", "data", "cars.json");
const SEED_PATH = path.join(__dirname, "..", "data", "cars.seed.json");

// Serializes writes so two near-simultaneous saves can't clobber each other.
let queue = Promise.resolve();

// server/data/cars.json is the live database and is gitignored on purpose —
// committing it would mean a future `git pull` on the server overwrites real
// admin-entered data with old seed data. If it's missing (first run on a
// fresh checkout/deploy), seed it once from the tracked cars.seed.json.
async function ensureDbExists() {
  try {
    await access(DB_PATH);
  } catch {
    await copyFile(SEED_PATH, DB_PATH);
    console.log("server/data/cars.json did not exist — created it from cars.seed.json.");
  }
}

export async function readCars() {
  await ensureDbExists();
  const raw = await readFile(DB_PATH, "utf-8");
  return JSON.parse(raw);
}

function writeCars(cars) {
  return writeFile(DB_PATH, JSON.stringify(cars, null, 2), "utf-8");
}

/**
 * Reads the car list, lets `mutate` modify it, then persists the result.
 * `mutate` may be async and must return the new array.
 */
export function updateCars(mutate) {
  const task = queue.then(async () => {
    const cars = await readCars();
    const next = await mutate(cars);
    await writeCars(next);
    return next;
  });
  // Keep the chain alive even if this write fails, so later writes still run.
  queue = task.catch(() => {});
  return task;
}
