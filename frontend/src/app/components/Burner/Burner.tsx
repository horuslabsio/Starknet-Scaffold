"use client";
import React, { useState, useEffect } from "react";
import { useAccount, useNetwork } from "@starknet-react/core";

import { Contract, RpcProvider, ec, stark } from "starknet";
import * as Abi from "../../../../public/abi/burnerWallet.json";
import Header from "../Header";

type Wallet = {
  address: string;
  publicKey: string;
  privateKey: string;
};

const Burners: React.FC = () => {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const { account } = useAccount();
  const { chain } = useNetwork();
  const [rpcAddress, setRpcAddress] = useState<string>("");
  const [burnerWalletDeployer, setBurnerWalletDeployer] = useState<Contract>();

  const BURNER_WALLET_ADDRESS_SEPOLIA =
    "0x2ffc549d472164639366ad0acfbc5fde49fcc0f037fa6bc9b1702161012f5d3";

  const BURNER_WALLET_ADDRESS_GOERLI =
    "0x3341944e5ed2a72cd23cc5236754ebc5d01722fd74d84dafb367dccd1b18db3";

  console.log("chainId", chain.network);

  useEffect(() => {
    console.log("CHANGE NETWORK");
    if (chain.network === "sepolia") {
      setRpcAddress("https://starknet-sepolia.public.blastapi.io");
      setBurnerWalletDeployer(
        new Contract(Array.from(Abi), BURNER_WALLET_ADDRESS_SEPOLIA, account)
      );
      console.log("sepolia");
    } else if (chain.network === "goerli") {
      console.log("goerli");
      setRpcAddress("https://starknet-testnet.public.blastapi.io");
      setBurnerWalletDeployer(
        new Contract(Array.from(Abi), BURNER_WALLET_ADDRESS_GOERLI, account)
      );
    } else {
      setRpcAddress("");
      setBurnerWalletDeployer(undefined);
      console.warn("Burners are not supported on the mainnet.");
    }
  }, [chain, account]);

  const generateWallet = async (
    burnerWalletDeployer: Contract
  ): Promise<Wallet> => {
    const provider = new RpcProvider({
      nodeUrl: rpcAddress,
    });

    const privateKey = stark.randomAddress();

    const publicKey = ec.starkCurve.getStarkKey(privateKey);

    const TransactionHash = await burnerWalletDeployer.deploy_burner_wallet(
      publicKey
    );

    const result = await provider.waitForTransaction(
      TransactionHash.transaction_hash
    );

    return {
      privateKey,
      publicKey,
      address: result.events[0].from_address,
    };
  };

  useEffect(() => {
    const loadedWallets = localStorage.getItem("wallets");
    if (loadedWallets) {
      setWallets(JSON.parse(loadedWallets));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("wallets", JSON.stringify(wallets));
  }, [wallets]);

  const handleCreate = async () => {
    if (wallets.length < 5) {
      if (burnerWalletDeployer) {
        const newWallet = await generateWallet(burnerWalletDeployer);
        setWallets([...wallets, newWallet]);
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
    <div className="flex flex-col">
      <Header />
      <div className="flex justify-center p-4 pt-20">
        <div className="flex flex-col items-start gap-2">
          <h3 className="font-bold text-start">Burner Wallets:</h3>
          {wallets.map((wallet, index) => (
            <div key={index} className="flex flex-col gap-2 p-2 border-2">
              <h4>Burner {index + 1}</h4>
              <p>Private Key: {wallet.privateKey}</p>
              <p>Public Key: {wallet.publicKey}</p>
              <p>Account Address: {wallet.address}</p>
            </div>
          ))}
          <button
            className="mt-4 p-2 bg-blue-500 text-white rounded"
            onClick={handleCreate}
          >
            Generate Wallet
          </button>
          <button
            className="mt-2 p-2 bg-red-500 text-white rounded"
            onClick={clearWallets}
          >
            Clear Wallets
          </button>
        </div>
      </div>
    </div>
  );
};

export default Burners;
