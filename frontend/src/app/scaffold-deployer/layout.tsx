import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Deployer | Starknet Scaffold",
  description:
    "The scaffold deployer is a simple tool for seamlessly declaring and deploying smart contracts to Starknet testnet and mainnet.",
};

export default function ScaffoldDeployerRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="min-h-[--100svh]">{children}</main>;
}
