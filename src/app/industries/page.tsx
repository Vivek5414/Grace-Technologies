import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { industries } from "@/lib/site-data";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Industries",
  description: "Technology services for healthcare, financial services, retail, manufacturing, logistics, and professional services.",
};

const industryIcons: Record<string, string> = {
  Healthcare: "healthcare.png",
  "Financial Services": "financial-services.png",
  Retail: "retail.png",
  Manufacturing: "manufacturing.png",
  Logistics: "logistics.png",
  "Professional Services": "professional-services.png",
};

export default function IndustriesPage() {
  return (
    <main>
      <section className={styles.hero} aria-labelledby="industries-title">
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>Industries we serve</span>
            <h1 id="industries-title">Technology that respects the realities of your sector.</h1>
            <p>Every organization has its own constraints, customers, and ways of working. We start there.</p>
          </div>
          <aside className={styles.approach} aria-label="How we approach industry needs">
            <span className={styles.approachLabel}>A PRACTICAL STARTING POINT</span>
            <h2>Designed around the realities of your work.</h2>
            <div className={styles.approachList}>
              <div><span>01</span><strong>Customer needs</strong></div>
              <div><span>02</span><strong>How work gets done</strong></div>
              <div><span>03</span><strong>Connected operations</strong></div>
            </div>
          </aside>
        </div>
      </section>
      <section className={styles.section} aria-labelledby="industry-grid-title">
        <div className={styles.inner}>
          <div className={styles.sectionHeading}>
            <span className={styles.sectionEyebrow}>Different needs. Thoughtful solutions.</span>
            <h2 id="industry-grid-title">Built around the way your industry works</h2>
          </div>
          <div className={styles.grid}>
            {industries.map((industry, index) => {
              const icon = industryIcons[industry.title];
              return (
                <article className={styles.card} key={industry.title}>
                  <div className={styles.cardTop}>
                    <Image className={styles.icon} src={`/assets/industries/${icon}`} alt="" width={136} height={136} sizes="72px" />
                    <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <h3>{industry.title}</h3>
                  <p>{industry.detail}</p>
                </article>
              );
            })}
          </div>
          <p className={styles.note}>Sector examples describe areas of focus, not a claim of prior client engagements or endorsements.</p>
          <section className={styles.cta} aria-labelledby="industry-cta-title">
            <div>
              <span className={styles.ctaEyebrow}>Start a conversation</span>
              <h2 id="industry-cta-title">Let&apos;s build technology around your business.</h2>
              <p>Tell us about your business challenges and explore how Grace Technologies can help.</p>
            </div>
            <Link href="/contact">Discuss Your Project <span aria-hidden="true">&rarr;</span></Link>
          </section>
        </div>
      </section>
    </main>
  );
}
