import { Linkedin } from "lucide-react";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import mikePhoto from "@/assets/mike-photo.png";

const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL ?? "#contact";
const LINKEDIN_URL = import.meta.env.VITE_LINKEDIN_URL ?? "https://www.linkedin.com/in/mdehart";

const MIKE_PHOTO: string | null = mikePhoto;

type BioParagraph = { text: string; emphasis?: boolean };

const bioParagraphs: BioParagraph[] = [
  {
    text: "For over 14 years, I've worked with organizations of all sizes helping teams better understand challenges, simplify complexity, and find practical solutions that support real people and real work. No matter the industry or role, the part I've always enjoyed most is listening, understanding how things work, and helping people move from frustration and uncertainty toward clarity and progress.",
  },
  {
    text: "My dad is an engineer, and I think I inherited a lot of his curiosity about how things work and how problems can be solved thoughtfully and creatively. That curiosity has shaped the way I approach both technology and business: stay practical, keep learning, and focus on solutions that genuinely help people.",
  },
  {
    text: "That same mindset is a big part of why Emerson & Quinn exists.",
    emphasis: true,
  },
  {
    text: "As a father, I think a lot about the world my daughters will grow up in and the kind of example I want to set for them. I want them to stay curious, embrace learning, and see technology as a tool that can help people create, solve problems, and build better futures for themselves and their communities.",
  },
  {
    text: "Right now, many small businesses are feeling pressure around AI and rapid changes in technology. There's excitement, but also uncertainty. Questions about cost, where to start, what actually matters, and whether they're already falling behind.",
  },
  {
    text: "We believe businesses shouldn't have to navigate that alone.",
    emphasis: true,
  },
  {
    text: "Our goal is to help make AI and automation feel approachable, practical, and affordable for small businesses — focusing on real opportunities to save time, improve day-to-day operations, and support the people already doing the hard work every day.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <SiteNav />

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="pt-16 pb-20 sm:pt-20 sm:pb-28 relative overflow-hidden">
        {/* soft decorative blob */}
        <div
          className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-[var(--brand-teal-light)] opacity-50 blur-3xl"
          aria-hidden
        />

        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
          {/* Text — order-2 on mobile so photo leads on small screens? No — text first per spec */}
          <div className="order-1">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[var(--brand-teal)]">
              Founder, Emerson &amp; Quinn
            </p>
            <h1 className="text-4xl font-extrabold leading-tight text-[var(--brand-dark)] sm:text-5xl lg:text-6xl">
              Meet Your AI &amp; Technology Partner
            </h1>
            <p className="mt-6 max-w-xl text-xl leading-relaxed text-slate-600">
              Helping small businesses navigate AI and automation in a practical, approachable, and
              affordable way.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-5">
              <a
                href={CALENDLY_URL}
                className="rounded-xl bg-[var(--brand-teal)] px-8 py-4 font-semibold text-white shadow-md transition-colors hover:bg-teal-800"
              >
                Schedule a Free Consultation
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-medium text-[var(--brand-teal)] transition-colors hover:text-teal-800"
              >
                <Linkedin className="h-4 w-4" />
                Connect on LinkedIn
              </a>
            </div>
          </div>

          {/* Photo */}
          <div className="order-2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm">
              {MIKE_PHOTO ? (
                <img
                  src={MIKE_PHOTO}
                  alt="Mike — Founder of Emerson & Quinn"
                  className="h-auto w-full rounded-3xl object-cover shadow-2xl ring-1 ring-slate-200/80"
                />
              ) : (
                /* Placeholder — swap MIKE_PHOTO above once photo is ready */
                <div className="flex aspect-[4/5] w-full flex-col items-center justify-center rounded-3xl bg-[var(--brand-teal-light)] shadow-xl ring-1 ring-slate-200/60">
                  <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white/70 shadow-inner">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      className="h-14 w-14 text-[var(--brand-teal)] opacity-60"
                      aria-hidden
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <p className="mt-5 text-sm font-medium text-[var(--brand-teal)] opacity-70">
                    Photo coming soon
                  </p>
                </div>
              )}

              {/* Floating accent card */}
              <div className="absolute -bottom-5 -left-5 rounded-2xl bg-white px-5 py-4 shadow-lg ring-1 ring-slate-100">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--brand-teal)]">
                  14+ Years Experience
                </p>
                <p className="mt-0.5 text-sm text-slate-600">Helping teams solve real problems</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bio ─────────────────────────────────────────────────────── */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-4xl font-bold text-[var(--brand-dark)]">Get to Know Mike</h2>
          <div className="mt-4 h-1 w-14 rounded bg-[var(--brand-teal)]" />

          <div className="mt-10">
            {bioParagraphs.map((p, i) =>
              p.emphasis ? (
                <p
                  key={i}
                  className="my-8 text-xl font-semibold leading-relaxed text-[var(--brand-dark)]"
                >
                  {p.text}
                </p>
              ) : (
                <p
                  key={i}
                  className="mt-6 text-lg leading-relaxed text-slate-700 first:mt-0"
                >
                  {p.text}
                </p>
              )
            )}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ──────────────────────────────────────────────── */}
      <section className="bg-[var(--brand-teal-light)] py-20">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-3xl font-bold text-[var(--brand-dark)]">
            Ready to have a real conversation?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-slate-600">
            No pressure, no pitch deck. Just an honest look at where AI can make your business
            easier to run.
          </p>
          <a
            href={CALENDLY_URL}
            className="mt-8 inline-block rounded-xl bg-[var(--brand-teal)] px-10 py-4 font-semibold text-white shadow-md transition-colors hover:bg-teal-800"
          >
            Schedule a Free Consultation
          </a>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
