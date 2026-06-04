/** Primary env var — set this on Vercel for production autocomplete. */
export const GOOGLE_PLACES_PRIMARY_ENV_KEY = "NEXT_PUBLIC_GOOGLE_PLACES_API_KEY" as const;

/** Fallback env var — also supported for older deployments. */
export const GOOGLE_PLACES_FALLBACK_ENV_KEY = "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY" as const;

/** Env var names accepted by getGooglePlacesApiKey (Vercel must use one of these). */
export const GOOGLE_PLACES_ENV_VAR_NAMES = [
  GOOGLE_PLACES_PRIMARY_ENV_KEY,
  GOOGLE_PLACES_FALLBACK_ENV_KEY,
] as const;

const isDev = process.env.NODE_ENV === "development";

/** Supports either env var name used across deployments. */
export function getGooglePlacesApiKey(): string | undefined {
  return (
    process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY?.trim() ||
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim() ||
    undefined
  );
}

/** Which env var supplied the key (for dev diagnostics). */
export function getResolvedGooglePlacesEnvKey(): (typeof GOOGLE_PLACES_ENV_VAR_NAMES)[number] | null {
  if (process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY?.trim()) {
    return GOOGLE_PLACES_PRIMARY_ENV_KEY;
  }
  if (process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim()) {
    return GOOGLE_PLACES_FALLBACK_ENV_KEY;
  }
  return null;
}

export function placesDebugLog(message: string, detail?: unknown): void {
  if (!isDev) return;
  if (detail !== undefined) {
    console.info(`[places] ${message}`, detail);
  } else {
    console.info(`[places] ${message}`);
  }
}

export function placesDebugWarn(message: string, detail?: unknown): void {
  if (!isDev) return;
  if (detail !== undefined) {
    console.warn(`[places] ${message}`, detail);
  } else {
    console.warn(`[places] ${message}`);
  }
}

export function placesDebugError(message: string, detail?: unknown): void {
  if (!isDev) return;
  if (detail !== undefined) {
    console.error(`[places] ${message}`, detail);
  } else {
    console.error(`[places] ${message}`);
  }
}
