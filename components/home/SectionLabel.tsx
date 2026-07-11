type SectionLabelProps = {
  index: string;
  label: string;
  tone?: "red" | "blue";
};

export function SectionLabel({ index, label, tone = "red" }: SectionLabelProps) {
  return (
    <div className="mb-10 flex items-center gap-5">
      <span
        className={
          tone === "red"
            ? "text-[11px] font-black uppercase tracking-[0.18em] text-[var(--red)]"
            : "text-[11px] font-black uppercase tracking-[0.18em] text-[var(--blue-quiet)]"
        }
      >
        {index}
      </span>
      <h2 className="text-3xl font-black tracking-[-0.04em] text-[var(--text)] md:text-4xl">
        {label}
      </h2>
      <span className="h-px flex-1 bg-white/7" />
    </div>
  );
}
