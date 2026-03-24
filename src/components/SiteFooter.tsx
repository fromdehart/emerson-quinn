export default function SiteFooter() {
  return (
    <footer className="bg-[var(--brand-dark)] text-slate-400 py-10 text-center">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Emerson &amp; Quinn. All rights reserved.
      </p>
      <p className="text-xs mt-2 text-slate-500">Helping small businesses run smarter.</p>
    </footer>
  );
}
