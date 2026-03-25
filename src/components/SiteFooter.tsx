import { Link } from "react-router-dom";

export default function SiteFooter() {
  return (
    <footer className="bg-[var(--brand-dark)] text-slate-400 py-12 text-center px-6">
      <p className="text-lg font-medium text-slate-200 mb-2">
        Let&apos;s make your business stronger — together.
      </p>
      <Link
        to="/#schedule"
        className="mb-4 inline-block text-sm font-semibold text-[var(--brand-teal)] transition-colors hover:text-teal-300"
      >
        Schedule a Free, No-Risk Consultation
      </Link>
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm mb-6">
        <Link to="/contact" className="hover:text-slate-200 transition-colors">
          Contact Us
        </Link>
        <span className="text-slate-600">|</span>
        <Link to="/#how-we-work" className="hover:text-slate-200 transition-colors">
          Learn More
        </Link>
      </div>
      <p className="text-sm text-slate-500">
        &copy; {new Date().getFullYear()} Emerson &amp; Quinn. All rights reserved.
      </p>
    </footer>
  );
}
