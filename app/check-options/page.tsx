import { CheckOptionsPageContent } from "@/components/funnel/check-options-page-content";
import { FunnelPageTracker } from "@/components/funnel/funnel-page-tracker";
import { Container } from "@/components/layout/container";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Check Rental HELOC Options",
  description:
    "Start a personalized rental property financing review. A licensed mortgage professional will follow up with options that may be available—subject to approval.",
};

export default function CheckOptionsPage() {
  return (
    <div className="min-h-[100dvh] bg-[var(--color-surface-50)] py-3 pb-[max(1rem,env(safe-area-inset-bottom))] text-[var(--color-ink)] sm:py-8">
      <FunnelPageTracker />
      <Container className="mx-auto max-w-xl px-4">
        <CheckOptionsPageContent />
      </Container>
    </div>
  );
}
