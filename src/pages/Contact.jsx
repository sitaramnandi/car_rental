import { useEffect, useState } from "react";
import { MapPin, Mail, Phone, Clock, Send } from "lucide-react";
import WhatsAppButton from "../components/WhatsAppButton";
import { CONTACT } from "../utils/config";
import { buildWhatsAppUrl } from "../utils/whatsapp";

const INFO_CARDS = [
  { icon: MapPin, label: "Address", value: CONTACT.address },
  { icon: Phone, label: "Phone", value: CONTACT.phoneDisplay },
  { icon: Mail, label: "Email", value: CONTACT.email },
  { icon: Clock, label: "Working Hours", value: CONTACT.hours },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  useEffect(() => {
    document.title = "Contact Us | CarGo";
  }, []);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const lines = [`Hi, my name is ${form.name || "—"}.`];
    if (form.phone) lines.push(`My contact number is ${form.phone}.`);
    lines.push(form.message || "I would like to know more about your car rental services.");
    window.open(buildWhatsAppUrl(lines.join(" ")), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="text-center">
        <h1 className="font-display text-3xl font-bold text-navy-950 dark:text-white sm:text-4xl">Get in Touch</h1>
        <p className="mx-auto mt-2 max-w-xl text-navy-600 dark:text-white/60">
          Questions about a car or your rental? Reach out — we typically reply within minutes on WhatsApp.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {INFO_CARDS.map(({ icon: Icon, label, value }) => (
          <div key={label} className="rounded-2xl border border-navy-950/8 bg-white p-5 text-center shadow-soft dark:border-white/8 dark:bg-navy-900">
            <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-gold-50 text-gold-600 dark:bg-gold-500/10 dark:text-gold-400">
              <Icon className="h-5 w-5" />
            </span>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-navy-500 dark:text-white/50">{label}</p>
            <p className="mt-1 text-sm font-medium text-navy-900 dark:text-white">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <div className="rounded-3xl bg-navy-950 p-8 text-white sm:p-10">
          <h2 className="font-display text-2xl font-bold">Prefer to chat directly?</h2>
          <p className="mt-3 text-white/70">
            Message us on WhatsApp for the fastest response — availability, pricing, and rental details, all in one
            conversation.
          </p>
          <div className="mt-6">
            <WhatsAppButton size="lg" />
          </div>
          <div className="mt-8 border-t border-white/10 pt-6">
            <a href={`tel:${CONTACT.phoneDisplay.replace(/\s+/g, "")}`} className="flex items-center gap-3 text-sm font-medium text-white/80 hover:text-white">
              <Phone className="h-4 w-4 text-gold-400" />
              Or call us at {CONTACT.phoneDisplay}
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-3xl border border-navy-950/8 bg-white p-8 dark:border-white/8 dark:bg-navy-900 sm:p-10">
          <h2 className="font-display text-xl font-semibold text-navy-950 dark:text-white">Send us a message</h2>
          <p className="mt-1 text-sm text-navy-500 dark:text-white/50">
            This opens WhatsApp with your message pre-filled — nothing is sent from this form directly.
          </p>
          <div className="mt-6 space-y-4">
            <label className="block">
              <span className="text-xs font-semibold text-navy-600 dark:text-white/60">Your Name</span>
              <input
                type="text"
                required
                value={form.name}
                onChange={update("name")}
                className="mt-1.5 w-full rounded-lg border border-navy-950/12 px-3.5 py-2.5 text-sm focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-100 dark:border-white/12 dark:bg-navy-800 dark:text-white dark:focus:ring-gold-500/20"
                placeholder="Aditi Sharma"
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-navy-600 dark:text-white/60">Phone Number</span>
              <input
                type="tel"
                value={form.phone}
                onChange={update("phone")}
                className="mt-1.5 w-full rounded-lg border border-navy-950/12 px-3.5 py-2.5 text-sm focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-100 dark:border-white/12 dark:bg-navy-800 dark:text-white dark:focus:ring-gold-500/20"
                placeholder="98765 43210"
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-navy-600 dark:text-white/60">Message</span>
              <textarea
                rows={4}
                value={form.message}
                onChange={update("message")}
                className="mt-1.5 w-full resize-none rounded-lg border border-navy-950/12 px-3.5 py-2.5 text-sm focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-100 dark:border-white/12 dark:bg-navy-800 dark:text-white dark:focus:ring-gold-500/20"
                placeholder="I'd like to rent a car for a weekend trip..."
              />
            </label>
          </div>
          <button
            type="submit"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gold-500 py-3.5 text-sm font-semibold text-navy-950 hover:bg-gold-600"
          >
            <Send className="h-4 w-4" />
            Send via WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}
