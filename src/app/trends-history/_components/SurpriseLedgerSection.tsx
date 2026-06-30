import type { LedgerEntry } from "@/types/cash";

const AMOUNT_TONE_CLASSES: Record<LedgerEntry["tone"], string> = {
  red: "text-red",
  green: "text-green",
  amber: "text-amber",
};

export function SurpriseLedgerSection({ entries }: { entries: LedgerEntry[] }) {
  return (
    <div className="rounded-md border border-border-0 bg-bg-surface shadow-[var(--shadow-card)]">
      <div className="flex flex-col divide-y divide-border-0">
        {entries.map((entry) => (
          <div key={entry.id} className="flex items-start gap-3 px-4 py-3">
            <div className="w-9 flex-shrink-0 font-data text-[11px] font-bold uppercase text-text-muted">
              {entry.month}
            </div>
            <div className="flex-1">
              <div className="text-[12.5px] font-semibold text-text-1">{entry.title}</div>
              <div className="mt-0.5 text-[11.5px] leading-relaxed text-text-2">{entry.description}</div>
            </div>
            <div className={`font-data text-[12px] font-semibold whitespace-nowrap ${AMOUNT_TONE_CLASSES[entry.tone]}`}>
              {entry.amountLabel}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
