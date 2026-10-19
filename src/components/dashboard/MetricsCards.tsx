import { Activity, ArrowUpRight, Database, Workflow } from "lucide-react";
import styles from "./Dashboard.module.css";

const metrics = [
  {
    label: "Active workflows",
    value: "12",
    change: "+2",
    detail: "Illustrative workflows running",
    icon: Workflow,
    tone: "primary",
  },
  {
    label: "Tasks completed",
    value: "284",
    change: "+18%",
    detail: "Compared with prior period",
    icon: Activity,
    tone: "secondary",
  },
  {
    label: "Connected sources",
    value: "08",
    change: "All active",
    detail: "Sample system connections",
    icon: Database,
    tone: "tertiary",
  },
];

export default function MetricsCards() {
  return (
    <section className={styles.metricsSection} aria-labelledby="metrics-title">
      <div className={styles.sectionHeading}>
        <div><h2 id="metrics-title">At a glance</h2><p>Illustrative workspace indicators</p></div>
        <span className={styles.sampleTag}>SAMPLE METRICS</span>
      </div>
      <div className={styles.metricsGrid}>
        {metrics.map(({ label, value, change, detail, icon: Icon, tone }) => (
          <article className={styles.metricCard} key={label} tabIndex={0}>
            <div className={styles.metricTop}>
              <span className={`${styles.metricIcon} ${styles[`metricIcon${tone}`]}`}><Icon size={19} aria-hidden="true" /></span>
              <span className={styles.metricTrend}>{change}<ArrowUpRight size={14} aria-hidden="true" /></span>
            </div>
            <p className={styles.metricValue}>{value}</p>
            <h3>{label}</h3>
            <p className={styles.metricDetail}>{detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
