import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StarknetProvider } from "~/StarknetProvider";
import { Toaster } from "react-hot-toast";
import Footer from "./components/ui_components/Footer";

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
    <html lang="en">
      <body className="font-coolvetica text-sm text-text-primary lg:text-md">
        <StarknetProvider>{children}</StarknetProvider>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
