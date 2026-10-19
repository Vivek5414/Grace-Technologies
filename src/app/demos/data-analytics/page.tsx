import type { Metadata } from "next";
import ServiceDemo from "@/components/demos/ServiceDemo";

export const metadata: Metadata = {
  title: "Data Analytics Demo",
  description: "An interactive analytics dashboard demo using illustrative sample data.",
  robots: { index: false, follow: false },
};

export default function DataAnalyticsDemoPage() {
  return <ServiceDemo demoId="analytics" />;
}