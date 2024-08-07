import { Metadata } from "next";
import Header from "../components/header/Header";

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
    <main className="flex min-h-screen flex-col justify-between gap-16">
      <Header />
      {children}
    </main>
  );
}
