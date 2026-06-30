import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

// First page in the app to need a text input — minimal primitive, styled to
// match the existing card/form language (rounded surface fields, blue focus
// ring). Usage: <Input type="email" placeholder="you@company.com" />
export function Input({ error = false, className = "", ...rest }: InputProps) {
  return (
    <input
      className={`rounded-[6px] border bg-bg-elevated px-3 py-2 text-[12.5px] text-text-1 outline-none transition-colors placeholder:text-text-muted focus:shadow-[0_0_0_3px_var(--blue-border)] ${
        error ? "border-red focus:border-red" : "border-border-1 focus:border-blue"
      } ${className}`}
      {...rest}
    />
  );
}
