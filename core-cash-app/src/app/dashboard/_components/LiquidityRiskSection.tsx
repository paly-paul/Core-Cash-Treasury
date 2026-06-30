import { SectionCard } from "@/components/ui/SectionCard";
import { Badge } from "@/components/ui/Badge";
import { MetricCard } from "@/components/ui/MetricCard";
import { Button } from "@/components/ui/Button";
import type { RiskItem, ThresholdMonitorRow } from "@/types/cash";

const SEVERITY_TONE = {
  critical: "red",
  watch: "amber",
} as const;

export function LiquidityRiskSection({
  asOf,
  riskScore,
  riskScoreDelta,
  activeBreaches,
  activeBreachesLabel,
  cashRunwayDays,
  cashRunwayDeltaDays,
  concentrationRiskLevel,
  concentrationRiskSub,
  riskItems,
  thresholdMonitoring,
}: {
  asOf: string;
  riskScore: number;
  riskScoreDelta: string;
  activeBreaches: number;
  activeBreachesLabel: string;
  cashRunwayDays: number;
  cashRunwayDeltaDays: number;
  concentrationRiskLevel: "Low" | "Medium" | "High";
  concentrationRiskSub: string;
  riskItems: RiskItem[];
  thresholdMonitoring: ThresholdMonitorRow[];
}) {
  const criticalCount = riskItems.filter((r) => r.severity === "critical").length;
  const watchCount = riskItems.filter((r) => r.severity === "watch").length;

  return (
    <div id="liquidity-section" className="flex flex-col gap-4">
      <div className="flex items-center justify-between pt-2">
        <div>
          <div className="text-base font-bold text-text-1">Liquidity Risk Analysis</div>
          <div className="text-[11px] text-text-muted">REAL-TIME · AGENT 3 · {asOf}</div>
        </div>
        <Button variant="secondary" className="text-[11px]">
          ↓ Export
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="Risk Score"
          value={`${riskScore} / 10`}
          accent="amber"
          delta={riskScoreDelta}
          deltaDirection="up"
          sub={`Low risk — ${riskItems.length} active item${riskItems.length === 1 ? "" : "s"}`}
        />
        <MetricCard
          label="Active Breaches"
          value={String(activeBreaches)}
          accent="red"
          delta={`▼ ${activeBreachesLabel}`}
          deltaDirection="down"
          sub="Below minimum"
        />
        <MetricCard
          label="Cash Runway"
          value={`${cashRunwayDays} days`}
          accent="blue"
          delta={`▲ +${cashRunwayDeltaDays} vs yesterday`}
          deltaDirection="up"
          sub="At current burn rate"
        />
        <MetricCard
          label="Concentration Risk"
          value={concentrationRiskLevel}
          accent="green"
          delta={concentrationRiskSub}
          deltaDirection="up"
          sub="3 currencies · 6 banks"
        />
      </div>

      <SectionCard
        title="Risk Items"
        action={
          <Badge tone="red">
            {criticalCount} critical · {watchCount} watch
          </Badge>
        }
      >
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
      </SectionCard>

      <SectionCard title="Threshold Monitoring">
        <div className="flex flex-col gap-2.5">
          {thresholdMonitoring.map((row) => (
            <div key={row.accountName}>
              <div className="mb-1 flex items-center justify-between text-[11.5px]">
                <span className={row.status === "low" ? "font-semibold text-amber" : "text-text-2"}>
                  {row.accountName}
                </span>
                <span className={`font-data ${row.status === "low" ? "text-red" : "text-text-1"}`}>
                  {row.displayBalance}
                </span>
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
      </SectionCard>
    </div>
  );
}
