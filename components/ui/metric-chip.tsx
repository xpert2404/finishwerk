type MetricChipProps = {
  label: string;
  value: string;
};

export function MetricChip({ label, value }: MetricChipProps) {
  return (
    <div className="surface-panel-soft flex min-h-[5.5rem] flex-col justify-between rounded-[1.4rem] px-4 py-3 text-sm">
      <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
        {label}
      </span>
      <span className="font-medium leading-6 text-white">{value}</span>
    </div>
  );
}
