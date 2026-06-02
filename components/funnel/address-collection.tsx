"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  trackAddressAutocompleteUsed,
  trackAddressSkipped,
  trackAddressStepViewed,
  trackAddressSubmitted,
} from "@/lib/analytics/conversion-events";
import { cn } from "@/lib/cn";
import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

type AddressData = {
  street: string;
  city: string;
  state: string;
  zip: string;
  googlePlaceId: string;
};

type AddressCollectionProps = {
  leadId: string;
  className?: string;
  /** When true, renders inside the post-submit details section without duplicate outer chrome */
  embedded?: boolean;
  /** Flat sections inside unified confirmation card */
  continuousFlow?: boolean;
};

const EMPTY_ADDRESS: AddressData = {
  street: "",
  city: "",
  state: "",
  zip: "",
  googlePlaceId: "",
};

type PlacesStatus = "idle" | "loading" | "ready" | "error";

type PlacesDiagnostics = {
  apiKeyPresent: boolean;
  scriptLoaded: boolean;
  googleAvailable: boolean;
  googleMapsAvailable: boolean;
  placesLibAvailable: boolean;
  autocompleteClassAvailable: boolean;
  autocompleteInitialized: boolean;
  lastError: string | null;
};

const INITIAL_DIAGNOSTICS: PlacesDiagnostics = {
  apiKeyPresent: false,
  scriptLoaded: false,
  googleAvailable: false,
  googleMapsAvailable: false,
  placesLibAvailable: false,
  autocompleteClassAvailable: false,
  autocompleteInitialized: false,
  lastError: null,
};

function injectPacStyles() {
  if (document.getElementById("pac-z-index-fix")) return;
  const style = document.createElement("style");
  style.id = "pac-z-index-fix";
  style.textContent = ".pac-container{z-index:100000!important}";
  document.head.appendChild(style);
}

function probePlacesApi(): Pick<
  PlacesDiagnostics,
  "googleAvailable" | "googleMapsAvailable" | "placesLibAvailable" | "autocompleteClassAvailable"
