export type HubSpotSyncLogEntry = {
  at: string;
  success: boolean;
  contactId?: string;
  error?: string;
  skippedProperties?: string[];
};

export type HubSpotSyncLog = {
  lastSuccessAt: string | null;
  lastFailureAt: string | null;
  lastSuccess: HubSpotSyncLogEntry | null;
  lastFailure: HubSpotSyncLogEntry | null;
  lastTest: HubSpotSyncLogEntry | null;
};

let log: HubSpotSyncLog = {
  lastSuccessAt: null,
  lastFailureAt: null,
  lastSuccess: null,
  lastFailure: null,
  lastTest: null,
};

export function getHubSpotSyncLog(): HubSpotSyncLog {
  return log;
}

export function recordHubSpotSyncSuccess(entry: Omit<HubSpotSyncLogEntry, "success" | "at">): void {
  const full: HubSpotSyncLogEntry = { ...entry, success: true, at: new Date().toISOString() };
  log = {
    ...log,
    lastSuccessAt: full.at,
    lastSuccess: full,
  };
}

export function recordHubSpotSyncFailure(entry: Omit<HubSpotSyncLogEntry, "success" | "at">): void {
  const full: HubSpotSyncLogEntry = { ...entry, success: false, at: new Date().toISOString() };
  log = {
    ...log,
    lastFailureAt: full.at,
    lastFailure: full,
  };
}

export function recordHubSpotTestResult(entry: Omit<HubSpotSyncLogEntry, "at">): void {
  log = {
    ...log,
    lastTest: { ...entry, at: new Date().toISOString() },
    ...(entry.success
      ? { lastSuccessAt: new Date().toISOString(), lastSuccess: { ...entry, success: true, at: new Date().toISOString() } }
      : { lastFailureAt: new Date().toISOString(), lastFailure: { ...entry, success: false, at: new Date().toISOString() } }),
  };
}
