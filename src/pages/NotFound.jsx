import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Compass } from "lucide-react";

export default function NotFound() {
  useEffect(() => {
    document.title = "Page Not Found | CarGo";
  }, []);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-50 text-gold-600 dark:bg-gold-500/10 dark:text-gold-400">
        <Compass className="h-8 w-8" />
      </span>
      <h1 className="mt-5 font-display text-3xl font-bold text-navy-950 dark:text-white">Page Not Found</h1>
      <p className="mt-2 text-navy-600 dark:text-white/60">The page you're looking for doesn't exist or may have moved.</p>
      <Link
        to="/"
        className="mt-6 rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-navy-950 hover:bg-gold-600"
      >
        Back to Home
      </Link>
    </div>
  );
}
