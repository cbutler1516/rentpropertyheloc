import { Suspense } from "react";
import { StrategyReviewForm } from "../components/strategy-review-form";

export default function CcmStrategyReviewPage() {
  return (
    <Suspense
      fallback={
        <p className="text-sm text-zinc-500">Loading strategy review…</p>
      }
    >
      <StrategyReviewForm />
    </Suspense>
  );
}
