"use client";

import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

export function CfoPageHeader() {
  const { showToast } = useToast();

  return (
    <div className="print:hidden flex flex-wrap items-center justify-between gap-3">
      <div>
        <div className="text-[19px] font-bold text-text-1">CFO Summary &amp; AI Insights</div>
        <div className="text-[11px] font-semibold uppercase tracking-wide text-text-muted">
          Daily Executive Report · Agent 5 · 26 Jun 2026
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          className="text-[11px]"
          onClick={() =>
            showToast({ title: "Email drafted", message: "CFO Summary email draft created.", type: "success" })
          }
        >
          ✉ Email Draft
        </Button>
        <Button variant="secondary" className="text-[11px]" onClick={() => window.print()}>
          🖨 Print
        </Button>
        <Button
          variant="primary"
          className="text-[11px]"
          onClick={() =>
            showToast({ title: "PDF generated", message: "CFO_Summary_26Jun2026.pdf downloaded.", type: "success" })
          }
        >
          ↓ Export PDF
        </Button>
      </div>
    </div>
  );
}
