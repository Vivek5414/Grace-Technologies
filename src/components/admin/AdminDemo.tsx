"use client";

import { useMemo, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  Clock3,
  Download,
  LayoutDashboard,
  LogIn,
  Menu,
  MessageCircle,
  MessageSquareText,
  Monitor,
  Search,
  Settings,
  Smartphone,
  Tablet,
  UsersRound,
  X,
} from "lucide-react";
import {
  demoWhatsAppClicksByPeriod,
} from "@/lib/admin-demo-data";
import { downloadCsv, enquiryStatusLabels, filterContacts, filterEnquiries } from "@/lib/admin/customer-actions";
import { useDemoCrm } from "./DemoCrmProvider";
import DemoContactDetails from "./DemoContactDetails";
import DemoEnquiryDetails from "./DemoEnquiryDetails";
import type { EnquiryStatus } from "@/types/admin";
import styles from "./AdminDemo.module.css";

const demoNavigation = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "contacts", label: "Contacts", icon: UsersRound },
  { id: "enquiries", label: "Enquiries", icon: MessageSquareText },
  { id: "whatsapp", label: "WhatsApp", icon: MessageCircle },
  { id: "admin", label: "Admin", icon: Settings },
] as const;

export type DemoSection = (typeof demoNavigation)[number]["id"];
type StatusFilter = "all" | EnquiryStatus;
type ClickPeriod = keyof typeof demoWhatsAppClicksByPeriod;
type DeviceFilter = "all" | "mobile" | "desktop" | "tablet";

const statusOptions: StatusFilter[] = ["all", "new", "in_progress", "resolved", "spam"];
const demoReferenceTime = new Date("2026-10-18T23:59:59.999Z").getTime();

const periodLabels: Record<ClickPeriod, string> = {
  "7d": "Last 7 days",
  "30d": "Last 30 days",
  "90d": "Last 90 days",
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(value));
}

