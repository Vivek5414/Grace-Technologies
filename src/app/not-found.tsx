import Link from "next/link";
import PageIntro from "@/components/layout/PageIntro";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main>
      <PageIntro eyebrow="404" title="That page does not exist." description="Return to the home page and continue exploring Grace Technologies." />
      <div className={styles.action}><Link href="/">Back home</Link></div>
    </main>
  );
}
