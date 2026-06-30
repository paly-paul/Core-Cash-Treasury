import { Badge, ConfidencePill } from "@/components/ui/Badge";
import { formatFullCurrency } from "@/utils/format";
import type { ForecastEntityRow } from "@/types/cash";

export function EntityForecastTable({ rows }: { rows: ForecastEntityRow[] }) {
  return (
    <div className="overflow-hidden rounded-md border border-border-0 bg-bg-surface shadow-[var(--shadow-card)]">
      <div className="border-b border-border-0 bg-bg-elevated px-4 py-2.5 text-xs font-bold text-text-1">
        Forecast by Entity
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-bg-elevated">
            {["Entity", "CCY", "Opening", "Inflows", "Outflows", "Closing", "Confidence", "Note"].map((h, i) => (
              <th
                key={h}
                className={`whitespace-nowrap border-b border-border-0 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-text-muted ${
                  i >= 2 && i <= 5 ? "text-right" : "text-left"
                }`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.entity}
              className={`border-b border-border-0 hover:bg-bg-hover ${row.warning ? "bg-amber-light hover:bg-[#fef3c7]" : ""}`}
            >
              <td className="px-3.5 py-2.5 font-semibold text-text-1">{row.entity}</td>
              <td className="px-3.5 py-2.5">
                <Badge tone="muted">{row.currency}</Badge>
              </td>
              <td className="px-3.5 py-2.5 text-right font-data text-xs text-text-2">
                {formatFullCurrency(row.opening, row.currency)}
              </td>
              <td className="px-3.5 py-2.5 text-right font-data text-xs text-green">
                +{formatFullCurrency(row.inflows, row.currency)}
              </td>
              <td className="px-3.5 py-2.5 text-right font-data text-xs text-red">
                -{formatFullCurrency(row.outflows, row.currency)}
              </td>
              <td className="px-3.5 py-2.5 text-right font-data text-xs font-semibold text-text-1">
                {formatFullCurrency(row.closing, row.currency)}
              </td>
              <td className="px-3.5 py-2.5">
                <ConfidencePill level={row.confidence} />
              </td>
              <td className="px-3.5 py-2.5 text-[11px] text-text-muted">
                {row.warning ? <span className="font-semibold text-amber">⚠ {row.note}</span> : row.note ?? "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
