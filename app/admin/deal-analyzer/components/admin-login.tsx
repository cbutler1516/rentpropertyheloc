"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { AdminShell } from "./admin-shell";

type AdminLoginProps = {
  misconfigured?: boolean;
};

export function AdminLogin({ misconfigured = false }: AdminLoginProps) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/deal-analyzer/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok || !data.ok) {
        setError(data.error ?? "Login failed.");
        return;
      }

      router.refresh();
    } catch {
      setError("Could not reach the server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AdminShell>
      <div className="mx-auto flex max-w-md flex-col gap-6">
        <div className="rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-8 shadow-xl">
          <p className="font-mono text-[10px] tracking-[0.28em] text-[#c9a227] uppercase">
            Internal access
          </p>
          <h2 className="mt-2 text-2xl font-medium text-white">Deal Analyzer Admin</h2>
          <p className="mt-2 text-sm text-zinc-400">
            Sign in to view leads, reports, and follow-up priorities.
          </p>

          {misconfigured ? (
            <p className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
              Set <code className="text-amber-100">ADMIN_DEAL_ANALYZER_PASSWORD</code> in
              your environment to enable this dashboard.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="admin-password">Password</Label>
                <Input
                  id="admin-password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                />
              </div>
              {error ? (
                <p className="text-sm text-red-400" role="alert">
                  {error}
                </p>
              ) : null}
              <Button type="submit" variant="gold" className="w-full" disabled={loading}>
                {loading ? "Signing in…" : "Sign in"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </AdminShell>
  );
}
