"use client";
import Image from "next/image";
import Header from "~/ui_components/Header";
import NetworkSwitcher from "~/ui_components/NetworkSwitcher";
import AddTokenBtn from "~/AddTokenBtn";
import faucet from "../../public/assets/faucetBanner.svg";
import deployer from "../../public/assets/deployerBanner.svg";
import wikipedia from "../../public/assets/wikipediaBanner.svg";
import addressBook from "../../public/assets/addressBook.svg";
import converter from "../../public/assets/converterBanner.svg";
import burnerWallet from "../../public/assets/burnerWalletBg.svg";
import Link from "next/link";
import Upright from "svg/Upright";

export default function Home() {
  return (
    <main className="flex min-h-svh flex-col justify-between gap-16">
      <Header />

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
            {/* <Image className="w-full" src={burnerWallet} alt="" /> */}
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

        <div className="relative row-span-2 h-full w-full rounded-[16px] bg-accent-tertiary">
          <Link
            href="/scaffold-deployer"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-full w-full flex-col justify-between rounded-[16px] px-8 pt-8 transition-all duration-500 hover:bg-button-secondary"
          >
            <div className="absolute">
              <h2 className="mb-2 flex items-center gap-2 text-l text-accent-secondary">
                <span>Scaffold Deployer</span>
                <span className="transition-all duration-500 group-hover:-translate-y-1">
                  <Upright />
                </span>
              </h2>
              <p>
                A simple tool for seamlessly deploying smart contracts to
                Starknet testnet and mainnet
              </p>
            </div>
            <div className="mt-auto max-w-[400px]">
              <Image src={deployer} alt="deployer banner" className="w-full" />
            </div>
          </Link>
        </div>

        <div className="relative h-full w-full rounded-[16px] bg-accent-tertiary">
          <Link
            href="/wikipedia"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-full w-full flex-col justify-between rounded-[16px] transition-all duration-500 hover:bg-button-secondary"
          >
            <div className="absolute px-8 pt-8">
              <h2 className="mb-2 flex items-center gap-2 text-l text-accent-secondary">
                <span>Scaffold Wikipedia</span>
                <span className="transition-all duration-500 group-hover:-translate-y-1">
                  <Upright />
                </span>
              </h2>
              <p>
                A collection of Starknet/Cairo learning resources in the
                ecosystem
              </p>
            </div>
            <div className="ml-auto mt-auto max-h-[220px] w-[90%] max-w-[400px]">
              <Image
                src={wikipedia}
                alt="wikipedia banner"
                className="w-full"
              />
            </div>
          </Link>
        </div>

        <div className="relative h-full w-full rounded-[16px] bg-accent-tertiary">
          <Link
            href="https://www.stark-utils.xyz/converter"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-full w-full flex-col justify-between rounded-[16px] transition-all duration-500 hover:bg-button-secondary"
          >
            <div className="absolute px-8 pt-8">
              <h2 className="mb-2 flex items-center gap-2 text-l text-accent-secondary">
                <span>Stark Converter</span>
                <span className="transition-all duration-500 group-hover:-translate-y-1">
                  <Upright />
                </span>
              </h2>
              <p>
                A collection of utility functions for Starknet/Cairo related
                conversions
              </p>
            </div>
            <div className="ml-auto w-1/2 pt-16">
              <Image
                src={converter}
                alt="converter banner"
                className="h-full w-full"
              />
            </div>
          </Link>
        </div>

        <div className="relative col-span-2 h-full w-full rounded-[16px] bg-accent-tertiary">
          <Link
            href="/address-book"
            target="_blank"
            rel="noopener noreferrer"
            className="group block h-full w-full rounded-[16px] transition-all duration-500 hover:bg-button-secondary"
          >
            <div className="absolute px-8 pt-8">
              <h2 className="mb-2 flex items-center gap-2 text-l text-accent-secondary">
                <span>Address Book</span>
                <span className="transition-all duration-500 group-hover:-translate-y-1">
                  <Upright />
                </span>
              </h2>
              <p>A collection of all relevant contract addresses on Starknet</p>
            </div>
            <div className="ml-auto w-[60%] max-w-[400px]">
              <Image
                src={addressBook}
                alt="Address book banner"
                className="w-full"
              />
            </div>
          </Link>
        </div>
      </section>

      <div className="flex w-full flex-col items-center justify-center gap-4 bg-footer-image bg-cover bg-center bg-no-repeat px-4 py-16 md:px-8">
        <div className="flex flex-col items-center gap-4">
          <img
            src={"assets/footerLogo.svg"}
            alt="burner banner"
            className="mx-auto"
          />
          <h2 className="mb-4 text-center text-[48px] leading-[58px] text-[#FF6734]">
            Become a part of the Community
          </h2>
          <p className="text-center text-text-tertiary">
            Join our community to learn and build together! And please raise an
            issue on our Github if there&apos;s a new feature you&apos;ll like
            to see
          </p>
          <a href="https://t.me/+sH0ug1mZ_WtjNmM0">
            <button className="duration-400 w-fit rounded-[12px] bg-[#FAFAFA] px-12 py-3 text-[#141925] transition-all hover:rounded-[20px]">
              Learn more
            </button>
          </a>
        </div>
      </div>
    </main>
  );
}
