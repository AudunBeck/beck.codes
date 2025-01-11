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
        className={`${inter.className} min-h-screen bg-background text-text dark:bg-background-dark dark:text-text-dark`}
      >
        <Header />
        {children}
        <div className="mt-20" />
      </body>
    </html>
  );
}
