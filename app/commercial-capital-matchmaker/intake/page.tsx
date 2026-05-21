import { IntakeFunnel } from "../components/intake-funnel";
import { ccmAccentLabel, ccmGoldLabel } from "../lib/ccm-ui";

export default function CcmIntakePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-12">
      <div className="space-y-5">
        <p className={ccmGoldLabel}>Deal profile · ~2 minutes</p>
        <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Frame your deal for capital strategy
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-zinc-400">
          Quick questions—not a loan application. Each answer helps Broadview map
          the right lender categories and structure for your scenario.
        </p>
        <p className={ccmAccentLabel}>Not a credit pull · Not underwriting</p>
      </div>
      <IntakeFunnel />
    </div>
  );
}
