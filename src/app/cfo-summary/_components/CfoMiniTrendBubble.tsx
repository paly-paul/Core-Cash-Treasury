import type { CfoData } from "@/types/cash";

export function CfoMiniTrendBubble({ data }: { data: CfoData }) {
  return (
    <div className="max-w-[92%] rounded-[9px] rounded-bl-[2px] border border-border-0 bg-bg-surface p-3 shadow-[var(--shadow-card)]">
      <div className="mb-2 text-[10.5px] font-bold uppercase tracking-wide text-text-muted">
        Cash — Last 6 Days ($M)
      </div>
      <div className="flex h-20 items-end gap-1.5">
        {data.miniBarTrend.map((bar) => (
          <div key={bar.label} className="flex flex-1 flex-col items-center justify-end gap-1">
            <div
              className={`w-full rounded-t-[3px] ${bar.good ? "bg-green" : "bg-blue"}`}
              style={{ height: `${bar.heightPct}%` }}
            />
            {bar.tag && <span className="text-[9px] text-text-muted">{bar.tag}</span>}
          </div>
        ))}
      </div>
      <div className="mt-2.5 text-[11px] text-text-2">
        Trend: ▲ Improving · {data.coverStats.find((s) => s.label === "Total Cash")?.value} today
      </div>
    </div>
  );
}
