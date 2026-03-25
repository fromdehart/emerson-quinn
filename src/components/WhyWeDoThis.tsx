import familyCartoon from "@/assets/familyImg-cartoon.jpeg";

export default function WhyWeDoThis() {
  return (
    <section id="why-us" className="bg-[var(--brand-teal-light)] py-20 sm:py-24">
      <div className="mx-auto grid max-w-5xl grid-cols-1 items-stretch gap-10 px-6 md:grid-cols-2 md:gap-12">
        <div className="flex min-h-0 w-full md:h-full">
          <div className="flex min-h-0 w-full flex-1 items-center justify-center rounded-2xl bg-white/50 p-4 shadow-xl ring-1 ring-slate-200/60 sm:p-6 md:min-h-0 md:h-full">
            <img
              src={familyCartoon}
              alt="Illustration of a family — from our family to yours"
              className="h-auto w-full max-w-full object-contain md:max-h-full md:w-auto"
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
