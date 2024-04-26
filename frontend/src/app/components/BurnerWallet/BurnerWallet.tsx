"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import AssetTransferModal from "../AssetTransferModal";
import ConnectionModal from "../ConnectionModal";
import { useAccount, useBalance } from "@starknet-react/core";
import { Account, RpcProvider } from "starknet";

interface IWallet {
  address: string;
  privateKey: string;
  publicKey: string;
}

function BurnerWallet({ wallet }: { wallet: IWallet }) {
  const [isSending, setIsSending] = useState(false);
  const [account, setAccount] = useState(undefined);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const {
    isLoading: loadingETHBalance,
    isError,
    error,
    data: ethBalance,
  } = useBalance({
    address: wallet.address,
  });
  const {
    isLoading: loadingSTRKBalance,
    isError: isSTRKError,
    error: strkError,
    data: strkBalance,
  } = useBalance({
    address: wallet.address,
    watch: true,
    token: "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
  });

  useEffect(() => {
    console.log("eth balance.....", ethBalance);
    console.log("strk balance....", strkBalance);
  }, [ethBalance, strkBalance]);

  function handleConnect() {
    const provider = new RpcProvider({
      nodeUrl:
        "https://starknet-sepolia.infura.io/v3/b935e660d34f48469cb740bfa2cfb1c0",
    });
    const account: any = new Account(
      provider,
      wallet.address,
      wallet.privateKey
    );
    setAccount(account);
    setIsConnected(true);
    setIsConnecting(false);

    console.log("account connected");
  }

  return (
    <div className="rounded-lg border px-8 py-12 border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30 w-full">
      {isSending &&
        createPortal(
          <AssetTransferModal
            strkBalance={strkBalance?.formatted}
            ethBalance={ethBalance?.formatted}
            isOpen={isSending}
            onClose={() => setIsSending(false)}
            wallet={wallet}
            account={account}
          />,
          document.body
        )}
      {isConnecting &&
        createPortal(
          <ConnectionModal
            isOpen={isConnecting}
            onClose={() => setIsConnecting(false)}
            handleConnect={handleConnect}
            wallet={wallet}
          />,
          document.body
        )}
      <h2 className="mb-[60px] text-2xl font-semibold">Burner Wallet</h2>
      <div className="flex gap-[100px] text-2xl font-normal">
        <div>
          <h2>
            ETH Balance:{" "}
            <span className="font-medium text-xl">
              {" "}
              {loadingETHBalance
                ? "Loading..."
                : `${Number(ethBalance?.formatted).toFixed(4)}ETH`}
            </span>
          </h2>
          <h2>
            STRK Balance:{" "}
            <span className="font-medium text-xl">
              {loadingSTRKBalance
                ? "Loading..."
                : `${Number(strkBalance?.formatted).toFixed(4)}STRK`}
            </span>
          </h2>
        </div>
        <h3>
          {wallet.address
            .slice(0, 12)
            .concat("....")
            .concat(wallet.address.slice(-6))}
        </h3>
      </div>
      <div className="mt-[80px] flex  gap-[60px] justify-center">
        {isConnected ? (
          <>
            <button
              className=" px-6 py-4 bg-blue-500 text-white rounded-[5px] disabled:cursor-not-allowed w-[200px] font-semibold"
              disabled={!strkBalance || !ethBalance}
              onClick={() => setIsSending(true)}
            >
              SEND
            </button>
            <button
              className=" px-6 py-4 bg-blue-500 text-white rounded-[5px] w-[200px] font-semibold disabled:cursor-not-allowed"
              disabled={!strkBalance || !ethBalance}
            >
              EXECUTE
            </button>
          </>
        ) : (
          <button
            className=" px-6 py-4 bg-blue-500 disabled:cursor-not-allowed text-white rounded-[5px] w-[200px] font-semibold"
            onClick={() => setIsConnecting(true)}
            disabled={!strkBalance || !ethBalance}
          >
            CONNECT
          </button>
        )}
      </div>
    </div>
  );
}

export default BurnerWallet;
