"use client";

import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

export function TrendsPageHeader() {
  const { showToast } = useToast();

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <div className="text-[19px] font-bold text-text-1">Trends &amp; History</div>
        <div className="text-[11px] font-semibold uppercase tracking-wide text-text-muted">
          6-MONTH PATTERN VIEW · YoY COMPARISON · AGENT 6 · 26 JUN 2026
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          className="text-[11px]"
          onClick={() =>
            showToast({ title: "Exported", message: "Trends & History export prepared.", type: "success" })
          }
        >
          ↓ Export
        </Button>
        <Button
          variant="primary"
          className="text-[11px]"
          onClick={() =>
            showToast({
              title: "Refreshed",
              message: "Trend analysis re-run across 6-month window.",
              type: "success",
            })
          }
        >
          ⟳ Refresh Analysis
        </Button>
      </div>
    </div>
  );
}
