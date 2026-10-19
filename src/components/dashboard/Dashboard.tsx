"use client";

import { useState } from "react";
import DashboardFooter from "./DashboardFooter";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
import BusinessSystems from "./BusinessSystems";
import MetricsCards from "./MetricsCards";
import OperationsOverview from "./OperationsOverview";
import WorkflowActivityChart, { type DateRange } from "./WorkflowActivityChart";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const [dateRange, setDateRange] = useState<DateRange>("7d");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");

  function navigateTo(section: string) {
    setActiveSection(section);
    setIsSidebarOpen(false);
  }

  return (
    <div className={styles.dashboard}>
      {isSidebarOpen && (
        <button
          className={styles.backdrop}
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <DashboardSidebar
        activeSection={activeSection}
        isOpen={isSidebarOpen}
        onNavigate={navigateTo}
      />
      <div className={styles.mainColumn}>
        <DashboardHeader
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          onMenuClick={() => setIsSidebarOpen((open) => !open)}
          isMenuOpen={isSidebarOpen}
        />
        <main className={styles.main}>
          <OperationsOverview />
          <MetricsCards />
          <WorkflowActivityChart dateRange={dateRange} />
          <BusinessSystems />
          <DashboardFooter />
        </main>
      </div>
    </div>
  );
}
