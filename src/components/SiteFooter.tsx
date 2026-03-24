const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL ?? "#contact";

export default function SiteFooter() {
  return (
    <footer className="bg-[var(--brand-dark)] text-slate-400 py-12 text-center px-6">
      <p className="text-lg font-medium text-slate-200 mb-2">
        Let&apos;s make your business stronger — together.
      </p>
      <a
        href={CALENDLY_URL}
        className="inline-block text-sm font-semibold text-[var(--brand-teal)] hover:text-teal-300 transition-colors mb-4"
      >
        Schedule a Free, No-Risk Consultation
      </a>
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm mb-6">
        <a href="#contact-form" className="hover:text-slate-200 transition-colors">
          Contact Us
        </a>
        <span className="text-slate-600">|</span>
        <a href="#how-we-work" className="hover:text-slate-200 transition-colors">
          Learn More
        </a>
      </div>
      <p className="text-sm text-slate-500">
        &copy; {new Date().getFullYear()} Emerson &amp; Quinn. All rights reserved.
      </p>
    </footer>
  );
}
