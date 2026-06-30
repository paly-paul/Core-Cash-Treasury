import type { ReactNode } from "react";

export function SectionCard({
  title,
  action,
  children,
}: {
  title: ReactNode;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="rounded-md border border-border-0 bg-bg-surface shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between rounded-t-md border-b border-border-0 bg-bg-elevated px-4 py-3">
        <div className="text-xs font-bold text-text-1">{title}</div>
        {action}
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}
