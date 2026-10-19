import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bot,
  Check,
  CloudCog,
  Code2,
  Compass,
  Palette,
  Smartphone,
  Workflow,
  Wrench,
} from "lucide-react";
import { services } from "@/lib/site-data";
import { serviceDetails, serviceDetailSlugById } from "@/lib/service-detail-data";
import styles from "./page.module.css";

const serviceIcons = {
  "web-development": Code2,
  "custom-software": Wrench,
  "it-consulting": Compass,
  "cloud-solutions": CloudCog,
  "data-analytics": BarChart3,
  "digital-transformation": Workflow,
  "mobile-app-development": Smartphone,
  "ai-data-solutions": Bot,
  "ui-ux-design": Palette,
} as const;

export const metadata: Metadata = {
  title: "Technology Services",
  description: "Software, web and mobile development, IT consulting, cloud, AI and data, and user experience design services.",
};

export default function ServicesPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="services-title">
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}><i aria-hidden="true" /> OUR SERVICES</span>
            <h1 id="services-title">Technology built around your business</h1>
            <p>From websites and custom software to cloud, data, and technology guidance, explore practical services shaped around your goals and the way your team works.</p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} href="/contact">Discuss your needs <ArrowRight size={17} aria-hidden="true" /></Link>
              <a className={styles.textLink} href="#service-catalog">Explore our services <ArrowDown size={16} aria-hidden="true" /></a>
            </div>
          </div>
          <div className={styles.heroArt} aria-label="Illustration of connected technology services">
            <div className={styles.artGlow} />
            <div className={styles.artOrbit} />
            <div className={styles.artCore}><span>GT</span><small>Technology<br />that works</small></div>
            <div className={`${styles.artNode} ${styles.nodeWeb}`}><Code2 size={21} aria-hidden="true" /><span>Web</span></div>
            <div className={`${styles.artNode} ${styles.nodeCloud}`}><CloudCog size={21} aria-hidden="true" /><span>Cloud</span></div>
            <div className={`${styles.artNode} ${styles.nodeData}`}><BarChart3 size={21} aria-hidden="true" /><span>Data</span></div>
            <div className={`${styles.artNode} ${styles.nodeFlow}`}><Workflow size={21} aria-hidden="true" /><span>Workflows</span></div>
            <span className={styles.artCaption}>Strategy · Engineering · Delivery</span>
          </div>
        </div>
      </section>

      <section className={styles.catalog} id="service-catalog" aria-label="Services catalog">
        <div className={styles.catalogIntro}>
          <span className={styles.eyebrow}>PRACTICAL DIGITAL SERVICES</span>
          <h2>Technology services shaped around your next step.</h2>
          <p>Explore a service that fits your current priorities. Each page includes service-specific capabilities and examples.</p>
        </div>
        <div className={styles.cardGrid}>
          {services.map((service, index) => {
            const detail = serviceDetails[serviceDetailSlugById[service.id]];
            const Icon = serviceIcons[service.id];
            const route = `/services/${serviceDetailSlugById[service.id]}`;
            return (
              <article className={styles.card} key={service.id} id={service.id}>
                <div className={styles.cardTop}>
                  <span className={styles.serviceIcon}><Icon size={22} strokeWidth={1.8} aria-hidden="true" /></span>
                  <span className={styles.cardIndex}>SERVICE 0{index + 1}</span>
                  <span className={styles.cardArrow} aria-hidden="true"><ArrowUpRight size={18} /></span>
                </div>
                <h3>{service.title}</h3>
                <p className={styles.cardDescription}>{service.description}</p>
                <ul className={styles.capabilityList}>
                  {detail.focus.map((capability) => <li key={capability}><Check size={15} aria-hidden="true" />{capability}</li>)}
                </ul>
                <div className={styles.cardFooter}>
                  <span>{service.support}</span>
                  <Link href={route} aria-label={`Learn more about ${service.title}`}>Learn more <ArrowRight size={16} aria-hidden="true" /></Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.allServices} aria-labelledby="all-services-heading">
        <div>
          <span className={styles.eyebrow}>SERVICE DIRECTORY</span>
          <h2 id="all-services-heading">All services provided</h2>
          <p>Browse the complete range of Grace Technologies services.</p>
        </div>
        <ul>
          {services.map((service) => (
            <li key={service.id}>
              <Link href={`/services/${serviceDetailSlugById[service.id]}`}>
                {service.title}<ArrowRight size={15} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.contactCta}>
        <div className={styles.ctaMark} aria-hidden="true"><Compass size={28} strokeWidth={1.5} /></div>
        <div className={styles.ctaCopy}>
          <span className={styles.eyebrow}>LET&apos;S GET STARTED</span>
          <h2>Have a challenge in mind?</h2>
          <p>Tell us what you are working toward. We&apos;ll help identify a practical place to begin.</p>
        </div>
        <Link className={styles.primaryButton} href="/contact">Talk to our team <ArrowRight size={17} aria-hidden="true" /></Link>
      </section>
    </main>
  );
}
