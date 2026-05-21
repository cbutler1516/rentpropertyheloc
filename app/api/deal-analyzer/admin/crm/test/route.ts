import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/app/deal-analyzer/lib/admin/auth";
import { getCrmIntegrationStatus } from "@/app/deal-analyzer/lib/crm/env";
import { pushDealAnalyzerTestToCrm } from "@/app/deal-analyzer/lib/crm/push-report";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  return NextResponse.json({ status: getCrmIntegrationStatus() });
}

export async function POST() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const result = await pushDealAnalyzerTestToCrm();

  if (!result.success) {
    return NextResponse.json(
      { ...result, status: getCrmIntegrationStatus() },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ...result,
    status: getCrmIntegrationStatus(),
  });
}
