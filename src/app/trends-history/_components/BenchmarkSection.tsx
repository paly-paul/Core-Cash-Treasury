import type { BenchmarkRow } from "@/types/cash";

const BAR_COLOR_CLASSES: Record<BenchmarkRow["barColor"], string> = {
  green: "bg-green",
  amber: "bg-amber",
  blue: "bg-blue",
};

const NOTE_TONE_CLASSES: Record<BenchmarkRow["noteTone"], string> = {
  green: "text-green",
  amber: "text-amber",
};

export function BenchmarkSection({ rows }: { rows: BenchmarkRow[] }) {
  return (
    <div className="rounded-md border border-border-0 bg-bg-surface shadow-[var(--shadow-card)]">
      <div className="flex flex-col divide-y divide-border-0">
        {rows.map((row) => (
          <div key={row.id} className="grid grid-cols-[1fr_2fr_auto_auto] items-center gap-3 px-4 py-3">
            <div className="text-[12px] text-text-2">{row.label}</div>
            <div className="relative h-2 rounded-full bg-bg-elevated">
              <div
                className={`absolute left-0 top-0 h-2 rounded-full ${BAR_COLOR_CLASSES[row.barColor]}`}
                style={{ width: `${row.fillPct}%` }}
              />
              <div
                className="absolute top-1/2 h-3 w-0.5 -translate-y-1/2 bg-text-1"
                style={{ left: `${row.markerPct}%` }}
                title="Historical average"
              />
            </div>
            <div className="font-data text-[12px] font-semibold text-text-1">{row.value}</div>
            <div className={`text-right text-[11px] font-medium ${NOTE_TONE_CLASSES[row.noteTone]}`}>{row.note}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
