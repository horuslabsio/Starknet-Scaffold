"use client";
import { useEffect, useState } from "react";
import GenericModal from "./GenericModal";
import { useConnect } from "@starknet-react/core";

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
        // @ts-ignore
        const walletProvider = connector?._wallet;
        const asset = {
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol,
            decimals,
            name,
          },
        };

        const resp = await walletProvider.request({
          type: "wallet_watchAsset",
          params: asset,
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
      className={`text-white mx-auto h-[60vh] w-[80vw] md:h-[30rem] md:w-[25rem]`}
    >
      <form action="" className="px-5 py-3">
        <div className="flex flex-col gap-y-5">
          <div className="flex flex-col gap-y-2">
            <h2>Contract Address</h2>
            <input
              type="text"
              placeholder="Enter Token Contract Address"
              className="text-black w-full rounded border-[2px] p-2 outline-none focus:border-[#3b81f6]"
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <h2>Name</h2>
            <input
              type="text"
              placeholder="Enter Name"
              className="text-black w-full rounded border-[2px] p-2 outline-none focus:border-[#3b81f6]"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <h2>Symbol</h2>
            <input
              type="text"
              placeholder="Enter Symbol"
              className="text-black w-full rounded border-[2px] p-2 outline-none focus:border-[#3b81f6]"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <h2>Decimals</h2>
            <input
              type="number"
              placeholder="Enter Decimal"
              className="text-black w-full rounded border-[2px] p-2 outline-none focus:border-[#3b81f6]"
              value={decimals}
              onChange={(e) => setDecimals(parseInt(e.target.value))}
            />
          </div>
        </div>

        <button
          className="bg-primary mt-7 flex w-full items-center justify-center gap-x-2 rounded py-3 font-medium disabled:cursor-not-allowed"
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
