import { Container } from "@/components/layout/container";
import { MARKETING_SITE_NAME } from "@/lib/legal/compliance";
import type { LegalSection } from "@/lib/legal/document-sections";
import { LEGAL_LAST_UPDATED } from "@/lib/legal/document-sections";

type ComplianceDocumentPageProps = {
  title: string;
  sections: LegalSection[];
};

export function ComplianceDocumentPage({ title, sections }: ComplianceDocumentPageProps) {
  return (
    <div className="section-light py-10 sm:py-14">
      <Container className="max-w-3xl">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-700 sm:text-xs">
          {MARKETING_SITE_NAME}
        </p>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{title}</h1>
        <p className="mt-2 text-sm text-slate-500">Last updated: {LEGAL_LAST_UPDATED}</p>
        <div className="mt-8 space-y-8">
          {sections.map((section) => (
            <section key={section.id} aria-labelledby={`${section.id}-heading`}>
              <h2
                id={`${section.id}-heading`}
                className="text-lg font-semibold text-slate-900 sm:text-xl"
              >
                {section.title}
              </h2>
              {section.paragraphs.length > 0 ? (
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-600">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              ) : null}
              {section.bullets?.length ? (
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-slate-600">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </Container>
    </div>
  );
}
