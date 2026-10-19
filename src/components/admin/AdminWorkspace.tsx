"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, LogOut, Menu, MessageSquareText, UsersRound, MessageCircle, X } from "lucide-react";
import { signOutAdmin } from "@/app/admin/actions";
import { DemoCrmProvider } from "./DemoCrmProvider";
import styles from "./AdminWorkspace.module.css";

const navigation = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Contacts", href: "/admin/contacts", icon: UsersRound },
  { label: "Enquiries", href: "/admin/enquiries", icon: MessageSquareText },
  { label: "WhatsApp", href: "/admin/whatsapp", icon: MessageCircle },
  { label: "Admin", href: "/admin", icon: UsersRound },
];

const pageTitles: Record<string, string> = {
  "/admin": "Admin",
  "/admin/dashboard": "Dashboard",
  "/admin/contacts": "Contacts",
  "/admin/enquiries": "Enquiries",
  "/admin/whatsapp": "WhatsApp analytics",
};

export default function AdminWorkspace({ adminEmail, children }: { adminEmail: string; children: ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const title = pageTitles[pathname]
    ?? (pathname.startsWith("/admin/contacts/") ? "Contact details" : pathname.startsWith("/admin/enquiries/") ? "Enquiry details" : "Admin");
  const isDemoCrmPage = pathname.startsWith("/admin/contacts") || pathname.startsWith("/admin/enquiries");

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <DemoCrmProvider>
    <div className={styles.workspace}>
      {menuOpen && <button className={styles.backdrop} type="button" aria-label="Close admin navigation" onClick={closeMenu} />}
      <aside className={`${styles.sidebar} ${menuOpen ? styles.sidebarOpen : ""}`}>
        <Link className={styles.brand} href="/admin/dashboard" onClick={closeMenu} aria-label="Grace Technologies admin dashboard">
          <Image src="/images/grace-technologies-logo.png" alt="Grace Technologies" width={480} height={552} priority sizes="190px" />
          <span>ADMIN PANEL</span>
        </Link>
        <nav className={styles.navigation} aria-label="Admin navigation">
          <span className={styles.navCaption}>WORKSPACE</span>
          {navigation.map(({ label, href, icon: Icon }) => {
            const active = pathname === href || (href !== "/admin" && pathname.startsWith(`${href}/`));
            return (
              <Link
                className={`${styles.navItem} ${active ? styles.navItemActive : ""}`}
                href={href}
                key={href}
                aria-current={active ? "page" : undefined}
                onClick={closeMenu}
              >
                <Icon size={18} aria-hidden="true" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
        <div className={styles.account}>
          <span className={styles.avatar} aria-hidden="true">GT</span>
          <span className={styles.accountInfo}><strong>Administrator</strong><small title={adminEmail}>{adminEmail}</small></span>
          <form action={signOutAdmin}>
            <button className={styles.signOut} type="submit" aria-label="Sign out" title="Sign out"><LogOut size={17} aria-hidden="true" /></button>
          </form>
        </div>
      </aside>
      <div className={styles.mainColumn}>
        <header className={styles.topbar}>
          <button className={styles.menuButton} type="button" aria-label={menuOpen ? "Close admin navigation" : "Open admin navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
          </button>
          <div className={styles.breadcrumb}><span>Admin</span><span aria-hidden="true">/</span><strong>{title}</strong></div>
          {isDemoCrmPage && <span className={styles.demoBadge}>DEMO DATA</span>}
          <Link className={styles.siteLink} href="/">View website</Link>
        </header>
        <main className={styles.content}>
          {isDemoCrmPage && <p className={styles.demoNotice} role="note">Fictional sample records. Changes remain in this browser session only and are never sent to Supabase. Reload to restore the sample data.</p>}
          {children}
        </main>
      </div>
    </div>
    </DemoCrmProvider>
  );
}