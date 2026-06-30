"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setActiveTab, type UploadsTab } from "@/store/uploadsSlice";

const TABS: { key: UploadsTab; label: string }[] = [
  { key: "files", label: "↑ File Uploads" },
  { key: "mapping", label: "⇌ Column Mapping" },
  { key: "accounts", label: "≡ Account Master" },
];

export function UploadsHeader() {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector((s) => s.uploads.activeTab);

  return (
    <div className="flex items-center gap-1 border-b border-border-0 bg-bg-surface px-2 pt-2">
      {TABS.map((tab) => (
        <button
          key={tab.key}
          onClick={() => dispatch(setActiveTab(tab.key))}
          className={`rounded-t-[5px] px-3.5 py-2 text-[12px] font-semibold ${
            activeTab === tab.key
              ? "border border-b-0 border-border-0 bg-bg-base text-text-1"
              : "text-text-muted hover:text-text-1"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
