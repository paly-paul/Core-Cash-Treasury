import { SectionCard } from "@/components/ui/SectionCard";
import { formatFullCurrency } from "@/utils/format";
import type { CurrencyBreakdown as CurrencyBreakdownType } from "@/types/cash";

export function CurrencyBreakdown({ items }: { items: CurrencyBreakdownType[] }) {
  return (
    <SectionCard title="Cash by Currency">
      <div className="flex flex-wrap gap-6">
        {items.map((item) => (
          <div key={item.currency} className="min-w-[120px] flex-1 text-center">
            <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-text-muted">
              {item.currency}
            </div>
            <div
              className={`font-data text-lg font-semibold ${item.belowThreshold ? "text-amber" : "text-text-1"}`}
            >
              {formatFullCurrency(item.amount, item.currency)}
            </div>
            {item.belowThreshold ? (
              <div className="text-[11px] font-bold text-amber">⚠ Below threshold</div>
            ) : (
              <div className="text-[11px] text-text-muted">{item.pctOfTotal}% of total</div>
            )}
            <div className="mt-1.5 h-1 rounded-sm bg-bg-elevated">
              <div
                className={`h-full rounded-sm ${item.belowThreshold ? "bg-amber" : "bg-blue"}`}
                style={{ width: `${item.pctOfTotal}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
