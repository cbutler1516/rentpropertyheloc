import { Section, SectionHeader } from "@/components/layout/section";
import { Card } from "@/components/ui/card";
import { INVESTOR_USE_CASES } from "@/lib/home-content";

export function InvestorUseCasesSection() {
  return (
    <Section id="use-cases" muted>
      <SectionHeader
        eyebrow="Use cases"
        title="Where investors deploy HELOC capital"
        description="Common strategies we see from landlords using revolving lines on rental collateral."
      />
      <div className="grid gap-5 sm:grid-cols-2">
        {INVESTOR_USE_CASES.map((item) => (
          <Card key={item.title}>
            <h3 className="text-lg font-semibold text-navy-950">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
