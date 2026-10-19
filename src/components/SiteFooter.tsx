import Link from "next/link";
import Image from "next/image";
import { LogIn } from "lucide-react";
import styles from "./SiteFooter.module.css";

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/gracetechnologiesofficial/", icon: "instagram", external: true },
  { label: "Pinterest", href: "https://in.pinterest.com/gracetechnologiesofficial/", icon: "pinterest", external: true },
  { label: "YouTube", href: "https://www.youtube.com/@Gracetechnologiesofficial", icon: "youtube", external: true },
  { label: "X", href: "https://x.com/grace_Official4", icon: "x", external: true },
  { label: "Facebook", href: "https://www.facebook.com/share/1EFVF3FZ1N/", icon: "facebook", external: true },
] as const;

type SocialIconName = (typeof socialLinks)[number]["icon"] | "email";

function SocialIcon({ name }: { name: SocialIconName }) {
  const paths: Record<Exclude<SocialIconName, "email" | "instagram">, string> = {
    pinterest: "M12.03 2C6.5 2 3.5 5.96 3.5 10.3c0 2.01.76 3.8 2.39 4.47.27.11.51 0 .59-.3l.24-.94c.08-.3.05-.4-.17-.66-.47-.56-.77-1.29-.77-2.32 0-2.99 2.24-5.67 5.84-5.67 3.18 0 4.93 1.94 4.93 4.52 0 3.4-1.5 6.27-3.73 6.27-1.23 0-2.15-1.02-1.86-2.28.35-1.51 1.02-3.14 1.02-4.23 0-.97-.52-1.78-1.6-1.78-1.27 0-2.29 1.31-2.29 3.06 0 1.12.38 1.88.38 1.88l-1.53 6.49c-.45 1.9-.07 4.24-.04 4.48.01.14.2.17.28.06.12-.16 1.69-2.09 2.21-3.94.15-.53.86-3.56.86-3.56.43.83 1.68 1.57 3.01 1.57 3.96 0 6.64-3.61 6.64-8.44C19.71 5.58 16.66 2 12.03 2Z",
    youtube: "M23 7.1a3 3 0 0 0-2.1-2.1C19 4.5 12 4.5 12 4.5s-7 0-8.9.5A3 3 0 0 0 1 7.1 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.9A3 3 0 0 0 3.1 19c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 23.5 12a31 31 0 0 0-.5-4.9ZM9.7 15.2V8.8l5.6 3.2-5.6 3.2Z",
    x: "M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.7 5.6 22H2.5l7.3-8.4L1.8 2h6.5l4.5 6.7L18.9 2Zm-1.1 17.9h1.7L7.3 4H5.5l12.3 15.9Z",
    facebook: "M13.2 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.6 1.6-1.6h1.7V3.5c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.2H7V13h2.8v8h3.4Z",
  };

  return (
    <svg className={styles.socialIcon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {name === "instagram" ? (
        <>
          <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="17.5" cy="6.7" r="1.2" />
        </>
      ) : name === "email" ? (
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8">
          <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
          <path d="m3.5 6 8.5 7 8.5-7" />
        </g>
      ) : (
        <path d={paths[name]} />
      )}
    </svg>
  );
}

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.identity}>
            <Link href="/" className={styles.brand} aria-label="Grace Technologies home">
              <Image
                className={styles.logo}
                src="/logo.svg"
                alt="Grace Technologies"
                width={800}
                height={330}
                sizes="180px"
              />
            </Link>
            <h2 className={styles.companyName}>Grace Technologies Ltd.</h2>
            <p className={styles.tagline}>Technology That Moves Your Business Forward.</p>
            <p className={styles.description}>Web development, cloud solutions, custom software, and digital services designed around the way your business works.</p>
            <div className={styles.contactDetails}>
              <div>
                <span>Registered Office</span>
                <address>398 Whalebone Lane South, Romford, Greater London, RM6 6HP, England</address>
              </div>
            </div>
          </div>
          <nav className={styles.column} aria-label="Company">
            <h2>Company</h2>
            <div className={styles.links}>
              <Link href="/about">About Us</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/projects">Projects</Link>
            </div>
          </nav>
          <nav className={styles.column} aria-label="Services">
            <h2>Services</h2>
            <div className={styles.links}>
              <Link href="/services#web-development">Web Development</Link>
              <Link href="/services#cloud-solutions">Cloud Solutions</Link>
              <Link href="/services#it-consulting">IT Consulting</Link>
              <Link href="/services#digital-transformation">Digital Solutions</Link>
            </div>
          </nav>
          <div className={`${styles.column} ${styles.connect}`}>
            <h2>Connect</h2>
            <ul className={styles.socialLinks}>
              {socialLinks.map(({ label, href, icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                  >
                    <SocialIcon name={icon} />
                  </a>
                </li>
              ))}
              <li>
                <a href="mailto:gracetechnologyofficial@gmail.com" aria-label="Email Grace Technologies" title="Email">
                  <SocialIcon name="email" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.bottom}>
          <span>© 2026 Grace Technologies Ltd. All rights reserved.</span>
          <nav className={styles.legal} aria-label="Legal">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </nav>
          <Link className={styles.adminButton} href="/admin/login">
            <LogIn size={16} aria-hidden="true" />
            <span>Admin Panel Login</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
