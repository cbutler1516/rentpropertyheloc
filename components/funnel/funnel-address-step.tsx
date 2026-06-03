"use client";

import { useGooglePlaces } from "@/components/funnel/use-google-places";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import type { LeadFunnelData } from "@/lib/leads/types";
import { useCallback, useMemo, useRef } from "react";

type FunnelAddressStepProps = {
  data: LeadFunnelData;
  onChange: (partial: Partial<LeadFunnelData>) => void;
  onContinue: () => void;
};

const fieldClassName =
  "funnel-form-field h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-base text-navy-950 placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 sm:text-sm lg:text-base";

export function FunnelAddressStep({ data, onChange, onContinue }: FunnelAddressStepProps) {
  const streetInputRef = useRef<HTMLInputElement | null>(null);

  const addressComplete = useMemo(
    () =>
      Boolean(data.propertyStreet?.trim()) &&
      Boolean(data.propertyCity?.trim()) &&
      Boolean(data.propertyState?.trim()) &&
      Boolean(data.propertyZip?.trim()),
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
        propertyState: parsed.state.toUpperCase(),
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
    <div className="space-y-3 sm:space-y-4">
      <div className="space-y-1.5">
        <label htmlFor="funnel-address-street" className="text-sm font-medium text-slate-700">
          Property address
        </label>
        <input
          ref={streetInputRef}
          id="funnel-address-street"
          defaultValue={data.propertyStreet ?? ""}
          onChange={(e) =>
            onChange({
              propertyStreet: e.target.value,
              googlePlaceId: "",
            })
          }
          placeholder="Start typing an address…"
          autoComplete="street-address"
          className={cn(fieldClassName, "lg:h-[3.25rem]")}
        />
        {placesStatus === "loading" ? (
          <p className="text-[11px] text-slate-400">Loading address search…</p>
        ) : null}
        {placesStatus === "error" ? (
          <p className="text-[11px] text-slate-400">
            Autocomplete unavailable — enter your address manually below.
          </p>
        ) : null}
        {placesStatus === "ready" ? (
          <p className="text-[11px] text-slate-400">
            Select a suggestion to auto-fill city, state, and ZIP, or enter them manually.
          </p>
        ) : null}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-3.5">
        <div className="col-span-2 space-y-1.5 sm:col-span-1">
          <label htmlFor="funnel-address-city" className="text-sm font-medium text-slate-700">
            City
          </label>
          <input
            id="funnel-address-city"
            value={data.propertyCity}
            onChange={(e) => onChange({ propertyCity: e.target.value, googlePlaceId: "" })}
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
            value={data.propertyState}
            onChange={(e) =>
              onChange({
                propertyState: e.target.value.toUpperCase().slice(0, 2),
                googlePlaceId: "",
              })
            }
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
            value={data.propertyZip}
            onChange={(e) =>
              onChange({
                propertyZip: e.target.value.replace(/[^\d-]/g, "").slice(0, 10),
                googlePlaceId: "",
              })
            }
            autoComplete="postal-code"
            inputMode="numeric"
            maxLength={10}
            placeholder="98101"
            className={fieldClassName}
          />
        </div>
      </div>

      <p className="text-[11px] leading-relaxed text-slate-500 sm:text-xs">
        Helps us review the right rental property. Not a loan application or commitment to lend.
      </p>

      <Button
        type="button"
        size="lg"
        className={cn(
          "thumb-btn h-12 w-full text-base sm:max-w-md lg:max-w-sm",
          addressComplete && "lg:shadow-sm",
        )}
        disabled={!addressComplete}
        onClick={onContinue}
      >
        Continue
      </Button>
    </div>
  );
}
