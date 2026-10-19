import type { Metadata } from "next";
import { ArrowUpRight, BookOpenText } from "lucide-react";
import PageIntro from "@/components/layout/PageIntro";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Insights",
  description: "Practical perspectives on digital products, software delivery, cloud, and technology decisions for business teams.",
};

const notes = [
  { number: "01", title: "Start with the workflow, not the tool", text: "Before selecting software, map the decisions, handoffs, and exceptions your team handles today. That context makes it easier to choose what should change and what should stay familiar.", topic: "Digital transformation" },
  { number: "02", title: "Make the first release useful on its own", text: "A good delivery plan creates value in stages. Define a first release that solves a real need while leaving a clear path for what comes next.", topic: "Product delivery" },
  { number: "03", title: "Treat cloud migration as an operating change", text: "Moving workloads is only one part of cloud work. Ownership, security, observability, cost visibility, and team practices need attention too.", topic: "Cloud and operations" },
];

export default function InsightsPage() {
  return (
    <main>
      <PageIntro eyebrow="Insights" title="Practical thinking for technology decisions." description="Short perspectives for business leaders and teams planning digital products, software delivery, and operational change." />
      <section className={styles.section}>
        <div className={styles.inner}>
          {notes.map((note) => <article className={styles.note} key={note.number}>
            <div className={styles.top}><span>{note.number} / FIELD NOTE</span><span>{note.topic}</span></div>
            <BookOpenText size={22} aria-hidden="true" />
            <h2>{note.title}</h2>
            <p>{note.text}</p>
            <span className={styles.read}>Practical perspective <ArrowUpRight size={15} aria-hidden="true" /></span>
          </article>)}
        </div>
      </section>
    </main>
  );
}
