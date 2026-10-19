export type AdminRole = "admin";

export type AdminUser = {
  id: string;
  email: string | null;
  role: AdminRole;
};

export type EnquiryStatus = "new" | "in_progress" | "resolved" | "spam";

export type Enquiry = {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  company?: string | null;
  service: string;
  message: string;
  status: EnquiryStatus;
  created_at: string;
  source: string;
  contact_id: string | null;
  follow_up_at: string | null;
};

export type Contact = {
  id: string;
  full_name: string;
  email: string;
  email_normalized: string;
  phone: string | null;
  company: string | null;
  source: string;
  created_at: string;
  updated_at: string;
};

export type EnquiryFollowUpNote = {
  id: string;
  enquiry_id: string;
  contact_id: string | null;
  note: string;
  admin_id: string | null;
  created_at: string;
};

export type EnquiryStatusHistory = {
  id: string;
  enquiry_id: string;
  old_status: EnquiryStatus;
  new_status: EnquiryStatus;
  admin_id: string | null;
  changed_at: string;
};

export type ContactStatusHistory = EnquiryStatusHistory & {
  enquiry_service: string;
};

export type ProjectStatus = "draft" | "active" | "published" | "archived";

export type Project = {
  id: string;
  title: string;
  status: ProjectStatus;
  created_at: string;
};

export type ServiceStatus = "draft" | "published" | "archived";

export type Service = {
  id: string;
  title: string;
  status: ServiceStatus;
  created_at: string;
};

export type DashboardStatistics = {
  totalEnquiries: number;
  newEnquiries: number;
  activeProjects: number;
  publishedProjects: number;
};
