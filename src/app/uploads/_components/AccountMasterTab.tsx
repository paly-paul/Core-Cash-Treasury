"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { useAppDispatch } from "@/hooks/redux";
import { addAccount, toggleAccountActive } from "@/store/uploadsSlice";
import { formatFullCurrency } from "@/utils/format";
import type { AccountMasterRow } from "@/types/cash";
import { AccountFormModal } from "./AccountFormModal";

const STATUS_BADGE: Record<AccountMasterRow["status"], { tone: "green" | "amber" | "red" | "blue"; label: string }> = {
  active: { tone: "green", label: "Active" },
  restricted: { tone: "blue", label: "Restricted" },
  stale: { tone: "amber", label: "⚠ Stale" },
  "below-min": { tone: "red", label: "Below Min" },
};

export function AccountMasterTab({ accounts }: { accounts: AccountMasterRow[] }) {
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  const entityCount = new Set(accounts.map((a) => a.entity)).size;
  const bankCount = new Set(accounts.map((a) => a.bank)).size;
  const currencyCount = new Set(accounts.map((a) => a.currency)).size;
  const filtered = accounts.filter((a) =>
    `${a.accountName} ${a.accountNumber} ${a.bank} ${a.entity}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-[15px] font-bold text-text-1">Account Master</div>
          <div className="text-[11px] text-text-muted">
            {accounts.length} ACCOUNTS · {entityCount} ENTITIES · {bankCount} BANKS · {currencyCount} CURRENCIES
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            className="w-[180px] rounded-[5px] border border-border-1 bg-bg-surface px-2.5 py-1.5 text-[11px] text-text-1 outline-none focus:border-blue"
            placeholder="Search accounts…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button variant="secondary" className="text-[11px]">↑ Bulk Import</Button>
          <Button variant="primary" className="text-[11px]" onClick={() => setModalOpen(true)}>
            ＋ Add Account
          </Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-md border border-border-0 bg-bg-surface shadow-[var(--shadow-card)]">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-bg-elevated">
              {["Account", "Bank", "Entity", "CCY", "Active", "Min Threshold", "Frequency", "Status", "Actions"].map(
                (h, i) => (
                  <th
                    key={h}
                    className={`whitespace-nowrap border-b border-border-0 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-text-muted ${
                      i === 5 ? "text-right" : "text-left"
                    }`}
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => (
              <tr key={a.id} className={`border-b border-border-0 hover:bg-bg-hover ${a.status === "below-min" ? "bg-red-light" : ""}`}>
                <td className="px-3.5 py-2.5">
                  <div className="font-data text-xs font-semibold text-text-1">{a.accountNumber}</div>
                  <div className="text-[10.5px] text-text-muted">{a.accountName}</div>
                </td>
                <td className="px-3.5 py-2.5 text-[12px] text-text-2">{a.bank}</td>
                <td className="px-3.5 py-2.5 text-[12px] text-text-2">{a.entity}</td>
                <td className="px-3.5 py-2.5">
                  <Badge tone="muted">{a.currency}</Badge>
                </td>
                <td className="px-3.5 py-2.5">
                  <button
                    onClick={() => dispatch(toggleAccountActive(a.id))}
                    className={`relative h-[18px] w-8 rounded-full transition-colors ${a.active ? "bg-blue" : "bg-border-1"}`}
                    aria-label={`Toggle ${a.accountName} active`}
                  >
                    <span
                      className={`absolute top-[2px] h-[14px] w-[14px] rounded-full bg-white transition-transform ${
                        a.active ? "translate-x-[16px]" : "translate-x-[2px]"
                      }`}
                    />
                  </button>
                </td>
                <td className="px-3.5 py-2.5 text-right font-data text-xs text-text-2">
                  {a.minThreshold != null ? formatFullCurrency(a.minThreshold, a.currency) : "—"}
                </td>
                <td className="px-3.5 py-2.5 text-[12px] text-text-2">{a.frequency}</td>
                <td className="px-3.5 py-2.5">
                  <Badge tone={STATUS_BADGE[a.status].tone}>{STATUS_BADGE[a.status].label}</Badge>
                </td>
                <td className="px-3.5 py-2.5">
                  <Button
                    variant="secondary"
                    className="text-[10px]"
                    onClick={() => showToast({ title: "Edit account", message: a.accountName, type: "warning" })}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={9} className="px-3.5 py-6 text-center text-[12px] text-text-muted">
                  No accounts match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AccountFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={(input) => {
          dispatch(addAccount(input));
          showToast({ title: "Account added", message: "New account saved to Account Master.", type: "success" });
        }}
      />
    </div>
  );
}
