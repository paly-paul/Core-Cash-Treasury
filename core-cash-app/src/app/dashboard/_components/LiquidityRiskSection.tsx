import { SectionCard } from "@/components/ui/SectionCard";
import { Badge } from "@/components/ui/Badge";
import type { RiskItem, ThresholdMonitorRow } from "@/types/cash";

const SEVERITY_TONE = {
  critical: "red",
  watch: "amber",
} as const;

export function LiquidityRiskSection({
  riskScore,
  riskItems,
  thresholdMonitoring,
}: {
  riskScore: number;
  riskItems: RiskItem[];
  thresholdMonitoring: ThresholdMonitorRow[];
}) {
  return (
    <SectionCard
      title="Liquidity Risk"
      action={
        <div className="flex items-center gap-2 text-[11px] text-text-muted">
          Risk Score <span className="font-data text-sm font-bold text-amber">{riskScore}/10</span>
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-2.5">
          {riskItems.map((item) => (
            <div
              key={item.id}
              className={`rounded-[6px] border-l-4 bg-bg-elevated p-3 ${
                item.severity === "critical" ? "border-l-red" : "border-l-amber"
              }`}
            >
              <div className="mb-1 flex items-center justify-between gap-2">
                <div className="text-[12.5px] font-bold text-text-1">{item.title}</div>
                <Badge tone={SEVERITY_TONE[item.severity]}>{item.severity === "critical" ? "Critical" : "Watch"}</Badge>
              </div>
              <div className="text-[11.5px] leading-relaxed text-text-2">{item.description}</div>
              {item.owner && (
                <div className="mt-1.5 text-[10px] font-semibold uppercase tracking-wide text-text-muted">
                  Owner: {item.owner}
                </div>
              )}
            </div>
          ))}
        </div>

        <div>
          <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-text-muted">
            Threshold Monitoring
          </div>
          <div className="flex flex-col gap-2.5">
            {thresholdMonitoring.map((row) => (
              <div key={row.accountName}>
                <div className="mb-1 flex items-center justify-between text-[11.5px]">
                  <span className="text-text-2">{row.accountName}</span>
                  <span className="font-data text-text-1">{row.displayBalance}</span>
                </div>
                <div className="h-1.5 rounded-sm bg-bg-elevated">
                  <div
                    className={`h-full rounded-sm ${row.status === "low" ? "bg-red" : "bg-green"}`}
                    style={{ width: `${Math.min(row.pctOfThreshold, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
