import type { ReactNode } from "react";

export type MetricCardAccent = "blue" | "green" | "amber" | "red" | "info";

const ACCENT_BAR_CLASSES: Record<MetricCardAccent, string> = {
  blue: "bg-blue",
  green: "bg-green",
  amber: "bg-amber",
  red: "bg-red",
  info: "bg-info",
};

const DELTA_CLASSES: Record<"up" | "down" | "flat", string> = {
  up: "text-green",
  down: "text-red",
  flat: "text-text-muted",
};

interface MetricCardProps {
  label: string;
  value: ReactNode;
  accent: MetricCardAccent;
  delta?: ReactNode;
  deltaDirection?: "up" | "down" | "flat";
  sub?: ReactNode;
}

export function MetricCard({ label, value, accent, delta, deltaDirection = "flat", sub }: MetricCardProps) {
  return (
    <div className="relative flex flex-col gap-1.5 overflow-hidden rounded-md border border-border-0 bg-bg-surface p-4 shadow-[var(--shadow-card)]">
      <div className={`absolute top-0 left-0 right-0 h-[3px] ${ACCENT_BAR_CLASSES[accent]}`} />
      <div className="text-[10px] font-bold uppercase tracking-wider text-text-muted">{label}</div>
      <div className="font-data text-[22px] font-semibold leading-tight tracking-tight text-text-1">{value}</div>
      {delta && (
        <div className={`font-data text-[11px] font-medium ${DELTA_CLASSES[deltaDirection]}`}>{delta}</div>
      )}
      {sub && <div className="mt-0.5 border-t border-border-0 pt-1.5 text-[10px] text-text-muted">{sub}</div>}
    </div>
  );
}
