type LinkParagraph = { before: string; linkText: string; href: string; after: string };

type LegalSection = {
  title: string;
  paragraphs: string[];
  linkParagraph: LinkParagraph | null;
};

type PrivacySection = {
  title: string;
  paragraphs: string[];
  list: string[];
  linkParagraph: LinkParagraph | null;
};

type ProcessStage = {
  n: string;
  tag: string;
  title: string;
  body: string;
  trust: string | null;
};

export const en = {
  nav: {
    portfolio: "Portfolio",
    articles: "Articles",
    howWeWork: "How We Work",
    estimate: "Estimate",
    startProject: "Start a Project",
    toggleMenu: "Toggle menu",
  },
  footer: {
    tagline:
      "A Malaysian interior design studio based in Iskandar Puteri, working across residential and commercial spaces.",
    explore: "Explore",
    services: "Services",
    about: "About",
    ourTeam: "Our Team",
    studioGovernance: "Studio Governance",
    ourTerms: "Our Terms",
    termsOfService: "Terms of Service",
    privacyPolicy: "Privacy Policy",
    contact: "Contact",
    location: "Horizon Hills, Iskandar Puteri, Johor",
    copyright: "© 2026 Inzterior. All rights reserved.",
    tradingName:
      "Inzterior is the trading name of Istory Design Studio (SSM Reg. No. SA0647003-M).",
    follow: "Follow",
    facebook: "Facebook",
    instagram: "Instagram",
    tiktok: "TikTok",
  },
  languagePopup: {
    heading: "Choose your language",
    body: "Select the language you'd like to view this site in.",
    english: "English",
    malay: "Bahasa Melayu",
    chinese: "中文",
  },
  languageSwitcher: {
    ariaLabel: "Change language",
  },
  home: {
    eyebrow: "Interior Design Studio · Horizon Hills, Iskandar Puteri",
    headingPart1: "Spaces designed around how you",
    headingEmphasis: "actually",
    headingPart2: "live.",
    lead: "Inzterior turns empty units into considered, liveable spaces — for homeowners and businesses across Johor, under a written contract from day one.",
    ctaPrimary: "Start a Project",
    ctaSecondary: "See How It Works ↓",
    founderBadge: "BY",
    founderTextPart1: "Founded by",
    founderName: "Billy Yeap",
    founderTextPart2:
      "under Istory Design Studio (SSM Reg. No. SA0647003-M) — a real, registered studio, not just a WhatsApp number.",
    founderCta: "Read Our Story →",
    moodEyebrow: "What We Design Toward",
    moodHeading: "The feeling every space should have",
    moodCaption:
      "Reference imagery — our own project portfolio is in progress as current work is completed.",
    closingEyebrow: "Let's Talk",
    closingHeading: "Have a space in mind?",
    closingLead:
      "Whether it's a new home, an office fit-out, or a single room refresh — tell us about it.",
    closingCta: "Book a Consultation",
  },
  processTimeline: {
    eyebrow: "How It Works",
    heading: "Every stage protected — not just promised",
    showPaymentTerms: "See the exact payment terms →",
    hidePaymentTerms: "Hide payment terms ↑",
    stages: [
      {
        n: "01",
        tag: "Discovery Consultation",
        title: "We start by listening, not selling",
        body: "We walk the space (or review your floor plan) and talk through budget, timeline, and how you actually want to live in it — no obligation, no pressure to sign anything yet.",
        trust: null,
      },
      {
        n: "02",
        tag: "Concept & Proposal",
        title: "Nothing starts until it's in writing",
        body: "Mood boards, layout options, and an itemised quote — reviewed together before anything is signed.",
        trust:
          "A written contract covers scope, materials, and timeline before any work begins beyond the design deposit.",
      },
      {
        n: "03",
        tag: "Design Development",
        title: "You pay for what's built, not what's promised",
        body: "Detailed drawings, material and furniture selection, and 3D visualization sign-off before any carpentry begins.",
        trust:
          "A small design deposit gets us started — further payments release only against completed milestones.",
      },
      {
        n: "04",
        tag: "Build & Handover",
        title: "Six months of coverage after we're done",
        body: "On-site coordination through to final styling and a walkthrough before you move in.",
        trust:
          "Photo and video updates at every milestone, plus a 6-month defects warranty after handover.",
      },
    ] as ProcessStage[],
  },
  paymentStages: [
    {
      n: 1,
      title: "Design Deposit (~10%)",
      body: "Starts the design phase. This is the only payment due before any design work begins — nothing is asked for upfront beyond it.",
    },
    {
      n: 2,
      title: "Design Sign-off",
      body: "Due once you've approved the final design and material selections — not before.",
    },
    {
      n: 3,
      title: "Materials & Carpentry",
      body: "Due when materials are ordered and carpentry production begins.",
    },
    {
      n: 4,
      title: "On-Site Installation",
      body: "Due as on-site work is carried out — matched to what's physically been installed.",
    },
    {
      n: 5,
      title: "Handover",
      body: "The final payment, due at practical completion and handover of the finished space.",
    },
  ],
  services: {
    eyebrow: "What We Do",
    heading: "Full-service interior design, from first sketch to final styling.",
    lead: "Every project is scoped to fit the space, the budget, and how you actually plan to use it — we don't sell one-size-fits-all packages.",
    items: [
      {
        title: "Residential Design",
        body: "Full-home and single-room interiors for condos, landed homes, and renovations — layout, materials, furniture, and styling.",
      },
      {
        title: "Commercial & Office Design",
        body: "Retail, F&B, and office fit-outs designed around brand, workflow, and how customers or staff move through the space.",
      },
      {
        title: "Renovation & Turnkey Delivery",
        body: "End-to-end project management — contractor coordination, site supervision, and timeline management so you have one point of contact.",
      },
      {
        title: "Space Planning & 3D Visualization",
        body: "Floor plan optimisation and photorealistic 3D renders, so you can see and approve the design before construction starts.",
      },
      {
        title: "Furniture & Styling",
        body: "Sourcing, custom carpentry coordination, and final styling — the details that make a finished space feel complete.",
      },
      {
        title: "Design Consultation",
        body: "A single paid consultation for homeowners who want expert direction without committing to a full project yet.",
      },
    ],
    ctaEyebrow: "Ready When You Are",
    ctaHeading: "Tell us about your space",
    ctaLead:
      "Every quote is scoped after a discovery consultation — no generic packages, no surprise costs.",
    ctaButton: "Book a Consultation",
  },
  about: {
    eyebrow: "About Inzterior",
    heading:
      "Malaysia's interior design industry has a trust problem. Here's how we're different.",
    p1: "Deposit-and-disappear contractors, half-finished renovations, designers who were never properly registered — these stories are common enough that many homeowners delay renovating altogether just to avoid the risk. Billy Yeap started Inzterior to be the opposite of that.",
    p2: "Every project runs on a written contract before a ringgit changes hands beyond a small design deposit. Payments are staged to match actual progress — you pay for what's been built, not what's been promised. The studio operates under the registered business Istory Design Studio (SSM Reg. No. SA0647003-M), trading publicly as Inzterior — a real, registered business with a real address in Horizon Hills, Iskandar Puteri.",
    section2Eyebrow: "How We Protect You",
    section2Heading: "Five things every client gets, no exceptions",
    trustPoints: [
      {
        n: 1,
        title: "A Written Contract",
        body: "Scope, materials, and timeline are documented before any work begins beyond the initial design deposit — no verbal promises.",
      },
      {
        n: 2,
        title: "Staged Payments",
        body: "A small deposit starts the design phase. Further payments are released only against completed milestones — you never pay in full for work that hasn't happened.",
      },
      {
        n: 3,
        title: "Progress You Can See",
        body: "Photo and video updates at every milestone, not just a single reveal at the end.",
      },
      {
        n: 4,
        title: "A Defects Warranty",
        body: 'A fixed warranty period after handover covers workmanship issues — the project isn\'t "done" the moment you pay the final invoice.',
      },
      {
        n: 5,
        title: "A Real, Registered Business",
        body: "SSM Reg. No. SA0647003-M and a real studio address in Horizon Hills, Iskandar Puteri — not just a Facebook page and a WhatsApp number.",
      },
    ],
    section3Eyebrow: "What We Believe",
    section3Heading: "Design should serve how you live, not the other way around",
    beliefs: [
      {
        title: "Function First",
        body: "A beautiful room that doesn't work for your daily routine isn't good design — we plan for real life before we plan for looks.",
      },
      {
        title: "Transparent Process",
        body: "Itemised quotes, clear timelines, and one point of contact from concept to handover — no vague scopes or hidden costs.",
      },
      {
        title: "Built for Malaysia",
        body: "Climate, space constraints, and local sourcing shape every recommendation — not imported templates that don't fit the context.",
      },
    ],
    closingEyebrow: "Get in Touch",
    closingHeading: "Let's talk about your space",
    closingButton: "Book a Consultation",
  },
  contact: {
    eyebrow: "Get in Touch",
    heading: "Let's talk about your space.",
    lead: "Tell us a bit about your project and we'll get back to you to arrange a discovery consultation.",
    emailLabel: "Email",
    locationLabel: "Studio Location",
    locationValue: "No. 58A, Jalan Eka 3, Horizon Hills, 79100 Iskandar Puteri, Johor, Malaysia",
    responseLabel: "Response Time",
    responseValue: "We typically reply within 1–2 business days.",
  },
  contactForm: {
    nameLabel: "Name",
    emailLabel: "Email",
    phoneLabel: "Phone (optional)",
    projectTypeLabel: "Project Type",
    selectOne: "Select one",
    options: {
      residentialFull: "Residential — Full Home",
      residentialSingle: "Residential — Single Room",
      commercialOffice: "Commercial / Office",
      renovation: "Renovation",
      consultationOnly: "Consultation Only",
    },
    messageLabel: "Tell us about your space",
    messagePlaceholder:
      "Location, size, budget range, timeline, and what you're hoping to achieve...",
    submitting: "Sending...",
    submit: "Send Enquiry",
    errorRequired: "Please fill in your name, email, and project details.",
    errorGeneric: "Something went wrong. Please email inquiry@inzterior.com directly.",
    success: "Thanks — we've got your enquiry and will be in touch soon.",
  },
  estimate: {
    eyebrow: "Get an Estimate",
    heading: "See a price range before you talk to us.",
    lead: "Adjust the inputs below for an instant, preliminary range. No account, no obligation — and it's not a fixed quote. Your exact price gets documented in a written contract after a free discovery consultation.",
  },
  quoteCalculator: {
    propertyTypeLabel: "Property Type",
    propertyTypes: {
      landed: "Landed Terrace / Semi-D / Bungalow",
      condo: "Strata Condo / Serviced Residence",
      "commercial-lot": "Commercial / Retail Lot",
    } as Record<"landed" | "condo" | "commercial-lot", string>,
    propertyNote:
      "For context only — this doesn't change the estimate below, but helps us prepare for your project type ahead of a consultation.",
    projectTypeLabel: "Project Type",
    projectTypes: {
      residential: "Residential",
      commercial: "Commercial / Office",
    } as Record<"residential" | "commercial", string>,
    scopeLabel: "Scope",
    scopes: {
      consultation: {
        label: "Design Consultation Only",
        note: "Design direction and floor plan advice — you manage the build yourself.",
      },
      "design-styling": {
        label: "Design + Styling",
        note: "Full design, furniture sourcing, and styling — you (or your own contractor) manage execution.",
      },
      "full-renovation": {
        label: "Full Renovation (Turnkey)",
        note: "End-to-end: design, materials, contractor coordination, and styling under one contract.",
      },
    } as Record<"consultation" | "design-styling" | "full-renovation", { label: string; note: string }>,
    tierLabel: "Finish Tier",
    tiers: {
      budget: "Budget",
      mid: "Mid-Range",
      premium: "Premium",
    } as Record<"budget" | "mid" | "premium", string>,
    sizeLabel: "Size (square feet)",
    estimatedRangeLabel: "Estimated Range",
    disclaimerPart1:
      "This is a preliminary estimate, not a fixed quote. Your exact price will be documented in a written contract after a free discovery consultation — see ",
    disclaimerLinkText: "how we protect every client",
    disclaimerPart2: ".",
    emailEstimateHeading: "Get this estimate emailed to you",
    nameLabel: "Name",
    emailLabel: "Email",
    submit: "Email Me This Estimate",
    submitting: "Sending...",
    errorRequired: "Please fill in your name and email.",
    errorGeneric: "Something went wrong. Please email inquiry@inzterior.com directly.",
    success: "Thanks — we've got your estimate request and will follow up soon.",
  },
  team: {
    eyebrow: "Our Team",
    heading: "The people behind every project",
    lead: "Inzterior operates under the registered business Istory Design Studio (SSM Reg. No. SA0647003-M), based in Horizon Hills, Iskandar Puteri. Every project is led by a single point of contact, backed by a vetted network of contractors and tradespeople.",
    members: [
      {
        initials: "BY",
        name: "Billy Yeap",
        role: "Founder & Principal Designer",
        bio: "Billy started Inzterior to fix the trust problem he kept seeing in Malaysia's renovation industry — deposit-and-disappear contractors, vague scopes, and designers who were never properly registered. He leads every project's design direction and stays as the client's single point of contact from concept to handover.",
      },
      {
        initials: "JY",
        name: "Jackie Yap",
        role: "Co-founder",
        // Placeholder — Billy and Jackie will supply the real bio copy later.
        bio: "Jackie co-founded Inzterior alongside Billy, bringing the same commitment to transparent, well-documented renovation projects across Iskandar Puteri and Johor Bahru.",
      },
    ],
    craftEyebrow: "How We Work",
    craftHeading: "A small team, a clear process",
    craft: [
      {
        title: "Design",
        body: "Space planning, mood boards, and material selection tailored to how you actually live — not a template pulled off the shelf.",
      },
      {
        title: "Project Management",
        body: "One point of contact coordinates contractors, timelines, and milestone payments so nothing falls through the cracks.",
      },
      {
        title: "Site Execution",
        body: "A vetted network of contractors and tradespeople carries out the work, with progress documented in photos and video at every stage.",
      },
    ],
    closingEyebrow: "Get in Touch",
    closingHeading: "Let's talk about your space",
    closingButton: "Book a Consultation",
  },
  portfolio: {
    eyebrow: "Design Direction",
    heading: "The concept work behind every Inzterior project.",
    lead: "These are concept studies — the aesthetic direction and spatial thinking that shape how we approach a space, published while our first completed Iskandar Puteri projects are still underway. Full project documentation is on its way.",
  },
  portfolioGallery: {
    tabConcept: "Concept & Aesthetic Direction",
    tabActive: "Active Projects",
    galleryItems: [
      "Residential — Living Room",
      "Residential — Kitchen",
      "Commercial — Office",
      "Residential — Bedroom",
      "Commercial — F&B",
      "Residential — Full Home",
    ],
    conceptBadge: "Concept Study",
    conceptHeading: "Want to see recent work directly?",
    conceptBody:
      "Get in touch and we'll walk you through examples of work like this in person.",
    conceptButton: "Get in Touch",
    activeHeading: "Active project documentation is on the way",
    activeBody:
      "We're photographing and documenting current Iskandar Puteri projects as they complete — floor plans, on-site progress, and finished spaces will appear here directly, not stock imagery.",
    activeButton: "Ask About a Project in Progress",
  },
  articles: {
    eyebrow: "Articles",
    heading: "Straight answers on renovating in Johor.",
    lead: "Practical guides on cost, contracts, and process from the Inzterior team — grounded in what we actually see doing this work in Iskandar Puteri and Johor Bahru.",
    empty: "New articles are on the way — check back soon.",
    published: "Published",
    updated: "Updated",
    photoBy: "Photo by",
    onPexels: "on Pexels",
    ctaHeading: "Ready to talk about your space?",
    ctaButton: "Start a Project",
    englishOnlyNotice: "This article is available in English only.",
  },
  terms: {
    eyebrow: "Our Terms",
    heading:
      "You can read our payment structure, contract terms, and warranty right now — before you give us your phone number.",
    lead: "Every other decision about your project is personal — the layout, the materials, the budget. These aren't. They're the same for every client, published here, and written into your contract before any work beyond the design deposit begins.",
    paymentEyebrow: "Payment Structure",
    paymentHeading: "How payments work, stage by stage",
    paymentFootnote:
      "The exact percentage for each stage is set out in your project's written contract, calculated against your total project value once we've scoped the work — so you know what's due, and why, before you ever pay it.",
    contextBoxLabel: "For context:",
    contextBoxBody:
      "Singapore's strictest renovation consumer-protection scheme caps deposits at 20% of project value. Malaysia has no equivalent scheme — deposits asked upfront, before any contract is signed, are often well above that. Our design deposit is roughly half of Singapore's cap, and released in stages tied to what's actually been done, not a fixed calendar date.",
    cards: [
      {
        eyebrow: "Written Contract",
        heading: "Everything in writing, before you commit",
        body: "Scope, materials, and timeline are documented in a written contract before any work begins beyond the design deposit. Nothing about your project is agreed over WhatsApp or a phone call alone.",
      },
      {
        eyebrow: "Progress Transparency",
        heading: "You'll see it as it happens",
        body: "Photo and video updates at every milestone — not just a single reveal at the end. This is a standard part of how a project runs with us, not a favour.",
      },
      {
        eyebrow: "Defects Warranty",
        heading: "We're still on the hook after handover",
        body: "For 6 months after handover, we return to fix workmanship issues — problems with how something was installed or finished — at no extra cost. This doesn't cover normal wear and tear, or damage caused after handover.",
      },
      {
        eyebrow: "Changes & Variations",
        heading: "Changes are still written down",
        body: "If you want to change something after the contract is signed, we document the change and its cost impact in writing and get your approval before proceeding — no invoices for changes you didn't agree to.",
      },
    ],
    legalEyebrow: "Legal Identity",
    legalHeading: "A real, registered business",
    legalP1:
      "Inzterior is the trading name of Istory Design Studio, a business registered with the Companies Commission of Malaysia (SSM Reg. No. SA0647003-M), based in Horizon Hills, Iskandar Puteri, Johor — a real address, not just a Facebook page and a WhatsApp number.",
    legalP2Part1:
      "You can verify this registration yourself, independently of anything we tell you, via ",
    legalP2LinkText: "SSM e-Info",
    legalP2Part2: ", the official company search portal of Suruhanjaya Syarikat Malaysia (SSM).",
    goodToKnowLabel: "Good to know:",
    goodToKnowBody:
      "Istory Design Studio is registered as a sole proprietorship — not a private limited company (Sdn Bhd). What that means for you as a client: with a Sdn Bhd, limited liability protects the owner if something goes wrong, not the customer. Your actual protection comes from the payment structure above — because payments are staged and released against completed work, your exposure at any point in the project is capped by the schedule, regardless of what kind of company you're dealing with.",
    closingEyebrow: "Questions About This",
    closingHeading: "Ask us anything before you sign anything",
    closingLead:
      "None of this is meant to replace a conversation — it's meant to make that conversation start from the same page.",
    closingButton: "Get in Touch",
  },
  termsOfService: {
    eyebrow: "Legal",
    title: "Terms of Service",
    lastUpdated: "Last updated: 30 July 2026",
    introPart1:
      "This page covers the legal terms for using this website. It's a general template and hasn't yet been reviewed by a Malaysian lawyer — treat it as a placeholder pending that review, not final legal advice. If you're looking for how project payments, contracts, and warranty work, see ",
    introLinkText: "Our Terms",
    introPart2: " instead.",
    sections: [
      {
        title: "1. Who these terms apply to",
        paragraphs: [
          'These Terms of Service govern your use of the website located at inzterior.com (the "Site"), operated by Istory Design Studio, trading as Inzterior (SSM Reg. No. SA0647003-M), based in Horizon Hills, Iskandar Puteri, Johor, Malaysia ("Inzterior", "we", "us").',
          "By browsing or using this Site, you agree to these terms. If you don't agree, please don't use the Site.",
        ],
        linkParagraph: {
          before:
            "These terms cover use of the website only. They do not cover the scope, pricing, payment structure, or warranty of any interior design or renovation project — that's governed by a separate written contract signed before project work begins. See our ",
          linkText: "Our Terms",
          href: "/terms",
          after: " page for how project payments, contracts, and warranty work.",
        },
      },
      {
        title: "2. Content and intellectual property",
        paragraphs: [
          "All text, images, logos, layouts, and design elements on this Site are owned by Inzterior or used with permission, unless stated otherwise. You may view and share pages of this Site for personal, non-commercial purposes, but you may not reproduce, copy, or redistribute Site content — including portfolio photography — for commercial use without our written consent.",
          "Reference imagery used to illustrate design direction (where noted) is not Inzterior's own work and remains the property of its respective owners.",
        ],
        linkParagraph: null,
      },
      {
        title: "3. The estimate calculator and quote tools",
        paragraphs: [],
        linkParagraph: {
          before:
            "Any pricing figures generated by tools on this Site (such as the estimate calculator) are indicative only, based on the inputs you provide. They are not a formal quote or offer and do not form part of any contract. A binding, itemised quote is only issued after a proper site visit or floor plan review, as described on our ",
          linkText: "Estimate",
          href: "/estimate",
          after: " page.",
        },
      },
      {
        title: "4. No warranty on Site availability",
        paragraphs: [
          "We try to keep this Site accurate and available, but we make no guarantee that it will be error-free, uninterrupted, or free of viruses or other harmful components. We may update, suspend, or remove parts of the Site at any time without notice.",
        ],
        linkParagraph: null,
      },
      {
        title: "5. Limitation of liability",
        paragraphs: [
          "To the fullest extent permitted by Malaysian law, Inzterior is not liable for any indirect, incidental, or consequential loss arising from your use of this Site, including reliance on indicative pricing or portfolio content. Nothing in this section limits liability that cannot lawfully be excluded.",
        ],
        linkParagraph: null,
      },
      {
        title: "6. Links to other sites",
        paragraphs: [
          "This Site may link to third-party sites (such as the SSM company search portal) for your reference. We don't control and aren't responsible for the content of external sites.",
        ],
        linkParagraph: null,
      },
      {
        title: "7. Changes to these terms",
        paragraphs: [
          "We may update these Terms of Service from time to time. Changes take effect once posted on this page. Continued use of the Site after a change means you accept the updated terms.",
        ],
        linkParagraph: null,
      },
      {
        title: "8. Governing law",
        paragraphs: [
          "These terms are governed by the laws of Malaysia. Any dispute arising from use of this Site is subject to the exclusive jurisdiction of the Malaysian courts.",
        ],
        linkParagraph: null,
      },
      {
        title: "9. Contact",
        paragraphs: [],
        linkParagraph: {
          before: "Questions about these terms can be sent to ",
          linkText: "inquiry@inzterior.com",
          href: "mailto:inquiry@inzterior.com",
          after: ".",
        },
      },
    ] as LegalSection[],
  },
  privacyPolicy: {
    eyebrow: "Legal",
    title: "Privacy Policy",
    lastUpdated: "Last updated: 30 July 2026",
    intro:
      "This page is a general template and hasn't yet been reviewed by a Malaysian lawyer — treat it as a placeholder pending that review, not final legal advice.",
    sections: [
      {
        title: "1. Who this applies to",
        paragraphs: [
          'This Privacy Policy explains how Istory Design Studio, trading as Inzterior (SSM Reg. No. SA0647003-M, "we", "us"), collects and handles personal data when you use inzterior.com. We process personal data in line with Malaysia\'s Personal Data Protection Act 2010 (PDPA).',
        ],
        list: [],
        linkParagraph: null,
      },
      {
        title: "2. What we collect",
        paragraphs: [
          "Information you give us directly — when you use the contact form or the estimate calculator, we collect what you enter: typically your name, email address, phone number, and details about your project (space type, size, budget range, timeline).",
          "Information collected automatically — this Site uses Vercel Analytics and Vercel Speed Insights to understand traffic patterns and page performance. These tools collect aggregated, privacy-preserving usage data (such as page views and load times) and do not use cookies to track you individually across other sites.",
        ],
        list: [],
        linkParagraph: null,
      },
      {
        title: "3. How we use it",
        paragraphs: [],
        list: [
          "To respond to enquiries submitted through the contact form.",
          "To prepare indicative estimates or follow up on quote requests.",
          "To understand how the Site is used, so we can improve it.",
          "To meet legal or regulatory obligations where applicable.",
        ],
        linkParagraph: null,
      },
      {
        title: "4. Who we share it with",
        paragraphs: [
          "We don't sell or rent your personal data. We share it only where necessary to operate — for example, with the email and hosting providers that deliver contact form submissions to us — and never for their independent marketing use. We don't transfer your data outside Malaysia except where our service providers (such as our hosting provider) process it as part of delivering their service.",
        ],
        list: [],
        linkParagraph: null,
      },
      {
        title: "5. How long we keep it",
        paragraphs: [
          "We keep enquiry and project data for as long as reasonably needed to respond to you, deliver a project, and meet accounting or legal record-keeping obligations — after which it's deleted or anonymised.",
        ],
        list: [],
        linkParagraph: null,
      },
      {
        title: "6. Your rights",
        paragraphs: [],
        list: [],
        linkParagraph: {
          before:
            "Under the PDPA, you can ask us to access, correct, or delete the personal data we hold about you, and to withdraw consent for us to contact you. To do this, email ",
          linkText: "inquiry@inzterior.com",
          href: "mailto:inquiry@inzterior.com",
          after: ". We'll respond within a reasonable time.",
        },
      },
      {
        title: "7. Security",
        paragraphs: [
          "We take reasonable technical and organisational steps to protect the personal data we hold, but no method of transmission or storage is completely secure — we can't guarantee absolute security.",
        ],
        list: [],
        linkParagraph: null,
      },
      {
        title: "8. Changes to this policy",
        paragraphs: [
          "We may update this Privacy Policy from time to time. Changes take effect once posted on this page.",
        ],
        list: [],
        linkParagraph: null,
      },
      {
        title: "9. Contact",
        paragraphs: [],
        list: [],
        linkParagraph: {
          before:
            "Questions about this policy, or requests relating to your personal data, can be sent to ",
          linkText: "inquiry@inzterior.com",
          href: "mailto:inquiry@inzterior.com",
          after: ".",
        },
      },
    ] as PrivacySection[],
  },
};
