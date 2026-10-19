import type { Metadata } from "next";
import PageIntro from "@/components/layout/PageIntro";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Website terms information for the Grace Technologies website demonstration.",
};

export default function TermsPage() {
  return (
    <main>
      <PageIntro eyebrow="Terms" title="Website terms." description="These demonstration terms describe the status of this website and should be reviewed before production launch." />
      <section className={styles.section}><div className={styles.inner}>
        <h2>Demonstration content</h2>
        <p>Service descriptions, illustrative dashboard graphics, and fictional portfolio concepts are for demonstration only. They do not describe verified client engagements, results, or endorsements.</p>
        <h2>No service agreement</h2>
        <p>Information on this website is general and does not create a contract for services. Any future engagement would require separate written terms agreed by the parties.</p>
        <h2>Contact</h2>
        <p>Grace Technologies can be contacted at <a href="mailto:er.priyanksharma90@yahoo.in">er.priyanksharma90@yahoo.in</a>. Registered Office: 398 Whalebone Lane South, Romford, Greater London, RM6 6HP, England.</p>
        <p className={styles.notice}>This page is demonstration copy, not legal advice or an approved customer contract. Obtain appropriate review before launch.</p>
      </div></section>
    </main>
  );
}
