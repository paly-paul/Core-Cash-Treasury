"use client";

import { AppShell } from "@/components/shell/AppShell";
import { mockTrendsData } from "@/lib/mocks/trendsData";
import { mockPredictionSignals } from "@/lib/mocks/predictionSignals";
import { formatCompactCurrency } from "@/utils/format";
import { TrendsPageHeader } from "./_components/TrendsPageHeader";
import { TrendSection } from "./_components/TrendSection";
import { YoyComparisonSection } from "./_components/YoyComparisonSection";
import { BenchmarkSection } from "./_components/BenchmarkSection";
import { SixMonthChart } from "./_components/SixMonthChart";
import { SurpriseLedgerSection } from "./_components/SurpriseLedgerSection";
import { CreepDetectorSection } from "./_components/CreepDetectorSection";
import { ConcentrationSection } from "./_components/ConcentrationSection";
import { PredictionSignalCard } from "./_components/PredictionSignalCard";
import { StressLinesSection } from "./_components/StressLinesSection";
import { CostOfCashSection } from "./_components/CostOfCashSection";

export default function TrendsHistoryPage() {
  const data = mockTrendsData;

  return (
    <AppShell
      asOf={data.asOf}
      aiPanelTitle="Cash Agent · AI"
      aiPanelMessages={[
        {
          id: "welcome",
          role: "agent",
          text: "Two things stand out over the last 6 months: Customer A's AR delay is now a confirmed pattern (3 of 4 months), and counterparty concentration has grown from 58% to 69% in your top 3. Want me to model the impact if Customer A is excluded from next quarter's high-confidence forecast?",
          time: "09:14",
        },
      ]}
      aiPanelSuggestedPrompts={[
        { label: "Model Customer A exclusion", message: "Model the impact if Customer A is excluded from next quarter's high-confidence forecast." },
      ]}
      stats={[
        { label: "Total Cash", value: formatCompactCurrency(data.totalCashUsd, "USD") },
        { label: "YoY Cash Δ", value: `+${data.yoyCashDeltaPct}%`, tone: "positive" },
        { label: "6-Mo Risk Events", value: String(data.sixMonthRiskEvents), tone: "warning" },
        { label: "Active Signals", value: String(data.activeSignalsCount) },
      ]}
    >
      <TrendsPageHeader />

      <TrendSection num={1} title="Year-over-Year — Same Quarter Comparison" sub="Q2 2026 VS Q2 2025">
        <YoyComparisonSection cards={data.yoyComparisons} />
      </TrendSection>

      <TrendSection num={2} title="Benchmarked Against Our Own History" sub="90-DAY ROLLING AVERAGE">
        <BenchmarkSection rows={data.benchmarkRows} />
      </TrendSection>

      <TrendSection num={3} title="6-Month Historical View" sub="JAN – JUN 2026">
        <SixMonthChart series={data.sixMonthSeries} />
      </TrendSection>

      <TrendSection num={4} title="Surprise Inflows, Outflows & Manual Assumptions Log" sub="LAST 6 MONTHS">
        <SurpriseLedgerSection entries={data.surpriseLedger} />
      </TrendSection>

      <TrendSection num={5} title="Things That Quietly Got Worse" sub="NOT YET ALERT-TRIGGERING">
        <CreepDetectorSection items={data.creepItems} />
      </TrendSection>

      <TrendSection num={6} title="Counterparty Concentration & Behavior Drift" sub="SHARE OF TOTAL AR RISK">
        <ConcentrationSection rows={data.concentrationRows} callout={data.concentrationCallout} />
      </TrendSection>

      <TrendSection num={7} title="Predictions & Pattern-Based Signals" sub="NOT FORECAST OUTPUT — SEPARATE BASIS">
        <div className="flex flex-col gap-2">
          {mockPredictionSignals.map((signal) => (
            <PredictionSignalCard key={signal.id} signal={signal} />
          ))}
        </div>
      </TrendSection>

      <TrendSection num={8} title="Scenario Stress Lines" sub="LIGHTWEIGHT CONDITIONALS">
        <StressLinesSection lines={data.stressLines} />
      </TrendSection>

      <TrendSection num={9} title="Cost of Cash" sub="OPPORTUNITY COST OF CURRENT POSITIONING">
        <CostOfCashSection cells={data.costOfCash} />
      </TrendSection>
    </AppShell>
  );
}
