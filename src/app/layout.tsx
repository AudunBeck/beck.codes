import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Beck.Codes",
    template: "%s | Beck.Codes",
  },
  description: "My little corner on the internet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen text-text dark:text-text-dark bg-linear-to-br from-bg-start to-bg-end dark:from-bg-start-dark dark:to-bg-end-dark`}
      >
        <Header />
        {children}
        <div className="mt-20" />
      </body>
    </html>
  );
}
