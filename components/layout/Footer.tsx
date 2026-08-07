import Link from "next/link";
import { navItems } from "./nav-data";

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/taherhussain" },
  { label: "Email", href: "mailto:hello@taherhussain.com" },
];

export function Footer() {
  return (
    <footer className="border-t hairline bg-[#060606] py-12">
      <div className="site-shell flex flex-col gap-8 text-sm text-[var(--muted)] md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-lg font-black text-[var(--text)]">Taher Hussain</p>
          <p className="mt-2 max-w-sm pretty">
            Founder, Creative Technologist, and Chief Technology Officer building
            controlled digital systems.
          </p>
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-3 text-xs uppercase tracking-[0.14em]">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-[var(--text)]">
              {item.label}
            </Link>
          ))}
          {socials.map((item) => (
            <a key={item.label} href={item.href} className="hover:text-[var(--text)]" target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noreferrer" : undefined}>
              {item.label}
            </a>
          ))}
        </div>

        <p className="text-xs uppercase tracking-[0.14em]">&copy; 2026 Taher Hussain</p>
      </div>
    </footer>
  );
}
