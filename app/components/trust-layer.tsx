import Link from "next/link";
import { LicensingTrust } from "./licensing-trust";
import { ProofLayer } from "./proof-layer";
import { companyLicensing } from "../lib/licensing";

type TrustLayerProps = {
  variant?: "compact" | "standard";
  showReviews?: boolean;
};

export function TrustLayer({ variant = "standard", showReviews = true }: TrustLayerProps) {
  if (variant === "compact") {
    return (
      <aside className="trust-layer trust-layer--compact border border-zinc-900/80 bg-[#050505] p-6 md:p-7">
        <p className="font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
          Lending context
        </p>
        <p className="mt-4 text-sm leading-relaxed text-zinc-400">
          Education and strategy through The Loan Playbook. Mortgage fulfillment through{" "}
          {companyLicensing.lendingPartnerName}.
        </p>
        <div className="mt-5">
          <LicensingTrust />
        </div>
      </aside>
    );
  }

  if (!showReviews) {
    return (
      <section className="section-flow relative">
        <div className="relative mx-auto w-full max-w-3xl px-6 md:px-10">
          <aside className="border border-zinc-900/80 bg-[#050505] p-7">
            <p className="font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
              Lending partner
            </p>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400">
              Strategy through The Loan Playbook. Fulfillment through{" "}
              {companyLicensing.lendingPartnerName}.
            </p>
            <Link
              href="/about"
              className="mt-5 inline-flex text-sm font-medium text-zinc-300 hover:text-white"
            >
              About the playbook →
            </Link>
            <div className="mt-6">
              <LicensingTrust variant="banner" />
            </div>
          </aside>
        </div>
      </section>
    );
  }

  return <ProofLayer variant="standard" />;
}
