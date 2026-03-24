import { useState } from "react";
import { Menu, X } from "lucide-react";

const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL ?? "#contact";

const links = [
  { href: "#how-we-work", label: "How We Work" },
  { href: "#why-us", label: "Why Us" },
  { href: "#industries", label: "Industries" },
  { href: "#results", label: "Success" },
];

export default function SiteNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-sm bg-white/90 border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#top" className="font-semibold text-lg text-[var(--brand-teal)]">
          Emerson &amp; Quinn
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-slate-600 hover:text-[var(--brand-teal)] transition-colors text-sm"
            >
              {link.label}
            </a>
          ))}
          <a
            href={CALENDLY_URL}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-[var(--brand-teal)] hover:bg-teal-800 transition-colors"
          >
            Book a Consultation
          </a>
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
            <a
              key={link.href}
              href={link.href}
              className="text-slate-600 hover:text-[var(--brand-teal)] transition-colors text-sm font-medium"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={CALENDLY_URL}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-[var(--brand-teal)] hover:bg-teal-800 transition-colors text-center"
            onClick={() => setMobileOpen(false)}
          >
            Free Consultation
          </a>
        </div>
      )}
    </nav>
  );
}
