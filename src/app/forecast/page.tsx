"use client";

import { useState } from "react";
import { AppShell } from "@/components/shell/AppShell";
import { Button } from "@/components/ui/Button";
import { MetricCard } from "@/components/ui/MetricCard";
import { SectionCard } from "@/components/ui/SectionCard";
import { useToast } from "@/components/ui/Toast";
import { ExceptionsPanel } from "../dashboard/_components/ExceptionsPanel";
import { ForecastChart } from "./_components/ForecastChart";
import { WaterfallChart } from "./_components/WaterfallChart";
import { EntityForecastTable } from "./_components/EntityForecastTable";
import { AssumptionsList } from "./_components/AssumptionsList";
import { AssumptionFormModal } from "./_components/AssumptionFormModal";
import { VarianceAnalysis } from "./_components/VarianceAnalysis";
import { ForecastHeader } from "./_components/ForecastHeader";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { addAssumption, setActiveHorizon, setChartView } from "@/store/forecastSlice";
import { formatCompactCurrency } from "@/utils/format";
import type { ForecastHorizon } from "@/types/cash";

const HORIZONS: ForecastHorizon[] = [7, 30, 60];
const CHART_VIEWS = ["bar", "line", "waterfall"] as const;

export default function ForecastPage() {
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const data = useAppSelector((s) => s.forecast.data);
  const dashboardExceptions = useAppSelector((s) => s.dashboard.data.exceptions);
  const activeHorizon = useAppSelector((s) => s.forecast.activeHorizon);
  const chartView = useAppSelector((s) => s.forecast.chartView);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const activeSummary = data.horizons.find((h) => h.horizon === activeHorizon)!;
  const sevenDayClose = data.horizons.find((h) => h.horizon === 7)!.closingBalance;
  const thirtyDayLow = Math.min(...data.series[30].map((p) => p.balance));

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
        { label: "Total Cash", value: formatCompactCurrency(data.totalCashUsd, "USD") },
        { label: "7-Day Close", value: formatCompactCurrency(sevenDayClose, "USD") },
        { label: "30-Day Low", value: formatCompactCurrency(thirtyDayLow, "USD"), tone: "warning" },
        { label: "Forecast Conf.", value: data.forecastConfidence.toUpperCase() },
      ]}
    >
      <ForecastHeader asOf={data.asOf} onAddAssumption={() => setAddModalOpen(true)} />

      {activeSummary.lowPointWarning && (
        <div className="flex items-center gap-3 rounded-md border border-amber/25 bg-amber-light px-[18px] py-3.5 text-[12.5px] text-text-2 shadow-[var(--shadow-card)]">
          <span className="text-base font-bold text-amber">⚠</span>
          <span>{activeSummary.lowPointWarning}</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <MetricCard label="Opening Cash" value={formatCompactCurrency(activeSummary.openingCash, "USD")} accent="blue" sub={activeSummary.openingNote} />
        <MetricCard
          label="Expected Inflows"
          value={formatCompactCurrency(activeSummary.inflows, "USD")}
          accent="green"
          sub={activeSummary.inflowSub}
          delta={activeSummary.inflowNote}
          deltaDirection="up"
        />
        <MetricCard
          label="Expected Outflows"
          value={formatCompactCurrency(activeSummary.outflows, "USD")}
          accent="red"
          sub={activeSummary.outflowSub}
          delta={activeSummary.outflowNote}
          deltaDirection="down"
        />
        <MetricCard
          label="Forecast Closing"
          value={formatCompactCurrency(activeSummary.closingBalance, "USD")}
          accent={activeSummary.trend === "improving" ? "green" : activeSummary.trend === "watch" ? "amber" : "blue"}
          sub={activeSummary.trendLabel}
        />
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
            <span className="ml-2 text-[11px] font-normal text-text-muted">{activeSummary.trendLabel}</span>
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
        {chartView === "waterfall" ? (
          <WaterfallChart
            horizonLabel={`${activeHorizon}D`}
            openingCash={activeSummary.openingCash}
            inflows={activeSummary.inflows}
            outflows={activeSummary.outflows}
            closingBalance={activeSummary.closingBalance}
          />
        ) : (
          <ForecastChart series={data.series[activeHorizon]} view={chartView} />
        )}
      </SectionCard>

      <EntityForecastTable rows={data.entityRows[activeHorizon]} />

      <AssumptionsList assumptions={data.assumptions} />

      <VarianceAnalysis
        windowLabel={data.varianceWindowLabel}
        totalVariance={data.totalVariance}
        inflowVariance={data.inflowVariance}
        outflowVariance={data.outflowVariance}
        explainedDriverCount={data.explainedDriverCount}
        drivers={data.varianceDrivers}
      />

      <AssumptionFormModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={(input) => {
          dispatch(addAssumption(input));
          showToast({ title: "Assumption added", message: input.description, type: "success" });
        }}
      />
    </AppShell>
  );
}
