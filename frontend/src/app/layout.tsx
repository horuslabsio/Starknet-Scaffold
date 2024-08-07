import type { Metadata } from "next";
import "./globals.css";
import { StarknetProvider } from "~/StarknetProvider";
import { Toaster } from "react-hot-toast";
import Footer from "./components/ui_components/Footer";

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
