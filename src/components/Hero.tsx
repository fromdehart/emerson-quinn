const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL ?? "#contact";

export default function Hero() {
  return (
    <section id="top" className="pt-32 pb-24 bg-[var(--background)] relative overflow-hidden">
      {/* Decorative blob */}
      <div
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[var(--brand-teal-light)] opacity-60 blur-3xl pointer-events-none"
        aria-hidden
      />

      <div className="max-w-4xl mx-auto px-6 relative">
        <p className="text-sm font-semibold tracking-widest uppercase text-[var(--brand-teal)] mb-4">
          Consulting for Family-Run Businesses
        </p>
        <h1 className="text-5xl sm:text-6xl font-extrabold text-[var(--brand-dark)] leading-tight">
          We Help Small Businesses Run Smarter.
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mt-6 leading-relaxed">
          Emerson &amp; Quinn partners with family-run businesses to build better systems, reduce
          chaos, and put practical AI to work — without the jargon.
        </p>
        <div className="flex flex-wrap gap-4 items-center mt-10">
          <a
            href={CALENDLY_URL}
            className="px-8 py-4 rounded-xl font-semibold text-white bg-[var(--brand-teal)] hover:bg-teal-800 transition-colors shadow-md"
          >
            Book a Free Consultation
          </a>
          <a
            href="#how-we-work"
            className="text-[var(--brand-teal)] font-medium hover:underline"
          >
            See how we work →
          </a>
        </div>
      </div>
    </section>
  );
}
