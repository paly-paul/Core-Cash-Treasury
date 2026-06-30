import type { BriefingDayEntry as BriefingDayEntryType } from "@/types/cash";

export function BriefingDayEntry({ day }: { day: BriefingDayEntryType }) {
  return (
    <div className={`border-l-2 py-2.5 pl-3.5 ${day.isToday ? "border-l-blue" : "border-l-border-0"}`}>
      <div
        className={`mb-1 text-[10.5px] font-bold uppercase tracking-wide ${
          day.isToday ? "text-blue" : "text-text-muted"
        }`}
      >
        {day.dateLabel}
      </div>
      <p className="text-[12.5px] leading-relaxed text-text-2">{day.text}</p>
      {day.precedent && (
        <div className="mt-2 flex gap-2 rounded-[5px] border border-amber/25 bg-amber-light px-2.5 py-2 text-[11.5px] leading-relaxed text-text-2">
          <span className="flex-shrink-0 text-amber">◷</span>
          <span>{day.precedent.text}</span>
        </div>
      )}
    </div>
  );
}
