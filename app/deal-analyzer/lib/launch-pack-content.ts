import { partnerDealAnalyzerBase, partnerLink } from "./agent-types";
import type { LaunchPackContent, LaunchPackCopySection } from "./launch-pack-types";

export const OUTREACH_STATUS_LABELS: Record<
  import("./launch-pack-types").OutreachStatus,
  string
> = {
  not_started: "Not started",
  link_copied: "Link copied",
  invited: "Invited",
  live: "Live",
  needs_followup: "Needs follow-up",
};

export function buildLaunchPackContent(siteUrl: string): LaunchPackContent {
  const base = siteUrl.replace(/\/$/, "");
  const dealAnalyzerUrl = `${base}/deal-analyzer`;
  const analyzeUrl = `${base}/deal-analyzer/analyze`;
  const homebuyerSeo = `${base}/deal-analyzer/homebuyer`;
  const partnerHubTemplate = `${base}/partners/{agent-slug}`;
  const partnerAnalyzeTemplate = `${base}${partnerDealAnalyzerBase("{agent-slug}")}/analyze`;
  const partnerHomebuyerTemplate = `${base}${partnerDealAnalyzerBase("{agent-slug}")}/homebuyer`;

  const sections: LaunchPackCopySection[] = [
    {
      id: "client-launch",
      title: "1. Client-facing launch copy",
      description: "Website, email footer, or buyer guide intro.",
      body: `Know your numbers before you make the move.

The Loan Playbook Deal Analyzer helps you model purchase, refinance, and investor scenarios—and unlock a custom Playbook Report with payment framing, structure tradeoffs, and next steps.

Financing strategy by Chris Butler · Broadview Lending.

Start here (free, educational—not a loan approval):
${analyzeUrl}

Questions? Book a Strategy Call when you're ready to confirm program fit.`,
    },
    {
      id: "agent-invite",
      title: "2. Agent invite copy",
      description: "Recruit your first 10 partner agents this week.",
      body: `Subject: Your co-branded Deal Analyzer is ready

Hi [Agent Name],

I'm rolling out a new client tool for my referral partners—a premium Deal Analyzer that produces a custom Playbook Report (payment, structure, risks, and next steps). I prepare the financing strategy; you get a co-branded page and shareable reports for your buyers.

Your partner hub (after we set you up):
${partnerHubTemplate}

What you get:
• Co-branded partner page + calculator landings
• Shareable Playbook Reports for clients
• Clear educational framing—not rate bait

Can we do a 15-minute walkthrough this week? I'll send your personal link and copy you can text to clients.

— Chris Butler
Broadview Lending · The Loan Playbook`,
    },
    {
      id: "social-1",
      title: "3. Social post — launch announcement",
      body: `New for my referral partners: a premium Deal Analyzer that builds a custom Playbook Report in minutes—not a generic payment calculator.

Buyers and investors see real structure, risks, and next steps. I handle the financing strategy at Broadview Lending.

Try the public version: ${dealAnalyzerUrl}

Agents DM me if you want your co-branded link this week.

#realestate #mortgage #homebuying #TheLoanPlaybook`,
    },
    {
      id: "social-2",
      title: "3. Social post — buyer-focused",
      body: `Before you write an offer or refinance, stress-test the deal.

The Loan Playbook Deal Analyzer shows payment, cash-to-close, and structure—in one premium read. Educational only—not a pre-approval.

${homebuyerSeo}

— Chris Butler, Broadview Lending`,
    },
    {
      id: "email-announcement",
      title: "4. Email announcement (agents)",
      body: `Subject: Co-branded Deal Analyzer — invite for [Agent Name]

Hi [Agent Name],

I'm launching The Loan Playbook Deal Analyzer to a small group of partner agents this week. You'll get:

• A co-branded partner page: ${partnerHubTemplate}
• Branded calculator pages (homebuyer, refinance, investor, and more)
• Client-ready Playbook Reports with my financing strategy notes

Your clients model the deal; you share a professional snapshot. Everything is educational—no promised rates or approvals.

Next step: 15-minute setup call. Reply with two times that work and I'll send your link + invite kit.

Thank you for the referrals you send my way.

Chris Butler
Loan Officer · Broadview Lending
The Loan Playbook`,
    },
    {
      id: "text-invite",
      title: "5. Text — invite agent to program",
      body: `Hi [Agent Name]—Chris Butler at Broadview Lending. I'm giving a few partners a co-branded Deal Analyzer this week (custom Playbook Reports for your clients). 15-min zoom to set you up?`,
    },
    {
      id: "text-client",
      title: "5. Text — agent to client (template)",
      body: `Hi [Client]—it's [Agent Name]. Chris Butler at Broadview Lending built a custom financing playbook for my clients. Model your deal and get a Playbook Report we can review together: [PARTNER LINK]. Educational only—not a loan approval.`,
    },
    {
      id: "qr-placeholder",
      title: "6. QR code placeholder",
      description: "Print or add to Canva. Replace {agent-slug} with the agent's URL slug.",
      body: `DEAL ANALYZER — QR PLACEHOLDER

Scan to open co-branded partner page:
${partnerHubTemplate}

Or analyze directly:
${partnerAnalyzeTemplate}

Homebuyer calculator landing:
${partnerHomebuyerTemplate}

Generate QR: use any QR tool with the final URL above.
Financing strategy by Chris Butler · Broadview Lending · The Loan Playbook`,
    },
  ];

  const testLinks = [
    { id: "analyze", label: "Standard analyzer", href: analyzeUrl },
    { id: "seo", label: "SEO landing (homebuyer)", href: homebuyerSeo },
    { id: "hub", label: "Deal Analyzer hub", href: dealAnalyzerUrl },
    { id: "admin", label: "Admin dashboard", href: `${base}/admin/deal-analyzer` },
    { id: "launch", label: "Launch readiness", href: `${base}/admin/deal-analyzer/launch` },
    { id: "agents", label: "Partner agents admin", href: `${base}/admin/deal-analyzer/agents` },
  ];

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(dealAnalyzerUrl)}`;

  return {
    siteUrl: base,
    dealAnalyzerUrl,
    partnerHubTemplate,
    sections,
    testLinks,
    qrSheetText: sections.find((s) => s.id === "qr-placeholder")?.body ?? "",
    qrImageUrl,
  };
}

export function partnerLinkForSlug(siteUrl: string, slug: string): string {
  if (!slug.trim()) return "";
  return partnerLink(siteUrl, slug.trim());
}
