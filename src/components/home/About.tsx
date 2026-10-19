import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import styles from "./About.module.css";

const principles = [
  "Recommendations tied to a real business need",
  "Clear ownership, scope, and delivery checkpoints",
  "Accessible, maintainable systems built for change",
];

const technologyAreas = ["Next.js", "React", "TypeScript", "Cloud platforms", "APIs and integrations", "Accessible UX"];

export default function About() {
  return (
    <section className={styles.section} id="about" aria-labelledby="about-heading">
      <div className={styles.inner}>
        <div className={styles.statement}>
          <span className={styles.eyebrow}>About Grace Technologies</span>
          <h2 id="about-heading">Good technology starts with understanding the people who use it.</h2>
          <p>Grace Technologies works with businesses in the U.S. and UK on web development, custom software, IT consulting, cloud solutions, and digital transformation.</p>
          <p>We start by listening. Then we explain the options in plain language, agree on a useful next step, and build with room for what comes later.</p>
          <div className={styles.technologyFocus}>
            <span>Technology &amp; expertise</span>
            <ul>{technologyAreas.map((technology) => <li key={technology}>{technology}</li>)}</ul>
          </div>
          <Link href="/about">More about our approach <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
        <div className={styles.principles}>
          <span className={styles.principlesLabel}>How we work with you</span>
          {principles.map((principle) => <div className={styles.principle} key={principle}><Check size={17} aria-hidden="true" /><span>{principle}</span></div>)}
          <div className={styles.note}><strong>One team, clear communication.</strong><span>We work alongside your stakeholders and keep decisions connected to the outcomes you need.</span></div>
        </div>
      </div>
    </section>
  );
}
