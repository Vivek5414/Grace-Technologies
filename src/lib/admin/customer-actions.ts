import type { Contact, Enquiry, EnquiryStatus } from "@/types/admin";

export type ContactRecord = Contact & {
  enquiry_count: number;
  latest_contacted_at: string | null;
  is_new_contact: boolean;
  was_recently_contacted: boolean;
};

export type ContactFilters = {
  query: string;
  source: string;
  dateFilter: "all" | "30" | "90" | "365";
  referenceTime: number;
};

export type EnquiryFilters = {
  query: string;
  status: "all" | EnquiryStatus;
};

export const enquiryStatusLabels: Record<EnquiryStatus, string> = {
  new: "Pending",
  in_progress: "Contacted",
  resolved: "Completed",
  spam: "Archived",
};

export function phoneHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function smsHref(phone: string): string {
  return `sms:${phone.replace(/[^\d+]/g, "")}`;
}

export function whatsappHref(phone: string | null): string | null {
  if (!phone) return null;
  const trimmed = phone.trim();
  let digits = trimmed.replace(/\D/g, "");
  if (trimmed.startsWith("+")) {
    // Keep an explicit international prefix supplied by the customer.
  } else if (digits.startsWith("00")) {
    digits = digits.slice(2);
  } else if (digits.length === 10) {
    digits = `91${digits}`;
  } else if (digits.length === 11 && digits.startsWith("0")) {
    digits = `91${digits.slice(1)}`;
  } else if (digits.length === 12 && digits.startsWith("91")) {
    // Already normalized for India.
  } else {
    return null;
  }

  return digits.length >= 10 && digits.length <= 15 ? `https://wa.me/${digits}` : null;
}

export function csvCell(value: string | number | null | undefined): string {
  let safeValue = String(value ?? "");
  if (/^[\s]*[=+\-@]/.test(safeValue)) safeValue = `'${safeValue}`;
  return `"${safeValue.replace(/"/g, '""')}"`;
}

export function downloadCsv(filename: string, headings: string[], rows: (string | number | null | undefined)[][]) {
  const csv = [headings, ...rows].map((row) => row.map(csvCell).join(",")).join("\r\n");
  const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1_000);
}

export function formatDate(value: string | null): string {
  if (!value) return "Not recorded";
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(new Date(value));
}

export function formatEnquiryStatus(status: EnquiryStatus): string {
  return enquiryStatusLabels[status];
}

export function filterContacts(contacts: ContactRecord[], filters: ContactFilters): ContactRecord[] {
  const normalized = filters.query.trim().toLocaleLowerCase();
  const cutoff = filters.dateFilter === "all"
    ? null
    : filters.referenceTime - Number(filters.dateFilter) * 24 * 60 * 60 * 1000;

  return contacts.filter((contact) => {
    const matchesQuery = !normalized || [
      contact.full_name,
      contact.email,
      contact.phone ?? "",
      contact.company ?? "",
    ].some((value) => value.toLocaleLowerCase().includes(normalized));
    const matchesSource = filters.source === "all" || contact.source === filters.source;
    const matchesDate = cutoff === null || new Date(contact.created_at).getTime() >= cutoff;
    return matchesQuery && matchesSource && matchesDate;
  });
}

export function filterEnquiries(enquiries: Enquiry[], filters: EnquiryFilters): Enquiry[] {
  const normalized = filters.query.trim().toLocaleLowerCase();
  return enquiries.filter((enquiry) => {
    const matchesStatus = filters.status === "all" || enquiry.status === filters.status;
    const matchesQuery = !normalized || [
      enquiry.full_name,
      enquiry.email ?? "",
      enquiry.phone ?? "",
      enquiry.service,
      enquiry.message,
    ].some((value) => value.toLocaleLowerCase().includes(normalized));
    return matchesStatus && matchesQuery;
  });
}
