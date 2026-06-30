import type { CfoActionItem } from "@/types/cash";
import { Badge } from "@/components/ui/Badge";

// Mirrors RecommendationCard's Why/What/When/Control structure
// (handoff.md §6) — every action must surface those fields plus an
// explicit approval owner, never a plain list.
export function ActionsRequiredSection({ actions }: { actions: CfoActionItem[] }) {
  return (
    <div className="flex flex-col gap-2.5">
      {actions.map((action) => (
        <div
          key={action.id}
          className={`flex gap-3 rounded-md border p-3 ${
            action.severity === "urgent" ? "border-amber/30 bg-amber-light" : "border-border-0 bg-bg-elevated"
          }`}
        >
          <div
            className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full font-data text-[11px] font-bold ${
              action.severity === "urgent" ? "bg-amber text-white" : "bg-blue text-white"
            }`}
          >
            {action.num}
          </div>
          <div className="flex-1">
            <div className={`text-[12px] font-bold ${action.severity === "urgent" ? "text-amber" : "text-blue"}`}>
              {action.title}
            </div>
            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <Field label="What">{action.what}</Field>
              <Field label="Why">{action.why}</Field>
              <Field label="When">{action.when}</Field>
              <Field label="Control">
                Requires approval from <strong className="text-text-1">{action.approvalOwner}</strong> · no
                autonomous execution
              </Field>
            </div>
          </div>
          <div className="flex flex-shrink-0 flex-col items-end gap-1">
            <Badge tone={action.severity === "urgent" ? "amber" : "blue"}>{action.badgeLabel}</Badge>
            {action.severity === "urgent" && (
              <div className="text-right font-data text-[10px] text-text-muted">Cut-off: {action.when}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-1.5 rounded-[5px] border border-border-0 bg-bg-surface px-2.5 py-2 text-[11px] text-text-2">
      <span className="flex-shrink-0 pt-px text-[10px] font-bold uppercase tracking-wide text-text-muted">
        {label}
      </span>
      <span>{children}</span>
    </div>
  );
}
