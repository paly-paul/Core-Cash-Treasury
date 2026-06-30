export interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: number;
}

export interface NavSection {
  label: string;
  items: NavItem[];
}

export const NAV_SECTIONS: NavSection[] = [
  {
    label: "Main",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: "◉" },
      { label: "Uploads", href: "/uploads", icon: "↑", badge: 1 },
      { label: "Account Master", href: "/uploads/accounts", icon: "≡" },
    ],
  },
  {
    label: "Analysis",
    items: [
      { label: "Forecast", href: "/forecast", icon: "⌁" },
      { label: "Liquidity Risk", href: "/dashboard#liquidity", icon: "⚡", badge: 2 },
    ],
  },
  {
    label: "Reports",
    items: [
      { label: "CFO Summary", href: "/cfo-summary", icon: "□" },
      { label: "Daily Briefing", href: "/daily-briefing", icon: "☀" },
      { label: "Trends & History", href: "/trends", icon: "⟴" },
    ],
  },
];
