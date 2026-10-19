import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import ServiceDetail from "@/components/services/ServiceDetail";
import NewServicePage from "@/components/services/NewServicePage";
import { services } from "@/lib/site-data";
import { serviceDetails, type ServiceDetailSlug } from "@/lib/service-detail-data";
import styles from "@/components/services/ServiceDetail.module.css";

const webDevelopmentDescription =
  "We design and develop modern websites and mobile applications that help US businesses create better customer experiences, simplify everyday operations, and establish a stronger digital presence.";

export function generateStaticParams() {
  return Object.keys(serviceDetails).map((slug) => ({ slug }));
}

function isServiceDetailSlug(slug: string): slug is ServiceDetailSlug {
  return Object.hasOwn(serviceDetails, slug);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (!isServiceDetailSlug(slug)) return { title: "Service Not Found" };
  if (slug === "web-development") {
    return {
      title: "Website Development & Mobile App Development",
      description: webDevelopmentDescription,
    };
  }

  const detail = serviceDetails[slug];
  const service = services.find((item) => item.id === detail.serviceId);
  if (!service) return { title: "Service Not Found" };

  return {
    title: service.title,
    description: service.description,
  };
}

async function ServiceDetailContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isServiceDetailSlug(slug)) notFound();

  if (slug === "web-development") {
    return (
      <NewServicePage
        title="Website Development & Mobile App Development"
        category="DIGITAL EXPERIENCE & DEVELOPMENT"
        headline="Digital experiences built around your business."
        description={webDevelopmentDescription}
        image="/images/webdevelopment-logo.jpeg"
        imageAlt="Website and mobile app development illustration"
        highlights={["Responsive by Design", "Built Around Your Goals", "Easy to Maintain"]}
        primaryLabel="Book a Consultation"
        secondaryLabel="Explore Our Services"
        capabilitiesHeading="What we can build"
        capabilitiesIntro="Digital experiences designed around your brand, your customers, and your day-to-day business needs."
        capabilities={[
          {
            title: "Custom Business Websites",
            description: "Professional websites tailored to your brand, business goals, and customer needs.",
          },
          {
            title: "E-commerce Experiences",
            description: "Online shopping experiences designed for product discovery, easy navigation, and a smooth customer journey.",
          },
          {
            title: "Mobile Applications",
            description: "Mobile-friendly digital products that make it easier for customers to access your services.",
          },
          {
            title: "Website Redesign",
            description: "Refresh outdated websites with a modern visual system, clearer content, and improved usability.",
          },
          {
            title: "Website Maintenance",
            description: "Ongoing updates, content changes, and practical technical support for your website.",
          },
          {
            title: "Performance & Accessibility",
            description: "Build a more usable digital experience with responsive layouts, clear navigation, and performance-conscious development.",
          },
        ]}
        exampleLabel="A SIMPLE PROJECT PREVIEW"
        exampleHeading="Example website structure"
        exampleSteps={["Homepage structure", "Services page", "About page", "Contact page"]}
        exampleNote="Illustrative example only. This is not presented as a completed client project."
        processHeading="How we work"
        process={[
          { title: "Discover", description: "Understand your business, audience, and project requirements." },
          { title: "Design", description: "Create the structure, visual direction, and user experience." },
          { title: "Develop", description: "Build responsive pages and implement agreed functionality." },
          { title: "Launch & Support", description: "Test the experience, launch the website, and provide agreed ongoing support." },
        ]}
        cta="Let’s discuss your website project."
      />
    );
  }

  const detail = serviceDetails[slug];
  const service = services.find((item) => item.id === detail.serviceId);
  if (!service) notFound();

  return <ServiceDetail detail={detail} />;
}

export default function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<main className={styles.loading} aria-busy="true">Loading service details…</main>}>
      <ServiceDetailContent params={params} />
    </Suspense>
  );
}