const footerLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/taherhussain" },
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "Email", href: "mailto:taher.hussain@outlook.com" },
];

export function Footer({ showLinks = false }: { showLinks?: boolean }) {
  return (
    <footer className="border-t hairline bg-[var(--background)] py-10 sm:py-12">
      <div className="site-shell">
        <div className="mx-auto grid max-w-[1320px] gap-7 text-sm text-[var(--muted)] md:grid-cols-[minmax(0,1fr)_auto_auto] md:items-end md:gap-10">
          <div>
            <p className="text-lg font-black text-[var(--text)]">Taher Hussain</p>
            <p className="mt-2 leading-6">
              Founder · Creative Technologist · Chief Technology Officer
            </p>
          </div>

          {showLinks ? (
            <nav aria-label="Social links" className="flex flex-wrap gap-x-5 gap-y-3 text-xs uppercase tracking-[0.1em]">
              {footerLinks.map((item) => (
                <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noreferrer" : undefined} className="transition-colors duration-200 hover:text-[var(--text)]">
                  {item.label}
                </a>
              ))}
            </nav>
          ) : <div className="hidden md:block" aria-hidden="true" />}
          <p className="text-xs uppercase tracking-[0.12em] text-[var(--dim)] md:text-right">
            &copy; 2026 Taher Hussain
          </p>
        </div>
      </div>
    </footer>
  );
}
