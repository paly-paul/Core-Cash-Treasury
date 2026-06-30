import type { ReactNode } from "react";

export function TrendSection({
  num,
  title,
  sub,
  children,
}: {
  num: number;
  title: string;
  sub: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline gap-2.5">
        <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue font-data text-[11px] font-bold text-white">
          {num}
        </div>
        <div className="text-[14px] font-bold text-text-1">{title}</div>
        <div className="font-data text-[10.5px] uppercase tracking-wide text-text-muted">{sub}</div>
      </div>
      {children}
    </div>
  );
}
