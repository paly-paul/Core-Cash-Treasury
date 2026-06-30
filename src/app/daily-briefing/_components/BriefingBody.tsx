import { forwardRef } from "react";
import type { BriefingData } from "@/types/cash";
import { BriefingDayEntry } from "./BriefingDayEntry";

export const BriefingBody = forwardRef<HTMLDivElement, { data: BriefingData }>(function BriefingBody({ data }, ref) {
  return (
    <div ref={ref} className="rounded-md border border-border-0 bg-bg-surface shadow-[var(--shadow-card)]">
      <div className="rounded-t-md bg-gradient-to-br from-blue to-[#003B96] px-6 py-7 text-white">
        <div className="mb-2 text-[11px] uppercase tracking-widest text-white/60">Core Cash Agent · Daily Briefing</div>
        <div className="text-2xl font-bold">What you need for today&apos;s conversations</div>
        <div className="mt-1 font-data text-[11px] text-white/70">
          {data.windowRangeLabel} · GENERATED {data.generatedAt} · AGENT 5
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-2">
        <div>
          <div className="mb-3 flex items-center gap-2.5">
            <span className="rounded-full bg-bg-elevated px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-text-muted">
              Behind Us
            </span>
            <span className="text-[13px] font-bold text-text-1">Last 4 Days</span>
            <span className="ml-auto font-data text-[10.5px] text-text-muted">{data.behindUs.rangeLabel}</span>
          </div>
          <div className="flex flex-col">
            {data.behindUs.days.map((day) => (
              <BriefingDayEntry key={day.id} day={day} />
            ))}
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center gap-2.5">
            <span className="rounded-full bg-bg-elevated px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-text-muted">
              Ahead of Us
            </span>
            <span className="text-[13px] font-bold text-text-1">Next 4 Days</span>
            <span className="ml-auto font-data text-[10.5px] text-text-muted">{data.aheadOfUs.rangeLabel}</span>
          </div>
          <div className="flex flex-col">
            {data.aheadOfUs.days.map((day) => (
              <BriefingDayEntry key={day.id} day={day} />
            ))}
          </div>
          <div className="mt-3 rounded-md border border-blue/20 bg-blue-light p-3.5">
            <div className="mb-1 text-[10.5px] font-bold uppercase tracking-wide text-blue">
              {data.aheadOfUs.outlook.label}
            </div>
            <p className="text-[12.5px] leading-relaxed text-text-2">{data.aheadOfUs.outlook.text}</p>
          </div>
        </div>
      </div>
    </div>
  );
});
