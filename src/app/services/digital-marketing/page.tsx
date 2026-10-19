import type { Metadata } from "next";
import NewServicePage from "@/components/services/NewServicePage";

const description =
  "We help US businesses strengthen their online presence through practical digital marketing strategies, useful content, search visibility, and performance review.";

export const metadata: Metadata = {
  title: "Digital Marketing",
  description,
};

export default function DigitalMarketingPage() {
  return (
    <NewServicePage
      title="Digital Marketing"
      category="DIGITAL MARKETING & ONLINE VISIBILITY"
      headline="Help the right customers discover your business."
      description={description}
      image="/images/digital-marketing-logo.jpeg"
      imageAlt="Digital marketing and online visibility illustration"
      highlights={["Search Visibility", "Content Strategy", "Performance Insights"]}
      primaryLabel="Discuss Your Marketing Goals"
      secondaryLabel="Explore Our Services"
      capabilitiesHeading="Digital marketing services"
      capabilitiesIntro="Practical marketing work to strengthen visibility and connect with the audiences that matter to your business."
      capabilities={[
        {
          title: "Search Engine Optimization",
          description: "Improve website structure, content relevance, and search visibility through practical SEO work.",
        },
        {
          title: "Paid Search Campaigns",
          description: "Plan and organize paid search campaigns around business goals and relevant audiences.",
        },
        {
          title: "Social Media Marketing",
          description: "Create a consistent social presence through useful content and audience-focused communication.",
        },
        {
          title: "Content Marketing",
          description: "Develop content that answers customer questions and communicates your business expertise.",
        },
        {
          title: "Website Analytics",
          description: "Review website activity and performance indicators to understand how visitors interact with your site.",
        },
        {
          title: "Marketing Strategy",
          description: "Build a practical marketing plan aligned with your business objectives, resources, and audience.",
        },
      ]}
      exampleLabel="CAMPAIGN PLANNING DEMO"
      exampleHeading="Example campaign planning workflow"
      exampleSteps={["Business Goal", "Audience & Content Plan", "Campaign Launch", "Performance Review"]}
      exampleNote="Illustrative campaign plan. No campaign metrics, outcomes, or customer results are represented."
      exampleCalendar={[
        { week: "Week 1", activity: "Website content review" },
        { week: "Week 2", activity: "Educational social media content" },
        { week: "Week 3", activity: "Campaign performance review" },
      ]}
      processHeading="Our marketing process"
      process={[
        { title: "Understand", description: "Review your audience, current online presence, and business objectives." },
        { title: "Plan", description: "Identify priorities, content opportunities, and suitable marketing channels." },
        { title: "Execute", description: "Implement the agreed marketing activities." },
        { title: "Measure & Improve", description: "Review available performance data and refine the marketing approach." },
      ]}
      cta="Let’s discuss your digital marketing goals."
    />
  );
}
