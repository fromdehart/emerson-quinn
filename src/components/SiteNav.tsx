import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/#how-we-work", label: "How We Work" },
  { to: "/#why-us", label: "Why Us" },
  { to: "/#industries", label: "Industries" },
  { to: "/#results", label: "Success" },
  { to: "/contact", label: "Contact" },
];

export default function SiteNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-sm bg-white/90 border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-semibold text-lg text-[var(--brand-teal)]">
          Emerson &amp; Quinn
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-slate-600 hover:text-[var(--brand-teal)] transition-colors text-sm"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/#schedule"
            className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-[var(--brand-teal)] hover:bg-teal-800 transition-colors"
          >
            Free Consultation
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-slate-600"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-slate-600 hover:text-[var(--brand-teal)] transition-colors text-sm font-medium"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/#schedule"
            className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-[var(--brand-teal)] hover:bg-teal-800 transition-colors text-center"
            onClick={() => setMobileOpen(false)}
          >
            Free Consultation
          </Link>
        </div>
      )}
    </nav>
  );
}
