import {
  placesDebugError,
  placesDebugLog,
  placesDebugWarn,
} from "@/lib/leads/google-places-config";

declare global {
  interface Window {
    gm_authFailure?: () => void;
  }
}

export function buildGoogleMapsScriptUrl(apiKey: string): string {
  return `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&libraries=places&v=weekly`;
}

export function isGooglePlacesReady(): boolean {
  return (
    typeof google !== "undefined" &&
    google.maps != null &&
    google.maps.places != null &&
    typeof google.maps.places.Autocomplete === "function"
  );
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForPlacesReady(maxAttempts = 40, delayMs = 100): Promise<boolean> {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    if (isGooglePlacesReady()) {
      placesDebugLog("google.maps.places available", { attempt });
      return true;
    }

    if (typeof google !== "undefined" && google.maps?.importLibrary) {
      try {
        await google.maps.importLibrary("places");
        if (isGooglePlacesReady()) {
          placesDebugLog("google.maps.places available via importLibrary", { attempt });
          return true;
        }
      } catch (error) {
        placesDebugWarn("importLibrary(places) failed", { attempt, error });
      }
    }

    await sleep(delayMs);
  }

  placesDebugError("google.maps.places missing after wait", { maxAttempts });
  return false;
}

let mapsScriptPromise: Promise<void> | null = null;

/** Load Google Maps JS once with Places library. Rejects if unavailable. */
export function loadGoogleMapsScript(apiKey: string): Promise<void> {
  if (isGooglePlacesReady()) {
    placesDebugLog("Google script already loaded");
    return Promise.resolve();
  }

  if (mapsScriptPromise) {
    return mapsScriptPromise;
  }

  placesDebugLog("Google script loading", { libraries: "places" });

  mapsScriptPromise = new Promise<void>((resolve, reject) => {
    const resolveWhenReady = () => {
      void waitForPlacesReady().then((ready) => {
        if (ready) {
          placesDebugLog("Google script loaded");
          resolve();
          return;
        }
        placesDebugError("Google script loaded but google.maps.places unavailable");
        reject(new Error("Places library unavailable"));
      });
    };

    const rejectWithError = (message: string) => {
      placesDebugError("Google script error", message);
      reject(new Error(message));
    };

    const previousAuthFailure = window.gm_authFailure;
    window.gm_authFailure = () => {
      rejectWithError("Google Maps auth failure");
      previousAuthFailure?.();
    };

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src*="maps.googleapis.com/maps/api/js"]',
    );

    if (existingScript) {
      placesDebugLog("Reusing existing Google Maps script tag");
      existingScript.addEventListener("load", resolveWhenReady, { once: true });
      existingScript.addEventListener("error", () => rejectWithError("Script load error"), {
        once: true,
      });
      if (isGooglePlacesReady()) {
        resolveWhenReady();
      }
      return;
    }

    const script = document.createElement("script");
    script.src = buildGoogleMapsScriptUrl(apiKey);
    script.async = true;
    script.defer = true;
    script.onload = resolveWhenReady;
    script.onerror = () => rejectWithError("Script load error");
    document.head.appendChild(script);
  }).catch((error: unknown) => {
    mapsScriptPromise = null;
    throw error;
  });

  return mapsScriptPromise;
}

export function injectGooglePlacesPacStyles() {
  if (document.getElementById("pac-z-index-fix")) return;
  const style = document.createElement("style");
  style.id = "pac-z-index-fix";
  style.textContent = `.pac-container { z-index: 100000 !important; }`;
  document.head.appendChild(style);
}
