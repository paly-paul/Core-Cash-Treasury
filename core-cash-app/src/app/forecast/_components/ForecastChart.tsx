"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ForecastPoint } from "@/types/cash";
import { formatCompactCurrency, formatFullCurrency } from "@/utils/format";

export function ForecastChart({ series, view }: { series: ForecastPoint[]; view: "bar" | "line" }) {
  const data = series.map((p) => ({ ...p }));

  return (
    <div className="h-[260px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        {view === "line" ? (
          <LineChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
            <CartesianGrid stroke="var(--border-0)" vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 11, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} />
            <YAxis
              tickFormatter={(v) => formatCompactCurrency(v, "USD")}
              tick={{ fontSize: 11, fill: "var(--text-muted)" }}
              axisLine={false}
              tickLine={false}
              width={56}
            />
            <Tooltip
              formatter={(value) => formatFullCurrency(Number(value), "USD")}
              contentStyle={{ fontSize: 12, borderRadius: 6, border: "1px solid var(--border-0)" }}
            />
            <Line type="monotone" dataKey="balance" stroke="var(--blue)" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        ) : (
          <BarChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
            <CartesianGrid stroke="var(--border-0)" vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 11, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} />
            <YAxis
              tickFormatter={(v) => formatCompactCurrency(v, "USD")}
              tick={{ fontSize: 11, fill: "var(--text-muted)" }}
              axisLine={false}
              tickLine={false}
              width={56}
            />
            <Tooltip
              formatter={(value) => formatFullCurrency(Number(value), "USD")}
              contentStyle={{ fontSize: 12, borderRadius: 6, border: "1px solid var(--border-0)" }}
            />
            <Bar dataKey="balance" fill="var(--blue)" radius={[4, 4, 0, 0]} />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
