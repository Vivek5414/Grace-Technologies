import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import styles from "./Dashboard.module.css";

export default function DashboardFooter() {
  return (
    <footer className={styles.dashboardFooter} id="preferences">
      <p><strong>Illustrative demo</strong><span>This experience uses sample data and is not connected to a live business system.</span></p>
      <Link href="/">Grace Technologies <ArrowUpRight size={14} aria-hidden="true" /></Link>
    </footer>
  );
}
