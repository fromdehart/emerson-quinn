import { CheckCircle2 } from "lucide-react";

const outcomes = [
  "Increased revenue and profitability",
  "Better scheduling, operations, and customer experience",
  "Results that you can see and rely on",
];

export default function Results() {
  return (
    <section id="results" className="bg-[var(--brand-teal-light)] py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto px-6">
        <div>
          <h2 className="text-4xl font-bold text-[var(--brand-dark)]">How We Measure Success</h2>
          <p className="text-lg text-slate-600 mt-4 max-w-md">
            Clear, simple metrics for growth and efficiency
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

      <div className="max-w-3xl mx-auto px-6 mt-14">
        <div className="border-l-4 border-[var(--brand-teal)] pl-6">
          <p className="text-xl font-medium text-[var(--brand-slate)] italic leading-snug">
            &ldquo;We believe in practical results, not empty promises.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
