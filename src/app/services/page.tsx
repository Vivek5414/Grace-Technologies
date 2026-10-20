import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Bot,
  Check,
  Code2,
  Compass,
  CreditCard,
  Megaphone,
} from "lucide-react";
import styles from "./page.module.css";

const serviceOptions = [
  {
    title: "Website Development & Mobile App Development",
    description: "Build a stronger digital presence with modern websites and mobile applications designed around your business goals.",
    focus: ["Custom websites and responsive web design", "Mobile application development", "E-commerce and website optimization"],
    support: "Websites · Mobile apps · E-commerce",
    href: "/services/web-development",
    Icon: Code2,
  },
  {
    title: "Merchant Account Management",
    description: "Keep payment and marketplace operations organized with practical account, listing, and workflow support.",
    focus: ["Merchant account setup and organization", "Product listing coordination", "Account health and workflow review"],
    support: "Account support · Listings · Operations",
    href: "/services/merchant-account-management",
    Icon: CreditCard,
  },
  {
    title: "AI Agents, Workflow & Automation",
    description: "Explore useful ways to connect workflows and reduce repetitive tasks, with people kept in control.",
    focus: ["AI agents for specific business tasks", "Workflow and process automation", "Human-reviewed AI integrations"],
    support: "AI agents · Workflows · Automation",
    href: "/services/ai-automation",
    Icon: Bot,
  },
  {
    title: "Digital Marketing",
    description: "Strengthen your online presence through practical marketing strategies shaped around your business goals.",
    focus: ["Search engine optimization", "Content and social media marketing", "Campaign and website performance review"],
    support: "SEO · Content · Campaigns",
    href: "/services/digital-marketing",
    Icon: Megaphone,
  },
] as const;

export const metadata: Metadata = {
  title: "Technology Services",
  description: "Website and mobile app development, merchant account management, AI and workflow automation, and digital marketing.",
};

export default function ServicesPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="services-title">
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}><i aria-hidden="true" /> OUR SERVICES</span>
            <h1 id="services-title">Technology built around your business</h1>
            <p>Explore website and mobile app development, merchant account management, AI and workflow automation, and digital marketing, shaped around your business goals.</p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} href="/contact">Discuss your needs <ArrowRight size={17} aria-hidden="true" /></Link>
              <a className={styles.textLink} href="#service-catalog">Explore our services <ArrowDown size={16} aria-hidden="true" /></a>
            </div>
          </div>
          <div className={styles.heroArt} aria-label="Illustration of connected technology services">
            <div className={styles.artGlow} />
            <div className={styles.artOrbit} />
            <div className={styles.artCore}><span>GT</span><small>Technology<br />that works</small></div>
            <div className={`${styles.artNode} ${styles.nodeWeb}`}><Code2 size={21} aria-hidden="true" /><span>Web &amp; Apps</span></div>
            <div className={`${styles.artNode} ${styles.nodeCloud}`}><CreditCard size={21} aria-hidden="true" /><span>Merchant</span></div>
            <div className={`${styles.artNode} ${styles.nodeData}`}><Megaphone size={21} aria-hidden="true" /><span>Marketing</span></div>
            <div className={`${styles.artNode} ${styles.nodeFlow}`}><Bot size={21} aria-hidden="true" /><span>AI &amp; Automation</span></div>
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
          {serviceOptions.map(({ title, description, focus, support, href, Icon }, index) => (
            <article className={styles.card} key={title}>
              <div className={styles.cardTop}>
                <span className={styles.serviceIcon}><Icon size={22} strokeWidth={1.8} aria-hidden="true" /></span>
                <span className={styles.cardIndex}>SERVICE 0{index + 1}</span>
                <span className={styles.cardArrow} aria-hidden="true"><ArrowUpRight size={18} /></span>
              </div>
              <h3>{title}</h3>
              <p className={styles.cardDescription}>{description}</p>
              <ul className={styles.capabilityList}>
                {focus.map((capability) => <li key={capability}><Check size={15} aria-hidden="true" />{capability}</li>)}
              </ul>
              <div className={styles.cardFooter}>
                <span>{support}</span>
                <Link href={href} aria-label={`Learn more about ${title}`}>Learn more <ArrowRight size={16} aria-hidden="true" /></Link>
              </div>
            </article>
          ))}
        </div>
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
