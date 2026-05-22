"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getBookingUrl } from "@/app/lib/booking-urls";
import {
  dealPurposeOptions,
  propertyTypeOptions,
  CAPITAL_PATH_META,
} from "../lib/form-options";
import {
  ccmAccentLabel,
  ccmBtnGhost,
  ccmBtnPrimary,
  ccmBtnSecondary,
  ccmGoldLabel,
  ccmPanel,
  ccmPanelGold,
} from "../lib/ccm-ui";
import { useCcm } from "./ccm-provider";

function labelFor<T extends string>(
  options: { value: T; label: string }[],
  value: string,
): string {
  return options.find((o) => o.value === value)?.label ?? (value || "—");
}

export function IntakeConfirmationView() {
  const router = useRouter();
  const { hydrated, intake, recommendation } = useCcm();
  const commercialHref = getBookingUrl("commercial");

  useEffect(() => {
    if (hydrated && !recommendation) {
      router.replace("/commercial-capital-matchmaker/intake");
    }
  }, [hydrated, recommendation, router]);

  if (!hydrated || !recommendation) {
    return (
      <p className="text-sm text-zinc-500">Preparing your capital strategy…</p>
    );
  }

  const primaryLabel = CAPITAL_PATH_META[recommendation.primaryPath].label;

  return (
    <div className="mx-auto max-w-3xl space-y-12">
      <div className="space-y-4">
        <p className={ccmGoldLabel}>Lead captured</p>
        <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Your preliminary capital strategy is ready.
        </h1>
        <p className="text-base leading-relaxed text-zinc-400">
          We saved your deal profile locally and prepared a capital path read for{" "}
          <span className="text-zinc-200">{intake.sponsorName || "your deal"}</span>.
          Broadview can review next—no loan application submitted.
        </p>
      </div>

      <section className={`${ccmPanelGold} space-y-6 p-8 md:p-12`}>
        <p className={ccmAccentLabel}>Strategy snapshot</p>
        <dl className="grid gap-5 sm:grid-cols-2">
          <div>
            <dt className="font-mono text-[9px] tracking-[0.2em] text-zinc-500 uppercase">
              Borrower
            </dt>
            <dd className="mt-1 text-lg font-medium text-white">
              {intake.sponsorName || "—"}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[9px] tracking-[0.2em] text-zinc-500 uppercase">
              Property type
            </dt>
            <dd className="mt-1 text-lg font-medium text-white">
              {labelFor(propertyTypeOptions, intake.propertyType)}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[9px] tracking-[0.2em] text-zinc-500 uppercase">
              Transaction type
            </dt>
            <dd className="mt-1 text-lg font-medium text-white">
              {labelFor(dealPurposeOptions, intake.dealPurpose)}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[9px] tracking-[0.2em] text-zinc-500 uppercase">
              Primary recommended path
            </dt>
            <dd className="mt-1 text-lg font-medium text-white">{primaryLabel}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="font-mono text-[9px] tracking-[0.2em] text-zinc-500 uppercase">
              Capital fit score
            </dt>
            <dd className="mt-1 text-4xl font-semibold text-[#c9a227]">
              {recommendation.capitalFitScore}
            </dd>
          </div>
        </dl>
      </section>

      <div className={`${ccmPanel} space-y-4 p-6 md:p-8`}>
        <p className="text-sm text-zinc-500">
          Want Broadview to review this deal with you? Send your package or book a
          strategy call after you review the outputs.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/commercial-capital-matchmaker/results"
            className={ccmBtnPrimary}
          >
            View Capital Strategy
          </Link>
          <Link
            href="/commercial-capital-matchmaker/summary"
            className={ccmBtnSecondary}
          >
            View Executive Memo
          </Link>
          <a href={commercialHref} className={ccmBtnGhost}>
            Schedule Strategy Call
          </a>
        </div>
        <Link
          href="/commercial-capital-matchmaker/strategy-review"
          className="inline-block text-sm text-zinc-400 hover:text-white"
        >
          Send deal package to Broadview →
        </Link>
      </div>
    </div>
  );
}
