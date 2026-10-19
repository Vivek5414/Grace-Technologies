import type { Metadata } from "next";
import NewServicePage from "@/components/services/NewServicePage";

const description =
  "We help businesses explore practical AI and automation opportunities that reduce repetitive tasks, connect business workflows, and help teams work more efficiently.";

export const metadata: Metadata = {
  title: "AI Agents, Workflow & Automation",
  description,
};

export default function AiAutomationPage() {
  return (
    <NewServicePage
      title="AI Agents, Workflow & Automation"
      category="AI & BUSINESS AUTOMATION"
      headline="Turn repetitive work into smarter workflows."
      description={description}
      image="/images/ai-automation-logo.jpeg"
      imageAlt="AI agents and workflow automation illustration"
      highlights={["Practical Automation", "AI-Powered Workflows", "Human-Controlled Processes"]}
      primaryLabel="Discuss an Automation Project"
      secondaryLabel="Explore Automation Capabilities"
      secondaryHref="#capabilities-title"
      capabilitiesHeading="Automation capabilities"
      capabilitiesIntro="Explore practical, human-aware ways to connect workflows and reduce repetitive effort."
      capabilities={[
        {
          title: "AI Agents",
          description: "Explore AI assistants that help with specific business tasks and information workflows.",
        },
        {
          title: "Workflow Automation",
          description: "Connect repetitive steps into organized workflows with clear triggers and actions.",
        },
        {
          title: "Customer Support Automation",
          description: "Explore tools for answering common questions, organizing requests, and supporting service teams.",
        },
        {
          title: "Document Processing",
          description: "Organize information from business documents and reduce repetitive manual data handling.",
        },
        {
          title: "Business Process Automation",
          description: "Identify repeatable tasks and design workflows that support everyday operations.",
        },
        {
          title: "AI Integration",
          description: "Explore how AI capabilities can fit into existing business processes and tools.",
        },
      ]}
      exampleLabel="INTERACTIVE WORKFLOW DEMO"
      exampleHeading="Example: From enquiry to organized follow-up"
      exampleSteps={[
        "New Enquiry",
        "Information Categorized",
        "Draft Response Prepared",
        "Team Member Reviews",
        "Follow-up Organized",
      ]}
      exampleNote="Illustrative workflow only. Automation behavior, integrations, and approval requirements depend on the project scope."
      processHeading="How we approach automation"
      process={[
        { title: "Identify", description: "Understand the repetitive task and business requirements." },
        { title: "Design", description: "Map the workflow, inputs, outputs, and approval steps." },
        { title: "Build", description: "Implement the agreed automation and integrations." },
        { title: "Review", description: "Test the workflow and refine it with human oversight." },
      ]}
      cta="Let’s explore an automation opportunity."
    />
  );
}
