"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Dummy credentials for demoing the flow until real FastAPI auth exists.
const MOCK_CREDENTIALS = { email: "demo@corecash.ai", password: "demo1234" };

interface FormErrors {
  email?: string;
  password?: string;
}

// STUB: no real auth backend exists yet. On "success" this just writes a mock
// session marker to localStorage and redirects — it does not issue or verify
// a real token. Session strategy (JWT / server session / NextAuth / etc.) is
// an open decision deferred until the FastAPI auth design is settled; see
// the rollout summary for details. Route protection on other pages is
// likewise not wired up yet.
export default function LoginPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  function validate(): FormErrors {
    const next: FormErrors = {};
    if (!email.trim()) next.email = "Email is required.";
    else if (!EMAIL_RE.test(email.trim())) next.email = "Enter a valid email address.";
    if (!password) next.password = "Password is required.";
    return next;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 600));

    const isMatch = email.trim().toLowerCase() === MOCK_CREDENTIALS.email && password === MOCK_CREDENTIALS.password;
    if (!isMatch) {
      setSubmitting(false);
      showToast({
        title: "Sign in failed",
        message: "Incorrect email or password. Try the demo credentials shown below.",
        type: "error",
      });
      return;
    }

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

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3.5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-[11px] font-bold uppercase tracking-wide text-text-muted">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              error={Boolean(errors.email)}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              autoComplete="email"
            />
            {errors.email && <span className="text-[10.5px] text-red">{errors.email}</span>}
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-[11px] font-bold uppercase tracking-wide text-text-muted">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              error={Boolean(errors.password)}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
            />
            {errors.password && <span className="text-[10.5px] text-red">{errors.password}</span>}
          </div>
          <Button type="submit" variant="primary" disabled={submitting} className="mt-2 justify-center py-2.5 text-xs">
            {submitting ? "Signing in…" : "Sign In"}
          </Button>
        </form>

        {/* <div className="mt-5 rounded-[6px] border border-border-0 bg-bg-elevated px-3 py-2 text-[10.5px] text-text-muted">
          Demo credentials: <span className="font-data text-text-2">{MOCK_CREDENTIALS.email}</span> /{" "}
          <span className="font-data text-text-2">{MOCK_CREDENTIALS.password}</span>
        </div> */}

        {/* <div className="mt-3 text-center text-[10px] text-text-muted">
          Authentication is a UI stub — no real identity provider is connected yet.
        </div> */}
      </div>
    </div>
  );
}
