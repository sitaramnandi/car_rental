import jwt from "jsonwebtoken";

// Read lazily (not at module load) so this works regardless of import order
// relative to dotenv.config() in server/index.js.
function secret() {
  return process.env.JWT_SECRET;
}

export function signToken(payload) {
  return jwt.sign(payload, secret(), { expiresIn: "7d" });
}

export function verifyToken(token) {
  return jwt.verify(token, secret());
}

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: "Not authenticated." });
  }

  try {
    req.user = verifyToken(token);
    next();
  } catch {
    return res.status(401).json({ error: "Session expired. Please log in again." });
  }
}
