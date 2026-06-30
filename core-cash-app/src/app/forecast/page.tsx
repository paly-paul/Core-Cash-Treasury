"use client";

import { AppShell } from "@/components/shell/AppShell";
import { Button } from "@/components/ui/Button";
import { MetricCard } from "@/components/ui/MetricCard";
import { SectionCard } from "@/components/ui/SectionCard";
import { ExceptionsPanel } from "../dashboard/_components/ExceptionsPanel";
import { ForecastChart } from "./_components/ForecastChart";
import { EntityForecastTable } from "./_components/EntityForecastTable";
import { AssumptionsList } from "./_components/AssumptionsList";
import { VarianceAnalysis } from "./_components/VarianceAnalysis";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setActiveHorizon, setChartView } from "@/store/forecastSlice";
import { formatCompactCurrency } from "@/utils/format";
import type { ForecastHorizon } from "@/types/cash";

const HORIZONS: ForecastHorizon[] = [7, 30, 60];
const CHART_VIEWS = ["bar", "line", "waterfall"] as const;

export default function ForecastPage() {
  const dispatch = useAppDispatch();
  const data = useAppSelector((s) => s.forecast.data);
  const dashboardExceptions = useAppSelector((s) => s.dashboard.data.exceptions);
  const activeHorizon = useAppSelector((s) => s.forecast.activeHorizon);
  const chartView = useAppSelector((s) => s.forecast.chartView);

  const activeSummary = data.horizons.find((h) => h.horizon === activeHorizon)!;

  return (
    <AppShell
      asOf={data.asOf}
      aiPanelTitle="AI Treasury Agent"
      aiPanelMessages={[
        {
          id: "welcome",
          role: "agent",
          text: "Forecast predictions are pattern-based signals derived from historical cash flow timing, distinct from the model-driven projections shown in the chart.",
          time: "09:14",
        },
      ]}
      aiPanelPrimaryView={{ label: "Exceptions", content: <ExceptionsPanel exceptions={dashboardExceptions} /> }}
      stats={[
        { label: "Opening Cash", value: formatCompactCurrency(data.openingCash, "USD") },
        { label: "Expected Inflows", value: formatCompactCurrency(data.expectedInflows, "USD"), tone: "positive" },
        { label: "Expected Outflows", value: formatCompactCurrency(data.expectedOutflows, "USD") },
      ]}
    >
      {data.lowPointWarning && (
        <div className="flex items-center gap-3 rounded-md border border-amber/25 bg-amber-light px-[18px] py-3.5 text-[12.5px] text-text-2 shadow-[var(--shadow-card)]">
          <span className="text-base font-bold text-amber">⚠</span>
          <span>{data.lowPointWarning}</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {data.horizons.map((h) => (
          <MetricCard
            key={h.horizon}
            label={`${h.horizon}-Day Closing Balance`}
            value={formatCompactCurrency(h.closingBalance, "USD")}
            accent={h.trend === "improving" ? "green" : h.trend === "watch" ? "amber" : "blue"}
            sub={h.trendLabel}
          />
        ))}
      </div>

      <SectionCard
        title={
          <div className="flex items-center gap-1.5">
            {HORIZONS.map((h) => (
              <button
                key={h}
                onClick={() => dispatch(setActiveHorizon(h))}
                className={`rounded-[5px] px-3 py-1.5 text-[11px] font-bold ${
                  activeHorizon === h ? "bg-blue text-white" : "text-text-2 hover:bg-bg-hover"
                }`}
              >
                {h}D
              </button>
            ))}
            <span className="ml-2 text-[11px] font-normal text-text-muted">
              {activeSummary.trendLabel}
            </span>
          </div>
        }
        action={
          <div className="flex items-center gap-1.5">
            {CHART_VIEWS.map((v) => (
              <Button
                key={v}
                variant={chartView === v ? "primary" : "secondary"}
                className="text-[11px] capitalize"
                onClick={() => dispatch(setChartView(v))}
              >
                {v}
              </Button>
            ))}
          </div>
        }
      >
        <ForecastChart series={data.series[activeHorizon]} view={chartView} />
      </SectionCard>

      <EntityForecastTable rows={data.entityRows} />

      <AssumptionsList assumptions={data.assumptions} />

      <VarianceAnalysis
        windowLabel={data.varianceWindowLabel}
        totalVariance={data.totalVariance}
        inflowVariance={data.inflowVariance}
        outflowVariance={data.outflowVariance}
        explainedDriverCount={data.explainedDriverCount}
        drivers={data.varianceDrivers}
      />
    </AppShell>
  );
}
