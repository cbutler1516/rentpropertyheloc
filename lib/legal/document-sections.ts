import { PLATFORM_EMAIL, PLATFORM_PHONE_DISPLAY } from "@/lib/contact";
import {
  FOOTER_PLATFORM_DISCLOSURE,
  LEGAL_SITE_DOMAIN,
  MARKETING_SITE_NAME,
  MORTGAGE_STANDARD_DISCLAIMER,
} from "@/lib/legal/compliance";

export type LegalSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export const LEGAL_LAST_UPDATED = "May 26, 2026";

export const PRIVACY_POLICY_SECTIONS: LegalSection[] = [
  {
    id: "overview",
    title: "Overview",
    paragraphs: [
      `${MARKETING_SITE_NAME} (“we,” “us,” or “our”) operates ${LEGAL_SITE_DOMAIN} as an informational and lead-generation platform for real estate investors exploring rental property equity and financing options.`,
      "This Privacy Policy describes how we collect, use, disclose, and safeguard information when you visit our website or submit a request through our forms.",
      "We collect information to help connect you with financing options and licensed lending partners that may be available for your scenario, subject to qualification, underwriting, property eligibility, and applicable guidelines.",
      `${FOOTER_PLATFORM_DISCLOSURE}`,
    ],
  },
  {
    id: "information-we-collect",
    title: "Information we collect",
    paragraphs: ["We may collect the following categories of information:"],
    bullets: [
      "Contact information you provide (name, email address, phone number).",
      "Property and scenario details (property type, estimated value, mortgage balance, equity goals, credit range, and related funnel responses).",
      "Optional post-submit details (property address, portfolio count, funding timeline, occupancy).",
      "Consent records (TCPA consent timestamp, optional marketing opt-in).",
      "Technical and usage data (pages viewed, device/browser type, approximate location from IP, referral URLs, UTM parameters).",
      "Cookies and similar technologies used for analytics, performance, and conversion measurement (see Cookies and analytics below).",
    ],
  },
  {
    id: "how-we-use",
    title: "How we use information",
    paragraphs: ["We use collected information to:"],
    bullets: [
      "Review your rental property scenario and respond to your request.",
      "Connect you with financing specialists and licensed lending partners who may contact you about programs that may be available, subject to approval.",
      "Operate, maintain, and improve our website, funnel, and internal tools.",
      "Send service-related communications by phone, text message, or email where you have provided consent.",
      "Send optional marketing updates if you opt in (you may opt out at any time).",
      "Measure advertising performance and site analytics.",
      "Comply with legal obligations and enforce our terms.",
    ],
  },
  {
    id: "communications-tcpa",
    title: "Calls, texts, and email (TCPA)",
    paragraphs: [
      `When you submit our lead form and check the required consent box, you agree that ${MARKETING_SITE_NAME} and its lending or marketing partners may contact you at the phone number and email address you provide using automated or manual technology, including calls and text messages, regarding financing options and related services.`,
      "Consent to be contacted is not a condition of obtaining financing or any other service. Message and data rates may apply.",
      "You may opt out of marketing emails using unsubscribe links where provided. For text messages, reply STOP where applicable. You may also contact us to update your communication preferences.",
    ],
  },
  {
    id: "sharing",
    title: "Sharing and service providers",
    paragraphs: [
      "We may share information with service providers and partners who help us operate the site and process leads, including customer relationship management (CRM) platforms, email delivery providers, analytics vendors, and cloud hosting providers.",
      "Lead information may be shared with licensed lending partners, lenders, or broker partners so they can evaluate whether programs may be available for your scenario. Partners are expected to use information in accordance with applicable law and their own privacy policies.",
      "We do not sell your personal information for monetary consideration. We may share data as permitted by law, including in connection with a business transfer, to protect rights and safety, or to comply with legal process.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies and analytics",
    paragraphs: [
      "We use cookies, pixels, and similar technologies to understand site usage, measure conversions, and improve marketing efficiency. These may include analytics and advertising tools configured on the site.",
      "You can control cookies through your browser settings. Disabling cookies may affect site functionality. Where required by law, we will provide additional consent mechanisms.",
    ],
  },
  {
    id: "retention-security",
    title: "Retention and security",
    paragraphs: [
      "We retain information as long as reasonably necessary to fulfill the purposes described in this policy, unless a longer retention period is required by law.",
      "We use reasonable administrative, technical, and organizational measures designed to protect information. No method of transmission or storage is completely secure.",
    ],
  },
  {
    id: "your-choices",
    title: "Your choices and opt-out",
    bullets: [
      "You may opt out of optional marketing emails using unsubscribe links.",
      "You may request access, correction, or deletion of certain personal information where applicable law provides such rights.",
      "California and other state residents may have additional privacy rights — contact us to submit a request.",
    ],
    paragraphs: [
      `Privacy-related requests may be sent to ${PLATFORM_EMAIL} or by calling ${PLATFORM_PHONE_DISPLAY}.`,
    ],
  },
  {
    id: "children",
    title: "Children",
    paragraphs: [
      "Our services are intended for adults. We do not knowingly collect personal information from children under 16.",
    ],
  },
  {
    id: "changes-contact",
    title: "Changes and contact",
    paragraphs: [
      "We may update this Privacy Policy from time to time. The “Last updated” date at the top of this page reflects the latest revision.",
      `Questions about this Privacy Policy may be directed to ${PLATFORM_EMAIL} or ${PLATFORM_PHONE_DISPLAY}.`,
    ],
  },
];

export const TERMS_OF_USE_SECTIONS: LegalSection[] = [
  {
    id: "acceptance",
    title: "Acceptance of terms",
    paragraphs: [
      `By accessing or using ${LEGAL_SITE_DOMAIN}, you agree to these Terms of Use and our Privacy Policy. If you do not agree, do not use the site.`,
    ],
  },
  {
    id: "nature-of-service",
    title: "Nature of the service",
    paragraphs: [
      `${MARKETING_SITE_NAME} provides educational content, calculators, and a digital intake experience for real estate investors exploring rental property equity options. The site collects information to connect users with financing specialists and licensed lending partners.`,
      `${FOOTER_PLATFORM_DISCLOSURE}`,
      "All programs, rates, payments, eligibility, documentation requirements, timelines, and availability are subject to borrower qualification, credit approval, collateral review, lender guidelines, and applicable laws.",
    ],
  },
  {
    id: "eligibility",
    title: "Eligibility",
    paragraphs: [
      "You must be at least 18 years old and able to form a binding contract to use this site. You represent that information you submit is accurate to the best of your knowledge.",
    ],
  },
  {
    id: "consent-communications",
    title: "Consent to communications",
    paragraphs: [
      `When you submit a lead form and provide the required consent, you authorize ${MARKETING_SITE_NAME} and its lending or marketing partners to contact you by phone, text, and email regarding financing options and related services, including through automated technology.`,
      "Consent is not required to use this site or obtain services. Message and data rates may apply. See our Privacy Policy for opt-out information.",
    ],
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    bullets: [
      "Do not use the site for unlawful, fraudulent, or abusive purposes.",
      "Do not attempt to interfere with site security or infrastructure.",
      "Do not scrape, reverse engineer, or misrepresent your identity or property information.",
      "Do not submit false or misleading lead information.",
    ],
    paragraphs: [],
  },
  {
    id: "third-parties",
    title: "Third-party services and links",
    paragraphs: [
      "The site may link to third-party websites or integrate third-party tools (analytics, maps, scheduling, CRM, email). We are not responsible for third-party content, policies, or practices. Your dealings with lenders or partners are solely between you and those parties.",
    ],
  },
  {
    id: "disclaimers",
    title: "Disclaimers",
    paragraphs: [
      "THE SITE AND CONTENT ARE PROVIDED “AS IS” AND “AS AVAILABLE” WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.",
      "Illustrative estimates, examples, and calculator outputs are for informational purposes only and may not reflect actual available terms.",
      MORTGAGE_STANDARD_DISCLAIMER,
    ],
  },
  {
    id: "limitation",
    title: "Limitation of liability",
    paragraphs: [
      `TO THE MAXIMUM EXTENT PERMITTED BY LAW, ${MARKETING_SITE_NAME.toUpperCase()} AND ITS OPERATORS, AFFILIATES, AND SERVICE PROVIDERS WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SITE.`,
    ],
  },
  {
    id: "indemnity",
    title: "Indemnity",
    paragraphs: [
      "You agree to indemnify and hold harmless the platform operator and its affiliates from claims arising out of your misuse of the site or violation of these terms.",
    ],
  },
  {
    id: "governing-law",
    title: "Governing law",
    paragraphs: [
      "These terms are governed by the laws of the United States and the state in which the site operator is established, without regard to conflict-of-law rules. Disputes shall be resolved in the courts of that jurisdiction, unless otherwise required by applicable law.",
    ],
  },
  {
    id: "changes",
    title: "Changes",
    paragraphs: [
      "We may modify these Terms of Use at any time. Continued use after changes constitutes acceptance of the revised terms.",
      `Questions about these terms may be directed to ${PLATFORM_EMAIL} or ${PLATFORM_PHONE_DISPLAY}.`,
    ],
  },
];
