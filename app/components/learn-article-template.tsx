import { FooterBrand } from "./brand";
import { ComplianceFooter } from "./compliance-footer";
import {
  CTASection,
  FeatureCard,
  PageHero,
  SectionHeader,
  StatRow,
} from "./design-system";
import { LeadCaptureForm } from "./lead-capture-form";
import { PageAmbient } from "./page-ambient";
import { RevealGroup } from "./reveal-group";
import { SiteNav } from "./site-nav";
import type { LearnArticle } from "../lib/learn-articles";

function ArticleList({
  label,
  items,
}: {
  label: string;
  items: string[];
}) {
  return (
    <div className="reveal-item border border-zinc-900/80 bg-[#050505] p-8 md:p-10">
      <p className="font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
        {label}
      </p>
      <div className="mt-7 grid gap-px overflow-hidden border border-zinc-900/80 bg-zinc-900/70">
        {items.map((item, index) => (
          <div key={item} className="bg-[#080808] p-5">
            <p className="font-mono text-[10px] tracking-[0.22em] text-zinc-700 uppercase">
              {String(index + 1).padStart(2, "0")}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400 md:text-base">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LearnArticleTemplate({ article }: { article: LearnArticle }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050505] text-white">
      <PageAmbient enableParallax={false} />
      <div
        className="playbook-grid pointer-events-none fixed inset-0 z-0 opacity-30"
        aria-hidden
      />
      <div
        className="vignette pointer-events-none fixed inset-0 z-[1]"
        aria-hidden
      />
      <div
        className="ambient-drift pointer-events-none fixed top-[-12rem] right-[-8rem] z-[1] h-[36rem] w-[36rem] rounded-full bg-[#5b21b6]/15 blur-[120px]"
        aria-hidden
      />

      <SiteNav />

      <main className="relative z-10">
        <PageHero
          eyebrow="Learn / Strategy Guide"
          title={article.title}
          lead={article.intro}
          focusLabel="Education Note"
          focus="Educational only. Program availability, borrower qualifications, property details, and underwriting guidelines determine what may be available."
          visual="multi-strategy"
        >
          <StatRow
            className="reveal-item mt-16"
            stats={[
              { value: "01", label: "Takeaways" },
              { value: "02", label: "How it works" },
              { value: "03", label: "When it fits" },
            ]}
          />
        </PageHero>

        <section className="section-flow section-matte relative border-y border-zinc-900/40">
          <div className="section-bridge-top" aria-hidden />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#5b21b6]/[0.035] via-transparent to-transparent"
            aria-hidden
          />
          <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
            <SectionHeader
              eyebrow="Key Takeaways"
              title="The idea, fast."
              lead="Scan the decision before comparing options or assuming a structure fits."
            />
            <RevealGroup
              className="mt-16 grid gap-7 md:mt-20 md:grid-cols-3"
              stagger={110}
            >
              {article.keyTakeaways.map((takeaway, index) => (
                <FeatureCard
                  key={takeaway}
                  label={`Takeaway ${String(index + 1).padStart(2, "0")}`}
                  title={takeaway}
                  className="card-lift border border-zinc-900/80"
                />
              ))}
            </RevealGroup>
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        <section className="section-flow relative">
          <div className="section-bridge-top" aria-hidden />
          <div className="relative mx-auto grid w-full max-w-7xl gap-8 px-6 md:grid-cols-2 md:px-10">
            <ArticleList
              label="How this strategy works"
              items={article.howItWorks}
            />
            <ArticleList
              label="When it makes sense"
              items={article.whenItMakesSense}
            />
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        <section className="section-flow section-matte relative border-y border-zinc-900/40">
          <div className="section-bridge-top" aria-hidden />
          <div className="relative mx-auto grid w-full max-w-7xl gap-8 px-6 md:grid-cols-[0.9fr_1.1fr] md:px-10">
            <ArticleList
              label="Common mistakes"
              items={
                article.commonMistakes ?? [
                  "Assuming a loan strategy fits before confirming program guidelines.",
                  "Waiting until deadlines are close before reviewing documents and tradeoffs.",
                  "Treating educational content as a quote, approval, or commitment to lend.",
                ]
              }
            />
            <div className="reveal-item overflow-hidden border border-zinc-900/80 bg-[#050505]">
              <div className="relative aspect-video border-b border-zinc-900/80 bg-[#080808] p-6">
                <div
                  className="playbook-grid pointer-events-none absolute inset-0 opacity-25"
                  aria-hidden
                />
                <div className="relative flex h-full flex-col justify-between">
                  <p className="font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
                    Video placeholder
                  </p>
                  <div>
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-[#7c3aed]/30 bg-[#7c3aed]/10">
                      <span className="h-0 w-0 border-y-[7px] border-l-[11px] border-y-transparent border-l-[#c4b5fd]/80" />
                    </div>
                    <p className="font-mono text-[10px] tracking-[0.22em] text-zinc-600 uppercase">
                      Future embed area
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-8 md:p-10">
                <p className="font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
                  Educational media
                </p>
                <h2 className="mt-5 text-3xl font-semibold tracking-[-0.03em] text-white">
                  {article.videoTitle ?? `${article.title} video explainer`}
                </h2>
                <p className="mt-5 leading-relaxed text-zinc-500">
                  {article.videoDescription ??
                    "Future short-form video connected to this topic."}
                </p>
              </div>
            </div>
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        <CTASection
          eyebrow="Next Move"
          title={article.ctaTitle}
          body={article.ctaBody}
          actions={[
            { href: "/learn", label: "Back to Learn", variant: "primary" },
            { href: "/videos", label: "Explore Video Topics" },
          ]}
        >
          <LeadCaptureForm
            formType="Buyer Strategy Call"
            submitLabel="Get Buyer Guidance"
          />
        </CTASection>
      </main>

      <footer className="relative z-10 border-t border-zinc-900/60 py-10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 font-mono text-[10px] tracking-widest text-zinc-600 uppercase md:flex-row md:items-center md:justify-between md:px-10">
          <FooterBrand />
          <span>© {new Date().getFullYear()} The Loan Playbook</span>
        </div>
        <ComplianceFooter />
      </footer>
    </div>
  );
}
