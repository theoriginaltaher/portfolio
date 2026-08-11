type SectionLabelProps = {
  label: string;
  tone?: "red" | "blue";
};

export function SectionLabel({ label, tone = "red" }: SectionLabelProps) {
  return (
    <div className="mb-10 flex items-center gap-4">
      <span
        className={
          tone === "red"
            ? "h-2 w-2 shrink-0 bg-[var(--red)]"
            : "h-2 w-2 shrink-0 bg-[var(--blue-quiet)]"
        }
        aria-hidden="true"
      />
      <h2 className="text-2xl font-black tracking-[-0.035em] text-[var(--text)] md:text-3xl">
        {label}
      </h2>
      <span className="h-px flex-1 bg-white/7" />
    </div>
  );
}
