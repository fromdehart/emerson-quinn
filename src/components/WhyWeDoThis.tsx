export default function WhyWeDoThis() {
  return (
    <section id="why-us" className="bg-[var(--brand-teal-light)] py-20 sm:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-start max-w-5xl mx-auto px-6">
        <div>
          <div className="relative rounded-2xl overflow-hidden shadow-xl ring-1 ring-slate-200/60 aspect-[4/3]">
            <img
              src="/images/why-we-do-this.jpg"
              alt="Family together at home, representing generations and community"
              className="absolute inset-0 w-full h-full object-cover"
              width={1200}
              height={800}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold tracking-widest uppercase text-[var(--brand-teal)] mb-3">
            Our Purpose
          </p>
          <h2 className="text-4xl font-bold text-[var(--brand-dark)]">Why We Do This</h2>
          <div className="w-12 h-1 bg-[var(--brand-teal)] rounded mt-4 mb-6" />
          <p className="text-slate-700 leading-relaxed mb-4">
            The reason Emerson and Quinn exists goes beyond business: it&apos;s about building a
            future where families — like ours and yours — can thrive.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            We started this business to learn how to harness AI, automation, and new ways of working,
            so our daughters grow up in a world where opportunities are limitless.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            We believe family-run businesses are the heart of communities, and helping them stay
            competitive means supporting families for generations.
          </p>
          <p className="text-slate-700 leading-relaxed mb-8">
            Our goal is to share what we&apos;ve learned, creating a practical, repeatable approach
            that makes your business stronger and more resilient.
          </p>

          <div className="border-l-4 border-[var(--brand-teal)] pl-6">
            <p className="text-2xl font-medium text-[var(--brand-slate)] italic leading-snug">
              &ldquo;From our family to yours: we partner, learn, and grow together.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
