"use client";

import { useState, type ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { toggleAiPanel } from "@/store/uiSlice";
import { PulseDot } from "@/components/ui/PulseDot";

interface ChatMessage {
  id: string;
  role: "agent" | "user";
  text: string;
  time: string;
}

export function AiPanel({
  title,
  initialMessages,
  primaryView,
}: {
  title: string;
  initialMessages: ChatMessage[];
  primaryView?: { label: string; content: ReactNode };
}) {
  const dispatch = useAppDispatch();
  const collapsed = useAppSelector((s) => s.ui.aiPanelCollapsed);
  const [view, setView] = useState<"primary" | "chat">(primaryView ? "primary" : "chat");
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState("");

  function send() {
    if (!draft.trim()) return;
    setMessages((m) => [
      ...m,
      { id: crypto.randomUUID(), role: "user", text: draft, time: nowTime() },
    ]);
    setDraft("");
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          id: crypto.randomUUID(),
          role: "agent",
          text: "Agent reads validated data only. This is a UI scaffold — chat responses are not wired to a live agent yet.",
          time: nowTime(),
        },
      ]);
    }, 400);
  }

  return (
    <aside
      className={`flex flex-shrink-0 flex-col overflow-hidden border-l border-border-0 bg-bg-surface transition-[width] duration-200 ease-in-out ${
        collapsed ? "w-9" : "w-[356px]"
      }`}
    >
      <div
        className={`flex items-center gap-2 border-b border-border-0 bg-bg-elevated px-4 py-3 ${
          collapsed ? "flex-col justify-center gap-3 py-3" : ""
        }`}
      >
        {!collapsed && (
          <>
            <PulseDot />
            <span className="text-xs font-bold uppercase tracking-wide text-text-2">
              {view === "primary" && primaryView ? primaryView.label : title}
            </span>
            {primaryView && (
              <button
                className="ml-auto flex h-6 w-6 items-center justify-center rounded-[5px] text-xs text-text-2 hover:bg-bg-hover"
                title={view === "primary" ? "Open AI Chat" : "Back"}
                onClick={() => setView(view === "primary" ? "chat" : "primary")}
              >
                💬
              </button>
            )}
          </>
        )}
        <button
          className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-[5px] text-text-muted hover:text-blue ${
            collapsed ? "rotate-180" : ""
          }`}
          onClick={() => dispatch(toggleAiPanel())}
          title={collapsed ? "Expand panel" : "Collapse panel"}
        >
          ›
        </button>
      </div>

      {!collapsed && view === "primary" && primaryView && (
        <div className="flex-1 overflow-y-auto p-4">{primaryView.content}</div>
      )}

      {!collapsed && view === "chat" && (
        <>
          <div className="flex-1 overflow-y-auto bg-bg-base p-4 flex flex-col gap-3.5">
            {messages.map((m) => (
              <div key={m.id} className={`flex flex-col gap-1 ${m.role === "user" ? "items-end" : "items-start"}`}>
                <div
                  className={`max-w-[92%] rounded-[9px] px-3.5 py-2 text-[12.5px] leading-relaxed ${
                    m.role === "user"
                      ? "rounded-br-[2px] bg-blue text-white"
                      : "rounded-bl-[2px] border border-border-0 bg-bg-surface text-text-1 shadow-[var(--shadow-card)]"
                  }`}
                >
                  {m.text}
                </div>
                <span className="px-0.5 font-data text-[10px] text-text-muted">{m.time}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2 border-t border-border-0 bg-bg-surface p-3.5">
            <div className="flex items-end gap-1.5">
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                rows={1}
                placeholder="Ask about cash, exceptions…"
                className="min-h-9 max-h-20 flex-1 resize-none rounded-[9px] border border-border-1 bg-bg-elevated px-3 py-2 text-[12.5px] text-text-1 outline-none focus:border-blue focus:shadow-[0_0_0_3px_rgba(0,87,217,.1)]"
              />
              <button
                onClick={send}
                className="flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-[5px] bg-blue text-white hover:bg-[#004BBD]"
              >
                ↑
              </button>
            </div>
            <div className="text-center text-[10px] text-text-muted">
              Agent reads validated data only · Actions require approval
            </div>
          </div>
        </>
      )}
    </aside>
  );
}

function nowTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
