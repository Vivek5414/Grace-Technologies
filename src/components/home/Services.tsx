import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ServiceCardImage from "./ServiceCardImage";
import styles from "./Services.module.css";

const offerings = [
  {
    title: "Website Development & Mobile App Development",
    description:
      "Build a stronger digital presence with modern websites and mobile applications designed around your business goals.",
    detail:
      "We create responsive, user-friendly digital experiences that help US businesses connect with customers, streamline operations, and grow online.",
    capabilities: [
      "Custom Website Development",
      "Responsive Web Design",
      "Mobile Application Development",
      "E-commerce Solutions",
      "Website Maintenance & Optimization",
    ],
    image: "/images/webdevelopment-logo.jpeg",
    imageAlt: "Website and mobile app development illustration",
    href: "/services/web-development",
  },
  {
    title: "Merchant Account Management",
    description:
      "Simplify payment operations with reliable merchant account management support tailored to your business.",
    detail:
      "We help businesses manage payment-related workflows, coordinate account requirements, and improve operational efficiency with a focus on clear communication and dependable support.",
    capabilities: [
      "Merchant Account Support",
      "Payment Workflow Coordination",
      "Account Setup Assistance",
      "Payment Operations Support",
      "Business Process Optimization",
    ],
    image: "/images/merchantaccount-logo.jpeg",
    imageAlt: "Merchant account, payment card, and secure wallet illustration",
    href: "/services/merchant-account-management",
  },
  {
    title: "AI Agents, Workflow & Automation",
    description:
      "Work smarter with AI-powered solutions that reduce repetitive tasks and help your team focus on higher-value work.",
    detail:
      "We help businesses explore practical automation opportunities, connect digital workflows, and build intelligent solutions that support everyday operations.",
    capabilities: [
      "AI Agent Development",
      "Business Workflow Automation",
      "Process Automation",
      "AI-Powered Customer Support",
      "Intelligent Data Processing",
    ],
    image: "/images/ai-automation-logo.jpeg",
    imageAlt: "AI agent and automated workflow illustration",
    href: "/services/ai-automation",
  },
  {
    title: "Digital Marketing",
    description:
      "Reach the right audience and build a stronger digital presence with marketing strategies focused on your business objectives.",
    detail:
      "We help businesses improve their online visibility, connect with potential customers, and develop a consistent digital marketing approach.",
    capabilities: [
      "Search Engine Optimization (SEO)",
      "Paid Search Campaigns",
      "Social Media Marketing",
      "Content Marketing",
      "Website Performance Analysis",
    ],
    image: "/images/digital-marketing-logo.jpeg",
    imageAlt: "Digital marketing megaphone, analytics, and campaign target illustration",
    href: "/services/digital-marketing",
  },
];

export default function Services() {
  return (
    <section className={styles.section} id="services" aria-labelledby="services-heading">
      <div className={styles.inner}>
        <div className={styles.heading}>
          <span className={styles.eyebrow}>What we do</span>
          <h2 id="services-heading">Technology services for your next stage of growth.</h2>
          <p>Focused expertise to help US businesses build, operate, automate, and grow with confidence.</p>
        </div>
        <div className={styles.grid}>
          {offerings.map(({ title, description, detail, capabilities, image, imageAlt, href }) => (
            <article className={styles.card} key={title}>
              <ServiceCardImage src={image} alt={imageAlt} />
              <div className={styles.cardContent}>
                <h3>{title}</h3>
                <p>{description}</p>
                <p>{detail}</p>
                <ul className={styles.capabilities} aria-label={`${title} capabilities`}>
                  {capabilities.map((capability) => (
                    <li key={capability}>{capability}</li>
                  ))}
                </ul>
                <Link href={href} aria-label={`Learn more about ${title}`}>
                  Learn More <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
