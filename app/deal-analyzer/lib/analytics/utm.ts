import type { DealAnalyzerUtm } from "./types";

const UTM_STORAGE_KEY = "loan-playbook-da-utm";

const UTM_PARAM_KEYS = [
  ["utm_source", "utmSource"],
  ["utm_medium", "utmMedium"],
  ["utm_campaign", "utmCampaign"],
  ["utm_term", "utmTerm"],
  ["utm_content", "utmContent"],
] as const;

export function parseUtmFromSearchParams(
  params: URLSearchParams,
): DealAnalyzerUtm | null {
  const utm: DealAnalyzerUtm = {};
  let hasAny = false;

  for (const [param, key] of UTM_PARAM_KEYS) {
    const value = params.get(param)?.trim();
    if (value) {
      utm[key] = value;
      hasAny = true;
    }
  }

  return hasAny ? utm : null;
}

export function captureUtmFromUrl(url?: string): DealAnalyzerUtm | null {
  if (typeof window === "undefined") return null;
  try {
    const parsed = new URL(url ?? window.location.href);
    const incoming = parseUtmFromSearchParams(parsed.searchParams);
    if (!incoming) return getStoredUtm();

    sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(incoming));
    return incoming;
  } catch {
    return getStoredUtm();
  }
}

export function getStoredUtm(): DealAnalyzerUtm | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(UTM_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as DealAnalyzerUtm;
  } catch {
    return null;
  }
}

export function utmToDbColumns(utm: DealAnalyzerUtm | null | undefined) {
  if (!utm) {
    return {
      utm_source: null,
      utm_medium: null,
      utm_campaign: null,
      utm_term: null,
      utm_content: null,
    };
  }
  return {
    utm_source: utm.utmSource ?? null,
    utm_medium: utm.utmMedium ?? null,
    utm_campaign: utm.utmCampaign ?? null,
    utm_term: utm.utmTerm ?? null,
    utm_content: utm.utmContent ?? null,
  };
}
