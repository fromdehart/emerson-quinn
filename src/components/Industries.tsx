import { Wrench, Building2, HeartPulse, HardHat } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const industries: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Wrench,
    title: "Trades & Home Services",
    body: "HVAC, plumbing, electrical, landscaping, pool care, and more.",
  },
  {
    icon: Building2,
    title: "Property Management",
    body: "Residential, HOA, vacation rentals, and maintenance services.",
  },
  {
    icon: HeartPulse,
    title: "Wellness & Fitness",
    body: "Gyms, yoga/pilates studios, personal training, wellness clinics.",
  },
  {
    icon: HardHat,
    title: "Construction & Contractors",
    body: "Remodeling, flooring, kitchen/bath, painting, and general contracting.",
  },
];

export default function Industries() {
  return (
    <section id="industries" className="bg-white py-24">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-[var(--brand-dark)]">Industries We Partner With</h2>
        <p className="text-lg text-slate-500 mt-4 mb-4 max-w-2xl mx-auto">
          We focus on small, family-run businesses where smart improvements make a real difference:
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto px-6">
        {industries.map((industry) => {
          const Icon = industry.icon;
          return (
            <div
              key={industry.title}
              className="rounded-2xl border border-slate-100 p-8 bg-[var(--background)] flex flex-col gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--brand-teal-light)] flex items-center justify-center">
                <Icon className="w-6 h-6 text-[var(--brand-teal)]" />
              </div>
              <h3 className="text-xl font-bold text-[var(--brand-dark)]">{industry.title}</h3>
              <p className="text-slate-600 leading-relaxed">{industry.body}</p>
            </div>
          );
        })}
      </div>

      <div className="max-w-3xl mx-auto px-6 mt-14 text-center">
        <p className="text-lg font-medium text-[var(--brand-slate)] italic leading-relaxed">
          &ldquo;We work in industries that are durable, hands-on, and essential — businesses that
          touch lives every day.&rdquo;
        </p>
      </div>
    </section>
  );
}
