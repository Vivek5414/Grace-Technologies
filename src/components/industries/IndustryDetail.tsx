import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Lightbulb } from "lucide-react";
import type { IndustrySlug } from "@/lib/industry-detail-data";
import styles from "./IndustryDetail.module.css";

type IndustryDetailData = {
  title: string;
  image: string;
  challenges: readonly { title: string; description: string }[];
  solutions: readonly { title: string; description: string; href: string }[];
  workflow: readonly string[];
  insights: readonly { title: string; explanation: string; recommendation: string }[];
};

export default function IndustryDetail({
  slug,
  detail,
}: {
  slug: IndustrySlug;
  detail: IndustryDetailData;
}) {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="industry-title">
        <div className={styles.container}>
          <Link className={styles.backLink} href="/industries">
            <ArrowLeft size={16} aria-hidden="true" /> All Industries
          </Link>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <span className={styles.eyebrow}>{detail.title}</span>
              <h1 id="industry-title">{industryHeadings[slug]}</h1>
              <p>{industryDescriptions[slug]}</p>
              <div className={styles.actions}>
                <Link className={styles.primaryButton} href="/contact">
                  Book a Consultation <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link className={styles.secondaryButton} href="/services">
                  Explore Our Solutions
                </Link>
              </div>
            </div>
            <div className={styles.heroVisual}>
              <div className={styles.visualIcon}>
                <Image
                  src={`/assets/industries/${detail.image}`}
                  alt={`${detail.title} industry`}
                  width={136}
                  height={136}
                  sizes="(max-width: 700px) 112px, 136px"
                  priority
                />
              </div>
              <span>Technology considerations for {detail.title.toLowerCase()}</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="challenges-title">
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <span className={styles.eyebrow}>INDUSTRY CHALLENGES</span>
            <h2 id="challenges-title">Understand the work behind the technology.</h2>
            <p>Each organization has its own priorities. These are common areas where clear digital processes can help.</p>
          </div>
          <div className={styles.challengeGrid}>
            {detail.challenges.map(({ title, description }, index) => (
              <article className={styles.challengeCard} key={title}>
                <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.solutionsSection} aria-labelledby="solutions-title">
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <span className={styles.eyebrow}>HOW GRACE TECHNOLOGIES CAN HELP</span>
            <h2 id="solutions-title">Practical technology services for {detail.title.toLowerCase()}.</h2>
          </div>
          <div className={styles.solutionGrid}>
            {detail.solutions.map(({ title, description, href }) => (
              <article className={styles.solutionCard} key={title}>
                <span className={styles.solutionIcon}><Check size={18} aria-hidden="true" /></span>
                <h3>{title}</h3>
                <p>{description}</p>
                <Link href={href} aria-label={`Explore ${title}`}>
                  Explore service <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.workflowSection} aria-labelledby="workflow-title">
        <div className={styles.container}>
          <div className={styles.workflowPanel}>
            <div className={styles.sectionHeading}>
              <span className={styles.eyebrow}>ILLUSTRATIVE WORKFLOW</span>
              <h2 id="workflow-title">A possible process for {detail.title.toLowerCase()}.</h2>
              <p>This is an illustrative example, not a representation of a customer implementation.</p>
            </div>
            <ol className={styles.workflow}>
              {detail.workflow.map((step, index) => (
                <li key={step}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{step}</strong>
                  {index < detail.workflow.length - 1 && <ArrowRight className={styles.workflowArrow} size={18} aria-hidden="true" />}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="insights-title">
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <span className={styles.eyebrow}>INDUSTRY INSIGHTS</span>
            <h2 id="insights-title">Useful considerations for your next digital step.</h2>
          </div>
          <div className={styles.insightGrid}>
            {detail.insights.map(({ title, explanation, recommendation }) => (
              <article className={styles.insightCard} key={title}>
                <Lightbulb size={20} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{explanation}</p>
                <div><strong>Practical recommendation</strong><p>{recommendation}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.contactCta} aria-labelledby="industry-cta-title">
        <div className={styles.container}>
          <div>
            <span className={styles.eyebrow}>START A CONVERSATION</span>
            <h2 id="industry-cta-title">Let&apos;s discuss your industry&apos;s technology needs.</h2>
          </div>
          <div className={styles.contactActions}>
            <Link className={styles.primaryButton} href="/contact">
              Book a Consultation <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <a className={styles.emailLink} href="mailto:contact@gracetechnologies.uk">
              contact@gracetechnologies.uk
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

const industryHeadings: Record<IndustrySlug, string> = {
  healthcare: "Technology that supports connected healthcare operations.",
  "financial-services": "Digital experiences built around trust and clarity.",
  retail: "Technology that supports modern retail operations.",
  manufacturing: "Practical digital systems for manufacturing businesses.",
  logistics: "Connected digital workflows for logistics operations.",
  "professional-services": "Digital experiences that help professional firms work smarter.",
};

const industryDescriptions: Record<IndustrySlug, string> = {
  healthcare: "Support patient-facing digital experiences and well-organized administrative workflows with accessible information and reliable digital operations.",
  "financial-services": "Help customers navigate clear digital information while organizing enquiries, operational workflows, and consistent service content.",
  retail: "Support product information, customer digital journeys, online visibility, and the workflows that keep retail operations coordinated.",
  manufacturing: "Organize operational information, coordinate business workflows, and improve access to useful data across manufacturing operations.",
  logistics: "Connect service enquiries and operational requests through clear digital workflows that help teams coordinate information and follow-up.",
  "professional-services": "Communicate your expertise online, organize client enquiries, and reduce repetitive administrative effort with thoughtful digital processes.",
};
