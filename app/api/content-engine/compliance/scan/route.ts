import { NextResponse } from "next/server";
import { generateDemoComplianceScan } from "@/app/content-engine/lib/generate-compliance-scan-fallback";
import type { ComplianceScanRequest } from "@/app/content-engine/lib/types";

export async function POST(request: Request) {
  let body: ComplianceScanRequest;
  try {
    body = (await request.json()) as ComplianceScanRequest;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body.title?.trim()) {
    return NextResponse.json({ error: "Package title is required." }, { status: 400 });
  }

  const hasAssets =
    Boolean(body.outputs) ||
    Boolean(body.campaignOutputs) ||
    Boolean(body.landingPage) ||
    Boolean(body.leadMagnet) ||
    Boolean(body.leadCapture);

  if (!hasAssets) {
    return NextResponse.json(
      { error: "No scannable content found on this package." },
      { status: 400 },
    );
  }

  const mode = process.env.OPENAI_API_KEY ? "ai" : "demo";
  const compliance = generateDemoComplianceScan(body);

  return NextResponse.json({
    compliance,
    mode: mode as "ai" | "demo",
  });
}
