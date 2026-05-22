import { defaultSession } from "./defaults";
import { normalizeLeadRecord } from "./lead-quality";
import type { CcmSession } from "./types";

const STORAGE_KEY = "ccm-session-v1";

export function loadCcmSession(): CcmSession {
  if (typeof window === "undefined") return defaultSession;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultSession;
    const parsed = JSON.parse(raw) as Partial<CcmSession>;
    return {
      ...defaultSession,
      ...parsed,
      intake: { ...defaultSession.intake, ...parsed.intake },
      leads: (parsed.leads ?? []).map((lead) => normalizeLeadRecord(lead)),
    };
  } catch {
    return defaultSession;
  }
}

export function saveCcmSession(session: CcmSession): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch {
    // ignore quota / private mode
  }
}

export function clearCcmSession(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
