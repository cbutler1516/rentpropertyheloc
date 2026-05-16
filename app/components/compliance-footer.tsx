import {
  companyLicensing,
  complianceDisclosures,
  licensedStates,
  loanOfficers,
  type LicensedState,
} from "../lib/licensing";

type DisclosureBlockProps = {
  title: string;
  body: string;
};

export function DisclosureBlock({ title, body }: DisclosureBlockProps) {
  return (
    <section className="compliance-disclosure-block">
      <h3>{title}</h3>
      <p>{body}</p>
    </section>
  );
}

export function LicensingGrid({
  states = licensedStates,
}: {
  states?: LicensedState[];
}) {
  return (
    <div className="licensing-grid" aria-label="Licensed states">
      {states.map((state) => (
        <span key={state.abbreviation}>
          <strong>{state.abbreviation}</strong>
          {state.name}
        </span>
      ))}
    </div>
  );
}

export function ComplianceFooter() {
  return (
    <div className="compliance-footer" aria-label="Licensing and disclosures">
      <div className="compliance-footer-top">
        <div>
          <p className="compliance-kicker">Licensing + Disclosures</p>
          <p className="compliance-heading">
            {companyLicensing.equalHousingText} ·{" "}
            {companyLicensing.companyNmlsId}
          </p>
          <p className="compliance-summary">
            {companyLicensing.licensingSummary}
          </p>
        </div>
        <div className="compliance-partner">
          <span>Lending partner reference</span>
          <strong>{companyLicensing.lendingPartnerName}</strong>
        </div>
      </div>

      <div className="compliance-grid">
        <DisclosureBlock
          title="Consumer education"
          body={complianceDisclosures.consumerEducation}
        />
        <DisclosureBlock
          title="Not a commitment to lend"
          body={complianceDisclosures.noCommitment}
        />
        <DisclosureBlock
          title="Licensing disclosure"
          body={complianceDisclosures.licensing}
        />
        <DisclosureBlock
          title="Social and media content"
          body={complianceDisclosures.socialMedia}
        />
      </div>

      <div className="compliance-licensing">
        <div>
          <p className="compliance-kicker">Licensed states</p>
          <LicensingGrid />
        </div>
        <div className="compliance-loan-officers">
          <p className="compliance-kicker">Loan officer licensing</p>
          {loanOfficers.map((officer) => (
            <p key={`${officer.name}-${officer.nmlsId}`}>
              {officer.name} · {officer.title} · {officer.nmlsId}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
