export type DemoEnquiryStatus = "new" | "in_progress" | "completed" | "archived";

export type DemoEnquiry = {
  id: string;
  contactId: string;
  customerName: string;
  service: string;
  phone: string;
  submittedAt: string;
  status: DemoEnquiryStatus;
};

export const demoWhatsAppAnalytics = {
  activeConversations: 18,
  inboundMessages: 126,
  responseRate: 96,
  averageResponseMinutes: 8,
};

export const demoWhatsAppActivity = [
  { day: "Mon", activity: 42 },
  { day: "Tue", activity: 68 },
  { day: "Wed", activity: 54 },
  { day: "Thu", activity: 82 },
  { day: "Fri", activity: 74 },
  { day: "Sat", activity: 36 },
  { day: "Sun", activity: 24 },
];

export const demoWhatsAppClicksByPeriod = {
  "7d": [
    { path: "/", mobile: 98, desktop: 37, tablet: 7 },
    { path: "/services", mobile: 68, desktop: 24, tablet: 4 },
    { path: "/contact", mobile: 60, desktop: 20, tablet: 4 },
    { path: "/industries", mobile: 40, desktop: 16, tablet: 2 },
  ],
  "30d": [
    { path: "/", mobile: 368, desktop: 140, tablet: 24 },
    { path: "/services", mobile: 288, desktop: 108, tablet: 18 },
    { path: "/contact", mobile: 260, desktop: 94, tablet: 17 },
    { path: "/industries", mobile: 170, desktop: 76, tablet: 9 },
  ],
  "90d": [
    { path: "/", mobile: 1035, desktop: 380, tablet: 67 },
    { path: "/services", mobile: 826, desktop: 300, tablet: 54 },
    { path: "/contact", mobile: 684, desktop: 250, tablet: 44 },
    { path: "/industries", mobile: 460, desktop: 190, tablet: 30 },
  ],
} as const;

export const demoEnquiries: DemoEnquiry[] = [
  {
    id: "demo-enquiry-1001",
    contactId: "demo-contact-201",
    customerName: "Taylor Brooks",
    service: "Custom software",
    phone: "+1 (202) 555-0101",
    submittedAt: "2026-10-18T09:42:00",
    status: "new",
  },
  {
    id: "demo-enquiry-1002",
    contactId: "demo-contact-202",
    customerName: "Morgan Reed",
    service: "Cloud solutions",
    phone: "+1 (202) 555-0102",
    submittedAt: "2026-10-17T15:18:00",
    status: "in_progress",
  },
  {
    id: "demo-enquiry-1003",
    contactId: "demo-contact-203",
    customerName: "Casey Bennett",
    service: "Web development",
    phone: "+1 (202) 555-0103",
    submittedAt: "2026-10-17T11:06:00",
    status: "new",
  },
  {
    id: "demo-enquiry-1004",
    contactId: "demo-contact-204",
    customerName: "Riley Parker",
    service: "IT consulting",
    phone: "+1 (202) 555-0104",
    submittedAt: "2026-10-16T13:34:00",
    status: "completed",
  },
  {
    id: "demo-enquiry-1005",
    contactId: "demo-contact-205",
    customerName: "Avery Ellis",
    service: "Data and analytics",
    phone: "+1 (202) 555-0105",
    submittedAt: "2026-10-15T10:12:00",
    status: "in_progress",
  },
  {
    id: "demo-enquiry-1006",
    contactId: "demo-contact-202",
    customerName: "Morgan Reed",
    service: "Digital transformation",
    phone: "+1 (202) 555-0102",
    submittedAt: "2026-10-14T16:27:00",
    status: "archived",
  },
  {
    id: "demo-enquiry-1007",
    contactId: "demo-contact-206",
    customerName: "Jamie Morgan",
    service: "Cloud solutions",
    phone: "+1 (202) 555-0106",
    submittedAt: "2026-10-13T09:51:00",
    status: "new",
  },
  {
    id: "demo-enquiry-1008",
    contactId: "demo-contact-207",
    customerName: "Drew Sullivan",
    service: "Custom software",
    phone: "+1 (202) 555-0107",
    submittedAt: "2026-10-12T14:03:00",
    status: "completed",
  },
  {
    id: "demo-enquiry-1009",
    contactId: "demo-contact-208",
    customerName: "Alex Harper",
    service: "Web development",
    phone: "+1 (202) 555-0108",
    submittedAt: "2026-10-10T12:45:00",
    status: "in_progress",
  },
  {
    id: "demo-enquiry-1010",
    contactId: "demo-contact-209",
    customerName: "Sam Riley",
    service: "IT consulting",
    phone: "+1 (202) 555-0109",
    submittedAt: "2026-10-08T08:30:00",
    status: "archived",
  },
];
