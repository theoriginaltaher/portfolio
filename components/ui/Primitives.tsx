import Link from "next/link";

export function PageHeader({ label, title, summary }: { label?: string; title: string; summary?: string }) {
  return <header className="border-b hairline pb-12 pt-24 sm:pb-16 sm:pt-28"><div className="site-shell"><div className="grid gap-8 lg:grid-cols-[1fr_0.52fr] lg:items-end"><div>{label ? <p className="mb-5 text-xs font-bold text-[var(--accent)]">{label}</p> : null}<h1 className="balanced max-w-4xl text-[clamp(3rem,8vw,6rem)] font-black leading-[0.92] tracking-[-0.04em]">{title}</h1></div>{summary ? <p className="pretty max-w-xl text-base leading-8 text-[var(--muted)]">{summary}</p> : null}</div></div></header>;
}

export function Divider() { return <div className="h-px bg-[var(--border)]" aria-hidden="true" />; }

export function Button({ href, children, secondary = false }: { href: string; children: React.ReactNode; secondary?: boolean }) {
  return <Link href={href} className={`pressable inline-flex min-h-12 items-center justify-center px-6 text-sm font-bold ${secondary ? "border border-[var(--border-strong)] hover:border-[var(--accent)] hover:text-[var(--accent)]" : "bg-[var(--accent)] text-[#0d0d0d] hover:bg-[var(--accent-strong)]"}`}>{children}</Link>;
}

export function BackLink({ href, children }: { href: string; children: React.ReactNode }) { return <Link href={href} className="inline-flex min-h-11 items-center border-b border-[var(--accent)] text-sm font-bold hover:text-[var(--accent)]">← {children}</Link>; }

export function CategoryBadge({ children }: { children: React.ReactNode }) { return <span className="inline-flex border border-[var(--border-strong)] px-3 py-1.5 text-xs font-semibold text-[var(--muted)]">{children}</span>; }
