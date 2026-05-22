import type { LaunchPackPersistedState, OutreachRow } from "./launch-pack-types";

const STORAGE_KEY = "loan-playbook-da-launch-pack";
export const OUTREACH_SLOT_COUNT = 10;

function createEmptyOutreachRow(index: number): OutreachRow {
  return {
    id: `slot-${index + 1}`,
    agentName: "",
    agentSlug: "",
    status: "not_started",
    linkCopied: false,
    invitedDate: "",
    notes: "",
  };
}

export function createDefaultLaunchPackState(): LaunchPackPersistedState {
  return {
    launchNotes: "",
    outreach: Array.from({ length: OUTREACH_SLOT_COUNT }, (_, i) =>
      createEmptyOutreachRow(i),
    ),
    testLinksChecked: {},
    updatedAt: new Date().toISOString(),
  };
}

export function loadLaunchPackState(): LaunchPackPersistedState {
  if (typeof window === "undefined") return createDefaultLaunchPackState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createDefaultLaunchPackState();
    const parsed = JSON.parse(raw) as LaunchPackPersistedState;
    const outreach = [...(parsed.outreach ?? [])];
    while (outreach.length < OUTREACH_SLOT_COUNT) {
      outreach.push(createEmptyOutreachRow(outreach.length));
    }
    return {
      launchNotes: parsed.launchNotes ?? "",
      outreach: outreach.slice(0, OUTREACH_SLOT_COUNT),
      testLinksChecked: parsed.testLinksChecked ?? {},
      updatedAt: parsed.updatedAt ?? new Date().toISOString(),
    };
  } catch {
    return createDefaultLaunchPackState();
  }
}

export function saveLaunchPackState(state: LaunchPackPersistedState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...state, updatedAt: new Date().toISOString() }),
    );
  } catch {
    /* quota */
  }
}

export function downloadTextFile(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}
