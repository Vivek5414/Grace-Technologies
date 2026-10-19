import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import styles from "./NewServicePage.module.css";

type ServiceCapability = {
  title: string;
  description?: string;
};

type ServiceStep = {
  title: string;
  description: string;
};

export type NewServicePageProps = {
  title: string;
  category: string;
  headline: string;
  description: string;
  image: string;
  imageAlt: string;
  highlights: readonly string[];
  primaryLabel: string;
  secondaryLabel: string;
  secondaryHref?: string;
  capabilitiesHeading: string;
  capabilitiesIntro?: string;
  capabilities: readonly ServiceCapability[];
  capabilitiesLayout?: "cards" | "checklist";
  exampleHeading: string;
  exampleLabel: string;
  exampleSteps: readonly string[];
  exampleNote: string;
  exampleCalendar?: readonly { week: string; activity: string }[];
  deliverables?: readonly ServiceCapability[];
  processHeading: string;
  process: readonly ServiceStep[];
  cta: string;
};

export default function NewServicePage({
  title,
  category,
  headline,
  description,
  image,
  imageAlt,
  highlights,
  primaryLabel,
  secondaryLabel,
  secondaryHref = "/services",
  capabilitiesHeading,
  capabilitiesIntro,
  capabilities,
  capabilitiesLayout = "cards",
  exampleHeading,
  exampleLabel,
  exampleSteps,
  exampleNote,
  exampleCalendar,
  deliverables,
  processHeading,
  process,
  cta,
}: NewServicePageProps) {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="service-title">
        <div className={styles.container}>
          <Link className={styles.backLink} href="/services">
            <ArrowLeft size={16} aria-hidden="true" /> All services
          </Link>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <span className={styles.eyebrow}>{category}</span>
              <h1 id="service-title">{headline}</h1>
              <p>{description}</p>
              <ul className={styles.highlights} aria-label="Service benefits">
                {highlights.map((highlight) => (
                  <li key={highlight}>
                    <Check size={15} aria-hidden="true" />
                    {highlight}
                  </li>
                ))}
              </ul>
              <div className={styles.heroActions}>
                <Link className={styles.primaryButton} href="/contact">
                  {primaryLabel} <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link className={styles.secondaryButton} href={secondaryHref}>
                  {secondaryLabel}
                </Link>
              </div>
            </div>
            <div className={styles.heroVisual}>
              <div className={styles.imageFrame}>
                <Image
                  src={image}
                  alt={imageAlt}
                  width={512}
                  height={512}
                  sizes="(max-width: 760px) 100vw, 50vw"
                  priority
                />
              </div>
              <span className={styles.imageCaption}>{title}</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.capabilitiesSection} aria-labelledby="capabilities-title">
        <div className={styles.container}>
          {capabilitiesLayout === "checklist" ? (
            <div className={styles.helpGrid}>
              <div className={styles.sectionHeading}>
                <span className={styles.eyebrow}>HOW WE CAN HELP</span>
                <h2 id="capabilities-title">{capabilitiesHeading}</h2>
                {capabilitiesIntro && <p>{capabilitiesIntro}</p>}
              </div>
              <ul className={styles.checklist}>
                {capabilities.map((capability) => (
                  <li key={capability.title}>
                    <Check size={18} aria-hidden="true" />
                    <span>{capability.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <>
              <div className={styles.sectionHeading}>
                <span className={styles.eyebrow}>WHAT WE CAN HELP WITH</span>
                <h2 id="capabilities-title">{capabilitiesHeading}</h2>
                {capabilitiesIntro && <p>{capabilitiesIntro}</p>}
              </div>
              <div className={styles.capabilityGrid}>
                {capabilities.map((capability, index) => (
                  <article className={styles.capabilityCard} key={capability.title}>
                    <span className={styles.cardNumber}>0{index + 1}</span>
                    <h3>{capability.title}</h3>
                    <p>{capability.description}</p>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <section className={styles.exampleSection} aria-labelledby="example-title">
        <div className={styles.container}>
          <div className={styles.examplePanel}>
            <div className={styles.exampleHeader}>
              <div>
                <span className={styles.eyebrow}>{exampleLabel}</span>
                <h2 id="example-title">{exampleHeading}</h2>
              </div>
              <span className={styles.illustrativeBadge}>Illustrative example</span>
            </div>
            <ol className={`${styles.exampleSteps} ${exampleSteps.length > 4 ? styles.longExampleSteps : ""}`}>
              {exampleSteps.map((step, index) => (
                <li key={step}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{step}</strong>
                  {index < exampleSteps.length - 1 && (
                    <ArrowRight className={styles.stepArrow} size={18} aria-hidden="true" />
                  )}
                </li>
              ))}
            </ol>
            {exampleCalendar && (
              <div className={styles.calendar}>
                <h3>Illustrative campaign plan</h3>
                <div className={styles.calendarEntries}>
                  {exampleCalendar.map(({ week, activity }) => (
                    <div className={styles.calendarEntry} key={week}>
                      <span>{week}</span>
                      <p>{activity}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <p className={styles.exampleNote}>{exampleNote}</p>
          </div>
        </div>
      </section>

      {deliverables && (
        <section className={styles.deliverablesSection} aria-labelledby="deliverables-title">
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <span className={styles.eyebrow}>SERVICE DELIVERABLES</span>
              <h2 id="deliverables-title">Useful support, shaped to the agreed scope.</h2>
            </div>
            <div className={styles.deliverableGrid}>
              {deliverables.map(({ title: itemTitle, description: itemDescription }) => (
                <article className={styles.deliverableCard} key={itemTitle}>
                  <h3>{itemTitle}</h3>
                  <p>{itemDescription}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className={styles.processSection} aria-labelledby="process-title">
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <span className={styles.eyebrow}>A CLEAR WAY FORWARD</span>
            <h2 id="process-title">{processHeading}</h2>
          </div>
          <ol className={styles.processGrid}>
            {process.map(({ title: stepTitle, description: stepDescription }, index) => (
              <li className={styles.processStep} key={stepTitle}>
                <span className={styles.processNumber}>{String(index + 1).padStart(2, "0")}</span>
                <h3>{stepTitle}</h3>
                <p>{stepDescription}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.contactCta} aria-labelledby="service-cta-title">
        <div className={styles.container}>
          <div>
            <span className={styles.eyebrow}>START A CONVERSATION</span>
            <h2 id="service-cta-title">{cta}</h2>
          </div>
          <Link className={styles.primaryButton} href="/contact">
            Book a Consultation <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
