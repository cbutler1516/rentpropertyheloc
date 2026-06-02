"use client";

import {
  ProfileStrengthBar,
  ProfileStrengthMeter,
} from "@/components/funnel/gamification/profile-strength-meter";
import {
  getNextFinancingPath,
  getProfileStrengthSupportingCopy,
  MAX_PROFILE_STRENGTH,
  SNAPSHOT_SCORE_DISCLAIMER,
} from "@/lib/leads/investor-review-gamification";
import { cn } from "@/lib/cn";

type FastTrackHeroCardProps = {
  profileStrength: number;
  showPriority?: boolean;
  className?: string;
};

export function FastTrackHeroCard({
  profileStrength,
  showPriority = false,
  className,
}: FastTrackHeroCardProps) {
  const supportingCopy = getProfileStrengthSupportingCopy(profileStrength);
  const nextPath = getNextFinancingPath(profileStrength);
  const isComplete = profileStrength >= MAX_PROFILE_STRENGTH;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0c2e33] via-[#0f3d44] to-[#115e59] p-4 shadow-[0_16px_48px_rgba(13,148,136,0.22)] ring-1 ring-teal-400/20 sm:p-5 lg:rounded-3xl lg:p-8 lg:shadow-[0_24px_64px_rgba(13,148,136,0.28)]",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-teal-400/15 blur-3xl lg:h-56 lg:w-56"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-8 left-1/4 h-32 w-32 rounded-full bg-emerald-300/10 blur-2xl lg:h-48 lg:w-48"
        aria-hidden
      />

      <div className="relative">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex rounded-full border border-teal-300/25 bg-teal-400/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-teal-100">
            Review Started
          </span>
          <span className="inline-flex rounded-full border border-teal-300/25 bg-teal-400/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-teal-100">
            Final Step
          </span>
          {showPriority ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-amber-300/30 bg-amber-400/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-amber-100">
              <span aria-hidden>⚡</span> Priority Review Activated
            </span>
          ) : null}
          {isComplete ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-amber-300/40 bg-amber-400/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-amber-100">
              <span aria-hidden>★</span> Max Strength
            </span>
          ) : null}
        </div>

        <div className="mt-4 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start lg:gap-8">
          <div className="min-w-0">
            <h3 className="text-lg font-bold tracking-tight text-white sm:text-xl lg:text-2xl">
              Help Us Build Your Financing Strategy
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-teal-100/85 lg:max-w-xl lg:text-base">
              Complete these final details to unlock more accurate financing options and additional
              lending programs.
            </p>

            <div className="mt-4 hidden lg:block">
              <ProfileStrengthBar strength={profileStrength} />
              <p className="mt-2.5 text-xs leading-relaxed text-teal-50/80">{supportingCopy}</p>
              {nextPath ? (
                <p className="mt-2 text-[11px] font-medium text-amber-100/90">
                  Next unlock: {nextPath.name} at {nextPath.unlockStrength}%
                </p>
              ) : null}
              <p className="mt-1.5 text-[10px] leading-relaxed text-teal-200/50">
                {SNAPSHOT_SCORE_DISCLAIMER}
              </p>
            </div>
          </div>

          <ProfileStrengthMeter strength={profileStrength} size="lg" celebrate={isComplete} />
        </div>

        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5 lg:hidden">
          <ProfileStrengthMeter strength={profileStrength} size="md" />
          <div className="min-w-0 flex-1">
            <ProfileStrengthBar strength={profileStrength} />
            <p className="mt-2.5 text-xs leading-relaxed text-teal-50/80">{supportingCopy}</p>
            <p className="mt-1.5 text-[10px] leading-relaxed text-teal-200/50">
              {SNAPSHOT_SCORE_DISCLAIMER}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
