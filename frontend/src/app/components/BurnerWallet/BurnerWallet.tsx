"use client";
import { useEffect, useState } from "react";
import AssetTransferModal from "../AssetTransferModal";
import ConnectionModal from "../ConnectionModal";
import { useContractRead } from "@starknet-react/core";
import { Account, RpcProvider } from "starknet";
import CopyButton from "../ui_components/util/CopyButton";
import Erc20Abi from "../../abi/token.abi.json";
import ContractExecutionModal from "../ContractExecutionModal";
import { ETH_SEPOLIA, STRK_SEPOLIA } from "@/app/utils/constant";
import { formatCurrency } from "@/app/utils/currency";
import AccountBalance from "../ui_components/AccountBalance";
interface IWallet {
  address: string;
  privateKey: string;
  publicKey: string;
}

function BurnerWallet({
  wallet,
  walletNumber,
}: {
  wallet: IWallet;
  walletNumber: number;
}) {
  const [isCopied, setIsCopied] = useState(false);
  const [account, setAccount] = useState(undefined);
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
    const popover = document.getElementById(`burner-connect-popover`);
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
      <div className="w-[90vw] max-w-[35rem] p-2 md:p-8 lg:w-full lg:max-w-[45rem] lg:rounded-[16px] lg:border lg:border-[--borders]">
        <div className="mb-4 flex items-center justify-between gap-4 border-b border-b-[#DADADA] py-4 md:mb-12">
          <div className="flex flex-col md:items-center lg:flex-row lg:gap-4">
            <h2 className="mb-2 text-[--headings] md:text-l">
              Wallet Account {walletNumber}
            </h2>
            <CopyButton
              copyText={wallet.address}
              buttonText={wallet.address
                ?.slice(0, 6)
                .concat("...")
                .concat(wallet.address?.slice(-5))}
              className="flex items-center gap-2 rounded-[30px] bg-button-tertiary px-4 py-2 text-md text-accent-secondary md:px-6 md:py-3"
            />
          </div>
          <button
            //@ts-ignore
            popoverTarget={`burner-connect-popover`}
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
              popoverTarget={`burner-transfer-popover`}
              disabled={
                account === undefined ||
                (+ethBalance === 0 && +strkBalance === 0)
              }
              className="w-full rounded-[12px] bg-button-primary py-3 text-background-primary-light transition-all duration-300 hover:rounded-[30px] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:rounded-[12px] md:py-4"
            >
              Send
            </button>
            <button
              //@ts-ignore
              popoverTarget={`burner-execute-popover`}
              disabled={
                account === undefined ||
                (+ethBalance === 0 && +strkBalance === 0)
              }
              className="w-full rounded-[12px] border-[2px] border-[--headings] py-2 text-[--headings] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Execute
            </button>
          </div>
        </div>
      </div>

      <ConnectionModal
        handleConnect={handleConnect}
        wallet={wallet}
        isConnected={isConnected}
      />
      <AssetTransferModal
        strkBalance={strkBalance}
        ethBalance={ethBalance}
        account={account}
      />
      <ContractExecutionModal account={account} />
    </>
  );
}

export default BurnerWallet;
