"use client";

import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

export function DashboardHeader({ asOf }: { asOf: string }) {
  const { showToast } = useToast();
  const date = asOf.split(" · ")[0] ?? asOf;
  const runTime = asOf.split(" · ")[1] ?? "";

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <div className="text-base font-bold text-text-1">Daily Cash Position</div>
        <div className="text-[11px] text-text-muted">
          {date.toUpperCase()} · FORECAST V4 · AGENT RUN {runTime} ·{" "}
          <span className="text-green">✓ All feeds current</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <select className="rounded-[5px] border border-border-1 bg-bg-surface px-2.5 py-1.5 text-[11px] text-text-2">
          <option>{date}</option>
        </select>
        <Button variant="secondary" className="text-[11px]">
          ↓ Export
        </Button>
        <Button
          variant="primary"
          className="text-[11px]"
          onClick={() =>
            showToast({
              title: "Agent refreshed",
              message: `Daily Cash Position re-run current as of ${runTime}.`,
              type: "success",
            })
          }
        >
          ⟳ Refresh Agent
        </Button>
      </div>
    </div>
  );
}
