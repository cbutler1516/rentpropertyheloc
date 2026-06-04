"use client";

import { useGooglePlaces, type PlacesAddressData } from "@/components/funnel/use-google-places";
import { Button } from "@/components/ui/button";
import {
  canContinueAddressStep,
  isGooglePlacesAddressReady,
  isManualAddressReady,
} from "@/lib/leads/address-step-validation";
import { cn } from "@/lib/cn";
import type { LeadFunnelData } from "@/lib/leads/types";
import { useCallback, useRef, useState } from "react";

type FunnelAddressStepProps = {
  data: LeadFunnelData;
  onChange: (partial: Partial<LeadFunnelData>) => void;
  onContinue: () => void;
};

const fieldClassName =
  "funnel-form-field h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-base text-navy-950 placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 sm:text-sm lg:text-base";

function withStreet(data: LeadFunnelData, street: string): LeadFunnelData {
  return { ...data, propertyStreet: street };
}

export function FunnelAddressStep({ data, onChange, onContinue }: FunnelAddressStepProps) {
  const streetInputRef = useRef<HTMLInputElement | null>(null);
  const [showManualFields, setShowManualFields] = useState(false);
  const [continueAttempted, setContinueAttempted] = useState(false);
  const [validationHint, setValidationHint] = useState<string | null>(null);

  const readStreetFromInput = useCallback((): string => {
    return streetInputRef.current?.value.trim() ?? "";
  }, []);

  const handlePlaceSelect = useCallback(
    (parsed: PlacesAddressData) => {
      if (streetInputRef.current) {
        streetInputRef.current.value = parsed.street;
      }

      onChange({
        propertyStreet: parsed.street,
        propertyCity: parsed.city,
        propertyState: parsed.state.toUpperCase(),
        propertyZip: parsed.zip,
        googlePlaceId: parsed.googlePlaceId,
        propertyFormattedAddress: parsed.formattedAddress,
        propertyLatitude: parsed.latitude,
        propertyLongitude: parsed.longitude,
      });
      setContinueAttempted(false);
      setValidationHint(null);

      if (!parsed.city || !parsed.state || !parsed.zip) {
        setShowManualFields(true);
      }
    },
    [onChange],
  );

  const { status: placesStatus } = useGooglePlaces(streetInputRef, handlePlaceSelect);

  const placesUnavailable = placesStatus === "error";

  const shouldShowManualFields =
    showManualFields ||
    placesUnavailable ||
    (continueAttempted &&
      !canContinueAddressStep(withStreet(data, readStreetFromInput())));

  function handleContinueClick() {
    setContinueAttempted(true);
    const street = readStreetFromInput();
    const streetChanged = street !== data.propertyStreet;
    const nextData: LeadFunnelData = streetChanged
      ? {
          ...withStreet(data, street),
          googlePlaceId: "",
          propertyFormattedAddress: "",
          propertyLatitude: null,
          propertyLongitude: null,
        }
      : withStreet(data, street);

    if (canContinueAddressStep(nextData)) {
      onChange({
        propertyStreet: street,
        ...(streetChanged
          ? {
              googlePlaceId: "",
              propertyFormattedAddress: "",
              propertyLatitude: null,
              propertyLongitude: null,
            }
          : {}),
      });
      setValidationHint(null);
      onContinue();
      return;
    }

    if (streetChanged) {
      onChange({
        propertyStreet: street,
        googlePlaceId: "",
        propertyFormattedAddress: "",
        propertyLatitude: null,
        propertyLongitude: null,
      });
    }

    setShowManualFields(true);

    if (isGooglePlacesAddressReady(nextData) || isManualAddressReady(nextData)) {
      setValidationHint("Complete all required address fields.");
    } else {
      setValidationHint("Select an address from the suggestions or complete city, state, and ZIP.");
    }
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="space-y-1.5">
        <label htmlFor="funnel-address-street" className="text-sm font-medium text-slate-700">
          Property address
        </label>
        <input
          ref={streetInputRef}
          id="funnel-address-street"
          type="text"
          name="property-address"
          defaultValue={data.propertyStreet}
          placeholder="Start typing an address…"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          className={cn(fieldClassName, "lg:h-[3.25rem]")}
        />
        {placesStatus === "loading" ? (
          <p className="text-[11px] text-slate-400">Loading address search…</p>
        ) : null}
        {placesUnavailable ? (
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
                value={data.propertyCity}
                onChange={(e) =>
                  onChange({
                    propertyCity: e.target.value,
                    googlePlaceId: "",
                    propertyFormattedAddress: "",
                  })
                }
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
                value={data.propertyState}
                onChange={(e) =>
                  onChange({
                    propertyState: e.target.value.toUpperCase().slice(0, 2),
                    googlePlaceId: "",
                    propertyFormattedAddress: "",
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
                type="text"
                value={data.propertyZip}
                onChange={(e) =>
                  onChange({
                    propertyZip: e.target.value.replace(/[^\d-]/g, "").slice(0, 10),
                    googlePlaceId: "",
                    propertyFormattedAddress: "",
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
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setShowManualFields(true)}
          className="text-sm font-medium text-teal-700 underline-offset-2 hover:underline"
        >
          Enter city, state, ZIP manually
        </button>
      )}

      {validationHint ? (
        <p className="text-sm text-red-600" role="alert">
          {validationHint}
        </p>
      ) : null}

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
