import type { Metadata } from "next";
import { Geist } from "next/font/google";
import SiteChrome from "@/components/SiteChrome";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const publicSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  metadataBase: publicSiteUrl ? new URL(publicSiteUrl) : undefined,
  title: {
    default: "Grace Technologies | Technology for Business",
    template: "%s | Grace Technologies",
  },
  description:
    "Grace Technologies helps US and UK businesses build digital products, modernize operations, and solve technology challenges with practical expertise.",
  openGraph: {
    title: "Grace Technologies | Technology for Business",
    description:
      "Web development, custom software, IT consulting, cloud solutions, and digital transformation for US businesses.",
    type: "website",
    siteName: "Grace Technologies",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={geistSans.variable}>
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
