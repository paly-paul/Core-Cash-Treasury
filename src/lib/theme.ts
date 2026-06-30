// Core Cash design system tokens — single source of truth, shared between
// Tailwind (via globals.css @theme) and styled-components (ThemeProvider).
// Keep in sync with handoff.md §6 Design System Quick Reference.

export const colors = {
  bgBase: "#F4F6FA",
  bgSurface: "#FFFFFF",
  bgElevated: "#F8F9FC",
  bgHover: "#EEF1F7",

  blue: "#0057D9",
  blueLight: "#EBF2FF",
  blueBorder: "rgba(0,87,217,.2)",

  green: "#059669",
  greenLight: "#ECFDF5",
  greenBorder: "rgba(5,150,105,.2)",

  amber: "#D97706",
  amberLight: "#FFFBEB",
  amberBorder: "rgba(217,119,6,.22)",

  red: "#DC2626",
  redLight: "#FEF2F2",
  redBorder: "rgba(220,38,38,.2)",

  info: "#0369A1",
  infoLight: "#F0F9FF",
  infoBorder: "rgba(3,105,161,.2)",

  text1: "#0F1728",
  text2: "#4B5675",
  textMuted: "#9AA3B5",

  border0: "#E8ECF4",
  border1: "#D1D9EC",
} as const;

export const fonts = {
  ui: "'Inter', sans-serif",
  data: "'JetBrains Mono', monospace",
} as const;

export const radii = {
  sm: "5px",
  md: "9px",
  lg: "14px",
} as const;

export const shadows = {
  card: "0 1px 3px rgba(15,23,40,.07), 0 0 0 1px " + colors.border0,
  elevated: "0 4px 16px rgba(15,23,40,.1), 0 0 0 1px " + colors.border0,
} as const;

export const layout = {
  sidebarExpanded: "220px",
  sidebarCollapsed: "52px",
  aiPanelExpanded: "356px",
  aiPanelCollapsed: "36px",
  topbarHeight: "54px",
} as const;

export const theme = {
  colors,
  fonts,
  radii,
  shadows,
  layout,
} as const;

export type Theme = typeof theme;
