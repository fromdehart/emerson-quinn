const steps = [
  {
    number: "01",
    title: "Listen & Learn",
    body: "We start by understanding your business from the inside out — your people, your bottlenecks, your goals. No assumptions.",
  },
  {
    number: "02",
    title: "Collaborate & Improve",
    body: "We work alongside you, not above you, to build systems that fit how your team actually operates.",
  },
  {
    number: "03",
    title: "Grow & Measure",
    body: "We track what matters, adjust as you scale, and make sure the improvements stick long after we're done.",
  },
];

export default function HowWeWork() {
  return (
    <section id="how-we-work" className="bg-white py-24">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-[var(--brand-dark)]">How We Work</h2>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto mt-4">
          We keep it simple. No complicated frameworks, no 90-day engagement decks. Just a clear
          process built around your business.
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
    </section>
  );
}