export default function AdminDemo({ initialSection = "dashboard" }: { initialSection?: DemoSection }) {
  const { contacts, enquiries, updateEnquiryStatus } = useDemoCrm();
  const [section, setSection] = useState<DemoSection>(initialSection);
  const [enquiryQuery, setEnquiryQuery] = useState("");
  const [contactQuery, setContactQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [contactDateFilter, setContactDateFilter] = useState<"all" | "30" | "90" | "365">("all");
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const [selectedEnquiryId, setSelectedEnquiryId] = useState<string | null>(null);
  const [clickPeriod, setClickPeriod] = useState<ClickPeriod>("7d");
  const [deviceFilter, setDeviceFilter] = useState<DeviceFilter>("all");
  const [pageQuery, setPageQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const filteredContacts = useMemo(() => {
    return filterContacts(contacts, {
      query: contactQuery,
      source: sourceFilter,
      dateFilter: contactDateFilter,
      referenceTime: demoReferenceTime,
    });
  }, [contactDateFilter, contactQuery, contacts, sourceFilter]);

  const filteredEnquiries = useMemo(() => {
    return filterEnquiries(enquiries, { query: enquiryQuery, status: statusFilter });
  }, [enquiries, enquiryQuery, statusFilter]);

  const clickPages = demoWhatsAppClicksByPeriod[clickPeriod].map((page) => ({
    ...page,
    total: page.mobile + page.desktop + page.tablet,
    selectedClicks: deviceFilter === "all" ? page.mobile + page.desktop + page.tablet : page[deviceFilter],
  }));
  const searchedClickPages = clickPages.filter((page) => page.path.toLocaleLowerCase().includes(pageQuery.trim().toLocaleLowerCase()));
  const sumDeviceClicks = (device: Exclude<DeviceFilter, "all">) => searchedClickPages.reduce((total, page) => total + page[device], 0);
  const totalClicks = searchedClickPages.reduce((total, page) => total + page.selectedClicks, 0);
  const mobileClicks = deviceFilter === "all" || deviceFilter === "mobile" ? sumDeviceClicks("mobile") : null;
  const desktopClicks = deviceFilter === "all" || deviceFilter === "desktop" ? sumDeviceClicks("desktop") : null;
  const tabletClicks = deviceFilter === "all" || deviceFilter === "tablet" ? sumDeviceClicks("tablet") : null;
  const pendingCount = enquiries.filter(({ status }) => status === "new").length;

  function exportContacts() {
    downloadCsv("grace-technologies-demo-contacts.csv", ["Name", "Phone", "Email", "Company", "Source", "Date added"], filteredContacts.map((contact) => [
      contact.full_name, contact.phone, contact.email, contact.company, contact.source, contact.created_at,
    ]));
  }

  function exportEnquiries() {
    downloadCsv("grace-technologies-demo-enquiries.csv", ["Name", "Phone", "Email", "Service", "Source", "Status", "Date", "Message"], filteredEnquiries.map((enquiry) => [
      enquiry.full_name, enquiry.phone, enquiry.email, enquiry.service, enquiry.source, enquiryStatusLabels[enquiry.status], enquiry.created_at, enquiry.message,
    ]));
  }

  return (
    <div className={styles.demoShell}>
      {menuOpen && <button className={styles.backdrop} type="button" aria-label="Close demo navigation" onClick={() => setMenuOpen(false)} />}
      <aside className={`${styles.sidebar} ${menuOpen ? styles.sidebarOpen : ""}`}>
        <Link className={styles.brand} href="/admin/login" aria-label="Return to Admin Portal">
          <Image src="/images/grace-technologies-logo.png" alt="Grace Technologies" width={480} height={552} priority sizes="180px" />
          <span>ADMIN PANEL · DEMO</span>
        </Link>
        <nav className={styles.navigation} aria-label="Demo navigation">
          <span className={styles.navCaption}>SAMPLE WORKSPACE</span>
          {demoNavigation.map(({ id, label, icon: Icon }) => (
            <a className={`${styles.navItem} ${section === id ? styles.navItemActive : ""}`} href={id === "dashboard" ? "/admin/demo" : `/admin/demo?section=${id}`} key={id} aria-current={section === id ? "page" : undefined}>
              <Icon size={18} aria-hidden="true" /><span>{label}</span>
            </a>
          ))}
        </nav>
        <div className={styles.sidebarDemo}><span>DEMO MODE</span><p>Fictional sample data. Changes stay in this browser session.</p></div>
      </aside>

      <div className={styles.mainColumn}>
        <header className={styles.topbar}>
          <button className={styles.menuButton} type="button" aria-label={menuOpen ? "Close demo navigation" : "Open demo navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
          </button>
          <div className={styles.breadcrumb}><span>Admin Panel</span><span aria-hidden="true">/</span><strong>{demoNavigation.find((item) => item.id === section)?.label}</strong></div>
          <span className={styles.demoPill}><i aria-hidden="true" /> Sample data</span>
          <Link className={styles.loginLink} href="/admin/login"><LogIn size={15} aria-hidden="true" /> Admin login</Link>
        </header>

        <main className={styles.content}>
          <div className={styles.demoNotice} role="note"><strong>Admin preview.</strong> These fictional records are for exploring the interface only. Nothing is read from or saved to Supabase.</div>

          {section === "dashboard" && (
            <section aria-labelledby="dashboard-title">
              <PageHeading eyebrow="WORKSPACE OVERVIEW" title="Dashboard overview" description="A sample snapshot of contacts, enquiries, and WhatsApp activity." />
              <div className={styles.statsGrid}>
                <Stat label="Total contacts" value={contacts.length} icon={<UsersRound size={18} aria-hidden="true" />} />
                <Stat label="Total enquiries" value={enquiries.length} icon={<MessageSquareText size={18} aria-hidden="true" />} />
                <Stat label="Pending enquiries" value={pendingCount} icon={<Clock3 size={18} aria-hidden="true" />} />
                <Stat label="WhatsApp clicks · 7 days" value={totalClicks} icon={<Activity size={18} aria-hidden="true" />} />
              </div>
              <section className={styles.panel} aria-labelledby="recent-title">
                <PanelHeading id="recent-title" title="Recent enquiries" description="Latest sample requests" trailing={`${enquiries.length} sample records`} />
                <div className={styles.recentList}>
                  {enquiries.slice(0, 5).map((enquiry) => <div className={styles.recentRow} key={enquiry.id}>
                    <span className={styles.recentIdentity}><strong>{enquiry.full_name}</strong><small>{enquiry.service}</small></span>
                    <StatusBadge status={enquiry.status} />
                    <time>{formatDate(enquiry.created_at)}</time>
                  </div>)}
                </div>
              </section>
            </section>
          )}

          {section === "contacts" && (
            <section aria-label="Contacts workspace">
              {selectedContactId ? (
                <DemoContactDetails
                  id={selectedContactId}
                  onBack={() => setSelectedContactId(null)}
                  onShowEnquiry={(id) => {
                    setSelectedContactId(null);
                    setSelectedEnquiryId(id);
                    setSection("enquiries");
                  }}
                />
              ) : (
                <>
              <PageHeading eyebrow="RELATIONSHIPS · DEMO" title="Contacts" description="Search, filter, export, and manage fictional sample customer records." />
              <div className={styles.crmStats} aria-label="Sample contact summary">
                <Stat label="Total contacts" value={contacts.length} icon={<UsersRound size={18} aria-hidden="true" />} />
                <Stat label="New contacts" value={contacts.filter(({ is_new_contact }) => is_new_contact).length} caption="Added within 7 days" icon={<Clock3 size={18} aria-hidden="true" />} />
                <Stat label="Recently contacted" value={contacts.filter(({ was_recently_contacted }) => was_recently_contacted).length} caption="Sample notes within 30 days" icon={<MessageSquareText size={18} aria-hidden="true" />} />
              </div>
              <div className={styles.toolbar}>
                <label className={styles.search}><Search size={16} aria-hidden="true" /><span className={styles.srOnly}>Search sample contacts by name, phone, email, or company</span><input value={contactQuery} onChange={(event) => setContactQuery(event.currentTarget.value)} placeholder="Search contacts" /></label>
                <label><span className={styles.srOnly}>Filter sample contacts by source</span><select className={styles.select} value={sourceFilter} onChange={(event) => setSourceFilter(event.currentTarget.value)}><option value="all">All sources</option>{[...new Set(contacts.map(({ source }) => source))].sort().map((source) => <option key={source} value={source}>{source}</option>)}</select></label>
                <label><span className={styles.srOnly}>Filter sample contacts by date</span><select className={styles.select} value={contactDateFilter} onChange={(event) => setContactDateFilter(event.currentTarget.value as typeof contactDateFilter)}><option value="all">Any date</option><option value="30">Last 30 days</option><option value="90">Last 90 days</option><option value="365">Last 12 months</option></select></label>
                <button className={styles.exportButton} type="button" onClick={exportContacts} disabled={!filteredContacts.length}><Download size={15} aria-hidden="true" /> Export CSV</button>
                <span className={styles.resultCount}>{filteredContacts.length} sample contacts</span>
              </div>
              {filteredContacts.length === 0 ? <EmptyState title={contacts.length ? "No contacts match" : "No sample contacts"} detail="Try another search term." /> : (
                <section className={styles.panel} aria-labelledby="contacts-title">
                  <div className={styles.tableScroll}><table className={styles.table}><thead><tr><th>Name</th><th>Phone</th><th>Email</th><th>Company</th><th>Source</th><th>Date added</th><th>Enquiries</th><th>Actions</th></tr></thead><tbody>
                    {filteredContacts.map((contact) => <tr key={contact.id}>
                      <td><button className={styles.primaryButton} type="button" onClick={() => setSelectedContactId(contact.id)}>{contact.full_name}</button></td>
                      <td>Not provided in demo</td><td>{contact.email}</td><td>{contact.company || "Not provided"}</td>
                      <td>{contact.source}</td><td>{formatDate(contact.created_at)}</td><td>{contact.enquiry_count}</td>
                      <td><button className={styles.tableAction} type="button" onClick={() => setSelectedContactId(contact.id)}>View / edit</button></td>
                    </tr>)}
                  </tbody></table></div>
                </section>
              )}
                </>
              )}
            </section>
          )}

          {section === "enquiries" && (
            <section aria-label="Enquiries workspace">
              {selectedEnquiryId ? (
                <DemoEnquiryDetails
                  id={selectedEnquiryId}
                  onBack={() => setSelectedEnquiryId(null)}
                  onShowContact={(id) => {
                    setSelectedEnquiryId(null);
                    setSelectedContactId(id);
                    setSection("contacts");
                  }}
                />
              ) : (
                <>
              <PageHeading eyebrow="INBOX · DEMO" title="Enquiries" description="Search, filter, export, and update fictional sample enquiries." />
              <div className={styles.crmStats} aria-label="Sample enquiry summary">
                <Stat label="Pending" value={enquiries.filter(({ status }) => status === "new").length} icon={<Clock3 size={18} aria-hidden="true" />} />
                <Stat label="Contacted" value={enquiries.filter(({ status }) => status === "in_progress").length} icon={<MessageCircle size={18} aria-hidden="true" />} />
                <Stat label="Completed" value={enquiries.filter(({ status }) => status === "resolved").length} icon={<Activity size={18} aria-hidden="true" />} />
                <Stat label="Archived" value={enquiries.filter(({ status }) => status === "spam").length} icon={<X size={18} aria-hidden="true" />} />
              </div>
              <div className={styles.toolbar}>
                <label className={styles.search}><Search size={16} aria-hidden="true" /><span className={styles.srOnly}>Search sample enquiries by name, phone, email, service, or message</span><input value={enquiryQuery} onChange={(event) => setEnquiryQuery(event.currentTarget.value)} placeholder="Search enquiries" /></label>
                <label><span className={styles.srOnly}>Filter enquiries by status</span><select className={styles.select} value={statusFilter} onChange={(event) => setStatusFilter(event.currentTarget.value as StatusFilter)}>{statusOptions.map((status) => <option key={status} value={status}>{status === "all" ? "All statuses" : enquiryStatusLabels[status]}</option>)}</select></label>
                <button className={styles.exportButton} type="button" onClick={exportEnquiries} disabled={!filteredEnquiries.length}><Download size={15} aria-hidden="true" /> Export CSV</button>
                <span className={styles.resultCount}>{filteredEnquiries.length} sample enquiries</span>
              </div>
              {filteredEnquiries.length === 0 ? <EmptyState title={enquiries.length ? "No enquiries match" : "No sample enquiries"} detail="Try another search or status filter." /> : (
                <section className={styles.panel} aria-labelledby="enquiries-title">
                  <div className={styles.tableScroll}><table className={styles.table}><thead><tr><th>Customer</th><th>Email</th><th>Service</th><th>Source</th><th>Submitted</th><th>Status</th><th>Actions</th></tr></thead><tbody>
                    {filteredEnquiries.map((enquiry) => <tr key={enquiry.id}>
                      <td><button className={styles.primaryButton} type="button" onClick={() => setSelectedEnquiryId(enquiry.id)}>{enquiry.full_name}</button></td>
                      <td>{enquiry.email ?? "Not provided"}<span className={styles.secondaryText}>Phone not provided in demo</span></td><td>{enquiry.service}</td><td>{enquiry.source}</td><td>{formatDate(enquiry.created_at)}</td>
                      <td><select className={styles.select} aria-label={`Change status for ${enquiry.full_name}`} value={enquiry.status} onChange={(event) => updateEnquiryStatus(enquiry.id, event.currentTarget.value as EnquiryStatus)}>{statusOptions.filter((status) => status !== "all").map((status) => <option key={status} value={status}>{enquiryStatusLabels[status]}</option>)}</select></td>
                      <td><button className={styles.tableAction} type="button" onClick={() => setSelectedEnquiryId(enquiry.id)}>View details</button></td>
                    </tr>)}
                  </tbody></table></div>
                </section>
              )}
                </>
              )}
            </section>
          )}

          {section === "whatsapp" && (
            <section aria-labelledby="whatsapp-title">
              <PageHeading eyebrow="CHANNEL PERFORMANCE" title="WhatsApp Click Analytics" description="Sample click activity with time-period, device, and page filters." />
              <div className={styles.toolbar}>
                <label><span className={styles.srOnly}>Filter click period</span><select className={styles.select} value={clickPeriod} onChange={(event) => setClickPeriod(event.currentTarget.value as ClickPeriod)}>{Object.entries(periodLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
                <label><span className={styles.srOnly}>Filter click device</span><select className={styles.select} value={deviceFilter} onChange={(event) => setDeviceFilter(event.currentTarget.value as DeviceFilter)}><option value="all">All devices</option><option value="mobile">Mobile</option><option value="desktop">Desktop</option><option value="tablet">Tablet</option></select></label>
                <label className={styles.search}><Search size={16} aria-hidden="true" /><span className={styles.srOnly}>Search page paths</span><input value={pageQuery} onChange={(event) => setPageQuery(event.currentTarget.value)} placeholder="Search page paths" /></label>
              </div>
              <div className={styles.statsGrid}>
                <Stat label="Total clicks" value={totalClicks} caption={`${periodLabels[clickPeriod]} · ${deviceFilter === "all" ? "all devices" : deviceFilter}`} icon={<Activity size={18} aria-hidden="true" />} />
                <Stat label="Mobile clicks" value={mobileClicks ?? "—"} caption={mobileClicks === null ? "Not in selected device view" : periodLabels[clickPeriod]} icon={<Smartphone size={18} aria-hidden="true" />} />
                <Stat label="Desktop clicks" value={desktopClicks ?? "—"} caption={desktopClicks === null ? "Not in selected device view" : periodLabels[clickPeriod]} icon={<Monitor size={18} aria-hidden="true" />} />
                <Stat label="Tablet clicks" value={tabletClicks ?? "—"} caption={tabletClicks === null ? "Not in selected device view" : periodLabels[clickPeriod]} icon={<Tablet size={18} aria-hidden="true" />} />
              </div>
              <section className={styles.panel} aria-labelledby="top-pages-title">
                <PanelHeading id="top-pages-title" title="Top pages" description="Sample pages ranked by click volume" trailing={periodLabels[clickPeriod]} />
                {searchedClickPages.length === 0 ? <EmptyState title="No matching sample pages" detail="Try a different page path." /> : <div className={styles.topPages}>{searchedClickPages.map((page) => <div className={styles.topPageRow} key={page.path}><span>{page.path}</span><span className={styles.bar}><i style={{ width: `${Math.max(8, page.selectedClicks / Math.max(...clickPages.map((entry) => entry.selectedClicks), 1) * 100)}%` }} /></span><strong>{page.selectedClicks}</strong></div>)}</div>}
              </section>
            </section>
          )}

          {section === "admin" && <section aria-labelledby="admin-title"><PageHeading eyebrow="ACCOUNT" title="Admin" description="Preview of the administrator workspace. This demo does not sign you in or change account settings." /><div className={styles.accountCard}><span className={styles.avatar}>GT</span><div><strong>Sample administrator</strong><p>Demo access · no Supabase session</p></div><Link href="/admin/login">Go to secure login <LogIn size={15} aria-hidden="true" /></Link></div></section>}

          <footer className={styles.footer}><span>Grace Technologies <i>·</i> Admin preview</span><span>Fictional sample data only</span></footer>
        </main>
      </div>
    </div>
  );
}

function PageHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <header className={styles.pageHeading}><span>{eyebrow}</span><h1>{title}</h1><p>{description}</p></header>;
}

function PanelHeading({ id, title, description, trailing }: { id: string; title: string; description: string; trailing: string }) {
  return <div className={styles.panelHeading}><div><h2 id={id}>{title}</h2><p>{description}</p></div><span>{trailing}</span></div>;
}

function Stat({ label, value, caption = "Sample metric", icon }: { label: string; value: number | string; caption?: string; icon: ReactNode }) {
  const formattedValue = typeof value === "number" ? value.toLocaleString("en-US") : value;
  return <article className={styles.statCard}><span className={styles.statIcon}>{icon}</span><small>{label}</small><strong>{formattedValue}</strong><span className={styles.statCaption}>{caption}</span></article>;
}

function StatusBadge({ status }: { status: EnquiryStatus }) {
  const className = status === "new" ? styles.statusNew : status === "in_progress" ? styles.statusInProgress : status === "resolved" ? styles.statusCompleted : styles.statusArchived;
  return <span className={`${styles.statusBadge} ${className}`}><i aria-hidden="true" />{enquiryStatusLabels[status]}</span>;
}

function EmptyState({ title, detail }: { title: string; detail: string }) {
  return <div className={styles.emptyState}><Search size={22} aria-hidden="true" /><h2>{title}</h2><p>{detail}</p></div>;
}
