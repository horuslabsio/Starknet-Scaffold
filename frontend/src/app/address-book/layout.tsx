import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Address Book | Starknet Scaffold",
  description:
    "Access the Starknet Scaffold's integrated Address book.The address book contains a list of all relevant contract addresses within the starknet ecosystem.",
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
