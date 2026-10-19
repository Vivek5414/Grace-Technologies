import type { Metadata } from "next";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import { getSupabaseConfig } from "@/lib/supabase/config";
import { loginMessage } from "./messages";

export const metadata: Metadata = {
  title: "Admin Portal",
  description: "Sign in to the Grace Technologies website administration portal.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLoginPage() {
  const initialError = !getSupabaseConfig() ? loginMessage("setup") : null;
  return <AdminLoginForm initialError={initialError} />;
}
