import Image from "next/image";
import Link from "next/link";
import { industrySlugByTitle } from "@/lib/industry-detail-data";
import { industries } from "@/lib/site-data";
import styles from "./Industries.module.css";

const industryIcons: Record<string, string> = {
  Healthcare: "healthcare.png",
  "Financial Services": "financial-services.png",
  Retail: "retail.png",
  Manufacturing: "manufacturing.png",
  Logistics: "logistics.png",
  "Professional Services": "professional-services.png",
};

export default function Industries() {
  return (
    <section className={styles.section} id="industries" aria-labelledby="industries-heading">
      <div className={styles.inner}>
        <div className={styles.heading}>
          <span className={styles.eyebrow}>Industries</span>
          <h2 id="industries-heading">Technology that respects the realities of your sector.</h2>
          <p>Every organization has its own constraints, customers, and ways of working. We start there.</p>
        </div>
        <div className={styles.list}>
          {industries.map((industry) => {
            const icon = industryIcons[industry.title];
            return (
              <Link
                className={styles.item}
                href={`/industries/${industrySlugByTitle[industry.title]}`}
                key={industry.title}
                aria-label={`Explore ${industry.title} industry solutions`}
              >
                <Image className={styles.icon} src={`/assets/industries/${icon}`} alt="" width={136} height={136} sizes="64px" />
                <div className={styles.copy}>
                  <h3>{industry.title}</h3>
                  <p>{industry.detail}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
