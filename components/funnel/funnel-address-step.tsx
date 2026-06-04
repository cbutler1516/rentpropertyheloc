"use client";

import { Button } from "@/components/ui/button";
import { isManualAddressReady } from "@/lib/leads/address-step-validation";
import { cn } from "@/lib/cn";
import type { LeadFunnelData } from "@/lib/leads/types";
import { useState } from "react";

type FunnelAddressStepProps = {
  data: LeadFunnelData;
  onChange: (partial: Partial<LeadFunnelData>) => void;
  onContinue: () => void;
};

const fieldClassName =
  "funnel-form-field h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-base text-navy-950 placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 sm:text-sm lg:text-base";

const VALIDATION_MESSAGE = "Enter your property address, city, state, and ZIP to continue.";

function clearGoogleFields(): Partial<LeadFunnelData> {
  return {
    googlePlaceId: "",
    propertyFormattedAddress: "",
    propertyLatitude: null,
    propertyLongitude: null,
  };
}

export function FunnelAddressStep({ data, onChange, onContinue }: FunnelAddressStepProps) {
  const [continueAttempted, setContinueAttempted] = useState(false);

  const readyToContinue = isManualAddressReady(data);

  function handleContinueClick() {
    setContinueAttempted(true);
    if (!readyToContinue) return;
    onContinue();
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3 sm:space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="funnel-address-street" className="text-sm font-medium text-slate-700">
            Property address
          </label>
          <input
            id="funnel-address-street"
            type="text"
            name="property-address"
            value={data.propertyStreet}
            onChange={(e) =>
              onChange({
                propertyStreet: e.target.value,
                ...clearGoogleFields(),
              })
            }
            placeholder="201 NE 65th St"
            autoComplete="street-address"
            className={cn(fieldClassName, "lg:h-[3.25rem]")}
          />
        </div>

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
                  ...clearGoogleFields(),
                })
              }
              placeholder="Seattle"
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
                  ...clearGoogleFields(),
                })
              }
              placeholder="WA"
              autoComplete="address-level1"
              maxLength={2}
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
                  ...clearGoogleFields(),
                })
              }
              placeholder="98101"
              autoComplete="postal-code"
              inputMode="numeric"
              maxLength={10}
              className={fieldClassName}
            />
          </div>
        </div>
      </div>

      {continueAttempted && !readyToContinue ? (
        <p className="text-sm text-red-600" role="alert">
          {VALIDATION_MESSAGE}
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
