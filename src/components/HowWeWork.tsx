const steps = [
  {
    number: "01",
    title: "Listen & Learn",
    body: "We start by understanding your business, your challenges, and what matters most to your team and your family.",
  },
  {
    number: "02",
    title: "Collaborate & Improve",
    body: "Together, we identify opportunities to work smarter — using practical systems, AI, and tools — to make your operations easier and more profitable.",
  },
  {
    number: "03",
    title: "Grow & Measure",
    body: "You only invest in results. We focus on measurable improvements in revenue, efficiency, or customer experience, so you can see real impact.",
  },
];

export default function HowWeWork() {
  return (
    <section id="how-we-work" className="bg-white py-24">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <p className="text-sm font-semibold tracking-widest uppercase text-[var(--brand-teal)] mb-3">
          Our Approach
        </p>
        <h2 className="text-4xl font-bold text-[var(--brand-dark)]">How We Work</h2>
        <p className="text-lg font-medium text-[var(--brand-dark)] mt-4">
          Simple, Human-Focused Process:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-5xl mx-auto px-6">
        {steps.map((step) => (
          <div
            key={step.number}
            className="rounded-2xl border border-slate-100 p-8 bg-[var(--background)] hover:shadow-md transition-shadow"
          >
            <p className="text-5xl font-extrabold text-[var(--brand-teal)] opacity-40 mb-4">
              {step.number}
            </p>
            <h3 className="text-xl font-bold text-[var(--brand-dark)] mb-3">{step.title}</h3>
            <p className="text-slate-600 leading-relaxed">{step.body}</p>
          </div>
        ))}
      </div>

      <div className="max-w-3xl mx-auto px-6 mt-16">
        <div className="border-l-4 border-[var(--brand-teal)] pl-6 text-left">
          <p className="text-xl font-medium text-[var(--brand-slate)] italic leading-snug">
            &ldquo;We&apos;re not here to sell a service — we&apos;re here to partner with you to make
            your business stronger, smarter, and ready for the future.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
