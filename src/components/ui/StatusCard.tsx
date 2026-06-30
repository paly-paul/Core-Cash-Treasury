import type { ReactNode } from "react";
import { PulseDot } from "./PulseDot";
import { Badge } from "./Badge";

export function StatusCard({
  status,
  description,
  badge,
}: {
  status: "normal" | "watch";
  description: ReactNode;
  badge?: ReactNode;
}) {
  const isNormal = status === "normal";
  return (
    <div className="flex items-center gap-4 rounded-md border border-border-0 bg-bg-surface px-[18px] py-3.5 shadow-[var(--shadow-card)]">
      <PulseDot color={isNormal ? "green" : "amber"} />
      <div className={`text-[13px] font-bold ${isNormal ? "text-green" : "text-amber"}`}>
        {isNormal ? "Normal" : "Watch"}
      </div>
      <div className="flex-1 text-[12.5px] leading-relaxed text-text-2">{description}</div>
      {badge ?? <Badge tone="green">No action required</Badge>}
    </div>
  );
}