> {
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

function useGooglePlaces(
  inputRef: React.RefObject<HTMLInputElement | null>,
  onSelect: (address: AddressData) => void,
) {
  const [status, setStatus] = useState<PlacesStatus>("idle");
  const [diag, setDiag] = useState<PlacesDiagnostics>(INITIAL_DIAGNOSTICS);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      const msg = "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is not set — autocomplete disabled";
      console.warn(`[places] ${msg}`);
      setDiag((d) => ({ ...d, apiKeyPresent: false, lastError: msg }));
      return;
    }

    setDiag((d) => ({ ...d, apiKeyPresent: true }));
    console.info("[places] API key present ✓");

    if (!inputRef.current) {
      const msg = "input ref not available on mount";
      console.warn(`[places] ${msg}`);
      setDiag((d) => ({ ...d, lastError: msg }));
      return;
    }

    const input = inputRef.current;

    const probe = probePlacesApi();
    if (probe.autocompleteClassAvailable) {
      console.info("[places] Google Maps Places API already loaded ✓");
      setDiag((d) => ({ ...d, ...probe, scriptLoaded: true }));
      initAutocomplete(input);
      return;
    }

    setStatus("loading");
    console.info("[places] script load started…");

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src*="maps.googleapis.com/maps/api/js"]',
    );

    if (existingScript) {
      console.info("[places] existing Google Maps script tag found");

      const recheck = probePlacesApi();
      if (recheck.autocompleteClassAvailable) {
        setDiag((d) => ({ ...d, ...recheck, scriptLoaded: true }));
        initAutocomplete(input);
        return;
      }

      const onLoaded = () => {
        console.info("[places] existing script load event fired");
        handleScriptLoaded();
      };
      existingScript.addEventListener("load", onLoaded);
      return () => existingScript.removeEventListener("load", onLoaded);
    }

    console.info("[places] injecting script: libraries=places, v=weekly");
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&v=weekly`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      console.info("[places] script load success ✓");
      handleScriptLoaded();
    };

    script.onerror = (evt) => {
      const msg =
        "Google Maps script failed to load — check API key restrictions, billing, and allowed referrers in Google Cloud Console";
      console.error(`[places] ${msg}`, evt);
      setDiag((d) => ({ ...d, scriptLoaded: false, lastError: msg }));
      setStatus("error");
    };

    document.head.appendChild(script);

    function handleScriptLoaded() {
      const p = probePlacesApi();
      console.info("[places] post-load probe:", p);

      setDiag((d) => ({ ...d, ...p, scriptLoaded: true }));

      if (!p.googleAvailable) {
        const msg = "window.google is undefined after script load";
        console.error(`[places] ${msg}`);
        setDiag((d) => ({ ...d, lastError: msg }));
        setStatus("error");
        return;
      }

      if (!p.googleMapsAvailable) {
        const msg = "google.maps is undefined after script load";
        console.error(`[places] ${msg}`);
        setDiag((d) => ({ ...d, lastError: msg }));
        setStatus("error");
        return;
      }

      if (!p.placesLibAvailable) {
        const msg =
          'google.maps.places is undefined — the "places" library did not load. ' +
          "Ensure the legacy Places API (not just Places API New) is enabled in Google Cloud Console → APIs & Services → Enabled APIs.";
        console.error(`[places] ${msg}`);
        setDiag((d) => ({ ...d, lastError: msg }));
        setStatus("error");
        return;
      }

      if (!p.autocompleteClassAvailable) {
        const msg =
          "google.maps.places.Autocomplete is not a function — " +
          'you may have only enabled "Places API (New)" which does not include the legacy Autocomplete widget. ' +
          'Enable the legacy "Places API" in Google Cloud Console.';
        console.error(`[places] ${msg}`);
        setDiag((d) => ({ ...d, lastError: msg }));
        setStatus("error");
        return;
      }

      if (inputRef.current) initAutocomplete(inputRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function initAutocomplete(input: HTMLInputElement) {
    if (autocompleteRef.current) {
      console.info("[places] autocomplete already initialized — skipping");
      return;
    }

    const p = probePlacesApi();
    if (!p.autocompleteClassAvailable) {
      const msg = "Autocomplete class not available at init time";
      console.error(`[places] ${msg}`, p);
      setDiag((d) => ({ ...d, ...p, lastError: msg }));
      setStatus("error");
      return;
    }

    try {
      injectPacStyles();

      const ac = new google.maps.places.Autocomplete(input, {
        componentRestrictions: { country: "us" },
        types: ["address"],
        fields: ["address_components", "place_id", "formatted_address"],
      });

      ac.addListener("place_changed", () => {
        const place = ac.getPlace();
        console.info("[places] place selected", {
          hasComponents: Boolean(place.address_components),
          placeId: place.place_id,
          formattedAddress: place.formatted_address,
        });
        if (!place.address_components) return;

        const parsed = parsePlace(place);
        onSelectRef.current(parsed);
        trackAddressAutocompleteUsed({ googlePlaceId: parsed.googlePlaceId });
      });

      autocompleteRef.current = ac;
      setStatus("ready");
      setDiag((d) => ({ ...d, autocompleteInitialized: true, lastError: null }));
      console.info("[places] Autocomplete instance created ✓ (input:", input.id, ")");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown initialization error";
      console.error("[places] Autocomplete initialization failed:", msg, err);
      setDiag((d) => ({ ...d, lastError: msg }));
      setStatus("error");
    }
  }

  return { status, diagnostics: diag };
}

function parsePlace(place: google.maps.places.PlaceResult): AddressData {
  const components = place.address_components ?? [];
  const get = (type: string) =>
    components.find((c) => c.types.includes(type))?.long_name ?? "";
  const getShort = (type: string) =>
    components.find((c) => c.types.includes(type))?.short_name ?? "";

  const streetNumber = get("street_number");
  const route = get("route");

  return {
    street: [streetNumber, route].filter(Boolean).join(" "),
    city: get("locality") || get("sublocality_level_1") || get("administrative_area_level_2"),
    state: getShort("administrative_area_level_1"),
    zip: get("postal_code"),
    googlePlaceId: place.place_id ?? "",
  };
}

const isDev = process.env.NODE_ENV !== "production";

function PlacesDiagnosticsPanel({ diagnostics, status }: { diagnostics: PlacesDiagnostics; status: PlacesStatus }) {
  if (!isDev) return null;

  const rows: [string, boolean | string | null][] = [
    ["API key present", diagnostics.apiKeyPresent],
    ["Script loaded", diagnostics.scriptLoaded],
    ["window.google", diagnostics.googleAvailable],
    ["google.maps", diagnostics.googleMapsAvailable],
    ["google.maps.places", diagnostics.placesLibAvailable],
    ["Autocomplete class", diagnostics.autocompleteClassAvailable],
    ["Autocomplete initialized", diagnostics.autocompleteInitialized],
    ["Hook status", status],
  ];

  return (
    <details className="mt-3 rounded-lg border border-amber-200 bg-amber-50/50 px-3 py-2 text-[11px] text-amber-900">
      <summary className="cursor-pointer font-semibold">Places debug panel (dev only)</summary>
      <div className="mt-2 space-y-0.5 font-mono">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-2">
            <span>{label}</span>
            <span className={typeof value === "boolean" ? (value ? "text-green-700" : "text-red-600 font-bold") : ""}>
              {typeof value === "boolean" ? (value ? "✓ yes" : "✗ no") : (value ?? "—")}
            </span>
          </div>
        ))}
        {diagnostics.lastError ? (
          <div className="mt-2 whitespace-pre-wrap break-words border-t border-amber-200 pt-2 text-red-700">
            {diagnostics.lastError}
          </div>
        ) : null}
      </div>
    </details>
  );
}

export function AddressCollection({
  leadId,
  className,
  embedded = false,
  continuousFlow = false,
}: AddressCollectionProps) {
  const reduceMotion = useReducedMotion();
  const streetInputRef = useRef<HTMLInputElement | null>(null);

  const [address, setAddress] = useState<AddressData>(EMPTY_ADDRESS);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePlaceSelect = useCallback((parsed: AddressData) => {
    setAddress(parsed);
    if (streetInputRef.current) {
      streetInputRef.current.value = parsed.street;
    }
    setError(null);
  }, []);

  const { status: placesStatus, diagnostics } = useGooglePlaces(streetInputRef, handlePlaceSelect);

  useEffect(() => {
    trackAddressStepViewed({ leadId });
  }, [leadId]);

  function patch(partial: Partial<AddressData>) {
    setAddress((prev) => ({ ...prev, ...partial }));
    setError(null);
  }

  function readStreetFromInput(): string {
    return streetInputRef.current?.value.trim() ?? address.street.trim();
  }

  const canSubmit = address.street.trim() && address.city.trim() && address.state.trim() && address.zip.trim();

  async function handleSubmit() {
    const street = readStreetFromInput();
    if (!street || !address.city.trim() || !address.state.trim() || !address.zip.trim()) return;
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/leads/address", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadId,
          propertyAddress: street,
          city: address.city.trim(),
          state: address.state.trim(),
          zip: address.zip.trim(),
          googlePlaceId: address.googlePlaceId || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }
      trackAddressSubmitted({
        leadId,
        googlePlaceId: address.googlePlaceId || undefined,
      });
      // address_submitted also fires address_completed via conversion-events
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleSkip() {
    trackAddressSkipped({ leadId });
    setSkipped(true);
  }

  if (skipped) return null;

  if (submitted) {
    return (
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          embedded
            ? "rounded-xl border border-emerald-200 bg-emerald-50/60 px-4 py-3"
            : "rounded-2xl border border-emerald-200 bg-emerald-50/60 px-5 py-4",
          className,
        )}
      >
        <p className="text-sm font-medium text-emerald-800">
          Address saved — thanks for helping us review your request faster.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: embedded ? 0 : 0.5, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        continuousFlow
          ? "border-b border-slate-100/90 pb-5"
          : embedded
            ? "rounded-xl border border-slate-200/90 bg-white px-4 py-4 sm:px-5"
            : "rounded-2xl border border-slate-200 bg-white px-5 py-5 sm:px-6",
        className,
      )}
    >
      <div className={embedded || continuousFlow ? "mb-3" : "mb-4"}>
        <p className="text-sm font-semibold text-slate-900">Property address</p>
        {!embedded && !continuousFlow ? (
          <>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Optional next step
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-900">
              Add your property address to improve estimate accuracy
            </p>
            <p className="mt-0.5 text-xs text-slate-500">
              Help us review your scenario faster — no obligation.
            </p>
          </>
        ) : (
          <p className="mt-0.5 text-xs text-slate-500">
            {continuousFlow
              ? "Search or type your address — optional."
              : "Start typing to use address search, or enter manually."}
          </p>
        )}
      </div>

      <div className="space-y-3">
        <div className="space-y-1.5">
          <Label htmlFor="address-street" className="text-xs text-slate-600">
            Property address
          </Label>
          <div className="relative">
            <input
              ref={streetInputRef}
              id="address-street"
              defaultValue=""
              onChange={(e) => patch({ street: e.target.value })}
              placeholder="Start typing an address…"
              autoComplete="off"
              className="h-12 min-h-[44px] w-full rounded-xl border border-slate-200 bg-white px-4 text-base text-navy-950 placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 sm:h-11 sm:text-sm"
            />
            {placesStatus === "loading" && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                Loading…
              </span>
            )}
          </div>
          {placesStatus === "error" && (
            <p className="text-[11px] text-slate-400">
              Autocomplete is unavailable right now — you can still enter the address manually.
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div className="col-span-2 space-y-1.5 sm:col-span-1">
            <Label htmlFor="address-city" className="text-xs text-slate-600">
              City
            </Label>
            <Input
              id="address-city"
              value={address.city}
              onChange={(e) => patch({ city: e.target.value })}
              className="h-11 text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="address-state" className="text-xs text-slate-600">
              State
            </Label>
            <Input
              id="address-state"
              value={address.state}
              onChange={(e) => patch({ state: e.target.value })}
              maxLength={2}
              className="h-11 text-sm uppercase"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="address-zip" className="text-xs text-slate-600">
              ZIP
            </Label>
            <Input
              id="address-zip"
              value={address.zip}
              onChange={(e) => patch({ zip: e.target.value })}
              inputMode="numeric"
              maxLength={10}
              className="h-11 text-sm"
            />
          </div>
        </div>

        {error ? (
          <p className="text-xs text-red-600" role="alert">
            {error}
          </p>
        ) : null}

        <div className="flex flex-col gap-2.5 pt-1 sm:flex-row sm:items-center sm:gap-2">
          <Button
            type="button"
            size="lg"
            className="thumb-btn h-12 w-full text-sm sm:h-11 sm:w-auto"
            disabled={submitting || !canSubmit}
            onClick={handleSubmit}
          >
            {submitting ? "Saving…" : "Save address"}
          </Button>
          <button
            type="button"
            onClick={handleSkip}
            className="thumb-btn flex min-h-[48px] w-full items-center justify-center rounded-xl text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-700 sm:ml-2 sm:min-h-0 sm:w-auto sm:rounded-none sm:px-2 sm:py-2 sm:text-xs"
          >
            Skip for now
          </button>
        </div>
      </div>

      <p className="mt-3 text-[10px] leading-relaxed text-slate-400">
        Your address helps us locate your property for review. This is not a loan application
        or commitment to lend.
      </p>

      <PlacesDiagnosticsPanel diagnostics={diagnostics} status={placesStatus} />
    </motion.div>
  );
}
