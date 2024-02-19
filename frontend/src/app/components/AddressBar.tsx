"use client";
import { useAccount, useStarkName } from "@starknet-react/core";
import Blockies from "react-blockies";
import Image from "next/image"
import { useEffect, useState } from "react";

const AddressBar = () => {
  const { address } = useAccount();
  const { data, isLoading, isError } = useStarkName({
    address,
  });
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => {
      setIsCopied(false);
    }, 1500);

    return () => clearTimeout(id);
  }, [isCopied]);

  function handleCopyClick() {
    if (!address) return;
    navigator.clipboard.writeText(address);
    setIsCopied(true);
  }

  if (!address) {
    return null;
  }

  return (
    <button
      onClick={handleCopyClick}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
    >
      {isLoading && <span>Loading...</span>}
      {isError && (
        <span className="flex items-center gap-x-3">
          <Blockies seed={address} className="rounded-full h-3 w-3" />
          {address?.slice(0, 6).concat("...").concat(address?.slice(-5))}
          <Image
            src={isCopied ? "/assets/tick.svg" : "/assets/copy.svg"}
            width={20}
            height={20}
            alt="#"
          />
        </span>
      )}
      {data && (
        <span className="flex items-center gap-x-3">
          <Blockies seed={address} className="rounded-full h-3 w-3" />
          {data}
          <Image
            src={isCopied ? "/assets/tick.svg" : "/assets/copy.svg"}
            width={20}
            height={20}
            alt="#"
          />
        </span>
      )}
    </button>
  );
};

export default AddressBar;
