"use client";

import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { FORECAST_ENTITIES } from "@/lib/mocks/forecastData";

export function ForecastHeader({
  asOf,
  onAddAssumption,
}: {
  asOf: string;
  onAddAssumption: () => void;
}) {
  const { showToast } = useToast();

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <div className="text-base font-bold text-text-1">Forecast &amp; Variance Analysis</div>
        <div className="text-[11px] text-text-muted">FORECAST V4 · {asOf.toUpperCase()} · HORIZONS: 7 / 30 / 60 DAYS</div>
      </div>
      <div className="flex items-center gap-2">
        <select className="rounded-[5px] border border-border-1 bg-bg-surface px-2.5 py-1.5 text-[11px] text-text-2">
          <option>All Entities</option>
          {FORECAST_ENTITIES.map((entity) => (
            <option key={entity}>{entity}</option>
          ))}
        </select>
        <Button variant="secondary" className="text-[11px]" onClick={onAddAssumption}>
          ＋ Add Assumption
        </Button>
        <Button
          variant="primary"
          className="text-[11px]"
          onClick={() =>
            showToast({
              title: "Reforecast running",
              message: "Forecast agent re-running. ETA 15s.",
              type: "warning",
            })
          }
        >
          ⟳ Reforecast
        </Button>
      </div>
    </div>
  );
}
