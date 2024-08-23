import UpRightArrowIcon from "@/app/svg/UpRightArrowIcon";
import Link from "next/link";

const Connect = () => {
  return (
    <Link
      target="_blank"
      href={"https://app.starknetscaffold.xyz"}
      className="flex flex-col md:flex-row md:items-center gap-8 group"
    >
      <div
        className="md:p-4 grid grid-cols-1 grid-rows-1 max-h-[400px]"
        aria-hidden
      >
        <img
          src="/connect.svg"
          alt="starknet scaffold connect wallet"
          className="col-start-1 row-start-1 dark-img"
        />
        <img
          src="/light-connect.svg"
          alt="starknet scaffold connect wallet"
          className="col-start-1 row-start-1 rounded-[8px] light-img"
        />
      </div>
      <div className="px-2 md:px-8">
        <p className="text-[#BC988C] text-[.875em]">Powered by Starknetkit..</p>
        <h2 className="flex items-center gap-2 font-semibold">
          <span>Connect Wallet</span>
          <span className="inline-block transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-[.1rem]">
            <UpRightArrowIcon />
          </span>
        </h2>
        <p className="text-[#BC988C]">
          Starknet-scaffold has default support for all wallets within the
          Starknet ecosystem
        </p>
      </div>
    </Link>
  );
};

export default Connect;
