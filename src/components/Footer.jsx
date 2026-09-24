import { Link } from "react-router-dom";
import { MapPin, Mail, Phone, Clock } from "lucide-react";
import Logo from "./Logo";
import { CONTACT, FOOTER_TAGLINE } from "../utils/config";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 text-white/70">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo variant="dark" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              Reliable, comfortable and affordable cars for your next journey — well maintained and ready to go.
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-white">Quick Links</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link to="/" className="hover:text-gold-400">Home</Link></li>
              <li><Link to="/cars" className="hover:text-gold-400">Cars</Link></li>
              <li><Link to="/about" className="hover:text-gold-400">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-gold-400">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-white">Popular Cars</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link to="/cars" className="hover:text-gold-400">SUVs</Link></li>
              <li><Link to="/cars" className="hover:text-gold-400">Sedans</Link></li>
              <li><Link to="/cars" className="hover:text-gold-400">Luxury Cars</Link></li>
              <li><Link to="/cars" className="hover:text-gold-400">Electric Cars</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-white">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <span>{CONTACT.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-gold-400" />
                <span>{CONTACT.phoneDisplay}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-gold-400" />
                <span>{CONTACT.email}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 shrink-0 text-gold-400" />
                <span>{CONTACT.hours}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs sm:flex-row sm:px-6 lg:px-8">
          <p>© {year} CarGo. All rights reserved.</p>
          <p className="font-medium text-white/50">{FOOTER_TAGLINE}</p>
        </div>
      </div>
    </footer>
  );
}
