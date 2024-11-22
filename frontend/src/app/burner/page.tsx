"use client";
import React, { useState, useEffect } from "react";
import { useAccount, useNetwork } from "@starknet-react/core";
import { Contract, RpcProvider, ec, stark } from "starknet";
import * as Abi from "../../../public/abi/burnerWallet.json";
import GenericModal from "../components/internal/util/GenericModal";
import WarnBadge from "public/svg/WarnBadge";
import Close from "public/svg/Close";
import ChevronDown from "public/svg/ChevronDown";
import Loading from "../components/internal/util/Loading";
import Blockies from "react-blockies";
import BurnerWallet from "./BurnerWallet";

type Wallet = {
  address: string;
  publicKey: string;
  privateKey: string;
};

export default function Page() {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [activeWallet, setActiveWallets] = useState(0);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [burnerWalletLoading, setBurnerWalletLoading] = useState<boolean>(true);
  const { account, address } = useAccount();
  const { chain } = useNetwork();

  let burnerDeployerAddress: string;
  let rpcAddress: string;
  if (chain.network == "sepolia") {
    burnerDeployerAddress =
      "0x2ffc549d472164639366ad0acfbc5fde49fcc0f037fa6bc9b1702161012f5d3";
    rpcAddress = "https://starknet-sepolia.public.blastapi.io";
  } else {
    console.log("burner wallets are not supported on mainnet!");
  }

  let burnerWalletDeployer = new Contract(
    Array.from(Abi),
    burnerDeployerAddress!,
    account,
  );

  const generateWallet = async (
    burnerWalletDeployer: Contract,
  ): Promise<Wallet> => {
    const provider = new RpcProvider({
      nodeUrl: rpcAddress,
    });

    const privateKey = stark.randomAddress();
    const publicKey = ec.starkCurve.getStarkKey(privateKey);

    const TransactionHash =
      await burnerWalletDeployer.deploy_burner_wallet(publicKey);

    const result: any = await provider.waitForTransaction(
      TransactionHash.transaction_hash,
    );

    const address: string = result.events?.at(0).from_address;
    const formattedAddress =
      "0x" + address.replace(/^0x/, "").padStart(64, "0");

    return {
      privateKey,
      publicKey,
      address: formattedAddress,
    };
  };

  useEffect(() => {
    const loadedWallets = localStorage.getItem("wallets");
    if (loadedWallets) {
      const parsedWallets: Wallet[] = JSON.parse(loadedWallets);
      setWallets(parsedWallets);
      setBurnerWalletLoading(false);
    } else setBurnerWalletLoading(false);
  }, []);

  const handleCreate = async () => {
    if (wallets.length < 5) {
      if (burnerWalletDeployer) {
        try {
          setBurnerWalletLoading(true);
          const newWallet = await generateWallet(burnerWalletDeployer);
          setWallets([...wallets, newWallet]);
          localStorage.setItem(
            "wallets",
            JSON.stringify([...wallets, newWallet]),
          );
          console.log(newWallet);
        } catch (error) {
          console.log(error);
        } finally {
          setBurnerWalletLoading(false);
        }
      } else {
        console.error("Burner wallet deployer is undefined.");
      }
    } else {
      const alertPopover = document.getElementById("alert-popover");
      // @ts-ignore
      alertPopover.showPopover();
      console.log("Maximum of 5 burner accounts are allowed.");
    }
  };

  const clearWallets = () => {
    setWallets([]);
    localStorage.removeItem("wallets");
  };

  const clearWallet = () => {
    setWallets((prev) => {
      const updatedWallets = [...prev];
      updatedWallets.splice(activeWallet, 1);

      localStorage.setItem("wallets", JSON.stringify(updatedWallets));
      if (activeWallet >= updatedWallets.length && updatedWallets.length > 0) {
        setActiveWallets(0);
      }
      return updatedWallets;
    });
  };
  return (
    <section className="container mx-auto px-4 pb-32 pt-[8rem] md:pt-[clamp(200px,25vh,650px)]">
      <div className="mx-auto w-fit py-8 text-[--headings]">
        <p className="mb-4 flex items-center gap-2">
          <span>
            <WarnBadge />
          </span>
          <span>
            NB: Please note that burner wallets are not supported on mainnet.
            Resolve to using a wallet provider instead!
          </span>
        </p>
        <p className="flex items-center gap-2">
          <span>
            <WarnBadge />
          </span>
          NB: Ether is required to send assets and execute transactions on the
          burner wallets
        </p>
      </div>
      <div
        className={`mx-auto ${chain.network === "sepolia" ? "flex" : "hidden"} w-fit flex-col gap-4 md:w-full lg:flex-row-reverse lg:justify-center`}
      >
        <div className="mx-auto flex h-fit w-[90vw] max-w-[35rem] flex-col rounded-[16px] md:max-w-[40rem] lg:mx-0 lg:w-full lg:max-w-[27rem] lg:flex-col-reverse lg:border lg:border-[--borders] lg:p-8">
          <div className="my-8 flex gap-4 lg:my-0 lg:flex-col">
            <button
              disabled={!address}
              onClick={handleCreate}
              className="w-full rounded-[12px] bg-button-primary px-6 py-3 text-background-primary-light transition-all duration-300 hover:rounded-[30px] disabled:cursor-not-allowed disabled:opacity-50 md:py-4"
            >
              Generate new wallet
            </button>
            <button
              disabled={!wallets.length}
              onClick={clearWallet}
              className="w-full rounded-[12px] border-[2px] border-solid border-[--borders] bg-[--modal-disconnect-bg] py-2 text-red-secondary disabled:cursor-not-allowed disabled:opacity-50 lg:p-4"
            >
              Clear wallet
            </button>
          </div>
          <div className="lg:mb-8 lg:border-b lg:border-b-[#DADADA] lg:pb-8">
            <h2 className="mb-8 hidden text-l text-[--headings] lg:block">
              Burner wallet
            </h2>
            <div className="relative">
              <button
                disabled={!wallets.length || !address}
                aria-expanded={openDropdown}
                aria-controls="wallet-dropdown"
                aria-haspopup="listbox"
                onClick={() => setOpenDropdown((prev) => !prev)}
                className="flex w-full items-center justify-between gap-8 rounded-[12px] border-[2px] border-solid border-[--borders] p-4 text-[--headings] disabled:cursor-not-allowed disabled:opacity-50 lg:justify-center lg:bg-[--modal-disconnect-bg]"
              >
                <span className="flex flex-col items-start gap-1">
                  <span className="text-l lg:hidden">Burner wallets</span>
                  <span className="rounded-[6px] bg-button-tertiary px-2 py-1 text-accent-secondary lg:rounded-none lg:bg-transparent lg:text-[--headings]">
                    Wallet Account {activeWallet + 1}
                  </span>
                </span>
                <span>
                  <ChevronDown />
                </span>
              </button>
              <div
                id="wallet-dropdown"
                className={`absolute z-10 w-full overflow-hidden ${openDropdown ? "h-fit" : "h-0"}`}
              >
                <ul
                  role="listbox"
                  tabIndex={-1}
                  aria-activedescendant={`wallet-${activeWallet}`}
                  className={`mt-4 flex h-fit flex-col items-center gap-4 rounded-[12px] border-2 border-solid border-[--borders] bg-[--background] p-4 text-[--headings] transition-all duration-300 ${openDropdown ? "translate-y-0 opacity-100" : "translate-y-[20px] opacity-0"}`}
                >
                  {wallets.map((wallet, index) => {
                    return (
                      <li
                        id={`wallet-${index}`}
                        role="option"
                        aria-selected={index === activeWallet}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            setActiveWallets(index);
                            setOpenDropdown(false);
                          }
                        }}
                        key={wallet.address}
                        onClick={() => {
                          setActiveWallets(index);
                          setOpenDropdown(false);
                        }}
                        className="flex w-full cursor-pointer items-center gap-4 rounded-[8px] p-2 transition-all hover:bg-[--modal-assets-bg]"
                      >
                        <Blockies
                          seed={wallet.address || ""}
                          scale={4}
                          className="rounded-full"
                        />
                        <span>wallet {index + 1}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {!burnerWalletLoading ? (
          wallets.length !== 0 ? (
            <div className="flex flex-col gap-8">
              <BurnerWallet
                wallet={wallets[activeWallet]}
                walletNumber={activeWallet + 1}
              />
            </div>
          ) : (
            <div className="grid min-h-[20rem] w-[90vw] max-w-[35rem] place-content-center rounded-[16px] border border-[--borders] bg-[--modal-disconnect-bg] p-8 lg:w-[45rem] lg:max-w-none">
              <p>No burner wallets found</p>
            </div>
          )
        ) : (
          <div className="grid min-h-[20rem] w-[90vw] max-w-[35rem] place-content-center rounded-[16px] border border-[--borders] bg-[--modal-disconnect-bg] p-8 lg:w-[45rem] lg:max-w-none">
            <Loading />
          </div>
        )}
      </div>
      <GenericModal
        style="py-16 px-[5vw] md:p-16 bg-transparent"
        popoverId="alert-popover"
      >
        <div className="flex h-[20rem] w-[90vw] max-w-[35rem] flex-col items-center rounded-[24px] bg-[--background] p-8 text-[--headings] shadow-popover-shadow">
          <div className="flex w-full justify-end">
            <button
              // @ts-ignore
              popovertarget="alert-popover"
            >
              <Close />
            </button>
          </div>
          <div className="my-auto flex flex-col items-center gap-4">
            <div>
              <span className="text-[6em] text-red-secondary">
                <WarnBadge />
              </span>
            </div>
            <p className="text-center text-md">
              Maximum of 5 burner accounts are allowed.
            </p>
          </div>
        </div>
      </GenericModal>
    </section>
  );
}
