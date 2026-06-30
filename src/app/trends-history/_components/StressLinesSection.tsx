import type { StressLine } from "@/types/cash";

export function StressLinesSection({ lines }: { lines: StressLine[] }) {
  return (
    <div className="rounded-md border border-border-0 bg-bg-surface shadow-[var(--shadow-card)]">
      <div className="flex flex-col divide-y divide-border-0">
        {lines.map((line) => (
          <div key={line.id} className="flex items-start gap-3 px-4 py-3">
            <div className="flex-shrink-0 text-[10px] font-bold uppercase tracking-wide text-blue">If</div>
            <div className="text-[12px] leading-relaxed text-text-2">{line.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
