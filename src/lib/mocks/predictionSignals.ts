import type { PredictionSignal } from "@/types/cash";

// Kept in a dedicated fixture, separate from forecastData.ts, so the
// architectural separation between pattern-based signals and the forecast
// engine's output is enforced at the data layer, not just in components.
export const mockPredictionSignals: PredictionSignal[] = [
  {
    id: "customer-a-late-again",
    text: "Customer A is likely to be late again on its July invoice, based on a recurring 4–6 day delay pattern observed in 3 of the last 4 months.",
    basis: "3 of 4 prior occurrences followed this pattern; no contract or relationship change on file that would explain a deviation.",
    confidence: "moderate",
  },
  {
    id: "eu-threshold-breach",
    text: "EU Entity may breach its EUR minimum threshold again within 4–6 weeks if the current weekly buffer-erosion trend continues at its present rate.",
    basis: "Linear extrapolation of 5-week buffer decline; assumes no manual intervention or change in EUR inflow timing.",
    confidence: "lower",
  },
  {
    id: "vendor-b-pattern",
    text: "Vendor B's early-settlement behavior appears to be becoming a consistent pattern rather than a one-off, which could be modelled into baseline assumptions going forward.",
    basis: "2 consecutive early settlements in the last 2 months, both 5+ days ahead of due date.",
    confidence: "moderate",
  },
];
