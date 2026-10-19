import type { Metadata } from "next";
import NewServicePage from "@/components/services/NewServicePage";

const description =
  "We support US businesses with merchant account administration, online marketplace operations, product listing coordination, account monitoring, and practical operational support.";

export const metadata: Metadata = {
  title: "Merchant Account Management",
  description,
};

export default function MerchantAccountManagementPage() {
  return (
    <NewServicePage
      title="Merchant Account Management"
      category="MARKETPLACE & MERCHANT OPERATIONS"
      headline="Keep your marketplace operations organized."
      description={description}
      image="/images/merchantaccount-logo.jpeg"
      imageAlt="Merchant account management illustration"
      highlights={[
        "Organized Account Operations",
        "Product Listing Support",
        "Marketplace Workflow Coordination",
      ]}
      primaryLabel="Book a Consultation"
      secondaryLabel="Explore Our Services"
      capabilitiesHeading="Practical support shaped around your business."
      capabilitiesIntro="Keep day-to-day marketplace work organized with practical support for account operations, product content, and performance review."
      capabilitiesLayout="checklist"
      capabilities={[
        { title: "Merchant account setup and organization support" },
        { title: "Product listing structure and content coordination" },
        { title: "Account health and performance review" },
        { title: "Marketplace workflow coordination" },
        { title: "Issue documentation and escalation support" },
      ]}
      exampleLabel="OPERATIONAL WORKFLOW DEMO"
      exampleHeading="Example merchant operations workflow"
      exampleSteps={[
        "Business Requirements",
        "Account & Listing Review",
        "Operations Checklist",
        "Review & Follow-up",
      ]}
      exampleNote="Illustrative workflow. Actual services and responsibilities depend on the agreed project scope."
      deliverables={[
        {
          title: "Account Organization",
          description: "A clear view of account requirements, documentation, and operational priorities.",
        },
        {
          title: "Listing Coordination",
          description: "Organized product information and listing updates based on the agreed scope.",
        },
        {
          title: "Operations Review",
          description: "Regular review of workflow issues, account needs, and potential next steps.",
        },
      ]}
      processHeading="Our process"
      process={[
        { title: "Understand", description: "Review your business, marketplace, and operational needs." },
        { title: "Organize", description: "Identify priorities, account requirements, and workflows." },
        { title: "Support", description: "Coordinate agreed operational activities and documentation." },
        { title: "Review", description: "Discuss progress, issues, and opportunities to improve." },
      ]}
      cta="Need support with merchant operations?"
    />
  );
}
