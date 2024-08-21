import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Starknet Scaffold",
  description: "Created with love",
};

export default function WikipediaRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="min-h-[--100svh]">{children}</main>;
}
