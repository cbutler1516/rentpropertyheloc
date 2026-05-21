import { getCrmPushSecret, getGhlWebhookUrl, getZapierWebhookUrl } from "./env";
import { logCrmPush } from "./log";
import type { CrmWebhookPushResult, DealAnalyzerCrmReportPayload } from "./types";

function buildWebhookHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const secret = getCrmPushSecret();
  if (secret) {
    headers["X-Deal-Analyzer-CRM-Secret"] = secret;
    headers.Authorization = `Bearer ${secret}`;
  }
  return headers;
}

async function postToWebhook(
  provider: "ghl" | "zapier",
  url: string,
  payload: DealAnalyzerCrmReportPayload,
): Promise<CrmWebhookPushResult> {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: buildWebhookHeaders(),
      body: JSON.stringify({
        ...payload,
        crmProvider: provider,
        pushedAt: new Date().toISOString(),
      }),
    });

    const responseText = await response.text().catch(() => "");
    const externalId =
      response.headers.get("x-contact-id") ??
      response.headers.get("x-external-id") ??
      null;

    if (!response.ok) {
      logCrmPush("warn", "webhook_http_error", {
        provider,
        status: response.status,
        reportId: payload.reportId,
        slug: payload.reportSlug,
      });
      return {
        success: false,
        provider,
        message: `${provider} webhook returned ${response.status}.`,
        externalId,
        statusCode: response.status,
      };
    }

    logCrmPush("info", "webhook_success", {
      provider,
      reportId: payload.reportId,
      slug: payload.reportSlug,
      status: response.status,
    });

    return {
      success: true,
      provider,
      message:
        responseText && responseText.length < 120
          ? responseText
          : `Posted to ${provider} webhook.`,
      externalId,
      statusCode: response.status,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Webhook request failed.";
    logCrmPush("error", "webhook_exception", {
      provider,
      reportId: payload.reportId,
      error: message,
    });
    return {
      success: false,
      provider,
      message,
    };
  }
}

export async function pushPayloadToCrmWebhooks(
  payload: DealAnalyzerCrmReportPayload,
): Promise<CrmWebhookPushResult> {
  const ghlUrl = getGhlWebhookUrl();
  const zapierUrl = getZapierWebhookUrl();

  if (!ghlUrl && !zapierUrl) {
    return {
      success: false,
      provider: "none",
      message: "No CRM webhook URLs configured (GHL_WEBHOOK_URL / ZAPIER_WEBHOOK_URL).",
    };
  }

  if (ghlUrl) {
    const ghlResult = await postToWebhook("ghl", ghlUrl, payload);
    if (ghlResult.success) return ghlResult;
    logCrmPush("warn", "ghl_fallback_zapier", {
      reportId: payload.reportId,
      error: ghlResult.message,
    });
    if (zapierUrl) {
      return postToWebhook("zapier", zapierUrl, payload);
    }
    return ghlResult;
  }

  return postToWebhook("zapier", zapierUrl!, payload);
}
