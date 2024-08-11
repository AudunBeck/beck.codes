import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import PlausibleProvider from "next-plausible";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Beck.Codes",
  description: "My little corner on the internet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <PlausibleProvider
          selfHosted
          domain={process.env.PLAUSIBLE_SITE_DOMAIN || ""}
          customDomain={process.env.PLAUSIBLE_ANALYTICS_DOMAIN}
        />
        <Script
          strategy="beforeInteractive"
          defer
          src={process.env.UMAMI_SOURCE}
          data-website-id={process.env.UMAMI_WEBSITE_ID}
        />
      </head>
      <body className={`${inter.className} min-h-screen`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
