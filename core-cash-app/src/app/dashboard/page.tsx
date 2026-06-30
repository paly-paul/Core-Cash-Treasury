"use client";

import { AppShell } from "@/components/shell/AppShell";
import { StatusCard } from "@/components/ui/StatusCard";
import { MetricCard } from "@/components/ui/MetricCard";
import { RecommendationCard } from "@/components/ui/RecommendationCard";
import { CurrencyBreakdown } from "./_components/CurrencyBreakdown";
import { AccountTable } from "./_components/AccountTable";
import { LiquidityRiskSection } from "./_components/LiquidityRiskSection";
import { ExceptionsPanel } from "./_components/ExceptionsPanel";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { markRecommendationReviewed } from "@/store/dashboardSlice";
import { formatCompactCurrency } from "@/utils/format";

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const data = useAppSelector((s) => s.dashboard.data);
  const reviewedRecommendationIds = useAppSelector((s) => s.dashboard.reviewedRecommendationIds);

  return (
    <AppShell
      asOf={data.asOf}
      aiPanelTitle="AI Treasury Agent"
      aiPanelMessages={[
        {
          id: "welcome",
          role: "agent",
          text: "I've reviewed today's cash position. One funding action needed for EU Entity before 15:00 CET — see the exceptions panel.",
          time: "09:14",
        },
      ]}
      aiPanelPrimaryView={{ label: "Exceptions", content: <ExceptionsPanel exceptions={data.exceptions} /> }}
      stats={[
        { label: "Total Cash", value: formatCompactCurrency(data.totalCashUsd, "USD") },
        { label: "Usable", value: formatCompactCurrency(data.usableCashUsd, "USD") },
        { label: "Open Exceptions", value: String(data.openExceptionsCount), tone: "warning" },
      ]}
    >
      <StatusCard status={data.liquidityStatus === "normal" ? "normal" : "watch"} description={data.liquidityHeadline} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="Total Cash"
          value={formatCompactCurrency(data.totalCashUsd, "USD")}
          accent="blue"
          delta={`${data.totalCashDeltaPct >= 0 ? "+" : ""}${data.totalCashDeltaPct}% vs yesterday`}
          deltaDirection={data.totalCashDeltaPct >= 0 ? "up" : "down"}
        />
        <MetricCard
          label="Usable Cash"
          value={formatCompactCurrency(data.usableCashUsd, "USD")}
          accent="green"
          sub={`${formatCompactCurrency(data.restrictedCashUsd, "USD")} restricted`}
        />
        <MetricCard
          label="Cash Runway"
          value={`${data.cashRunwayDays} days`}
          accent="info"
          sub={`7-day forecast: ${formatCompactCurrency(data.sevenDayForecastUsd, "USD")}`}
        />
        <MetricCard
          label="Data Confidence"
          value={data.dataConfidence === "high" ? "High" : data.dataConfidence === "medium" ? "Medium" : "Low"}
          accent={data.dataConfidence === "high" ? "green" : "amber"}
        />
      </div>

      <CurrencyBreakdown items={data.currencyBreakdown} />

      <AccountTable entityGroups={data.entityGroups} />

      <RecommendationCard
        recommendation={data.recommendation}
        reviewedAt={reviewedRecommendationIds[data.recommendation.id]}
        onMarkReviewed={() => dispatch(markRecommendationReviewed(data.recommendation.id))}
      />

      <LiquidityRiskSection
        riskScore={data.riskScore}
        riskItems={data.riskItems}
        thresholdMonitoring={data.thresholdMonitoring}
      />
    </AppShell>
  );
}
