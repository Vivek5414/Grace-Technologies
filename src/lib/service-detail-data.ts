import type { ServiceDemoId } from "@/lib/service-demo-data";

export const serviceDetails = {
  "web-development": {
    serviceId: "web-development",
    category: "WEB DEVELOPMENT",
    intro: "Create a clear, responsive digital experience that helps customers understand your business and take the next step.",
    overview: "Web development brings content, interaction, and technology together in a fast, accessible website shaped around your customers and business goals.",
    focus: ["Responsive page and component design", "Accessible, intuitive customer journeys", "Performance, content, and technical foundations"],
    benefits: ["A consistent experience across devices", "Clearer paths from discovery to enquiry", "A flexible foundation for future improvements"],
    deliverables: ["Responsive page templates", "Navigation and interaction patterns", "Launch-ready implementation checklist"],
    demoId: "website",
    demoHref: "/demos/web-development",
    demoLabel: "Open interactive website demo",
  },
  "custom-software-development": {
    serviceId: "custom-software",
    category: "CUSTOM SOFTWARE DEVELOPMENT",
    intro: "Build practical software around the workflows, integrations, and operational needs that off-the-shelf tools miss.",
    overview: "Custom software development turns a well-understood business need into a focused application, with useful workflows and connected information for the people doing the work.",
    focus: ["Workflow and user needs", "Business application interfaces", "Integrations and API requirements"],
    benefits: ["A closer fit for day-to-day processes", "Less context switching between tools", "A maintainable base for future features"],
    deliverables: ["Workflow and feature definition", "Application interface concept", "Integration and delivery outline"],
    demoId: "software",
    demoHref: "/demos/custom-software",
    demoLabel: "Open interactive software demo",
  },
  "it-consulting": {
    serviceId: "it-consulting",
    category: "IT CONSULTING",
    intro: "Make technology decisions with a clearer view of your architecture, delivery priorities, and the outcomes your business needs.",
    overview: "IT consulting provides clear advice on architecture, delivery priorities, and technology decisions, without vendor-led noise. Work can include technology roadmaps and architecture reviews.",
    focus: ["Technology architecture and dependencies", "Delivery priorities and sequencing", "Technology roadmaps and architecture reviews"],
    benefits: ["A shared view of the current state", "Trade-offs and priorities made visible", "Practical next steps tied to business needs"],
    deliverables: ["Current-state assessment", "Prioritized opportunity map", "Phased technology roadmap"],
    demoId: "consulting",
    demoHref: "/demos/it-consulting",
    demoLabel: "Open interactive consulting demo",
  },
  "cloud-solutions": {
    serviceId: "cloud-solutions",
    category: "CLOUD SOLUTIONS",
    intro: "Shape cloud foundations that help teams improve resilience, understand cost, and scale with care.",
    overview: "Cloud solutions bring infrastructure, application needs, security expectations, and operating practices into a dependable environment that can evolve with your organization.",
    focus: ["Cloud architecture and environment planning", "Resilience, access, and service visibility", "Cost awareness and operational readiness"],
    benefits: ["Clearer infrastructure ownership", "Resilience planned around business needs", "A considered path for growth and change"],
    deliverables: ["Cloud environment overview", "Architecture and service map", "Operational readiness checklist"],
    demoId: "cloud",
    demoHref: "/demos/cloud-solutions",
    demoLabel: "Open interactive cloud demo",
  },
  "data-analytics": {
    serviceId: "data-analytics",
    category: "DATA ANALYTICS",
    intro: "Make important business information easier to trust, understand, and act on.",
    overview: "Data analytics organizes useful measures and context into practical reporting, helping teams understand activity and make more informed decisions.",
    focus: ["Reporting questions and decision needs", "Metric definitions and data sources", "Readable dashboards and trend views"],
    benefits: ["A shared understanding of key measures", "Less time assembling routine reports", "More context around business activity"],
    deliverables: ["Metric and reporting definitions", "Dashboard and chart concepts", "Data source and refresh outline"],
    demoId: "analytics",
    demoHref: "/demos/data-analytics",
    demoLabel: "Open interactive analytics demo",
  },
  "digital-transformation": {
    serviceId: "digital-transformation",
    category: "DIGITAL TRANSFORMATION",
    intro: "Connect changes to process, platforms, and working practices to make everyday progress practical.",
    overview: "Digital transformation starts with how work happens today, then connects process improvements, systems, and team needs into a sequence that can be delivered and supported.",
    focus: ["Business process and handoffs", "Connected systems and shared information", "Change sequencing and team readiness"],
    benefits: ["Clearer ownership across workflows", "Fewer disconnected steps and tools", "A practical path from plan to adoption"],
    deliverables: ["Workflow and handoff map", "Automation opportunity outline", "Phased adoption plan"],
    demoHref: "/demos/digital-transformation",
    demoLabel: "Open interactive workflow demo",
  },
  "mobile-app-development": {
    serviceId: "mobile-app-development",
    category: "MOBILE APPLICATION DEVELOPMENT",
    intro: "Plan and build mobile experiences around the tasks, devices, and people your business needs to support.",
    overview: "Mobile application development connects user journeys, interface design, and technical planning to create useful experiences for phones and tablets.",
    focus: ["Mobile user journeys and feature priorities", "iOS and Android interface planning", "Accessibility, integration, and release considerations"],
    benefits: ["A clearer experience for mobile users", "Features prioritized around real tasks", "A considered path from concept to release"],
    deliverables: ["Mobile journey and feature outline", "Screen and interaction concepts", "Technical and release considerations"],
    demoHref: "/contact",
    demoLabel: "Discuss mobile app development",
    previewSteps: ["Map user journeys", "Design mobile screens", "Build app workflows", "Prepare for release"],
  },
  "ai-data-solutions": {
    serviceId: "ai-data-solutions",
    category: "AI AND DATA SOLUTIONS",
    intro: "Explore practical, responsible ways to make business data more useful and apply AI with appropriate human oversight.",
    overview: "AI and data solutions begin with the information, decisions, and workflows that matter. We help assess data foundations and identify carefully scoped opportunities for analytics or AI.",
    focus: ["Data sources, quality, and access", "Suitable analytics and AI opportunities", "Human review, privacy, and operational fit"],
    benefits: ["Better clarity about data readiness", "Use cases linked to specific needs", "Risks and human review considered early"],
    deliverables: ["Data readiness and use-case outline", "Analytics or AI concept", "Governance and review considerations"],
    demoHref: "/contact",
    demoLabel: "Discuss AI and data solutions",
    previewSteps: ["Identify a business question", "Review data readiness", "Explore a focused use case", "Keep people in the loop"],
  },
  "ui-ux-design": {
    serviceId: "ui-ux-design",
    category: "UI/UX DESIGN",
    intro: "Shape clear, accessible digital experiences around user needs and the tasks your product must support.",
    overview: "UI/UX design brings research, content, interaction, and visual design together so products feel understandable and consistent across devices.",
    focus: ["User needs, journeys, and task flows", "Accessible interface and interaction design", "Prototypes and usability feedback"],
    benefits: ["Clearer journeys through key tasks", "Interfaces designed with accessibility in mind", "Feedback incorporated before implementation"],
    deliverables: ["User journey and flow maps", "Interface and interaction concepts", "Prototypes for review and refinement"],
    demoHref: "/contact",
    demoLabel: "Discuss UI/UX design",
    previewSteps: ["Understand user needs", "Map content and flows", "Prototype key screens", "Test and refine the experience"],
  },
} as const satisfies Record<string, {
  serviceId: (typeof import("@/lib/site-data").services)[number]["id"];
  category: string;
  intro: string;
  overview: string;
  focus: readonly string[];
  benefits: readonly string[];
  deliverables: readonly string[];
  previewSteps?: readonly string[];
  demoId?: ServiceDemoId;
  demoHref?: string;
  demoLabel?: string;
}>;

export type ServiceDetailSlug = keyof typeof serviceDetails;

export const serviceDetailSlugById = {
  "web-development": "web-development",
  "custom-software": "custom-software-development",
  "it-consulting": "it-consulting",
  "cloud-solutions": "cloud-solutions",
  "data-analytics": "data-analytics",
  "digital-transformation": "digital-transformation",
  "mobile-app-development": "mobile-app-development",
  "ai-data-solutions": "ai-data-solutions",
  "ui-ux-design": "ui-ux-design",
} as const satisfies Record<(typeof import("@/lib/site-data").services)[number]["id"], ServiceDetailSlug>;