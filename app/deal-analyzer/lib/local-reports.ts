import type { StoredReportPayload } from "./supabase/types";

const LOCAL_REPORT_PREFIX = "loan-playbook-report-";

export function saveLocalReport(payload: StoredReportPayload): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      `${LOCAL_REPORT_PREFIX}${payload.slug}`,
      JSON.stringify(payload),
    );
  } catch {
    // quota — still allow navigation; report may not reload on new device
  }
}

export function loadLocalReport(slug: string): StoredReportPayload | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(`${LOCAL_REPORT_PREFIX}${slug}`);
    if (!raw) return null;
    return JSON.parse(raw) as StoredReportPayload;
  } catch {
    return null;
  }
}
