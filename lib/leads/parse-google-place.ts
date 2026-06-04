export type ParsedGooglePlace = {
  street: string;
  city: string;
  state: string;
  zip: string;
  googlePlaceId: string;
  formattedAddress: string;
  latitude: number | null;
  longitude: number | null;
};

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

/** Parse legacy Places Autocomplete / getDetails result into funnel fields. */
export function parseGooglePlace(place: google.maps.places.PlaceResult): ParsedGooglePlace {
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

export function hasGooglePlaceAddressComponents(place: google.maps.places.PlaceResult): boolean {
  return Boolean(place.address_components && place.address_components.length > 0);
}
