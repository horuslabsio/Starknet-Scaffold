import { Metadata } from "next";
import Header from "../components/internal/Header";

export const metadata: Metadata = {
  title: "Burner Wallet | Starknet Scaffold",
  description:
    "Access the Starknet Scaffold's burner wallet. The Burner wallet tool enables users to generate temporary wallets for use during the course of development.",
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
