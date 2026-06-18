import type { StoredLead } from "@/lib/leads/types";

const DEFAULT_RECIPIENTS = [
  "cbutler@barrettfinancial.com",
  "dj@pillarprivatelending.com",
  "chrisb@pillarprivatelending.com",
];

const DEFAULT_FROM = "The Loan Playbook Leads <onboarding@resend.dev>";

export function getNotificationRecipients(): string[] {
  const env = process.env.INTERNAL_LEAD_NOTIFICATION_RECIPIENTS?.trim();
  if (env) {
    const parsed = env.split(",").map((e) => e.trim()).filter(Boolean);
    if (parsed.length > 0) return parsed;
  }
  return DEFAULT_RECIPIENTS;
}

export function getNotificationFromAddress(): string {
  return process.env.RESEND_FROM_EMAIL?.trim() || DEFAULT_FROM;
}

function formatUsd(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function buildLeadNotificationBody(lead: StoredLead): string {
  const propertyValue = lead.propertyValue ?? 0;
  const mortgageBalance = lead.mortgageBalance ?? 0;
  const equity =
    lead.estimatedEquity ??
    (lead.propertyValue != null && lead.mortgageBalance != null
      ? Math.max(0, propertyValue - mortgageBalance)
      : null);
  const cltv =
    lead.propertyValue != null && lead.propertyValue > 0 && lead.mortgageBalance != null
      ? (((mortgageBalance + lead.desiredFunds) / propertyValue) * 100).toFixed(1)
      : "N/A";

  const isFastTrack = lead.routingTier === "fast_track";
  const sections: string[] = [];

  if (isFastTrack) {
    sections.push(
      "╔══════════════════════════════════════╗",
      "║  FAST TRACK  ·  HIGH PRIORITY LEAD   ║",
      "╚══════════════════════════════════════╝",
      "",
      "Recommended callback: within 5 minutes",
      "",
    );
  }

  sections.push(
    "--- Borrower ---",
    `Name: ${lead.firstName} ${lead.lastName}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone}`,
  );

  sections.push(
    "",
    "--- Financing scenario ---",
    `Property type: ${lead.propertyType || "Pending enrichment"}`,
    lead.propertyValue != null && lead.propertyValue > 0
      ? `Estimated value: ${formatUsd(lead.propertyValue)}`
      : "Estimated value: Pending enrichment",
    lead.mortgageBalance != null
      ? `Mortgage balance: ${formatUsd(lead.mortgageBalance)}`
      : "Mortgage balance: Pending enrichment",
    `Desired funds: ${formatUsd(lead.desiredFunds)}`,
    equity != null ? `Estimated equity: ${formatUsd(equity)}` : "Estimated equity: Pending enrichment",
    lead.estimatedHelocLow != null && lead.estimatedHelocHigh != null
      ? `Potential HELOC range: ${formatUsd(lead.estimatedHelocLow)} – ${formatUsd(lead.estimatedHelocHigh)}`
      : lead.estimatedHeloc != null
        ? `Potential HELOC: ${formatUsd(lead.estimatedHeloc)}`
        : "Potential HELOC: Pending enrichment",
    `Funding goal: ${lead.fundingGoal || "Not provided"}`,
    `Confidence: ${lead.confidenceRating || "N/A"}`,
    `Data source: ${lead.avmSource || "N/A"}`,
    `Combined LTV: ${cltv}%`,
  );

  sections.push(
    "",
    "--- Internal scoring summary ---",
    `Routing tier: ${lead.routingTier} — ${lead.routingLabel}`,
    `Quality score: ${lead.qualityScore} (${lead.qualityTier})`,
    `Second lien fit: ${lead.secondLienFit}`,
    `Recommended action: ${lead.recommendedAction}`,
    `Credit score range: ${lead.creditScoreRange || "Not provided"}`,
  );
  if (lead.creditScoreEstimate != null) {
    sections.push(`Credit estimate: ${lead.creditScoreEstimate}`);
  }
  sections.push(`Estimated equity: ${equity != null ? formatUsd(equity) : "Pending enrichment"}`);
  sections.push(`Desired funds: ${formatUsd(lead.desiredFunds)}`);
  sections.push(`Funding timeline: ${lead.fundingTimeline || "Not provided at submit"}`);

  if (lead.routingReasons.length > 0) {
    sections.push("", "--- Routing reasons ---", ...lead.routingReasons.map((r) => `• ${r}`));
  }

  const hasEnrichment = lead.propertyCount || lead.fundingTimeline;
  if (hasEnrichment) {
    sections.push("", "--- Post-submit enrichment ---");
    if (lead.propertyCount) sections.push(`Investment properties: ${lead.propertyCount}`);
    if (lead.fundingTimeline) sections.push(`Funding timeline: ${lead.fundingTimeline}`);
  }

  sections.push(
    "",
    "--- Meta ---",
    `Lead ID: ${lead.id}`,
    `Journey: ${lead.journey}`,
    `Funnel version: ${lead.funnelVersion}`,
    `Source: ${lead.source}`,
    lead.sourceUrl ? `Source URL: ${lead.sourceUrl}` : "Source URL: (none)",
    `TCPA consent: ${lead.tcpaConsent ? "Yes" : "No"} (${lead.tcpaConsentAt})`,
    `Marketing opt-in: ${lead.marketingOptIn ? "Yes" : "No"}`,
    `Submitted: ${lead.createdAt}`,
  );

  if (lead.keyReasons.length > 0) {
    sections.push("", "--- Scoring reasons ---", ...lead.keyReasons.map((r) => `• ${r}`));
  }

  sections.push("", `Follow-up: ${lead.recommendedFollowUp}`);

  return sections.join("\n");
}

function buildSubject(lead: StoredLead): string {
  if (lead.routingTier === "fast_track") {
    return `[FAST TRACK · HIGH PRIORITY] Loan Playbook lead — ${lead.firstName} ${lead.lastName}`;
  }
  const tierLabel = lead.routingTier.toUpperCase();
  return `[${tierLabel}] New ${lead.qualityTier} financing lead — ${lead.journey} — ${lead.firstName} ${lead.lastName}`;
}

export type NotificationResult = {
  sent: boolean;
  recipients: string[];
  fromAddress: string;
  error?: string;
};

export async function notifyLeadReceived(lead: StoredLead): Promise<NotificationResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const recipients = getNotificationRecipients();
  const fromAddress = getNotificationFromAddress();

  if (!apiKey) {
    const msg = "RESEND_API_KEY not set — notification skipped";
    if (process.env.NODE_ENV === "development") {
      console.debug(`[leads] ${msg}`, {
        leadId: lead.id,
        recipients,
        routingTier: lead.routingTier,
      });
    } else {
      console.warn(`[leads] ${msg}`, { leadId: lead.id });
    }
    return { sent: false, recipients, fromAddress, error: msg };
  }

  if (recipients.length === 0) {
    const msg = "No notification recipients configured";
    console.warn(`[leads] ${msg}`);
    return { sent: false, recipients, fromAddress, error: msg };
  }

  const subject = buildSubject(lead);
  const body = buildLeadNotificationBody(lead);

  console.info("[leads] sending notification email", {
    leadId: lead.id,
    to: recipients,
    from: fromAddress,
    subject,
    routingTier: lead.routingTier,
  });

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddress,
        to: recipients,
        subject,
        text: body,
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      const msg = `Resend API error ${response.status}: ${detail.slice(0, 500)}`;
      console.error("[leads] Resend email failed", {
        status: response.status,
        detail: detail.slice(0, 500),
        leadId: lead.id,
        recipients,
      });
      return { sent: false, recipients, fromAddress, error: msg };
    }

    const result = await response.json().catch(() => ({}));
    console.info("[leads] notification sent successfully", {
      leadId: lead.id,
      recipients,
      routingTier: lead.routingTier,
      resendId: (result as Record<string, unknown>).id,
    });
    return { sent: true, recipients, fromAddress };
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("[leads] notifyLeadReceived network error", {
      leadId: lead.id,
      error: msg,
    });
    return { sent: false, recipients, fromAddress, error: msg };
  }
}
