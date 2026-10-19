import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Workflow } from "lucide-react";
import Dashboard from "@/components/dashboard/Dashboard";
import styles from "@/components/demos/ServiceDemo.module.css";

export const metadata: Metadata = {
  title: "Digital Transformation Demo",
  description: "An interactive sample business workflow dashboard from Grace Technologies, using illustrative data.",
  robots: { index: false, follow: false },
};

export default function DigitalTransformationDemoPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <nav className={styles.demoNav} aria-label="Demo navigation">
          <Link href="/services"><ArrowLeft size={16} aria-hidden="true" /> Back to Services</Link>
          <span>Grace Technologies <i aria-hidden="true">/</i> Sample project</span>
        </nav>
        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>Digital Transformation / Demo</span>
            <h1>Connected work, in motion.</h1>
            <p>An illustrative operations workspace showing how teams can bring workflows, business systems, and activity into a clearer view.</p>
          </div>
          <div className={styles.sampleNotice}>
            <span className={styles.sampleMark}><Workflow size={18} aria-hidden="true" /></span>
            <div><strong>Sample project demo</strong><p>Fictional workspace and activity only. Not a live client system.</p></div>
          </div>
        </header>
      </div>
      <Dashboard />
      <div className={styles.container}>
        <section className={styles.contactCta}>
          <div><span>Have a project in mind?</span><h2>Let&apos;s make the next step practical.</h2></div>
          <Link href="/contact">Discuss your project <ArrowRight size={16} aria-hidden="true" /></Link>
        </section>
      </div>
    </div>
  );
}