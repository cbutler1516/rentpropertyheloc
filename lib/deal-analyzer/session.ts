"use client";

import {
  DEAL_ANALYZER_LOCAL_REPORTS_KEY,
  DEAL_ANALYZER_SESSION_KEY,
} from "@/lib/deal-analyzer/constants";
import type { DealAnalyzerSession, FullDealAnalyzerReport } from "@/lib/deal-analyzer/types";

export function saveDealAnalyzerSession(session: DealAnalyzerSession): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(DEAL_ANALYZER_SESSION_KEY, JSON.stringify(session));
}

export function getDealAnalyzerSession(): DealAnalyzerSession | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(DEAL_ANALYZER_SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as DealAnalyzerSession;
  } catch {
    return null;
  }
}

export function clearDealAnalyzerSession(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(DEAL_ANALYZER_SESSION_KEY);
}

export function saveLocalReport(full: FullDealAnalyzerReport): void {
  if (typeof window === "undefined") return;
  const existing = getLocalReports();
  const map = new Map(existing.map((r) => [r.report.reportSlug, r]));
  map.set(full.report.reportSlug, full);
  localStorage.setItem(DEAL_ANALYZER_LOCAL_REPORTS_KEY, JSON.stringify(Array.from(map.values())));
}

export function getLocalReport(slug: string): FullDealAnalyzerReport | null {
  const reports = getLocalReports();
  return reports.find((r) => r.report.reportSlug === slug) ?? null;
}

export function getLocalReports(): FullDealAnalyzerReport[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(DEAL_ANALYZER_LOCAL_REPORTS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as FullDealAnalyzerReport[];
  } catch {
    return [];
  }
}

export function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "";
  const key = "tlp_da_session_id";
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = `da-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    sessionStorage.setItem(key, id);
  }
  return id;
}
