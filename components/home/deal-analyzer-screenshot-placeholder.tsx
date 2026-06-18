"use client";

import { cn } from "@/lib/cn";
import { DEAL_ANALYZER_SCREENSHOT_URL, hasDealAnalyzerScreenshot } from "@/lib/public-env";

type DealAnalyzerScreenshotPlaceholderProps = {
  className?: string;
};

/**
 * Deal Analyzer product screenshot — uses NEXT_PUBLIC_DEAL_ANALYZER_SCREENSHOT_URL when set.
 */
export function DealAnalyzerScreenshotPlaceholder({
  className,
}: DealAnalyzerScreenshotPlaceholderProps) {
  if (hasDealAnalyzerScreenshot()) {
    return (
      <div
        className={cn(
          "rounded-2xl border border-slate-200 bg-slate-100 p-2 shadow-sm",
          className,
        )}
      >
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
          {/* img allows any env URL (local path or external CDN) without next/image remote config */}
          <img
            src={DEAL_ANALYZER_SCREENSHOT_URL}
            alt="The Loan Playbook Deal Analyzer"
            className="h-auto w-full object-cover object-top"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200 bg-slate-100 p-2 shadow-sm",
        className,
      )}
      aria-hidden
    >
      <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-[10px] font-medium text-slate-500">
        <span className="h-2 w-2 rounded-full bg-teal-500" />
        Deal Analyzer · Preview
      </div>
      <div className="mt-2 rounded-lg border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-teal-50/40 p-4">
        <div className="rounded-lg border border-slate-200/80 bg-white p-3 shadow-sm">
          <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            <span>The Loan Playbook</span>
            <span className="text-teal-600">Deal Analyzer</span>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <div className="rounded-md border border-slate-100 bg-slate-50 p-2">
              <p className="text-[10px] text-slate-500">Purchase scenario</p>
              <p className="mt-1 text-sm font-semibold text-slate-800">$3,842 / mo</p>
              <div className="mt-2 h-1.5 rounded-full bg-slate-200">
                <div className="h-full w-[68%] rounded-full bg-teal-500" />
              </div>
            </div>
            <div className="rounded-md border border-slate-100 bg-slate-50 p-2">
              <p className="text-[10px] text-slate-500">HELOC scenario</p>
              <p className="mt-1 text-sm font-semibold text-slate-800">$185K draw</p>
              <div className="mt-2 h-1.5 rounded-full bg-slate-200">
                <div className="h-full w-[52%] rounded-full bg-teal-400" />
              </div>
            </div>
          </div>
        </div>
        <p className="mt-3 text-center text-[10px] text-slate-500">
          Educational estimates only — swap in screenshot via env
        </p>
      </div>
    </div>
  );
}
