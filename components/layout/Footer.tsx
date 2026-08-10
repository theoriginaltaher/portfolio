export function Footer() {
  return (
    <footer className="border-t hairline bg-[var(--background)] py-10 sm:py-12">
      <div className="site-shell">
        <div className="mx-auto grid max-w-[1320px] gap-8 text-sm text-[var(--muted)] md:grid-cols-[minmax(0,1fr)_minmax(120px,0.8fr)_auto] md:items-end">
          <div>
            <p className="text-lg font-black text-[var(--text)]">Taher Hussain</p>
            <p className="mt-2 leading-6">
              Founder · Creative Technologist · Chief Technology Officer
            </p>
          </div>

          <div className="hidden md:block" aria-hidden="true" />
          <p className="text-xs uppercase tracking-[0.12em] text-[var(--dim)] md:text-right">
            &copy; 2026 Taher Hussain
          </p>
        </div>
      </div>
    </footer>
  );
}
