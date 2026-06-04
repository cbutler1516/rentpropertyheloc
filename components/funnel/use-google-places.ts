"use client";

import { getGooglePlacesApiKey } from "@/lib/leads/google-places-config";
import { useEffect, useRef, useState } from "react";

export type PlacesAddressData = {
  street: string;
  city: string;
  state: string;
  zip: string;
  googlePlaceId: string;
  formattedAddress: string;
  latitude: number | null;
  longitude: number | null;
};

export type PlacesStatus = "idle" | "loading" | "ready" | "error";

function injectPacStyles() {
  if (document.getElementById("pac-z-index-fix")) return;
  const style = document.createElement("style");
  style.id = "pac-z-index-fix";
  style.textContent = ".pac-container{z-index:100000!important}";
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

function getComponent(
  components: google.maps.GeocoderAddressComponent[],
  type: string,
  nameType: "long_name" | "short_name" = "long_name",
): string {
  return components.find((c) => c.types.includes(type))?.[nameType] ?? "";
}

function getCityFromComponents(components: google.maps.GeocoderAddressComponent[]): string {
  return (
    getComponent(components, "locality") ||
    getComponent(components, "postal_town") ||
    getComponent(components, "sublocality") ||
    getComponent(components, "sublocality_level_1") ||
    getComponent(components, "administrative_area_level_2")
  );
}

export function parsePlace(place: google.maps.places.PlaceResult): PlacesAddressData {
  const components = place.address_components ?? [];
  const streetNumber = getComponent(components, "street_number");
  const route = getComponent(components, "route");
  const lat = place.geometry?.location?.lat();
  const lng = place.geometry?.location?.lng();
  const formattedAddress = place.formatted_address?.trim() ?? "";

  let street = [streetNumber, route].filter(Boolean).join(" ");
  if (!street && route) street = route;
  if (!street && formattedAddress) {
    street = formattedAddress.split(",")[0]?.trim() ?? "";
  }

  return {
    street,
    city: getCityFromComponents(components),
    state: getComponent(components, "administrative_area_level_1", "short_name"),
    zip: getComponent(components, "postal_code"),
    googlePlaceId: place.place_id ?? "",
    formattedAddress,
    latitude: typeof lat === "number" && Number.isFinite(lat) ? lat : null,
    longitude: typeof lng === "number" && Number.isFinite(lng) ? lng : null,
  };
}

function hasAddressComponents(place: google.maps.places.PlaceResult): boolean {
  return Boolean(place.address_components && place.address_components.length > 0);
}

function fetchPlaceDetails(placeId: string, onResult: (data: PlacesAddressData) => void) {
  const service = new google.maps.places.PlacesService(document.createElement("div"));
  service.getDetails(
    {
      placeId,
      fields: ["address_components", "place_id", "formatted_address", "geometry"],
    },
    (detail, status) => {
      if (status !== google.maps.places.PlacesServiceStatus.OK || !detail) return;
      onResult(parsePlace(detail));
    },
  );
}

export function useGooglePlaces(
  inputElement: HTMLInputElement | null,
  onSelect: (address: PlacesAddressData) => void,
) {
  const [status, setStatus] = useState<PlacesStatus>("idle");
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  useEffect(() => {
    if (!inputElement) return;

    const apiKey = getGooglePlacesApiKey();
    if (!apiKey) {
      console.warn(
        "[places] No API key — set NEXT_PUBLIC_GOOGLE_PLACES_API_KEY or NEXT_PUBLIC_GOOGLE_MAPS_API_KEY",
      );
      setStatus("error");
      return;
    }

    const input = inputElement;

    function deliverPlace(place: google.maps.places.PlaceResult) {
      if (hasAddressComponents(place)) {
        onSelectRef.current(parsePlace(place));
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
      if (autocompleteRef.current) return;
      const probe = probePlacesApi();
      if (!probe.autocompleteClassAvailable) {
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
      } catch (error) {
        console.error("[places] Autocomplete init failed", error);
        setStatus("error");
      }
    }

    function handleScriptLoaded() {
      const probe = probePlacesApi();
      if (!probe.autocompleteClassAvailable) {
        setStatus("error");
        return;
      }
      initAutocomplete(input);
    }

    const probe = probePlacesApi();
    if (probe.autocompleteClassAvailable) {
      initAutocomplete(input);
      return () => {
        autocompleteRef.current = null;
      };
    }

    setStatus("loading");
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src*="maps.googleapis.com/maps/api/js"]',
    );

    if (existingScript) {
      if (probePlacesApi().autocompleteClassAvailable) {
        handleScriptLoaded();
      } else {
        existingScript.addEventListener("load", handleScriptLoaded);
        return () => {
          existingScript.removeEventListener("load", handleScriptLoaded);
          autocompleteRef.current = null;
        };
      }
      return () => {
        autocompleteRef.current = null;
      };
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&v=weekly`;
    script.async = true;
    script.defer = true;
    script.onload = handleScriptLoaded;
    script.onerror = () => setStatus("error");
    document.head.appendChild(script);

    return () => {
      autocompleteRef.current = null;
    };
  }, [inputElement]);

  return { status };
}
