import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
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
        <Script
          strategy="beforeInteractive"
          defer
          data-domain={process.env.PLAUSIBLE_SITE_DOMAIN}
          data-api={`${process.env.PLAUSIBLE_ANALYTICS_DOMAIN}/${process.env.PLAUSIBLE_ANALYTICS_SUBDIRECTORY}/event`}
          src={`${process.env.PLAUSIBLE_ANALYTICS_DOMAIN}/${process.env.PLAUSIBLE_ANALYTICS_SUBDIRECTORY}/script.js`}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
