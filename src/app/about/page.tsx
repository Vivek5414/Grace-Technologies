import type { Metadata } from "next";
import PageIntro from "@/components/layout/PageIntro";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About Grace Technologies",
  description: "Learn about Grace Technologies' business-first approach to software, cloud, and digital transformation.",
};

export default function AboutPage() {
  return (
    <main>
      <PageIntro eyebrow="About" title="Technology work should begin with the business, not the buzzwords." description="Grace Technologies provides technology services for US and UK businesses, from early-stage teams to established organizations." />
      <section className={styles.section}>
        <div className={styles.missionVision}>
          <article><span>OUR MISSION</span><h2>Make technology useful to the people and organizations it serves.</h2><p>We listen to business needs, explain practical options, and deliver thoughtful digital work with clear communication.</p></article>
          <article><span>OUR VISION</span><h2>A future where technology makes everyday work clearer and more connected.</h2><p>We aim to help teams make confident decisions and build systems that can adapt as their needs change.</p></article>
        </div>
        <div className={styles.valuesHeading}><span>OUR VALUES</span><h2>Principles that guide how we work.</h2></div>
        <div className={styles.inner}>
          <article><span>01 / UNDERSTANDING</span><h2>Understand before recommending.</h2><p>We ask about your goals, constraints, customers, and existing systems before proposing a direction. The answer should fit the organization, not just the latest trend.</p></article>
          <article><span>02 / CLARITY</span><h2>Make the work clear.</h2><p>Good delivery depends on shared expectations. We make scope, options, risks, and decisions understandable to the people responsible for the outcome.</p></article>
          <article><span>03 / CARE</span><h2>Build for what comes next.</h2><p>Digital products and internal systems need to be supportable. We value accessible, maintainable foundations that leave room for future change.</p></article>
        </div>
        <div className={styles.office}><strong>Registered Office</strong><address>Grace Technologies<br />398 Whalebone Lane South<br />Romford, Greater London<br />RM6 6HP, England</address><span>Registered office in England. No US physical office is represented on this website.</span></div>
      </section>
    </main>
  );
}
