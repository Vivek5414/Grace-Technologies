import Link from "next/link";
import { ArrowUpRight, Menu, PanelLeftClose } from "lucide-react";
import type { DateRange } from "./WorkflowActivityChart";
import styles from "./Dashboard.module.css";

type DashboardHeaderProps = {
  dateRange: DateRange;
  isMenuOpen: boolean;
  onDateRangeChange: (range: DateRange) => void;
  onMenuClick: () => void;
};

const dateRanges: { value: DateRange; label: string }[] = [
  { value: "7d", label: "7 days" },
  { value: "30d", label: "30 days" },
  { value: "90d", label: "90 days" },
];

export default function DashboardHeader({
  dateRange,
  isMenuOpen,
  onDateRangeChange,
  onMenuClick,
}: DashboardHeaderProps) {
  return (
    <header className={styles.topbar}>
      <div className={styles.topbarLeft}>
        <button
          className={styles.menuButton}
          type="button"
          aria-label={isMenuOpen ? "Close dashboard navigation" : "Open dashboard navigation"}
          aria-expanded={isMenuOpen}
          onClick={onMenuClick}
        >
          {isMenuOpen ? <PanelLeftClose size={19} /> : <Menu size={19} />}
        </button>
        <span className={styles.breadcrumb}>Workspace <span aria-hidden="true">/</span> Overview</span>
      </div>
      <div className={styles.topbarActions}>
        <div className={styles.rangeControl} role="group" aria-label="Chart date range">
          {dateRanges.map((range) => (
            <button
              className={dateRange === range.value ? styles.rangeActive : ""}
              key={range.value}
              type="button"
              aria-pressed={dateRange === range.value}
              onClick={() => onDateRangeChange(range.value)}
            >
              {range.label}
            </button>
          ))}
        </div>
        <Link className={styles.websiteLink} href="/">
          <span>View website</span><ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </header>
  );
}
