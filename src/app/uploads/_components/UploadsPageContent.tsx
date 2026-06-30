"use client";

import { AppShell } from "@/components/shell/AppShell";
import { ExceptionsPanel } from "../../dashboard/_components/ExceptionsPanel";
import { UploadsHeader } from "./UploadsHeader";
import { FileUploadsTab } from "./FileUploadsTab";
import { ColumnMappingTab } from "./ColumnMappingTab";
import { AccountMasterTab } from "./AccountMasterTab";
import { useAppSelector } from "@/hooks/redux";
import { formatCompactCurrency } from "@/utils/format";

export function UploadsPageContent() {
  const data = useAppSelector((s) => s.uploads.data);
  const dashboardExceptions = useAppSelector((s) => s.dashboard.data.exceptions);
  const activeTab = useAppSelector((s) => s.uploads.activeTab);

  return (
    <AppShell
      asOf={data.asOf}
      aiPanelTitle="AI Treasury Agent"
      aiPanelMessages={[
        {
          id: "welcome",
          role: "agent",
          text: "AR data upload flagged 3 unmapped counterparties — review the Column Mapping tab to map them before they're included in the forecast.",
          time: "09:14",
        },
      ]}
      aiPanelPrimaryView={{ label: "Exceptions", content: <ExceptionsPanel exceptions={dashboardExceptions} /> }}
      stats={[
        { label: "Total Cash", value: formatCompactCurrency(data.totalCashUsd, "USD") },
        { label: "Last Upload", value: data.lastUploadTime },
        { label: "Pending Review", value: `${data.pendingReviewCount} mapping`, tone: "warning" },
      ]}
    >
      <div className="rounded-md border border-border-0 bg-bg-surface shadow-[var(--shadow-card)]">
        <UploadsHeader />
        <div className="p-5">
          {activeTab === "files" && <FileUploadsTab zones={data.uploadZones} recentUploads={data.recentUploads} />}
          {activeTab === "mapping" && <ColumnMappingTab mapping={data.columnMapping} />}
          {activeTab === "accounts" && <AccountMasterTab accounts={data.accounts} />}
        </div>
      </div>
    </AppShell>
  );
}
