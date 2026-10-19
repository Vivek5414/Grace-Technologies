import type { Metadata } from "next";
import ContactsTable from "@/components/admin/ContactsTable";
import DemoContactsSummary from "@/components/admin/DemoContactsSummary";
import styles from "@/components/admin/AdminPages.module.css";

export const metadata: Metadata = {
  title: "Admin Contacts Demo",
  description: "Explore fictional Grace Technologies customer contact records.",
  robots: { index: false, follow: false },
};

export default function AdminContactsPage() {
  return (
    <>
      <section className={styles.pageHeading}>
        <div><span className={styles.eyebrow}>RELATIONSHIPS · DEMO</span><h1>Contacts</h1><p>Explore sample customer records and their enquiry history.</p></div>
      </section>
      <DemoContactsSummary />
      <ContactsTable />
    </>
  );
}