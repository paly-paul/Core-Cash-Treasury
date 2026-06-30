"use client";

import { AppShell } from "@/components/shell/AppShell";
import { useAppSelector } from "@/hooks/redux";
import { formatCompactCurrency } from "@/utils/format";
import { CfoPageHeader } from "./_components/CfoPageHeader";
import { LiveInsightsPanel } from "./_components/LiveInsightsPanel";
import { CfoReport } from "./_components/CfoReport";
import { CfoMiniTrendBubble } from "./_components/CfoMiniTrendBubble";

export default function CfoSummaryPage() {
  const data = useAppSelector((s) => s.cfo.data);

  return (
    <AppShell
      asOf={data.asOf}
      aiPanelTitle="Cash Agent · AI"
      aiPanelMessages={[
        {
          id: "welcome",
          role: "agent",
          text: "CFO Summary ready. 1 action required — EU Entity EUR funding by 15:00 CET today. All other positions healthy. Shall I draft the distribution email?",
          time: "09:14",
        },
        {
          id: "trend",
          role: "agent",
          text: "",
          time: "09:14",
          content: <CfoMiniTrendBubble data={data} />,
        },
      ]}
      aiPanelSuggestedPrompts={data.suggestedPrompts}
      stats={[
        { label: "Total Cash", value: formatCompactCurrency(data.totalCashUsd, "USD") },
        { label: "Liquidity", value: "Normal", tone: "positive" },
        { label: "Report Date", value: data.reportDate },
        { label: "Mgmt Attention", value: `${data.mgmtAttentionCount} item`, tone: "warning" },
      ]}
    >
      <CfoPageHeader />
      <LiveInsightsPanel />
      <CfoReport data={data} />
    </AppShell>
  );
}
