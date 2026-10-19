import type { ReactNode } from "react";
import { Suspense } from "react";
import AdminWorkspace from "@/components/admin/AdminWorkspace";
import { requireAdmin } from "@/lib/auth/admin";

async function AuthenticatedAdminWorkspace({ children }: { children: ReactNode }) {
  const admin = await requireAdmin();

  return <AdminWorkspace adminEmail={admin.email ?? "Administrator"}>{children}</AdminWorkspace>;
}

export default function AdminWorkspaceLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<main aria-busy="true">Loading admin workspace…</main>}>
      <AuthenticatedAdminWorkspace>{children}</AuthenticatedAdminWorkspace>
    </Suspense>
  );
}