import type { ExperienceEntry } from "@/src/types";

export function ExperienceRow({ entry }: { entry: ExperienceEntry }) {
  return <article className="grid gap-3 border-b hairline py-7 md:grid-cols-[1fr_0.65fr_180px] md:items-baseline"><h3 className="text-xl font-bold tracking-[-0.025em]">{entry.role}</h3><p className="text-sm text-[var(--muted)]">{entry.organisation}</p><p className="text-sm text-[var(--muted)] md:text-right">{entry.dateRange}</p><p className="pretty max-w-3xl text-sm leading-7 text-[var(--muted)] md:col-span-2">{entry.description}</p>{entry.current ? <p className="text-xs font-bold text-[var(--accent)] md:text-right">Current</p> : null}</article>;
}
