"use client";

import { useRef, useState, type DragEvent } from "react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { useAppDispatch } from "@/hooks/redux";
import { completeZoneUpload, setZoneUploading } from "@/store/uploadsSlice";
import type { UploadZoneState } from "@/types/cash";

const STATUS_CLASSES: Record<UploadZoneState["status"], string> = {
  valid: "border-green/20 bg-green-light text-green",
  warning: "border-amber/25 bg-amber-light text-amber",
  error: "border-red/20 bg-red-light text-red",
};

const STATUS_ICON: Record<UploadZoneState["status"], string> = {
  valid: "✓",
  warning: "⚠",
  error: "✕",
};

/**
 * Drag-and-drop upload zone (prototype's `.ucard`/`.uzone`). Since there's
 * no backend yet, any dropped/selected file simulates a short "uploading"
 * delay then resolves to a warning status with an unmapped-counterparties
 * note — close enough to a real validation pass to exercise the toast and
 * status-badge UI without a fake success-every-time shortcut.
 */
export function UploadZoneCard({ zone }: { zone: UploadZoneState }) {
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  function simulateUpload(fileName: string) {
    dispatch(setZoneUploading({ kind: zone.kind, fileName }));
    showToast({ title: "Uploading", message: `${fileName} is being processed.`, type: "warning" });
    setTimeout(() => {
      dispatch(
        completeZoneUpload({
          kind: zone.kind,
          status: "warning",
          statusNote: "Pending review",
        })
      );
      showToast({ title: "Upload received", message: `${fileName} uploaded — review required.`, type: "warning" });
    }, 1200);
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) simulateUpload(file.name);
  }

  return (
    <div className="flex flex-col gap-2 rounded-md border border-border-0 bg-bg-surface p-3.5 shadow-[var(--shadow-card)]">
      <div className="flex items-center gap-2 text-[12.5px] font-bold text-text-1">
        <span
          className="flex h-7 w-7 items-center justify-center rounded-[6px] text-sm"
          style={{ background: zone.iconBg }}
        >
          {zone.icon}
        </span>
        {zone.title}
      </div>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`flex cursor-pointer flex-col items-center gap-1 rounded-[6px] border border-dashed px-3 py-5 text-center transition-colors ${
          dragOver ? "border-blue bg-blue-light" : "border-border-1 hover:border-blue hover:bg-blue-light"
        }`}
      >
        <span className="text-lg text-text-muted">☁</span>
        <span className="text-[11.5px] font-semibold text-text-2">Drag &amp; drop or click</span>
        <span className="text-[10.5px] text-text-muted">{zone.helpText}</span>
      </div>
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) simulateUpload(file.name);
          e.target.value = "";
        }}
      />
      <div className={`flex items-center gap-2 rounded-[5px] border px-2.5 py-1.5 text-[11px] ${STATUS_CLASSES[zone.status]}`}>
        {STATUS_ICON[zone.status]} {zone.fileName} · {zone.statusNote}
      </div>
      <Button variant="secondary" className="justify-center text-[11px]">
        {zone.templateLabel}
      </Button>
    </div>
  );
}
