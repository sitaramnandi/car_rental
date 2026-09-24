import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Car, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

export default function Login() {
  const { session, signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Admin Login | CarGo";
  }, []);

  if (session) {
    return <Navigate to={location.state?.from?.pathname || "/admin"} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signIn(email, password);
      navigate(location.state?.from?.pathname || "/admin", { replace: true });
    } catch (err) {
      setError(err.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-950 px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-500 text-navy-950">
            <Car className="h-6 w-6" strokeWidth={2.5} />
          </span>
          <h1 className="mt-4 font-display text-2xl font-bold text-white">CarGo Admin</h1>
          <p className="mt-1 text-sm text-white/50">Sign in to manage your car listings.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 rounded-2xl bg-white p-6 shadow-lifted sm:p-8">
          {error && (
            <p className="mb-4 rounded-lg bg-red-50 px-3.5 py-2.5 text-xs font-medium text-red-700">{error}</p>
          )}

          <label className="block">
            <span className="text-xs font-semibold text-navy-600">Email</span>
            <span className="relative mt-1.5 block">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
              <input
                type="email"
                required
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-navy-950/12 py-2.5 pl-10 pr-3.5 text-sm focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-100"
                placeholder="admin@cargo.example"
              />
            </span>
          </label>

          <label className="mt-4 block">
            <span className="text-xs font-semibold text-navy-600">Password</span>
            <span className="relative mt-1.5 block">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
              <input
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-navy-950/12 py-2.5 pl-10 pr-10 text-sm focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-100"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-400 hover:text-navy-700"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 flex w-full items-center justify-center rounded-full bg-gold-500 py-3 text-sm font-semibold text-navy-950 transition-colors hover:bg-gold-600 disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
