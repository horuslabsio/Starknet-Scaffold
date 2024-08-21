"use client";
import GenericModal from "../components/internal/util/GenericModal";
import Image from "next/image";
import { useState } from "react";
import ethLogo from "../../../public/assets/eth.svg";
import starknetLogo from "../../../public/assets/strk.svg";
import {
  Call,
  CallData,
  Contract,
  RpcProvider,
  Uint256,
  cairo,
} from "starknet";
import abi from "../../../public/abi/strk_abi.json";
import Close from "../../../public/svg/Close";
import WarnBadge from "../../../public/svg/WarnBadge";
import Verified from "../../../public/svg/Verified";
import ChevronDown from "../../../public/svg/ChevronDown";
import Loading from "../components/internal/util/Loading";

type Props = {
  strkBalance: number | undefined;
  ethBalance: number | undefined;
  account: any;
};

function AssetTransferModal({ strkBalance, ethBalance, account }: Props) {
  // Form Data
  const [walletAddress, setWalletAddress] = useState("");
  const [amount, setAmount] = useState("");

  // useState Variables
  const [activeToken, setActiveToken] = useState("strk");
  const [assetDropDownIsOpen, setAssetDropDownIsOpen] = useState(false);
  const [sendStatus, setSendStatus] = useState<
    "send" | "sending" | "sent" | "failed"
  >("send");

  function onChangeToken(e: any, token: string) {
    e.preventDefault();
    setActiveToken(token);
    setAssetDropDownIsOpen(false);
  }

  const provider = new RpcProvider({
    nodeUrl: "https://starknet-sepolia.public.blastapi.io",
  });

  let starknet_contract: any;
  if (activeToken == "strk") {
    starknet_contract = new Contract(
      abi,
      "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
      provider,
    );
  } else {
    starknet_contract = new Contract(
      abi,
      "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
      provider,
    );
  }

  async function handleTransfer() {
    try {
      if (!walletAddress.length && !amount) {
        return;
      }
      setSendStatus("sending");

      starknet_contract.connect(account);
      const toTransferTk: Uint256 = cairo.uint256(Number(amount) * 1e18);
      const { suggestedMaxFee: maxFee } = await account.estimateInvokeFee({
        contractAddress: starknet_contract.address,
        entrypoint: "transfer",
        calldata: [walletAddress, toTransferTk],
      });

      const { transaction_hash: transferTxHash } =
        await starknet_contract.invoke(
          "transfer",
          [walletAddress, toTransferTk],
          {
            maxFee: maxFee,
          },
        );
      await provider.waitForTransaction(transferTxHash);
      setSendStatus("sent");
    } catch (err: any) {
      setSendStatus("failed");
      console.log(err.message);
    }
  }

  return (
    <GenericModal
      popoverId={`burner-transfer-popover`}
      style={`py-16 px-[5vw] md:p-16 bg-transparent relative`}
    >
      {/* FEEDBACK UI --> */}
      <div
        className={`absolute top-0 flex h-[3rem] w-[90vw] max-w-[30rem] items-center justify-center rounded-[12px] bg-[--background] transition-all ${sendStatus === "failed" || sendStatus === "sent" ? "" : "-translate-y-full scale-75"}`}
      >
        {sendStatus === "failed" && (
          <p className="flex items-center justify-center gap-2 text-red-secondary">
            <span className="text-l">
              <WarnBadge />
            </span>
            <span>Your transfer was unsuccessful</span>
          </p>
        )}
        {sendStatus === "sent" && (
          <p className="flex items-center justify-center gap-2 text-green-secondary">
            <span className="text-l">
              <Verified />
            </span>
            <span>Your transfer was successful</span>
          </p>
        )}
      </div>
      {/* <-- */}

      <div className="w-[90vw] max-w-[30rem] rounded-[24px] bg-[--background] px-6 py-8 text-[--headings] shadow-popover-shadow md:p-8">
        <div className="mb-8 flex justify-between">
          <h3 className="text-l text-[--headings]">Send</h3>
          <button
            // @ts-ignore
            popoverTarget={`burner-transfer-popover`}
            onClick={() => {
              setSendStatus("send");
              setWalletAddress("");
              setAmount("");
            }}
          >
            <Close />
          </button>
        </div>

        <h5 className="mb-4">Asset</h5>
        <div className="relative mb-4">
          <div
            className="flex items-center justify-between rounded-[12px] bg-[--modal-assets-bg] p-4 text-[--headings] transition-colors duration-500 ease-linear"
            onClick={() => setAssetDropDownIsOpen((open) => !open)}
          >
            <div className="flex items-center gap-3">
              <Image
                src={activeToken === "strk" ? starknetLogo : ethLogo}
                alt="Stark logo"
                width={28}
                height={28}
              />
              <div>
                <h3 className="text-base font-medium">
                  {activeToken.toUpperCase() + " "}
                  <span className="text-sm font-normal">
                    ({activeToken === "strk" ? "StarkNetToken" : "Ether"})
                  </span>
                </h3>
                {activeToken === "strk"
                  ? Number(strkBalance).toFixed(4)
                  : Number(ethBalance).toFixed(4)}
              </div>
            </div>
            <ChevronDown />
          </div>
          <div
            className={`absolute left-1/2 mt-4 h-0 w-[102%] -translate-x-1/2 overflow-hidden bg-transparent ${
              assetDropDownIsOpen ? "h-[120px]" : "h-0"
            }`}
          >
            <ul
              className={`h-fit rounded-[12px] border-2 border-solid border-[--borders] bg-[--background] transition-all duration-300 ${
                assetDropDownIsOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-[20px] opacity-0"
              }`}
            >
              <li className="cursor-pointer px-5 py-3">
                <button
                  className="flex w-full items-center justify-between"
                  onClick={(e) => onChangeToken(e, "strk")}
                >
                  <div className="flex gap-x-4">
                    <Image
                      src={starknetLogo}
                      alt="Stark logo"
                      width={28}
                      height={28}
                    />
                    <div className="text-left">
                      <h3 className="text-sm">STRK</h3>
                      <h4 className="text-xs">StarkNet Token</h4>
                    </div>
                  </div>
                </button>
              </li>
              <li className="cursor-pointer px-5 py-3">
                <button
                  className="flex w-full items-center justify-between"
                  onClick={(e) => onChangeToken(e, "eth")}
                >
                  <div className="flex gap-x-4">
                    <Image
                      src={ethLogo}
                      alt="ETH logo"
                      width={28}
                      height={28}
                    />
                    <div className="text-left">
                      <h3 className="text-sm">ETH</h3>
                      <h4 className="text-xs">Ether</h4>
                    </div>
                  </div>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <form className="flex flex-col gap-4" action="">
          <label htmlFor="wallet-address">Wallet Address</label>
          <input
            id="wallet-address"
            type="text"
            placeholder="Enter Wallet Address"
            className="w-full rounded-[8px] border-[2px] border-solid border-[--borders] bg-[--link-card] p-3 outline-none"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
          />

          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            type="text"
            placeholder="Enter Amount"
            inputMode="decimal"
            className="w-full rounded-[8px] border-[2px] border-solid border-[--borders] bg-[--link-card] p-3 outline-none"
            value={amount}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*\.?\d*$/.test(value)) {
                setAmount(value);
              }
            }}
          />

          <button
            disabled={sendStatus === "sending" || !amount || !walletAddress}
            className="w-full rounded-[12px] bg-button-primary px-6 py-3 text-background-primary-light transition-all duration-300 hover:rounded-[30px] disabled:cursor-not-allowed disabled:opacity-50 md:py-4"
            onClick={async (e) => {
              e.preventDefault();
              await handleTransfer();
            }}
          >
            {sendStatus === "sending" ? (
              <span className="flex items-center justify-center gap-2">
                <Loading dimension="h-[1.2rem] w-[1.2rem]" />
                <span>Sending</span>
              </span>
            ) : sendStatus === "sent" ? (
              <span>Sent</span>
            ) : (
              <span>Send</span>
            )}
          </button>
        </form>
      </div>
    </GenericModal>
  );
}

export default AssetTransferModal;
