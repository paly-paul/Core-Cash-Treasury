import type { Exception } from "@/types/cash";

export function ExceptionsPanel({ exceptions }: { exceptions: Exception[] }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
        Open Exceptions ({exceptions.length})
      </div>
      {exceptions.map((exc) => (
        <div
          key={exc.id}
          className={`rounded-[6px] border-l-4 bg-bg-elevated p-3 ${
            exc.severity === "error" ? "border-l-red" : "border-l-amber"
          }`}
        >
          <div className={`mb-1 text-[12px] font-bold ${exc.severity === "error" ? "text-red" : "text-amber"}`}>
            {exc.severity === "error" ? "✕" : "⚠"} {exc.title}
          </div>
          <div className="text-[11.5px] leading-relaxed text-text-2">{exc.description}</div>
        </div>
      ))}
      <div className="mt-2 border-t border-border-0 pt-3 text-[10px] text-text-muted">
        Agent reads validated data only · Source confidence reflects most recent statement ingestion
      </div>
    </div>
  );
}
