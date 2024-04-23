"use client";

import { useState } from "react";

function BurnerWallet() {
  const [address, setAddress] = useState(
    "0x07483a4f6bccee24ee02479530f662a031aca58c7294f71b63a64423cb240f35"
  );
  return (
    <div className="rounded-lg border px-8 py-12 border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30 w-full">
      <h2 className="mb-[60px] text-2xl font-semibold">Burner Wallet</h2>
      <div className="flex gap-[100px] text-2xl font-normal">
        <div>
          <h2>
            ETH Balance:{" "}
            <span className="font-medium text-xl"> 0.0005 ETH</span>
          </h2>
          <h2>
            STRK Balance: <span className="font-medium text-xl">125 STRK</span>
          </h2>
        </div>
        <h3>{address.slice(0, 12).concat("....").concat(address.slice(-6))}</h3>
      </div>
      <div className="mt-[80px] flex  gap-[60px]">
        <button className=" px-6 py-4 bg-blue-500 text-white rounded-[5px] w-[200px] font-semibold">
          SEND
        </button>
        <button className=" px-6 py-4 bg-blue-500 text-white rounded-[5px] w-[200px] font-semibold">
          EXECUTE
        </button>
        <button className=" px-6 py-4 bg-blue-500 text-white rounded-[5px] w-[200px] font-semibold">
          CONNECT
        </button>
      </div>
    </div>
  );
}

export default BurnerWallet;
