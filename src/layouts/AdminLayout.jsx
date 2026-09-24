import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, Car, LogOut, Menu, X, ChevronDown } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import ThemeToggle from "../components/ThemeToggle";

const NAV_ITEMS = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/cars", label: "Cars", icon: Car },
];

function SidebarContent({ onNavigate }) {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("Logged out successfully.");
      navigate("/admin/login");
    } catch {
      toast.error("Could not log out. Please try again.");
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2.5 px-5 py-6">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold-500 text-navy-950">
          <Car className="h-5 w-5" strokeWidth={2.5} />
        </span>
        <div className="leading-tight">
          <p className="font-display text-base font-bold text-white">CarGo</p>
          <p className="text-[11px] font-medium text-white/50">Admin</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors ${
                isActive ? "bg-gold-500 text-navy-950" : "text-white/70 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <Icon className="h-4.5 w-4.5" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-white/10 px-3 py-4">
        {user?.email && <p className="truncate px-3.5 pb-2 text-xs text-white/40">{user.email}</p>}
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-white/70 transition-colors hover:bg-white/5 hover:text-white"
        >
          <LogOut className="h-4.5 w-4.5" />
          Logout
        </button>
      </div>
    </div>
  );
}

export default function AdminLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-cream dark:bg-navy-950 lg:flex">
      <aside className="hidden w-64 shrink-0 bg-navy-950 lg:block">
        <div className="sticky top-0 h-screen">
          <SidebarContent />
        </div>
      </aside>

      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-navy-950/60" onClick={() => setDrawerOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-64 bg-navy-950 shadow-lifted">
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close menu"
              className="absolute right-3 top-5 flex h-8 w-8 items-center justify-center rounded-full text-white/60 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
            <SidebarContent onNavigate={() => setDrawerOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-navy-950/8 bg-white px-4 py-3.5 dark:border-white/8 dark:bg-navy-900 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-navy-800 hover:bg-navy-950/5 dark:text-white/80 dark:hover:bg-white/10 lg:hidden"
          >
            <Menu className="h-5.5 w-5.5" />
          </button>
          <span className="hidden font-display text-sm font-semibold text-navy-500 dark:text-white/50 lg:block">Admin Panel</span>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <div className="flex items-center gap-2 rounded-full bg-navy-950/5 py-1.5 pl-1.5 pr-3 dark:bg-white/10">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-navy-950 text-xs font-bold text-white dark:bg-gold-500 dark:text-navy-950">
                {user?.email?.[0]?.toUpperCase() || "A"}
              </span>
              <span className="text-sm font-medium text-navy-800 dark:text-white/80">Admin</span>
              <ChevronDown className="h-3.5 w-3.5 text-navy-500 dark:text-white/50" />
            </div>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
