"use client";
import GenericModal from "./ui_components/GenericModal";
import starknetLogo from "../../../public/starknetlogo.svg";
import Image from "next/image";
import rightArr from "../../../public/assets/right-arr.svg";
import { useEffect, useState } from "react";
import downChevron from "../../../public/assets/down-chevron.svg";
import ethLogo from "../../../public/assets/ethereumLogo2.svg";
import {
  Call,
  CallData,
  Contract,
  RpcProvider,
  Uint256,
  cairo,
} from "starknet";
import abi from "./../../../public/abi/strk_abi.json";
import spinner from "../../../public/assets/spinner.svg";
import toast from "react-hot-toast";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  strkBalance: number | undefined;
  ethBalance: number | undefined;
  account: any;
};

function AssetTransferModal({
  isOpen,
  onClose,
  strkBalance,
  ethBalance,
  account,
}: Props) {
  // Form Data
  const [walletAddress, setWalletAddress] = useState("");
  const [amount, setAmount] = useState("");

  // useState Variables
  const [animate, setAnimate] = useState(false);
  const [activeToken, setActiveToken] = useState("strk");
  const [assetDropDownIsOpen, setAssetDropDownIsOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const closeModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnimate(false);
    setTimeout(() => {
      onClose();
    }, 400);
  };

  useEffect(() => {
    if (isOpen) {
      setAnimate(true);
    } else {
      setAnimate(false);
    }
  }, [isOpen]);

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
      setLoading(true);
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
      toast.success("Your transfer was successful!", { duration: 2000 });
    } catch (err: any) {
      toast.error("Your transfer was unsuccessfully", { duration: 2000 });
      console.log(err.message);
    } finally {
      setLoading(false);
      setTimeout(() => {
        onClose();
      }, 400);
    }
  }

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={closeModal}
      animate={animate}
      className={`w-[90vw] mx-auto md:h-fit md:w-[45rem] text-white py-4 px-5 relative bg-black`}
    >
      <div className="absolute right-5 top-4">
        <button
          onClick={(e) => {
            closeModal(e);
            e.stopPropagation();
          }}
          className="w-8 h-8  grid place-content-center rounded-full bg-outline-grey  "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m6.4 18.308l-.708-.708l5.6-5.6l-5.6-5.6l.708-.708l5.6 5.6l5.6-5.6l.708.708l-5.6 5.6l5.6 5.6l-.708.708l-5.6-5.6z"
            />
          </svg>
        </button>
      </div>
      <h1 className="text-[24px] mb-2 font-semibold">Send</h1>
      <h5 className="font-medium">Asset</h5>
      <div>
        <div
          className="flex items-center justify-between mt-2 mb-5 bg-[#1f1f1f] py-2 px-3 rounded-md cursor-pointer"
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
          <Image
            src={downChevron}
            width={20}
            height={20}
            alt="drop-down"
            className={`${
              assetDropDownIsOpen && "-rotate-180"
            } transition-all duration-200 ease-in`}
          />
        </div>
        <ul
          className={`bg-[#1f1e1e] rounded-md overflow-hidden duration-150 transition-all ease-in-out absolute left-5 right-5 ${
            assetDropDownIsOpen ? "h-fit" : "h-0"
          }`}
        >
          <li className="cursor-pointer px-5 py-3">
            <button
              className="flex justify-between items-center w-full"
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
              className="flex justify-between items-center w-full"
              onClick={(e) => onChangeToken(e, "eth")}
            >
              <div className="flex gap-x-4">
                <Image src={ethLogo} alt="ETH logo" width={28} height={28} />
                <div className="text-left">
                  <h3 className="text-sm">ETH</h3>
                  <h4 className="text-xs">Ether</h4>
                </div>
              </div>
            </button>
          </li>
        </ul>
      </div>
      <form action="">
        <div className="flex flex-col gap-y-5">
          <div className="flex flex-col gap-y-2">
            <h2>Wallet Address</h2>
            <input
              type="text"
              placeholder="Enter Wallet Address"
              className="w-full p-2 rounded text-black outline-none focus:border-[#3b81f6] border-[2px]"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <h2>Amount</h2>
            <input
              type="text"
              placeholder="Enter Amount"
              className="w-full p-2 rounded text-black outline-none focus:border-[#3b81f6] border-[2px]"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>

        <button
          className="w-full mt-7 py-3 bg-primary rounded font-medium flex items-center gap-x-2 justify-center disabled:cursor-not-allowed"
          onClick={async (e) => {
            e.preventDefault();
            await handleTransfer();
          }}
        >
          Send{" "}
          <Image
            src={loading ? spinner : rightArr}
            alt={loading ? "loading" : "right arrow"}
            height={16}
            width={16}
          />
        </button>
      </form>
    </GenericModal>
  );
}

export default AssetTransferModal;
