import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Hero from "../components/Hero";
import CarGrid from "../components/CarGrid";
import WhatsAppButton from "../components/WhatsAppButton";
import { getFeaturedCars } from "../services/carService";
import { generalEnquiryMessage } from "../utils/whatsapp";

export default function Home() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "CarGo | Your Journey. Our Cars.";
    getFeaturedCars(8)
      .then(setCars)
      .catch(() => setCars([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <Hero />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-navy-950 dark:text-white sm:text-4xl">Popular Cars</h2>
          <p className="mx-auto mt-2 max-w-xl text-navy-600 dark:text-white/60">
            Hand-picked favourites from our fleet, ready for your next trip.
          </p>
        </div>

        <div className="mt-10">
          <CarGrid cars={cars} loading={loading} />
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            to="/cars"
            className="inline-flex items-center gap-2 rounded-full border-2 border-navy-950 px-6 py-3 text-sm font-semibold text-navy-950 transition-colors hover:bg-navy-950 hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-navy-950"
          >
            View All Cars
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy-950 py-16 sm:py-20">
        <div className="absolute inset-0 opacity-[0.06]">
          <div className="h-full w-full bg-[radial-gradient(circle_at_20%_20%,#fff_0,transparent_35%),radial-gradient(circle_at_80%_60%,#fff_0,transparent_35%)]" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">Ready for your next journey?</h2>
          <p className="mx-auto mt-3 max-w-lg text-white/70">
            Chat with us on WhatsApp for instant availability and the best rental price.
          </p>
          <div className="mt-8 flex justify-center">
            <WhatsAppButton message={generalEnquiryMessage()} size="lg" />
          </div>
        </div>
      </section>
    </div>
  );
}
