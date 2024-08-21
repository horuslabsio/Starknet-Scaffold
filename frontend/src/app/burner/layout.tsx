import { Metadata } from "next";
import Header from "../components/ui_components/header/Header";

export const metadata: Metadata = {
  title: "Starknet Scaffold",
  description: "Created with love",
};

export default function BurnerRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-[--100svh]">
      <Header />
      {children}
    </main>
  );
}
