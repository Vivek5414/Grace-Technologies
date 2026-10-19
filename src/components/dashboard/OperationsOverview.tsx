import { ArrowUpRight, CircleHelp } from "lucide-react";
import styles from "./Dashboard.module.css";

export default function OperationsOverview() {
  return (
    <section className={styles.overview} id="overview" aria-labelledby="overview-title">
      <div className={styles.overviewCopy}>
        <span className={styles.eyebrow}><span className={styles.liveDot} /> OPERATIONS OVERVIEW</span>
        <h1 id="overview-title">A clearer view of work in motion.</h1>
        <p>A sample workspace showing how teams can bring workflows and business systems together.</p>
      </div>
      <a className={styles.overviewLink} href="#systems">
        Explore connected systems <ArrowUpRight size={16} aria-hidden="true" />
      </a>
      <p className={styles.demoNotice}><CircleHelp size={15} aria-hidden="true" /> Demonstration only — all figures and activity below are illustrative sample data.</p>
    </section>
  );
}
