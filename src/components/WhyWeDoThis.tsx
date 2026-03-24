export default function WhyWeDoThis() {
  return (
    <section id="why-us" className="bg-[var(--brand-teal-light)] py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto px-6">
        <div>
          <h2 className="text-4xl font-bold text-[var(--brand-dark)]">Why We Do This</h2>
          <div className="w-12 h-1 bg-[var(--brand-teal)] rounded mt-4 mb-6" />
          <p className="text-slate-700 leading-relaxed mb-4">
            We've seen what happens when small businesses are handed cookie-cutter software and a
            200-page manual. Tools that don't fit. Staff who don't use them. Money wasted.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            We built Emerson &amp; Quinn to do the opposite: show up, listen hard, and build
            solutions that grow with the business — not the other way around.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            We're not a big agency. We're a small team that cares about the kind of businesses that
            keep communities running.
          </p>
        </div>

        <div>
          <div className="border-l-4 border-[var(--brand-teal)] pl-6">
            <p className="text-2xl font-medium text-[var(--brand-slate)] italic leading-snug">
              "The best system is the one your team will actually use."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
