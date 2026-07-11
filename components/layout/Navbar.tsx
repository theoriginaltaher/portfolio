import Link from "next/link";
import { navItems } from "./nav-data";

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b hairline bg-[#060606]/92 backdrop-blur-md">
      <nav className="site-shell flex h-14 items-center justify-between gap-6 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--muted)]">
        <Link
          href="/"
          aria-label="Taher Hussain home"
          className="shrink-0 normal-case text-sm font-black tracking-[-0.02em] text-[var(--text)]"
        >
          Taher<span className="text-[var(--red)]">.</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <li key={item.href} className="group relative">
              <Link
                href={item.href}
                className="block px-3 py-2 transition hover:text-[var(--text)] data-[active=true]:text-[var(--text)]"
                data-active={item.href === "/"}
              >
                <span className="text-[var(--dim)]">{item.index} / </span>
                {item.label}
              </Link>
              {item.children ? (
                <div className="invisible absolute right-0 top-full w-48 translate-y-2 border hairline bg-[#070808] p-2 opacity-0 transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block border-b border-white/5 px-3 py-2 text-[8px] tracking-[0.12em] text-[var(--muted)] last:border-b-0 hover:text-[var(--text)]"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className="border border-[var(--border-strong)] px-3 py-1.5 text-[8px] text-[var(--text)] transition hover:border-[var(--red)] md:hidden"
        >
          Contact
        </Link>
      </nav>
    </header>
  );
}
