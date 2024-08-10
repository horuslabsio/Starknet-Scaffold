"use client";
import Image from "next/image";
import Header from "@/app/components/header/Header";
import NetworkSwitcher from "~/ui_components/NetworkSwitcher";
import faucet from "../../public/assets/faucetBanner.svg";
import deployer from "../../public/assets/deployerBanner.svg";
import wikipedia from "../../public/assets/wikipediaBanner.svg";
import addressBook from "../../public/assets/addressBook.svg";
import converter from "../../public/assets/converterBanner.svg";
import burnerWallet from "../../public/assets/burnerWallet.svg";
import Link from "next/link";
import Upright from "svg/Upright";

export default function Home() {
  return (
    <main className="flex min-h-svh flex-col justify-between gap-16">
      <Header />

      {/* HERO --> */}
      <section className="pt-[6rem] md:pt-[clamp(200px,25vh,650px)]">
        <div className="mx-auto flex max-w-[600px] flex-col gap-8 p-4 text-center md:max-w-[850px] md:p-8">
          <h1 className="text-2xl text-[--headings] md:text-3xl">
            Everything you need to buidl dApps on Ethereum
          </h1>
          <p className="text-md">
            A modern clean version of Starknet-Scaffold with NextJS, Rainbowkit,
            Wagmi and Typescript. Supports Hardhat and Foundry
          </p>
          <div className="flex items-center justify-center gap-4">
            <NetworkSwitcher />

            <button
              aria-haspopup="dialog"
              popoverTarget="add-token-popover"
              className="h-12 w-[50%] max-w-[12rem] rounded-[12px] border-[2px] border-solid border-[--add-token-border] bg-background-primary-light text-accent-secondary transition-all duration-300 hover:rounded-[30px]"
            >
              Add Token
            </button>
          </div>
        </div>
      </section>
      {/* <-- END */}

      {/* Link cards --> */}
      <section className="container mx-auto flex w-[90%] max-w-[500px] grid-cols-3 flex-col gap-8 text-text-primary md:grid md:w-[80%] md:max-w-none">
        <div className="relative col-span-2 h-[280px] w-full rounded-[16px] bg-[--link-card] md:h-[350px]">
          <Link
            href="/burner"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-full w-full flex-col rounded-[16px] p-4 transition-all duration-500 hover:bg-button-secondary md:block md:p-0"
          >
            <div className="p-4 md:absolute md:w-[45%] md:px-8 md:pt-8">
              <h2 className="mb-2 flex items-center gap-1 text-l text-[--headings] group-hover:text-accent-secondary">
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
            <div className="flex h-full w-full px-4 md:rounded-[16px]">
              <Image src={burnerWallet} alt="" className="h-full w-full" />
            </div>
          </Link>
        </div>

        <div className="group relative h-[280px] w-full overflow-hidden rounded-[16px] bg-[--link-card] md:h-full md:max-h-none">
          <Link
            href="https://starknet-faucet.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-full w-full flex-col rounded-[16px] transition-all duration-500 hover:bg-button-secondary"
          >
            <div className="px-8 pt-8 md:absolute">
              <h2 className="mb-2 flex items-center gap-2 text-l text-[--headings] group-hover:text-accent-secondary">
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
            <div className="h-[180px] flex-1 md:mr-auto md:mt-auto md:h-full md:w-[90%]">
              <Image
                src={faucet}
                alt="faucet banner"
                className="h-full w-full"
              />
            </div>
          </Link>
        </div>

        <div className="relative row-span-2 h-full max-h-[280px] w-full overflow-clip rounded-[16px] bg-[--link-card] md:max-h-none">
          <Link
            href="/scaffold-deployer"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-full w-full flex-col justify-between rounded-[16px] transition-all duration-500 hover:bg-button-secondary md:px-4 md:pt-4"
          >
            <div className="px-8 pt-8 md:absolute">
              <h2 className="mb-2 flex items-center gap-2 text-l text-[--headings] group-hover:text-accent-secondary">
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
            <div className="h-[180px] md:mt-auto md:h-fit md:max-w-[400px]">
              <Image
                src={deployer}
                alt="deployer banner"
                className="h-full w-full"
              />
            </div>
          </Link>
        </div>

        <div className="relative h-[280px] w-full rounded-[16px] bg-[--link-card] md:h-full md:max-h-none">
          <Link
            href="/wikipedia"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-full w-full flex-col justify-between rounded-[16px] transition-all duration-500 hover:bg-button-secondary"
          >
            <div className="p-4 md:absolute md:px-8 md:pt-8">
              <h2 className="mb-2 flex items-center gap-2 text-l text-[--headings] group-hover:text-accent-secondary">
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
            <div className="ml-auto mt-auto h-[180px] w-[90%] md:h-fit md:max-h-[220px] md:max-w-[400px]">
              <Image
                src={wikipedia}
                alt="wikipedia banner"
                className="h-full w-full"
              />
            </div>
          </Link>
        </div>

        <div className="relative h-full max-h-[280px] w-full overflow-clip rounded-[16px] bg-[--link-card] md:max-h-none">
          <Link
            href="https://www.stark-utils.xyz/converter"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-full w-full flex-col justify-between rounded-[16px] transition-all duration-500 hover:bg-button-secondary"
          >
            <div className="p-4 md:absolute md:px-8 md:pt-8">
              <h2 className="mb-2 flex items-center gap-2 text-l text-[--headings] group-hover:text-accent-secondary">
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
            <div className="ml-auto h-[180px] w-1/2 md:h-fit md:pt-16">
              <Image
                src={converter}
                alt="converter banner"
                className="h-full w-full"
              />
            </div>
          </Link>
        </div>

        <div className="relative col-span-2 h-[280px] w-full overflow-clip rounded-[16px] bg-[--link-card] md:h-full">
          <Link
            href="/address-book"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-full w-full flex-col justify-between rounded-[16px] transition-all duration-500 hover:bg-button-secondary md:block"
          >
            <div className="p-4 md:absolute md:px-8 md:pt-8">
              <h2 className="mb-2 flex items-center gap-2 text-l text-[--headings] group-hover:text-accent-secondary">
                <span>Address Book</span>
                <span className="transition-all duration-500 group-hover:-translate-y-1">
                  <Upright />
                </span>
              </h2>
              <p>A collection of all relevant contract addresses on Starknet</p>
            </div>
            <div className="ml-auto h-[180px] w-[60%] max-w-[400px] md:h-fit">
              <Image
                src={addressBook}
                alt="Address book banner"
                className="h-full w-full"
              />
            </div>
          </Link>
        </div>
      </section>
      {/* <-- END */}

      {/* Community --> */}
      <div className="flex w-full flex-col items-center justify-center gap-4 bg-footer-image bg-cover bg-center bg-no-repeat px-4 py-16 md:px-8">
        <div className="flex flex-col items-center gap-4">
          <img
            src={"assets/footerLogo.svg"}
            alt="burner banner"
            className="mx-auto"
          />
          <h2 className="mb-4 text-center text-xl leading-[58px] text-accent-primary md:text-2xl">
            Become a part of the Community
          </h2>
          <p className="text-center text-text-tertiary">
            Join our community to learn and build together! And please raise an
            issue on our Github if there&apos;s a new feature you&apos;ll like
            to see
          </p>
          <a href="https://t.me/+sH0ug1mZ_WtjNmM0">
            <button className="w-fit rounded-[12px] bg-background-primary-light px-12 py-3 text-accent-secondary transition-all duration-300 hover:rounded-[20px]">
              Learn more
            </button>
          </a>
        </div>
      </div>
    </main>
  );
}
