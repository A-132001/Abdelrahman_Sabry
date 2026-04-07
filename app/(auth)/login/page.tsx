"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "@/app/_lib/actions/auth";

export default function LoginPage() {
  const [state, action, pending] = useActionState<LoginState, FormData>(
    loginAction,
    {}
  );

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-foreground">
            Welcome back<span className="text-accent">.</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to manage your portfolio.
          </p>
        </div>

        <form action={action} className="space-y-4">
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
              className="h-11 w-full rounded-lg border border-border bg-card px-4 text-sm text-card-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
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
              className="h-11 w-full rounded-lg border border-border bg-card px-4 text-sm text-card-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={pending}
            className="h-11 w-full rounded-lg bg-accent text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {pending ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          <a
            href="/"
            className="transition-colors hover:text-foreground"
          >
            &larr; Back to portfolio
          </a>
        </p>
      </div>
    </div>
  );
}
