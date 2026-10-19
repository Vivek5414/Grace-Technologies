import type { Metadata } from "next";
import styles from "@/components/admin/AdminPages.module.css";

export const metadata: Metadata = {
  title: "Admin Account",
  description: "Grace Technologies administrator account details.",
  robots: { index: false, follow: false },
};

export default function AdminAccountPage() {
  return (
    <>
      <section className={styles.pageHeading}>
        <div><span className={styles.eyebrow}>ACCOUNT</span><h1>Admin</h1><p>Administrator session details for the current account.</p></div>
      </section>
      <div className={styles.notice}><strong>Account settings</strong><br />No user-management or account-settings features are configured in this project.</div>
      <section className={styles.adminDetails} aria-label="Administrator account">
        <article className={styles.adminDetail}><span>Access level</span><strong>Administrator</strong></article>
        <article className={styles.adminDetail}><span>Authentication</span><strong>Supabase session required</strong></article>
      </section>
    </>
  );
}