import type { Metadata } from "next";
import "./globals.css";
import { StarknetProvider } from "~/StarknetProvider";
import Footer from "./components/internal/Footer";
import { Analytics } from "./components/internal/Analytics";

export const metadata: Metadata = {
  title: "Starknet Scaffold",
  description:
    "Build pixel-perfect dApps on Starknet with our modern, streamlined Starknet-Scaffold. Featuring NextJS, Starknetjs, Starknetkit, Starknet-React, and Typescript, it’s fully equipped for Scarb and Starknet Foundry contract development. Simplify your workflow and focus on innovation. Starknet scaffold is an open-source, up-to-date toolkit for building decentralized applications (dapps) on Starknet.",
  openGraph: {
    title: "Starknet Scaffold",
    description:
      "An open-source, up-to-date toolkit for building decentralized applications (dapps) on Starknet.",
    url: "https://app.starknetscaffold.xyz/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Starknet Scaffold",
    description:
      "An open-source, up-to-date toolkit for building decentralized applications (dapps) on Starknet.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-coolvetica text-sm text-text-primary md:text-md">
        <StarknetProvider>{children}</StarknetProvider>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
