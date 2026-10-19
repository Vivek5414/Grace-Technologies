import { describe, expect, it } from "vitest";
import { csvCell, enquiryStatusLabels, filterContacts, filterEnquiries, phoneHref, smsHref, whatsappHref, type ContactRecord } from "./customer-actions";

describe("admin customer actions", () => {
  it("creates phone and SMS links from the selected customer's phone", () => {
    expect(phoneHref("+91 (98765) 43210")).toBe("tel:+919876543210");
    expect(smsHref("+91 (98765) 43210")).toBe("sms:+919876543210");
  });

  it("normalizes Indian phone numbers for WhatsApp without inventing a number", () => {
    expect(whatsappHref("98765 43210")).toBe("https://wa.me/919876543210");
    expect(whatsappHref("09876543210")).toBe("https://wa.me/919876543210");
    expect(whatsappHref("+91 98765 43210")).toBe("https://wa.me/919876543210");
    expect(whatsappHref("+447700900123")).toBe("https://wa.me/447700900123");
    expect(whatsappHref(null)).toBeNull();
    expect(whatsappHref("123")).toBeNull();
  });

  it("escapes CSV quoting and spreadsheet formula cells", () => {
    expect(csvCell('Acme, "North"')).toBe('"Acme, ""North"""');
    expect(csvCell("=HYPERLINK(\"https://example.invalid\")")).toBe('"\'=HYPERLINK(""https://example.invalid"")"');
    expect(csvCell(" normal")).toBe('" normal"');
  });

  it("maps the legacy database statuses to the customer workflow labels", () => {
    expect(enquiryStatusLabels).toEqual({
      new: "Pending",
      in_progress: "Contacted",
      resolved: "Completed",
      spam: "Archived",
    });
  });

  it("filters contacts by company or email, source, and selected date range", () => {
    const now = new Date("2026-10-18T00:00:00Z").getTime();
    const contacts: ContactRecord[] = [
      {
        id: "1", full_name: "Asha Rao", email: "asha@example.com", email_normalized: "asha@example.com",
        phone: "9876543210", company: "Northstar", source: "Website", created_at: "2026-10-01T00:00:00Z",
        updated_at: "2026-10-01T00:00:00Z", enquiry_count: 1, latest_contacted_at: null,
        is_new_contact: false, was_recently_contacted: false,
      },
      {
        id: "2", full_name: "Ben Fox", email: "ben@example.com", email_normalized: "ben@example.com",
        phone: null, company: "Contoso", source: "Referral", created_at: "2026-07-01T00:00:00Z",
        updated_at: "2026-07-01T00:00:00Z", enquiry_count: 1, latest_contacted_at: null,
        is_new_contact: false, was_recently_contacted: false,
      },
    ];

    expect(filterContacts(contacts, { query: "northstar", source: "all", dateFilter: "all", referenceTime: now }).map(({ id }) => id)).toEqual(["1"]);
    expect(filterContacts(contacts, { query: "", source: "Website", dateFilter: "all", referenceTime: now }).map(({ id }) => id)).toEqual(["1"]);
    expect(filterContacts(contacts, { query: "", source: "all", dateFilter: "90", referenceTime: now }).map(({ id }) => id)).toEqual(["1"]);
  });

  it("filters enquiries by requested service, message, and status", () => {
    const enquiries = [
      {
        id: "one", full_name: "Asha Rao", email: "asha@example.com", phone: "9876543210", service: "IT Consulting",
        message: "Please review our architecture.", status: "new" as const, created_at: "2026-10-01T00:00:00Z",
        source: "Website", contact_id: null, follow_up_at: null,
      },
      {
        id: "two", full_name: "Ben Fox", email: "ben@example.com", phone: null, service: "Cloud Solutions",
        message: "Help plan cloud migration.", status: "resolved" as const, created_at: "2026-10-02T00:00:00Z",
        source: "Website", contact_id: null, follow_up_at: null,
      },
    ];

    expect(filterEnquiries(enquiries, { query: "architecture", status: "all" }).map(({ id }) => id)).toEqual(["one"]);
    expect(filterEnquiries(enquiries, { query: "", status: "resolved" }).map(({ id }) => id)).toEqual(["two"]);
    expect(filterEnquiries(enquiries, { query: "CLOUD", status: "new" })).toEqual([]);
  });
});
