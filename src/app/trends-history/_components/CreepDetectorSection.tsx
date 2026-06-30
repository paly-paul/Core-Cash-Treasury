import type { CreepItem } from "@/types/cash";

function Sparkline({ values }: { values: number[] }) {
  return (
    <div className="mt-2 flex items-end gap-1">
      {values.map((v, i) => (
        <div key={i} className="w-2 rounded-t-sm bg-amber/50" style={{ height: `${v}px` }} />
      ))}
    </div>
  );
}

export function CreepDetectorSection({ items }: { items: CreepItem[] }) {
  return (
    <div className="flex flex-col gap-2">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex gap-3 rounded-md border border-border-0 bg-bg-surface p-4 shadow-[var(--shadow-card)]"
        >
          <div className="flex-shrink-0 text-[14px] text-amber">◢</div>
          <div className="flex-1">
            <div className="text-[12.5px] font-semibold text-text-1">{item.title}</div>
            <div className="mt-1 text-[11.5px] leading-relaxed text-text-2">{item.description}</div>
            {item.sparkline && <Sparkline values={item.sparkline} />}
          </div>
        </div>
      ))}
    </div>
  );
}
