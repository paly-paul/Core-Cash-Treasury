import { MetricCard } from "@/components/ui/MetricCard";
import type { CostOfCashCell } from "@/types/cash";

export function CostOfCashSection({ cells }: { cells: CostOfCashCell[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {cells.map((cell) => (
        <MetricCard
          key={cell.id}
          label={cell.label}
          value={cell.value}
          accent={cell.warn ? "amber" : "blue"}
          sub={cell.sub}
        />
      ))}
    </div>
  );
}
