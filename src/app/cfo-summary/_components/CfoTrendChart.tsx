"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { CashTrendPoint } from "@/types/cash";
import { formatCompactCurrency, formatFullCurrency } from "@/utils/format";

export function CfoTrendChart({ series }: { series: CashTrendPoint[] }) {
  return (
    <div className="h-[150px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={series} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
          <CartesianGrid stroke="var(--border-0)" vertical={false} />
          <XAxis dataKey="label" tick={{ fontSize: 10, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} />
          <YAxis
            tickFormatter={(v) => formatCompactCurrency(v, "USD")}
            tick={{ fontSize: 10, fill: "var(--text-muted)" }}
            axisLine={false}
            tickLine={false}
            width={50}
          />
          <Tooltip
            formatter={(value) => formatFullCurrency(Number(value), "USD")}
            contentStyle={{ fontSize: 12, borderRadius: 6, border: "1px solid var(--border-0)" }}
          />
          <Area type="monotone" dataKey="amountUsd" stroke="var(--blue)" fill="var(--blue)" fillOpacity={0.12} strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
