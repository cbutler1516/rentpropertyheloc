"use client";

import {
  getGooglePlacesApiKey,
  GOOGLE_PLACES_ENV_VAR_NAMES,
  placesDebugError,
  placesDebugLog,
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
  useRef,
  useState,
} from "react";

declare global {
  interface Window {
    gm_authFailure?: () => void;
  }
}

export type PropertyAddressValue = {
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

export type PropertyAddressInputHandle = {
  validateForContinue: () =>
    | { ok: true; value: PropertyAddressValue }
    | { ok: false; message: string };
  getValue: () => PropertyAddressValue;
};

export type PropertyAddressInputProps = {
  initialAddress?: Partial<PropertyAddressValue>;
  onAddressChange?: (address: PropertyAddressValue) => void;
  className?: string;
};

const fieldClassName =
  "funnel-form-field h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-base text-navy-950 placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 sm:text-sm lg:text-base";

function buildMapsScriptUrl(apiKey: string): string {
  return `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&libraries=places&v=weekly`;
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

function placesReady(): boolean {
  return (
    typeof google !== "undefined" &&
    google.maps != null &&
    google.maps.places != null &&
    typeof google.maps.places.Autocomplete === "function"
  );
}

function isGoogleSelectionReady(value: PropertyAddressValue): boolean {
  return Boolean(
    value.addressText.trim() &&
      value.isPlaceSelected &&
      (value.placeId.trim() || value.formattedAddress.trim()),
  );
}

function isManualAddressComplete(value: PropertyAddressValue): boolean {
  return Boolean(
    value.addressText.trim() &&
      value.city.trim() &&
      value.state.trim().length >= 2 &&
      value.zip.trim(),
  );
}

function canContinueWithAddress(value: PropertyAddressValue): boolean {
  return isGoogleSelectionReady(value) || isManualAddressComplete(value);
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
      if (status !== google.maps.places.PlacesServiceStatus.OK || !detail) return;
      apply(detail);
    },
  );
}

function toValue(
  addressText: string,
  city: string,
  state: string,
  zip: string,
  placeId: string,
  formattedAddress: string,
  latitude: number | null,
  longitude: number | null,
  isPlaceSelected: boolean,
): PropertyAddressValue {
  return {
    addressText,
    city,
    state,
    zip,
    placeId,
    formattedAddress,
    latitude,
    longitude,
    isPlaceSelected,
  };
}

