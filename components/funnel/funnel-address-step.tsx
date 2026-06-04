"use client";

import {
  GoogleAddressAutocomplete,
  type GoogleAddressAutocompleteHandle,
  type GoogleAddressValue,
} from "@/components/funnel/google-address-autocomplete";
import { Button } from "@/components/ui/button";
import type { LeadFunnelData } from "@/lib/leads/types";
import { useRef } from "react";

type FunnelAddressStepProps = {
  data: LeadFunnelData;
  onChange: (partial: Partial<LeadFunnelData>) => void;
  onContinue: () => void;
};

function toLeadPartial(address: GoogleAddressValue): Partial<LeadFunnelData> {
  return {
    propertyStreet: address.addressText,
    propertyCity: address.city,
    propertyState: address.state,
    propertyZip: address.zip,
    googlePlaceId: address.placeId,
    propertyFormattedAddress: address.formattedAddress,
    propertyLatitude: address.latitude,
    propertyLongitude: address.longitude,
  };
}

function fromLeadData(data: LeadFunnelData): Partial<GoogleAddressValue> {
  return {
    addressText: data.propertyStreet,
    city: data.propertyCity,
    state: data.propertyState,
    zip: data.propertyZip,
    placeId: data.googlePlaceId,
    formattedAddress: data.propertyFormattedAddress,
    latitude: data.propertyLatitude,
    longitude: data.propertyLongitude,
    isPlaceSelected: Boolean(data.googlePlaceId || data.propertyFormattedAddress),
  };
}

export function FunnelAddressStep({ data, onChange, onContinue }: FunnelAddressStepProps) {
  const addressRef = useRef<GoogleAddressAutocompleteHandle>(null);

  function handleAddressSelected(address: GoogleAddressValue) {
    onChange(toLeadPartial(address));
  }

  function handleContinueClick() {
    const result = addressRef.current?.validateForContinue();
    if (!result || !result.ok) return;

    onChange(toLeadPartial(result.value));
    onContinue();
  }

  return (
    <div className="space-y-4">
      <GoogleAddressAutocomplete
        ref={addressRef}
        initialAddress={fromLeadData(data)}
        onAddressSelected={handleAddressSelected}
      />

      <Button
        type="button"
        size="lg"
        className="thumb-btn h-12 w-full text-base sm:max-w-md lg:max-w-sm"
        onClick={handleContinueClick}
      >
        Continue
      </Button>
    </div>
  );
}
