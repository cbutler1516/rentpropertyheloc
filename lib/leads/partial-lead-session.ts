const STORAGE_KEY = "rph_partial_session_id";
const LOCAL_PROGRESS_KEY = "rph_partial_funnel_progress";

export function getOrCreatePartialSessionId(): string {
  if (typeof window === "undefined") return "";

  try {
    const existing = window.localStorage.getItem(STORAGE_KEY);
    if (existing && existing.length >= 8) return existing;

    const id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `sess-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

    window.localStorage.setItem(STORAGE_KEY, id);
    return id;
  } catch {
    return `sess-${Date.now()}`;
  }
}

export function clearPartialSessionProgress(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(LOCAL_PROGRESS_KEY);
  } catch {
    // ignore
  }
}

export function savePartialProgressLocally(payload: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      LOCAL_PROGRESS_KEY,
      JSON.stringify({ ...payload, updatedAt: new Date().toISOString() }),
    );
  } catch {
    // ignore quota errors
  }
}
