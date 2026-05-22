"use client";

import { useCallback, useState } from "react";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { CardDescription, CardTitle } from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { complianceToReportText } from "../lib/compliance-export";
import type {
  ComplianceRecord,
  ComplianceScanRequest,
  ComplianceRiskLevel,
} from "../lib/types";

type CompliancePanelProps = {
  compliance: ComplianceRecord | null;
  packageTitle: string;
  scanRequest: ComplianceScanRequest;
  onComplianceChange: (record: ComplianceRecord) => void;
  onApplyRewrites: (issueIds?: string[]) => void;
};

function riskVariant(score: ComplianceRiskLevel): "success" | "gold" | "warning" {
  if (score === "low") return "success";
  if (score === "medium") return "gold";
  return "warning";
}

function severityLabel(severity: string) {
  return severity.charAt(0).toUpperCase() + severity.slice(1);
}

export function CompliancePanel({
  compliance,
  packageTitle,
  scanRequest,
  onComplianceChange,
  onApplyRewrites,
}: CompliancePanelProps) {
  const [scanLoading, setScanLoading] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);
  const [mode, setMode] = useState<"ai" | "demo" | null>(null);
  const [copyMessage, setCopyMessage] = useState<string | null>(null);

  const handleRunScan = useCallback(async () => {
    setScanLoading(true);
    setScanError(null);
    try {
      const response = await fetch("/api/content-engine/compliance/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(scanRequest),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Compliance scan failed.");
      }
      onComplianceChange({
        ...data.compliance,
        reviewerNotes: compliance?.reviewerNotes ?? "",
        reviewed: false,
        reviewedAt: null,
      });
      setMode(data.mode ?? "demo");
    } catch (err) {
      setScanError(err instanceof Error ? err.message : "Scan failed.");
    } finally {
      setScanLoading(false);
    }
  }, [compliance?.reviewerNotes, onComplianceChange, scanRequest]);

  const handleCopyReport = useCallback(async () => {
    if (!compliance) return;
    const text = complianceToReportText(compliance, packageTitle);
    try {
      await navigator.clipboard.writeText(text);
      setCopyMessage("Report copied.");
      setTimeout(() => setCopyMessage(null), 2000);
    } catch {
      setCopyMessage("Copy failed — check browser permissions.");
    }
  }, [compliance, packageTitle]);

  const handleMarkReviewed = useCallback(() => {
    if (!compliance) return;
    onComplianceChange({
      ...compliance,
      reviewed: true,
      reviewedAt: new Date().toISOString(),
    });
  }, [compliance, onComplianceChange]);

  const updateNotes = useCallback(
    (notes: string) => {
      if (!compliance) return;
      onComplianceChange({ ...compliance, reviewerNotes: notes });
    },
    [compliance, onComplianceChange],
  );

  const toggleApproval = useCallback(
    (id: string) => {
      if (!compliance) return;
      onComplianceChange({
        ...compliance,
        finalApprovalChecklist: compliance.finalApprovalChecklist.map((item) =>
          item.id === id ? { ...item, checked: !item.checked } : item,
        ),
      });
    },
    [compliance, onComplianceChange],
  );

  return (
    <div className="flex flex-1 flex-col gap-6 overflow-y-auto">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <CardTitle>Compliance review</CardTitle>
          <CardDescription>
            Scan content, landing page, lead magnet, consent language, CRM
            sequences, and published campaign copy for mortgage marketing risk.
          </CardDescription>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="secondary"
            disabled={scanLoading}
            onClick={() => void handleRunScan()}
          >
            {scanLoading ? "Scanning…" : "Run compliance scan"}
          </Button>
          {compliance && (
            <>
              <Button type="button" variant="ghost" onClick={() => void handleCopyReport()}>
                Copy compliance report
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => onApplyRewrites()}
              >
                Apply safer rewrites
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={handleMarkReviewed}
                disabled={compliance.reviewed}
              >
                {compliance.reviewed ? "Reviewed" : "Mark reviewed"}
              </Button>
            </>
          )}
        </div>
      </div>

      {scanError && (
        <p className="text-sm text-red-400" role="alert">
          {scanError}
        </p>
      )}
      {copyMessage && <p className="text-sm text-emerald-400">{copyMessage}</p>}
      {mode && (
        <p className="font-mono text-[10px] tracking-[0.12em] text-zinc-500 uppercase">
          Scan mode: {mode}
        </p>
      )}

      {!compliance ? (
        <div className="rounded-lg border border-dashed border-white/[0.08] bg-black/20 p-8 text-center text-sm text-zinc-500">
          Run a compliance scan to see risk score, issues, disclaimer gaps, and
          approval checklist.
        </div>
      ) : (
        <>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm text-zinc-400">Overall risk</span>
            <Badge variant={riskVariant(compliance.riskScore)}>
              {compliance.riskScore}
            </Badge>
            {compliance.reviewed && (
              <Badge variant="success">Reviewed</Badge>
            )}
            <span className="text-[11px] text-zinc-500">
              Scanned {new Date(compliance.scannedAt).toLocaleString()}
            </span>
          </div>

          <section>
            <h3 className="mb-3 font-mono text-[10px] tracking-[0.14em] text-zinc-500 uppercase">
              Issues ({compliance.issues.length})
            </h3>
            {compliance.issues.length === 0 ? (
              <p className="text-sm text-zinc-500">No issues flagged by rules scan.</p>
            ) : (
              <ul className="space-y-3">
                {compliance.issues.map((issue) => (
                  <li
                    key={issue.id}
                    className="rounded-lg border border-white/[0.06] bg-black/25 p-4"
                  >
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <Badge
                        variant={
                          issue.severity === "high" || issue.severity === "critical"
                            ? "warning"
                            : "gold"
                        }
                      >
                        {severityLabel(issue.severity)}
                      </Badge>
                      <span className="text-[10px] text-zinc-500">{issue.source}</span>
                      {issue.applied && (
                        <Badge variant="success">Applied</Badge>
                      )}
                    </div>
                    <p className="text-sm text-zinc-200">{issue.message}</p>
                    <p className="mt-1 text-[11px] text-zinc-500 italic">
                      &ldquo;{issue.excerpt}&rdquo;
                    </p>
                    <p className="mt-2 text-xs text-emerald-200/90">
                      Safer rewrite: {issue.suggestedRewrite}
                    </p>
                    {issue.saferVersion && issue.saferVersion !== issue.suggestedRewrite && (
                      <p className="mt-1 text-xs text-zinc-400">
                        Compliance-safe: {issue.saferVersion}
                      </p>
                    )}
                    <Button
                      type="button"
                      variant="ghost"
                      className="mt-2 h-8 px-2 text-[10px]"
                      disabled={issue.applied}
                      onClick={() => onApplyRewrites([issue.id])}
                    >
                      Apply this rewrite
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section>
            <h3 className="mb-3 font-mono text-[10px] tracking-[0.14em] text-zinc-500 uppercase">
              Missing disclaimer checklist
            </h3>
            <ul className="space-y-2">
              {compliance.missingDisclaimers.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between gap-2 rounded-md border border-white/[0.04] px-3 py-2 text-sm"
                >
                  <span className={item.present ? "text-zinc-300" : "text-amber-200"}>
                    {item.label}
                    {item.required ? " *" : ""}
                  </span>
                  <Badge variant={item.present ? "success" : "warning"}>
                    {item.present ? "Present" : "Missing"}
                  </Badge>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="mb-3 font-mono text-[10px] tracking-[0.14em] text-zinc-500 uppercase">
              Final approval checklist
            </h3>
            <ul className="space-y-2">
              {compliance.finalApprovalChecklist.map((item) => (
                <li key={item.id}>
                  <label className="flex cursor-pointer items-start gap-2 text-sm text-zinc-300">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => toggleApproval(item.id)}
                      className="mt-1"
                    />
                    {item.label}
                  </label>
                </li>
              ))}
            </ul>
          </section>

          <div>
            <Label htmlFor="compliance-reviewer-notes">Reviewer notes</Label>
            <Textarea
              id="compliance-reviewer-notes"
              value={compliance.reviewerNotes}
              onChange={(e) => updateNotes(e.target.value)}
              placeholder="Document exceptions, partner approvals, or remediation steps…"
              className="mt-2 min-h-[100px]"
            />
          </div>
        </>
      )}
    </div>
  );
}
