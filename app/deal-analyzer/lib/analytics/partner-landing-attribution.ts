const PARTNER_LANDING_KEY = "loan-playbook-da-partner-landing";

export type PartnerLandingAttribution = {
  slug: string;
  path: string;
  agentSlug: string;
};

export function storePartnerLandingAttribution(
  input: PartnerLandingAttribution,
): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(PARTNER_LANDING_KEY, JSON.stringify(input));
  } catch {
    /* ignore */
  }
}

export function getPartnerLandingAttribution(): PartnerLandingAttribution | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(PARTNER_LANDING_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PartnerLandingAttribution;
  } catch {
    return null;
  }
}
