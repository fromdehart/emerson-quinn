import { CheckCircle2 } from "lucide-react";

const outcomes = [
  "Fewer missed follow-ups and dropped leads",
  "Consistent processes that don't break when someone calls out",
  "Staff who know what to do without being micromanaged",
  "Less time in email, more time doing actual work",
  "Reporting that tells you what's actually happening in your business",
];

export default function Results() {
  return (
    <section id="results" className="bg-[var(--brand-teal-light)] py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto px-6">
        <div>
          <h2 className="text-4xl font-bold text-[var(--brand-dark)]">What Our Partners See</h2>
          <p className="text-lg text-slate-600 mt-4 max-w-sm">
            We don't promise transformation overnight. We promise real, measurable progress on the
            things that matter to your team.
          </p>
        </div>

        <ul className="space-y-5 mt-2">
          {outcomes.map((outcome) => (
            <li key={outcome} className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-[var(--brand-teal)] mt-0.5 shrink-0" />
              <span className="text-lg text-[var(--brand-dark)] font-medium">{outcome}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
