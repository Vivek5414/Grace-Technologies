import type { Metadata } from "next";
import Dashboard from "@/components/dashboard/Dashboard";

export const metadata: Metadata = {
  title: "Business Operations Dashboard Demo",
  description:
    "Explore an illustrative Grace Technologies business operations dashboard demo. All displayed metrics and activity are sample data.",
  robots: { index: false, follow: true },
};

export default function OperationsPage() {
  return <Dashboard />;
}
