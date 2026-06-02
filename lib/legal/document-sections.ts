import { CONTACT_PHONE_DISPLAY } from "@/lib/contact";
import { MORTGAGE_COMPANY_NAME, MORTGAGE_STANDARD_DISCLAIMER } from "@/lib/legal/compliance";
import { NMLS_LABEL, NMLS_NUMBER, COMPANY_NMLS_LABEL } from "@/lib/legal/nmls";

export type LegalSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export const PRIVACY_POLICY_SECTIONS: LegalSection[] = [
  {
    id: "overview",
    title: "Overview",
    paragraphs: [
      "RentPropertyHELOC.com (“we,” “us,” or “our”) provides educational information and a lead intake experience for real estate investors exploring rental property equity and financing options. This Privacy Policy describes how we collect, use, disclose, and safeguard information when you visit our website or submit a request through our forms.",
      "This site is a lead-generation and information platform. It is not a commitment to lend, an offer of credit, or financial, legal, or tax advice. Programs may be available for qualifying properties, subject to approval, property eligibility, investor/lender guidelines, and state availability.",
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
      "Cookies and similar technologies used for analytics, performance, and conversion measurement (see Cookies & analytics below).",
    ],
  },
  {
    id: "how-we-use",
    title: "How we use information",
    paragraphs: ["We use collected information to:"],
    bullets: [
      "Review your rental property scenario and respond to your request.",
      "Connect you with licensed mortgage professionals, loan officers, or lending partners who may contact you about programs that may be available, subject to approval.",
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
      "When you submit our lead form and check the required consent box, you agree that RentPropertyHELOC.com and its lending or marketing partners may contact you at the phone number and email address you provide using automated or manual technology, including calls and text messages, regarding financing options and related services.",
      "Consent to be contacted is not a condition of purchasing any goods or services. Message and data rates may apply. You may opt out of marketing messages by following unsubscribe instructions or contacting us. For texts, reply STOP where applicable.",
    ],
  },
  {
    id: "sharing",
    title: "Sharing and CRM processing",
    paragraphs: [
      "We may share information with service providers and partners who help us operate the site and process leads, including customer relationship management (CRM) platforms such as HubSpot, email delivery providers, analytics vendors, and cloud hosting providers.",
      "Lead information may be shared with licensed mortgage professionals, lenders, or broker partners so they can evaluate whether programs may be available for your scenario. Partners are expected to use information in accordance with applicable law and their own privacy policies.",
      "We do not sell your personal information for monetary consideration. We may share data as permitted by law, including in connection with a business transfer, to protect rights and safety, or to comply with legal process.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies and analytics",
    paragraphs: [
      "We use cookies, pixels, and similar technologies to understand site usage, measure conversions, and improve marketing efficiency. These may include Google Analytics 4, Meta Pixel, and other tools configured on the site.",
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
    title: "Your choices",
    bullets: [
      "You may opt out of optional marketing emails using unsubscribe links.",
      "You may request access, correction, or deletion of certain personal information where applicable law provides such rights.",
      "California and other state residents may have additional privacy rights — contact us to submit a request.",
    ],
    paragraphs: [],
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
      "We may update this Privacy Policy from time to time. The “Last updated” date below reflects the latest revision.",
      "Questions about this Privacy Policy may be directed through the contact options on RentPropertyHELOC.com or by mail to the business address on file for the site operator.",
    ],
  },
];

export const TERMS_OF_USE_SECTIONS: LegalSection[] = [
  {
    id: "acceptance",
    title: "Acceptance of terms",
    paragraphs: [
      "By accessing or using RentPropertyHELOC.com, you agree to these Terms of Use and our Privacy Policy. If you do not agree, do not use the site.",
    ],
  },
  {
    id: "nature-of-service",
    title: "Nature of the service",
    paragraphs: [
      "RentPropertyHELOC.com provides educational content, calculators, and a digital intake experience for real estate investors exploring rental property equity options. The site helps connect interested users with licensed professionals who may review whether financing programs may be available, subject to approval.",
      "Nothing on this site constitutes a loan application, commitment to lend, guarantee of rates or terms, or recommendation to enter any transaction. All programs, rates, payments, eligibility, documentation requirements, timelines, and availability are subject to borrower qualification, credit approval, collateral review, investor/lender guidelines, and applicable laws.",
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
      "When you submit a lead form and provide the required consent, you authorize RentPropertyHELOC.com and its lending or marketing partners to contact you by phone, text, and email regarding financing options and related services, including through automated technology.",
      "Consent is not required to purchase services. Message and data rates may apply. See our Privacy Policy for opt-out information.",
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
      "The site may link to third-party websites or integrate third-party tools (analytics, maps, CRM, email). We are not responsible for third-party content, policies, or practices. Your dealings with lenders or partners are solely between you and those parties.",
    ],
  },
  {
    id: "disclaimers",
    title: "Disclaimers",
    paragraphs: [
      "THE SITE AND CONTENT ARE PROVIDED “AS IS” AND “AS AVAILABLE” WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.",
      "Illustrative estimates, examples, and calculator outputs are for informational purposes only and may not reflect actual available terms.",
    ],
  },
  {
    id: "limitation",
    title: "Limitation of liability",
    paragraphs: [
      "TO THE MAXIMUM EXTENT PERMITTED BY LAW, RENTPROPERTYHELOC.COM AND ITS OPERATORS, AFFILIATES, AND SERVICE PROVIDERS WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SITE.",
    ],
  },
  {
    id: "indemnity",
    title: "Indemnity",
    paragraphs: [
      "You agree to indemnify and hold harmless the site operator and its affiliates from claims arising out of your misuse of the site or violation of these terms.",
    ],
  },
  {
    id: "licensing",
    title: "Licensing disclosure",
    paragraphs: [
      `RentPropertyHELOC.com is an educational and lead-generation platform that may connect you with licensed mortgage professionals and lending partners. ${NMLS_LABEL}. Nothing on this site is a loan application or commitment to lend.`,
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
    ],
  },
];

export const DISCLOSURES_SECTIONS: LegalSection[] = [
  {
    id: "licensing",
    title: "Licensing",
    paragraphs: [
      `Chris Butler — ${NMLS_LABEL}.`,
      `${MORTGAGE_COMPANY_NAME} — ${COMPANY_NMLS_LABEL}.`,
    ],
  },
  {
    id: "licensed-states",
    title: "Licensed states",
    paragraphs: ["Chris Butler is licensed in the following states:"],
    bullets: [
      "Arizona",
      "California",
      "Colorado",
      "Florida",
      "Illinois",
      "Michigan",
      "Oregon",
      "Texas",
      "Washington",
    ],
  },
  {
    id: "mortgage-disclaimer",
    title: "Mortgage disclaimer",
    paragraphs: [MORTGAGE_STANDARD_DISCLAIMER],
  },
  {
    id: "lead-generation",
    title: "Lead generation",
    paragraphs: [
      "When you submit information through this website, you are requesting that a licensed mortgage professional review your property scenario. Your information may be stored in customer relationship management systems and shared with licensed professionals or lending partners for that purpose.",
      "Submitting a form does not create a lender-borrower relationship, loan application, or commitment to lend. A licensed professional may contact you by phone, text, or email where you have provided consent.",
    ],
  },
  {
    id: "contact",
    title: "Contact",
    paragraphs: [
      `Questions about disclosures or licensing may be directed through the contact options on this site, including ${CONTACT_PHONE_DISPLAY}.`,
      `You may verify licensing status through the Nationwide Multistate Licensing System (NMLS) Consumer Access website at nmlsconsumeraccess.org by searching individual NMLS #${NMLS_NUMBER}.`,
    ],
  },
];
