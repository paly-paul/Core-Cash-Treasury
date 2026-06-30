import { Button } from "@/components/ui/Button";
import { UploadZoneCard } from "./UploadZoneCard";
import { RecentUploadsList } from "./RecentUploadsList";
import type { RecentUpload, UploadZoneState } from "@/types/cash";

export function FileUploadsTab({ zones, recentUploads }: { zones: UploadZoneState[]; recentUploads: RecentUpload[] }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-[15px] font-bold text-text-1">Upload Data Files</div>
          <div className="text-[11px] text-text-muted">CSV or Excel · Max 10MB · Supports BAI2, camt.053, MT940</div>
        </div>
        <Button variant="secondary" className="text-[11px]">↓ Download Templates</Button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {zones.map((zone) => (
          <UploadZoneCard key={zone.kind} zone={zone} />
        ))}
      </div>

      <RecentUploadsList uploads={recentUploads} />
    </div>
  );
}
