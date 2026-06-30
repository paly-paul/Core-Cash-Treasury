import { formatSignedCompactCurrency, formatCompactCurrency } from "@/utils/format";

/**
 * Hand-coded SVG waterfall: Opening → Inflows → Outflows → Closing, bar
 * heights proportional to the largest value in the set. Mirrors the
 * prototype's inline-SVG waterfall (id="fc-chart-wf") but driven entirely
 * by the active horizon's summary data instead of fixed coordinates.
 */
interface WaterfallChartProps {
  horizonLabel: string;
  openingCash: number;
  inflows: number;
  outflows: number;
  closingBalance: number;
}

const BAR_WIDTH = 80;
const CHART_HEIGHT = 190;
const BASELINE_Y = 155;
const MAX_BAR_HEIGHT = 133;

export function WaterfallChart({ horizonLabel, openingCash, inflows, outflows, closingBalance }: WaterfallChartProps) {
  const bars = [
    { label: "Opening", value: openingCash, color: "var(--blue)", x: 40 },
    { label: "Inflows", value: inflows, color: "var(--green)", x: 155 },
    { label: "Outflows", value: outflows, color: "var(--red)", x: 270 },
    { label: `${horizonLabel} Close`, value: closingBalance, color: "var(--blue)", x: 385 },
  ];
  const maxValue = Math.max(...bars.map((b) => b.value), 1);

  return (
    <svg viewBox={`0 0 620 ${CHART_HEIGHT}`} className="h-[220px] w-full">
      <line x1={30} y1={BASELINE_Y} x2={600} y2={BASELINE_Y} stroke="var(--border-0)" strokeWidth={1} />
      {bars.map((bar) => {
        const height = Math.max((bar.value / maxValue) * MAX_BAR_HEIGHT, 4);
        const y = BASELINE_Y - height;
        const cx = bar.x + BAR_WIDTH / 2;
        return (
          <g key={bar.label}>
            <rect x={bar.x} y={y} width={BAR_WIDTH} height={height} rx={3} fill={bar.color} fillOpacity={0.8} />
            <text x={cx} y={y - 8} textAnchor="middle" fontSize={10} fill={bar.color} fontFamily="var(--mono)">
              {bar.label === "Outflows"
                ? formatSignedCompactCurrency(-bar.value, "USD")
                : formatCompactCurrency(bar.value, "USD")}
            </text>
            <text x={cx} y={BASELINE_Y + 17} textAnchor="middle" fontSize={9} fill="var(--text-muted)">
              {bar.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
