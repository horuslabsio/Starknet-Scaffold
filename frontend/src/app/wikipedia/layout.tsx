import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wikipedia | Starknet Scaffold",
  description:
    "Access the Starknet Scaffold's integrated Wikipedia. A collection of Starknet and Cairo learning resources within the ecosystem",
};

export default function WikipediaRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="min-h-[--100svh]">{children}</main>;
}
