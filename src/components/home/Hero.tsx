import Link from "next/link";
import { ArrowRight, Check, CircleDot, Code2, Cloud, Database, ShieldCheck } from "lucide-react";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <span className={styles.eyebrow}><span /> Technology services for growing businesses</span>
          <h1>Technology That Moves <em>Your Business Forward</em></h1>
          <p>We work with teams in the U.S. and UK to plan, build, and improve digital products and business systems. Clear advice, thoughtful engineering, and a practical path from idea to delivery.</p>
          <div className={styles.actions}>
            <Link className={styles.primaryButton} href="/contact">Book a Consultation <ArrowRight size={17} aria-hidden="true" /></Link>
            <Link className={styles.secondaryButton} href="/services">Explore Services</Link>
          </div>
          <div className={styles.note}><ShieldCheck size={17} aria-hidden="true" /><span>UK-based team. Working with businesses in the U.S. and UK.</span></div>
        </div>

        <div className={styles.visual} aria-label="Illustrative software operations dashboard">
          <div className={styles.visualTop}>
            <div><span className={styles.visualLabel}>Operations overview</span><strong>Work, in focus.</strong></div>
            <span className={styles.status}><CircleDot size={11} aria-hidden="true" /> DEMO</span>
          </div>
          <div className={styles.dashboard}>
            <aside className={styles.sidebar} aria-hidden="true">
              <span className={styles.sidebarMark} />
              <i /><i /><i /><i />
            </aside>
            <div className={styles.workspace}>
              <div className={styles.workspaceHead}><span>Business systems</span><span>Today <span aria-hidden="true">⌄</span></span></div>
              <div className={styles.metricRow}>
                <div><small>WORKFLOWS</small><strong>In view</strong><span><Check size={12} aria-hidden="true" /> Organized</span></div>
                <div><small>BUSINESS DATA</small><strong>Connected</strong><span>Ready to use</span></div>
              </div>
              <div className={styles.chartPanel}>
                <div><span>Workflow activity</span><small>Illustrative view</small></div>
                <div className={styles.chart} aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
                <div className={styles.chartAxis}><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span></div>
              </div>
              <div className={styles.workflowStatuses} role="group" aria-label="Workflow status examples">
                <span className={styles.completed}>Completed</span>
                <span className={styles.inProgress}>In progress</span>
                <span className={styles.pending}>Pending</span>
              </div>
              <div className={styles.activity}>
                <span><Code2 size={15} aria-hidden="true" /> Product systems</span>
                <span><Cloud size={15} aria-hidden="true" /> Cloud foundations</span>
                <span><Database size={15} aria-hidden="true" /> Business data</span>
              </div>
            </div>
          </div>
          <div className={styles.previewFooter}>
            <Link className={styles.dashboardPreviewButton} href="/operations">
              View Operations Dashboard <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <div className={styles.visualCaption}>Illustrative interface concept · Not a live product</div>
          </div>
        </div>
      </div>
    </section>
  );
}
