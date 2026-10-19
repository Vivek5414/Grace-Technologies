import "server-only";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { AdminUser } from "@/types/admin";

export type AdminAccessResult =
  | { status: "unconfigured" }
  | { status: "unauthenticated" }
  | { status: "forbidden" }
  | { status: "authorized"; user: AdminUser };

export async function getAdminAccess(): Promise<AdminAccessResult> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { status: "unconfigured" };

  const { data, error } = await supabase.auth.getUser();
  const user = data.user;
  if (error || !user) return { status: "unauthenticated" };
  if (user.app_metadata.role !== "admin") return { status: "forbidden" };

  return {
    status: "authorized",
    user: { id: user.id, email: user.email ?? null, role: "admin" },
  };
}

export async function requireAdmin(): Promise<AdminUser> {
  const access = await getAdminAccess();
  if (access.status === "authorized") return access.user;
  if (access.status === "unconfigured") redirect("/admin/login?reason=setup");
  if (access.status === "forbidden") redirect("/admin/login?reason=not-admin");
  redirect("/admin/login?reason=sign-in");
}
