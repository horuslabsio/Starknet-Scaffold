import Image from "next/image";
import Header from "@/app/components/ui_components/Header";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-24 md:p-24">
      <Header />
      <Image
        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
        src="/starknetlogo.png"
        alt="Starknet Scaffold"
        width={180}
        height={40}
        priority
      />

      {/* HERO --> */}
      <section className="pt-[clamp(200px,25vh,650px)]">
        <div className="mx-auto flex max-w-[850px] flex-col gap-8 p-8 text-center">
          <h1 className="text-3xl text-accent-secondary">
            Everything you need to buidl dApps on Ethereum
          </h1>
          <p className="text-md">
            A modern clean version of Starknet-Scaffold with NextJS, Rainbowkit,
            Wagmi and Typescript. Supports Hardhat and Foundry
          </p>
          <div className="flex items-center justify-center gap-x-5">
            <NetworkSwitcher />
            <AddTokenBtn />
          </div>
        </div>
      </section>
      {/* <-- END */}

      <section className="container mx-auto grid w-[80%] grid-cols-3 gap-8">
        <div className="relative col-span-2 h-full w-full rounded-[16px] bg-accent-tertiary bg-burner-wallet-bg bg-cover bg-center bg-no-repeat transition-all duration-500 hover:bg-burner-wallet-bg-dark">
          {/* before:absolute before:h-full before:w-full before:rounded-[16px] before:bg-button-secondary */}
          <Link
            href="/burner"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <div className="absolute w-1/2 p-8">
              <h2 className="mb-2 flex items-center gap-1 text-l text-accent-secondary">
                <span>Scaffold Burner Wallet</span>
                <span className="transition-all duration-500 group-hover:-translate-y-1">
                  <Upright />
                </span>
              </h2>
              <p className="">
                Generate temporary wallets which can be used during the course
                of development
              </p>
            </div>
            <Image className="w-full" src={burnerWallet} alt="" />
          </Link>
        </div>

        <div className="relative h-full w-full rounded-[16px] bg-accent-tertiary">
          <Link
            href="https://starknet-faucet.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-full w-full flex-col justify-between rounded-[16px] transition-all duration-500 hover:bg-button-secondary"
          >
            <div className="absolute px-8 pt-8">
              <h2 className="mb-2 flex items-center gap-2 text-l text-accent-secondary">
                <span>Scaffold Faucet</span>
                <span className="transition-all duration-500 group-hover:-translate-y-1">
                  <Upright />
                </span>
              </h2>
              <p className="">
                A SepETH/SepSTRK faucet for claiming ETH/STRK Sepolia testnet
                tokens
              </p>
            </div>
            <div className="mr-auto mt-auto w-[90%]">
              <Image src={faucet} alt="faucet banner" className="w-full" />
            </div>
          </Link>
        </div>

        <a
          href="/burner"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Scaffold Burner Wallet{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Generate temporary wallets, which can be used during the course of
            development <br />
            <br />
          </p>
        </a>

        <a
          href="/wikipedia"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Scaffold Wikipedia{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            A collection of Starknet/Cairo learning resources in the ecosystem{" "}
          </p>
        </a>

        <a
          href="https://www.stark-utils.xyz/converter"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Stark Converter{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            A collection of utility functions for Starknet related conversions{" "}
          </p>
        </a>

        <a
          href="/address-book"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Address Book{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            A collection of all relevant contract addresses on Starknet{" "}
          </p>
        </a>
      </div>
    </main>
  );
}
