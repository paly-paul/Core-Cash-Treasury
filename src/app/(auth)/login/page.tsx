"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Stubbed auth: no real provider wired up. Submitting sets a mock
// session flag in localStorage and redirects to the dashboard.
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (typeof window !== "undefined") {
      localStorage.setItem("core-cash-mock-session", JSON.stringify({ email, loggedInAt: Date.now() }));
    }
    router.push("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-base px-4">
      <div className="w-full max-w-[380px] rounded-md border border-border-0 bg-bg-surface p-8 shadow-[var(--shadow-card)]">
        <div className="mb-6 flex flex-col items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-blue font-data text-xs font-bold text-white">
            CC
          </span>
          <div className="text-sm font-bold text-text-1">Core Cash Agent</div>
          <div className="text-[11px] text-text-muted">Sign in to continue</div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-[11px] font-bold uppercase tracking-wide text-text-muted">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="rounded-[6px] border border-border-1 bg-bg-elevated px-3 py-2 text-[12.5px] text-text-1 outline-none focus:border-blue focus:shadow-[0_0_0_3px_rgba(0,87,217,.1)]"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-[11px] font-bold uppercase tracking-wide text-text-muted">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="rounded-[6px] border border-border-1 bg-bg-elevated px-3 py-2 text-[12.5px] text-text-1 outline-none focus:border-blue focus:shadow-[0_0_0_3px_rgba(0,87,217,.1)]"
            />
          </div>
          <button
            type="submit"
            className="mt-2 rounded-[6px] bg-blue px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#004BBD]"
          >
            Sign In
          </button>
        </form>

        <div className="mt-5 text-center text-[10px] text-text-muted">
          Authentication is a UI stub — no real identity provider is connected yet.
        </div>
      </div>
    </div>
  );
}
