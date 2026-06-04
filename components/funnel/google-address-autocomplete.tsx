/** Not used in live funnel — shared loader: lib/leads/load-google-maps-script.ts */
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
} from "@/lib/leads/parse-google-place";
import { cn } from "@/lib/cn";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

declare global {
  interface Window {
    gm_authFailure?: () => void;
  }
}

export type GoogleAddressValue = {
  addressText: string;
  city: string;
  state: string;
  zip: string;
  placeId: string;
  formattedAddress: string;
  latitude: number | null;
  longitude: number | null;
  isPlaceSelected: boolean;
};

export type GoogleAddressAutocompleteHandle = {
  validateForContinue: () =>
    | { ok: true; value: GoogleAddressValue }
    | { ok: false; message: string };
  getValue: () => GoogleAddressValue;
};

export type GoogleAddressAutocompleteProps = {
  initialAddress?: Partial<GoogleAddressValue>;
  onAddressSelected?: (address: GoogleAddressValue) => void;
  className?: string;
};

const fieldClassName =
  "funnel-form-field h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-base text-navy-950 placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 sm:text-sm lg:text-base";

const VALIDATION_MESSAGE =
  "Please select your address from the list or enter city, state, and ZIP manually.";

function buildMapsScriptUrl(apiKey: string): string {
  return `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&libraries=places&v=weekly`;
}

function injectPacStyles() {
  if (document.getElementById("pac-z-index-fix")) return;
  const style = document.createElement("style");
  style.id = "pac-z-index-fix";
  style.textContent = `.pac-container { z-index: 100000 !important; }`;
  document.head.appendChild(style);
}

