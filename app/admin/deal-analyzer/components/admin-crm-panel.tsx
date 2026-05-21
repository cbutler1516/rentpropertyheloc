"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/app/components/ui/button";
import type { CrmIntegrationStatus } from "@/app/deal-analyzer/lib/crm/types";

type AdminCrmPanelProps = {
  onPushComplete?: () => void;
};

export function AdminCrmPanel({ onPushComplete }: AdminCrmPanelProps) {
  const [status, setStatus] = useState<CrmIntegrationStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [testing, setTesting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadStatus = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/deal-analyzer/admin/crm/test", {
        credentials: "include",
      });
      if (res.status === 401) {
        setError("Session expired. Refresh and sign in again.");
        return;
      }
      const data = (await res.json()) as {
        status?: CrmIntegrationStatus;
        error?: string;
      };
      if (data.status) {
        setStatus(data.status);
      }
    } catch {
      setError("Could not load CRM configuration status.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadStatus();
  }, [loadStatus]);

  async function handleTestPush() {
    setTesting(true);
    setMessage(null);
    setError(null);
    try {
      const res = await fetch("/api/deal-analyzer/admin/crm/test", {
        method: "POST",
        credentials: "include",
      });
      const data = (await res.json()) as {
        success?: boolean;
        message?: string;
        error?: string;
        status?: CrmIntegrationStatus;
      };
      if (data.status) setStatus(data.status);
      if (!res.ok || !data.success) {
        setError(data.error ?? data.message ?? "Test push failed.");
        return;
      }
      setMessage(data.message ?? "Test payload sent to CRM webhook.");
      onPushComplete?.();
    } catch {
      setError("Test push request failed.");
    } finally {
      setTesting(false);
    }
  }

  const configured =
    status?.ghlConfigured || status?.zapierConfigured;

  return (
    <section className="rounded-2xl border border-white/[0.06] bg-zinc-950/50 p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[9px] tracking-[0.2em] text-zinc-500 uppercase">
            CRM integration
          </p>
          <p className="mt-1 text-sm text-zinc-400">
            Push leads and Playbook reports to GoHighLevel / RAD CRM or Zapier. Webhook
            URLs stay server-side only.
          </p>
        </div>
        <Button
          type="button"
          variant="gold"
          size="sm"
          disabled={testing || loading || !configured}
          onClick={() => void handleTestPush()}
        >
          {testing ? "Sending test…" : "Send test push"}
        </Button>
      </div>

      {loading ? (
        <p className="mt-4 text-xs text-zinc-600">Loading CRM config…</p>
      ) : status ? (
        <ul className="mt-4 grid gap-2 text-sm text-zinc-400 sm:grid-cols-2">
          <li>
            GHL / RAD webhook:{" "}
            <span className={status.ghlConfigured ? "text-emerald-400" : "text-zinc-600"}>
              {status.ghlConfigured ? "Configured" : "Not set"}
            </span>
          </li>
          <li>
            Zapier fallback:{" "}
            <span
              className={status.zapierConfigured ? "text-emerald-400" : "text-zinc-600"}
            >
              {status.zapierConfigured ? "Configured" : "Not set"}
            </span>
          </li>
          <li>
            Auto-push on report:{" "}
            <span className={status.autoPushEnabled ? "text-[#c9a227]" : "text-zinc-600"}>
              {status.autoPushEnabled ? "Enabled" : "Disabled"}
            </span>
          </li>
          <li>
            Push secret header:{" "}
            <span
              className={status.secretConfigured ? "text-emerald-400" : "text-zinc-600"}
            >
              {status.secretConfigured ? "Set" : "Optional"}
            </span>
          </li>
        </ul>
      ) : null}

      {message ? (
        <p className="mt-4 text-sm text-emerald-300/90" role="status">
          {message}
        </p>
      ) : null}
      {error ? (
        <p className="mt-4 text-sm text-red-300" role="alert">
          {error}
        </p>
      ) : null}

      <p className="mt-4 text-xs text-zinc-600">
        Env: <code className="text-zinc-500">GHL_WEBHOOK_URL</code>,{" "}
        <code className="text-zinc-500">ZAPIER_WEBHOOK_URL</code>,{" "}
        <code className="text-zinc-500">CRM_PUSH_SECRET</code>,{" "}
        <code className="text-zinc-500">CRM_AUTO_PUSH</code>
      </p>
    </section>
  );
}
