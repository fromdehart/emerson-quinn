import { Wrench, Building2, HeartPulse, HardHat } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const industries: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Wrench,
    title: "Trades & Home Services",
    body: "Scheduling, dispatch, and customer follow-up that keeps jobs moving and phones ringing.",
  },
  {
    icon: Building2,
    title: "Property Management",
    body: "Maintenance tracking, tenant communication, and reporting without the spreadsheet chaos.",
  },
  {
    icon: HeartPulse,
    title: "Wellness & Fitness",
    body: "Booking, retention, and staff coordination that lets you focus on your clients.",
  },
  {
    icon: HardHat,
    title: "Construction & Contractors",
    body: "Project tracking, subcontractor coordination, and job costing that keeps every site on budget.",
  },
];

export default function Industries() {
  return (
    <section id="industries" className="bg-white py-24">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-[var(--brand-dark)]">Industries We Serve</h2>
        <p className="text-lg text-slate-500 mt-4 mb-16">
          We work where things get complicated — and we know your world well enough to help.
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
    </section>
  );
}
