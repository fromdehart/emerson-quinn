const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL ?? "#contact";

export default function Hero() {
  return (
    <section id="top" className="pt-28 sm:pt-32 pb-20 sm:pb-24 bg-[var(--background)] relative overflow-hidden">
      {/* Decorative blob */}
      <div
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[var(--brand-teal-light)] opacity-60 blur-3xl pointer-events-none"
        aria-hidden
      />

      <div className="max-w-6xl mx-auto px-6 relative grid lg:grid-cols-2 gap-10 lg:gap-14 lg:items-center">
        <div className="order-2 lg:order-1">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--brand-dark)] leading-tight">
            Helping Family Businesses Thrive in an Ever-Changing World
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mt-6 leading-relaxed">
            At Emerson and Quinn, we partner with small businesses to improve how they work, grow
            sustainably, and stay competitive — using AI, systems, and practical strategies. From our
            family to yours, we&apos;re here to learn, improve, and transform together.
          </p>
          <div className="flex flex-wrap gap-4 items-center mt-10">
            <a
              href={CALENDLY_URL}
              className="px-8 py-4 rounded-xl font-semibold text-white bg-[var(--brand-teal)] hover:bg-teal-800 transition-colors shadow-md"
            >
              Start With a Free Consultation
            </a>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative rounded-2xl overflow-hidden shadow-xl ring-1 ring-slate-200/80 aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]">
            <img
              src="/images/hero.jpg"
              alt="People collaborating together in a small business setting"
              className="absolute inset-0 w-full h-full object-cover"
              width={1400}
              height={933}
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
