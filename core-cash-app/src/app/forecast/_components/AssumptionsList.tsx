import { ConfidencePill } from "@/components/ui/Badge";
import { SectionCard } from "@/components/ui/SectionCard";
import { formatFullCurrency } from "@/utils/format";
import type { Assumption } from "@/types/cash";

export function AssumptionsList({ assumptions }: { assumptions: Assumption[] }) {
  return (
    <SectionCard title="Manual Assumptions">
      <div className="flex flex-col gap-2.5">
        {assumptions.map((a) => (
          <div
            key={a.id}
            className="flex items-center justify-between gap-3 rounded-[6px] border border-border-0 bg-bg-elevated px-3 py-2.5"
          >
            <div>
              <div className="text-[12.5px] font-semibold text-text-1">{a.description}</div>
              <div className="mt-0.5 text-[11px] text-text-muted">
                {a.entity} · {a.category} · {a.date}
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <span className={`font-data text-xs font-semibold ${a.type === "inflow" ? "text-green" : "text-red"}`}>
                {a.type === "inflow" ? "+" : "-"}
                {formatFullCurrency(a.amount, a.currency)}
              </span>
              <ConfidencePill level={a.confidence} />
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