function placesReady(): boolean {
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
    if (placesReady()) {
      placesDebugLog("google.maps.places available", { attempt });
      return true;
    }

    if (typeof google !== "undefined" && google.maps?.importLibrary) {
      try {
        await google.maps.importLibrary("places");
        if (placesReady()) {
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

function loadGoogleMapsScript(apiKey: string): Promise<void> {
  if (placesReady()) {
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
      if (placesReady()) {
        resolveWhenReady();
      }
      return;
    }

    const script = document.createElement("script");
    script.src = buildMapsScriptUrl(apiKey);
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

function fetchPlaceDetails(
  placeId: string,
  apply: (place: google.maps.places.PlaceResult) => void,
) {
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
      apply(detail);
    },
  );
}

function isGoogleSelectionReady(value: GoogleAddressValue): boolean {
  return Boolean(
    value.addressText.trim() &&
      value.isPlaceSelected &&
      (value.placeId.trim() || value.formattedAddress.trim()),
  );
}

function isManualAddressComplete(value: GoogleAddressValue): boolean {
  return Boolean(
    value.addressText.trim() &&
      value.city.trim() &&
      value.state.trim().length >= 2 &&
      value.zip.trim(),
  );
}

function canContinueWithAddress(value: GoogleAddressValue): boolean {
  return isGoogleSelectionReady(value) || isManualAddressComplete(value);
}

export const GoogleAddressAutocomplete = forwardRef<
  GoogleAddressAutocompleteHandle,
  GoogleAddressAutocompleteProps
>(function GoogleAddressAutocomplete(
  { initialAddress, onAddressSelected, className },
  ref,
) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const isPlaceSelectedRef = useRef(initialAddress?.isPlaceSelected ?? false);
  const onAddressSelectedRef = useRef(onAddressSelected);
  onAddressSelectedRef.current = onAddressSelected;

  const placeRef = useRef({
    placeId: initialAddress?.placeId ?? "",
    formattedAddress: initialAddress?.formattedAddress ?? "",
    latitude: initialAddress?.latitude ?? null,
    longitude: initialAddress?.longitude ?? null,
  });

  const [city, setCity] = useState(initialAddress?.city ?? "");
  const [state, setState] = useState(initialAddress?.state ?? "");
  const [zip, setZip] = useState(initialAddress?.zip ?? "");
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [scriptFailed, setScriptFailed] = useState(false);
  const [manualFallbackOpen, setManualFallbackOpen] = useState(true);
  const [continueAttempted, setContinueAttempted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function readStreetFromInput(): string {
    return inputRef.current?.value.trim() ?? "";
  }

  function buildValue(): GoogleAddressValue {
    return {
      addressText: readStreetFromInput(),
      city,
      state,
      zip,
      placeId: placeRef.current.placeId,
      formattedAddress: placeRef.current.formattedAddress,
      latitude: placeRef.current.latitude,
      longitude: placeRef.current.longitude,
      isPlaceSelected: isPlaceSelectedRef.current,
    };
  }

  function clearPlaceSelection() {
    isPlaceSelectedRef.current = false;
    placeRef.current = {
      placeId: "",
      formattedAddress: "",
      latitude: null,
      longitude: null,
    };
  }

  function applyParsedPlace(parsed: ReturnType<typeof parseGooglePlace>) {
    if (inputRef.current) {
      inputRef.current.value = parsed.street;
    }

    setCity(parsed.city);
    setState(parsed.state.toUpperCase());
    setZip(parsed.zip);
    isPlaceSelectedRef.current = true;
    placeRef.current = {
      placeId: parsed.googlePlaceId,
      formattedAddress: parsed.formattedAddress,
      latitude: parsed.latitude,
      longitude: parsed.longitude,
    };
    setContinueAttempted(false);
    setError(null);
    setManualFallbackOpen(true);

    const next: GoogleAddressValue = {
      addressText: parsed.street,
      city: parsed.city,
      state: parsed.state.toUpperCase(),
      zip: parsed.zip,
      placeId: parsed.googlePlaceId,
      formattedAddress: parsed.formattedAddress,
      latitude: parsed.latitude,
      longitude: parsed.longitude,
      isPlaceSelected: true,
    };

    onAddressSelectedRef.current?.(next);
    placesDebugLog("place selected", {
      placeId: parsed.googlePlaceId,
      formattedAddress: parsed.formattedAddress,
      city: parsed.city,
      state: parsed.state,
      zip: parsed.zip,
    });
  }

  function deliverPlace(place: google.maps.places.PlaceResult) {
    if (hasGooglePlaceAddressComponents(place)) {
      applyParsedPlace(parseGooglePlace(place));
      return;
    }

    if (place.place_id) {
      fetchPlaceDetails(place.place_id, (detail) => {
        applyParsedPlace(parseGooglePlace(detail));
      });
      return;
    }

    placesDebugWarn("place_changed without place_id or address_components", place);
  }

  function handleStreetInput() {
    if (isPlaceSelectedRef.current || placeRef.current.placeId || placeRef.current.formattedAddress) {
      clearPlaceSelection();
    }
  }

  function openManualFallback() {
    setManualFallbackOpen(true);
    placesDebugLog("manual fallback opened");
  }

  useImperativeHandle(ref, () => ({
    getValue: buildValue,
    validateForContinue: () => {
      setContinueAttempted(true);
      const value = buildValue();

      if (canContinueWithAddress(value)) {
        setError(null);
        return { ok: true as const, value };
      }

      setManualFallbackOpen(true);
      setError(VALIDATION_MESSAGE);
      return { ok: false as const, message: VALIDATION_MESSAGE };
    },
  }));

  useEffect(() => {
    const value = buildValue();
    if (canContinueWithAddress(value)) {
      setError(null);
    }
  }, [city, state, zip]);

  useEffect(() => {
    const apiKey = getGooglePlacesApiKey();
    if (!apiKey) {
      placesDebugError("API key missing — set one of:", GOOGLE_PLACES_ENV_VAR_NAMES);
      setScriptFailed(true);
      return;
    }

    placesDebugLog("API key present", { envKey: getResolvedGooglePlacesEnvKey() });

    let cancelled = false;

    loadGoogleMapsScript(apiKey)
      .then(() => {
        if (!cancelled) setScriptLoaded(true);
      })
      .catch((loadError) => {
        placesDebugError("Google script failed", loadError);
        if (!cancelled) setScriptFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useLayoutEffect(() => {
    if (!scriptLoaded || scriptFailed) return;

    const input = inputRef.current;
    if (!input) {
      placesDebugWarn("autocomplete init skipped — input ref missing");
      return;
    }

    if (autocompleteRef.current) {
      placesDebugLog("autocomplete already initialized");
      return;
    }

    if (!placesReady()) {
      placesDebugError("autocomplete init skipped — google.maps.places unavailable");
      setScriptFailed(true);
      return;
    }

    try {
      injectPacStyles();
      const ac = new google.maps.places.Autocomplete(input, {
        types: ["address"],
        componentRestrictions: { country: "us" },
        fields: ["address_components", "formatted_address", "place_id", "geometry"],
      });

      ac.addListener("place_changed", () => {
        placesDebugLog("place_changed fired");
        const place = ac.getPlace();
        placesDebugLog("place_changed result", {
          placeId: place.place_id,
          formattedAddress: place.formatted_address,
          hasComponents: Boolean(place.address_components?.length),
        });

        if (!place.place_id && !place.formatted_address) {
          placesDebugWarn("place_changed without place_id — select a suggestion from the list");
          return;
        }

        deliverPlace(place);
      });

      autocompleteRef.current = ac;
      placesDebugLog("autocomplete initialized", { inputId: input.id });
    } catch (initError) {
      placesDebugError("autocomplete init failed", initError);
      setScriptFailed(true);
    }
  }, [scriptLoaded, scriptFailed]);

  const shouldShowManualFields =
    manualFallbackOpen ||
    scriptFailed ||
    (continueAttempted && !canContinueWithAddress(buildValue()));

  return (
    <div className={cn("space-y-3 sm:space-y-4", className)}>
      <div className="relative z-0 space-y-1.5">
        <label htmlFor="funnel-address-street" className="text-sm font-medium text-slate-700">
          Property address
        </label>
        <input
          ref={inputRef}
          id="funnel-address-street"
          type="text"
          name="property-address"
          defaultValue={initialAddress?.addressText ?? ""}
          onInput={handleStreetInput}
          placeholder="Start typing an address…"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          className={cn(fieldClassName, "lg:h-[3.25rem]")}
        />
        <p className="text-[11px] leading-relaxed text-slate-500">
          Start typing and select your rental property from the list.
        </p>
      </div>

      {shouldShowManualFields ? (
        <div className="space-y-3 rounded-xl border border-slate-200/90 bg-slate-50/60 p-3.5 sm:p-4">
          <p className="text-xs font-medium text-slate-600">City, state, and ZIP</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="col-span-2 space-y-1.5 sm:col-span-1">
              <label htmlFor="funnel-address-city" className="text-sm font-medium text-slate-700">
                City
              </label>
              <input
                id="funnel-address-city"
                type="text"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  clearPlaceSelection();
                }}
                autoComplete="address-level2"
                className={fieldClassName}
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="funnel-address-state" className="text-sm font-medium text-slate-700">
                State
              </label>
              <input
                id="funnel-address-state"
                type="text"
                value={state}
                onChange={(e) => {
                  setState(e.target.value.toUpperCase().slice(0, 2));
                  clearPlaceSelection();
                }}
                autoComplete="address-level1"
                maxLength={2}
                placeholder="WA"
                className={cn(fieldClassName, "uppercase")}
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="funnel-address-zip" className="text-sm font-medium text-slate-700">
                ZIP
              </label>
              <input
                id="funnel-address-zip"
                type="text"
                value={zip}
                onChange={(e) => {
                  setZip(e.target.value.replace(/[^\d-]/g, "").slice(0, 10));
                  clearPlaceSelection();
                }}
                autoComplete="postal-code"
                inputMode="numeric"
                maxLength={10}
                placeholder="98101"
                className={fieldClassName}
              />
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={openManualFallback}
          className="text-sm font-medium text-teal-700 underline-offset-2 hover:underline"
        >
          Enter address manually
        </button>
      )}

      {error ? (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
});

GoogleAddressAutocomplete.displayName = "GoogleAddressAutocomplete";
