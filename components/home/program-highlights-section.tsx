import { Section, SectionHeader } from "@/components/layout/section";
import { ProgramIcon } from "@/components/icons/program-icons";
import { Card } from "@/components/ui/card";
import { PROGRAM_HIGHLIGHTS } from "@/lib/home-content";

export function ProgramHighlightsSection() {
  return (
    <Section id="program" divider>
      <SectionHeader
        eyebrow="Program"
        title="Structured for rental investors"
        description="Revolving lines on non-owner-occupied collateral—reviewed against your hold strategy and approval criteria."
      />
      <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
        {PROGRAM_HIGHLIGHTS.map((item) => (
          <Card key={item.title} className="flex gap-4 sm:gap-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy-950 text-accent-bright">
              <ProgramIcon name={item.icon} className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-navy-950">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
