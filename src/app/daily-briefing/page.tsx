"use client";

import { useRef } from "react";
import { AppShell } from "@/components/shell/AppShell";
import { mockBriefingData } from "@/lib/mocks/briefingData";
import { formatCompactCurrency } from "@/utils/format";
import { BriefingPageHeader } from "./_components/BriefingPageHeader";
import { BriefingBody } from "./_components/BriefingBody";

export default function DailyBriefingPage() {
  const data = mockBriefingData;
  const briefingRef = useRef<HTMLDivElement>(null);

  return (
    <AppShell
      asOf={data.asOf}
      aiPanelTitle="Cash Agent · AI"
      aiPanelMessages={[
        {
          id: "welcome",
          role: "agent",
          text: "This briefing covers 22–30 Jun. Two things worth your attention: the EUR funding due today, and Customer A's recurring AR delay pattern — that's now 2 of the last 3 months. Want me to draft a note to sales/AR about it?",
          time: "09:14",
        },
      ]}
      stats={[
        { label: "Total Cash", value: formatCompactCurrency(data.totalCashUsd, "USD") },
        { label: "Liquidity", value: "Normal", tone: "positive" },
        { label: "Items Ahead", value: `${data.openItemsCount} open`, tone: "warning" },
        { label: "Briefing Window", value: data.windowLabel },
      ]}
    >
      <BriefingPageHeader briefingRef={briefingRef} />
      <BriefingBody data={data} ref={briefingRef} />
    </AppShell>
  );
}
