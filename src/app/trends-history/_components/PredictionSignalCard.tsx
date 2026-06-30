import type { PredictionSignal } from "@/types/cash";

// Deliberately not built on MetricCard or any Forecast-page component — these
// are pattern-based signals, not forecast output, and must stay visually and
// architecturally distinct per handoff.md (Trends §7).
const CONFIDENCE_LABELS: Record<PredictionSignal["confidence"], string> = {
  lower: "Lower confidence",
  moderate: "Moderate confidence",
  higher: "Higher confidence",
};

export function PredictionSignalCard({ signal }: { signal: PredictionSignal }) {
  return (
    <div className="rounded-md border border-dashed border-violet/50 bg-violet/5 p-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-violet">
          <span>◆</span> Pattern Signal
        </div>
        <span className="text-[10.5px] font-medium text-text-muted">{CONFIDENCE_LABELS[signal.confidence]}</span>
      </div>
      <div className="mt-2 text-[12.5px] leading-relaxed text-text-1">{signal.text}</div>
      <div className="mt-2.5 border-t border-violet/20 pt-2 text-[11px] leading-relaxed text-text-2">
        <span className="mr-1.5 font-bold uppercase tracking-wide text-violet">Basis</span>
        {signal.basis}
      </div>
    </div>
  );
}
