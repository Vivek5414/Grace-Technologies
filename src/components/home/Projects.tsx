import Link from "next/link";
import { ArrowUpRight, Workflow, MonitorSmartphone, ShoppingBag } from "lucide-react";
import { projects } from "@/lib/site-data";
import styles from "./Projects.module.css";

const projectIcons = [MonitorSmartphone, ShoppingBag, Workflow];

export default function Projects() {
  return (
    <section className={styles.section} id="projects" aria-labelledby="projects-heading">
      <div className={styles.inner}>
        <div className={styles.heading}>
          <div><span className={styles.eyebrow}>Selected concepts</span><h2 id="projects-heading">A look at how we approach the work.</h2></div>
          <p>These fictional demonstrations show our thinking and presentation style. They are not client projects or verified business outcomes.</p>
        </div>
        <div className={styles.grid}>
          {projects.map((project, index) => (
            <article className={styles.project} key={project.title}>
              <div className={styles.projectVisual}>
                <div className={styles.projectVisualTop}><span>ILLUSTRATIVE CONCEPT</span><span>0{index + 1}</span></div>
                <span className={styles.projectVisualIcon}>{(() => {
                  const Icon = projectIcons[index];
                  return <Icon size={30} strokeWidth={1.6} aria-hidden="true" />;
                })()}</span>
                <div className={styles.previewLines} aria-hidden="true"><i /><i /><i /></div>
                <span className={styles.projectType}>{project.industry.split(" · ")[0]}</span>
              </div>
              <div className={styles.projectTop}><span>DEMO CONCEPT 0{index + 1}</span><span>Sample only</span></div>
              <h3>{project.title}</h3>
              <dl>
                <div><dt>Challenge</dt><dd>{project.challenge}</dd></div>
                <div><dt>Approach</dt><dd>{project.solution}</dd></div>
                <div><dt>Illustrative deliverable</dt><dd>{project.outcome}</dd></div>
              </dl>
            </article>
          ))}
        </div>
        <div className={styles.more}><Link href="/projects">More demonstration work <ArrowUpRight size={16} aria-hidden="true" /></Link></div>
      </div>
    </section>
  );
}
