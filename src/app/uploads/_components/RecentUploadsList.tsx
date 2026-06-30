import { Badge } from "@/components/ui/Badge";
import { SectionCard } from "@/components/ui/SectionCard";
import { Button } from "@/components/ui/Button";
import type { RecentUpload } from "@/types/cash";

const STATUS_BADGE: Record<RecentUpload["status"], { tone: "green" | "amber" | "red"; label: string }> = {
  valid: { tone: "green", label: "✓ Valid" },
  warning: { tone: "amber", label: "⚠ Warnings" },
  error: { tone: "red", label: "✕ Error" },
};

const STATUS_ICON_CLASSES: Record<RecentUpload["status"], string> = {
  valid: "bg-bg-elevated text-text-2",
  warning: "bg-amber-light text-amber",
  error: "bg-red-light text-red",
};

export function RecentUploadsList({ uploads }: { uploads: RecentUpload[] }) {
  return (
    <SectionCard title="Recent Uploads" action={<Button variant="secondary" className="text-[11px]">View All</Button>}>
      <div className="flex flex-col gap-2">
        {uploads.map((u) => (
          <div key={u.id} className="flex items-center gap-3 rounded-[6px] border border-border-0 px-3 py-2.5">
            <span className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-[5px] text-sm ${STATUS_ICON_CLASSES[u.status]}`}>
              📄
            </span>
            <div className="flex-1">
              <div className="text-[12px] font-semibold text-text-1">{u.fileName}</div>
              <div className="text-[10.5px] text-text-muted">
                {u.sourceFormat} · {u.sizeLabel} · {u.uploadedBy} · {u.timestamp}
              </div>
            </div>
            <Badge tone={STATUS_BADGE[u.status].tone}>{STATUS_BADGE[u.status].label}</Badge>
            <Badge tone="muted">{u.detail}</Badge>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
