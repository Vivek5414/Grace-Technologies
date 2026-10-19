"use client";

import { type MouseEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import styles from "./SiteHeader.module.css";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Industries", href: "/industries" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

function Brand() {
  return (
    <Link href="/" className={styles.brand} aria-label="Grace Technologies home">
      <Image
        className={styles.logo}
        src="/images/grace-technologies-logo.png"
        alt="Grace Technologies Pvt."
        width={480}
        height={552}
        priority
        sizes="(max-width: 380px) 73px, (max-width: 960px) 80px, 94px"
      />
    </Link>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    mobileNavRef.current?.querySelector<HTMLElement>("a")?.focus();
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isMenuOpen]);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function openEnquiry(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    window.dispatchEvent(new Event("grace:open-enquiry-modal"));
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Brand />
        <nav className={styles.desktopNav} aria-label="Main navigation">
          <Link className={pathname === "/" ? styles.active : ""} href="/">Home</Link>
          <Link
            className={pathname.startsWith("/services") ? styles.active : ""}
            aria-current={pathname.startsWith("/services") ? "page" : undefined}
            href="/services"
          >Services</Link>
          {navItems.slice(1).map((item) => (
            <Link
              key={item.href}
              className={pathname === item.href ? styles.active : ""}
              aria-current={pathname === item.href ? "page" : undefined}
              href={item.href}
            >{item.label}</Link>
          ))}
        </nav>
        <div className={styles.actions}>
          <Link href="/contact" className={styles.cta} onClick={openEnquiry}>Book a Consultation</Link>
          <button
            className={styles.menuButton}
            ref={menuButtonRef}
            type="button"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>
      <nav
        className={`${styles.mobileNav} ${isMenuOpen ? styles.mobileNavOpen : ""}`}
        id="mobile-navigation"
        ref={mobileNavRef}
        aria-label="Mobile navigation"
        aria-hidden={!isMenuOpen}
      >
        {[
          navItems[0],
          { label: "Services", href: "/services" },
          ...navItems.slice(1),
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            tabIndex={isMenuOpen ? 0 : -1}
            aria-current={pathname === item.href ? "page" : undefined}
            onClick={closeMenu}
          >{item.label}</Link>
        ))}
        <Link className={styles.mobileCta} href="/contact" tabIndex={isMenuOpen ? 0 : -1} onClick={(event) => { closeMenu(); openEnquiry(event); }}>Book a Consultation</Link>
      </nav>
    </header>
  );
}
