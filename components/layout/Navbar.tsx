"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems } from "./nav-data";

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b hairline bg-[#060606]/92 backdrop-blur-md">
      <nav className="site-shell relative flex h-14 items-center justify-between gap-6 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--muted)]">
        <Link
          href="/"
          aria-label="Taher Hussain home"
          className="shrink-0 normal-case text-[15px] font-black tracking-[-0.02em] text-[var(--text)]"
          onClick={closeMenu}
        >
          Taher<span className="text-[var(--red)]">.</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <li key={item.href} className="group relative">
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  className="relative block px-3 py-2 transition-colors duration-200 after:absolute after:bottom-0 after:left-3 after:right-3 after:h-px after:origin-left after:scale-x-0 after:bg-[var(--red)] after:transition-transform after:duration-300 after:ease-[var(--ease-out-quint)] hover:text-[var(--text)] hover:after:scale-x-100 data-[active=true]:text-[var(--text)] data-[active=true]:after:scale-x-100"
                  data-active={isActive}
                >
                  <span className="text-[var(--dim)]">{item.index} / </span>
                  {item.label}
                </Link>
                {item.children ? (
                  <div className="invisible absolute right-0 top-full w-48 translate-y-2 border hairline bg-[#070808] p-2 opacity-0 transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={closeMenu}
                        className="block border-b border-white/5 px-3 py-2 text-[8px] tracking-[0.12em] text-[var(--muted)] last:border-b-0 hover:text-[var(--text)]"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation menu"
          onClick={() => setMenuOpen((open) => !open)}
          className="pressable absolute right-0 top-1/2 flex h-12 w-12 -translate-y-1/2 flex-col justify-center gap-1.5 border border-[var(--border-strong)] px-3 hover:border-[var(--red)] md:hidden"
        >
          <span className={`block h-px w-5 origin-center bg-[var(--text)] transition-transform duration-300 ease-[var(--ease-out-quint)] ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`block h-px w-5 bg-[var(--text)] transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-px w-5 origin-center bg-[var(--red)] transition-transform duration-300 ease-[var(--ease-out-quint)] ${menuOpen ? "-translate-y-[7px] rotate-[-45deg] scale-x-100" : "scale-x-60"}`} />
        </button>
      </nav>

      {menuOpen ? (
        <div className="menu-enter absolute inset-x-0 top-full h-[calc(100dvh-3.5rem)] overflow-y-auto bg-[#060606]/98 px-6 py-8 backdrop-blur-md md:hidden">
          <div className="site-shell flex w-full flex-col gap-1">
            {navItems.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  className="flex items-baseline gap-3 border-b hairline px-2 py-4 text-[22px] font-black uppercase tracking-[-0.02em] text-[var(--text)]"
                >
                  <span className="text-[10px] tracking-[0.18em] text-[var(--red)]">
                    {item.index}
                  </span>
                  {item.label}
                </Link>
                {item.children ? (
                  <div className="border-b hairline py-2 pl-11">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={closeMenu}
                        className="block py-2 text-xs uppercase tracking-[0.14em] text-[var(--muted)]"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
            <p className="mx-2 mt-6 text-[9px] uppercase tracking-[0.14em] text-[var(--dim)]">
              Sri Lanka / Working Globally / AI / Media / Web / Cloud
            </p>
          </div>
        </div>
      ) : null}
    </header>
  );
}
