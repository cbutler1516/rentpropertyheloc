"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { CardDescription, CardTitle } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { cn } from "@/lib/utils";
import { createDefaultCrmIntegration } from "../lib/crm-integration-defaults";
import { LEAD_CAPTURE_FIELD_META } from "../lib/lead-capture-fields";
import {
  CRM_PROVIDERS,
  CRM_PROVIDER_CONFIGS,
  type CrmProvider,
} from "../lib/crm-providers";
import {
  disconnectCrmProvider,
  fetchCrmConnectionStatus,
  pushCrmLead,
  retryCrmPush,
  saveCrmCredentials,
} from "../lib/crm-integrations-api";
import { buildTestLeadPayload } from "../lib/crm-test-lead";
import type {
  CrmActivityLogEntry,
  CrmIntegrationRecord,
  CrmTestLeadPayload,
  LeadCaptureRecord,
} from "../lib/types";

type CrmHubPanelProps = {
  crmIntegration: CrmIntegrationRecord;
  packageId: string | null;
  packageTitle: string;
  leadCapture?: LeadCaptureRecord | null;
  onCrmIntegrationChange: (record: CrmIntegrationRecord) => void;
};

type HubSection = "connect" | "mapping" | "automations" | "activity";

export function CrmHubPanel({
  crmIntegration,
  packageId,
  packageTitle,
  leadCapture,
  onCrmIntegrationChange,
}: CrmHubPanelProps) {
  const [section, setSection] = useState<HubSection>("connect");
  const [credentialDraft, setCredentialDraft] = useState<Record<string, string>>(
    {},
  );
  const [statusLoading, setStatusLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [lastTestLead, setLastTestLead] = useState<CrmTestLeadPayload | null>(
    null,
  );

  const activeConfig = CRM_PROVIDER_CONFIGS[crmIntegration.activeProvider];
  const effectivePackageId = packageId ?? "draft-local";

  const refreshConnections = useCallback(async () => {
    if (!packageId) return;
    setStatusLoading(true);
    try {
      const connections = await fetchCrmConnectionStatus(packageId);
      onCrmIntegrationChange({
        ...crmIntegration,
        connections,
        updatedAt: new Date().toISOString(),
      });
    } catch {
      /* keep existing connections */
    } finally {
      setStatusLoading(false);
    }
  }, [crmIntegration, onCrmIntegrationChange, packageId]);

  useEffect(() => {
    void refreshConnections();
  }, [refreshConnections]);

  const connectionForActive = useMemo(
    () =>
      crmIntegration.connections.find(
        (c) => c.provider === crmIntegration.activeProvider,
      ),
    [crmIntegration.activeProvider, crmIntegration.connections],
  );

  const updateIntegration = (patch: Partial<CrmIntegrationRecord>) => {
    onCrmIntegrationChange({
      ...crmIntegration,
      ...patch,
      updatedAt: new Date().toISOString(),
    });
  };

  const handleProviderChange = (provider: CrmProvider) => {
    updateIntegration({ activeProvider: provider });
    setCredentialDraft({});
    setActionError(null);
  };

  const handleConnect = async () => {
    setActionLoading(true);
    setActionError(null);
    try {
      const connection = await saveCrmCredentials({
        packageId: effectivePackageId,
        provider: crmIntegration.activeProvider,
        credentials: credentialDraft,
      });
      const others = crmIntegration.connections.filter(
        (c) => c.provider !== connection.provider,
      );
      updateIntegration({
        connections: [...others, connection],
      });
      setCredentialDraft({});
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Connect failed.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDisconnect = async () => {
    setActionLoading(true);
    setActionError(null);
    try {
      await disconnectCrmProvider({
        packageId: effectivePackageId,
        provider: crmIntegration.activeProvider,
      });
      updateIntegration({
        connections: crmIntegration.connections.filter(
          (c) => c.provider !== crmIntegration.activeProvider,
        ),
      });
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Disconnect failed.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleSendTestLead = async () => {
    setActionLoading(true);
    setActionError(null);
    const lead = buildTestLeadPayload();
    setLastTestLead(lead);
    try {
      const result = await pushCrmLead({
        packageId: effectivePackageId,
        provider: crmIntegration.activeProvider,
        lead,
        integration: crmIntegration,
        testMode: true,
      });
      updateIntegration({ activityLog: result.activityLog });
      if (!result.success) {
        setActionError(result.message);
      }
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Test lead failed.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleRetry = async (entry: CrmActivityLogEntry) => {
    if (!entry.retryable || !lastTestLead) return;
    setActionLoading(true);
    setActionError(null);
    try {
      const result = await retryCrmPush({
        packageId: effectivePackageId,
        provider: entry.provider,
        lead: lastTestLead,
        integration: crmIntegration,
        relatedEntryId: entry.id,
      });
      updateIntegration({ activityLog: result.activityLog });
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Retry failed.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleResetMappings = () => {
    const defaults = createDefaultCrmIntegration({
      leadCapture,
      activeProvider: crmIntegration.activeProvider,
    });
    updateIntegration({ fieldMappings: defaults.fieldMappings });
  };

  const sections: { id: HubSection; label: string }[] = [
    { id: "connect", label: "Connect" },
    { id: "mapping", label: "Field map" },
    { id: "automations", label: "Automations" },
    { id: "activity", label: "Activity log" },
  ];

  return (
    <div className="flex flex-1 flex-col gap-4 overflow-hidden">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <CardTitle>CRM hub</CardTitle>
          <CardDescription>
            {packageTitle} — connect, map fields, and push leads from landing
            pages
          </CardDescription>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {connectionForActive?.connected ? (
            <Badge variant="success">
              Connected
              {connectionForActive.credentialHint
                ? ` ${connectionForActive.credentialHint}`
                : ""}
            </Badge>
          ) : (
            <Badge variant="gold">Not connected</Badge>
          )}
          {!packageId && (
            <Badge variant="default">Save package to persist credentials</Badge>
          )}
          <Button
            type="button"
            variant="secondary"
            size="sm"
            disabled={actionLoading}
            onClick={() => void handleSendTestLead()}
          >
            Send test lead
          </Button>
        </div>
      </div>

      <div className="flex gap-1 overflow-x-auto rounded-lg border border-white/[0.06] bg-black/20 p-1">
        {sections.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setSection(s.id)}
            className={cn(
              "shrink-0 rounded-md px-3 py-2 font-mono text-[9px] tracking-[0.14em] uppercase transition-all",
              section === s.id
                ? "bg-indigo-500/25 text-indigo-200"
                : "text-zinc-500 hover:text-zinc-300",
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      {actionError && (
        <p className="text-sm text-red-400" role="alert">
          {actionError}
        </p>
      )}

      <div className="min-h-0 flex-1 overflow-y-auto pr-1">
        {section === "connect" && (
          <div className="space-y-4">
            <div>
              <Label className="text-zinc-400">CRM provider</Label>
              <select
                value={crmIntegration.activeProvider}
                onChange={(e) =>
                  handleProviderChange(e.target.value as CrmProvider)
                }
                className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-zinc-100"
              >
                {CRM_PROVIDERS.map((id) => (
                  <option key={id} value={id}>
                    {CRM_PROVIDER_CONFIGS[id].label}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-xs text-zinc-500">
                {activeConfig.description}
              </p>
            </div>

            {connectionForActive?.connected ? (
              <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
                <p className="text-sm text-emerald-200">
                  Credentials stored server-side only.
                  {connectionForActive.credentialHint &&
                    ` Hint: ${connectionForActive.credentialHint}`}
                </p>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="mt-3"
                  disabled={actionLoading}
                  onClick={() => void handleDisconnect()}
                >
                  Disconnect
                </Button>
              </div>
            ) : (
              <div className="space-y-3 rounded-lg border border-white/[0.06] bg-black/20 p-4">
                <p className="font-mono text-[9px] tracking-[0.14em] text-zinc-500 uppercase">
                  Credentials (sent to server only — never stored in browser)
                </p>
                {activeConfig.credentialFields.map((field) => (
                  <div key={field.key}>
                    <Label htmlFor={`crm-${field.key}`}>{field.label}</Label>
                    <Input
                      id={`crm-${field.key}`}
                      type={field.secret ? "password" : "text"}
                      autoComplete="off"
                      placeholder={field.placeholder}
                      value={credentialDraft[field.key] ?? ""}
                      onChange={(e) =>
                        setCredentialDraft((prev) => ({
                          ...prev,
                          [field.key]: e.target.value,
                        }))
                      }
                      className="mt-1"
                    />
                  </div>
                ))}
                <Button
                  type="button"
                  disabled={actionLoading}
                  onClick={() => void handleConnect()}
                >
                  {actionLoading ? "Connecting…" : "Connect CRM"}
                </Button>
              </div>
            )}

            <div className="grid gap-2 sm:grid-cols-2">
              {CRM_PROVIDERS.map((id) => {
                const conn = crmIntegration.connections.find(
                  (c) => c.provider === id,
                );
                return (
                  <div
                    key={id}
                    className="rounded-lg border border-white/[0.06] px-3 py-2 text-xs text-zinc-400"
                  >
                    <span className="font-medium text-zinc-200">
                      {CRM_PROVIDER_CONFIGS[id].label}
                    </span>
                    <span className="ml-2">
                      {statusLoading
                        ? "…"
                        : conn?.connected
                          ? "● connected"
                          : "○ not connected"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {section === "mapping" && (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs text-zinc-500">
                Map lead capture fields to CRM custom field IDs.
                {!leadCapture && " Build lead capture for full field labels."}
              </p>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={handleResetMappings}
              >
                Reset from lead capture
              </Button>
            </div>
            {crmIntegration.fieldMappings.map((mapping, index) => {
              const meta = LEAD_CAPTURE_FIELD_META[mapping.leadCaptureField];
              const captureEnabled =
                leadCapture?.fields[mapping.leadCaptureField]?.enabled ?? true;
              return (
                <div
                  key={mapping.leadCaptureField}
                  className="grid gap-2 rounded-lg border border-white/[0.06] bg-black/20 p-3 sm:grid-cols-[1fr_1fr_auto]"
                >
                  <div>
                    <p className="text-sm text-zinc-200">{meta.defaultLabel}</p>
                    <p className="text-[10px] text-zinc-500">
                      {mapping.leadCaptureField}
                      {!captureEnabled && " · disabled on form"}
                    </p>
                  </div>
                  <Input
                    value={mapping.crmFieldId}
                    onChange={(e) => {
                      const next = [...crmIntegration.fieldMappings];
                      next[index] = {
                        ...mapping,
                        crmFieldId: e.target.value,
                      };
                      updateIntegration({ fieldMappings: next });
                    }}
                  />
                  <label className="flex items-center gap-2 text-xs text-zinc-400">
                    <input
                      type="checkbox"
                      checked={mapping.enabled}
                      onChange={(e) => {
                        const next = [...crmIntegration.fieldMappings];
                        next[index] = {
                          ...mapping,
                          enabled: e.target.checked,
                        };
                        updateIntegration({ fieldMappings: next });
                      }}
                    />
                    Sync
                  </label>
                </div>
              );
            })}
          </div>
        )}

        {section === "automations" && (
          <div className="space-y-4">
            <label className="flex items-center gap-2 text-sm text-zinc-300">
              <input
                type="checkbox"
                checked={crmIntegration.automations.pushFromLandingPage}
                onChange={(e) =>
                  updateIntegration({
                    automations: {
                      ...crmIntegration.automations,
                      pushFromLandingPage: e.target.checked,
                    },
                  })
                }
              />
              Push leads directly from landing pages
            </label>
            <label className="flex items-center gap-2 text-sm text-zinc-300">
              <input
                type="checkbox"
                checked={crmIntegration.automations.pushUtmSource}
                onChange={(e) =>
                  updateIntegration({
                    automations: {
                      ...crmIntegration.automations,
                      pushUtmSource: e.target.checked,
                    },
                  })
                }
              />
              Push UTM source / medium / campaign
            </label>
            <div>
              <Label>Auto-apply tags (comma-separated)</Label>
              <Input
                className="mt-1"
                value={crmIntegration.automations.autoTags.join(", ")}
                onChange={(e) =>
                  updateIntegration({
                    automations: {
                      ...crmIntegration.automations,
                      autoTags: e.target.value
                        .split(",")
                        .map((t) => t.trim())
                        .filter(Boolean),
                    },
                  })
                }
              />
            </div>
            <label className="flex items-center gap-2 text-sm text-zinc-300">
              <input
                type="checkbox"
                checked={crmIntegration.automations.createOpportunity}
                onChange={(e) =>
                  updateIntegration({
                    automations: {
                      ...crmIntegration.automations,
                      createOpportunity: e.target.checked,
                    },
                  })
                }
              />
              Auto-create opportunity
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <Label>Pipeline</Label>
                <Input
                  className="mt-1"
                  value={crmIntegration.automations.opportunityPipeline}
                  onChange={(e) =>
                    updateIntegration({
                      automations: {
                        ...crmIntegration.automations,
                        opportunityPipeline: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div>
                <Label>Stage</Label>
                <Input
                  className="mt-1"
                  value={crmIntegration.automations.opportunityStage}
                  onChange={(e) =>
                    updateIntegration({
                      automations: {
                        ...crmIntegration.automations,
                        opportunityStage: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </div>
            <div>
              <Label>Assigned loan officer</Label>
              <Input
                className="mt-1"
                placeholder="Name or CRM user ID"
                value={crmIntegration.automations.assignedLoanOfficer}
                onChange={(e) =>
                  updateIntegration({
                    automations: {
                      ...crmIntegration.automations,
                      assignedLoanOfficer: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <Label>Workflow ID</Label>
                <Input
                  className="mt-1"
                  value={crmIntegration.automations.triggerWorkflowId}
                  onChange={(e) =>
                    updateIntegration({
                      automations: {
                        ...crmIntegration.automations,
                        triggerWorkflowId: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div>
                <Label>Campaign ID</Label>
                <Input
                  className="mt-1"
                  value={crmIntegration.automations.triggerCampaignId}
                  onChange={(e) =>
                    updateIntegration({
                      automations: {
                        ...crmIntegration.automations,
                        triggerCampaignId: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm text-zinc-300">
              <input
                type="checkbox"
                checked={crmIntegration.automations.createTasks}
                onChange={(e) =>
                  updateIntegration({
                    automations: {
                      ...crmIntegration.automations,
                      createTasks: e.target.checked,
                    },
                  })
                }
              />
              Create tasks / reminders
            </label>
            <div>
              <Label>Task reminder (days)</Label>
              <Input
                type="number"
                min={0}
                className="mt-1 w-24"
                value={crmIntegration.automations.taskReminderDays}
                onChange={(e) =>
                  updateIntegration({
                    automations: {
                      ...crmIntegration.automations,
                      taskReminderDays: Number(e.target.value) || 0,
                    },
                  })
                }
              />
            </div>
          </div>
        )}

        {section === "activity" && (
          <div className="space-y-2">
            {crmIntegration.activityLog.length === 0 ? (
              <p className="text-sm text-zinc-500">
                No activity yet. Send a test lead to verify your integration.
              </p>
            ) : (
              crmIntegration.activityLog.map((entry) => (
                <div
                  key={entry.id}
                  className={cn(
                    "rounded-lg border px-3 py-2 text-sm",
                    entry.success
                      ? "border-white/[0.06] bg-black/20"
                      : "border-red-500/30 bg-red-500/5",
                  )}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-[9px] tracking-[0.12em] text-zinc-500 uppercase">
                      {entry.type.replace(/_/g, " ")} ·{" "}
                      {CRM_PROVIDER_CONFIGS[entry.provider].label}
                    </span>
                    <span className="text-[10px] text-zinc-600">
                      {new Date(entry.at).toLocaleString()}
                    </span>
                  </div>
                  <p className="mt-1 text-zinc-300">{entry.message}</p>
                  {entry.leadEmail && (
                    <p className="text-xs text-zinc-500">{entry.leadEmail}</p>
                  )}
                  {entry.retryable && lastTestLead && (
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      className="mt-2"
                      disabled={actionLoading}
                      onClick={() => void handleRetry(entry)}
                    >
                      Retry push
                    </Button>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
