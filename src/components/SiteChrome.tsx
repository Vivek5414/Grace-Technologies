"use client";

import type { ReactNode } from "react";
import { Suspense } from "react";
import { usePathname } from "next/navigation";
import EnquiryModal from "@/components/enquiry/EnquiryModal";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

type SiteChromeProps = {
  children: ReactNode;
};

export default function SiteChrome({ children }: SiteChromeProps) {
  return (
    <Suspense fallback={children}>
      <SiteChromeContent>{children}</SiteChromeContent>
    </Suspense>
  );
}

function SiteChromeContent({ children }: SiteChromeProps) {
  const pathname = usePathname();
  const isPrivateRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/operations");

  if (isPrivateRoute) return children;

  return (
    <div className="public-site">
      <SiteHeader />
      {children}
      <SiteFooter />
      <EnquiryModal />
    </div>
  );
}
