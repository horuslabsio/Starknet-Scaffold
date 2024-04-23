"use client";
import GenericModal from "./GenericModal";
import starknetLogo from "../../../public/starknetlogo.svg";
import Image from "next/image";
import rightArr from "../../../public/assets/right-arr.svg";
import { useEffect, useState } from "react";
import { useAccount, useBalance } from "@starknet-react/core";
import downChevron from "../../../public/assets/down-chevron.svg";
import ethLogo from "../../../public/assets/ethereumLogo2.svg";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function AssetTransferModal({ isOpen, onClose }: Props) {
  const { address } = useAccount();
  const { isLoading, isError, error, data } = useBalance({
    address,
    watch: true,
  });

  // Form Data
  const [walletAddress, setWalletAddress] = useState("");
  const [amount, setAmount] = useState("");

  // useState Variables
  const [animate, setAnimate] = useState(false);
  const [activeToken, setActiveToken] = useState("strk");
  const [assetDropDownIsOpen, setAssetDropDownIsOpen] = useState(false);

  const closeModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
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
              {/* {isLoading && (
                <Image src={miniSpinner} width={16} height={16} alt="spinner" />
              )}
              {data && (
                <h5 className="text-sm">
                  {Number(data.value).toFixed(4).toString()}
                </h5>
              )} */}
              2.0000
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

        <div className="flex items-center justify-between mt-4">
          <h5>Pay Gas Fee With</h5>
          <div>
            <div className="flex items-center justify-center gap-3 bg-[#1f1f1f] p-3 rounded">
              <Image
                src={activeToken === "strk" ? starknetLogo : ethLogo}
                width={14}
                height={14}
                alt="strk"
              />
              <h3 className="font-medium text-sm">
                {activeToken.toUpperCase()}
              </h3>
            </div>
          </div>
        </div>

        <button
          className="w-full mt-7 py-3 bg-[#3b81f6] rounded font-medium flex items-center gap-x-2 justify-center disabled:cursor-not-allowed"
          disabled={isLoading || isError}
        >
          Send <Image src={rightArr} alt="right arrow" height={16} width={16} />
        </button>
      </form>
    </GenericModal>
  );
}

export default AssetTransferModal;
