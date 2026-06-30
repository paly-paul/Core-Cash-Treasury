"use client";

import type { ReactNode } from "react";
import { Button } from "./Button";

/**
 * Dialog shell matching the prototype's `.moverlay`/`.modal`/`.mhdr`/`.mftr`
 * pattern (risk analysis, add assumption, add account dialogs). Closes on
 * overlay click or the header close button; caller owns open/close state.
 *
 * Usage:
 *   <Modal open={open} onClose={() => setOpen(false)} title="Risk Analysis"
 *     footer={<>
 *       <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
 *       <Button variant="primary" onClick={save}>Save</Button>
 *     </>}>
 *     ...body...
 *   </Modal>
 */
interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function Modal({ open, onClose, title, children, footer }: ModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-md border border-border-0 bg-bg-surface shadow-[var(--shadow-elevated)]">
        <div className="flex items-center justify-between border-b border-border-0 px-4 py-3">
          <div className="text-sm font-bold text-text-1">{title}</div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-6 w-6 items-center justify-center rounded-[5px] text-text-muted hover:bg-bg-hover hover:text-text-1"
          >
            ✕
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-3.5 text-[13px] text-text-2">{children}</div>
        {footer && (
          <div className="flex items-center justify-end gap-2 border-t border-border-0 bg-bg-elevated px-4 py-2.5">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

export { Button };
