"use client";

import { Fragment, useState } from "react";
import { Badge, ConfidencePill } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatFullCurrency } from "@/utils/format";
import type { EntityGroup } from "@/types/cash";

export function AccountTable({ entityGroups }: { entityGroups: EntityGroup[] }) {
  const [collapsedEntities, setCollapsedEntities] = useState<Set<string>>(new Set());

  function toggle(entity: string) {
    setCollapsedEntities((prev) => {
      const next = new Set(prev);
      if (next.has(entity)) next.delete(entity);
      else next.add(entity);
      return next;
    });
  }

  return (
    <div className="overflow-hidden rounded-md border border-border-0 bg-bg-surface shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between border-b border-border-0 bg-bg-elevated px-4 py-2.5">
        <div className="text-xs font-bold text-text-1">Account Breakdown — All Entities</div>
        <Button variant="secondary" className="text-[11px]">
          ↓ CSV
        </Button>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-bg-elevated">
            {["Entity · Account", "Bank", "CCY", "Balance", "Usable", "Min Threshold", "Confidence", "Flags", "Source"].map(
              (h, i) => (
                <th
                  key={h}
                  className={`whitespace-nowrap border-b border-border-0 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-text-muted ${
                    i >= 3 && i <= 5 ? "text-right" : "text-left"
                  }`}
                >
                  {h}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {entityGroups.map((group) => {
            const isCollapsed = collapsedEntities.has(group.entity);
            const hasFlag = group.accounts.some((a) => a.flag === "Below min");
            return (
              <Fragment key={group.entity}>
                <tr className="bg-bg-elevated">
                  <td colSpan={9} className="px-3.5 py-1.5">
                    <button
                      onClick={() => toggle(group.entity)}
                      className="text-[11px] font-bold uppercase tracking-wider text-text-1"
                    >
                      {isCollapsed ? "▸" : "▾"} {group.entity}
                    </button>
                    <Badge tone="blue">
                      {group.accounts.length} account{group.accounts.length === 1 ? "" : "s"}
                    </Badge>{" "}
                    <span className="ml-3 font-data text-[11px] text-text-2">
                      {formatFullCurrency(group.totalBalance, group.currency)}
                    </span>
                    {hasFlag && <span className="ml-2 text-[11px] font-bold text-amber">⚠ Below threshold</span>}
                  </td>
                </tr>
                {!isCollapsed &&
                  group.accounts.map((account) => (
                    <tr key={account.id} className={`border-b border-border-0 hover:bg-bg-hover ${account.flag === "Below min" ? "bg-amber-light hover:bg-[#fef3c7]" : ""}`}>
                      <td className="px-3.5 py-2.5">
                        <div className="font-semibold text-text-1">{account.name}</div>
                        <div className="font-data text-[11px] text-text-muted">{account.maskedNumber}</div>
                      </td>
                      <td className="px-3.5 py-2.5 text-[12.5px] text-text-2">{account.bank}</td>
                      <td className="px-3.5 py-2.5">
                        <Badge tone="muted">{account.currency}</Badge>
                      </td>
                      <td className="px-3.5 py-2.5 text-right font-data text-xs font-semibold text-text-1">
                        {formatFullCurrency(account.balance, account.currency)}
                      </td>
                      <td className="px-3.5 py-2.5 text-right font-data text-xs text-text-2">
                        {account.restricted ? <span className="text-text-muted">—</span> : formatFullCurrency(account.usableBalance, account.currency)}
                      </td>
                      <td className="px-3.5 py-2.5 text-right font-data text-xs text-text-2">
                        {account.minThreshold ? formatFullCurrency(account.minThreshold, account.currency) : "—"}
                      </td>
                      <td className="px-3.5 py-2.5">
                        <ConfidencePill level={account.confidence} />
                      </td>
                      <td className="px-3.5 py-2.5 text-[11px]">
                        {account.flag === "Restricted" && <span className="font-semibold text-blue">🔒 Restricted</span>}
                        {account.flag === "Stale 2d" && <span className="font-semibold text-amber">⚠ Stale 2d</span>}
                        {account.flag === "Below min" && <span className="font-semibold text-red">✕ Below min</span>}
                        {account.flag === "Zero balance" && <span className="text-blue">ℹ Zero balance</span>}
                        {!account.flag && "—"}
                      </td>
                      <td className="px-3.5 py-2.5 text-[11px] text-text-muted">{account.sourceLabel}</td>
                    </tr>
                  ))}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
