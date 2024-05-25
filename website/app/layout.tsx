import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Scaffold Starknet dApps",
  description: "Everything you need to buidl dApps on Starknet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-theme="" lang="en">
      <body className="font-Coolvetica">{children}</body>
    </html>
  );
}
