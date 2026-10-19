import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, BarChart3, Bot, CloudCog, Code2, Compass, Layers3, Palette, Smartphone, Workflow, Wrench } from "lucide-react";
import { services } from "@/lib/site-data";
import { ServiceDemoPreview } from "@/components/demos/ServiceDemo";
import styles from "./ServiceDetail.module.css";

type ServiceDetailContent = {
  serviceId: (typeof services)[number]["id"];
  category: string;
  intro: string;
  overview: string;
  focus: readonly string[];
  benefits: readonly string[];
  deliverables: readonly string[];
  demoId?: "website" | "software" | "consulting" | "cloud" | "analytics";
  demoHref?: string;
  demoLabel?: string;
  previewSteps?: readonly string[];
};

export default function ServiceDetail({ detail }: { detail: ServiceDetailContent }) {
  const service = services.find((item) => item.id === detail.serviceId);

  if (!service) return null;
  const ServiceIcon = {
    "web-development": Code2,
    "custom-software": Wrench,
    "it-consulting": Compass,
    "cloud-solutions": CloudCog,
    "data-analytics": BarChart3,
    "digital-transformation": Workflow,
    "mobile-app-development": Smartphone,
    "ai-data-solutions": Bot,
    "ui-ux-design": Palette,
  }[service.id];
  const capabilityIcons = [Layers3, Compass, Workflow];

  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="service-title">
        <div className={styles.container}>
          <Link className={styles.backLink} href="/services"><ArrowLeft size={16} aria-hidden="true" /> Back to Services</Link>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <span className={styles.eyebrow}>EXPLORE OUR SOLUTIONS</span>
              <span className={styles.categoryLabel}><ServiceIcon size={15} aria-hidden="true" />{detail.category}</span>
              <h1 id="service-title">{service.title}</h1>
              <p>{detail.intro}</p>
              <div className={styles.heroActions}>
                <Link className={styles.primaryButton} href="/contact">Book a Consultation <ArrowRight size={16} aria-hidden="true" /></Link>
                {detail.demoHref && detail.demoLabel && (
                  <Link className={styles.secondaryButton} href={detail.demoHref}>{detail.demoLabel} <ArrowUpRight size={16} aria-hidden="true" /></Link>
                )}
              </div>
              <div className={styles.heroSupport}><span>AREAS WE SUPPORT</span><p>{service.support}</p></div>
            </div>
            <div className={styles.previewPanel}>
              <div className={styles.previewHeading}><span>PROJECT DEMO</span><span>Illustrative sample</span></div>
              {detail.demoId ? <ServiceDemoPreview demoId={detail.demoId} /> : <WorkflowPreview steps={detail.previewSteps} />}
              <p>{detail.demoId ? "Fictional sample project. No real client engagement or outcome is represented." : "Illustrative service planning view. No real client engagement or outcome is represented."}</p>
              {detail.demoHref && <Link className={styles.previewLink} href={detail.demoHref}>{detail.demoLabel ?? "Explore this sample"} <ArrowUpRight size={15} aria-hidden="true" /></Link>}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.overview} aria-labelledby="overview-heading">
        <div className={styles.container}>
          <div className={styles.overviewIntro}>
            <span className={styles.eyebrow}>SERVICE OVERVIEW</span>
            <h2 id="overview-heading">{service.title}, shaped around your work.</h2>
            <p>{detail.overview}</p>
            <p className={styles.existingDescription}>{service.description}</p>
          </div>
          <div className={styles.overviewNote}>
            <span className={styles.overviewIcon}><ServiceIcon size={23} aria-hidden="true" /></span>
            <span className={styles.panelKicker}>A CLEAR PLACE TO START</span>
            <h3>Practical, considered, and specific to your needs.</h3>
            <p>We align the work to your context, priorities, and the next useful step for your team.</p>
          </div>
        </div>
      </section>

      <section className={styles.capabilities} aria-labelledby="capabilities-heading">
        <div className={styles.container}>
          <div className={styles.capabilitiesHeading}>
            <span className={styles.eyebrow}>WHAT WE CAN HELP WITH</span>
            <h2 id="capabilities-heading">Capabilities for your next step.</h2>
            <p>Focused areas of work informed by the service you need and the goals you bring.</p>
          </div>
          <div className={styles.capabilityGrid}>
            {detail.focus.map((item, index) => {
              const Icon = capabilityIcons[index % capabilityIcons.length];
              return <article className={styles.capabilityCard} key={item}>
                <span><Icon size={20} aria-hidden="true" /></span>
                <small>0{index + 1}</small>
                <h3>{item}</h3>
                <i aria-hidden="true" />
              </article>;
            })}
          </div>
        </div>
      </section>

      <section className={styles.outcomes} aria-label="Benefits and deliverables">
        <div className={styles.container}>
          <article className={styles.outcomeCard}>
            <span className={styles.panelKicker}>WHY IT HELPS</span>
            <h2>Benefits</h2>
            <ul>{detail.benefits.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
          <article className={styles.outcomeCard}>
            <span className={styles.panelKicker}>WHAT TAKES SHAPE</span>
            <h2>Potential deliverables</h2>
            <ul>{detail.deliverables.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        </div>
      </section>

      <section className={styles.contactCta}>
        <div className={styles.container}>
          <div><span className={styles.eyebrow}>START A CONVERSATION</span><h2>Let&apos;s talk about {service.title.toLocaleLowerCase()}.</h2><p>Tell us what you are working toward and discuss a practical next step.</p></div>
          <Link className={styles.primaryButton} href="/contact">Book a Consultation <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </section>
    </main>
  );
}

function WorkflowPreview({ steps = ["Map the work", "Connect systems", "Automate handoffs", "Measure progress"] }: { steps?: readonly string[] }) {

  return (
    <div className={styles.workflowPreview} aria-label="Illustrative digital workflow">
      {steps.map((step, index) => <div className={styles.workflowStep} key={step}>
        <span><Workflow size={16} aria-hidden="true" /></span><strong>{step}</strong>
        {index < steps.length - 1 && <i aria-hidden="true" />}
      </div>)}
    </div>
  );
}