export const services = [
  {
    id: "web-development",
    title: "Web Development",
    description: "Fast, accessible websites and web applications shaped around the way your business serves customers.",
    support: "Web platforms · E-commerce · Customer portals",
  },
  {
    id: "custom-software",
    title: "Custom Software Development",
    description: "Purpose-built software for the workflows, integrations, and operational needs off-the-shelf tools miss.",
    support: "Business applications · Integrations · APIs",
  },
  {
    id: "it-consulting",
    title: "IT Consulting",
    description: "Clear advice on architecture, delivery priorities, and technology decisions, without vendor-led noise.",
    support: "Technology roadmaps · Architecture · Delivery reviews",
  },
  {
    id: "cloud-solutions",
    title: "Cloud Solutions",
    description: "Thoughtful cloud foundations that help teams improve resilience, manage cost, and scale with care.",
    support: "Cloud migration · Infrastructure · Modernization",
  },
  {
    id: "data-analytics",
    title: "Data Analytics",
    description: "Practical reporting and data tools that make important information easier to trust and act on.",
    support: "Dashboards · Data pipelines · Reporting",
  },
  {
    id: "digital-transformation",
    title: "Digital Transformation",
    description: "Connected changes to process, platforms, and working practices that turn strategy into everyday progress.",
    support: "Process redesign · Change support · Enablement",
  },
  {
    id: "mobile-app-development",
    title: "Mobile Application Development",
    description: "Mobile experiences designed around real user journeys, business needs, and the devices people use every day.",
    support: "iOS and Android planning · Mobile interfaces · App delivery",
  },
  {
    id: "ai-data-solutions",
    title: "AI and Data Solutions",
    description: "Explore responsible ways to organize business data and apply AI where it can support useful, human-reviewed work.",
    support: "Data foundations · AI opportunities · Reporting",
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    description: "Clear, accessible interfaces shaped by user needs, content, and the tasks people need to complete.",
    support: "User journeys · Interface design · Prototyping",
  },
] as const;

export const industries = [
  { title: "Healthcare", detail: "Patient-centered services and connected operations" },
  { title: "Financial Services", detail: "Secure, dependable digital experiences" },
  { title: "Retail", detail: "Customer journeys and commerce operations" },
  { title: "Manufacturing", detail: "Production visibility and better-connected systems" },
  { title: "Logistics", detail: "Planning, tracking, and operational coordination" },
  { title: "Professional Services", detail: "Client delivery and internal knowledge workflows" },
] as const;

export const projects = [
  {
    title: "Business Website",
    industry: "DEMO · WEB DESIGN",
    challenge: "A business needs a clear way to explain its services and help visitors make an enquiry.",
    solution: "A responsive, accessible website concept with simple navigation and a focused contact journey.",
    outcome: "Clear service pages and a straightforward way for visitors to make an enquiry.",
  },
  {
    title: "E-commerce Platform",
    industry: "DEMO · COMMERCE",
    challenge: "Customers need product discovery and checkout to work smoothly across devices.",
    solution: "A commerce concept with clear product categories, accessible details, and a streamlined checkout flow.",
    outcome: "A product discovery and checkout journey designed for desktop and mobile.",
  },
  {
    title: "Business Automation Dashboard",
    industry: "DEMO · AUTOMATION",
    challenge: "A team wants a shared view of recurring tasks and workflow status.",
    solution: "A dashboard concept that groups common workflows, ownership, and progress in one interface.",
    outcome: "A shared dashboard concept showing task ownership and workflow status.",
  },
] as const;

export const processSteps = [
  { number: "01", title: "Discover", text: "We learn how your business works, hear what is getting in the way, and agree on the problem worth solving." },
  { number: "02", title: "Plan", text: "Together we set the scope, sequence the work, and make trade-offs visible before delivery begins." },
  { number: "03", title: "Build", text: "We develop and test in practical increments, sharing progress and inviting feedback as we go." },
  { number: "04", title: "Launch", text: "We prepare teams for the change, support rollout, and make room for what needs to improve next." },
] as const;
