const SESSION_STORAGE_KEY = "loan-playbook-da-session-id";
const SESSION_COOKIE = "da_session_id";
const SESSION_MAX_AGE_DAYS = 30;

function randomSessionId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `da-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}=([^;]*)`),
  );
  return match ? decodeURIComponent(match[1]) : null;
}

function writeCookie(name: string, value: string) {
  if (typeof document === "undefined") return;
  const maxAge = SESSION_MAX_AGE_DAYS * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

/** Anonymous session id — no PII, used only for funnel analytics. */
export function getDealAnalyzerSessionId(): string {
  if (typeof window === "undefined") return "";

  try {
    const stored = localStorage.getItem(SESSION_STORAGE_KEY);
    if (stored) {
      writeCookie(SESSION_COOKIE, stored);
      return stored;
    }
  } catch {
    /* private mode */
  }

  const fromCookie = readCookie(SESSION_COOKIE);
  if (fromCookie) {
    try {
      localStorage.setItem(SESSION_STORAGE_KEY, fromCookie);
    } catch {
      /* ignore */
    }
    return fromCookie;
  }

  const id = randomSessionId();
  try {
    localStorage.setItem(SESSION_STORAGE_KEY, id);
  } catch {
    /* ignore */
  }
  writeCookie(SESSION_COOKIE, id);
  return id;
}
