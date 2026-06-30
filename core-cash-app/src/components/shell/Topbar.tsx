import Link from "next/link";

export interface TopbarStat {
  label: string;
  value: string;
  tone?: "default" | "positive" | "warning";
}

const TONE_CLASSES: Record<NonNullable<TopbarStat["tone"]>, string> = {
  default: "text-text-1",
  positive: "text-green",
  warning: "text-amber",
};

export function Topbar({ stats, asOf }: { stats: TopbarStat[]; asOf: string }) {
  return (
    <header className="print:hidden z-50 col-span-full flex h-[54px] items-center border-b border-border-0 bg-bg-surface px-5">
      <Link href="/dashboard" className="flex items-center gap-2.5 whitespace-nowrap pr-5 text-[13px] font-bold text-text-1">
        <span className="flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center rounded-[7px] bg-blue font-data text-[11px] font-bold text-white">
          CC
        </span>
        Core Cash Agent
      </Link>
      <div className="flex flex-1 items-center border-l border-border-0">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col border-r border-border-0 px-[18px]">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">{stat.label}</span>
            <span className={`mt-0.5 font-data text-[13px] font-semibold ${TONE_CLASSES[stat.tone ?? "default"]}`}>
              {stat.value}
            </span>
          </div>
        ))}
      </div>
      <div className="ml-auto flex items-center gap-2.5">
        <span className="font-data text-[11px] text-text-muted">AS OF {asOf}</span>
        <button className="flex h-8 w-8 items-center justify-center rounded-[5px] border border-border-1 bg-bg-surface text-text-2 hover:border-blue hover:bg-blue-light hover:text-blue">
          ⟳
        </button>
        <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full border-[1.5px] border-blue/20 bg-blue-light text-[11px] font-bold text-blue">
          JD
        </div>
      </div>
    </header>
  );
}
