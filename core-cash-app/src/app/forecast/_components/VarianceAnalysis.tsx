import { ConfidencePill } from "@/components/ui/Badge";
import { SectionCard } from "@/components/ui/SectionCard";
import { formatFullCurrency } from "@/utils/format";
import type { VarianceDriver } from "@/types/cash";

export function VarianceAnalysis({
  windowLabel,
  totalVariance,
  inflowVariance,
  outflowVariance,
  explainedDriverCount,
  drivers,
}: {
  windowLabel: string;
  totalVariance: number;
  inflowVariance: number;
  outflowVariance: number;
  explainedDriverCount: number;
  drivers: VarianceDriver[];
}) {
  return (
    <SectionCard
      title={`Variance Analysis — ${windowLabel}`}
      action={
        <span className="text-[11px] text-text-muted">{explainedDriverCount} drivers explained</span>
      }
    >
      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <VarianceStat label="Total Variance" amount={totalVariance} />
        <VarianceStat label="Inflow Variance" amount={inflowVariance} />
        <VarianceStat label="Outflow Variance" amount={outflowVariance} />
      </div>

      <div className="flex flex-col gap-2.5">
        {drivers.map((d) => (
          <div key={d.id} className="flex items-center gap-3">
            <div className="w-36 flex-shrink-0 text-[12px] font-medium text-text-2">{d.label}</div>
            <div className="flex-1">
              <div className="h-2 rounded-sm bg-bg-elevated">
                <div
                  className={`h-full rounded-sm ${d.favorable ? "bg-green" : "bg-red"}`}
                  style={{ width: `${d.pctOfMax}%` }}
                />
              </div>
            </div>
            <div className={`w-24 flex-shrink-0 text-right font-data text-xs font-semibold ${d.favorable ? "text-green" : "text-red"}`}>
              {d.amount >= 0 ? "+" : "-"}
              {formatFullCurrency(Math.abs(d.amount), "USD")}
            </div>
            <ConfidencePill level={d.confidence} />
            <div className="w-44 flex-shrink-0 text-[11px] text-text-muted">{d.note}</div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

function VarianceStat({ label, amount }: { label: string; amount: number }) {
  const favorable = amount >= 0;
  return (
    <div className="rounded-[6px] border border-border-0 bg-bg-elevated p-3 text-center">
      <div className="text-[10px] font-bold uppercase tracking-wider text-text-muted">{label}</div>
      <div className={`mt-1 font-data text-base font-semibold ${favorable ? "text-green" : "text-red"}`}>
        {amount >= 0 ? "+" : "-"}
        {formatFullCurrency(Math.abs(amount), "USD")}
      </div>
    </div>
  );
}
