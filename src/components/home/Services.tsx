import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Bot, Palette, Smartphone, type LucideIcon } from "lucide-react";
import { services } from "@/lib/site-data";
import { serviceDetails, serviceDetailSlugById } from "@/lib/service-detail-data";
import styles from "./Services.module.css";

const serviceLogos: Record<string, string | undefined> = {
  "web-development": "web-development.jpeg",
  "custom-software": "custom-software-development.jpeg",
  "it-consulting": "it-consulting.jpeg",
  "cloud-solutions": "cloud-solutions.jpeg",
  "data-analytics": "data-analytics.jpeg",
  "digital-transformation": "digital-transformation.jpeg",
};

const additionalServiceIcons: Record<string, LucideIcon> = {
  "mobile-app-development": Smartphone,
  "ai-data-solutions": Bot,
  "ui-ux-design": Palette,
} as const;

export default function Services() {
  return (
    <section className={styles.section} id="services" aria-labelledby="services-heading">
      <div className={styles.inner}>
        <div className={styles.heading}>
          <div><span className={styles.eyebrow}>What we do</span><h2 id="services-heading">Useful technology, built around how you work.</h2></div>
          <p>From the first product idea to the systems that keep a business moving, we help make technology practical and dependable.</p>
        </div>
        <div className={styles.grid}>
          {services.map((service) => (
            <article className={styles.card} key={service.id} id={service.id}>
              <span className={`${styles.icon} ${serviceLogos[service.id] ? "" : styles.additionalIconBox}`}>
                {serviceLogos[service.id] ? (
                  <Image
                    className={styles.iconImage}
                    src={`/assets/services/${serviceLogos[service.id]}`}
                    alt=""
                    width={512}
                    height={512}
                    sizes="(max-width: 560px) 56px, (max-width: 850px) 64px, 76px"
                    unoptimized
                    loading="eager"
                  />
                ) : (
                  (() => {
                    const Icon = additionalServiceIcons[service.id];
                    return Icon ? <Icon className={styles.additionalIcon} size={36} strokeWidth={2.2} aria-hidden="true" /> : null;
                  })()
                )}
              </span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul className={styles.capabilities}>
                {serviceDetails[serviceDetailSlugById[service.id]].focus.slice(0, 2).map((capability) => (
                  <li key={capability}>{capability}</li>
                ))}
              </ul>
              <small>{service.support}</small>
              <Link href={`/services/${serviceDetailSlugById[service.id]}`}>Learn more <ArrowUpRight size={15} aria-hidden="true" /></Link>
            </article>
          ))}
        </div>
        <div className={styles.more}><Link href="/services">View all services <ArrowUpRight size={16} aria-hidden="true" /></Link></div>
      </div>
    </section>
  );
}
