import Link from "next/link";
import {
  ArrowUpRight,
  Boxes,
  Cloud,
  Database,
  FileSpreadsheet,
  Layers3,
  MessagesSquare,
} from "lucide-react";
import styles from "./Dashboard.module.css";

const systems = [
  { name: "Customer platform", type: "CRM", icon: Boxes, state: "Connected", detail: "Illustrative connection" },
  { name: "Team workspace", type: "COLLABORATION", icon: MessagesSquare, state: "Connected", detail: "Illustrative connection" },
  { name: "Cloud environment", type: "CLOUD", icon: Cloud, state: "Connected", detail: "Illustrative connection" },
  { name: "Data warehouse", type: "ANALYTICS", icon: Database, state: "Connected", detail: "Illustrative connection" },
  { name: "Finance tools", type: "FINANCE", icon: FileSpreadsheet, state: "Review setup", detail: "Sample connection state" },
  { name: "Internal services", type: "OPERATIONS", icon: Layers3, state: "Connected", detail: "Illustrative connection" },
];

export default function BusinessSystems() {
  return (
    <section className={styles.systemsSection} id="systems" aria-labelledby="systems-title">
      <div className={styles.sectionHeading}>
        <div><h2 id="systems-title">Business systems</h2><p>A sample view of tools in one connected workspace</p></div>
        <span className={styles.connectedCount}><span className={styles.liveDot} /> 8 sample sources</span>
      </div>
      <div className={styles.systemsGrid}>
        {systems.map(({ name, type, icon: Icon, state, detail }) => (
          <Link
            className={styles.systemCard}
            href="#activity"
            key={name}
            aria-label={`${name}: ${state}. View sample workflow activity.`}
          >
            <div className={styles.systemCardTop}>
              <span className={styles.systemIcon}><Icon size={19} aria-hidden="true" /></span>
              <span className={state === "Connected" ? styles.systemStatus : styles.systemStatusReview}>
                <span aria-hidden="true" />{state}
              </span>
            </div>
            <span className={styles.systemType}>{type}</span>
            <strong>{name}</strong>
            <span className={styles.systemDetail}>{detail}<ArrowUpRight size={13} aria-hidden="true" /></span>
          </Link>
        ))}
      </div>
    </section>
  );
}
