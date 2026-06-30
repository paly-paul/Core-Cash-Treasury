import type { Recommendation } from "@/types/cash";
import { ConfidencePill } from "./Badge";
import { Button } from "./Button";

// Structural requirement (handoff.md §6): every recommendation must surface
// Why / What / When / Control — never just free-text copy.
export function RecommendationCard({ recommendation }: { recommendation: Recommendation }) {
  return (
    <div className="rounded-md border border-border-0 border-l-4 border-l-blue bg-bg-surface p-4 shadow-[var(--shadow-card)]">
      <div className="mb-2.5 flex items-center justify-between">
        <div className="text-[10px] font-bold uppercase tracking-wider text-blue">
          ⟳ Action Recommendation · {recommendation.agentLabel}
        </div>
        <ConfidencePill level={recommendation.confidence} />
      </div>

      <div className="mb-2.5 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <Field label="What">{recommendation.body}</Field>
        <Field label="Why">{recommendation.why}</Field>
        <Field label="When">By {recommendation.cutoff} today</Field>
        <Field label="Control">
          Requires approval from <strong className="text-text-1">{recommendation.approvalOwner}</strong> · no
          autonomous execution
        </Field>
      </div>

      <div className="flex items-center justify-between border-t border-border-0 pt-2.5">
        <div className="font-data text-[10px] text-text-muted">
          {recommendation.agentLabel} · {recommendation.generatedAt} · Approval: {recommendation.approvalOwner} ·
          Cut-off: {recommendation.cutoff}
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" className="text-[11px]">
            ✓ Mark Reviewed
          </Button>
          <Button variant="primary" className="text-[11px]">
            View Full Analysis →
          </Button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-1.5 rounded-[5px] border border-border-0 bg-bg-elevated px-2.5 py-2 text-[11px] text-text-2">
      <span className="flex-shrink-0 pt-px text-[10px] font-bold uppercase tracking-wide text-text-muted">
        {label}
      </span>
      <span>{children}</span>
    </div>
  );
}
