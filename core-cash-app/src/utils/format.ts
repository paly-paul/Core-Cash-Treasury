const CURRENCY_SYMBOL: Record<string, string> = {
  USD: "$",
  GBP: "£",
  EUR: "€",
};

export function formatCompactCurrency(amount: number, currency: string = "USD"): string {
  const symbol = CURRENCY_SYMBOL[currency] ?? "";
  const abs = Math.abs(amount);
  const sign = amount < 0 ? "-" : "";
  if (abs >= 1_000_000) return `${sign}${symbol}${(abs / 1_000_000).toFixed(2)}M`;
  if (abs >= 1_000) return `${sign}${symbol}${(abs / 1_000).toFixed(0)}K`;
  return `${sign}${symbol}${abs.toLocaleString()}`;
}

export function formatFullCurrency(amount: number, currency: string = "USD"): string {
  const symbol = CURRENCY_SYMBOL[currency] ?? "";
  return `${amount < 0 ? "-" : ""}${symbol}${Math.abs(amount).toLocaleString()}`;
}

export function formatSignedCompactCurrency(amount: number, currency: string = "USD"): string {
  const sign = amount > 0 ? "+" : amount < 0 ? "–" : "";
  return `${sign}${formatCompactCurrency(Math.abs(amount), currency)}`;
}
