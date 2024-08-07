"use client";
import React, { useState, useEffect } from "react";
import { useAccount, useNetwork } from "@starknet-react/core";
import { Contract, RpcProvider, ec, stark } from "starknet";
import * as Abi from "../../../public/abi/burnerWallet.json";
import spinner from "../../../public/assets/spinner.svg";
import Image from "next/image";
import BurnerWallet from "../components/BurnerWallet/BurnerWallet";

type Wallet = {
  address: string;
  publicKey: string;
  privateKey: string;
};

export default function Page() {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [burnerWalletLoading, setBurnerWalletLoading] = useState<boolean>(true);
  const { account } = useAccount();
  const { chain } = useNetwork();

  let burnerDeployerAddress;
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

    return {
      privateKey,
      publicKey,
      address: result.events?.at(0).from_address,
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
      alert("Maximum of 5 burner accounts are allowed.");
    }
  };

  const clearWallets = () => {
    setWallets([]);
    localStorage.removeItem("wallets");
  };
  return (
    <section className="flex flex-col pt-[clamp(200px,25vh,650px)]">
      <div className="flex justify-center p-4 pt-20">
        <div className="flex flex-col items-start gap-2">
          <h2>
            <b className="text-black-300">
              NB: Please note that burner wallets are not supported on mainnet.
              Resolve to using a wallet provider instead! <br />
              <br />
              Also you can only generate a maximum of 5 burner wallets for each
              session
            </b>
          </h2>
          <br />

          <h3 className="text-start font-bold">Burner Wallets:</h3>
          {!burnerWalletLoading ? (
            wallets.length !== 0 ? (
              wallets.map((wallet, index) => (
                <BurnerWallet key={index} wallet={wallet} />
              ))
            ) : (
              <div className="border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30 flex w-full items-center justify-center rounded-lg border px-8 py-12">
                <div>No burner wallets found</div>
              </div>
            )
          ) : (
            <div className="border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30 flex w-full items-center justify-center rounded-lg border px-8 py-12">
              <Image src={spinner} width={32} height={32} alt="loading" />
            </div>
          )}
          <div className="flex">
            <button
              className="bg-primary text-white mr-5 mt-2 rounded p-2"
              onClick={handleCreate}
            >
              Generate Wallet
            </button>
            <button
              className="bg-secondary text-white mt-2 rounded p-2"
              onClick={clearWallets}
            >
              {" "}
              Clear Wallets
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
