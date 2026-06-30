"use client";

import { useState } from "react";
import { Badge, ConfidencePill } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionCard } from "@/components/ui/SectionCard";
import { useToast } from "@/components/ui/Toast";
import { useAppDispatch } from "@/hooks/redux";
import { addAssumption, deleteAssumption, updateAssumption } from "@/store/forecastSlice";
import { formatFullCurrency } from "@/utils/format";
import type { Assumption } from "@/types/cash";
import { AssumptionFormModal } from "./AssumptionFormModal";

export function AssumptionsList({ assumptions }: { assumptions: Assumption[] }) {
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const [modalState, setModalState] = useState<{ open: boolean; editing?: Assumption }>({ open: false });

  return (
    <SectionCard
      title="Manual Forecast Assumptions"
      action={
        <Button variant="primary" className="text-[11px]" onClick={() => setModalState({ open: true })}>
          ＋ Add
        </Button>
      }
    >
      <div className="flex flex-col gap-2.5">
        {assumptions.map((a) => (
          <div
            key={a.id}
            className="flex flex-wrap items-center gap-2.5 rounded-[6px] border border-border-0 bg-bg-elevated px-3 py-2.5"
          >
            <Badge tone="muted">{a.entity}</Badge>
            <Badge tone={a.type === "inflow" ? "green" : "red"}>{a.type === "inflow" ? "Inflow" : "Outflow"}</Badge>
            <span className={`font-data text-xs font-semibold ${a.type === "inflow" ? "text-green" : "text-red"}`}>
              {a.type === "inflow" ? "+" : "-"}
              {formatFullCurrency(a.amount, a.currency)}
            </span>
            <span className="flex-1 text-[12px] text-text-2">{a.description}</span>
            <Badge tone="muted">{a.category}</Badge>
            <ConfidencePill level={a.confidence} />
            <div className="flex items-center gap-1.5">
              <Button
                variant="ghost"
                className="text-[10px]"
                onClick={() => setModalState({ open: true, editing: a })}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                className="text-[10px]"
                onClick={() => {
                  dispatch(deleteAssumption(a.id));
                  showToast({ title: "Assumption removed", message: a.description, type: "warning" });
                }}
              >
                ✕
              </Button>
            </div>
          </div>
        ))}
        {assumptions.length === 0 && (
          <div className="py-4 text-center text-[12px] text-text-muted">No manual assumptions yet.</div>
        )}
      </div>

      <AssumptionFormModal
        key={modalState.editing?.id ?? "new"}
        open={modalState.open}
        assumption={modalState.editing}
        onClose={() => setModalState({ open: false })}
        onSubmit={(input) => {
          if (modalState.editing) {
            dispatch(updateAssumption({ ...input, id: modalState.editing.id }));
            showToast({ title: "Assumption updated", message: input.description, type: "success" });
          } else {
            dispatch(addAssumption(input));
            showToast({ title: "Assumption added", message: input.description, type: "success" });
          }
        }}
      />
    </SectionCard>
  );
}