export const PropertyAddressInput = forwardRef<PropertyAddressInputHandle, PropertyAddressInputProps>(
  function PropertyAddressInput({ initialAddress, onAddressChange, className }, ref) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
    const onAddressChangeRef = useRef(onAddressChange);
    onAddressChangeRef.current = onAddressChange;

    const [addressText, setAddressText] = useState(initialAddress?.addressText ?? "");
    const [city, setCity] = useState(initialAddress?.city ?? "");
    const [state, setState] = useState(initialAddress?.state ?? "");
    const [zip, setZip] = useState(initialAddress?.zip ?? "");
    const [placeId, setPlaceId] = useState(initialAddress?.placeId ?? "");
    const [formattedAddress, setFormattedAddress] = useState(initialAddress?.formattedAddress ?? "");
    const [latitude, setLatitude] = useState<number | null>(initialAddress?.latitude ?? null);
    const [longitude, setLongitude] = useState<number | null>(initialAddress?.longitude ?? null);
    const [isPlaceSelected, setIsPlaceSelected] = useState(initialAddress?.isPlaceSelected ?? false);

    const [scriptLoaded, setScriptLoaded] = useState(false);
    const [scriptFailed, setScriptFailed] = useState(false);
    const [showManualFields, setShowManualFields] = useState(false);
    const [continueAttempted, setContinueAttempted] = useState(false);
    const [validationHint, setValidationHint] = useState<string | null>(null);

    function currentValue(): PropertyAddressValue {
      return toValue(
        addressText,
        city,
        state,
        zip,
        placeId,
        formattedAddress,
        latitude,
        longitude,
        isPlaceSelected,
      );
    }

    function applyParsedPlace(parsed: ReturnType<typeof parseGooglePlace>) {
      setAddressText(parsed.street);
      setCity(parsed.city);
      setState(parsed.state.toUpperCase());
      setZip(parsed.zip);
      setPlaceId(parsed.googlePlaceId);
      setFormattedAddress(parsed.formattedAddress);
      setLatitude(parsed.latitude);
      setLongitude(parsed.longitude);
      setIsPlaceSelected(true);
      setContinueAttempted(false);
      setValidationHint(null);

      const next = toValue(
        parsed.street,
        parsed.city,
        parsed.state.toUpperCase(),
        parsed.zip,
        parsed.googlePlaceId,
        parsed.formattedAddress,
        parsed.latitude,
        parsed.longitude,
        true,
      );
      onAddressChangeRef.current?.(next);

      if (!parsed.city || !parsed.state || !parsed.zip) {
        setShowManualFields(true);
        placesDebugLog("manual fallback opened — place missing city/state/zip");
      }

      placesDebugLog("place selected", {
        placeId: parsed.googlePlaceId,
        formattedAddress: parsed.formattedAddress,
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
      }
    }

    function clearPlaceSelection() {
      setIsPlaceSelected(false);
      setPlaceId("");
      setFormattedAddress("");
      setLatitude(null);
      setLongitude(null);
    }

    function handleAddressTextChange(next: string) {
      setAddressText(next);
      if (isPlaceSelected) {
        clearPlaceSelection();
      }
    }

    function openManualFallback() {
      setShowManualFields(true);
      placesDebugLog("manual fallback opened");
    }

    useImperativeHandle(ref, () => ({
      getValue: currentValue,
      validateForContinue: () => {
        setContinueAttempted(true);
        const value = currentValue();

        if (canContinueWithAddress(value)) {
          setValidationHint(null);
          return { ok: true as const, value };
        }

        setShowManualFields(true);

        const message =
          isGoogleSelectionReady(value) || isManualAddressComplete(value)
            ? "Complete all required address fields."
            : "Select an address from the suggestions or complete city, state, and ZIP.";

        setValidationHint(message);
        return { ok: false as const, message };
      },
    }));

    useEffect(() => {
      const apiKey = getGooglePlacesApiKey();
      if (!apiKey) {
        placesDebugError("Google key missing — set one of:", GOOGLE_PLACES_ENV_VAR_NAMES);
        setScriptFailed(true);
        return;
      }

      if (placesReady()) {
        placesDebugLog("Google script already loaded");
        setScriptLoaded(true);
        return;
      }

      const existingScript = document.querySelector<HTMLScriptElement>(
        'script[src*="maps.googleapis.com/maps/api/js"]',
      );

      const onReady = () => {
        if (placesReady()) {
          placesDebugLog("Google script loaded");
          setScriptLoaded(true);
        } else {
          placesDebugError("Google script loaded but Places library unavailable");
          setScriptFailed(true);
        }
      };

      const onFail = () => {
        placesDebugError("Google script failed");
        setScriptFailed(true);
      };

      const previousAuthFailure = window.gm_authFailure;
      window.gm_authFailure = () => {
        placesDebugError("Google script failed — auth failure");
        setScriptFailed(true);
        previousAuthFailure?.();
      };

      if (existingScript) {
        existingScript.addEventListener("load", onReady);
        existingScript.addEventListener("error", onFail);
        if (placesReady()) onReady();

        return () => {
          existingScript.removeEventListener("load", onReady);
          existingScript.removeEventListener("error", onFail);
          window.gm_authFailure = previousAuthFailure;
        };
      }

      const script = document.createElement("script");
      script.src = buildMapsScriptUrl(apiKey);
      script.async = true;
      script.defer = true;
      script.onload = onReady;
      script.onerror = onFail;
      document.head.appendChild(script);

      return () => {
        window.gm_authFailure = previousAuthFailure;
      };
    }, []);

    useEffect(() => {
      if (!scriptLoaded || scriptFailed) return;

      const input = inputRef.current;
      if (!input || autocompleteRef.current) return;
      if (!placesReady()) return;

      try {
        injectPacStyles();
        const ac = new google.maps.places.Autocomplete(input, {
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
        placesDebugLog("autocomplete initialized");
      } catch (error) {
        placesDebugError("autocomplete init failed", error);
        setScriptFailed(true);
      }

      return () => {
        if (autocompleteRef.current) {
          try {
            google.maps.event.clearInstanceListeners(autocompleteRef.current);
          } catch {
            // ignore cleanup errors
          }
          autocompleteRef.current = null;
        }
      };
    }, [scriptLoaded, scriptFailed]);

    const shouldShowManualFields =
      showManualFields ||
      scriptFailed ||
      (continueAttempted && !canContinueWithAddress(currentValue()));

    return (
      <div className={cn("space-y-3 sm:space-y-4", className)}>
        <div className="space-y-1.5">
          <label htmlFor="funnel-address-street" className="text-sm font-medium text-slate-700">
            Property address
          </label>
          <input
            ref={inputRef}
            id="funnel-address-street"
            type="text"
            name="property-address"
            value={addressText}
            onChange={(e) => handleAddressTextChange(e.target.value)}
            placeholder="Start typing an address…"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            className={cn(fieldClassName, "lg:h-[3.25rem]")}
          />
          <p className="text-[11px] leading-relaxed text-slate-500">
            Start typing and select your rental property from the list.
          </p>
          {scriptFailed ? (
            <p className="text-[11px] leading-relaxed text-slate-500">
              Can&apos;t find your address? Enter city, state, and ZIP manually.
            </p>
          ) : null}
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
            Can&apos;t find your address? Enter city, state, and ZIP manually.
          </button>
        )}

        {validationHint ? (
          <p className="text-sm text-red-600" role="alert">
            {validationHint}
          </p>
        ) : null}
      </div>
    );
  },
);

PropertyAddressInput.displayName = "PropertyAddressInput";
