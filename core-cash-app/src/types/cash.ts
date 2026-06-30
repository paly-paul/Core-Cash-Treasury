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
  cashRunwayDeltaDays: number;
  sevenDayForecastUsd: number;
  openExceptionsCount: number;
  currencyBreakdown: CurrencyBreakdown[];
  entityGroups: EntityGroup[];
  recommendation: Recommendation;
  exceptions: Exception[];
  riskScore: number;
  riskScoreDelta: string;
  activeBreaches: number;
  activeBreachesLabel: string;
  concentrationRiskLevel: "Low" | "Medium" | "High";
  concentrationRiskSub: string;
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
  openingCash: number;
  openingNote: string;
  inflows: number;
  inflowNote: string;
  inflowSub: string;
  outflows: number;
  outflowNote: string;
  outflowSub: string;
  closingBalance: number;
  closingConfidence: ConfidenceLevel;
  trend: "improving" | "watch" | "stable";
  trendLabel: string;
  lowPointWarning?: string;
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
  totalCashUsd: number;
  forecastConfidence: ConfidenceLevel;
  assumptionsCount: number;
  horizons: ForecastHorizonSummary[];
  series: Record<ForecastHorizon, ForecastPoint[]>;
  entityRows: Record<ForecastHorizon, ForecastEntityRow[]>;
  assumptions: Assumption[];
  varianceWindowLabel: string;
  totalVariance: number;
  inflowVariance: number;
  outflowVariance: number;
  explainedDriverCount: number;
  varianceDrivers: VarianceDriver[];
}

export interface NewAssumptionInput {
  entity: string;
  type: "inflow" | "outflow";
  amount: number;
  currency: Currency;
  description: string;
  date: string;
  category: string;
  confidence: ConfidenceLevel;
}

export type UploadZoneKind = "bank" | "ar" | "ap" | "manual";

export type UploadFileStatus = "valid" | "warning" | "error";

export interface UploadZoneState {
  kind: UploadZoneKind;
  title: string;
  icon: string;
  iconBg: string;
  helpText: string;
  templateLabel: string;
  status: UploadFileStatus;
  fileName: string;
  statusNote: string;
}

export interface RecentUpload {
  id: string;
  fileName: string;
  sourceFormat: string;
  sizeLabel: string;
  uploadedBy: string;
  timestamp: string;
  status: UploadFileStatus;
  detail: string;
}

export interface MappingPreviewRow {
  id: string;
  values: string[];
  unmapped: boolean;
}

export interface FieldMapping {
  id: string;
  sourceColumn: string;
  systemField: string;
  mandatory: boolean;
  mapped: boolean;
}

export interface ColumnMappingState {
  fileName: string;
  templateName: string;
  previewColumns: string[];
  previewRows: MappingPreviewRow[];
  fieldMappings: FieldMapping[];
}

export interface AccountMasterRow {
  id: string;
  accountNumber: string;
  accountName: string;
  bank: string;
  entity: string;
  currency: Currency;
  active: boolean;
  minThreshold: number | null;
  frequency: string;
  status: "active" | "restricted" | "stale" | "below-min";
  restricted: boolean;
  includeInCashPosition: boolean;
}

export interface NewAccountInput {
  accountNumber: string;
  accountName: string;
  bank: string;
  entity: string;
  currency: Currency;
  minThreshold: number | null;
  includeInCashPosition: boolean;
  restricted: boolean;
}

export interface UploadsData {
  asOf: string;
  totalCashUsd: number;
  lastUploadTime: string;
  pendingReviewCount: number;
  uploadStatsToday: number;
  uploadStatsWeek: number;
  uploadStatsErrors: number;
  uploadZones: UploadZoneState[];
  recentUploads: RecentUpload[];
  columnMapping: ColumnMappingState;
  accounts: AccountMasterRow[];
}

export interface InsightCard {
  id: string;
  label: string;
  value: string;
  badge: { tone: "green" | "amber" | "red" | "blue" | "muted"; label: string };
  delta: string;
  sub: string;
}

export interface CashTrendPoint {
  label: string;
  date: string;
  amountUsd: number;
}

export interface CfoActionItem {
  id: string;
  num: number;
  severity: "urgent" | "normal";
  title: string;
  what: string;
  why: string;
  when: string;
  approvalOwner: string;
  badgeLabel: string;
}

export interface CfoReportStat {
  label: string;
  value: string;
}

export interface CfoReportRow {
  label: string;
  value: string;
  flagged?: boolean;
}

export interface CfoSourceReference {
  label: string;
  detail: string;
}

export interface CfoReportSections {
  executiveSummary: string;
  cashPosition: CfoReportRow[];
  forecastOutlook: CfoReportRow[];
  actionsRequired: CfoActionItem[];
  varianceExplanation: { windowLabel: string; text: string };
  dataCaveats: string;
  sourceReferences: CfoSourceReference[];
}

export interface CfoSuggestedPrompt {
  label: string;
  message: string;
}

export interface CfoData {
  asOf: string;
  reportDate: string;
  forecastVersion: string;
  agentRunTime: string;
  confidence: ConfidenceLevel;
  totalCashUsd: number;
  liquidityStatus: RiskLevel;
  mgmtAttentionCount: number;
  insights: InsightCard[];
  cashTrend: CashTrendPoint[];
  coverStats: CfoReportStat[];
  sections: CfoReportSections;
  miniBarTrend: { label: string; heightPct: number; tag?: string; good?: boolean }[];
  suggestedPrompts: CfoSuggestedPrompt[];
}

export interface BriefingPrecedent {
  text: string;
}

export interface BriefingDayEntry {
  id: string;
  dateLabel: string;
  isToday?: boolean;
  text: string;
  precedent?: BriefingPrecedent;
}

export interface BriefingOutlook {
  label: string;
  text: string;
}

export interface BriefingData {
  asOf: string;
  totalCashUsd: number;
  liquidityStatus: RiskLevel;
  openItemsCount: number;
  windowLabel: string;
  generatedAt: string;
  windowRangeLabel: string;
  behindUs: {
    rangeLabel: string;
    days: BriefingDayEntry[];
  };
  aheadOfUs: {
    rangeLabel: string;
    days: BriefingDayEntry[];
    outlook: BriefingOutlook;
  };
}
