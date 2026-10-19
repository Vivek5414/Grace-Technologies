export const industrySlugByTitle = {
  Healthcare: "healthcare",
  "Financial Services": "financial-services",
  Retail: "retail",
  Manufacturing: "manufacturing",
  Logistics: "logistics",
  "Professional Services": "professional-services",
} as const;

export type IndustrySlug = (typeof industrySlugByTitle)[keyof typeof industrySlugByTitle];

type IndustryDetail = {
  title: string;
  image: string;
  challenges: readonly { title: string; description: string }[];
  solutions: readonly { title: string; description: string; href: string }[];
  workflow: readonly string[];
  insights: readonly { title: string; explanation: string; recommendation: string }[];
};

export const industryDetails: Record<IndustrySlug, IndustryDetail> = {
  healthcare: {
    title: "Healthcare",
    image: "healthcare.png",
    challenges: [
      { title: "Patient-facing experiences", description: "People need clear, accessible ways to find service information and make enquiries." },
      { title: "Administrative workflows", description: "Teams coordinate recurring requests, information handoffs, and follow-up alongside their core work." },
      { title: "Useful information access", description: "Staff and visitors benefit when digital information is organized and easier to navigate." },
      { title: "Reliable digital operations", description: "Digital services need thoughtful design around continuity, privacy, and operational responsibilities." },
    ],
    solutions: [
      { title: "Healthcare website development", description: "Create accessible service pages and clear pathways for visitors seeking information.", href: "/services/web-development" },
      { title: "Enquiry workflow design", description: "Organize how requests are collected, reviewed, and routed for staff follow-up.", href: "/services/ai-automation" },
      { title: "Administrative process automation", description: "Explore practical automation for repeatable administrative tasks with human review.", href: "/services/ai-automation" },
      { title: "Information and reporting support", description: "Structure operational information into useful, reviewable summaries.", href: "/services/merchant-account-management" },
    ],
    workflow: ["Patient Enquiry", "Information Collection", "Staff Review", "Follow-up Coordination"],
    insights: [
      { title: "Make next steps easy to find", explanation: "Visitors can have different needs and levels of familiarity with your services.", recommendation: "Use plain language, clear page hierarchy, and visible contact pathways." },
      { title: "Design around staff handoffs", explanation: "Enquiries can involve more than one team or require a considered response.", recommendation: "Map who reviews each request and how follow-up ownership is communicated." },
      { title: "Treat accessibility as part of delivery", explanation: "Accessible content and interactions make digital services easier to use.", recommendation: "Include keyboard, contrast, and content checks in regular website reviews." },
    ],
  },
  "financial-services": {
    title: "Financial Services",
    image: "financial-services.png",
    challenges: [
      { title: "Clear digital experiences", description: "Customers need information presented in a structured and understandable way." },
      { title: "Organized customer enquiries", description: "Requests may need categorization and routing before the right team can respond." },
      { title: "Consistent operations", description: "Teams benefit from visible processes for recurring tasks and internal handoffs." },
      { title: "Reliable information presentation", description: "Maintaining clear and current digital content takes an intentional review process." },
    ],
    solutions: [
      { title: "Financial services websites", description: "Present services, information, and contact options through a clear user experience.", href: "/services/web-development" },
      { title: "Customer enquiry workflows", description: "Structure intake and review steps so requests can be organized for follow-up.", href: "/services/ai-automation" },
      { title: "Workflow automation", description: "Explore repeatable internal workflows with appropriate human oversight.", href: "/services/ai-automation" },
      { title: "Operational information support", description: "Organize routine operational information into practical summaries and review views.", href: "/services/merchant-account-management" },
    ],
    workflow: ["Customer Enquiry", "Request Categorization", "Team Review", "Follow-up"],
    insights: [
      { title: "Prioritize clarity", explanation: "Complex terminology can make it harder for visitors to understand what action to take.", recommendation: "Use plain-language summaries and distinguish informational content from next steps." },
      { title: "Define enquiry ownership", explanation: "Requests are easier to manage when teams understand how they are triaged.", recommendation: "Document categories, responsible teams, and expected internal handoffs." },
      { title: "Plan content maintenance", explanation: "Service and policy information can change and should remain easy to review.", recommendation: "Assign content owners and schedule a recurring accuracy review." },
    ],
  },
  retail: {
    title: "Retail",
    image: "retail.png",
    challenges: [
      { title: "Product information organization", description: "Accurate, structured product information supports browsing and catalogue maintenance." },
      { title: "Customer digital journeys", description: "Shoppers expect consistent experiences across product discovery and service information." },
      { title: "Online visibility", description: "Useful content and clear product pages help customers find relevant information." },
      { title: "Operational coordination", description: "Catalogue updates and routine requests often involve several business roles." },
    ],
    solutions: [
      { title: "E-commerce websites", description: "Build clear shopping experiences with useful product discovery and navigation.", href: "/services/web-development" },
      { title: "Product listing coordination", description: "Organize catalogue content and listing updates within an agreed workflow.", href: "/services/merchant-account-management" },
      { title: "Digital marketing", description: "Plan search, content, and campaign work around business objectives.", href: "/services/digital-marketing" },
      { title: "Retail workflow automation", description: "Explore ways to organize repeatable catalogue and operational processes.", href: "/services/ai-automation" },
    ],
    workflow: ["Product Information", "Listing Preparation", "Review", "Online Publication"],
    insights: [
      { title: "Keep product content structured", explanation: "Consistent attributes make product information easier to manage and browse.", recommendation: "Define reusable content fields and a review process for catalogue changes." },
      { title: "Review the journey across devices", explanation: "Customers may discover products on one device and continue later on another.", recommendation: "Check navigation, product details, and key actions at mobile and desktop sizes." },
      { title: "Coordinate campaign and catalogue changes", explanation: "Marketing activity depends on product details and availability being current.", recommendation: "Agree on a shared update process between catalogue and marketing owners." },
    ],
  },
  manufacturing: {
    title: "Manufacturing",
    image: "manufacturing.png",
    challenges: [
      { title: "Operational information", description: "Business information can be spread across documents, tools, and team handoffs." },
      { title: "Workflow coordination", description: "Recurring requests often need clear ownership and status visibility." },
      { title: "Internal communication", description: "Teams need dependable ways to share updates and make responsibilities clear." },
      { title: "Access to business data", description: "Useful reporting depends on information being organized for the people who need it." },
    ],
    solutions: [
      { title: "Manufacturing websites", description: "Present capabilities and business information through a clear, professional website.", href: "/services/web-development" },
      { title: "Internal workflow automation", description: "Map repeatable processes and coordinate handoffs with human review.", href: "/services/ai-automation" },
      { title: "Operational information organization", description: "Structure recurring operational updates into practical review workflows.", href: "/services/merchant-account-management" },
      { title: "Business process digitization", description: "Explore digital approaches for organizing everyday business processes.", href: "/services/ai-automation" },
    ],
    workflow: ["Business Request", "Information Review", "Workflow Coordination", "Status Update"],
    insights: [
      { title: "Map information handoffs", explanation: "Requests may pass between roles before an action can be completed.", recommendation: "Document inputs, owners, and status changes for the workflows that matter most." },
      { title: "Start with a focused process", explanation: "A bounded workflow is easier to understand and evaluate than a broad transformation.", recommendation: "Choose one recurring process and agree on a clear scope before digitizing it." },
      { title: "Make updates useful to their audience", explanation: "Different teams may need different levels of operational detail.", recommendation: "Design summaries around the decisions and actions each team needs to make." },
    ],
  },
  logistics: {
    title: "Logistics",
    image: "logistics.png",
    challenges: [
      { title: "Operational information coordination", description: "Teams need a shared way to organize incoming requests and relevant updates." },
      { title: "Customer enquiry management", description: "Requests need to be captured and categorized before follow-up can be coordinated." },
      { title: "Repetitive administration", description: "Recurring data entry and handoffs can consume time across operational teams." },
      { title: "Communication across workflows", description: "Clear process status helps people understand what needs attention next." },
    ],
    solutions: [
      { title: "Logistics websites", description: "Explain services and provide clear digital enquiry pathways for customers.", href: "/services/web-development" },
      { title: "Request workflow design", description: "Organize service enquiries and operational requests for team review.", href: "/services/ai-automation" },
      { title: "Task automation", description: "Identify repeatable administrative steps suitable for carefully scoped automation.", href: "/services/ai-automation" },
      { title: "Operations information support", description: "Structure recurring information so teams can review and coordinate follow-up.", href: "/services/merchant-account-management" },
    ],
    workflow: ["Service Request", "Request Categorization", "Operations Review", "Follow-up"],
    insights: [
      { title: "Standardize request intake", explanation: "Consistent request details can make triage and assignment more straightforward.", recommendation: "Define the minimum information needed to route each request to the right team." },
      { title: "Clarify status and ownership", explanation: "People can coordinate more effectively when the next owner and action are visible.", recommendation: "Use clear status definitions and agree who updates them at each handoff." },
      { title: "Automate with exceptions in mind", explanation: "Operational requests can vary and may need human judgment.", recommendation: "Keep exception handling and staff review explicit in any proposed workflow." },
    ],
  },
  "professional-services": {
    title: "Professional Services",
    image: "professional-services.png",
    challenges: [
      { title: "Communicating expertise online", description: "Potential clients need to understand a firm's services and areas of focus." },
      { title: "Organizing client enquiries", description: "Incoming requests benefit from clear categorization and follow-up ownership." },
      { title: "Repetitive administrative tasks", description: "Routine coordination can take time away from client-focused work." },
      { title: "Consistent digital content", description: "Keeping service information current requires clear ownership and review." },
    ],
    solutions: [
      { title: "Professional services websites", description: "Present expertise and services through accessible, well-structured pages.", href: "/services/web-development" },
      { title: "Client enquiry workflows", description: "Organize incoming enquiries, team assignment, and follow-up steps.", href: "/services/ai-automation" },
      { title: "Digital marketing", description: "Plan useful content and online visibility work around business goals.", href: "/services/digital-marketing" },
      { title: "AI and workflow automation", description: "Explore practical automation for repeatable internal processes with human review.", href: "/services/ai-automation" },
    ],
    workflow: ["Client Enquiry", "Service Categorization", "Team Assignment", "Follow-up"],
    insights: [
      { title: "Make service information specific", explanation: "Clear service descriptions help prospective clients understand where to start.", recommendation: "Organize pages around client needs, typical questions, and clear contact actions." },
      { title: "Build a dependable enquiry handoff", explanation: "Timely and consistent follow-up depends on an agreed internal process.", recommendation: "Define who reviews new enquiries and how next steps are recorded." },
      { title: "Keep expertise content maintainable", explanation: "Useful insights need ongoing review to stay relevant and accurate.", recommendation: "Set editorial ownership and a manageable publishing and review cadence." },
    ],
  },
};
