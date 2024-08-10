import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PlausibleProvider from "next-plausible";

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
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
