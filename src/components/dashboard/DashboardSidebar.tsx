import Link from "next/link";
import Image from "next/image";
import {
  Activity,
  Blocks,
  LayoutDashboard,
  Settings2,
  Workflow,
} from "lucide-react";
import styles from "./Dashboard.module.css";

const navigation = [
  { id: "overview", label: "Overview", href: "#overview", icon: LayoutDashboard },
  { id: "activity", label: "Workflow activity", href: "#activity", icon: Activity },
  { id: "systems", label: "Business systems", href: "#systems", icon: Blocks },
];

type DashboardSidebarProps = {
  activeSection: string;
  isOpen: boolean;
  onNavigate: (section: string) => void;
};

export default function DashboardSidebar({
  activeSection,
  isOpen,
  onNavigate,
}: DashboardSidebarProps) {
  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}>
      <Link className={styles.brand} href="/" aria-label="Grace Technologies home">
        <Image
          className={styles.brandLogo}
          src="/images/grace-technologies-logo.png"
          alt="Grace Technologies"
          width={480}
          height={552}
          priority
          sizes="180px"
        />
        <span className={styles.brandText}>
          <small>OPERATIONS STUDIO</small>
        </span>
      </Link>

      <div className={styles.workspace}>
        <span className={styles.workspaceIcon} aria-hidden="true">GT</span>
        <span><strong>Demo workspace</strong><small>Illustrative environment</small></span>
      </div>

      <nav className={styles.sidebarNav} aria-label="Dashboard navigation">
        <span className={styles.navLabel}>WORKSPACE</span>
        {navigation.map(({ id, label, href, icon: Icon }) => (
          <a
            className={`${styles.navItem} ${activeSection === id ? styles.navItemActive : ""}`}
            key={id}
            href={href}
            aria-current={activeSection === id ? "location" : undefined}
            onClick={() => onNavigate(id)}
          >
            <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
            <span>{label}</span>
            {id === "activity" && <span className={styles.navCount}>12</span>}
          </a>
        ))}
        <span className={styles.navLabel}>PREFERENCES</span>
        <a
          className={`${styles.navItem} ${activeSection === "preferences" ? styles.navItemActive : ""}`}
          href="#preferences"
          onClick={() => onNavigate("preferences")}
        >
          <Settings2 size={18} strokeWidth={1.8} aria-hidden="true" />
          <span>Preferences</span>
        </a>
      </nav>

      <div className={styles.sidebarBottom}>
        <div className={styles.helpCard}>
          <Workflow size={18} aria-hidden="true" />
          <p><strong>Built for better flow</strong><span>See how connected operations can work.</span></p>
        </div>
        <p className={styles.sidebarCaption}>DEMO ENVIRONMENT <span aria-hidden="true">•</span> SAMPLE DATA</p>
      </div>
    </aside>
  );
}
