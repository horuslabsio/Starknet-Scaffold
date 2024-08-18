"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import AssetTransferModal from "../AssetTransferModal";
import ConnectionModal from "../ConnectionModal";
import { useContractRead } from "@starknet-react/core";
import { Account, RpcProvider } from "starknet";
import CopyButton from "../ui_components/CopyButton";
import Erc20Abi from "../../abi/token.abi.json";

import ContractExecutionModal from "../ContractExecutionModal";
import { ETH_SEPOLIA, STRK_SEPOLIA } from "@/app/utils/constant";
import { formatCurrency } from "@/app/utils/currency";
import AccountBalance from "../ui_components/AccountBalance";
import Copy from "svg/Copy";
import { handleCopyClick } from "@/app/utils/copy";
interface IWallet {
  address: string;
  privateKey: string;
  publicKey: string;
}

function BurnerWallet({
  wallet,
  walletNumber,
  popoverId,
}: {
  wallet: IWallet;
  walletNumber: number;
  popoverId: string;
}) {
  const [isCopied, setIsCopied] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
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
      wallet.privateKey,
    );

    setAccount(account);
    setIsConnected(true);
    const popover = document.getElementById(
      `burner-connect-popover-${popoverId}`,
    );
    //@ts-ignore
    popover.hidePopover();
  }

  useEffect(() => {
    const id = setTimeout(() => {
      setIsCopied(false);
    }, 1500);

    return () => clearTimeout(id);
  }, [isCopied]);

  return (
    <>
      <div className="w-[43rem] rounded-[16px] border border-[--borders] p-8">
        <div className="mb-12 flex items-center justify-between border-b border-b-[#DADADA] pb-4">
          <div className="flex items-center gap-4">
            <h2 className="mb-2 text-l text-[--headings]">
              Wallet Account {walletNumber}
            </h2>{" "}
            <button
              onClick={() =>
                handleCopyClick({
                  text: wallet.address,
                  setIsCopied: setIsCopied,
                })
              }
              className="flex gap-2 rounded-[30px] bg-button-tertiary px-6 py-3 text-accent-secondary md:py-4"
            >
              <span className="flex items-center">
                {wallet.address
                  ?.slice(0, 6)
                  .concat("...")
                  .concat(wallet.address?.slice(-5))}
              </span>
              <span>
                <Copy />
              </span>
            </button>
          </div>
          <button
            //@ts-ignore
            popoverTarget={`burner-connect-popover-${popoverId}`}
            disabled={+ethBalance === 0 && +strkBalance === 0}
            className="w-[11rem] rounded-[12px] bg-button-primary px-6 py-3 text-background-primary-light transition-all duration-300 hover:rounded-[30px] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:rounded-[12px] md:py-4"
          >
            {isConnected ? "Connected" : "Connect"}
          </button>
        </div>
        <div>
          <div className="mb-8">
            <h3 className="mb-4">Assets</h3>
            <div className="rounded-[12px] bg-[--modal-assets-bg] transition-colors duration-500 ease-linear">
              <AccountBalance heading={false} address={wallet.address || ""} />
            </div>
          </div>
          <div className="flex gap-4">
            <button
              //@ts-ignore
              popoverTarget={`burner-transfer-popover-${popoverId}`}
              disabled={
                account === undefined ||
                (+ethBalance === 0 && +strkBalance === 0)
              }
              className="w-full rounded-[12px] bg-button-primary px-6 py-3 text-background-primary-light transition-all duration-300 hover:rounded-[30px] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:rounded-[12px] md:py-4"
            >
              Send
            </button>
            <button
              //@ts-ignore
              popoverTarget={`burner-execute-popover-${popoverId}`}
              disabled={
                account === undefined ||
                (+ethBalance === 0 && +strkBalance === 0)
              }
              className="w-full rounded-[12px] border-[2px] border-[--headings] text-[--headings] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Execute
            </button>
          </div>
        </div>
      </div>
      {/* <button
        // @ts-ignore
        popoverTarget={"burner-transfer-popover"}
      >
        click
      </button>
      <button
        // @ts-ignore
        popoverTarget={"burner-connect-popover"}
      >
        click 22
      </button>
      <button
        // @ts-ignore
        popoverTarget={"burner-execute-popover"}
      >
        click 33
      </button> */}

      <ConnectionModal
        popoverId={popoverId}
        handleConnect={handleConnect}
        wallet={wallet}
        isConnected={isConnected}
      />
      <AssetTransferModal
        strkBalance={strkBalance}
        ethBalance={ethBalance}
        account={account}
        popoverId={popoverId}
      />
      <ContractExecutionModal popoverId={popoverId} account={account} />
    </>
  );
}

export default BurnerWallet;
{
  /* <div className="w-full rounded-lg border border-gray-300 bg-gray-100 px-8 py-12 dark:border-neutral-700 dark:bg-neutral-800/30">
  {isSending &&
    createPortal(
      <AssetTransferModal
        strkBalance={strkBalance}
        ethBalance={ethBalance}
        isOpen={isSending}
        onClose={() => setIsSending(false)}
        account={account}
      />,
      document.body,
    )}
  {isExecuting &&
    createPortal(
      <ContractExecutionModal
        isOpen={isExecuting}
        onClose={() => setIsExecuting(false)}
        account={account}
      />,
      document.body,
    )}
  {isConnecting &&
    createPortal(
      <ConnectionModal
        isOpen={isConnecting}
        onClose={() => setIsConnecting(false)}
        handleConnect={handleConnect}
        wallet={wallet}
      />,
      document.body,
    )}
  <h2 className="mb-[5px] text-2xl font-semibold">Burner Wallet</h2>

  {ethBalance == 0 && (
    <div>
      <p className="mb-[40px] text-sm font-light">
        <span className="font-medium">NB:</span> To proceed with the
        transaction, please deposit ETH into your account.
      </p>
    </div>
  )}
  <div className="flex gap-[100px] text-2xl font-normal">
    <div>
      <h2>
        ETH Balance:{" "}
        <span className="text-xl font-medium">
          {" "}
          {ethLoading
            ? "Loading..."
            : `${Number(ethBalance).toFixed(3)}ETH`}
        </span>
      </h2>
      <h2>
        STRK Balance:{" "}
        <span className="text-xl font-medium">
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
  <div className="mt-[80px] flex justify-center gap-[60px]">
    {isConnected ? (
      <>
        {ethBalance > 0 && (
          <button
            className="bg-primary w-[200px] rounded-[5px] px-6 py-4 font-semibold text-white disabled:cursor-not-allowed"
            disabled={!eth || !strk}
            onClick={() => setIsSending(true)}
          >
            SEND
          </button>
        )}
        {ethBalance > 0 && (
          <button
            className="bg-primary w-[200px] rounded-[5px] px-6 py-4 font-semibold text-white disabled:cursor-not-allowed"
            disabled={!eth || !strk}
            onClick={() => setIsExecuting(true)}
          >
            EXECUTE
          </button>
        )}
      </>
    ) : (
      <button
        className="bg-primary w-[200px] rounded-[5px] px-6 py-4 font-semibold text-white disabled:cursor-not-allowed"
        onClick={() => setIsConnecting(true)}
        disabled={!eth || !strk}
      >
        CONNECT
      </button>
    )}
  </div>
</div> */
}
