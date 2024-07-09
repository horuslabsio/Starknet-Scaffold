"use client";
import { connect } from "get-starknet";
import { useState } from "react";
import { WalletAccount } from "starknet";
const providerUrl = "https://starknet-sepolia.public.blastapi.io";
function AddTokenBtn() {
  const [tokenAddress, setTokenAddress] = useState("");

  function handleAddToken() {
    const fetchAddToken = async () => {
      const selectedWalletSWO: any = await connect({
        modalMode: "alwaysAsk",
        modalTheme: "dark",
      });
      console.log(selectedWalletSWO, "selected swo");
      const myWalletAccount = new WalletAccount(
        { nodeUrl: providerUrl },
        selectedWalletSWO,
      );

      console.log(myWalletAccount, "mywalletaccount");
      const resp = await myWalletAccount.watchAsset({
        type: "ERC20",
        options: {
          address: tokenAddress,
        },
      });

      console.log(resp);
    };
    fetchAddToken().catch(console.error);
  }
  return (
    <div className="w-fit flex gap-x-3">
      <input
        className="text-black py-2 px-2 rounded w-[350px]"
        type="text"
        value={tokenAddress}
        placeholder="Input token contract address."
        onChange={(e) => {
          setTokenAddress(e.target.value);
        }}
      />
      <button
        className="px-5 py-2 bg-primary text-white rounded font-semibold"
        onClick={handleAddToken}
      >
        Add Token
      </button>
    </div>
  );
}

export default AddTokenBtn;
