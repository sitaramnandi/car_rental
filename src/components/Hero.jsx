import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Wallet, Car, CalendarRange } from "lucide-react";
import WhatsAppButton from "./WhatsAppButton";
import FeatureCard from "./FeatureCard";
import { HERO_HEADLINE, HERO_HEADLINE_ACCENT, HERO_SUBTEXT } from "../utils/config";
import { generalEnquiryMessage } from "../utils/whatsapp";

const FEATURES = [
  { icon: ShieldCheck, title: "Well Maintained Cars" },
  { icon: Wallet, title: "Affordable Pricing" },
  { icon: Car, title: "Wide Range of Vehicles" },
  { icon: CalendarRange, title: "Flexible Rental Periods" },
];

export default function Hero() {
  return (
    <section className="px-4 pt-6 sm:px-6 lg:px-8 lg:pt-10">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl bg-navy-950">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80"
              alt=""
              className="h-full w-full object-cover opacity-40 lg:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/10 lg:via-navy-950/70" />
          </div>

          <div className="relative grid gap-10 px-6 py-14 sm:px-10 sm:py-16 lg:grid-cols-2 lg:px-16 lg:py-24">
            <div className="flex flex-col justify-center animate-fade-up">
              <h1 className="font-display text-4xl font-bold leading-[1.1] text-white text-balance sm:text-5xl lg:text-6xl">
                {HERO_HEADLINE}
                <br />
                <span className="text-gold-400">{HERO_HEADLINE_ACCENT}</span>
              </h1>
              <p className="mt-5 max-w-md text-base leading-relaxed text-white/70 sm:text-lg">{HERO_SUBTEXT}</p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/cars"
                  className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3.5 text-sm font-semibold text-navy-950 shadow-lifted transition-colors hover:bg-gold-600 sm:text-base"
                >
                  Browse Cars
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <WhatsAppButton message={generalEnquiryMessage()} size="lg" />
              </div>
            </div>
          </div>

          <div className="relative border-t border-white/10 px-6 py-8 sm:px-10 lg:px-16">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4">
              {FEATURES.map((f) => (
                <FeatureCard key={f.title} icon={f.icon} title={f.title} variant="dark" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
