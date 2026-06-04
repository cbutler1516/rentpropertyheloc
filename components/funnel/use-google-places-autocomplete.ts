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
  injectGooglePlacesPacStyles,
  isGooglePlacesReady,
  loadGoogleMapsScript,
} from "@/lib/leads/load-google-maps-script";
import {
  hasGooglePlaceAddressComponents,
  parseGooglePlace,
  type ParsedGooglePlace,
} from "@/lib/leads/parse-google-place";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

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

/**
 * Progressive enhancement: bind legacy Places Autocomplete to an input ref once.
 * Silent no-op when API key missing or script fails.
 */
export function useGooglePlacesAutocomplete(
  inputRef: React.RefObject<HTMLInputElement | null>,
  onPlaceSelected: (parsed: ParsedGooglePlace) => void,
) {
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const onPlaceSelectedRef = useRef(onPlaceSelected);
  onPlaceSelectedRef.current = onPlaceSelected;
  const [scriptReady, setScriptReady] = useState(false);

  useEffect(() => {
    const apiKey = getGooglePlacesApiKey();
    if (!apiKey) {
      placesDebugError("API key missing — set one of:", GOOGLE_PLACES_ENV_VAR_NAMES);
      return;
    }

    placesDebugLog("API key present", { envKey: getResolvedGooglePlacesEnvKey() });

    let cancelled = false;

    loadGoogleMapsScript(apiKey)
      .then(() => {
        if (!cancelled) setScriptReady(true);
      })
      .catch((error) => {
        placesDebugError("Google script failed", error);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useLayoutEffect(() => {
    if (!scriptReady) return;

    const input = inputRef.current;
    if (!input) {
      placesDebugWarn("autocomplete init skipped — input ref missing");
      return;
    }

    if (autocompleteRef.current) {
      placesDebugLog("autocomplete already initialized");
      return;
    }

    if (!isGooglePlacesReady()) {
      placesDebugError("autocomplete init skipped — google.maps.places unavailable");
      return;
    }

    try {
      injectGooglePlacesPacStyles();

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

        if (hasGooglePlaceAddressComponents(place)) {
          onPlaceSelectedRef.current(parseGooglePlace(place));
          return;
        }

        if (place.place_id) {
          fetchPlaceDetails(place.place_id, (detail) => {
            onPlaceSelectedRef.current(parseGooglePlace(detail));
          });
        }
      });

      autocompleteRef.current = ac;
      placesDebugLog("autocomplete initialized", { inputId: input.id });
    } catch (error) {
      placesDebugError("autocomplete init failed", error);
    }
  }, [scriptReady]);
}
