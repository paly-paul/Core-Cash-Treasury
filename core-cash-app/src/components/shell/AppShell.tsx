import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar, type TopbarStat } from "./Topbar";
import { AiPanel } from "./AiPanel";

interface ChatMessage {
  id: string;
  role: "agent" | "user";
  text: string;
  time: string;
}

export function AppShell({
  stats,
  asOf,
  aiPanelTitle,
  aiPanelMessages,
  aiPanelPrimaryView,
  children,
}: {
  stats: TopbarStat[];
  asOf: string;
  aiPanelTitle: string;
  aiPanelMessages: ChatMessage[];
  aiPanelPrimaryView?: { label: string; content: ReactNode };
  children: ReactNode;
}) {
  return (
    <div className="grid h-screen grid-rows-[54px_1fr] grid-cols-1">
      <Topbar stats={stats} asOf={asOf} />
      <div className="flex min-h-0">
        <Sidebar />
        <main className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto bg-bg-base p-5">{children}</main>
        <AiPanel title={aiPanelTitle} initialMessages={aiPanelMessages} primaryView={aiPanelPrimaryView} />
      </div>
    </div>
  );
}
