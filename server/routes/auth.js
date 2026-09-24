import { Router } from "express";
import { timingSafeEqual } from "crypto";
import { signToken, requireAuth } from "../middleware/auth.js";

const router = Router();

function safeEqual(a, b) {
  const bufA = Buffer.from(String(a));
  const bufB = Buffer.from(String(b));
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

router.post("/login", (req, res) => {
  const { email, password } = req.body || {};
  const adminEmail = process.env.ADMIN_EMAIL || "";
  const adminPassword = process.env.ADMIN_PASSWORD || "";

  if (!adminEmail || !adminPassword) {
    return res.status(500).json({ error: "Admin credentials are not configured on the server." });
  }

  const emailOk = typeof email === "string" && safeEqual(email.trim().toLowerCase(), adminEmail.toLowerCase());
  const passwordOk = typeof password === "string" && safeEqual(password, adminPassword);

  if (!emailOk || !passwordOk) {
    return res.status(401).json({ error: "Invalid email or password." });
  }

  const token = signToken({ email: adminEmail });
  res.json({ token, user: { email: adminEmail } });
});

router.get("/me", requireAuth, (req, res) => {
  res.json({ user: { email: req.user.email } });
});

export default router;
