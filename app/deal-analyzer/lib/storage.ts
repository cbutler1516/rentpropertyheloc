import type { DealAnalyzerSession } from "./types";
import { defaultSession } from "./types";

const STORAGE_KEY = "loan-playbook-deal-analyzer";

export function loadSession(): DealAnalyzerSession {
  if (typeof window === "undefined") return defaultSession;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultSession;
    return { ...defaultSession, ...JSON.parse(raw) } as DealAnalyzerSession;
  } catch {
    return defaultSession;
  }
}

export function saveSession(session: DealAnalyzerSession): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch {
    // ignore quota errors in v1
  }
}

export function clearSession(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(STORAGE_KEY);
}
