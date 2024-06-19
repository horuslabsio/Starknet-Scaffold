import { useContractRead } from "@starknet-react/core";
import { useEffect, useState } from "react";
import { ETH_SEPOLIA, STRK_SEPOLIA } from "./utils/constant";
import Erc20Abi from "../../abi/token.abi.json";
import { formatCurrency } from "./utils/currency";

type Props = {
  address: string;
};

function AccountBalance({ address }: Props) {
  const { data: eth, isLoading: ethLoading } = useContractRead({
    address: ETH_SEPOLIA,
    abi: Erc20Abi,
    functionName: "balanceOf",
    args: [address!],
    watch: true,
  });

  const { data: strk, isLoading: strkLoading } = useContractRead({
    address: STRK_SEPOLIA,
    abi: Erc20Abi,
    functionName: "balanceOf",
    args: [address!],
    watch: true,
  });

  // @ts-ignore
  const ethBalance = formatCurrency(eth?.balance.low.toString());
  // @ts-ignore
  const strkBalance = formatCurrency(strk?.balance?.low.toString());

  return (
    <div className="flex flex-col gap-y-4 text-left">
      <h3 className="text-lg font-semibold">
        STRK Balance:{" "}
        <span className="font-normal">
          {Number(strkBalance).toFixed(3)} STRK
        </span>
      </h3>
      <h3 className="text-lg font-semibold">
        ETH Balance:{" "}
        <span className="font-normal">{Number(ethBalance).toFixed(3)} ETH</span>
      </h3>
    </div>
  );
}

export default AccountBalance;
