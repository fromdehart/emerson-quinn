import { CheckCircle } from "lucide-react";

const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL ?? "#contact";

const items = [
  "Review of your current workflows",
  "Identification of repetitive manual tasks",
  "AI and automation opportunities specific to your business",
  "Recommendations for practical next steps",
  "No-pressure discussion about what's possible",
];

export default function ConsultationIncludes() {
  return (
    <section id="consultation" className="bg-white py-24">
      <div className="max-w-3xl mx-auto px-6">
        <div className="rounded-3xl bg-[var(--brand-teal)] px-10 py-14 text-white text-center">
          <h2 className="text-4xl font-bold mb-4">Your Free AI Consultation Includes</h2>
          <p className="text-teal-100 text-lg mb-10">
            No jargon. No sales pitch. Just an honest look at where AI can save you time.
          </p>

          <ul className="flex flex-col gap-4 text-left max-w-xl mx-auto mb-10">
            {items.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle className="shrink-0 w-6 h-6 text-teal-200 mt-0.5" />
                <span className="text-white text-lg leading-snug">{item}</span>
              </li>
            ))}
          </ul>

          <a
            href={CALENDLY_URL}
            className="inline-block px-10 py-4 rounded-xl font-semibold text-[var(--brand-teal)] bg-white hover:bg-teal-50 transition-colors shadow-md"
          >
            Book Your Free Consultation
          </a>
        </div>
      </div>
    </section>
  );
}
