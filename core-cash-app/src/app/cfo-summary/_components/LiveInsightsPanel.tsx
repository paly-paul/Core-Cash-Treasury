"use client";

import { useEffect } from "react";
import { Badge } from "@/components/ui/Badge";
import { PulseDot } from "@/components/ui/PulseDot";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { refreshInsights } from "@/store/cfoSlice";
import { CfoTrendChart } from "./CfoTrendChart";

const REFRESH_INTERVAL_MS = 60_000;

export function LiveInsightsPanel() {
  const dispatch = useAppDispatch();
  const insights = useAppSelector((s) => s.cfo.data.insights);
  const cashTrend = useAppSelector((s) => s.cfo.data.cashTrend);
  const lastUpdatedAt = useAppSelector((s) => s.cfo.lastUpdatedAt);

  useEffect(() => {
    const id = setInterval(() => dispatch(refreshInsights()), REFRESH_INTERVAL_MS);
    return () => clearInterval(id);
  }, [dispatch]);

  return (
    <div className="print:hidden rounded-md border border-border-0 bg-bg-surface shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between border-b border-border-0 bg-bg-elevated px-4 py-3">
        <div className="flex items-center gap-2">
          <PulseDot />
          <span className="text-[13px] font-bold text-text-1">Live AI Insights</span>
          <span className="font-data text-[10px] text-text-muted">· Auto-refreshing every 60s</span>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-bg-surface px-2 py-1 text-[10px] font-bold text-text-2">
          <PulseDot size="sm" />
          LIVE · <span className="font-data">{lastUpdatedAt}</span>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {insights.map((insight) => (
            <div key={insight.id} className="rounded-md border border-border-0 bg-bg-elevated p-3">
              <div className="flex items-center justify-between">
                <div className="text-[10px] font-bold uppercase tracking-wide text-text-muted">{insight.label}</div>
                <Badge tone={insight.badge.tone}>{insight.badge.label}</Badge>
              </div>
              <div className="mt-1 font-data text-xl font-bold text-text-1">{insight.value}</div>
              <div className="mt-1 text-[11px] font-semibold text-green">{insight.delta}</div>
              <div className="mt-0.5 text-[10.5px] text-text-muted">{insight.sub}</div>
            </div>
          ))}
        </div>

        <div className="rounded-md border border-border-0 bg-bg-elevated p-3.5">
          <div className="mb-2 text-[10px] font-bold uppercase tracking-wide text-text-muted">
            7-Day Cash Trend (USD eq.)
          </div>
          <CfoTrendChart series={cashTrend} />
        </div>
      </div>
    </div>
  );
}
