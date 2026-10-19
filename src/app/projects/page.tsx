import type { Metadata } from "next";
import PageIntro from "@/components/layout/PageIntro";
import { projects } from "@/lib/site-data";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Project Concepts",
  description: "Explore fictional demonstration case studies that illustrate Grace Technologies' approach to digital delivery.",
};

export default function ProjectsPage() {
  return (
    <main>
      <PageIntro eyebrow="Projects" title="Demonstration case studies." description="Fictional examples to show how a project might be framed, explored, and delivered. These are not client engagements or verified outcomes." />
      <section className={styles.section}>
        <div className={styles.inner}>
          {projects.map((project, index) => <article className={styles.project} key={project.title}>
            <div className={styles.header}><span>DEMO CONCEPT 0{index + 1}</span><span>{project.industry}</span></div>
            <h2>{project.title}</h2>
            <dl>
              <div><dt>Challenge</dt><dd>{project.challenge}</dd></div>
              <div><dt>Solution</dt><dd>{project.solution}</dd></div>
              <div><dt>Outcome</dt><dd>{project.outcome}</dd></div>
            </dl>
          </article>)}
        </div>
      </section>
    </main>
  );
}
