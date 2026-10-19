import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageSquareText, UsersRound } from "lucide-react";
import { getAdminContacts, getAdminEnquiries } from "@/lib/admin/data";
import styles from "@/components/admin/AdminPages.module.css";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Grace Technologies admin overview.",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardPage() {
  const [{ enquiries, error: enquiryError }, { contacts, error: contactError }] = await Promise.all([getAdminEnquiries(), getAdminContacts()]);
  const error = enquiryError ?? contactError;
  const pending = enquiries.filter(({ status }) => status === "new").length;
  const recentEnquiries = enquiries.slice(0, 5);

  return (
    <>
      <section className={styles.pageHeading}>
        <div><span className={styles.eyebrow}>WORKSPACE OVERVIEW</span><h1>Dashboard</h1><p>A current view of contacts, enquiries, and communication activity.</p></div>
      </section>
      {error && <p className={`${styles.notice} ${styles.noticeError}`} role="alert">{error}</p>}
      <section className={styles.statsGrid} aria-label="Admin summary">
        <article className={styles.statCard}><span>Total contacts</span><strong>{contacts.length}</strong><small>Derived from enquiry email addresses</small></article>
        <article className={styles.statCard}><span>Total enquiries</span><strong>{enquiries.length}</strong><small>All recorded statuses</small></article>
        <article className={styles.statCard}><span>Pending enquiries</span><strong>{pending}</strong><small>Awaiting first contact</small></article>
        <article className={styles.statCard}><span>WhatsApp clicks</span><strong>—</strong><small>Analytics source not configured</small></article>
      </section>
      <section className={styles.panel} aria-labelledby="recent-enquiries-heading">
        <div className={styles.panelHeading}><div><h2 id="recent-enquiries-heading">Recent enquiries</h2><p>Latest submissions from the existing enquiries table</p></div><Link className={styles.cellLink} href="/admin/enquiries">View enquiries <ArrowRight size={14} aria-hidden="true" /></Link></div>
        {recentEnquiries.length === 0 ? (
          <div className={styles.emptyState}><MessageSquareText size={24} aria-hidden="true" /><h3>No enquiries yet</h3><p>Submissions from the public enquiry form will appear here.</p></div>
        ) : (
          <div className={styles.recentList}>
            {recentEnquiries.map((enquiry) => (
              <div className={styles.recentRow} key={enquiry.id}>
                <span className={styles.recentIdentity}><strong>{enquiry.full_name}</strong><small>{enquiry.service}</small></span>
                <span className={styles.statusBadge}><i aria-hidden="true" />{enquiry.status.replace("_", " ")}</span>
                <time className={styles.recentDate} dateTime={enquiry.created_at}>{new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(new Date(enquiry.created_at))}</time>
              </div>
            ))}
          </div>
        )}
      </section>
      <div className={styles.statsGrid}>
        <Link className={styles.statCard} href="/admin/contacts"><UsersRound size={18} aria-hidden="true" /><span>Manage contacts</span><small>View and update customer records</small></Link>
        <Link className={styles.statCard} href="/admin/whatsapp"><MessageSquareText size={18} aria-hidden="true" /><span>WhatsApp analytics</span><small>View analytics availability and filters</small></Link>
      </div>
    </>
  );
}