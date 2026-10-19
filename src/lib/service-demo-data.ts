export const serviceDemos = {
  website: {
    service: "Web Development",
    title: "A responsive business website",
    overview: "A sample digital presence for a fictional business, designed to make its services clear and help customers find the next step.",
  },
  software: {
    service: "Custom Software Development",
    title: "A clearer view of work in progress",
    overview: "A sample business workspace that brings project tasks, team ownership, and delivery status into one place.",
  },
  consulting: {
    service: "IT Consulting",
    title: "A practical technology roadmap",
    overview: "An illustrative planning experience for understanding current needs, prioritizing opportunities, and sequencing technology work.",
  },
  cloud: {
    service: "Cloud Solutions",
    title: "A connected cloud environment",
    overview: "A sample infrastructure dashboard for viewing environments, service health, and regional capacity at a glance.",
  },
  analytics: {
    service: "Data Analytics",
    title: "Business performance, in context",
    overview: "An interactive sample analytics view with illustrative activity, trend summaries, and selectable reporting periods.",
  },
} as const;

export type ServiceDemoId = keyof typeof serviceDemos;