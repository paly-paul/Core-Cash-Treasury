import Link from "next/link";

/**
 * Collapsible sidebar nav item: icon + label + optional count badge, with a
 * hover tooltip shown only when the sidebar is collapsed.
 *
 * Bug-fix note (handoff.md §6): `label` and `badge` MUST render in their own
 * <span> elements, never as bare text siblings — the collapsed-sidebar CSS
 * hides them via `.sidebar.collapsed .nav-item .nav-label,.nav-badge{display:none}`,
 * which only works when each is its own element.
 *
 * Usage:
 *   <SidebarNavItem href="/dashboard" icon="◉" label="Dashboard" active collapsed={false} />
 *   <SidebarNavItem href="/uploads" icon="↑" label="Uploads" badge={1} collapsed />
 */
interface SidebarNavItemProps {
  href: string;
  icon: string;
  label: string;
  badge?: number;
  active?: boolean;
  collapsed?: boolean;
}

export function SidebarNavItem({ href, icon, label, badge, active, collapsed }: SidebarNavItemProps) {
  return (
    <Link
      href={href}
      className={`group relative mx-1.5 flex items-center gap-2 rounded-r-[5px] border-l-[3px] px-3 py-1.5 text-[13px] transition-colors ${
        collapsed ? "justify-center px-0 py-2" : "pl-3"
      } ${
        active
          ? "border-l-blue bg-blue-light font-semibold text-blue"
          : "border-l-transparent text-text-2 hover:bg-bg-hover hover:text-text-1"
      }`}
    >
      <span className="w-[18px] flex-shrink-0 text-center text-sm opacity-80">{icon}</span>
      {!collapsed && <span className="nav-label flex-1">{label}</span>}
      {!collapsed && badge !== undefined && (
        <span className="nav-badge rounded-full bg-red px-1.5 font-data text-[10px] font-bold text-white">{badge}</span>
      )}
      {collapsed && (
        <span className="nav-tip pointer-events-none absolute left-[calc(100%+10px)] top-1/2 z-[80] -translate-y-1/2 translate-x-[-4px] whitespace-nowrap rounded-[5px] bg-text-1 px-2.5 py-1.5 text-[11.5px] font-medium text-white opacity-0 shadow-[var(--shadow-elevated)] transition-all group-hover:translate-x-0 group-hover:opacity-100">
          {label}
        </span>
      )}
    </Link>
  );
}
