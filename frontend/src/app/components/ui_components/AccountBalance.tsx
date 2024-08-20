import { useContractRead } from "@starknet-react/core";
import Erc20Abi from "../../abi/token.abi.json";
import RightChevron from "svg/RightChevron";
import { ETH_SEPOLIA, STRK_SEPOLIA } from "@/app/utils/constant";
import { formatCurrency } from "@/app/utils/currency";

type Props = {
  address: string;
  heading?: boolean;
};

function AccountBalance({ address, heading = true }: Props) {
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
    <div className="p-4 text-sm">
      {heading && <h3 className="mb-4 text-md">Assets</h3>}

      <div className="flex flex-col gap-4 text-[--headings]">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full md:h-12 md:w-12">
              <img className="w-full" src="/assets/eth.svg" alt="" />
            </div>
            <div>
              <p className="mb-2 text-md">ETH</p>
              <p>Ethereum</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <p className="">{Number(ethBalance).toFixed(3)}</p>
            <span className="text-l">
              <RightChevron />
            </span>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full md:h-12 md:w-12">
              <img className="w-full" src="/assets/strk.svg" alt="" />
            </div>
            <div>
              <p className="mb-2 text-md">STRK</p>
              <p>Starknet token</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <p className="">{Number(strkBalance).toFixed(3)}</p>
            <span className="text-l">
              <RightChevron />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountBalance;
