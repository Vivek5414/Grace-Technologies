import { FileCheck2, Headset, HeartHandshake, Layers3 } from "lucide-react";
import styles from "./HomeStats.module.css";

const statistics = [
  { value: "50+", label: "Projects Delivered", Icon: FileCheck2 },
  { value: "15+", label: "Industries Served", Icon: Layers3 },
  { value: "100%", label: "Client-Focused", Icon: HeartHandshake },
  { value: "24/7", label: "Support & Collaboration", Icon: Headset },
];

export default function HomeStats() {
  return (
    <section className={styles.section} aria-label="Grace Technologies at a glance">
      <div className={styles.panel}>
        {statistics.map(({ value, label, Icon }) => (
          <div className={styles.statistic} key={label}>
            <span className={styles.icon}>
              <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
            </span>
            <div className={styles.copy}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
