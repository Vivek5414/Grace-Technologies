"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Check,
  Cloud,
  Database,
  Globe,
  ShieldCheck,
  UsersRound,
  Workflow,
} from "lucide-react";
import { serviceDemos, type ServiceDemoId } from "@/lib/service-demo-data";
import styles from "./ServiceDemo.module.css";

type ServiceDemoProps = {
  demoId: ServiceDemoId;
};

function WebsitePreview() {
  const [activePage, setActivePage] = useState("Home");
  const pages = {
    Home: { eyebrow: "A better way to work", title: "Make room for your next big idea.", body: "Thoughtful business support for the plans you are ready to put in motion." },
    Services: { eyebrow: "How we help", title: "Support built around your goals.", body: "Explore practical services designed to make your everyday work easier." },
    About: { eyebrow: "Meet Northstar", title: "Good work starts with listening.", body: "A fictional consultancy focused on helping local teams move forward." },
    Contact: { eyebrow: "Start a conversation", title: "Tell us where you want to go.", body: "A clear first step for customers ready to talk with the team." },
  } as const;
  const page = pages[activePage as keyof typeof pages];

  return (
    <div className={styles.browserFrame}>
      <div className={styles.browserBar} aria-hidden="true">
        <span /><span /><span /><div>northstar.example</div>
      </div>
      <div className={styles.websitePreview}>
        <header className={styles.websiteNav}>
          <strong>northstar<span> advisory</span></strong>
          <nav aria-label="Sample website navigation">
            {Object.keys(pages).map((name) => (
              <button
                className={activePage === name ? styles.previewNavActive : styles.previewNav}
                key={name}
                type="button"
                aria-pressed={activePage === name}
                onClick={() => setActivePage(name)}
              >{name}</button>
            ))}
          </nav>
        </header>
        <section className={styles.websiteHero}>
          <span>{page.eyebrow}</span>
          <h2>{page.title}</h2>
          <p>{page.body}</p>
          <button type="button" onClick={() => setActivePage("Services")}>Explore services <ArrowRight size={15} aria-hidden="true" /></button>
        </section>
        <div className={styles.websiteFeatures}>
          <article><Globe size={17} aria-hidden="true" /><strong>Clear online presence</strong></article>
          <article><UsersRound size={17} aria-hidden="true" /><strong>Customer-first journeys</strong></article>
          <article><Activity size={17} aria-hidden="true" /><strong>Responsive by design</strong></article>
        </div>
      </div>
    </div>
  );
}

const sampleTasks = [
  { name: "Customer onboarding", owner: "M. Reed", status: "In progress", due: "Today" },
  { name: "Service portal refresh", owner: "A. Ellis", status: "Review", due: "Oct 22" },
  { name: "Reporting workspace", owner: "C. Bennett", status: "In progress", due: "Oct 24" },
  { name: "Access audit", owner: "J. Morgan", status: "Complete", due: "Oct 18" },
] as const;

function SoftwarePreview() {
  const [filter, setFilter] = useState("All work");
  const visibleTasks = sampleTasks.filter((task) => filter === "All work" || task.status === filter);
  const filters = ["All work", "In progress", "Review"];

  return (
    <div className={styles.softwarePreview}>
      <div className={styles.previewSidebar}>
        <span className={styles.previewMark}>N</span>
        <span className={styles.previewSideLine} />
        <span className={styles.previewSideLine} />
        <span className={styles.previewSideLine} />
      </div>
      <div className={styles.softwareMain}>
        <div className={styles.productHeading}><div><span>WORKSPACE / DELIVERY</span><h2>Project overview</h2></div><span className={styles.sampleChip}>SAMPLE</span></div>
        <div className={styles.softwareMetrics}>
          <article><span>Open work</span><strong>18</strong><small>Across 4 projects</small></article>
          <article><span>On track</span><strong>92%</strong><small>Illustrative status</small></article>
          <article><span>Team capacity</span><strong>76%</strong><small>This sprint</small></article>
        </div>
        <div className={styles.taskHeading}>
          <h3>Project tasks</h3>
          <div className={styles.segmented} role="group" aria-label="Filter sample tasks">
            {filters.map((item) => <button key={item} type="button" aria-pressed={filter === item} className={filter === item ? styles.segmentActive : styles.segment} onClick={() => setFilter(item)}>{item}</button>)}
          </div>
        </div>
        <div className={styles.taskList}>
          {visibleTasks.map((task) => (
            <article className={styles.taskRow} key={task.name}>
              <span className={styles.taskCheck}><Check size={13} aria-hidden="true" /></span>
              <strong>{task.name}</strong><span>{task.owner}</span>
              <span className={task.status === "Complete" ? styles.taskComplete : styles.taskStatus}>{task.status}</span>
              <time>{task.due}</time>
            </article>
          ))}
          {visibleTasks.length === 0 && <p className={styles.noTasks}>No sample tasks in this view.</p>}
        </div>
      </div>
    </div>
  );
}

