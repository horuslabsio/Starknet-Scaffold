"use client";
import { useState } from "react";
import { createPortal } from "react-dom";
import AssetTransferModal from "../AssetTransferModal";
import ConnectionModal from "../ConnectionModal";
import { useContractRead } from "@starknet-react/core";
import { Account, RpcProvider } from "starknet";
import CopyButton from "../CopyButton";
import Erc20Abi from "../../abi/token.abi.json";
import { ETH_SEPOLIA, STRK_SEPOLIA } from "@/app/utils/constant";
import { formatCurrency } from "@/app/utils/currency";
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

  const { data: eth, isLoading: ethLoading } = useContractRead({
    address: ETH_SEPOLIA,
    abi: Erc20Abi,
    functionName: "balanceOf",
    args: [wallet.address!],
    watch: true,
  });

  const { data: strk, isLoading: strkLoading } = useContractRead({
    address: STRK_SEPOLIA,
    abi: Erc20Abi,
    functionName: "balanceOf",
    args: [wallet.address!],
    watch: true,
  });

  // @ts-ignore
  const ethBalance = formatCurrency(eth?.balance.low.toString());
  // @ts-ignore
  const strkBalance = formatCurrency(strk?.balance?.low.toString());

  function handleConnect() {
    const provider = new RpcProvider({
      nodeUrl: "https://starknet-sepolia.public.blastapi.io",
    });
    const account: any = new Account(
      provider,
      wallet.address,
      wallet.privateKey
    );
    setAccount(account);
    setIsConnected(true);
    setIsConnecting(false);
  }

  return (
    <div className="rounded-lg border px-8 py-12 border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30 w-full">
      {isSending &&
        createPortal(
          <AssetTransferModal
            strkBalance={strkBalance}
            ethBalance={ethBalance}
            isOpen={isSending}
            onClose={() => setIsSending(false)}
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
              {ethLoading
                ? "Loading..."
                : `${Number(ethBalance).toFixed(3)}ETH`}
            </span>
          </h2>
          <h2>
            STRK Balance:{" "}
            <span className="font-medium text-xl">
              {strkLoading
                ? "Loading..."
                : `${Number(strkBalance).toFixed(3)}STRK`}
            </span>
          </h2>
        </div>
        <div className="flex items-center gap-x-4">
          <h3>
            {wallet.address
              .slice(0, 7)
              .concat("....")
              .concat(wallet.address.slice(-6))}
          </h3>
          <CopyButton data={wallet.address} />
        </div>
      </div>
      <div className="mt-[80px] flex  gap-[60px] justify-center">
        {isConnected ? (
          <>
            {(ethBalance > 0 || strkBalance > 0) && (
              <button
                className=" px-6 py-4 bg-blue-500 text-white rounded-[5px] disabled:cursor-not-allowed w-[200px] font-semibold"
                disabled={!eth || !strk}
                onClick={() => setIsSending(true)}
              >
                SEND
              </button>
            )}
            <button
              className=" px-6 py-4 bg-blue-500 text-white rounded-[5px] w-[200px] font-semibold disabled:cursor-not-allowed"
              disabled={!eth || !strk}
            >
              EXECUTE
            </button>
          </>
        ) : (
          <button
            className=" px-6 py-4 bg-blue-500 disabled:cursor-not-allowed text-white rounded-[5px] w-[200px] font-semibold"
            onClick={() => setIsConnecting(true)}
            disabled={!eth || !strk}
          >
            CONNECT
          </button>
        )}
      </div>
    </div>
  );
}

export default BurnerWallet;
