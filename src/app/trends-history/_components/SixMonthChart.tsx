"use client";

import { Bar, ComposedChart, CartesianGrid, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { SixMonthPoint } from "@/types/cash";
import { formatCompactCurrency, formatFullCurrency } from "@/utils/format";

export function SixMonthChart({ series }: { series: SixMonthPoint[] }) {
  return (
    <div className="rounded-md border border-border-0 bg-bg-surface p-4 shadow-[var(--shadow-card)]">
      <div className="h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={series} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
            <CartesianGrid stroke="var(--border-0)" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} />
            <YAxis
              yAxisId="cash"
              tickFormatter={(v) => formatCompactCurrency(v, "USD")}
              tick={{ fontSize: 11, fill: "var(--text-muted)" }}
              axisLine={false}
              tickLine={false}
              width={56}
            />
            <YAxis
              yAxisId="incidents"
              orientation="right"
              allowDecimals={false}
              tick={{ fontSize: 11, fill: "var(--text-muted)" }}
              axisLine={false}
              tickLine={false}
              width={32}
            />
            <Tooltip
              formatter={(value, name) =>
                name === "cashUsd" ? formatFullCurrency(Number(value), "USD") : `${value} incidents`
              }
              contentStyle={{ fontSize: 12, borderRadius: 6, border: "1px solid var(--border-0)" }}
            />
            <Bar yAxisId="incidents" dataKey="riskIncidents" fill="var(--amber)" fillOpacity={0.4} radius={[3, 3, 0, 0]} barSize={18} />
            <Line yAxisId="cash" type="monotone" dataKey="cashUsd" stroke="var(--blue)" strokeWidth={2} dot={{ r: 3 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-2 flex items-center gap-4 text-[10.5px] text-text-muted">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-0.5 w-3 bg-blue" /> Cash position
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-[2px] bg-amber/40" /> Risk incidents
        </span>
      </div>
    </div>
  );
}
