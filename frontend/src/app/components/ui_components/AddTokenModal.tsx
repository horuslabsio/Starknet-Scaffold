"use client";
import { useEffect, useState } from "react";
import GenericModal from "./GenericModal";
import { WalletAccount } from "starknet";
import { useConnect } from "@starknet-react/core";
const providerUrl = "https://starknet-sepolia.public.blastapi.io";

const AddTokenModal = ({
  openAddTokenModal,
  closeAddTokenModal,
}: {
  openAddTokenModal: boolean;
  closeAddTokenModal: () => void;
}) => {
  const { connector } = useConnect();
  const [animate, setAnimate] = useState(false);
  const [tokenAddress, setTokenAddress] = useState("");
  const [symbol, setSymbol] = useState("");
  const [decimals, setDecimals] = useState(0);
  const [name, setName] = useState("");

  function handleAddToken() {
    const fetchAddToken = async () => {
      try {
        const myWalletAccount = new WalletAccount(
          { nodeUrl: providerUrl },
          // @ts-ignore
          connector?._wallet,
        );

        const resp = await myWalletAccount.watchAsset({
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol,
            decimals,
            name,
          },
        });
        console.log(resp);
      } catch (err) {
        console.log(err);
      } finally {
        setDecimals(0);
        setName("");
        setSymbol("");
        setTokenAddress("");
        setAnimate(false);
        closeAddTokenModal();
      }
    };
    fetchAddToken();
  }

  const closeModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setAnimate(false);
    setTimeout(() => {
      closeAddTokenModal();
    }, 400);
  };

  useEffect(() => {
    if (openAddTokenModal) {
      setAnimate(true);
    } else {
      setAnimate(false);
    }
  }, [openAddTokenModal]);

  return (
    <GenericModal
      isOpen={openAddTokenModal}
      onClose={closeModal}
      animate={animate}
      className={`w-[80vw] h-[60vh] mx-auto md:w-[25rem] md:h-[30rem]  text-white `}
    >
      <form action="" className="px-5 py-3">
        <div className="flex flex-col gap-y-5">
          <div className="flex flex-col gap-y-2">
            <h2>Contract Address</h2>
            <input
              type="text"
              placeholder="Enter Token Contract Address"
              className="w-full p-2 rounded text-black outline-none focus:border-[#3b81f6] border-[2px]"
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <h2>Name</h2>
            <input
              type="text"
              placeholder="Enter Name"
              className="w-full p-2 rounded text-black outline-none focus:border-[#3b81f6] border-[2px]"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <h2>Symbol</h2>
            <input
              type="text"
              placeholder="Enter Symbol"
              className="w-full p-2 rounded text-black outline-none focus:border-[#3b81f6] border-[2px]"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <h2>Decimals</h2>
            <input
              type="number"
              placeholder="Enter Decimal"
              className="w-full p-2 rounded text-black outline-none focus:border-[#3b81f6] border-[2px]"
              value={decimals}
              onChange={(e) => setDecimals(parseInt(e.target.value))}
            />
          </div>
        </div>

        <button
          className="w-full mt-7 py-3 bg-primary rounded font-medium flex items-center gap-x-2 justify-center disabled:cursor-not-allowed"
          onClick={async (e) => {
            e.preventDefault();
            handleAddToken();
          }}
        >
          Add Token
        </button>
      </form>
    </GenericModal>
  );
};

export default AddTokenModal;
