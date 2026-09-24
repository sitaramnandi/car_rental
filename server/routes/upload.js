import { Router } from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { randomUUID } from "crypto";
import { unlink } from "fs/promises";
import { requireAuth } from "../middleware/auth.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOADS_DIR = path.join(__dirname, "..", "uploads");

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOADS_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase() || ".jpg";
    cb(null, `${randomUUID()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed."));
    }
    cb(null, true);
  },
});

const router = Router();

router.post("/", requireAuth, upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file was uploaded." });
  }
  res.json({ url: `/uploads/${req.file.filename}` });
});

router.delete("/", requireAuth, async (req, res) => {
  const { url } = req.body || {};
  if (typeof url !== "string" || !url.startsWith("/uploads/")) {
    return res.status(400).json({ error: "A valid /uploads/ url is required." });
  }

  const filename = path.basename(url);
  const filePath = path.join(UPLOADS_DIR, filename);

  // Guard against path traversal — resolved path must stay inside UPLOADS_DIR.
  if (!filePath.startsWith(UPLOADS_DIR)) {
    return res.status(400).json({ error: "Invalid file path." });
  }

  try {
    await unlink(filePath);
  } catch (err) {
    if (err.code !== "ENOENT") throw err;
  }
  res.json({ success: true });
});

export default router;