const roadmapPhases = {
  Discover: { period: "Weeks 1-2", title: "Understand the current state", detail: "Map business goals, existing systems, constraints, and the needs of the people who use them.", output: "Current-state assessment" },
  Prioritize: { period: "Weeks 3-4", title: "Agree what matters first", detail: "Compare opportunities by value, effort, risk, and readiness to create a practical sequence.", output: "Prioritized opportunity map" },
  Deliver: { period: "Weeks 5-8", title: "Turn the plan into progress", detail: "Shape an achievable first phase with clear ownership, milestones, and measures of success.", output: "Delivery-ready roadmap" },
} as const;

function ConsultingPreview() {
  const [phase, setPhase] = useState<keyof typeof roadmapPhases>("Discover");
  const current = roadmapPhases[phase];

  return (
    <div className={styles.consultingPreview}>
      <div className={styles.roadmapHeader}><span className={styles.sampleChip}>SAMPLE ROADMAP</span><span>Illustrative planning view</span></div>
      <div className={styles.roadmapBody}>
        <nav className={styles.phaseNav} aria-label="Roadmap phases">
          {(Object.keys(roadmapPhases) as (keyof typeof roadmapPhases)[]).map((item, index) => (
            <button className={phase === item ? styles.phaseActive : styles.phaseButton} key={item} type="button" aria-pressed={phase === item} onClick={() => setPhase(item)}>
              <span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong><small>{roadmapPhases[item].period}</small>
            </button>
          ))}
        </nav>
        <article className={styles.phaseDetail}>
          <span className={styles.phaseKicker}>{current.period} / {phase.toUpperCase()}</span>
          <h2>{current.title}</h2>
          <p>{current.detail}</p>
          <div><span>PLANNING OUTPUT</span><strong>{current.output}</strong></div>
        </article>
      </div>
    </div>
  );
}

const cloudEnvironments = {
  Production: { region: "US East", instances: "12", availability: "99.98%", requests: "2.4M", state: "Healthy" },
  Staging: { region: "US Central", instances: "4", availability: "99.91%", requests: "186K", state: "Healthy" },
  Development: { region: "US West", instances: "6", availability: "99.87%", requests: "92K", state: "Healthy" },
} as const;

function CloudPreview() {
  const [environment, setEnvironment] = useState<keyof typeof cloudEnvironments>("Production");
  const [isFailoverActive, setIsFailoverActive] = useState(false);
  const metrics = cloudEnvironments[environment];
  const region = isFailoverActive ? "US Central (failover)" : metrics.region;

  return (
    <div className={styles.cloudPreview}>
      <div className={styles.cloudHeader}><div><span>INFRASTRUCTURE / OVERVIEW</span><h2>Cloud environment</h2></div><span className={styles.healthy}><i />{metrics.state}</span></div>
      <div className={styles.cloudControls} role="group" aria-label="Select sample cloud environment">
        {(Object.keys(cloudEnvironments) as (keyof typeof cloudEnvironments)[]).map((item) => <button key={item} type="button" className={environment === item ? styles.segmentActive : styles.segment} aria-pressed={environment === item} onClick={() => { setEnvironment(item); setIsFailoverActive(false); }}>{item}</button>)}
      </div>
      <div className={styles.cloudMetrics}>
        <article><span><Cloud size={16} aria-hidden="true" /> Instances</span><strong>{metrics.instances}</strong><small>Across 3 availability zones</small></article>
        <article><span><ShieldCheck size={16} aria-hidden="true" /> Availability</span><strong>{metrics.availability}</strong><small>Sample service level</small></article>
        <article><span><Activity size={16} aria-hidden="true" /> Requests</span><strong>{metrics.requests}</strong><small>Illustrative monthly volume</small></article>
      </div>
      <div className={styles.regionRow}><span><Database size={17} aria-hidden="true" /> Active region</span><strong>{region}</strong></div>
      <button className={styles.actionButton} type="button" aria-pressed={isFailoverActive} onClick={() => setIsFailoverActive((active) => !active)}>
        {isFailoverActive ? "Restore primary region" : "Simulate regional failover"}
      </button>
    </div>
  );
}

