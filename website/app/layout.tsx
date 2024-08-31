import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Starknet Scaffold",
  description:
    "An open-source, up-to-date toolkit for building decentralized applications (dapps) on Starknet. Move from prototyping to production-grade apps seamlessly.",
  openGraph: {
    title: "Starknet Scaffold",
    description:
      "An open-source, up-to-date toolkit for building decentralized applications (dapps) on Starknet.",
    url: "https://www.starknetscaffold.xyz/",
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-theme="" lang="en">
      <body className="font-Coolvetica">{children}</body>
    </html>
  );
}
