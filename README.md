# CarGo — Car Rental Website

A modern, responsive car rental website built with React, Vite, Tailwind CSS, and a small self-hosted Express API.
Customers browse and filter cars and enquire directly over WhatsApp; the owner manages the car catalogue through a
simple, protected admin area.

## Stack

- React + Vite (JavaScript) + Tailwind CSS v4 — the frontend
- Express — a small API (`server/`) for the car catalogue, admin login, and image uploads
- A JSON file (`server/data/cars.json`) as the database, and `server/uploads/` for photos — no external DB required
- React Router, lucide-react icons

## How data persists

There's no third-party database. `server/data/cars.json` holds the car catalogue, and uploaded photos are saved to
`server/uploads/` and served back as static files. The Express API is the only thing that reads/writes those files —
the React app always talks to it over `/api/*`.

**`cars.json` is intentionally gitignored** — it's your real, mutable data. Only `server/data/cars.seed.json` (a
handful of example cars) is committed. On first run, if `cars.json` doesn't exist yet, the server creates it by
copying `cars.seed.json` automatically — so a fresh clone/deploy works out of the box, but a later `git pull` or
redeploy can never clobber cars an admin has actually added. Same reasoning for `server/uploads/*` — those files are
gitignored (only `.gitkeep` is tracked, to keep the empty folder in git).

## Getting started

```bash
npm install
cp .env.example .env   # set your WhatsApp number + admin login + JWT secret
npm run dev:all        # runs the Vite dev server AND the API together
```

Open `http://localhost:5173`. Vite proxies `/api` and `/uploads` to the Express server (`http://localhost:4000` by
default), so everything works from one origin with no CORS setup.

Log into the admin area at `/admin/login` with the `ADMIN_EMAIL` / `ADMIN_PASSWORD` you set in `.env`.

### Running the pieces separately

```bash
npm run dev         # Vite only
npm run server:dev  # Express API only, auto-restarts on server/ code changes (nodemon)
npm run server      # Express API, no auto-restart (closer to production)
```

## Environment variables

```env
VITE_WHATSAPP_NUMBER=      # digits only, with country code, e.g. 911234567890

PORT=4000                  # port the Express API listens on
JWT_SECRET=                # any long random string — signs admin login sessions
ADMIN_EMAIL=                # the one admin account for this site (no self-signup)
ADMIN_PASSWORD=
```

`JWT_SECRET` / `ADMIN_EMAIL` / `ADMIN_PASSWORD` are server-only (no `VITE_` prefix), so they're never bundled into
the frontend. Never commit `.env`.

## Scripts

```bash
npm run dev:all   # Vite + Express together (recommended for local dev)
npm run dev       # Vite only
npm run server    # Express API only
npm run build     # production build of the frontend
npm run preview   # preview the production build
npm run lint      # oxlint
```

## Deployment

This app has two parts to deploy:

1. **The API** (`server/`) needs to run somewhere with a **persistent disk** — `cars.json` and `server/uploads/`
   must survive restarts. Render's free web-service tier does *not* include persistent disk storage, so either use a
   paid Render instance with a disk attached, or swap image/data storage for an external free service (e.g.
   Cloudinary for images, a free Postgres like Neon for the car list) if you want to stay on a free tier.
2. **The frontend** (`npm run build` → `dist/`) can be hosted anywhere static (Vercel, Render static site, etc.), as
   long as it can reach the API — set `VITE_API_URL` if the API isn't served from the same origin, and update
   `src/lib/api.js` to use it instead of the relative `/api` path.

## Project structure

```text
server/
├── index.js         Express app entry point
├── routes/          auth.js, cars.js, upload.js
├── middleware/       auth.js — JWT verification
├── utils/db.js       reads/writes server/data/cars.json (serialized writes)
├── data/cars.seed.json  tracked example data — copied to cars.json on first run
├── data/cars.json    the live car catalogue ("the database") — gitignored
└── uploads/          uploaded car photos, served at /uploads/* — gitignored

src/
├── components/     reusable UI (CarCard, WhatsAppButton, ImageGallery, ...)
├── pages/          route-level pages, including pages/admin
├── layouts/         MainLayout (site) and AdminLayout (dashboard)
├── hooks/           useAuth, useToast, useTheme, useWishlist, useDebounce
├── lib/             api.js — fetch wrapper + auth token storage
├── services/        carService.js — all API calls
└── utils/           config, formatting, WhatsApp message helpers
```
