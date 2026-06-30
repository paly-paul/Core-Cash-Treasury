import type { ConcentrationRow } from "@/types/cash";

const SEGMENT_CLASSES: Record<ConcentrationRow["color"], string> = {
  red: "bg-red",
  blue: "bg-blue",
  muted: "bg-text-muted",
};

const PCT_CLASSES: Record<ConcentrationRow["color"], string> = {
  red: "text-red",
  blue: "text-blue",
  muted: "text-text-muted",
};

export function ConcentrationSection({
  rows,
  callout,
}: {
  rows: ConcentrationRow[];
  callout: string;
}) {
  return (
    <div className="rounded-md border border-border-0 bg-bg-surface p-4 shadow-[var(--shadow-card)]">
      <div className="flex flex-col gap-3">
        {rows.map((row) => (
          <div key={row.id} className="grid grid-cols-[1fr_3fr_auto] items-center gap-3">
            <div className="text-[12px] text-text-2">{row.name}</div>
            <div className="flex h-2.5 overflow-hidden rounded-full bg-bg-elevated">
              <div className={SEGMENT_CLASSES[row.color]} style={{ width: `${row.pct}%` }} />
              <div className="bg-border-0" style={{ width: `${100 - row.pct}%` }} />
            </div>
            <div className={`font-data text-[12px] font-semibold ${PCT_CLASSES[row.color]}`}>{row.pct}%</div>
          </div>
        ))}
      </div>
      <div className="my-3.5 border-t border-border-0" />
      <p className="text-[12px] leading-relaxed text-text-2">
        <strong className="text-text-1">Top 3 counterparties now represent 69% of AR risk</strong>
        {callout.replace("Top 3 counterparties now represent 69% of AR risk", "")}
      </p>
    </div>
  );
}
