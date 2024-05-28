import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StarknetProvider } from "~/StarknetProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Starknet Scaffold",
  description: "Created with love",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} dark:bg-black bg-gray-300 dark:text-white transition-all duration-500 ease-in-out`}
      >
        <StarknetProvider>{children}</StarknetProvider>
        <Toaster />
      </body>
    </html>
  );
}
