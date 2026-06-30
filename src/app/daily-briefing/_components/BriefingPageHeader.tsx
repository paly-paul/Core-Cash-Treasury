"use client";

import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

export function BriefingPageHeader({ briefingRef }: { briefingRef: React.RefObject<HTMLDivElement | null> }) {
  const { showToast } = useToast();

  async function copyAsText() {
    const text = briefingRef.current?.innerText ?? "";
    try {
      await navigator.clipboard.writeText(text);
      showToast({ title: "Copied", message: "Briefing text copied — ready to paste into Slack or email.", type: "success" });
    } catch {
      showToast({ title: "Copy failed", message: "Could not access the clipboard.", type: "error" });
    }
  }

  return (
    <div className="print:hidden flex flex-wrap items-center justify-between gap-3">
      <div>
        <div className="text-[19px] font-bold text-text-1">Daily Briefing</div>
        <div className="text-[11px] font-semibold uppercase tracking-wide text-text-muted">
          For Leadership Discussion · 26 Jun 2026 · Plain-Text Pointers
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="secondary" className="text-[11px]" onClick={copyAsText}>
          ⧉ Copy as Text
        </Button>
        <Button
          variant="primary"
          className="text-[11px]"
          onClick={() =>
            showToast({ title: "Email drafted", message: "Daily briefing email draft created.", type: "success" })
          }
        >
          ✉ Send to Team
        </Button>
      </div>
    </div>
  );
}
