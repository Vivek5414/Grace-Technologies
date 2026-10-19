import type { Contact, Enquiry, EnquiryFollowUpNote, EnquiryStatus, EnquiryStatusHistory, Project, ProjectStatus, Service, ServiceStatus } from "./admin";

type Table<Row, Insert, Update> = {
  Row: Row;
  Insert: Insert;
  Update: Update;
  Relationships: [];
};

export type Database = {
  public: {
    Tables: {
      contacts: Table<
        Contact,
        Omit<Contact, "id" | "email_normalized" | "created_at" | "updated_at"> & { id?: string; created_at?: string; updated_at?: string },
        Partial<Omit<Contact, "id" | "email_normalized" | "created_at" | "updated_at">>
      >;
      enquiries: Table<
        Enquiry,
        Omit<Enquiry, "id" | "created_at" | "status" | "source" | "contact_id" | "follow_up_at"> & {
          id?: string;
          created_at?: string;
          status?: EnquiryStatus;
          source?: string;
          contact_id?: string | null;
          follow_up_at?: string | null;
        },
        Partial<Omit<Enquiry, "id" | "created_at" | "source" | "contact_id">>
      >;
      enquiry_follow_up_notes: Table<
        EnquiryFollowUpNote,
        Omit<EnquiryFollowUpNote, "id" | "created_at" | "admin_id"> & { id?: string; created_at?: string; admin_id?: string | null },
        never
      >;
      enquiry_status_history: Table<
        EnquiryStatusHistory,
        never,
        never
      >;
      projects: Table<
        Project,
        Omit<Project, "id" | "created_at"> & { id?: string; created_at?: string },
        Partial<Omit<Project, "id" | "created_at">>
      >;
      services: Table<
        Service,
        Omit<Service, "id" | "created_at"> & { id?: string; created_at?: string },
        Partial<Omit<Service, "id" | "created_at">>
      >;
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      enquiry_status: EnquiryStatus;
      project_status: ProjectStatus;
      service_status: ServiceStatus;
    };
    CompositeTypes: Record<string, never>;
  };
};
