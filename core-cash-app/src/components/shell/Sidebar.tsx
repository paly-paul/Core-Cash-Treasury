"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { toggleSidebar } from "@/store/uiSlice";
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
              <Link
                key={item.label}
                href={item.href}
                className={`group relative mx-1.5 flex items-center gap-2 rounded-r-[5px] border-l-[3px] px-3 py-1.5 text-[13px] transition-colors ${
                  collapsed ? "justify-center px-0 py-2" : "pl-3"
                } ${
                  active
                    ? "border-l-blue bg-blue-light font-semibold text-blue"
                    : "border-l-transparent text-text-2 hover:bg-bg-hover hover:text-text-1"
                }`}
              >
                <span className="w-[18px] flex-shrink-0 text-center text-sm opacity-80">{item.icon}</span>
                {!collapsed && <span className="flex-1">{item.label}</span>}
                {!collapsed && item.badge && (
                  <span className="rounded-full bg-red px-1.5 font-data text-[10px] font-bold text-white">
                    {item.badge}
                  </span>
                )}
                {collapsed && (
                  <span className="pointer-events-none absolute left-[calc(100%+10px)] top-1/2 z-[80] -translate-y-1/2 translate-x-[-4px] whitespace-nowrap rounded-[5px] bg-text-1 px-2.5 py-1.5 text-[11.5px] font-medium text-white opacity-0 shadow-[var(--shadow-elevated)] transition-all group-hover:translate-x-0 group-hover:opacity-100">
                    {item.label}
                  </span>
                )}
              </Link>
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
