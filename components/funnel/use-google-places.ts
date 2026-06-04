"use client";

import {
  getGooglePlacesApiKey,
  getResolvedGooglePlacesEnvKey,
  GOOGLE_PLACES_ENV_VAR_NAMES,
  placesDebugError,
  placesDebugLog,
  placesDebugWarn,
} from "@/lib/leads/google-places-config";
import {
  hasGooglePlaceAddressComponents,
  parseGooglePlace,
  type ParsedGooglePlace,
} from "@/lib/leads/parse-google-place";
import { useEffect, useRef, useState } from "react";

export type PlacesAddressData = ParsedGooglePlace;

export type PlacesStatus = "idle" | "loading" | "ready" | "error";

declare global {
  interface Window {
    gm_authFailure?: () => void;
  }
}

function injectPacStyles() {
  if (document.getElementById("pac-z-index-fix")) return;
  const style = document.createElement("style");
  style.id = "pac-z-index-fix";
  style.textContent = `
    .pac-container { z-index: 100000 !important; }
    .pac-container:empty { display: none !important; }
  `;
  document.head.appendChild(style);
}

function probePlacesApi() {
  try {
    const googleAvailable = typeof google !== "undefined";
    const googleMapsAvailable = googleAvailable && google.maps != null;
    const placesLibAvailable = googleMapsAvailable && google.maps.places != null;
    const autocompleteClassAvailable =
      placesLibAvailable && typeof google.maps.places.Autocomplete === "function";
    return { googleAvailable, googleMapsAvailable, placesLibAvailable, autocompleteClassAvailable };
  } catch {
    return {
      googleAvailable: false,
      googleMapsAvailable: false,
      placesLibAvailable: false,
      autocompleteClassAvailable: false,
    };
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Wait for legacy Places Autocomplete after script load (handles async bootstrap). */
async function ensurePlacesLibraryReady(maxAttempts = 25, delayMs = 100): Promise<boolean> {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const probe = probePlacesApi();
    if (probe.autocompleteClassAvailable) {
      placesDebugLog("Places library ready", { attempt });
      return true;
    }

    if (typeof google !== "undefined" && google.maps?.importLibrary) {
      try {
        await google.maps.importLibrary("places");
        if (probePlacesApi().autocompleteClassAvailable) {
          placesDebugLog("Places library ready via importLibrary", { attempt });
          return true;
        }
      } catch (error) {
        placesDebugWarn("importLibrary('places') attempt failed", { attempt, error });
      }
    }

    await sleep(delayMs);
  }

  return probePlacesApi().autocompleteClassAvailable;
}

function fetchPlaceDetails(placeId: string, onResult: (data: PlacesAddressData) => void) {
  const service = new google.maps.places.PlacesService(document.createElement("div"));
  service.getDetails(
    {
      placeId,
      fields: ["address_components", "place_id", "formatted_address", "geometry"],
    },
    (detail, status) => {
      if (status !== google.maps.places.PlacesServiceStatus.OK || !detail) {
        placesDebugError("getDetails failed", { placeId, status });
        return;
      }
      onResult(parseGooglePlace(detail));
    },
  );
}

function detachAutocomplete(instance: google.maps.places.Autocomplete | null) {
  if (!instance) return;
  try {
    google.maps.event.clearInstanceListeners(instance);
  } catch {
    // ignore cleanup errors
  }
}

function buildMapsScriptUrl(apiKey: string): string {
  return `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&libraries=places&v=weekly`;
}

export function useGooglePlaces(
  inputRef: React.RefObject<HTMLInputElement | null>,
  onSelect: (address: PlacesAddressData) => void,
) {
  const [status, setStatus] = useState<PlacesStatus>("idle");
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const initStartedRef = useRef(false);
  const onSelectRef = useRef(onSelect);
  const authFailedRef = useRef(false);
  onSelectRef.current = onSelect;

  useEffect(() => {
    if (initStartedRef.current) return;
    initStartedRef.current = true;

    const input = inputRef.current;
    if (!input) {
      placesDebugWarn("Street input ref not available on mount");
      return;
    }

    const apiKey = getGooglePlacesApiKey();
    if (!apiKey) {
      placesDebugError("Missing API key — set one of:", GOOGLE_PLACES_ENV_VAR_NAMES);
      setStatus("error");
      return;
    }

    placesDebugLog("API key present", { envKey: getResolvedGooglePlacesEnvKey() });

    const previousAuthFailure = window.gm_authFailure;
    window.gm_authFailure = () => {
      authFailedRef.current = true;
      detachAutocomplete(autocompleteRef.current);
      autocompleteRef.current = null;
      placesDebugError("Google Maps auth failed (gm_authFailure) — check key, billing, and HTTP referrer restrictions");
      setStatus("error");
      previousAuthFailure?.();
    };

    function deliverPlace(place: google.maps.places.PlaceResult) {
      if (hasGooglePlaceAddressComponents(place)) {
        onSelectRef.current(parseGooglePlace(place));
        return;
      }

      if (place.place_id) {
        fetchPlaceDetails(place.place_id, onSelectRef.current);
        return;
      }

      if (place.formatted_address?.trim()) {
        onSelectRef.current({
          street: place.formatted_address.split(",")[0]?.trim() ?? place.formatted_address,
          city: "",
          state: "",
          zip: "",
          googlePlaceId: "",
          formattedAddress: place.formatted_address.trim(),
          latitude: null,
          longitude: null,
        });
      }
    }

    function initAutocomplete(target: HTMLInputElement) {
      if (authFailedRef.current || autocompleteRef.current) return;

      const probe = probePlacesApi();
      if (!probe.autocompleteClassAvailable) {
        placesDebugError("Places library unavailable at autocomplete init", probe);
        setStatus("error");
        return;
      }

      try {
        injectPacStyles();
        const ac = new google.maps.places.Autocomplete(target, {
          componentRestrictions: { country: "us" },
          types: ["address"],
          fields: ["address_components", "place_id", "formatted_address", "geometry"],
        });

        ac.addListener("place_changed", () => {
          const place = ac.getPlace();
          if (!place.place_id && !place.formatted_address) return;
          deliverPlace(place);
        });

        autocompleteRef.current = ac;
        setStatus("ready");
        placesDebugLog("Autocomplete initialized", { inputId: target.id });
      } catch (error) {
        placesDebugError("Autocomplete init failed", error);
        setStatus("error");
      }
    }

    async function handleScriptLoaded(source: "existing" | "injected") {
      if (authFailedRef.current) {
        placesDebugError("Script load ignored — auth already failed");
        setStatus("error");
        return;
      }

      if (autocompleteRef.current) {
        placesDebugLog("Autocomplete already bound — skipping script load handler", { source });
        return;
      }

      placesDebugLog("Script load event", { source });
      setStatus((current) => (current === "ready" ? current : "loading"));

      const ready = await ensurePlacesLibraryReady();
      if (!ready) {
        placesDebugError("Places library unavailable after script load", probePlacesApi());
        setStatus("error");
        return;
      }

      if (inputRef.current && !autocompleteRef.current) {
        initAutocomplete(inputRef.current);
      }
    }

    const probe = probePlacesApi();
    if (probe.autocompleteClassAvailable) {
      placesDebugLog("Google Maps Places already loaded");
      initAutocomplete(input);
      return () => {
        window.gm_authFailure = previousAuthFailure;
        detachAutocomplete(autocompleteRef.current);
        autocompleteRef.current = null;
        initStartedRef.current = false;
      };
    }

    setStatus("loading");
    placesDebugLog("Loading Google Maps script", { libraries: "places", url: buildMapsScriptUrl("…") });

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src*="maps.googleapis.com/maps/api/js"]',
    );

    if (existingScript) {
      placesDebugLog("Reusing existing Google Maps script tag");

      if (probePlacesApi().autocompleteClassAvailable) {
        void handleScriptLoaded("existing");
      } else {
        const onLoaded = () => {
          void handleScriptLoaded("existing");
        };
        existingScript.addEventListener("load", onLoaded);
        void handleScriptLoaded("existing");
        return () => {
          existingScript.removeEventListener("load", onLoaded);
          window.gm_authFailure = previousAuthFailure;
          detachAutocomplete(autocompleteRef.current);
          autocompleteRef.current = null;
          initStartedRef.current = false;
        };
      }

      return () => {
        window.gm_authFailure = previousAuthFailure;
        detachAutocomplete(autocompleteRef.current);
        autocompleteRef.current = null;
        initStartedRef.current = false;
      };
    }

    const script = document.createElement("script");
    script.src = buildMapsScriptUrl(apiKey);
    script.async = true;
    script.defer = true;
    script.onload = () => {
      void handleScriptLoaded("injected");
    };
    script.onerror = (event) => {
      placesDebugError("Google Maps script failed to load — check key, billing, and referrer restrictions", event);
      setStatus("error");
    };
    document.head.appendChild(script);

    return () => {
      window.gm_authFailure = previousAuthFailure;
      detachAutocomplete(autocompleteRef.current);
      autocompleteRef.current = null;
      initStartedRef.current = false;
    };
    // Init once when the address input mounts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { status };
}
