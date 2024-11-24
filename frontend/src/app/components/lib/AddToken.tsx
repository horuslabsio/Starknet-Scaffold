"use client";
import { useEffect, useState } from "react";
import { useConnect, useContractRead } from "@starknet-react/core";
import { shortString } from "starknet";
import Close from "public/svg/Close";
import GenericModal from "../internal/util/GenericModal";
import { erc20MetadataAbi } from "@/app/common/abis/erc20-metadata";

const AddTokenModal = () => {
  const { connector } = useConnect();
  const [tokenAddress, setTokenAddress] = useState("");
  const [symbol, setSymbol] = useState("");
  const [decimals, setDecimals] = useState("");
  const [name, setName] = useState("");

  const { data: tokenName } = useContractRead({
    abi: erc20MetadataAbi,
    functionName: "name",
    address: tokenAddress,
    args: [],
  });

  const { data: tokenSymbol } = useContractRead({
    abi: erc20MetadataAbi,
    functionName: "symbol",
    address: tokenAddress,
    args: [],
  });

  const { data: tokenDecimals } = useContractRead({
    abi: erc20MetadataAbi,
    functionName: "decimals",
    address: tokenAddress,
    args: [],
  });

  useEffect(() => {
    tokenName
      ? setName(shortString.decodeShortString(tokenName.toString()))
      : setName("");

    tokenSymbol
      ? setSymbol(shortString.decodeShortString(tokenSymbol.toString()))
      : setSymbol("");

    tokenDecimals ? setDecimals(tokenDecimals.toString()) : setDecimals("");
  }, [tokenName, tokenSymbol, tokenDecimals]);

  function handleAddToken() {
    const fetchAddToken = async () => {
      try {
        const decimalFloat = parseFloat(decimals);
        //@ts-ignore
        const walletProvider = connector?._wallet;
        const asset = {
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol,
            decimalFloat,
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
        setDecimals("");
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
        <div className="mx-auto h-fit max-h-[600px] w-[95vw] max-w-[30rem] overflow-scroll rounded-[24px] bg-[--background] px-6 py-8 text-[--headings] shadow-popover-shadow md:p-8">
          <div className="mb-8 flex justify-between">
            <h3 className="text-l text-[--headings]">Add Token</h3>

            <button
              // @ts-ignore
              popovertarget="add-token-popover"
            >
              <Close />
            </button>
          </div>

          <form action="" className="flex flex-col items-start gap-4">
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
              inputMode="decimal"
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*\.?\d*$/.test(value)) {
                  setDecimals(value);
                }
              }}
            />

            <button
              className="w-full rounded-[12px] bg-[--headings] p-3 text-[--background] disabled:cursor-not-allowed md:p-4"
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

const AddTokenButton = ({
  text = "Add Token",
  className = "h-12 w-[50%] max-w-[12rem] rounded-[12px] border-[2px] border-solid border-[--add-token-border] bg-background-primary-light text-accent-secondary transition-all duration-300 hover:rounded-[30px]",
}: {
  text?: string;
  className?: string;
}) => {
  return (
    <>
      <button
        aria-haspopup="dialog"
        // @ts-ignore
        popovertarget="add-token-popover"
        className={className}
      >
        {text}
      </button>
      <AddTokenModal />
    </>
  );
};

export default AddTokenButton;
