import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import Logo from "./Logo";
import WhatsAppButton from "./WhatsAppButton";
import ThemeToggle from "./ThemeToggle";
import { CONTACT } from "../utils/config";

const NAV_LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/cars", label: "Cars" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const linkClass = ({ isActive }) =>
    `text-sm font-semibold transition-colors ${
      isActive ? "text-gold-600" : "text-navy-800 hover:text-gold-600 dark:text-white/80 dark:hover:text-gold-400"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-navy-950/5 bg-white/95 backdrop-blur dark:border-white/8 dark:bg-navy-950/95">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={`tel:${CONTACT.phoneDisplay.replace(/\s+/g, "")}`}
            className="mr-2 flex items-center gap-2 text-sm font-semibold text-navy-800 hover:text-gold-600 dark:text-white/80 dark:hover:text-gold-400"
          >
            <Phone className="h-4 w-4" />
            {CONTACT.phoneDisplay}
          </a>
          <ThemeToggle />
          <WhatsAppButton variant="icon" size="md" />
          <NavLink
            to="/contact"
            className="rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-navy-950 shadow-soft transition-colors hover:bg-gold-600"
          >
            Get in Touch
          </NavLink>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <WhatsAppButton variant="icon" size="sm" />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-navy-900 hover:bg-navy-950/5 dark:text-white dark:hover:bg-white/10"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-navy-950/5 bg-white px-4 pb-6 pt-2 dark:border-white/8 dark:bg-navy-950 lg:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-3 text-base font-semibold ${
                    isActive
                      ? "bg-gold-50 text-gold-700 dark:bg-gold-500/10 dark:text-gold-400"
                      : "text-navy-800 dark:text-white/80"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <a
            href={`tel:${CONTACT.phoneDisplay.replace(/\s+/g, "")}`}
            className="mt-3 flex items-center gap-2 px-3 text-sm font-semibold text-navy-700 dark:text-white/70"
          >
            <Phone className="h-4 w-4" />
            {CONTACT.phoneDisplay}
          </a>
          <NavLink
            to="/contact"
            onClick={() => setOpen(false)}
            className="mt-4 block rounded-full bg-gold-500 px-5 py-3 text-center text-sm font-semibold text-navy-950 shadow-soft"
          >
            Get in Touch
          </NavLink>
        </div>
      )}
    </header>
  );
}
