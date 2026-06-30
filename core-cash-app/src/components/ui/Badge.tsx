import type { ReactNode } from "react";

export type BadgeTone = "green" | "amber" | "red" | "blue" | "muted";

const TONE_CLASSES: Record<BadgeTone, string> = {
  green: "bg-green-light text-green border-green/20",
  amber: "bg-amber-light text-amber border-amber/25",
  red: "bg-red-light text-red border-red/20",
  blue: "bg-blue-light text-blue border-blue/20",
  muted: "bg-bg-elevated text-text-muted border-border-0",
};

export function Badge({ tone = "muted", children }: { tone?: BadgeTone; children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-bold whitespace-nowrap ${TONE_CLASSES[tone]}`}
    >
      {children}
    </span>
  );
}

export function ConfidencePill({ level }: { level: "high" | "medium" | "low" }) {
  const label = level === "high" ? "High" : level === "medium" ? "Medium" : "Low";
  const tone =
    level === "high" ? "bg-green-light text-green border-green/20" : "bg-amber-light text-amber border-amber/25";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${tone}`}
    >
      ● {label}
    </span>
  );
}
