"use client";
import Image from "next/image";
import Header from "@/app/components/ui_components/Header";
import NetworkSwitcher from "./components/ui_components/NetworkSwitcher";
import AddTokenBtn from "./components/AddTokenBtn";
import burnerWallet from "../../public/assets/burnerWalletBg.svg";
import faucet from "../../public/assets/faucetBanner.svg";
import deployer from "../../public/assets/deployerBanner.svg";
import wikipedia from "../../public/assets/wikipediaBanner.svg";
import addressBook from "../../public/assets/addressBook.svg";
import converter from "../../public/assets/converterBanner.svg";
import Footer from "./components/ui_components/Footer";
import arrow from "../../public/assets/linkArrow.svg";

export default function Home() {
  return (
    <main className="min-h-screen h-fit pt-[272px] dark:bg-[#1f1f1e] bg-white relative font-coolvetica">
      <Header />
      <div className="max-w-[850px] mx-auto text-center">
        <h1 className="text-[64px] leading-[70px] text-[#141925] mb-3 dark:text-white">
          Everything you need to buidl dApps on Ethereum
        </h1>
        <p className="text-[24px] leading-7 text-[#7A7A7A] dark:text-[#ba978c] mb-8">
          A modern clean veersion of Starknet-Scaffold with NextJS, Rainbowkit,
          Wagmi and Typescript. Supports Hardhat and Foundry
        </p>
        <div className="flex items-center justify-center gap-x-5">
          <NetworkSwitcher />
          <AddTokenBtn />
        </div>
      </div>
      <div className="flex flex-col items-center gap-y-6 w-full px-[150px] py-[74px]">
        <div className="w-full grid grid-cols-[826px_1fr] h-[320px] gap-x-6">
          <div className="relative w-full h-[320px] bg-[#F7F7F7] rounded-[16px] ">
            <div className="relative pt-9 pl-6 text-left z-[4] w-[320px]">
              <a
                href="/burner"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[24px] leading-7 mb-2 text-[#141925]"
              >
                Scaffold Burner Wallet
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  <Image alt="redirect" src={arrow} className="ml-[7px]" />
                </span>
              </a>
              <p className="text-base leading-5 text-[#7A7A7A]">
                Generate temporary wallets which can be used during the course
                of development
              </p>
            </div>
            <Image
              src={burnerWallet}
              alt="burner banner"
              className="absolute inset-0 z-[1]"
            />
          </div>
          <div className="relative w-full h-[320px] rounded-[16px] bg-[#F7F7F7] overflow-hidden">
            <div className="relative pt-9 pl-6 text-left z-[4] w-[292px] h-fit">
              <a
                href="https://starknet-faucet.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[24px] leading-7 mb-2 text-[#141925]"
              >
                Scaffold Faucet
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  <Image alt="redirect" src={arrow} className="ml-[7px]" />
                </span>
              </a>
              <p className="text-base leading-5 text-[#7A7A7A]">
                A SepETH/SepSTRK faucet for claiming ETH/STRK Sepolia testnet
                tokens
              </p>
            </div>
            <Image
              src={faucet}
              alt="faucet banner"
              className="absolute z-[1] top-[60px] left-[-10px]"
            />
          </div>
        </div>
        <div className="w-full grid grid-cols-[439px_1fr] gap-x-6">
          <div className="relative w-full h-[480px] rounded-[16px] bg-[#F7F7F7] overflow-hidden">
            <div className="relative pt-9 pl-6 text-left z-[4] w-[292px] h-fit">
              <a
                href="/scaffold-deployer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[24px] leading-7 mb-2 text-[#141925]"
              >
                Scaffold Deployer
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  <Image alt="redirect" src={arrow} className="ml-[7px]" />
                </span>
              </a>
              <p className="text-base leading-5 text-[#7A7A7A]">
                A simple tool for seamlessly deploying smart contracts to
                Starknet testnet and mainnet
              </p>
            </div>
            <Image
              src={deployer}
              alt="deployer banner"
              className="absolute z-[1] top-[140px] left-[-2px]"
            />
          </div>
          <div className="grid grid-cols-[1fr] w-full grid-rows-[1fr_1fr] h-[480px] gap-y-6">
            <div className="grid grid-cols-[1fr_1fr] gap-x-6 h-full">
              <div className="relative w-full rounded-[16px] bg-[#F7F7F7] overflow-hidden">
                <div className="relative pt-9 pl-6 text-left z-[4] w-[292px] h-fit">
                  <a
                    href="/wikipedia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[24px] leading-7 mb-2 text-[#141925]"
                  >
                    Scaffold Wikipedia
                    <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                      <Image alt="redirect" src={arrow} className="ml-[7px]" />
                    </span>
                  </a>
                  <p className="text-base leading-5 text-[#7A7A7A]">
                    A collection of Starknet/Cairo learning resources in the
                    ecosystem
                  </p>
                </div>
                <Image
                  src={wikipedia}
                  alt="wikipedia banner"
                  className="absolute z-[1] top-[126px] left-[41px]"
                />
              </div>
              <div className="relative w-full rounded-[16px] bg-[#F7F7F7] overflow-hidden">
                <div className="relative pt-9 pl-6 text-left z-[4] w-[292px] h-fit">
                  <a
                    href="https://www.stark-utils.xyz/converter"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[24px] leading-7 mb-2 text-[#141925]"
                  >
                    Stark Converter
                    <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                      <Image alt="redirect" src={arrow} className="ml-[7px]" />
                    </span>
                  </a>
                  <p className="text-base leading-5 text-[#7A7A7A]">
                    A collection of utility functions for Starknet/Cairo related
                    conversions
                  </p>
                </div>
                <Image
                  src={converter}
                  alt="converter banner"
                  className="absolute z-[1] top-[40px] right-[0px]"
                />
              </div>
            </div>
            <div className="relative w-full rounded-[16px] bg-[#F7F7F7] overflow-hidden">
              <div className="relative pt-9 pl-6 text-left z-[4] w-[292px] h-fit">
                <a
                  href="/address-book"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[24px] leading-7 mb-2 text-[#141925]"
                >
                  Address Book
                  <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    <Image alt="redirect" src={arrow} className="ml-[7px]" />
                  </span>
                </a>
                <p className="text-base leading-5 text-[#7A7A7A]">
                  A collection of all relevant contract addresses on Starknet
                </p>
              </div>
              <Image
                src={addressBook}
                alt="Address book banner"
                className="absolute z-[1] top-[0px] right-[0px]"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
