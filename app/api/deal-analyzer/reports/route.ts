import {
  createDealAnalyzerReport,
  isDealAnalyzerPersistenceEnabled,
} from "@/lib/deal-analyzer/storage";
import {
  getConsentIp,
  getConsentUserAgent,
  parseCreateReportBody,
} from "@/lib/deal-analyzer/validate";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = parseCreateReportBody(body);
  if (!parsed.ok) {
    return NextResponse.json({ success: false, error: parsed.error }, { status: 400 });
  }

  const { data } = parsed;

  try {
    const { full, localOnly } = await createDealAnalyzerReport({
      lead: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: data.role,
        notes: data.notes,
        smsCallConsent: data.smsCallConsent,
        sessionId: data.sessionId,
        utmSource: data.utmSource,
        utmMedium: data.utmMedium,
        utmCampaign: data.utmCampaign,
        utmTerm: data.utmTerm,
        utmContent: data.utmContent,
      },
      dealType: data.dealType,
      inputs: data.inputs,
      analysis: data.analysis,
      consentIp: getConsentIp(request),
      consentUserAgent: getConsentUserAgent(request),
    });

    return NextResponse.json({
      success: true,
      reportSlug: full.report.reportSlug,
      localOnly,
      persistenceEnabled: isDealAnalyzerPersistenceEnabled(),
      report: localOnly ? full : undefined,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create report.";
    console.error("[deal-analyzer] create report failed", message);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
