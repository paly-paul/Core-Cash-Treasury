// Domain types for the normalized cash model.
// Mirrors the shapes the FastAPI backend is expected to serve
// (see handoff.md §4.4 — finalize against real Postgres schema later).

export type Currency = "USD" | "GBP" | "EUR";

export type ConfidenceLevel = "high" | "medium" | "low";

export type RiskLevel = "normal" | "watch" | "critical";

export interface Account {
  id: string;
  name: string;
  maskedNumber: string;
  bank: string;
  entity: string;
  currency: Currency;
  balance: number;
  usableBalance: number;
  minThreshold: number | null;
  confidence: ConfidenceLevel;
  restricted: boolean;
  flag?: string;
  sourceLabel: string;
}

export interface EntityGroup {
  entity: string;
  currency: Currency;
  totalBalance: number;
  accounts: Account[];
}

export interface CurrencyBreakdown {
  currency: Currency;
  amount: number;
  pctOfTotal: number;
  belowThreshold: boolean;
}

export interface Exception {
  id: string;
  severity: "warning" | "error";
  title: string;
  description: string;
}

export interface Recommendation {
  id: string;
  agentLabel: string;
  confidence: ConfidenceLevel;
  body: string;
  why: string;
  approvalOwner: string;
  cutoff: string;
  generatedAt: string;
}

export interface RiskItem {
  id: string;
  severity: "critical" | "watch";
  title: string;
  description: string;
  owner?: string;
}

export interface ThresholdMonitorRow {
  accountName: string;
  pctOfThreshold: number;
  displayBalance: string;
  status: "ok" | "low";
}

export interface DashboardData {
  asOf: string;
  totalCashUsd: number;
  totalCashDeltaPct: number;
  usableCashUsd: number;
  restrictedCashUsd: number;
  dataConfidence: ConfidenceLevel;
  liquidityStatus: RiskLevel;
  liquidityHeadline: string;
  cashRunwayDays: number;
  sevenDayForecastUsd: number;
  openExceptionsCount: number;
  currencyBreakdown: CurrencyBreakdown[];
  entityGroups: EntityGroup[];
  recommendation: Recommendation;
  exceptions: Exception[];
  riskScore: number;
  riskItems: RiskItem[];
  thresholdMonitoring: ThresholdMonitorRow[];
}

export type ForecastHorizon = 7 | 30 | 60;

export interface ForecastPoint {
  label: string;
  date: string;
  balance: number;
}

export interface ForecastHorizonSummary {
  horizon: ForecastHorizon;
  closingBalance: number;
  trend: "improving" | "watch" | "stable";
  trendLabel: string;
}

export interface ForecastEntityRow {
  entity: string;
  currency: Currency;
  opening: number;
  inflows: number;
  outflows: number;
  closing: number;
  confidence: ConfidenceLevel;
  note?: string;
  warning?: boolean;
}

export interface Assumption {
  id: string;
  entity: string;
  type: "inflow" | "outflow";
  amount: number;
  currency: Currency;
  description: string;
  date: string;
  category: string;
  confidence: ConfidenceLevel;
}

export interface VarianceDriver {
  id: string;
  label: string;
  amount: number;
  pctOfMax: number;
  confidence: ConfidenceLevel;
  note: string;
  favorable: boolean;
}

export interface ForecastData {
  version: string;
  asOf: string;
  openingCash: number;
  expectedInflows: number;
  expectedOutflows: number;
  lowPointWarning: string | null;
  horizons: ForecastHorizonSummary[];
  series: Record<ForecastHorizon, ForecastPoint[]>;
  entityRows: ForecastEntityRow[];
  assumptions: Assumption[];
  varianceWindowLabel: string;
  totalVariance: number;
  inflowVariance: number;
  outflowVariance: number;
  explainedDriverCount: number;
  varianceDrivers: VarianceDriver[];
}
