import { partnerDealAnalyzerBase, partnerLink, type PartnerAgent } from "./agent-types";
import { resolveBrokerage, resolveCtaEmail, resolveCtaPhone } from "./agent-branding";

export type AgentInviteKit = {
  textMessage: string;
  emailSubject: string;
  emailBody: string;
  socialPost: string;
  videoScript: string;
  partnerLink: string;
  qrPlaceholder: string;
  fullKit: string;
};

export function generateAgentInviteKit(
  agent: Pick<
    PartnerAgent,
    "name" | "slug" | "email" | "phone" | "company" | "brokerage" | "ctaPhone" | "ctaEmail"
  >,
  siteUrl: string,
): AgentInviteKit {
  const link = partnerLink(siteUrl, agent.slug);
  const analyzeLink = `${siteUrl.replace(/\/$/, "")}${partnerDealAnalyzerBase(agent.slug)}/analyze`;
  const brokerage = resolveBrokerage(agent);
  const phone = resolveCtaPhone(agent);
  const email = resolveCtaEmail(agent);

  const textMessage = `Hi! It's ${agent.name}${brokerage ? ` with ${brokerage}` : ""}. I set up a custom financing playbook for you—model your deal and get a Playbook Report from Chris Butler at Broadview Lending. Start here: ${link}`;

  const emailSubject = `${agent.name} — your custom financing Playbook`;

  const emailBody = `Hi,

I wanted to share something new I'm using with my clients—a premium Deal Analyzer that produces a custom Playbook Report for your scenario (payment, structure, risks, and next steps).

Chris Butler at Broadview Lending prepares the financing strategy; you get a clear, shareable snapshot we can review together.

Start your scenario here:
${analyzeLink}

This is educational only—not a loan approval or rate guarantee. When you're ready, we can book a Strategy Call with Chris to confirm program fit.

${agent.name}${brokerage ? `\n${brokerage}` : ""}${phone ? `\n${phone}` : ""}${email ? `\n${email}` : ""}`;

  const socialPost = `Thinking about your next move? I partnered with Chris Butler at Broadview Lending on a custom financing Playbook for my clients—model your deal in minutes and get a strategy snapshot (not a generic calculator).

Tap my link to analyze your scenario: ${link}

#realestate #homebuying #financing #TheLoanPlaybook`;

  const videoScript = `Hey—it's ${agent.name}. I built a custom financing tool for my clients with Chris Butler at Broadview Lending. You enter your deal details, preview your Playbook, and unlock a full report with payment framing, structure tradeoffs, and next steps. It's educational—not a loan approval—but it's the clearest way to stress-test your scenario before we talk numbers. Link's in my bio, or scan the QR code on my flyer: ${link}.`;

  const qrPlaceholder = `[QR CODE — link to partner page]\n${link}`;

  const fullKit = `AGENT INVITE KIT — ${agent.name}
Partner link: ${link}
Analyze link: ${analyzeLink}

--- 1. TEXT MESSAGE ---
${textMessage}

--- 2. EMAIL ---
Subject: ${emailSubject}

${emailBody}

--- 3. SOCIAL POST ---
${socialPost}

--- 4. VIDEO SCRIPT ---
${videoScript}

--- 5. QR PLACEHOLDER ---
${qrPlaceholder}`;

  return {
    textMessage,
    emailSubject,
    emailBody,
    socialPost,
    videoScript,
    partnerLink: link,
    qrPlaceholder,
    fullKit,
  };
}
