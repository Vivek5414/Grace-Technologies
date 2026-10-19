"use client";

import Image from "next/image";
import Link from "next/link";
import { type MouseEvent } from "react";
import { ArrowRight, BadgeCheck, Globe2, UsersRound } from "lucide-react";
import styles from "./Hero.module.css";

const trustIndicators = [
  { label: "US-Focused", Icon: Globe2 },
  { label: "Experienced Team", Icon: UsersRound },
  { label: "Tailored Solutions", Icon: BadgeCheck },
];

export default function Hero() {
  function openEnquiry(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    window.dispatchEvent(new Event("grace:open-enquiry-modal"));
  }

  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <span className={styles.eyebrow}>Technology for a brighter tomorrow</span>
          <h1 id="hero-heading">
            Technology That
            <br />
            Moves Your
            <br />
            <span>Business Forward</span>
          </h1>
          <p>
            We build modern digital solutions for US businesses — from custom
            software and cloud solutions to data, automation, and digital
            transformation.
          </p>
          <div className={styles.actions}>
            <Link className={styles.primaryButton} href="/contact" onClick={openEnquiry}>
              Book a Consultation <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link className={styles.secondaryButton} href="/services">
              Explore Our Services
            </Link>
          </div>
          <ul className={styles.trustIndicators} aria-label="Why work with us">
            {trustIndicators.map(({ label, Icon }) => (
              <li key={label}>
                <Icon size={17} aria-hidden="true" />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.visual}>
          <Image
            className={styles.illustration}
            src="/images/new%20poto%20GT.jpeg"
            alt="Business team reviewing growth analytics together"
            width={768}
            height={768}
            sizes="(max-width: 860px) 100vw, 52vw"
            unoptimized
            priority
          />
        </div>
      </div>
    </section>
  );
}
