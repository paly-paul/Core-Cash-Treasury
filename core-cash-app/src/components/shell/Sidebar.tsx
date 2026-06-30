"use client";

import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { toggleSidebar } from "@/store/uiSlice";
import { SidebarNavItem } from "@/components/ui/SidebarNavItem";
import { NAV_SECTIONS } from "./navConfig";

export function Sidebar() {
  const dispatch = useAppDispatch();
  const collapsed = useAppSelector((s) => s.ui.sidebarCollapsed);
  const pathname = usePathname();

  return (
    <nav
      className={`relative flex flex-shrink-0 flex-col gap-0.5 overflow-y-auto border-r border-border-0 bg-bg-surface py-3.5 transition-[width] duration-200 ease-in-out ${
        collapsed ? "w-[52px] overflow-visible" : "w-[220px]"
      }`}
    >
      <button
        onClick={() => dispatch(toggleSidebar())}
        className={`flex items-center text-[11px] font-semibold text-text-muted hover:text-text-1 ${
          collapsed ? "justify-center px-0 py-2" : "justify-between px-3.5 pb-1 pt-2"
        }`}
        title="Toggle sidebar"
      >
        {!collapsed && <span>Collapse</span>}
        <span className={`text-base transition-transform duration-200 ${collapsed ? "rotate-180" : ""}`}>‹</span>
      </button>

      {NAV_SECTIONS.map((section) => (
        <div key={section.label}>
          {!collapsed && (
            <div className="px-4 pb-1 pt-3.5 text-[10px] font-bold uppercase tracking-wider text-text-muted">
              {section.label}
            </div>
          )}
          {section.items.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href.split("#")[0] + "/");
            return (
              <SidebarNavItem
                key={item.label}
                href={item.href}
                icon={item.icon}
                label={item.label}
                badge={item.badge}
                active={active}
                collapsed={collapsed}
              />
            );
          })}
        </div>
      ))}

      <div className="flex-1" />

      {!collapsed && (
        <div className="mx-3 mb-3.5 rounded-md border border-border-0 bg-bg-elevated p-3">
          <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-text-muted">Quick Stats</div>
          {[
            ["Entities", "3"],
            ["Banks", "6"],
            ["Accounts", "14"],
            ["Currencies", "3"],
          ].map(([n, v]) => (
            <div key={n} className="flex justify-between border-b border-border-0 py-1 last:border-b-0">
              <span className="text-[11px] text-text-2">{n}</span>
              <span className="font-data text-[11px] font-semibold text-text-1">{v}</span>
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}
