"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "@/app/_lib/actions/auth";

export default function LoginPage() {
  const [state, action, pending] = useActionState<LoginState, FormData>(
    loginAction,
    {}
  );

  return (
    <div className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-background px-6">
      {/* Background orbs */}
      <div
        className="hero-orb"
        style={{
          width: "400px",
          height: "400px",
          top: "20%",
          left: "10%",
          background: "linear-gradient(135deg, var(--gradient-start), var(--gradient-mid))",
        }}
      />
      <div
        className="hero-orb"
        style={{
          width: "300px",
          height: "300px",
          bottom: "20%",
          right: "15%",
          background: "linear-gradient(135deg, var(--gradient-mid), var(--gradient-end))",
          animationDelay: "-7s",
        }}
      />

      <div className="relative z-10 w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="mb-4 text-2xl font-bold text-foreground">
            AT<span className="text-gradient">.</span>
          </p>
          <h1 className="text-2xl font-bold text-foreground">
            Welcome back<span className="text-gradient">.</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to manage your portfolio.
          </p>
        </div>

        <form action={action} className="card-elevated space-y-4 p-6 sm:p-8">
          {state.error && (
            <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400">
              {state.error}
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              autoComplete="email"
              className="h-11 w-full rounded-lg border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              autoComplete="current-password"
              className="h-11 w-full rounded-lg border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={pending}
            className="btn-primary w-full justify-center disabled:opacity-50"
          >
            {pending ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          <a
            href="/"
            className="transition-colors hover:text-accent"
          >
            &larr; Back to portfolio
          </a>
        </p>
      </div>
    </div>
  );
}
