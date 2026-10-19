"use client";

import { useDemoCrm } from "./DemoCrmProvider";
import styles from "./AdminPages.module.css";

export default function DemoContactsSummary() {
  const { contacts } = useDemoCrm();
  const newContacts = contacts.filter(({ is_new_contact }) => is_new_contact).length;
  const recentlyContacted = contacts.filter(({ was_recently_contacted }) => was_recently_contacted).length;

  return (
    <section className={`${styles.statsGrid} ${styles.contactStats}`} aria-label="Sample contact summary">
      <article className={styles.statCard}><span>Total contacts</span><strong>{contacts.length}</strong><small>Fictional sample records</small></article>
      <article className={styles.statCard}><span>New contacts</span><strong>{newContacts}</strong><small>Sample records added recently</small></article>
      <article className={styles.statCard}><span>Recently contacted</span><strong>{recentlyContacted}</strong><small>Sample follow-up activity</small></article>
    </section>
  );
}
