import { processSteps } from "@/lib/site-data";
import styles from "./Process.module.css";

export default function Process() {
  return (
    <section className={styles.section} id="process" aria-labelledby="process-heading">
      <div className={styles.inner}>
        <div className={styles.heading}><span className={styles.eyebrow}>How we work</span><h2 id="process-heading">A considered path from first conversation to launch.</h2></div>
        <ol className={styles.steps}>
          {processSteps.map((step) => <li className={styles.step} key={step.number}>
            <span className={styles.number}>{step.number}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </li>)}
        </ol>
      </div>
    </section>
  );
}
