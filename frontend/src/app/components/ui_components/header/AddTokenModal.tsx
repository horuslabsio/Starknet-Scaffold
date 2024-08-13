"use client";
import { useState } from "react";
import { useConnect } from "@starknet-react/core";
import GenericModal from "../GenericModal";
import Close from "svg/Close";

const AddTokenModal = () => {
  const { connector } = useConnect();

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
      }
    };
    fetchAddToken();
  }

  return (
    <GenericModal popoverId="add-token-popover" style={`bg-transparent w-full`}>
      <div className="gird h-svh place-content-center">
        <div className="mx-auto h-[98svh] max-h-[600px] w-[95vw] max-w-[30rem] overflow-scroll rounded-[24px] bg-[--background] p-8 text-[--headings] shadow-popover-shadow">
          <div className="mb-8 flex justify-between">
            <h3 className="text-l text-[--headings]">Add Token</h3>

            <button
              // @ts-ignore
              popoverTarget="add-token-popover"
            >
              <Close />
            </button>
          </div>

          <form action="" className="flex flex-col gap-4">
            <label>Contract Address</label>
            <input
              type="text"
              placeholder="Enter Token Contract Address"
              className="w-full rounded-[8px] border-[2px] border-solid border-[--borders] bg-[--link-card] p-3"
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
            />

            <label>Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="w-full rounded-[8px] border-[2px] border-solid border-[--borders] bg-[--link-card] p-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label>Symbol</label>
            <input
              type="text"
              placeholder="Enter Symbol"
              className="w-full rounded-[8px] border-[2px] border-solid border-[--borders] bg-[--link-card] p-3"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
            />

            <label>Decimals</label>
            <input
              type="text"
              placeholder="0"
              className="mb-4 w-full rounded-[8px] border-[2px] border-solid border-[--borders] bg-[--link-card] p-3"
              value={decimals}
              onChange={(e) => setDecimals(parseInt(e.target.value))}
            />

            <button
              className="w-full rounded-[12px] bg-[--headings] p-4 text-[--background] disabled:cursor-not-allowed"
              onClick={async (e) => {
                e.preventDefault();
                handleAddToken();
              }}
            >
              Add Token
            </button>
          </form>
        </div>
      </div>
    </GenericModal>
  );
};

export default AddTokenModal;
