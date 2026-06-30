import type { BriefingData } from "@/types/cash";

export const mockBriefingData: BriefingData = {
  asOf: "26 JUN 2026 · 09:14",
  totalCashUsd: 12_840_000,
  liquidityStatus: "normal",
  openItemsCount: 2,
  windowLabel: "±4 days",
  generatedAt: "09:14 UTC",
  windowRangeLabel: "22–30 JUNE 2026",
  behindUs: {
    rangeLabel: "22–25 JUN",
    days: [
      {
        id: "mon-22",
        dateLabel: "Mon 22 Jun",
        text: "Cash position opened the week at $12.1M, broadly in line with plan. UK Operations received the expected £420K rent inflow on schedule — no surprises.",
      },
      {
        id: "tue-23",
        dateLabel: "Tue 23 Jun",
        text: "Customer A's $340K receivable, expected this day, did not arrive. This is the same customer that ran 4–6 days late in two of the last three months — a pattern worth raising with sales/AR if it continues.",
      },
      {
        id: "wed-24",
        dateLabel: "Wed 24 Jun",
        text: "Barclays GBP Ops statement feed went stale and has not refreshed since. UK Operations confidence is now Medium rather than High — not urgent, but worth a call to the bank if it's not resolved by tomorrow.",
      },
      {
        id: "thu-25",
        dateLabel: "Thu 25 Jun",
        text: "Vendor B settled an AP invoice 6 days early, releasing +$140K back into US HQ cash sooner than modelled — a small favourable offset to the Customer A delay.",
      },
      {
        id: "fri-26",
        dateLabel: "Fri 26 Jun",
        isToday: true,
        text: "Today: Total cash is $12.84M, Normal status. The one open item is the EU Entity EUR reserve, which sits €70K below its minimum threshold.",
        precedent: {
          text: "Last time this happened (14 Mar 2026), treasury resolved it via an FX transfer from the GBP pool, completed same-day before the 15:00 CET cut-off.",
        },
      },
    ],
  },
  aheadOfUs: {
    rangeLabel: "26–30 JUN",
    days: [
      {
        id: "today",
        dateLabel: "Today",
        isToday: true,
        text: "Action needed by 15:00 CET: Fund the EU Entity EUR reserve (~€200K) before Friday's €120K AP run pushes the account further below minimum. Owner: Finance Director. No board visibility needed — this is a routine treasury action, not a liquidity event.",
      },
      {
        id: "sat-sun",
        dateLabel: "Sat–Sun",
        text: "No scheduled flows. Weekend balance should hold steady around $12.8M pending Monday's payroll run.",
      },
      {
        id: "mon-29",
        dateLabel: "Mon 29 Jun",
        text: "Barclays statement should auto-resolve over the weekend; if it's still stale Monday morning, that's the trigger to escalate to the bank directly rather than wait further.",
      },
      {
        id: "tue-30",
        dateLabel: "Tue 30 Jun",
        text: "Q2 tax reserve outflow of $280K is scheduled — already modelled into the forecast, no action required, flagging for awareness only since it's the largest single outflow this week.",
      },
    ],
    outlook: {
      label: "If nothing changes",
      text: "Assuming the EUR funding completes today and Customer A's payment arrives within its typical delay window, cash position should remain in Normal range through the end of next week, with the only watch item being whether Barclays connectivity self-resolves over the weekend.",
    },
  },
};
