import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-blue text-white font-semibold hover:bg-[#004BBD]",
  secondary: "bg-bg-surface text-text-2 border border-border-1 hover:text-text-1 hover:border-blue hover:bg-blue-light",
  ghost: "bg-transparent text-text-2 hover:text-text-1 hover:bg-bg-hover",
  danger: "bg-red-light text-red border border-red/20",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

// Usage: <Button variant="primary">Save</Button>
export function Button({ variant = "secondary", className = "", children, ...rest }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center gap-1.5 rounded-[5px] px-3.5 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${VARIANT_CLASSES[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
  "aria-label": string;
}

// Square 32x32 icon-only button (prototype's `.btn-icon`).
// Usage: <IconButton aria-label="Close" onClick={close}>✕</IconButton>
export function IconButton({ variant = "ghost", className = "", children, ...rest }: IconButtonProps) {
  return (
    <button
      className={`inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[5px] text-sm transition-colors ${VARIANT_CLASSES[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
