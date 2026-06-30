"use client";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionCard } from "@/components/ui/SectionCard";
import { useToast } from "@/components/ui/Toast";
import { useAppDispatch } from "@/hooks/redux";
import { setActiveTab } from "@/store/uploadsSlice";
import type { ColumnMappingState } from "@/types/cash";

const SYSTEM_FIELD_OPTIONS = [
  "Counterparty ID *",
  "Counterparty Name *",
  "Reference *",
  "Expected Date *",
  "Amount *",
  "Currency *",
  "Legal Entity *",
  "Invoice Status (optional)",
  "Do not map",
];

export function ColumnMappingTab({ mapping }: { mapping: ColumnMappingState }) {
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const mandatoryTotal = mapping.fieldMappings.filter((m) => m.mandatory).length;
  const mandatoryMapped = mapping.fieldMappings.filter((m) => m.mandatory && m.mapped).length;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-[15px] font-bold text-text-1">Column Mapping — AR Data</div>
          <div className="text-[11px] text-text-muted">
            MAP SOURCE COLUMNS TO SYSTEM FIELDS · TEMPLATE: {mapping.templateName}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" className="text-[11px]">Load Template</Button>
          <Button
            variant="primary"
            className="text-[11px]"
            onClick={() =>
              showToast({
                title: "Mapping saved",
                message: `Column mapping saved as ${mapping.templateName}.`,
                type: "success",
              })
            }
          >
            Save Template
          </Button>
        </div>
      </div>

      <SectionCard title={`File Preview — ${mapping.fileName}`}>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-bg-elevated">
                {mapping.previewColumns.map((c) => (
                  <th key={c} className="whitespace-nowrap border-b border-border-0 px-3 py-1.5 text-left text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mapping.previewRows.map((row) => (
                <tr key={row.id} className={`border-b border-border-0 ${row.unmapped ? "bg-amber-light" : ""}`}>
                  {row.values.map((v, i) => (
                    <td
                      key={i}
                      className={`px-3 py-2 text-[11.5px] ${
                        row.unmapped && i === row.values.length - 1
                          ? "font-semibold text-amber"
                          : "font-data text-text-2"
                      }`}
                    >
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <SectionCard
        title="Field Mapping"
        action={
          <Badge tone={mandatoryMapped === mandatoryTotal ? "green" : "amber"}>
            {mandatoryMapped} of {mandatoryTotal} mandatory mapped
          </Badge>
        }
      >
        <div className="grid grid-cols-[1fr_24px_1fr] gap-2 border-b-2 border-border-0 pb-1.5 mb-2 text-[10px] font-bold uppercase tracking-wider text-text-muted">
          <div>Source Column</div>
          <div />
          <div>System Field</div>
        </div>
        <div className="flex flex-col gap-2">
          {mapping.fieldMappings.map((m) => (
            <div key={m.id} className="grid grid-cols-[1fr_24px_1fr] items-center gap-2">
              <div className="text-[12px] text-text-2">{m.sourceColumn}</div>
              <div className="text-center text-text-muted">→</div>
              <select
                defaultValue={m.systemField}
                className={`w-full rounded-[5px] border px-2.5 py-1 text-[11px] outline-none ${
                  m.mapped ? "border-green/20 bg-green-light text-green" : "border-border-1 bg-bg-surface text-text-2"
                }`}
              >
                {SYSTEM_FIELD_OPTIONS.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <div className="mt-3.5 flex justify-end gap-2 border-t border-border-0 pt-3">
          <Button variant="secondary" className="text-[11px]" onClick={() => dispatch(setActiveTab("files"))}>
            ← Back
          </Button>
          <Button
            variant="primary"
            className="text-[11px]"
            onClick={() =>
              showToast({ title: "Processing", message: "AR data parsing and validating.", type: "success" })
            }
          >
            Proceed to Process →
          </Button>
        </div>
      </SectionCard>
    </div>
  );
}
