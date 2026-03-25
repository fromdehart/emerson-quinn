import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpeg";

export default function Hero() {
  return (
    <section
      id="top"
      className="pt-10 sm:pt-12 lg:pt-14 pb-12 sm:pb-16 bg-[var(--background)] relative overflow-hidden"
    >
      {/* Decorative blob */}
      <div
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[var(--brand-teal-light)] opacity-60 blur-3xl pointer-events-none"
        aria-hidden
      />

      <div className="max-w-6xl mx-auto px-6 relative grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 lg:items-center">
        <div className="order-2 lg:order-1">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--brand-dark)] leading-tight">
            Helping Family Businesses Adapt and Grow
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mt-4 sm:mt-5 leading-relaxed">
            At Emerson and Quinn, we partner with small businesses to improve how they work, grow
            sustainably, and stay competitive using AI, systems, and practical strategies.</p> 
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mt-4 sm:mt-5 leading-relaxed">
              From our family to yours, we&apos;re here to learn, improve, and transform together.
          </p>
          <div className="flex flex-wrap gap-4 items-center mt-10">
            <Link
              to="/#schedule"
              className="px-8 py-4 rounded-xl font-semibold text-white bg-[var(--brand-teal)] hover:bg-teal-800 transition-colors shadow-md"
            >
              Start With a Free Consultation
            </Link>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl ring-1 ring-slate-200/80">
            <img
              src={heroImage}
              alt="Skilled tradesperson at work — the kind of hands-on service businesses we support"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
