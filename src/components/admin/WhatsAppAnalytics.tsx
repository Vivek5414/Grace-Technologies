"use client";

import { useState } from "react";
import { Activity, Monitor, Search, Smartphone } from "lucide-react";
import styles from "./AdminPages.module.css";

export default function WhatsAppAnalytics() {
  const [period, setPeriod] = useState("30");
  const [device, setDevice] = useState("all");
  const [query, setQuery] = useState("");

  return (
    <>
      <p className={`${styles.notice} ${styles.noticeError}`} role="status">
        <strong>Analytics source unavailable.</strong> This project has no WhatsApp click-event table or analytics query configured. Metrics are not fabricated.
      </p>
      <section className={styles.analyticsCards} aria-label="WhatsApp click totals">
        <article className={styles.analyticsCard}><span><Activity size={16} aria-hidden="true" /> Total clicks</span><strong>—</strong></article>
        <article className={styles.analyticsCard}><span><Smartphone size={16} aria-hidden="true" /> Mobile clicks</span><strong>—</strong></article>
        <article className={styles.analyticsCard}><span><Monitor size={16} aria-hidden="true" /> Desktop clicks</span><strong>—</strong></article>
      </section>
      <section className={styles.panel} aria-label="WhatsApp analytics filters and page reports">
        <div className={styles.toolbar}>
          <label>
            <span className="sr-only">Filter by time period</span>
            <select className={styles.filterSelect} value={period} onChange={(event) => setPeriod(event.currentTarget.value)}>
              <option value="7">Last 7 days</option><option value="30">Last 30 days</option><option value="90">Last 90 days</option><option value="365">Last 12 months</option>
            </select>
          </label>
          <label>
            <span className="sr-only">Filter by device</span>
            <select className={styles.filterSelect} value={device} onChange={(event) => setDevice(event.currentTarget.value)}>
              <option value="all">All devices</option><option value="mobile">Mobile</option><option value="desktop">Desktop</option><option value="tablet">Tablet</option>
            </select>
          </label>
          <label className={styles.search}>
            <Search size={16} aria-hidden="true" />
            <span className="sr-only">Search pages with WhatsApp clicks</span>
            <input type="search" value={query} onChange={(event) => setQuery(event.currentTarget.value)} placeholder="Search pages" />
          </label>
        </div>
        <div className={styles.panelHeading}><div><h2>Top pages</h2><p>Pages with WhatsApp click activity during the selected period</p></div><span>{period} day range · {device === "all" ? "all devices" : device}</span></div>
        <div className={styles.emptyState}>
          <Activity size={24} aria-hidden="true" />
          <h3>{query ? "No matching page data" : "No WhatsApp click data available"}</h3>
          <p>{query ? "No click-event source is connected, so there are no page results to filter." : "Connect a WhatsApp click-event source to report totals, devices, and top pages here."}</p>
        </div>
      </section>
      <section className={styles.panel} aria-labelledby="all-whatsapp-pages-title">
        <div className={styles.panelHeading}><div><h2 id="all-whatsapp-pages-title">All pages with WhatsApp clicks</h2><p>Click totals by page path</p></div></div>
        <div className={styles.emptyState}><p>No WhatsApp click-event records are configured in the current database.</p></div>
      </section>
    </>
  );
}