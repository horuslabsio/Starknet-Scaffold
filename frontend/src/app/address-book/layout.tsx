import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Starknet Scaffold",
  description: "Created with love",
};

export default function AddressBookRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-[--100svh] flex-col justify-between gap-16">
      {children}
    </main>
  );
}
