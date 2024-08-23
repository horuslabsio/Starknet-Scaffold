import UpRightArrowIcon from "@/app/svg/UpRightArrowIcon";
import Link from "next/link";

const Faucet = () => {
  return (
    <Link
      href={"https://starknet-faucet.vercel.app/"}
      target="_blank"
      className="flex flex-col md:flex-row md:items-center gap-8 group"
    >
      <div
        className="md:p-4 grid grid-cols-1 grid-rows-1 max-h-[400px]"
        aria-hidden
      >
        <img
          src="/faucet.svg"
          alt="starknet faucet"
          className="col-start-1 row-start-1 dark-img"
        />
        <img
          src="/light-faucet.svg"
          alt="starknet faucet"
          className="col-start-1 row-start-1 rounded-[8px] light-img"
        />
      </div>
      <div className="px-2 md:px-8">
        <h2 className="flex items-center gap-2">
          <span>Scaffold Faucet</span>
          <span className="inline-block transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-[.1rem]">
            <UpRightArrowIcon />
          </span>
        </h2>
        <p className="text-[#BC988C]">
          A SepETH/SepSTRK faucet for claiming ETH/STRK Sepolia testnet tokens
        </p>
      </div>
    </Link>
  );
};

export default Faucet;
