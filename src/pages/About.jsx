import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Wallet, Car, CalendarRange, Users2, Award } from "lucide-react";
import FeatureCard from "../components/FeatureCard";
import WhatsAppButton from "../components/WhatsAppButton";
import { BUSINESS_NAME } from "../utils/config";
import { generalEnquiryMessage } from "../utils/whatsapp";

const VALUES = [
  { icon: ShieldCheck, title: "Well Maintained Cars", description: "Every vehicle is serviced and inspected regularly for a safe, comfortable ride." },
  { icon: Wallet, title: "Affordable Pricing", description: "Transparent, competitive daily rates with no hidden charges." },
  { icon: Car, title: "Wide Range of Vehicles", description: "From hatchbacks to SUVs and luxury sedans — a car for every occasion." },
  { icon: CalendarRange, title: "Flexible Rental Periods", description: "Rent for a day, a week, or longer — whatever suits your plans." },
];

const STATS = [
  { icon: Car, value: "50+", label: "Cars in Fleet" },
  { icon: Users2, value: "5,000+", label: "Happy Customers" },
  { icon: Award, value: "8+", label: "Years of Service" },
];

export default function About() {
  useEffect(() => {
    document.title = "About Us | CarGo";
  }, []);

  return (
    <div>
      <section className="bg-navy-950">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-20">
          <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">About {BUSINESS_NAME}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/70">
            We're a local car rental business built on a simple idea — reliable cars, honest pricing, and
            personal service. No middlemen, no hidden fees, just a quick chat on WhatsApp and you're on the road.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-display text-2xl font-bold text-navy-950 dark:text-white sm:text-3xl">Our Story</h2>
            <p className="mt-4 text-navy-600 leading-relaxed dark:text-white/60">
              {BUSINESS_NAME} started with a single car and a promise: treat every customer's journey like our own.
              Today, we maintain a growing fleet of well-serviced vehicles for city commutes, family trips, and
              special occasions across the region.
            </p>
            <p className="mt-4 text-navy-600 leading-relaxed dark:text-white/60">
              We keep things simple — browse our cars, check the details you need, and message us directly on
              WhatsApp. Our team confirms availability and rental details personally, so you always know exactly
              what you're getting.
            </p>
            <Link
              to="/cars"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-navy-950 hover:bg-gold-600"
            >
              Browse Our Cars
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {STATS.map(({ icon: Icon, value, label }) => (
              <div key={label} className="rounded-2xl border border-navy-950/8 bg-white p-5 text-center shadow-soft dark:border-white/8 dark:bg-navy-900">
                <Icon className="mx-auto h-6 w-6 text-gold-600 dark:text-gold-400" />
                <p className="mt-3 font-display text-xl font-bold text-navy-950 dark:text-white sm:text-2xl">{value}</p>
                <p className="mt-1 text-xs text-navy-500 dark:text-white/50 sm:text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 dark:bg-navy-900 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-2xl font-bold text-navy-950 dark:text-white sm:text-3xl">Why Choose Us</h2>
            <p className="mx-auto mt-2 max-w-xl text-navy-600 dark:text-white/60">
              What you can expect every time you rent with {BUSINESS_NAME}.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <FeatureCard key={v.title} {...v} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <h2 className="font-display text-2xl font-bold text-navy-950 dark:text-white sm:text-3xl">Have questions?</h2>
        <p className="mt-3 text-navy-600 dark:text-white/60">We're just a message away — reach out on WhatsApp any time.</p>
        <div className="mt-6 flex justify-center">
          <WhatsAppButton message={generalEnquiryMessage()} size="lg" />
        </div>
      </section>
    </div>
  );
}
