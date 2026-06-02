"use client";

import { useGooglePlaces } from "@/components/funnel/use-google-places";
import { Button } from "@/components/ui/button";
import type { LeadFunnelData } from "@/lib/leads/types";
import { useCallback, useMemo, useRef } from "react";

type FunnelAddressStepProps = {
  data: LeadFunnelData;
  onChange: (partial: Partial<LeadFunnelData>) => void;
  onContinue: () => void;
};

export function FunnelAddressStep({ data, onChange, onContinue }: FunnelAddressStepProps) {
  const streetInputRef = useRef<HTMLInputElement | null>(null);

  const addressComplete = useMemo(
    () =>
      Boolean(data.propertyStreet?.trim()) &&
      Boolean(data.propertyCity?.trim()) &&
      Boolean(data.propertyState?.trim()) &&
      Boolean(data.propertyZip?.trim()) &&
      Boolean(data.googlePlaceId?.trim()),
    [data],
  );

  const handlePlaceSelect = useCallback(
    (parsed: {
      street: string;
      city: string;
      state: string;
      zip: string;
      googlePlaceId: string;
      latitude: number | null;
      longitude: number | null;
    }) => {
      onChange({
        propertyStreet: parsed.street,
        propertyCity: parsed.city,
        propertyState: parsed.state,
        propertyZip: parsed.zip,
        googlePlaceId: parsed.googlePlaceId,
        propertyLatitude: parsed.latitude,
        propertyLongitude: parsed.longitude,
      });
      if (streetInputRef.current) {
        streetInputRef.current.value = parsed.street;
      }
    },
    [onChange],
  );

  const { status: placesStatus } = useGooglePlaces(streetInputRef, handlePlaceSelect);

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <label htmlFor="funnel-address-street" className="text-sm text-slate-700">
          Rental property address
        </label>
        <input
          ref={streetInputRef}
          id="funnel-address-street"
          defaultValue={data.propertyStreet ?? ""}
          onChange={(e) => onChange({ propertyStreet: e.target.value, googlePlaceId: "" })}
          placeholder="Start typing an address…"
          autoComplete="off"
          className="funnel-form-field h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-base text-navy-950 placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 sm:text-sm"
        />
        {placesStatus === "loading" ? (
          <p className="text-[11px] text-slate-400">Loading address search…</p>
        ) : null}
        {placesStatus === "error" ? (
          <p className="text-[11px] text-slate-400">
            Autocomplete unavailable — enter your address manually if needed.
          </p>
        ) : null}
        {placesStatus === "ready" ? (
          <p className="text-[11px] text-slate-400">Select your address from the list to continue.</p>
        ) : null}
      </div>

      <p className="text-[11px] leading-relaxed text-slate-500">
        Helps us review the right rental property. Not a loan application or commitment to lend.
      </p>

      <Button
        type="button"
        size="lg"
        className="h-12 w-full text-base"
        disabled={!addressComplete}
        onClick={onContinue}
      >
        Continue
      </Button>
    </div>
  );
}
