import type { YoyComparisonCard } from "@/types/cash";

export function YoyComparisonSection({ cards }: { cards: YoyComparisonCard[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {cards.map((card) => (
        <div key={card.id} className="rounded-md border border-border-0 bg-bg-surface p-4 shadow-[var(--shadow-card)]">
          <div className="text-[10px] font-bold uppercase tracking-wide text-text-muted">{card.label}</div>
          <div className="mt-1.5 flex items-baseline gap-2">
            <span className="font-data text-xl font-bold text-text-1">{card.thisValue}</span>
            <span className="font-data text-[11px] text-text-muted">{card.lastValue}</span>
          </div>
          <div className={`mt-1.5 text-[11px] font-semibold ${card.favorable ? "text-green" : "text-red"}`}>
            {card.delta}
          </div>
        </div>
      ))}
    </div>
  );
}
