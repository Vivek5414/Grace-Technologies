import type { Metadata } from "next";
import PageIntro from "@/components/layout/PageIntro";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy information for the Grace Technologies website demonstration.",
};

export default function PrivacyPage() {
  return (
    <main>
      <PageIntro eyebrow="Privacy" title="Privacy information for this website." description="This page describes the current demonstration website. It should be reviewed and replaced with an approved policy before production launch." />
      <section className={styles.section}><div className={styles.inner}>
        <h2>Information entered in forms</h2>
        <p>The enquiry forms on this demonstration website validate fields in your browser. They do not send form entries to Grace Technologies, a database, or an email inbox, and the form does not save the entered details.</p>
        <h2>Session storage</h2>
        <p>If you dismiss the enquiry dialog, this website stores a short dismissal flag in your browser session storage so the dialog does not reopen during the same tab session. The flag contains no enquiry details.</p>
        <h2>Contact</h2>
        <p>For questions, contact <a href="mailto:er.priyanksharma90@yahoo.in">er.priyanksharma90@yahoo.in</a>. Registered Office: 398 Whalebone Lane South, Romford, Greater London, RM6 6HP, England.</p>
        <p className={styles.notice}>This demonstration notice is not a substitute for a production privacy policy. Hosting, analytics, cookies, retention, and any future backend processing must be reviewed before launch.</p>
      </div></section>
    </main>
  );
}
