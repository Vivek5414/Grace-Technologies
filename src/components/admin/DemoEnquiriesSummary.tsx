"use client";

import { useDemoCrm } from "./DemoCrmProvider";
import styles from "./AdminPages.module.css";

export default function DemoEnquiriesSummary() {
  const { enquiries } = useDemoCrm();
  const counts = {
    pending: enquiries.filter(({ status }) => status === "new").length,
    contacted: enquiries.filter(({ status }) => status === "in_progress").length,
    completed: enquiries.filter(({ status }) => status === "resolved").length,
    archived: enquiries.filter(({ status }) => status === "spam").length,
  };

  return (
    <section className={styles.statsGrid} aria-label="Sample enquiry status summary">
      <article className={styles.statCard}><span>Pending</span><strong>{counts.pending}</strong><small>Sample requests awaiting first contact</small></article>
      <article className={styles.statCard}><span>Contacted</span><strong>{counts.contacted}</strong><small>Sample follow-up in progress</small></article>
      <article className={styles.statCard}><span>Completed</span><strong>{counts.completed}</strong><small>Sample resolved requests</small></article>
      <article className={styles.statCard}><span>Archived</span><strong>{counts.archived}</strong><small>Sample archived requests</small></article>
    </section>
  );
}