const analyticsPeriods = {
  "7 days": { total: "1,284", change: "+8.4%", values: [42, 58, 49, 72, 63, 86, 74, 93, 68, 81, 76, 100], labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] },
  "30 days": { total: "5,612", change: "+12.1%", values: [38, 46, 42, 63, 54, 71, 60, 82, 75, 88, 79, 100], labels: ["Sep 19", "Sep 23", "Sep 27", "Oct 1", "Oct 5", "Oct 9", "Oct 18"] },
  "90 days": { total: "16,408", change: "+6.7%", values: [32, 41, 37, 55, 49, 67, 58, 74, 69, 85, 77, 100], labels: ["Jul 21", "Aug 5", "Aug 20", "Sep 4", "Sep 19", "Oct 4", "Oct 18"] },
} as const;

function AnalyticsPreview() {
  const [period, setPeriod] = useState<keyof typeof analyticsPeriods>("30 days");
  const data = analyticsPeriods[period];

  return (
    <div className={styles.analyticsPreview}>
      <div className={styles.analyticsHeader}><div><span>PERFORMANCE / SAMPLE DATA</span><h2>Engagement overview</h2></div><span className={styles.sampleChip}>DEMO</span></div>
      <div className={styles.analyticsControls} role="group" aria-label="Select sample analytics period">
        {(Object.keys(analyticsPeriods) as (keyof typeof analyticsPeriods)[]).map((item) => <button key={item} type="button" className={period === item ? styles.segmentActive : styles.segment} aria-pressed={period === item} onClick={() => setPeriod(item)}>{item}</button>)}
      </div>
      <div className={styles.analyticsSummary}><div><span>Sessions</span><strong>{data.total}</strong></div><span className={styles.analyticsChange}>{data.change} <ArrowRight size={14} aria-hidden="true" /></span><div><span>Conversion rate</span><strong>4.8%</strong></div></div>
      <div className={styles.chart} role="img" aria-label={`Illustrative sessions trend for ${period}`}>
        {data.values.map((value, index) => <span className={styles.chartColumn} key={`${period}-${index}`}><i style={{ height: `${value}%` }} /></span>)}
      </div>
      <div className={styles.chartLabels}>{data.labels.map((label) => <span key={label}>{label}</span>)}</div>
      <p className={styles.chartNote}>Illustrative sample data. No live analytics are connected.</p>
    </div>
  );
}

function DemoInteraction({ demoId }: ServiceDemoProps) {
  if (demoId === "website") return <WebsitePreview />;
  if (demoId === "software") return <SoftwarePreview />;
  if (demoId === "consulting") return <ConsultingPreview />;
  if (demoId === "cloud") return <CloudPreview />;
  return <AnalyticsPreview />;
}

export function ServiceDemoPreview({ demoId }: ServiceDemoProps) {
  return <DemoInteraction demoId={demoId} />;
}

export default function ServiceDemo({ demoId }: ServiceDemoProps) {
  const demo = serviceDemos[demoId];

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <nav className={styles.demoNav} aria-label="Demo navigation">
          <Link href="/services"><ArrowLeft size={16} aria-hidden="true" /> Back to Services</Link>
          <span>Grace Technologies <i aria-hidden="true">/</i> Sample project</span>
        </nav>
        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>{demo.service} / Demo</span>
            <h1>{demo.title}</h1>
            <p>{demo.overview}</p>
          </div>
          <div className={styles.sampleNotice}>
            <span className={styles.sampleMark}><Workflow size={18} aria-hidden="true" /></span>
            <div><strong>Sample project demo</strong><p>Fictional content and illustrative data only. Not a live client system.</p></div>
          </div>
        </header>
        <section className={styles.demoCanvas} aria-label={`${demo.service} interactive demonstration`}>
          <div className={styles.canvasHeading}><div><span>INTERACTIVE PREVIEW</span><strong>{demo.service}</strong></div><span className={styles.canvasStatus}><i /> Sample</span></div>
          <DemoInteraction demoId={demoId} />
        </section>
        <section className={styles.contactCta}>
          <div><span>Have a project in mind?</span><h2>Let&apos;s make the next step practical.</h2></div>
          <Link href="/contact">Discuss your project <ArrowRight size={16} aria-hidden="true" /></Link>
        </section>
      </div>
    </main>
  );
}