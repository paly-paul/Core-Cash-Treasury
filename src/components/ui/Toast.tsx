"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import styled, { keyframes } from "styled-components";
import { theme } from "@/lib/theme";

/**
 * Toast notification system matching the prototype's `.toast-area`/`.toast`
 * pattern (severity-colored left border, slide-in from the right). Wrap the
 * app in <ToastProvider> once, then call `useToast()` anywhere:
 *
 *   const { showToast } = useToast();
 *   showToast({ title: "Saved", message: "Assumption added.", type: "success" });
 */
export type ToastType = "success" | "warning" | "error";

interface ToastItem {
  id: string;
  title: string;
  message?: string;
  type: ToastType;
}

interface ToastContextValue {
  showToast: (toast: Omit<ToastItem, "id">) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(16px); }
  to { opacity: 1; transform: translateX(0); }
`;

const BORDER_COLOR: Record<ToastType, string> = {
  success: theme.colors.green,
  warning: theme.colors.amber,
  error: theme.colors.red,
};

const ToastCard = styled.div<{ $type: ToastType }>`
  animation: ${slideIn} 0.18s ease-out;
  border-left: 3px solid ${(p) => BORDER_COLOR[p.$type]};
`;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((toast: Omit<ToastItem, "id">) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[200] flex w-80 flex-col gap-2">
        {toasts.map((t) => (
          <ToastCard
            key={t.id}
            $type={t.type}
            className="rounded-[5px] border border-border-0 bg-bg-surface px-3.5 py-3 shadow-[var(--shadow-elevated)]"
          >
            <div className="text-[12.5px] font-bold text-text-1">{t.title}</div>
            {t.message && <div className="mt-0.5 text-[11.5px] text-text-2">{t.message}</div>}
          </ToastCard>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
