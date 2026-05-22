import { runComplianceScan } from "./compliance-scan";
import type { ComplianceScanRequest, ComplianceRecord } from "./types";

export function generateDemoComplianceScan(
  request: ComplianceScanRequest,
): ComplianceRecord {
  return runComplianceScan(request, "demo");
}
